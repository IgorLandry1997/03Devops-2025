import os

CELERY_BROKER_URL = os.getenv("CELERY_BROKER_URL", "amqp://guest:guest@rabbitmq:5672//")
CELERY_RESULT_BACKEND = "django-db"
CELERY_ACCEPT_CONTENT = ["json"]
CELERY_TASK_SERIALIZER = "json"
CELERY_RESULT_SERIALIZER = "json"

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

INSTALLED_APPS += [
    'django_prometheus',
    'django_celery_results',
    'django_celery_beat',
    'weather'

]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('POSTGRES_DB', 'devops_db'),
        'USER': os.getenv('POSTGRES_USER', 'devops_user'),
        'PASSWORD': os.getenv('POSTGRES_PASSWORD', 'devops_pass'),
        'HOST': os.getenv('POSTGRES_HOST', 'db'),
        'PORT': 5432,
    }
}

OPENWEATHER_API_KEY = os.getenv("64d37a0c621df8108d3c186b03723ed3")
