import os
import json
import requests
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import WeatherSearch
from .tasks import async_weather_processing
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
OPENWEATHERMAP_API_KEY = os.getenv(
    "OPENWEATHER_API_KEY", "ee56bd2e1c87bf3900aa88cfd2cee8ac"
)


@require_http_methods(["GET"])
def get_weather(request):
    """
    Endpoint pour obtenir les données météo d'une ville
    et les enregistrer dans la base de données
    """
    city = request.GET.get("city")
    if not city:
        return JsonResponse(
            {"error": "Le paramètre 'city' est requis"},
            status=400,
        )

    # Call OpenWeatherMap API
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={OPENWEATHERMAP_API_KEY}&units=metric"

    try:
        response = requests.get(url)
        response.raise_for_status()

        weather_data = response.json()

        # Enregistrement des données dans la base de données
        weather_record = WeatherSearch(
            city=weather_data["name"],
            temperature=weather_data["main"]["temp"],
            humidity=weather_data["main"]["humidity"],
            wind_speed=weather_data["wind"]["speed"],
            pressure=weather_data["main"]["pressure"],
            description=weather_data["weather"][0]["description"],
            icon=weather_data["weather"][0]["icon"],
            country=weather_data["sys"]["country"],
        )
        weather_record.save()

        # Traitement asynchrone des données météo
        async_weather_processing.delay(
            {
                "city": weather_data["name"],
                "temperature": weather_data["main"]["temp"],
                "humidity": weather_data["main"]["humidity"],
                "description": weather_data["weather"][0]["description"],
                "country": weather_data["sys"]["country"],
            }
        )

        # Transformer l'objet en dictionnaire pour la réponse JSON
        saved_record = {
            "id": weather_record.id,
            "city": weather_record.city,
            "temperature": weather_record.temperature,
            "humidity": weather_record.humidity,
            "wind_speed": weather_record.wind_speed,
            "pressure": weather_record.pressure,
            "description": weather_record.description,
            "icon": weather_record.icon,
            "country": weather_record.country,
            "searched_at": weather_record.searched_at.isoformat() if hasattr(weather_record, 'searched_at') else None,
        }

        return JsonResponse({"data": weather_data, "saved_record": saved_record})

    except requests.exceptions.RequestException as e:
        return JsonResponse({"error": str(e)}, status=500)
    except KeyError as e:
        return JsonResponse(
            {"error": f"Données de l'API incorrectes: {str(e)}"},
            status=500,
        )


@require_http_methods(["GET"])
def get_weather_history(request):
    """
    Endpoint pour récupérer l'historique des recherches météo
    """
    try:
        limit = int(request.GET.get("limit", 10))
    except ValueError:
        limit = 10
    
    history = WeatherSearch.objects.all()[:limit]

    # Transformer les objets en dictionnaires
    history_data = []
    for record in history:
        history_data.append({
            "id": record.id,
            "city": record.city,
            "temperature": record.temperature,
            "humidity": record.humidity,
            "wind_speed": record.wind_speed,
            "pressure": record.pressure,
            "description": record.description,
            "icon": record.icon,
            "country": record.country,
            "searched_at": record.searched_at.isoformat() if hasattr(record, 'searched_at') else None,
        })

    return JsonResponse(history_data, safe=False)