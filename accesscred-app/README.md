# AccessCred (React + Vite + React Router)

    npm install
    npm run dev        # http://localhost:5173

## Data and API layer
- `src/api/opportunities.js` fetches **live** listings (nothing hard-coded):
  Remotive and Arbeitnow public APIs (jobs, internships, freelance gigs). Dev requests go through the Vite proxy in `vite.config.js`. Results are cached in localStorage for 6 hours.
- **Scholarships, fellowships, local gigs, apprenticeships:** no free public API exists. Set `VITE_API_URL` (copy `.env.example` to `.env.local`) and expose `GET {VITE_API_URL}/opportunities` returning an array of
  `{ id, title, org, logo, location, type: "Scholarships"|"Fellowships"|"Jobs"|"Internships"|"Gigs", tags: [], posted: ISO date, url, desc, salary }`.
- **Users, profile, saved, applications, badges, messages, settings** persist in localStorage (`src/context/AppContext.jsx`). Passwords are only base64-encoded, so this is demo-only. Replace those functions with real API calls (Supabase, etc.) for production.
- Learning resources and micro-task definitions are static content in `src/data/content.js`.

## Routes
Public: `/`, `/login`, `/signup`, `/onboarding`. Protected (sidebar shell): `/dashboard`, `/opportunities`, `/opportunity/:id`, `/profile`, `/verify`, `/applications`, `/learn`, `/messages`, `/settings`.

## Logo
`public/logo-mark.png`, `public/logo-full.png`, `public/favicon.ico` and `favicon.png` come from your uploaded logo.
