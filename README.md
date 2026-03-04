## Common HTTP Status Codes (Backend / MERN)

### ✅ Success
| Code | Meaning | When to Use |
|-----|--------|-------------|
| 200 | OK | Successful request (GET, login success) |
| 201 | Created | Resource successfully created (POST register) |
| 204 | No Content | Successful request with no response body (DELETE) |

### ⚠️ Client Errors
| Code | Meaning | When to Use |
|-----|--------|-------------|
| 400 | Bad Request | Invalid input or request format |
| 401 | Unauthorized | Authentication required or invalid token |
| 403 | Forbidden | User does not have permission (not admin) |
| 404 | Not Found | Resource does not exist |
| 409 | Conflict | Duplicate data (e.g., email already exists) |
| 422 | Unprocessable Entity | Validation errors |
| 429 | Too Many Requests | Rate limit exceeded |

### 🔥 Server Errors
| Code | Meaning | When to Use |
|-----|--------|-------------|
| 500 | Internal Server Error | Unexpected server error |
| 503 | Service Unavailable | Server temporarily unavailable |

### Quick Developer Guide

| Scenario | Status Code |
|--------|-------------|
| Login success | 200 |
| User created | 201 |
| Delete success | 204 |
| Invalid input | 400 |
| No authentication | 401 |
| Not admin | 403 |
| Resource not found | 404 |
| Duplicate email | 409 |
| Too many requests | 429 |
| Server error | 500 |