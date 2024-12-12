from rest_framework.response import Response
from rest_framework import status
import json
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

contacts_deals = []

@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def link_contacts_deals(request):
    try:
        email = request.data.get('email', '')
        deal_id = request.data.get('deal_id', '')
        user_id = request.user.id 

        if not email or not deal_id:
            return Response({
                'error': 'Email and dealId are required'
            }, status=status.HTTP_400_BAD_REQUEST)

        contact_deal = {
            "userId": user_id,
            "email": email,
            "dealId": deal_id
        }

        contacts_deals.append(contact_deal)

        return Response({
            "message": "Contact linked to deal successfully"
        }, status=status.HTTP_201_CREATED)

    except json.JSONDecodeError:
        return Response({
            'error': 'Invalid JSON body'
        }, status=status.HTTP_400_BAD_REQUEST)
