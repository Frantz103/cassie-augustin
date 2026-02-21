### **Protocol: AI Context Structured Archiving**

**Objective:** To maintain a high-fidelity, token-efficient state across long development sessions by replacing narrative summaries with structured data schemas.

### **Phase 1: Define the "State Schema"**

**Rule:** Every project must have a rigid schema that defines what the AI needs to "remember." Do not let the AI decide what is important; force it to fill specific buckets. **Format:** Use **YAML** for its balance of readability and token density.

#### **Example: Competitor-Pulse Schema**

For your competitive intelligence app, the schema tracks the tech stack, decisions, and data models.  
`# THE SCHEMA`  
`project_context:`  
  `name: "Competitor-Pulse"`  
  `stack: [Electron, TypeScript, Ruby, SQLite]`

`# 1. ENTITY MEMORY (Facts established)`  
`entities:`  
  `- targets: [Brand A, Brand B]`  
  `- data_sources: [Social Media, SEO APIs, News Feeds]`

`# 2. DECISION LOG (Immutable choices)`  
`decisions:`  
  `- id: DEC-001`  
    `topic: "Database Choice"`  
    `outcome: "SQLite (Local-First)"`  
    `reason: "Privacy focus, no cloud costs"`  
  `- id: DEC-002`  
    `topic: "Data Format"`  
    `outcome: "TOON for LLM inputs, JSON for app state"`

`# 3. ACTIVE CONTEXT (Current workspace)`  
`active_state:`  
  `current_focus: "Building the Scraper Interface"`  
  `open_files: ["scraper.ts", "App.tsx"]`  
  `last_error: "TimeoutError on headless browser launch"`

### **Phase 2: The Extraction Routine (The "Compactor")**

**Rule:** Do not summarize the conversation linearly. Instead, run a "State Update" job. **Trigger:** Run this every **10-15 turns** or when a major task (like a file write) is completed.

#### **The "Extraction Prompt"**

This is the hidden system prompt you send to a cheaper model (like GPT-4o-mini) to generate the archive.  
**System Prompt:** "You are a State Manager. Your goal is to update the Project Archive based on the recent conversation.  
**Input:**

1. The OLD Archive (YAML)  
2. The RECENT Conversation (Text)

**Instructions:**

* **Compare:** Look at the Recent Conversation. Does it contradict or add to the Old Archive?  
* **Update:** If a decision was made (e.g., 'Let's switch to Postgres'), update the decisions list.  
* **Track:** If the user is debugging a specific error, update active\_state.last\_error.  
* **Prune:** Remove tasks from active\_state that were confirmed as 'done'.  
* **Output:** Return ONLY the updated YAML. Do not add markdown or conversational text."

### **Phase 3: The Context Injection (The "Primer")**

**Rule:** When the user sends a new message, do not send the full history. Send the **Archive** \+ **Recent Buffer**.

#### **Competitor-Pulse Example Injection**

When you (Frantz) ask: *"Okay, the error is gone. Now how do I visualize the data?"*  
**What the AI actually sees (The Context Window):**  
`[SYSTEM]`  
`You are an expert developer.`

`[PROJECT ARCHIVE]`  
`project: Competitor-Pulse`  
`stack: [Electron, TypeScript, Ruby]`  
`decisions:`  
  `- topic: Visualization Library`  
    `outcome: PENDING (Considering D3 vs Recharts)`  
`active_state:`  
  `current_focus: Scraper Interface`  
  `last_status: "Headless browser timeout fixed"`

`[RECENT BUFFER - Last 3 Messages]`  
`User: I fixed the timeout by increasing the limit to 30s.`  
`AI: Great. Is the scraper returning data now?`  
`User: Yes, the error is gone. Now how do I visualize the data?`

**Why this works:** The AI knows *exactly* that you are in Electron/TypeScript and that the "Visualization Library" decision is still pending, without reading 50 pages of chat log.

### **Phase 4: Implementation Checklist (For your Dev Workflow)**

For your projects (Lillie-Writings, Competitor-Pulse), implement this using a simple file-based approach if you are using a custom script, or manually via a "Project File" if using a chat UI.

1. **Create a context.yaml file** in the root of your project.  
2. **Paste the Schema** (from Phase 1\) into it.  
3. **Manual Workflow:** Before starting a new coding session, copy the content of context.yaml into your chat.  
4. **End of Session:** Ask the AI: *"Update the context.yaml based on what we did today."*  
5. **Save:** Paste the result back into your file.

This creates a "Save Point" for your development reasoning, allowing you to pick up complex context months later without retraining the AI on the project history.