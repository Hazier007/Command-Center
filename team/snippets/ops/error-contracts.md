# Error contracts (API)

Wanneer gebruiken: bij elke API endpoint zodat clients voorspelbare errors krijgen.

## 401 Unauthorized
```json
{ "error": "invalid_api_key" }
```

## 429 Too Many Requests
```json
{ "error": "rate_limit_exceeded", "retry_after_seconds": 3600 }
```

## 400 Bad Request
```json
{ "error": "invalid_param", "param": "<name>" }
```

Input: status code + context.
Output: consistente JSON error.
