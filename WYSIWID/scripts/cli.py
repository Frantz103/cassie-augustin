#!/usr/bin/env python3
import argparse
import os
import shutil
import sys
import yaml
import json

# Constants
# Assuming this script is located in /Developer/WYSIWID/scripts/
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
KIT_ROOT = os.path.dirname(SCRIPT_DIR) # /Developer/WYSIWID
WORKSPACE_ROOT = os.path.dirname(KIT_ROOT) # /Developer

def load_yaml(path):
    with open(path, 'r') as f:
        return yaml.safe_load(f)

def save_yaml(path, data):
    with open(path, 'w') as f:
        yaml.dump(data, f, sort_keys=False, default_flow_style=False)

def create_project(project_name, language="ts"):
    target_dir = os.path.join(WORKSPACE_ROOT, project_name)
    
    if os.path.exists(target_dir):
        print(f"❌ Error: Directory '{project_name}' already exists.")
        return

    print(f"🚀 Creating new WYSIWID project ({language}): {project_name}...")
    
    # 1. Create Project Directory
    os.makedirs(target_dir)
    
    # 2. Copy the WYSIWID Kit
    target_kit_dir = os.path.join(target_dir, "WYSIWID")
    shutil.copytree(KIT_ROOT, target_kit_dir, ignore=shutil.ignore_patterns('.git', '__pycache__', 'node_modules'))
    
    # 3. Initialize Standard Directory Structure
    src_dir = os.path.join(target_dir, "src")
    os.makedirs(os.path.join(src_dir, "concepts"))
    os.makedirs(os.path.join(src_dir, "synchronizations"))
    
    # 4. Configure Templates based on Language
    templates_dir = os.path.join(target_kit_dir, "templates")
    ts_concept = os.path.join(templates_dir, "concept")
    py_concept = os.path.join(templates_dir, "python_concept")

    if language == "py":
        # Remove TS templates, Rename PY templates to 'concept'
        if os.path.exists(ts_concept):
            shutil.rmtree(ts_concept)
        if os.path.exists(py_concept):
            os.rename(py_concept, ts_concept) # Rename python_concept -> concept
            print("   ✅ Configured Python templates")
    else:
        # Remove PY templates, Keep TS templates as 'concept'
        if os.path.exists(py_concept):
            shutil.rmtree(py_concept)
            print("   ✅ Configured TypeScript templates")

    # 5. Update context.yaml for the new project
    context_path = os.path.join(target_kit_dir, "context.yaml")
    if os.path.exists(context_path):
        try:
            data = load_yaml(context_path)
            data['project_context']['name'] = project_name
            data['project_context']['description'] = f"New {language} project created via WYSIWID CLI"
            
            # Update stack based on language
            if language == "py":
                data['project_context']['stack'] = ["Language: Python", "Architecture: WYSIWID"]
            else:
                data['project_context']['stack'] = ["Language: TypeScript", "Architecture: WYSIWID"]
                
            data['active_state']['current_focus'] = "Project Initialization"
            data['active_state']['active_tasks'] = ["Setup dependencies", "Define first concept"]
            save_yaml(context_path, data)
        except Exception as e:
            print(f"⚠️ Warning: Could not update context.yaml: {e}")

    # 6. Create a root CLAUDE.md pointing to the kit
    claude_md_content = f"""# CLAUDE.md - {project_name}

## 🚨 CRITICAL INSTRUCTION
This project uses the **Concept-Driven Agent Architecture (CDAA)**.
Before doing ANYTHING, you MUST read the protocols in the `WYSIWID/` directory.

1. **Read Memory**: `WYSIWID/context.yaml`
2. **Read Rules**: `WYSIWID/CODING-PHILOSOPHY.md` & `WYSIWID/QUALITY-STANDARDS.md`
3. **Plan**: `WYSIWID/pseudocode_reasoning_system.yaml`

Refer to `WYSIWID/README.md` for full documentation.
"""
    with open(os.path.join(target_dir, "CLAUDE.md"), "w") as f:
        f.write(claude_md_content)

    print(f"✅ Project '{project_name}' created successfully at {target_dir}")
    print(f"   - WYSIWID Kit installed")
    print(f"   - /src/concepts & /src/synchronizations created")
    print(f"   - Language: {language}")
    print(f"   - context.yaml initialized")

def scan_projects():
    print(f"🔍 Scanning workspace: {WORKSPACE_ROOT}")
    print(f"{'PROJECT':<30} | {'STATUS':<15} | {'VERSION'}")
    print("-" * 60)
    
    projects = [d for d in os.listdir(WORKSPACE_ROOT) if os.path.isdir(os.path.join(WORKSPACE_ROOT, d))]
    projects.sort()
    
    for project in projects:
        if project.startswith('.'): continue # Skip hidden dirs
        
        project_path = os.path.join(WORKSPACE_ROOT, project)
        kit_path = os.path.join(project_path, "WYSIWID")
        context_path = os.path.join(kit_path, "context.yaml")
        
        status = "❌ Missing"
        version = "-"
        
        if os.path.exists(kit_path):
            status = "⚠️ Partial"
            if os.path.exists(context_path):
                status = "✅ Installed"
                # Try to read version or just confirm valid yaml
                try:
                    # Assuming we might add version to context later, for now just check existence
                    version = "1.0" 
                except:
                    version = "Error"
        
        print(f"{project:<30} | {status:<15} | {version}")

