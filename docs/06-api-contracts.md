# 06 - API Contracts Documentation

## Purpose

Defines backend REST API endpoints, request payloads, authentication requirements, query params, and response expectations for Student Placement OS.

---

## Base URL

```text
/api
```

## Response Standard

### Success

```json
{
  "success": true,
  "message": "Success message",
  "data": {}
}
```

### Error

```json
{
  "success": false,
  "message": "Error message",
  "error": {}
}
```

---

# AUTH MODULE

## POST /api/auth/register

Auth: Public

### Body

```json
{
  "name": "Satyam",
  "email": "user@email.com",
  "password": "StrongPassword123"
}
```

## POST /api/auth/login

Auth: Public

### Body

```json
{
  "email": "user@email.com",
  "password": "StrongPassword123"
}
```

## GET /api/auth/me

Auth: Required

Returns current logged-in user.

## POST /api/auth/logout

Auth: Required

---

# USERS MODULE

## GET /api/users/profile

Auth: Required

## PATCH /api/users/profile

Auth: Required

### Body (partial allowed)

```json
{
  "targetRole": "Frontend Developer",
  "graduationYear": 2027,
  "collegeName": "XYZ College"
}
```

## PATCH /api/users/settings

Auth: Required

---

# APPLICATIONS MODULE

## POST /api/applications

Auth: Required

### Body

```json
{
  "companyName": "Google",
  "roleTitle": "SDE Intern",
  "source": "LinkedIn",
  "jobUrl": "https://...",
  "location": "Bangalore",
  "workMode": "Hybrid",
  "appliedDate": "2026-04-19",
  "status": "Applied",
  "priority": "high",
  "notes": "Referral requested"
}
```

## GET /api/applications

Auth: Required

### Query Params

```text
?page=1
&limit=10
&status=Applied
&search=Google
&sortBy=createdAt
&order=desc
```

## GET /api/applications/:id

Auth: Required

## PATCH /api/applications/:id

Auth: Required

### Body

Partial update allowed.

## DELETE /api/applications/:id

Auth: Required

Soft delete or archive preferred.

## PATCH /api/applications/:id/status

Auth: Required

### Body

```json
{
  "status": "Interviewing"
}
```

---

# RESUMES MODULE

## POST /api/resumes

Auth: Required
Multipart form-data.

Fields:

```text
file
title
versionLabel
tags[]
```

## GET /api/resumes

Auth: Required

## GET /api/resumes/:id

Auth: Required

## PATCH /api/resumes/:id

Auth: Required

## DELETE /api/resumes/:id

Auth: Required

## PATCH /api/resumes/:id/default

Auth: Required

---

# REMINDERS MODULE

## POST /api/reminders

Auth: Required

### Body

```json
{
  "title": "Follow up with recruiter",
  "type": "FollowUp",
  "dueAt": "2026-04-26T10:00:00Z",
  "applicationId": "optional-id"
}
```

## GET /api/reminders

Auth: Required

### Query Params

```text
status=Pending
page=1
limit=10
```

## PATCH /api/reminders/:id

Auth: Required

## PATCH /api/reminders/:id/complete

Auth: Required

## DELETE /api/reminders/:id

Auth: Required

---

# DASHBOARD MODULE

## GET /api/dashboard/summary

Auth: Required

### Returns

```json
{
  "totalApplications": 25,
  "offers": 1,
  "rejections": 7,
  "activeInterviews": 2,
  "weeklyApplications": 5
}
```

## GET /api/dashboard/trends

Auth: Required

### Query Params

```text
range=30d
```

---

# STANDARD QUERY RULES

## Pagination

```text
page=1
limit=10
```

## Sorting

```text
sortBy=createdAt
order=asc | desc
```

## Search

```text
search=keyword
```

---

# AUTHORIZATION RULES

All protected resources must verify:

* Valid JWT
* Resource ownership
* Active user account

---

# STATUS CODES

```text
200 OK
201 Created
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
500 Server Error
```

---

# VERSIONING RULE

Use v1 later if public API expands.

Example:

```text
/api/v1/applications
```

---

# FUTURE APIs

* /api/ai/resume-tailor
* /api/ai/mock-interview
* /api/planner/tasks
* /api/notifications
