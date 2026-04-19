# 07 - Frontend Structure

## Purpose

Defines React frontend folder structure, pages, reusable components, and UI flow.

---

## Frontend Stack

* React
* Vite
* Tailwind CSS
* Axios / Fetch
* React Router

---

## Suggested Structure

```text
src/
  app/
  pages/
  features/
  components/
  hooks/
  services/
  utils/
  assets/
```

---

## Feature Folders

```text
features/
  auth/
  applications/
  dashboard/
  resumes/
  reminders/
  users/
```

---

## Public Pages

* LandingPage.jsx
* LoginPage.jsx
* RegisterPage.jsx
* PricingPage.jsx (later)

## Protected Pages

* DashboardPage.jsx
* ApplicationsPage.jsx
* ResumePage.jsx
* RemindersPage.jsx
* ProfilePage.jsx
* SettingsPage.jsx

---

## Shared Components

* Navbar
* Sidebar
* ProtectedRoute
* Loader
* EmptyState
* Modal
* ConfirmDialog
* SearchBar
* Pagination
* Table
* StatCard

---

## Feature Components

### Applications

* ApplicationForm
* ApplicationTable
* StatusBadge
* FiltersBar

### Resumes

* ResumeUpload
* ResumeCard

### Reminders

* ReminderForm
* ReminderList

---

## State Strategy

* Local state for forms/UI
* Context for auth
* Server state from API calls
* Add React Query later if needed

---

## Routing Example

```text
/
/login
/register
/app/dashboard
/app/applications
/app/resumes
/app/reminders
/app/profile
```

---

## UI Rules

* Mobile responsive first
* Reusable forms
* Consistent spacing
* Fast loading feel
* Clean dashboard focus

---

## Design Priority

Functionality first, polish second.