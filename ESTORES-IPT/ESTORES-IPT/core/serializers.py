from rest_framework import serializers
from .models import Library, Author, Book, Member


class LibrarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Library
        fields = '__all__'


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'


class BookSerializer(serializers.ModelSerializer):
    # Shows the author name in the response, not just the ID
    author_name = serializers.ReadOnlyField(source='author_id.author_name')

    class Meta:
        model = Book
        fields = ['book_id', 'book_name', 'date_published', 'author_id', 'author_name', 'library_id']


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'
