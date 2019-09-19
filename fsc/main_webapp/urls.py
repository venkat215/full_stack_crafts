from django.urls import path
from . import views
from django.urls import path, include

urlpatterns = [
    path('', views.home, name="fsc-home"),
    path('home/', views.home, name="fsc-home"),
    path('info/', views.info, name="fsc-info"),
    path('projects/', include('projects.urls')),
    path('opinions/', include('opinions.urls')),
    path('users/', include('users.urls')),
]
