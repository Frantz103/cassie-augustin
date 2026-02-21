# WYSIWID: Concept-Driven Agent Architecture

This directory contains the core protocols, memory structures, and tools for the **Concept-Driven Agent Architecture (CDAA)**.

## 📚 Table of Contents

| User | File | Purpose |
| :--- | :--- | :--- |
| **🤖 AI Agent** | [`context.yaml`](./context.yaml) | **READ FIRST.** The active memory and state of the project. |
| **🤖 AI Agent** | [`CODING-PHILOSOPHY.md`](./CODING-PHILOSOPHY.md) | The strict rules for "Concepts" and "Synchronizations". |
| **🤖 AI Agent** | [`pseudocode_reasoning_system.yaml`](./pseudocode_reasoning_system.yaml) | The "Plan → Execute → Answer" reasoning protocol. |
| **🤖 AI Agent** | [`QUALITY-STANDARDS.md`](./QUALITY-STANDARDS.md) | Security and Performance checklists. |
| **👨‍💻 Human** | [`Concept-Driven-Agent-Architecture.md`](./Concept-Driven-Agent-Architecture.md) | High-level explanation of the methodology. |
| **🛠 Tools** | [`scripts/`](./scripts/) | Automation for architecture validation and state management. |
| **📝 Templates** | [`templates/`](./templates/) | Boilerplate code for creating new Concepts. |

## 🚀 Quick Start for Agents

1.  **Read State**: Load `context.yaml` to understand the current project status.
2.  **Plan**: Use `pseudocode_reasoning_system.yaml` to plan your task.
3.  **Build**:
    *   If creating a new feature, use the **New Concept Workflow**.
    *   Copy templates from `templates/concept/`.
4.  **Verify**: Run `python scripts/validate_architecture.py` before finishing.
5.  **Update State**: Update `context.yaml` with any new decisions or completed tasks.

## 💻 CLI Setup (For Humans)

To easily manage WYSIWID projects, use the included CLI tool.

1.  **Add Alias**: Add the following to your shell configuration (e.g., `~/.zshrc`):
    ```bash
    alias wysiwid="/Users/frantzaugustin/Developer/WYSIWID/scripts/cli.py"
    ```
2.  **Reload Shell**: `source ~/.zshrc`
3.  **Usage**:
    *   `wysiwid create [project-name] --lang [ts|py]`: Creates a new project (default: ts).
    *   `wysiwid scan`: Scans your workspace for WYSIWID-compliant projects.
    *   `wysiwid install [project-name|all]`: Installs/Updates the kit in existing projects.
    *   `wysiwid update-all`: Updates ALL installed projects with the latest Master Kit.
