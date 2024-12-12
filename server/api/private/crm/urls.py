from django.urls import path
from .views import get_contacts ,get_deals
urlpatterns = [
    path('contacts/', get_contacts, name='get_contacts'),
    path('deals/', get_deals, name='get_deals'),
]