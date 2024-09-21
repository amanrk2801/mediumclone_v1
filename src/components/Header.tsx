import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Moon, Sun } from "lucide-react";
import UserMenu from "./UserMenu";
import AuthModals from "../auth/AuthModals";
import { useAuth } from "../contexts/AuthContext";
import { useDarkMode } from "../contexts/DarkModeContext";
import mediumIcon from "../assets/medium-icon.svg";
import mediumWhite from "../assets/medium-white.svg";

interface HeaderProps {
  searchOpen: boolean;
  setSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userMenuOpen: boolean;
  setUserMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({
  searchOpen,
  setSearchOpen,
  userMenuOpen,
  setUserMenuOpen,
}) => {
  const { darkMode, setDarkMode } = useDarkMode();
  const [showAuthModals, setShowAuthModals] = useState(false);
  const [authType, setAuthType] = useState<"signin" | "signup">("signin");
  const { currentUser } = useAuth();

  const handleAuthClick = (type: "signin" | "signup") => {
    setAuthType(type);
    setShowAuthModals(true);
  };

  const handleCloseAuthModals = () => {
    setShowAuthModals(false);
  };

  return (
    <header className="border-b bg-white dark:bg-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img
            src={darkMode ? mediumWhite : mediumIcon}
            alt="Medium Logo"
            className="h-10 w-10 mr-2"
          />
          <span className="text-3xl font-bold text-black dark:text-white">
            Medium
          </span>
        </Link>

        <nav className="hidden md:flex space-x-4">
          <Link
            to="/our-story"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            Our Story
          </Link>
          <Link
            to="/membership-plans"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            Membership
          </Link>
          <Link
            to="/write"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            Write
          </Link>
          {!currentUser && (
            <button
              onClick={() => handleAuthClick("signin")}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label="Sign In"
            >
              Sign In
            </button>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
          >
            <Search
              className={`h-5 w-5 ${darkMode ? "text-white" : "text-black"}`}
            />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-white" />
            ) : (
              <Moon className="h-5 w-5 " />
            )}
          </Button>

          {currentUser && (
            <UserMenu
              userMenuOpen={userMenuOpen}
              setUserMenuOpen={setUserMenuOpen}
            />
          )}

          {!currentUser && (
            <Button
              variant="default"
              className="bg-black dark:bg-white text-white dark:text-black rounded-full px-4 py-2 transition-colors duration-200 hover:bg-gray-900 dark:hover:bg-gray-200"
              onClick={() => handleAuthClick("signup")}
              aria-label="Get Started"
            >
              Get Started
            </Button>
          )}
        </div>
      </div>

      {showAuthModals && (
        <AuthModals initialView={authType} onClose={handleCloseAuthModals} />
      )}
    </header>
  );
};

export default Header;
