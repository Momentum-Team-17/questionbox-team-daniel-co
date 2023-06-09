# Generated by Django 4.1.7 on 2023-03-30 14:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('questionbox', '0005_alter_answer_question'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='accepted_answer',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='accepted_for', to='questionbox.answer'),
        ),
    ]
