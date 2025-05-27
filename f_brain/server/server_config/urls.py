from django.contrib import admin
from django.urls import path
from weather import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/weather/', views.fetch_weather),
    path('api/history/', views.history),
]
