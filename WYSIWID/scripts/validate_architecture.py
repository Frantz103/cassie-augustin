import os
import re
import sys

def check_imports(root_dir):
    concepts_dir = os.path.join(root_dir, 'src', 'concepts')
    if not os.path.exists(concepts_dir):
        print(f"Concepts directory not found at {concepts_dir}")
        return

    errors = []
    
    # Iterate through all concepts
    for concept_name in os.listdir(concepts_dir):
        concept_path = os.path.join(concepts_dir, concept_name)
        if not os.path.isdir(concept_path):
            continue
            
        # Check all files in this concept
        for root, _, files in os.walk(concept_path):
            for file in files:
                if not file.endswith(('.ts', '.tsx', '.js', '.jsx')):
                    continue
                    
                file_path = os.path.join(root, file)
                with open(file_path, 'r') as f:
                    lines = f.readlines()
                    
                for i, line in enumerate(lines):
                    # Regex to find imports from other concepts
                    # Matches: import ... from "../../other-concept/..."
                    # We want to forbid importing from "../<other_concept>"
                    
                    # This is a simple heuristic. 
                    # If we are in /concepts/A, we cannot import /concepts/B
                    
                    match = re.search(r'from\s+[\'"](.+)[\'"]', line)
                    if match:
                        import_path = match.group(1)
                        
                        # Check if import path points to another concept
                        if '/concepts/' in import_path:
                            # Extract target concept from path
                            parts = import_path.split('/concepts/')
                            if len(parts) > 1:
                                target_concept = parts[1].split('/')[0]
                                
                                if target_concept != concept_name and target_concept != '..':
                                    errors.append(
                                        f"VIOLATION in {concept_name}/{file}:{i+1}\n"
                                        f"  Importing '{target_concept}' is forbidden.\n"
                                        f"  Concepts must be isolated. Use Synchronizations instead."
                                    )

    if errors:
        print("❌ ARCHITECTURE VIOLATIONS FOUND:")
        for error in errors:
            print(error)
        sys.exit(1)
    else:
        print("✅ Architecture check passed: No cross-concept imports found.")

if __name__ == "__main__":
    # Default to current directory if not specified
    target_dir = sys.argv[1] if len(sys.argv) > 1 else os.getcwd()
    check_imports(target_dir)
