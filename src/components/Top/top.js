/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import topStyle from "./top.module.css";
import { useState } from "react";
import { Top } from "./utils/function";
import { SliderButtons } from "./utils/function";

export default function OnTop({ top }) {
  const [currentTop, setCurrentTop] = useState(top[0]);
  let index = 0;
  const [active, setActive] = useState(0);

  const handleSlide = (e) => {
    const id = Number(e.target.id);
    if (id && id >= 0 && id < top.length) {
      setCurrentTop(top[id]);
      index = id;
      setActive(id);
    }
  };
  return (
    <>
      <div className={topStyle.topContainer}>
        <Top top={currentTop} />;
      </div>
      <SliderButtons
        onClick={handleSlide}
        active={active === 0 ? active : active - 1}
      />
    </>
  );
}
