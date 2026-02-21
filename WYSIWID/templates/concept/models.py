# Data models and Pydantic schemas

from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class Item(BaseModel):
    id: str
    created_at: datetime
    updated_at: datetime

class CreateItemInput(BaseModel):
    # Define input fields
    name: str
    description: Optional[str] = None
