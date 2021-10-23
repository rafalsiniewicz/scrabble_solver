"""scrabble_solver URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from app import views
from app.views import get_words_from_letters

router = routers.DefaultRouter()
router.get_api_root_view().cls.__name__ = "Root API name"
router.get_api_root_view().cls.__doc__ = "Your Description"
router.register(r'words', views.WordViewSet)
# router.register(r'words-from-letters', views.get_words_from_letters, basename='words-from-letters')


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('words-from-letters/', get_words_from_letters),
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
