from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.middleware.csrf import get_token

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):

    # Static credentials
    EMAIL = 'admin@gmail.com'
    VALID_PASSWORD = 'password123'
    
    # Extract credentials from request
    email = request.data.get('email', '')
    password = request.data.get('password', '')
    
    print(email, password)

    # Validate input
    if not email or not password:
        return Response({
            'error': 'Email and password are required'
        }, status=status.HTTP_400_BAD_REQUEST)

    # Check against static credentials
    if email == EMAIL and password == VALID_PASSWORD:
        user = User(id=1, email=email, username="admin")
        refresh = RefreshToken.for_user(user)
        
        response = JsonResponse({
            'status': True,    
            'message':"Login successful",   
            'data': {
                'id': user.id,
                'email': user.email,
                'name':"admin",
                'accessToken': str(refresh.access_token),

            }
        }, status=status.HTTP_200_OK)
        
        # Set the refresh token as a secure HTTP-only cookie
        response.set_cookie(
            key='refresh_token',
            value=str(refresh),
            httponly=True,
            secure=True,
            samesite='Strict'
        )
        
        # Set the CSRF token
        response['X-CSRFToken'] = get_token(request)
        
        return response
    
    return Response({
        'error': 'Invalid credentials'
    }, status=status.HTTP_401_UNAUTHORIZED)