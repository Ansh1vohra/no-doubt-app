# 🧩 Post Explorer

Post Explorer is a full-stack, real-time web application that allows users to instantly search through a large dataset of posts. It utilizes WebSockets to deliver a lightning-fast, highly responsive search experience natively integrated with a sleek, premium dark-mode UI.

---

## ✨ Features

- **Real-Time Search**: Search through posts instantly using an optimized WebSocket (`ws`) connection to the backend. No need to hit the 'Enter' key; simply type and watch the results filter dynamically.
- **Client-Side Pagination**: Navigate through dozens of posts efficiently without breaking the UX layout or suffering from infinite-scroll lag.
- **Glassmorphism Aesthetics**: A premium, "Tailwind-free" Vanilla CSS custom implementation featuring a sleek dark aesthetic, responsive grids, and micro-hover animations.
- **Automated Data Seeding**: Backed by a custom database script to safely provision coherent English placeholder data dynamically.
- **Dockerized Backend**: Fully self-contained Alpine Node.js configuration ready for cloud deployment.
- **Render & Vercel Ready**: Handled deployment configurations specifically tailored to circumvent platform-specific caveats (e.g. `vercel.json` routing, Keep-Alive pingers, `.npmrc` legacy peer bypasses).

---

## 🏗️ Architecture & Tech Stack

The workspace operates as a dual-folder monorepo.

* **Frontend**: React 19, Vite, React Router DOM, `lucide-react` forms the client interface.
* **Backend**: Node.js, Express, Mongoose (MongoDB Core), `ws` (WebSockets), and Axios.
* **Database**: MongoDB Atlas.

---

## 🚀 Setup & Installation

Follow these steps to run the application locally.

### 1. Backend Setup

The backend connects to MongoDB, serves REST queries, and spins up a WebSocket channel on the same port.

```bash
cd backend

# Install dependencies
npm install

# Create environment variables file
touch .env
```

Add your `MONGO_URI` to `backend/.env`:
```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster0...
PORT=5000
```

Optionally, seed your database cleanly using our English-data script:
```bash
node seed.js
```

Start the backend (it uses `nodemon` for auto-reloading):
```bash
npm run dev
```

### 2. Frontend Setup

The frontend consumes the local APIs.

```bash
cd frontend

# Install dependencies (utilize legacy peer deps if testing React 19 incompatibilities on specific libraries)
npm install --legacy-peer-deps

# Create environment configuration
touch .env
```

Add the routing APIs mapping to `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api/posts
VITE_WS_URL=ws://localhost:5000
```

Start the Vite development server:
```bash
npm run dev
```

Visit the specified local network URL (typically `http://localhost:5173`) in your browser to experience Post Explorer!

---

## 📡 API Documentation

The backend serves both standard REST protocols for initialization and WebSocket protocols for real-time querying.

### REST Endpoints

#### 1. Start Server Keep-Alive
- **Endpoint**: `GET /ping`
- **Description**: Returns a standard 200 OK `pong` text. Used internally to prevent automated server sleep cycles.

#### 2. Get All Posts
- **Endpoint**: `GET /api/posts`
- **Description**: Fetches the entire indexed array of all seeded MongoDB posts.

#### 3. Get Single Post
- **Endpoint**: `GET /api/posts/:id`
- **Description**: Retrieves detailed document information for a precise post ID.

### WebSocket Interface

The WebSocket interface handles search logic at blazing fast speeds avoiding strict HTTP connection overheads. 

Connect to: `ws://localhost:5000` (or `wss://...` in production)

#### Search Request (Client -> Server)
When the user types, the client transmits a stringified JSON body detailing the query:
```json
{
  "type": "search",
  "query": "exact or partial title to search"
}
```

#### Search Response (Server -> Client)
The server evaluates the query via regex securely over Mongoose, and broadcasts back the filtered subset:
```json
{
  "type": "results",
  "data": [
    {
      "id": 1,
      "title": "Matching Post Title",
      "body": "Post body context...",
      "userId": 9
    }
  ]
}
```
