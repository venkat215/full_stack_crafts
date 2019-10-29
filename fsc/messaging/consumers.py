import asyncio
import json
from django.contrib.auth import get_user_model
from channels.consumer import AsyncConsumer
from channels.db import database_sync_to_async
from .models import Thread, ChatMessage
import json

class MessageConsumer(AsyncConsumer):

    async def websocket_connect(self, event):
        print("Connected", event)
        await self.send(
            {"type" : "websocket.accept"}
        )
        other_user = self.scope['url_route']['kwargs']['username']
        current_user = self.scope['user']
        self.thread_obj = await self.get_thread(current_user, other_user)
        self.chat_room = f'thread_{self.thread_obj.id}'

        await self.channel_layer.group_add(
            self.chat_room,
            self.channel_name
        )

    async def websocket_receive(self, event):
        
        if event['text']:
            loaded_data = json.loads(event['text'])
            msg = loaded_data['message']
            user = self.scope['user']
            username = user.username

            response = {
                "message" : msg,
                "username" : username
            }
            
            await self.channel_layer.group_send(
                self.chat_room,
                {
                        "type" : "chat_message",
                        "text" : json.dumps(response)
                }
            )

            await self.create_message(user, msg)

    async def chat_message(self, event):
        await self.send({
            "type" : "websocket.send",
            "text" : event["text"]
        })
        #  {'type': 'websocket.receive', 'text': '{"message":"Super mame"}'}

    async def websocket_disconnect(self, event):
        print("disconnect", event)

    @database_sync_to_async
    def get_thread(self, user, other_user):
        return Thread.objects.get_or_new(user, other_user)[0]

    @database_sync_to_async
    def create_message(self, user, message):
        return ChatMessage.objects.create(thread=self.thread_obj, user=user, message=message)