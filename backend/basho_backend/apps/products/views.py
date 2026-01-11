from django.shortcuts import render

from rest_framework import generics,status
from .models import Product
from .serializers import ProductSerializer,CustomOrderSerializer 
from .models import CustomOrder, CustomOrderImage
 
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from .models import CustomOrder

from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings


# List all products
class ProductListView(generics.ListAPIView):
    queryset = Product.objects.select_related("category").all()
    serializer_class = ProductSerializer


# Single product detail
class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.select_related("category").all()
    serializer_class = ProductSerializer
    lookup_field = "id"


# Products by category slug
class ProductByCategoryView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        slug = self.kwargs["slug"]
        return Product.objects.select_related("category").filter(
            category__slug=slug
        )


# Featured products
class FeaturedProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.select_related("category").filter(
            featured=True
        )

# Create custom order
class CustomOrderCreateView(generics.CreateAPIView):
    queryset = CustomOrder.objects.all()
    serializer_class = CustomOrderSerializer
    parser_classes = [MultiPartParser, FormParser]

    def get_serializer_context(self):
        # ensures serializer has access to request.FILES
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

def verify_custom_order_email(request, token):
    order = get_object_or_404(
        CustomOrder,
        email_verification_token=token
    )

    if order.email_verified:
        return HttpResponse(
            "Your email is already verified.",
            content_type="text/plain"
        )

    order.email_verified = True
    order.save(update_fields=["email_verified"])

    return HttpResponse(
        "<h2>Thank you! Your email has been successfully verified.</h2>"
        "<p>Thank you. We will contact you shortly.</p>"
    )

def perform_create(self, serializer):
    order = serializer.save()

    verification_link = (
        f"{settings.FRONTEND_URL}/verify-email/"
        f"{order.email_verification_token}/"
    )

    html_content = render_to_string(
        "email/verify_custom_order_email.html",
        {
            "name": order.name,
            "verification_link": verification_link,
        }
    )

    email = EmailMultiAlternatives(
        subject="Verify your custom order – Basho by Shivangi",
        body="Please verify your email to confirm your custom order.",
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[order.email],
    )

    email.attach_alternative(html_content, "text/html")
    email.send()
