// src/components/FooterSection.tsx

import React, { ReactNode } from 'react';

interface FooterSectionProps {
  title: string;
  children: ReactNode;
  titleClassName?: string; // Optional prop for title styling
}

const FooterSection: React.FC<FooterSectionProps> = ({ title, children, titleClassName = '' }) => {
  return (
    <div className="w-full md:w-1/3 mb-6 md:mb-0">
      <h3 className={`text-xl font-semibold mb-4 text-gray-800 ${titleClassName}`}>
        {title}
      </h3>
      {children}
    </div>
  );
};

export default FooterSection;
