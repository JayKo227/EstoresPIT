from django.db import models


class Library(models.Model):
    library_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Author(models.Model):
    author_id = models.AutoField(primary_key=True)
    author_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    gender = models.CharField(max_length=10)

    def __str__(self):
        return self.author_name


class Book(models.Model):
    book_id = models.AutoField(primary_key=True)
    book_name = models.CharField(max_length=255)
    date_published = models.DateField()
    author_id = models.ForeignKey(Author, on_delete=models.CASCADE)
    library_id = models.ForeignKey(Library, on_delete=models.CASCADE)

    def __str__(self):
        return self.book_name


class Member(models.Model):
    member_id = models.AutoField(primary_key=True)
    book_id = models.ForeignKey(Book, on_delete=models.SET_NULL, null=True, blank=True)
    member_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    gender = models.CharField(max_length=10)
    birthyear = models.IntegerField()

    def __str__(self):
        return self.member_name
