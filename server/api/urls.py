from django.urls import include, path

urlpatterns = [
    path('public/', include('api.public.urls')), 
    path('private/', include('api.private.urls')), 
]
