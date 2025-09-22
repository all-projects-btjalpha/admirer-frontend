import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-purple-50"> 
        {/* <div className="min-h-screen bg-[#efe6f3]">  */}

      {children}
    </div>
  );
};

export default Layout;
