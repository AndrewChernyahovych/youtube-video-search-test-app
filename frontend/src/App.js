import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext.js";
import HomePage from "./pages/HomePage/page.jsx";
import VideoDetailPage from "./pages/VideoDetailPage/page.jsx";

function App() {
  return (
    <Router>
      <SearchProvider>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <header className="bg-blue-600 text-white p-4 text-center">
            <h1 className="text-2xl font-bold">Video Search App</h1>
          </header>
          <main className="flex-grow p-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/video/:videoId" element={<VideoDetailPage />} />
            </Routes>
          </main>
          <footer className="bg-gray-800 text-white text-center p-4">
            <p>&copy; {new Date().getFullYear()} Video Search App</p>
          </footer>
        </div>
      </SearchProvider>
    </Router>
  );
}

export default App;