def install_kit(project_name, language="ts"):
    target_dir = os.path.join(WORKSPACE_ROOT, project_name)
    if not os.path.exists(target_dir):
        print(f"❌ Error: Project '{project_name}' does not exist.")
        return

    print(f"🛠  Installing WYSIWID Kit into: {project_name} ({language})...")

    # 1. Copy/Update WYSIWID Folder
    target_kit_dir = os.path.join(target_dir, "WYSIWID")
    existing_context = None
    
    if os.path.exists(target_kit_dir):
        # Backup context.yaml if it exists
        context_path = os.path.join(target_kit_dir, "context.yaml")
        if os.path.exists(context_path):
            try:
                existing_context = load_yaml(context_path)
            except Exception as e:
                print(f"   ⚠️ Could not read existing context.yaml: {e}")
        
        # Remove old kit to ensure clean update
        shutil.rmtree(target_kit_dir)
    
    # Copy new Kit
    shutil.copytree(KIT_ROOT, target_kit_dir, ignore=shutil.ignore_patterns('.git', '__pycache__', 'node_modules'))
    
    # Restore or Initialize context.yaml
    context_path = os.path.join(target_kit_dir, "context.yaml")
    if existing_context:
        try:
            # We overwrite the fresh template with the old data to preserve user memory
            save_yaml(context_path, existing_context)
            print("   ✅ Restored existing context.yaml")
        except Exception as e:
            print(f"   ⚠️ Error restoring context: {e}")
    else:
        # Initialize new context
        try:
            data = load_yaml(context_path)
            data['project_context']['name'] = project_name
            save_yaml(context_path, data)
            print("   ✅ Initialized new context.yaml")
        except:
            pass

    # 2. Configure Templates based on Language
    templates_dir = os.path.join(target_kit_dir, "templates")
    ts_concept = os.path.join(templates_dir, "concept")
    py_concept = os.path.join(templates_dir, "python_concept")

    if language == "py":
        if os.path.exists(ts_concept):
            shutil.rmtree(ts_concept)
        if os.path.exists(py_concept):
            os.rename(py_concept, ts_concept)
            print("   ✅ Configured Python templates")
    else:
        if os.path.exists(py_concept):
            shutil.rmtree(py_concept)
            print("   ✅ Configured TypeScript templates")

    # 3. Ensure src structure
    src_dir = os.path.join(target_dir, "src")
    if not os.path.exists(src_dir):
        os.makedirs(src_dir)
        print("   ✅ Created src/ directory")
    
    for folder in ["concepts", "synchronizations"]:
        path = os.path.join(src_dir, folder)
        if not os.path.exists(path):
            os.makedirs(path)
            print(f"   ✅ Created src/{folder}")

    # 3. CLAUDE.md
    claude_path = os.path.join(target_dir, "CLAUDE.md")
    if not os.path.exists(claude_path):
        claude_md_content = f"""# CLAUDE.md - {project_name}

## 🚨 CRITICAL INSTRUCTION
This project uses the **Concept-Driven Agent Architecture (CDAA)**.
Before doing ANYTHING, you MUST read the protocols in the `WYSIWID/` directory.

1. **Read Memory**: `WYSIWID/context.yaml`
2. **Read Rules**: `WYSIWID/CODING-PHILOSOPHY.md` & `WYSIWID/QUALITY-STANDARDS.md`
3. **Plan**: `WYSIWID/pseudocode_reasoning_system.yaml`

Refer to `WYSIWID/README.md` for full documentation.
"""
        with open(claude_path, "w") as f:
            f.write(claude_md_content)
        print("   ✅ Created CLAUDE.md")

    print(f"✅ Successfully installed WYSIWID in {project_name}")

def install_all():
    print("🚀 Starting bulk installation...")
    projects = [d for d in os.listdir(WORKSPACE_ROOT) if os.path.isdir(os.path.join(WORKSPACE_ROOT, d))]
    for project in projects:
        if project.startswith('.'): continue
        if project == "WYSIWID": continue # Don't install into itself
        
        project_path = os.path.join(WORKSPACE_ROOT, project)
        kit_path = os.path.join(project_path, "WYSIWID")
        context_path = os.path.join(kit_path, "context.yaml")
        
        # Check if missing or partial
        is_missing = not os.path.exists(kit_path)
        is_partial = os.path.exists(kit_path) and not os.path.exists(context_path)
        
        if is_missing or is_partial:
            install_kit(project)
        else:
            print(f"⏭️  Skipping {project} (Already installed)")

