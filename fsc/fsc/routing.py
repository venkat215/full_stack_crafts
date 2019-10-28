from django.conf.urls import url
from django.urls import path, include
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator, OriginValidator
from channels.auth import AuthMiddlewareStack


application = ProtocolTypeRouter({
    # Empty for now (http->django views is added by default)
    # 'websocket': AllowedHostsOriginValidator(
    #     AuthMiddlewareStack(
    #         URLRouter
    #             [
    #                 'None'
    #             ]
    #     )
    # )
})