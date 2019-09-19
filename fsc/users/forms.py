from django import forms
from users.models import User
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
import re

class SignUpForm(UserCreationForm):

    username = forms.CharField(max_length=50, required=False)
    first_name = forms.CharField(max_length=50, required=True)
    last_name = forms.CharField(max_length=50, required=True)
    email = forms.EmailField(max_length=254, required=True)
    send_updates = forms.RadioSelect()

    class Meta:
        model = User
        fields = ('username', 'password1', 'password2', 'first_name' ,'last_name', 'email', 'mobile_no', 'send_updates')