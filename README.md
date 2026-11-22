# Real Estate Property Management System

A full-stack MERN admin dashboard for managing real estate properties: CRUD, backend search/filtering, and a dashboard with live statistics.

- **Live frontend:** `<add Vercel URL after deployment>`
- **Live backend:** `<add Render URL after deployment>`

## Features
- Create, view, edit, delete properties and change status (Available / Sold / Rented)
- Backend search by name and filters for location, type, status, min/max price (all combinable)
- Dashboard statistics from a MongoDB aggregation (empty database returns zeros)
- Validation (client + `express-validator` + Mongoose), centralized error handling, invalid ObjectId handling
- Helmet, CORS allow-list, rate limiting, no stack traces in production
- Responsive Bootstrap 5 layout with sidebar, loading, empty and error states

## Tech stack
Node.js, Express, MongoDB Atlas, Mongoose | React (Vite, JavaScript), React Router, Axios, Bootstrap 5 (+ Bootstrap Icons)

## Folder structure
```
backend/   config/ models/ controllers/ routes/ middleware/ server.js
frontend/  src/components src/pages src/services src/utils  vercel.json
docs/      postman_collection.json
```

## Run locally
Requirements: Node.js 18+, a MongoDB Atlas cluster (or local MongoDB).

```bash
# Backend
cd backend
npm install
cp .env.example .env      # Windows: copy .env.example .env  -> then fill in MONGO_URI
npm run dev               # http://localhost:5000

# Frontend (new terminal)
cd frontend
npm install
cp .env.example .env
npm run dev               # http://localhost:5173
```

## Environment variables
| File | Variable | Description |
|---|---|---|
| backend/.env | `PORT` | Server port (Render sets this automatically) |
| backend/.env | `NODE_ENV` | `development` or `production` |
| backend/.env | `MONGO_URI` | MongoDB Atlas connection string (never commit) |
| backend/.env | `CLIENT_URL` | Allowed frontend origin(s), comma separated, no trailing slash |
| frontend/.env | `VITE_API_URL` | Backend API base URL, e.g. `http://localhost:5000/api` |

`VITE_` variables are baked in at build time, so redeploy the frontend after changing them.

## MongoDB Atlas setup
1. Create a free cluster, then a database user (Database Access).
2. Network Access: add your IP for local work. For Render, see the deployment notes in the chat guide.
3. Connect > Drivers > copy the connection string, put it in `backend/.env` as `MONGO_URI` (add a database name such as `/realestate`; URL-encode special characters in the password).

## API documentation
Base URL: `/api`. All responses are JSON: `{ "success": true|false, "message"?, "data"?, "count"? }`.

| Method | Endpoint | Description | Success |
|---|---|---|---|
| GET | `/properties` | List properties (filters below) | 200 |
| GET | `/properties/:id` | Get one property | 200 |
| POST | `/properties` | Create property | 201 |
| PUT | `/properties/:id` | Update property | 200 |
| PATCH | `/properties/:id/status` | Change status `{ "status": "Sold" }` | 200 |
| DELETE | `/properties/:id` | Delete property | 200 |
| GET | `/dashboard` | Aggregated statistics | 200 |

**Query parameters for `GET /properties`:** `search` (name, case-insensitive), `location`, `type` (Residential/Commercial), `status`, `minPrice`, `maxPrice`.

```
GET /api/properties?search=Green&location=Ahmedabad&type=Residential&status=Available&minPrice=2000000&maxPrice=8000000
```

**Create example**
```json
POST /api/properties
{
  "propertyName": "Green Valley Villa",
  "propertyType": "Residential",
  "description": "3 BHK villa with garden",
  "location": "Ahmedabad",
  "price": 5500000,
  "area": 1800,
  "bedrooms": 3,
  "bathrooms": 2
}
```
Response `201`:
```json
{ "success": true, "message": "Property created",
  "data": { "_id": "...", "propertyName": "Green Valley Villa", "status": "Available", "createdAt": "..." } }
```

**Dashboard example** `GET /api/dashboard`
```json
{ "success": true, "data": { "totalProperties": 4, "availableProperties": 2, "soldProperties": 1, "rentedProperties": 1, "totalPropertyValue": 21500000 } }
```

**Errors**
| Status | When | Example |
|---|---|---|
| 400 | Validation failed / invalid ID / bad JSON | `{ "success": false, "message": "Validation failed", "errors": [{ "field": "price", "message": "..." }] }` |
| 403 | Origin not allowed by CORS | |
| 404 | Property or route not found | `{ "success": false, "message": "Property not found" }` |
| 429 | Rate limit exceeded | |

## Testing
Import `docs/postman_collection.json` into Postman (variable `baseUrl` defaults to `http://localhost:5000/api`) and run the requests in order.

## Screenshots
Add your screenshots to `docs/screenshots/` and link them here:
`![Dashboard](docs/screenshots/dashboard.png)` `![Properties](docs/screenshots/properties.png)` `![Add Property](docs/screenshots/add-property.png)`
