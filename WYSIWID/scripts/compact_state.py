import yaml
import sys
import os
from datetime import datetime

def load_yaml(path):
    with open(path, 'r') as f:
        return yaml.safe_load(f)

def save_yaml(path, data):
    with open(path, 'w') as f:
        yaml.dump(data, f, sort_keys=False, default_flow_style=False)

def update_context(context_path, updates):
    """
    Updates the context.yaml file with new information.
    This is a helper script. In a real scenario, the AI would generate the 'updates' dictionary.
    """
    if not os.path.exists(context_path):
        print(f"Error: {context_path} not found.")
        return

    data = load_yaml(context_path)
    
    # Update Active State
    if 'active_state' in updates:
        for key, value in updates['active_state'].items():
            data['active_state'][key] = value
            
    # Add new decisions if any
    if 'new_decisions' in updates:
        if 'decisions' not in data:
            data['decisions'] = []
        data['decisions'].extend(updates['new_decisions'])

    # Save back
    save_yaml(context_path, data)
    print(f"✅ Context updated at {datetime.now().isoformat()}")

if __name__ == "__main__":
    # This script is intended to be called by the AI or a wrapper
    # For now, it just verifies the file exists and is valid YAML
    target_file = sys.argv[1] if len(sys.argv) > 1 else "context.yaml"
    
    try:
        data = load_yaml(target_file)
        print(f"Successfully loaded context for project: {data.get('project_context', {}).get('name')}")
    except Exception as e:
        print(f"Error reading context file: {e}")