def update_all():
    print("🚀 Starting bulk update of all installed projects...")
    projects = [d for d in os.listdir(WORKSPACE_ROOT) if os.path.isdir(os.path.join(WORKSPACE_ROOT, d))]
    count = 0
    
    for project in projects:
        if project.startswith('.'): continue
        if project == "WYSIWID": continue
        
        project_path = os.path.join(WORKSPACE_ROOT, project)
        kit_path = os.path.join(project_path, "WYSIWID")
        context_path = os.path.join(kit_path, "context.yaml")
        
        # Only update if it's already installed
        if os.path.exists(kit_path) and os.path.exists(context_path):
            # Detect language from context.yaml or default to TS
            lang = "ts"
            try:
                data = load_yaml(context_path)
                stack = str(data.get('project_context', {}).get('stack', []))
                if "Python" in stack:
                    lang = "py"
            except: pass
            
            print(f"🔄 Updating {project} ({lang})...")
            install_kit(project, lang)
            count += 1
            
    print(f"✨ Update complete! Updated {count} projects.")

def get_api_key():
    env_path = os.path.join(WORKSPACE_ROOT, ".env")
    if not os.path.exists(env_path):
        return None
    
    with open(env_path, "r") as f:
        for line in f:
            line = line.strip()
            if line.startswith("CONTEXT7_API_KEY="):
                val = line.split("=", 1)[1]
                return val.strip('"').strip("'")
    return None

def get_project_dependencies(path):
    deps = []
    
    # 1. Node.js (package.json)
    pkg_json = os.path.join(path, "package.json")
    if os.path.exists(pkg_json):
        try:
            with open(pkg_json, 'r') as f:
                data = json.load(f)
                deps.extend(data.get('dependencies', {}).keys())
                deps.extend(data.get('devDependencies', {}).keys())
        except: pass

    # 2. Python (requirements.txt)
    req_txt = os.path.join(path, "requirements.txt")
    if os.path.exists(req_txt):
        try:
            with open(req_txt, 'r') as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith('#'):
                        import re
                        name = re.split(r'[=<>!]', line)[0].strip()
                        if name: deps.append(name)
        except: pass

    # 3. Ruby (Gemfile)
    gemfile = os.path.join(path, "Gemfile")
    if os.path.exists(gemfile):
        try:
            with open(gemfile, 'r') as f:
                for line in f:
                    line = line.strip()
                    if line.startswith("gem"):
                        parts = line.split(',')
                        first_part = parts[0]
                        import re
                        match = re.search(r"['\"](.*?)['\"]", first_part)
                        if match:
                            deps.append(match.group(1))
        except: pass
    
    return sorted(list(set(deps)))

def search_context7(query):
    import urllib.request
    import urllib.error
    import json
    import ssl

    api_key = get_api_key()
    if not api_key:
        print(f"❌ Error: CONTEXT7_API_KEY not found in {os.path.join(WORKSPACE_ROOT, '.env')}")
        return

    url = f"https://context7.com/api/v2/search?query={urllib.parse.quote(query)}"
    req = urllib.request.Request(url)
    req.add_header("Authorization", f"Bearer {api_key}")

    # Bypass SSL verification for macOS Python issues
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    print(f"🔍 Searching Context7 for: {query}...")
    try:
        with urllib.request.urlopen(req, context=ctx) as response:
            data = json.loads(response.read().decode())
            print(json.dumps(data, indent=2))
    except urllib.error.HTTPError as e:
        print(f"❌ HTTP Error: {e.code} - {e.reason}")
    except Exception as e:
        print(f"❌ Error: {e}")

def main():
    parser = argparse.ArgumentParser(description="WYSIWID CLI Tool")
    subparsers = parser.add_subparsers(dest="command", help="Available commands")
    
    # Create Command
    create_parser = subparsers.add_parser("create", help="Create a new WYSIWID-based project")
    create_parser.add_argument("name", help="Name of the new project")
    create_parser.add_argument("--lang", choices=["ts", "py"], default="ts", help="Programming language (ts or py)")
    
    # Scan Command
    subparsers.add_parser("scan", help="Scan workspace for WYSIWID compliance")
    
    # Install Command
    install_parser = subparsers.add_parser("install", help="Install WYSIWID kit into an existing project")
    install_parser.add_argument("name", help="Project name or 'all' to fix all missing/partial projects")
    install_parser.add_argument("--lang", choices=["ts", "py"], default="ts", help="Programming language (ts or py)")

    # Update All Command
    subparsers.add_parser("update-all", help="Update all installed projects with the latest Master Kit")

    # Search Command
    search_parser = subparsers.add_parser("search", help="Search Context7 or scan dependencies")
    search_parser.add_argument("query", nargs="?", help="Query string. If omitted, scans project dependencies.")

    args = parser.parse_args()
    
    if args.command == "create":
        create_project(args.name, args.lang)
    elif args.command == "scan":
        scan_projects()
    elif args.command == "install":
        if args.name == "all":
            install_all()
        else:
            install_kit(args.name, args.lang)
    elif args.command == "update-all":
        update_all()
    elif args.command == "search":
        if args.query:
            search_context7(args.query)
        else:
            deps = get_project_dependencies(os.getcwd())
            if not deps:
                print("⚠️  No dependencies found in current directory (checked package.json, requirements.txt, Gemfile).")
            else:
                print(f"📦 Found dependencies: {', '.join(deps)}")
                for dep in deps:
                    search_context7(dep)
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
