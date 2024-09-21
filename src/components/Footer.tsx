import { Link } from 'react-router-dom';
import FooterSection from './FooterSection';
import { useDarkMode } from '../contexts/DarkModeContext'; // Import the hook

export default function Footer() {
  const { darkMode } = useDarkMode(); // Destructure darkMode from context

  const exploreLinks = [
    { name: 'About', path: '/about' },
    { name: 'Careers', path: '/careers' },
    { name: 'Help', path: '/help' },
  ];

  const connectLinks = [
    { name: 'Twitter', url: 'https://twitter.com/' },
    { name: 'Facebook', url: 'https://facebook.com/' },
    { name: 'Instagram', url: 'https://instagram.com/' },
  ];

  return (
    <footer className={`py-8 transition-colors duration-200 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4">
        {/* Footer Sections */}
        <div className="flex flex-wrap justify-between">
          {/* Medium Section */}
          <FooterSection title="Medium" titleClassName="dark:text-white">
            <p className="text-gray-600 dark:text-gray-300">
              Every idea needs a Medium.
            </p>
          </FooterSection>

          {/* Explore Section */}
          <FooterSection title="Explore" titleClassName="dark:text-white">
            <ul className="space-y-2">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`hover:text-gray-900 transition-colors duration-200 ${
                      darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                    aria-label={`Navigate to ${link.name}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterSection>

          {/* Connect Section */}
          <FooterSection title="Connect" titleClassName="dark:text-white">
            <ul className="space-y-2">
              {connectLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`hover:text-gray-900 transition-colors duration-200 ${
                      darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                    aria-label={`Visit our ${link.name} page`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </FooterSection>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-300">
          <p>&copy; {new Date().getFullYear()}  Medium Clone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
