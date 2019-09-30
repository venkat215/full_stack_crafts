from django import forms
from users.models import User, Profile
from django.contrib.auth.forms import UserCreationForm, PasswordChangeForm
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

class UpdateAccountForm(forms.ModelForm):

    username= forms.CharField(max_length=50, required=False)
    email = forms.EmailField(max_length=254, required=True)
    first_name = forms.CharField(max_length=50, required=True)
    last_name = forms.CharField(max_length=50, required=True)
    mobile_no = forms.CharField(max_length=50, required=False)
    send_updates = forms.RadioSelect()

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name' ,'last_name', 'mobile_no','send_updates')

class UpdateProfileForm(forms.ModelForm):

    dp = forms.ImageField(required=False)
    dob = forms.DateField(required=False)
    bio = forms.CharField(max_length=1000, required=False)
    

    class Meta:
        model = Profile
        fields = ('dp', 'dob', 'bio')