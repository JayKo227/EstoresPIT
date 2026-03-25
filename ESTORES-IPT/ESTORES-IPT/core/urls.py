from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LibraryViewSet, AuthorViewSet, BookViewSet, MemberViewSet

router = DefaultRouter()
router.register(r'libraries', LibraryViewSet)
router.register(r'authors', AuthorViewSet)
router.register(r'books', BookViewSet)
router.register(r'members', MemberViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
