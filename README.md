
# AI Toolbox - Customer Directory App

A full-stack application for managing and viewing customer data, built as part of a technical challenge. The backend is powered by **Laravel** and the frontend by **React + Redux**. Features include search with debouncing, detailed customer view with caching, pagination, filters, and test coverage.

## 🧩 Features

### ✅ Implemented Requirements

- List customers with pagination and loading states
- Customer detail page with caching (no redundant fetches)
- Search by company name with **custom debounce (500ms)** — no libraries used
- Filter by billing period (`monthly` or `yearly`)
- Responsive design for mobile and desktop
- Global state management with Redux
- Manual caching for both list and detail views

### 🧪 Tests

#### Backend (Laravel)
- Feature tests for listing, filtering, and showing customers
- Run with:
  ```bash
  php artisan test --env=testing
  ```

#### Frontend (React + Vitest + jsdom)
- Unit tests for components: `CustomerDetailRow`, `BillingPeriodSelect`, `SearchInput`
- Run with:
  ```bash
  npx vitest run
  ```

## ⚙️ Technologies

### Backend
- PHP 8.2+, Laravel 10
- MySQL 8+
- Eloquent ORM
- PHPUnit (testing)
- Artisan seeders and migrations

### Frontend
- React + Vite + TypeScript
- Redux Toolkit (global state)
- CSS Modules (custom styling)
- Vitest + jsdom (component testing)
- Native fetch API

## 🚀 Setup Instructions

### Backend

```bash
cd backend
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 🧠 Architecture Notes

- **Caching Strategy:** Customer details and paginated lists are cached in Redux to avoid unnecessary API calls on revisit.
- **Search Optimization:** Search input is debounced by 500ms with a custom `useDebounce` hook.
- **Pagination:** Server-side pagination with clear metadata (`from`, `to`, `total`, `current_page`, `last_page`).
- **Responsiveness:** Fully mobile-compatible layout.

## 👨‍💻 Evaluation Highlights

- Strong grasp of React state management and hooks
- Efficient Laravel API design and use of Eloquent relationships
- Thoughtful architecture with test coverage and performance optimizations
- Clean, maintainable code structure and folder organization

---

> Made with ♥ as part of a full-stack developer challenge.
