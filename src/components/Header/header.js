/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import Link from "next/link";
import headerStyle from "./header.module.css";
import { useState } from "react";

export default function Header() {
  const [ setSearch] = useState("");
  return (
    <header className={headerStyle.header}>
      <Link href="/" passHref={true}>
        <h1 className={headerStyle.title} onClick={() => setSearch("")}>
          MOVIENIGHT
        </h1>
      </Link>
    </header>
  );
}
