# WRITE operations (Pure functions: State + Input -> New State)
# Constraint: Do not call external APIs or other Concepts if possible. Return the new state.

from typing import Any, Dict
# from .models import Item
# from .events import emit_item_created

def create_item(data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Creates a new item.
    """
    # 1. Validate
    if not data:
        raise ValueError("Data required")

    # 2. Persist (Own Schema)
    # item = Item.objects.create(**data)

    # 3. Emit Event (The only output)
    # emit_item_created(item)

    # return item
    return data
