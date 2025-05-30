# weather/views.py

import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import WeatherRecord
import json
import os

@csrf_exempt
def get_weather(request):
    if request.method == "POST":
        body = json.loads(request.body)
        city = body.get("city")

        if not city:
            return JsonResponse({"error": "City not provided"}, status=400)

        api_key = os.environ.get("OPENWEATHER_API_KEY")
        url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric&lang=fr"
        response = requests.get(url)

        if response.status_code != 200:
            return JsonResponse({"error": "Ville non trouvée"}, status=404)

        data = response.json()
        weather = WeatherRecord.objects.create(
            city=city,
            temperature=data["main"]["temp"],
            description=data["weather"][0]["description"],
        )

        return JsonResponse({
            "id": weather.id,
            "city": weather.city,
            "temperature": weather.temperature,
            "description": weather.description,
            "created_at": weather.created_at.strftime("%Y-%m-%d %H:%M"),
        })
