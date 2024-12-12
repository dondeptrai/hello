import os
import django
from typing import List

from fastapi import FastAPI

# Cấu hình Django môi trường
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "adminapp.settings") # Thay tên_project
django.setup()

from rest_framework.renderers import JSONRenderer
from ..adminapp.myapp.serializers import PartSerializer 
from django.db import connections

app = FastAPI()

@app.get("/parts/", response_model=List[PartSerializer.Meta.model])
async def get_parts():
    with connections['default'].cursor() as cursor:
        cursor.execute("SELECT * FROM parts")
        parts_raw = cursor.fetchall()
    parts = [dict(zip([col[0] for col in cursor.description], row)) for row in parts_raw]

    return parts