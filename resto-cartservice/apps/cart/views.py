from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer

class CartView(APIView):
    def get(self, request, user_id):
        cart, created = Cart.objects.get_or_create(user_id=user_id)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def post(self, request, user_id):
        cart, created = Cart.objects.get_or_create(user_id=user_id)
        serializer = CartItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(cart=cart)
            cart_serializer = CartSerializer(cart)
            return Response(cart_serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CartItemView(APIView):
    def put(self, request, user_id, item_id):
        try:
            cart = Cart.objects.get(user_id=user_id)
            item = cart.items.get(id=item_id)
        except (Cart.DoesNotExist, CartItem.DoesNotExist):
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = CartItemSerializer(item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            cart_serializer = CartSerializer(cart)
            return Response(cart_serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, user_id, item_id):
        try:
            cart = Cart.objects.get(user_id=user_id)
            item = cart.items.get(id=item_id)
        except (Cart.DoesNotExist, CartItem.DoesNotExist):
            return Response(status=status.HTTP_404_NOT_FOUND)

        item.delete()
        cart_serializer = CartSerializer(cart)
        return Response(cart_serializer.data)

class CheckoutView(APIView):
    def post(self, request, user_id):
        try:
            cart = Cart.objects.get(user_id=user_id)
        except Cart.DoesNotExist:
            return Response({"error": "Cart not found"}, status=status.HTTP_404_NOT_FOUND)

        # Here you would typically process the order, clear the cart, etc.
        # For this example, we'll just return the cart data as if it were an order
        serializer = CartSerializer(cart)
        cart.items.all().delete()  # Clear the cart
        return Response(serializer.data)
