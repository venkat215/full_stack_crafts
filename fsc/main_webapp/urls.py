from django.urls import path
from . import views
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.home, name="fsc-home"),
    path('home/', views.home, name="fsc-home"),
    path('site-info/', views.site_info, name="fsc-info"),
    path('settings/', views.settings, name="fsc-settings"),
    path('projects/', include('projects.urls')),
    path('posts/', include('posts.urls')),
    path('users/', include('users.urls')),
    path('messaging/', include('messaging.urls')),
] 

if settings.DEBUG:
    urlpatterns+= static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
