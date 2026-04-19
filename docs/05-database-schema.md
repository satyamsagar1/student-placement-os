# 05 - Database Schema Documentation

## Purpose

Defines the primary MongoDB collections, relationships, fields, indexes, and schema rules for Student Placement OS.

---

## Database Choice

* MongoDB
* Mongoose ODM
* Timestamps enabled on all major schemas

---

# Core Collections (V1)

## 1. Users Collection

**Collection Name:** users

### Fields

```text
_id
name
email (unique, indexed)
passwordHash
avatarUrl (optional)
targetRole (optional)
graduationYear (optional)
collegeName (optional)
plan (free/pro)
onboardingCompleted (boolean)
isActive (boolean)
lastLoginAt (optional)
createdAt
updatedAt
```

### Notes

* Store hashed passwords only.
* Email must be unique.
* Never expose passwordHash in API responses.

---

## 2. Applications Collection

**Collection Name:** applications

### Fields

```text
_id
userId (ref users, indexed)
companyName (indexed)
roleTitle (indexed)
source (LinkedIn / Careers / Referral / Other)
jobUrl (optional)
location (optional)
workMode (Remote / Hybrid / Onsite)
appliedDate
status (indexed)
resumeId (optional ref resumes)
followUpDate (optional)
notes (optional)
salaryRange (optional)
priority (low/medium/high)
archived (boolean)
createdAt
updatedAt
```

### Allowed Status Values

```text
Wishlist
Applied
OA Scheduled
OA Completed
Interviewing
Rejected
Offer
Joined
Withdrawn
```

### Suggested Indexes

* userId + status
* userId + createdAt
* companyName

---

## 3. Resumes Collection

**Collection Name:** resumes

### Fields

```text
_id
userId (ref users, indexed)
title
fileUrl
fileName
fileSize
versionLabel
tags (array)
isDefault (boolean)
createdAt
updatedAt
```

### Example Tags

```text
Frontend
Backend
Analyst
General
Internship
Fulltime
```

---

## 4. Reminders Collection

**Collection Name:** reminders

### Fields

```text
_id
userId (ref users, indexed)
applicationId (optional ref applications)
title
description (optional)
type (FollowUp / Interview / Deadline / Custom)
dueAt (indexed)
status (Pending / Completed / Missed)
priority (low/medium/high)
completedAt (optional)
createdAt
updatedAt
```

### Suggested Indexes

* userId + dueAt
* userId + status

---

## 5. Dashboard Materialized Data (Optional Later)

**Collection Name:** user_stats

Use only if analytics queries become heavy.

### Fields

```text
_id
userId
applicationsCount
offersCount
rejectionsCount
interviewsCount
weeklyApplications
lastCalculatedAt
```

---

# Future Collections (Post MVP)

## Planner Progress

```text
userId
topic
solvedCount
targetCount
lastUpdated
```

## AI Usage Logs

```text
userId
feature
creditsUsed
createdAt
```

## Notifications

```text
userId
type
title
read
createdAt
```

---

# Relationship Overview

```text
User -> many Applications
User -> many Resumes
User -> many Reminders
Application -> optional Resume
Reminder -> optional Application
```

---

# Schema Rules

## Users

* Soft disable users using isActive.
* Do not delete casually.

## Applications

* Core business entity.
* Preserve history.
* Archive instead of delete when possible.

## Resumes

* Store files in cloud storage, save URL only.

## Reminders

* Scheduler checks pending reminders.

---

# Validation Rules

## Email

* lowercase
* trimmed
* unique

## Strings

* trim all user text input
* set max lengths

## Notes

* sanitize input

## URLs

* validate jobUrl and fileUrl

---

# Performance Notes

* Use pagination for applications list.
* Use indexes on user-scoped queries.
* Avoid heavy populate everywhere.
* Select only needed fields.

---

# Security Notes

* Never expose passwordHash.
* Verify ownership on userId-linked resources.
* Validate all ObjectIds.
* Rate limit auth routes.

---

# Migration Rules

* Future schema changes must be documented.
* Prefer additive changes first.
* Avoid breaking field renames casually.

---

# Priority Build Order

1. users
2. applications
3. resumes
4. reminders
5. analytics later
