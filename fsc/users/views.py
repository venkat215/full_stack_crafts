from django.shortcuts import render, redirect
from django.utils.datastructures import MultiValueDictKeyError
# from django.contrib.auth.forms import UserCreationForm
from django.http import Http404
import logging
from .forms import SignUpForm
from django.contrib import messages
import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

HOST = "http://127.0.0.1:8000"

def register(request):

    if request.user.is_authenticated:
        context = {"page_name" : "login"}   
        return render(request, 'users/logged_in.html', context=context)

    if request.method == 'POST':
        
        # form = UserCreationForm(request.POST)
        form = SignUpForm(request.POST)
        req_path = form.data.get('req_path')
        
        if json.loads(form.errors.as_json()):
            try:
                json.loads(form.errors.as_json())['username']
                messages.error(request, {"user_error" : "That username is taken!"}, extra_tags='user_error')
            except KeyError:
                pass

            try:
                json.loads(form.errors.as_json())['email']
                messages.error(request, {"email_error" : "Existing Email"}, extra_tags='email_error')
            except KeyError:
                pass

            # messages.warning(request, 'Account creation failed!', extra_tags="display")

        if form.is_valid():
            form.save()
            # username = form.cleaned_data.get('username')
            # messages.success(request, f'Account created for user {username}!. Logging in...')
            return login_user(request, on_register = True)

            # if req_path != '/users/register/':
            #     return redirect(f'{HOST}{req_path}')
            # return redirect('fsc-home')
        else:
            logging.error('Invalid Form')

        if req_path != '/users/register/':
            return redirect(f'{HOST}{req_path}')

    context = {"page_name" : "register"}
    return render(request, 'users/register_form.html', context = context)

def login_user(request, on_register = False):

    if request.user.is_authenticated:
        context = {"page_name" : "login"}   
        return render(request, 'users/logged_in.html', context=context)

    username = password = ''

    try:
        next_url = request.GET['next']
    except:
        next_url = None

    if request.POST:
        username = request.POST['username']
        if not on_register:
            password = request.POST['password']
        else:
            password = request.POST['password1']

        req_path = request.POST['req_path']

        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                # if user.username:
                #     messages.success(request, f'Successfully signed in as  {user.username}!', extra_tags="display")
                # else:
                #     messages.success(request, f'You are now logged in as {user.email}!', extra_tags="display")
                    
                if next_url:
                    return redirect(f'{HOST}{next_url}')

                if req_path != '/users/login/' and req_path != '/users/register/':
                    return redirect(f'{HOST}{req_path}')
                return redirect('fsc-home')

        else:

            # messages.error(request, 'Login Failed!', extra_tags="display")
            messages.error(request, 'login_error', extra_tags='login_error')

    context = {"page_name" : "login"}   
    return render(request, 'users/login.html', context=context)

def logout_user(request):

    try:
        logout(request)
        # messages.info(request, 'Logged out!', extra_tags="display")
    except Exception as e:
        logging.error(str(e))
        # messages.error(request, 'Failed to log out!', extra_tags="display")
        
    return redirect('fsc-home')

@login_required
def current_user(request):

    if request.user.is_authenticated:
        context = {"page_name" : request.user.first_name}
        return render(request, 'users/logged_in.html', context=context)