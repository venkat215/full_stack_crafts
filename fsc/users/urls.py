from django.urls import path, include
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    path('register/', views.register, name="fsc-users-register"),
    path('login/', views.login_user, name="fsc-users-login"),
    path('accounts/', include('allauth.urls'), name="fsc-users-login"),
    path('logout/', views.logout_user, name="fsc-users-logout"),
    path('current_profile/', views.current_user, name="fsc-users-current-profile")
]