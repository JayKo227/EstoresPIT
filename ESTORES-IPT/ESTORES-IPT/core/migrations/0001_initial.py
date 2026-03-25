from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Author',
            fields=[
                ('author_id', models.AutoField(primary_key=True, serialize=False)),
                ('author_name', models.CharField(max_length=255)),
                ('phone_number', models.CharField(max_length=20)),
                ('gender', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Library',
            fields=[
                ('library_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Book',
            fields=[
                ('book_id', models.AutoField(primary_key=True, serialize=False)),
                ('book_name', models.CharField(max_length=255)),
                ('date_published', models.DateField()),
                ('author_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.author')),
                ('library_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.library')),
            ],
        ),
        migrations.CreateModel(
            name='Member',
            fields=[
                ('member_id', models.AutoField(primary_key=True, serialize=False)),
                ('member_name', models.CharField(max_length=255)),
                ('phone_number', models.CharField(max_length=20)),
                ('gender', models.CharField(max_length=10)),
                ('birthyear', models.IntegerField()),
                ('book_id', models.ForeignKey(null=True, blank=True, on_delete=django.db.models.deletion.SET_NULL, to='core.book')),
            ],
        ),
    ]
