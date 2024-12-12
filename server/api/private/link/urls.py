from django.urls import path
from .views import link_contacts_deals

urlpatterns = [
    path('interactions/', link_contacts_deals, name='interaction'),
]