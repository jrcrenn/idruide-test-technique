import React from 'react';
import Header from "../Header/header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
