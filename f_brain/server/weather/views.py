import json
import requests
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from .models import WeatherRecord
from django.conf import settings

@csrf_exempt
def fetch_weather(request):
    if request.method != 'POST':
        return HttpResponseBadRequest("Invalid method")

    data = json.loads(request.body)
    city = data.get("city")
    if not city:
        return HttpResponseBadRequest("City is required")

    # Appel OpenWeatherMap
    api_key = settings.OPENWEATHER_API_KEY
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"

    response = requests.get(url)
    if response.status_code != 200:
        return JsonResponse({"error": "City not found"}, status=404)

    weather_data = response.json()
    record = WeatherRecord.objects.create(
        city=city,
        temperature=weather_data["main"]["temp"],
        description=weather_data["weather"][0]["description"]
    )
    return JsonResponse(record.to_dict())

def history(request):
    records = WeatherRecord.objects.order_by("-created_at")[:10]
    return JsonResponse([r.to_dict() for r in records], safe=False)
