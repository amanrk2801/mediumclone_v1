import FooterSection from './FooterSection'

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-8 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <FooterSection title="Medium">
            <p className="text-gray-600 dark:text-gray-300">Every idea needs a Medium.</p>
          </FooterSection>
          <FooterSection title="Explore">
            {['About', 'Careers', 'Help'].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  {item}
                </a>
              </li>
            ))}
          </FooterSection>
          <FooterSection title="Connect">
            {['Twitter', 'Facebook', 'Instagram'].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  {item}
                </a>
              </li>
            ))}
          </FooterSection>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-300">
          <p>&copy; 2024 Medium Clone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
