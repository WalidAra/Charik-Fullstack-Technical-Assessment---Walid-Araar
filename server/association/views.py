from django.http import JsonResponse
from .models import Association
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def create_association(request):
    if request.method == 'POST':
        # Get data from JSON body
        email = request.data.get('email')
        deal_id = request.data.get('deal_id')
        
        print("Here:", email, deal_id)
        
        # Validate email and deal_id
        if not email or not deal_id:
            return JsonResponse({'success': False, 'error': 'Email and deal_id are required.'}, status=400)
        
        try:
            # Create the association
            association = Association.objects.create(email=email, deal_id=deal_id)
            return JsonResponse({'success': True, 'id': association.id})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)}, status=500)

    return JsonResponse({'success': False, 'error': 'Invalid request method.'}, status=405)


@csrf_exempt
@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_associations(request):
    try:
        associations = Association.objects.all()
        associations_data = [
            {
                'id': association.id,
                'email': association.email,
                'deal_id': association.deal_id,
            }
            for association in associations
        ]
        return JsonResponse({'success': True, 'associations': associations_data})
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)})
