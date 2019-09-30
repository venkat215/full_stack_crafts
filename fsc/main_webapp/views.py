from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import HttpResponse
from django.contrib.staticfiles.templatetags.staticfiles import static
from django.contrib.auth.decorators import login_required
import json
import logging
from users.forms import UpdateProfileForm, UpdateAccountForm
from users.models import Profile

def home(request):

    context = {"page_name" : "home"}

    return render(request, 'main_webapp/home.html', context=context)

def site_info(request):

    context = {'dev_img_src': static("img\\dp.jpg"),
               'ktop_img_src': static("img\\ktop.jpg"),
               "page_name" : "site-info"}

    return render(request, 'main_webapp/site_info.html', context=context)

@login_required
def settings(request):
    
    if request.method == "POST":

        if 'acc_settings' in request.POST:
            form = UpdateAccountForm(request.POST, instance=request.user)
            if form.is_valid():
                form.save()
            else:
                if json.loads(form.errors.as_json()):
                    try:
                        json.loads(form.errors.as_json())['username']
                        messages.error(request, f"Username {request.POST['username']} is already taken", extra_tags='username_error')
                    except KeyError:
                        try:
                            json.loads(form.errors.as_json())['email']
                            messages.error(request, f"Username {request.POST['email']} is already taken", extra_tags='email_error')
                        except KeyError as e:
                            print(str(e))
                            print(form.errors.as_json())

        if 'profile_settings' in request.POST:
            
            form = UpdateProfileForm(request.POST, request.FILES, instance=request.user.profile)
            if form.is_valid():
                form.save()
            else:
                print(form.errors.as_json())
                
        if 'ch_pass' in request.POST:
            pass
        
        return redirect('fsc-settings')

    if request.user.is_authenticated:
        context = {"page_name" : "settings"}
        return render(request, 'main_webapp/settings.html', context=context)