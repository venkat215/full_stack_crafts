from django.urls import path, include
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    path('register/', views.register, name="fsc-users-register"),
    path('login/', views.login_user, name="fsc-users-login"),
    path('linkedin-login/', views.linkedin_login, name="fsc-linkedin-login"),
    path('accounts/linkedin_login/login/callback/', views.linkedin_login_callback, name="fsc-linkedin-login-callback"),
    path('accounts/', include('allauth.urls'), name="fsc-users-login"),
    path('logout/', views.logout_user, name="fsc-users-logout"),
    path(r'^(?P<username>\w+)/$', views.user_profile, name="fsc-users-profile"),
]