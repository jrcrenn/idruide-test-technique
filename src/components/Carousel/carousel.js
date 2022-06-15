/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import carouselStyle from "./carousel.module.css";
import ArrowRight from "baseui/icon/arrow-right";
import ArrowLeft from "baseui/icon/arrow-left";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Movie } from "./utils/function";

export default function MyCarousel({ title, data, duration }) {
  const movies = data.map((m, i) => {
    return <Movie movie={m} key={i} duration={duration} />;
  });
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 40,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 20,
    },
  };

  const ButtonGroup = ({ next, previous }) => {
    return (
      <>
        <div
          className={`${carouselStyle.arrowContainer} ${carouselStyle.arrowLeft}`}
          onClick={() => previous()}
        >
          <ArrowLeft
            size={32}
            className={`${carouselStyle.arrow} ${carouselStyle.arrowLIcon}`}
          />
        </div>
        <div
          className={`${carouselStyle.arrowContainer} ${carouselStyle.arrowRight}`}
          onClick={() => next()}
        >
          <ArrowRight
            size={32}
            className={`${carouselStyle.arrow} ${carouselStyle.arrowRIcon}`}
          />
        </div>
      </>
    );
  };
  return (
    <div className={carouselStyle.container}>
      <h2 className={carouselStyle.title}>{title}</h2>

      <Carousel
        swipeable={true}
        draggable={false}
        responsive={responsive}
        infinite={false}
        keyBoardControl={false}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        arrows={false}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup />}
        centerMode={true}
        renderArrowsWhenDisabled={true}
      >
        {movies}
      </Carousel>
    </div>
  );
}
