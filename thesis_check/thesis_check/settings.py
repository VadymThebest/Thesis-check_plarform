import os
from pathlib import Path
from dotenv import load_dotenv

# .env dosyasını yükle
load_dotenv()

# Proje klasörünün yolu
BASE_DIR = Path(__file__).resolve().parent.parent

# Güvenlik anahtarı
SECRET_KEY = 'geliştirme-icin-gecici-key'


# Geliştirme modu
DEBUG = True
ALLOWED_HOSTS = []

# Kurulu uygulamalar
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'pgvector.django',
    'checking',
    'api',
]

# Middleware
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# URL yönlendirmesi
ROOT_URLCONF = 'thesis_check.urls'

# Şablon ayarları
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / "templates"],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# WSGI ve ASGI
WSGI_APPLICATION = 'thesis_check.wsgi.application'
ASGI_APPLICATION = 'thesis_check.asgi.application'

# Veritabanı (PostgreSQL)
DATABASES = {
<<<<<<< HEAD
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME', 'postgres'),
        'USER': os.getenv('DB_USER', 'postgres'),
        'PASSWORD': os.getenv('DB_PASSWORD', 'burak123'),
        'HOST': os.getenv('DB_HOST', '192.168.254.4'),
        'PORT': os.getenv('DB_PORT', '5432'),
    }
}

# Şifre doğrulama
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',},
]
=======
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "postgres",
        "USER": "postgres",
        "PASSWORD": "postgres",
        "HOST": "localhost",
        "PORT": "5432",
    }
}

STATIC_URL = '/assets/'
STATICFILES_DIRS = [BASE_DIR / "templates", BASE_DIR / "assets"]
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'
>>>>>>> origin/backend_batman

# Uluslararası ayarlar
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Statik dosyalar
STATIC_URL = '/static/'

# Medya dosyaları (dosya yükleme için)
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Varsayılan otomatik alan tipi
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
