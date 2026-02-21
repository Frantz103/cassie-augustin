# WYSIWID Quality Standards

## 🛡️ Security
1.  **Input Validation**: NEVER trust user input. Validate all data at the Concept boundary (in `actions.ts` or `models.py`).
2.  **Secrets Management**: NEVER hardcode API keys or credentials. Use environment variables (`process.env` or `os.environ`).
3.  **SQL Injection**: ALWAYS use parameterized queries or ORM methods. NEVER concatenate strings into SQL.
4.  **Authorization**: Verify ownership before modifying data (e.g., `WHERE user_id = current_user.id`).

## ⚡ Performance
1.  **Database Indexing**: Ensure all Foreign Keys and frequently searched columns are indexed.
2.  **N+1 Queries**: Avoid loops that trigger DB queries. Fetch data in bulk (`.include()`, `.prefetch_related()`).
3.  **Pagination**: NEVER return unbounded lists. Always enforce a `limit` and `offset`.
4.  **Async Operations**: Offload heavy tasks (emails, image processing) to background jobs via Synchronizations.

## 🧹 Code Quality
1.  **Type Safety**: Avoid `any` (TS) or untyped dictionaries (Python). Use Interfaces/Pydantic models.
2.  **Error Handling**: Catch specific errors, not generic `Exception`. Return meaningful error messages.
3.  **Testing**: Every Concept must have unit tests for its Actions.
