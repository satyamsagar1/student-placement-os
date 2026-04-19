# 04 - Modules Documentation

## Purpose

This document defines all major backend and product modules for the Student Placement OS project. It serves as the source of truth for responsibilities, boundaries, and future scaling.

---

## Core V1 Modules

## 1. Auth Module

**Responsibility:** User authentication and access control.

### Includes

* Register
* Login
* Logout
* JWT / Refresh Tokens
* Protected route middleware
* Password reset (later)

### Suggested Structure

```text
modules/auth/
  auth.routes.js
  auth.controller.js
  auth.service.js
  auth.validation.js
```

---

## 2. Users Module

**Responsibility:** User profile, onboarding, preferences.

### Includes

* View profile
* Update profile
* Target role
* Graduation year
* Settings
* Onboarding completion state

### Suggested Structure

```text
modules/users/
```

---

## 3. Applications Module (Core Engine)

**Responsibility:** Internship/job application tracking.

### Includes

* Add application
* Edit application
* Delete application
* Status pipeline
* Notes
* Source links
* Filters / Search
* Resume mapping

### Statuses (Draft)

* Wishlist
* Applied
* OA Scheduled
  n- Interviewing
* Rejected
* Offer
* Joined

### Suggested Structure

```text
modules/applications/
```

---

## 4. Dashboard Module

**Responsibility:** Metrics, progress visibility, motivation.

### Includes

* Total applications
* Active interviews
* Offer count
* Rejection count
* Weekly applications
* Conversion funnel
* Streaks

### Suggested Structure

```text
modules/dashboard/
```

---

## 5. Resume Module

**Responsibility:** Resume storage and version control.

### Includes

* Upload resume
* Multiple versions
* Tags (Frontend / Backend / Analyst)
* Attach to applications
* Delete / replace

### Suggested Structure

```text
modules/resumes/
```

---

## 6. Reminders Module

**Responsibility:** Follow-up and deadline reminders.

### Includes

* Follow-up reminders
* Interview reminders
* Deadline alerts
* Mark complete
* Auto triggers later

### Suggested Structure

```text
modules/reminders/
```

---

## Future Modules (Post MVP)

## 7. Planner Module

* DSA planner
* Study schedule
* Daily goals

## 8. AI Module

* Resume tailoring
* Mock interviews
* JD parsing
* Study plan generation

## 9. Notifications Module

* Email notifications
* In-app notifications
* Push notifications later

## 10. Admin Module

* User analytics
* Subscription management
* Abuse moderation

---

## Recommended Build Order

1. Auth
2. Users
3. Applications
4. Dashboard
5. Resume
6. Reminders
7. Planner
8. AI

---

## Architecture Rule

Use modular monolith structure:

```text
src/modules/<module-name>/
```

Each module should contain:

* routes
  n- controller
* service
* validation
* model (if needed)

---

## Notes

* Keep modules domain-based, not page-based.
* Avoid unnecessary tiny modules.
* Business logic lives in services.
* Controllers should stay thin.
* Shared utilities go in `shared/`.
