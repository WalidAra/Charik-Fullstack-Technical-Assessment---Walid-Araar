from django.urls import include, path

urlpatterns = [
    path('crm/', include('api.private.crm.urls')),  
    path('link/', include('api.private.link.urls')),    
]
