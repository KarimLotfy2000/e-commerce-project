import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex min-h-vh flex-col">{children}</div>
    </>
  );
};

export default Layout;
