# weather/models.py

from django.db import models

class WeatherRecord(models.Model):
    city = models.CharField(max_length=100)
    temperature = models.FloatField()
    description = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.city} - {self.temperature}°C"
