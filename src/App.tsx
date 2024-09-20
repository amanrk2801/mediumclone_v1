// src/App.tsx
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MembershipPage from "./components/pages/MembershipPage";
import { ai_image, fashion, climate, remote_work } from "./assets/images";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";
import WritePage from "./components/pages/WritePage";
import OurStoryPage from "./components/pages/OurStoryPage";
import AuthModals from "./auth/AuthModals";
import HomePage from "./components/pages/HomePage"; // Assuming you have a HomePage component
import NotFoundPage from "./components/NotFoundPage"; // 404 Page
import Logout from "./components/pages/Logout";
import PrivateRoute from "./components/PrivateRoute";
import ProfilePage from "./components/pages/ProfilePage";
import { ToastContainer } from 'react-toastify';

const articles = [
  {
    id: 1,
    title: "The Future of Artificial Intelligence",
    excerpt:
      "Exploring the potential impacts and advancements in AI technology...",
    author: "Jane Doe",
    date: "May 15, 2023",
    readTime: "5 min read",
    image: ai_image,
  },
  {
    id: 2,
    title: "10 Tips for Productive Remote Work",
    excerpt:
      "Maximize your efficiency while working from home with these strategies...",
    author: "John Smith",
    date: "May 14, 2023",
    readTime: "7 min read",
    image: remote_work,
  },
  {
    id: 3,
    title: "The Rise of Sustainable Fashion",
    excerpt: "How eco-friendly practices are reshaping the fashion industry...",
    author: "Emily Green",
    date: "May 13, 2023",
    readTime: "6 min read",
    image: fashion,
  },
];

const popularTags = [
  "Technology",
  "Productivity",
  "Health",
  "Design",
  "Writing",
];

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <Router>
      <div className={`min-h-screen flex flex-col ${darkMode ? "dark" : ""}`}>
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
          userMenuOpen={userMenuOpen}
          setUserMenuOpen={setUserMenuOpen}
        />

        {searchOpen && <SearchBar />}

        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <HomePage
                articles={articles}
                popularTags={popularTags}
                climateImage={climate}
              />
            }
          />
          <Route path="/our-story" element={<OurStoryPage />} />
          <Route path="/membership-plans" element={<MembershipPage />} />
          <Route path="/signin" element={<AuthModals initialView="signin" />} />
          <Route path="/signup" element={<AuthModals initialView="signup" />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/write"
            element={
              <PrivateRoute>
                <WritePage />
              </PrivateRoute>
            }
          />
          {/* Add more protected routes as needed */}
        </Routes>

        <Footer />
        {/* Add ToastContainer here */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;
