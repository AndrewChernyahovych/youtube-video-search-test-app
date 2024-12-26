# YouTube Video Search with History and Details

This full-stack application allows users to search YouTube videos, view search history, and get detailed information about specific videos. It includes a **backend API** built with **Node.js**, **Express**, **PostgreSQL**, and **Prisma**, and a **frontend** built with **React**.

---

## Table of Contents

- [Backend Setup](#backend-setup)
- [API Endpoints](#api-endpoints)
- [Frontend Setup](#frontend-setup)
- [Deployment](#deployment)
- [License](#license)

---

## Backend Setup

### Technologies Used

- **Node.js**: JavaScript runtime for backend.
- **Express**: Web framework for RESTful APIs.
- **PostgreSQL**: Database to store search history and analytics.
- **Prisma**: ORM for interacting with PostgreSQL.

### Steps to Run the Backend

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/your-repository.git
    cd your-repository
    ```

2. Install dependencies:

    ```bash
    cd backend
    npm install
    ```

3. Set up the database:

    Create a `.env` file with the PostgreSQL connection string:

    ```bash
    DATABASE_URL="postgresql://username:password@localhost:5432/yourdb"
    ```

4. Run Prisma migration:

    ```bash
    npx prisma migrate deploy
    ```

5. Start the backend server:

    ```bash
    npm start
    ```

    The API will be available at `http://localhost:9000`.

---

## API Endpoints

### 1. **Search Videos**

- **Endpoint:** `GET /api/video/search?q={query}&pageToken={pageToken}&maxResults={maxResults}`
- **Response:**

    ```json
    {
      "results": [{"videoId": "dQw4w9WgXcQ", "title": "Rick Astley - Never Gonna Give You Up"}],
      "totalResults": 10000000,
      "nextPageToken": "CAUQAA"
    }
    ```

### 2. **Search History**

- **Endpoint:** `GET /api/video/history`
- **Response:**

    ```json
    {
      "history": [{"query": "NestJS tutorial", "timestamp": "2024-12-25T12:00:00Z"}]
    }
    ```

### 3. **Analytics (Popular Queries)**

- **Endpoint:** `GET /api/video/analytics`
- **Response:**

    ```json
    {
      "analytics": [{"query": "NestJS tutorial", "count": 5}]
    }
    ```

### 4. **Video Details**

- **Endpoint:** `GET /api/video/video/:id`
- **Response:**

    ```json
    {
      "videoId": "dQw4w9WgXcQ",
      "title": "This is example",
      "viewCount": 255
    }
    ```

---

## Frontend Setup

### Technologies Used

- **React**: JavaScript library for building the UI.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: For API calls.

### Steps to Run the Frontend

1. Navigate to the frontend folder:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the frontend server:

    ```bash
    npm start
    ```

    The frontend will be available at `http://localhost:3000`.

### Project Structure

The frontend project is structured as follows:

```
frontend/
├── public/                # Static files
├── src/                   # Source files
│   ├── components/        # Reusable components
│   ├── context/           # Context API for state management
│   ├── pages/             # Page components
│   ├── App.js             # Main application component
│   ├── index.js           # Entry point of the application
│   └── ...                # Other files and folders
└── package.json           # Project metadata and dependencies
```

### Environment Variables

Make sure to set up any necessary environment variables in a `.env` file in the frontend directory.

### Building for Production

To create a production build, run:

```bash
npm run build
```

This will create an optimized build in the `build` folder.

---

## Deployment

Ensure environment variables are set up correctly (e.g., `DATABASE_URL`).

    ```bash
    npm run build
    ```

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

- **YouTube Data API v3** for video search and details.
- **Prisma** for database management.
- **Tailwind CSS** for styling.