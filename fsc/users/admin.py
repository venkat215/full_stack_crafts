from django.contrib import admin
from users.models import User, Profile
from django.utils.translation import gettext, gettext_lazy as _
from django.contrib.auth.admin import UserAdmin


UserAdmin.list_display = ('username', 'email', 'first_name', 'last_name', 'is_active', 'date_joined', 'is_staff', 'mobile_no', 'send_updates')
UserAdmin.fieldsets = (
    (None, {'fields': ('username', 'password')}),
    (_('Personal info'), {'fields': ('first_name', 'last_name', 'email', 'mobile_no', 'send_updates')}),
    (_('Permissions'), {
        'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
    }),
    (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
)

admin.site.register(User, UserAdmin)
admin.site.register(Profile)