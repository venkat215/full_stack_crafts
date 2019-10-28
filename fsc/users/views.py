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
import requests
import random, string
import json
from django.contrib.staticfiles.templatetags.staticfiles import static
from .models import User

# HOST = "http://127.0.0.1:8000"

def register(request):

    if request.user.is_authenticated:
        context = {"page_name" : "login"}   
        return render(request, 'users/logged_in.html', context=context)

    if request.method == 'POST':
        
        # form = UserCreationForm(request.POST)
        form = SignUpForm(request.POST)
        req_path = form.data.get('req_path')
        
        if json.loads(form.errors.as_json()):
            # try:
            #     json.loads(form.errors.as_json())['username']
            #     messages.error(request, {"user_error" : "That username is taken!"}, extra_tags='user_error')
            # except KeyError:
            #     pass  
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
            print('Invalid Form')
            logging.error('Invalid Form')

        if req_path != '/users/register/':
            return redirect(f'{req_path}')

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

        print(request.POST)

        username = request.POST['email']
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
                
                try:
                    request.POST['rem_me']
                except:
                    request.session.set_expiry(0)
                if next_url:
                    return redirect(f'{next_url}')

                if req_path != '/users/login/' and req_path != '/users/register/':
                    return redirect(f'{req_path}')
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
def user_profile(request, username):

    if request.user.is_authenticated:

        if not username == request.user.username:
             user = User.objects.get(username=username)
        else:
            user = request.user

        context = {"page_name" : user.first_name,
                   "username" : user.username,
                   "email" : user.email,
                   "first_name" : user.first_name,
                   "last_name" : user.last_name,
                   "bio" : user.profile.bio,
                   "dp" :  user.profile.dp.url,
                   "dob" :  user.profile.dob}

        return render(request, 'users/user_profile.html', context=context)

def linkedin_login(request):

    pass
    # client_id = '81oahhoeuge54t'
    # client_secret = '60JfRvh7JjGRJCT0'
    # redirect_url = 'https://127.0.0.1:8000/users/accounts/linkedin_login/login/callback/'
    # state = ''.join(random.choices(string.ascii_letters + string.digits, k=16))
    # scope = "r_basicprofile%20r_emailaddress"

    # return redirect(f'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id={client_id}&redirect_uri={redirect_url}&state={state}&scope={scope}')
    

def linkedin_login_callback(request):

    pass

    # url = 'https://www.linkedin.com/oauth/v2/accessToken'

    # headers = {"Content-Type" : "application/x-www-form-urlencoded"}
    # code = request.GET['code']
    # print(code)

    # data = {"code" : request.GET['code'],
    #             "client_id" : '81oahhoeuge54t',
    #             "client_secret" : '60JfRvh7JjGRJCT0',
    #             "redirect_url" : 'https://127.0.0.1:8000/users/accounts/linkedin_login/login/callback/',
    #             "grant_type" : 'authorization_code',
    #             }

    # data = json.dumps(data)

    # resp = requests.post(url, headers=headers, data=data)
    # print(resp.content)

    # return redirect(f'fsc-home')