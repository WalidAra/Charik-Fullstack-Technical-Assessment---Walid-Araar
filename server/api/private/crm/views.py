from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
import hubspot
from hubspot.crm.contacts import ApiException as ContactsApiException
from hubspot.crm.deals import ApiException as DealsApiException
from rest_framework.permissions import IsAuthenticated
import os

CRM_KEY = os.environ.get('CRM_KEY', '')

@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_contacts(request):

    try:
        client = hubspot.Client.create(access_token=CRM_KEY)
        # Fetch contacts
        api_response = client.crm.contacts.basic_api.get_page(limit=10, archived=False)
        # Serialize and return the response data
        contacts = [contact.to_dict() for contact in api_response.results]
        return Response({"contacts": contacts}, status=200)
    except ContactsApiException as e:
        # Log the error and return an error response
        print(f"Exception when calling basic_api->get_page: {e}")
        return Response({"error": f"Failed to fetch contacts: {str(e)}"}, status=500)


@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_deals(request):

    try:
        client = hubspot.Client.create(access_token=CRM_KEY)
        # Fetch deals
        api_response = client.crm.deals.basic_api.get_page(limit=10, archived=False)
        # Serialize and return the response data
        deals = [deal.to_dict() for deal in api_response.results]
        return Response({"deals": deals}, status=200)
    except DealsApiException as e:
        # Log the error and return an error response
        print(f"Exception when calling basic_api->get_page: {e}")
        return Response({"error": f"Failed to fetch deals: {str(e)}"}, status=500)
