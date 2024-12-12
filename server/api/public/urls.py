from django.urls import include, path

urlpatterns = [
    path('auth/', include('api.public.auth.urls')),
]
