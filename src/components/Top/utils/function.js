/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import topStyle from "../top.module.css";
import api from "../../../config/config"
import Link from "next/link";

export function Top({ top }) {
    const releaseYear = top.release_date
      ? top.release_date.split("-")[0]
      : "0000";
    return (
      <div className={topStyle.top}>
        <div className={topStyle.blurBgImg}>
          <img
            className={topStyle.blurImg}
            src={api.image +`original/${top.backdrop_path}`}
          />
        </div>
        <div className={topStyle.content}>
          <div className={topStyle.infos}>
            <img
              className={topStyle.img}
              src={api.image +`original/${top.backdrop_path}`}
            />
            <h1>
              {top.title}{""}
              <span className={topStyle.year}>({releaseYear})</span>
            </h1>
            <div className={topStyle.btnContainer}>
              <Link href={"#"}>
                <button className={topStyle.plain}>Regarder</button>
              </Link>
              <Link href={`/movie/${top.id}`}>
                <button className={topStyle.empty}>En savoir plus</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
export function SliderButtons({ onClick, active }) {
    const index = [0, 1, 2];
    return (
      <ul className={topStyle.btnSliderContainer}>
        {index.map((id) => {
          if (id == active)
            return (
              <li
                id={id}
                className={`${topStyle.btnSlider} ${topStyle.active}`}
                onClick={onClick}
                key={id}
              ></li>
            );
          return (
            <li
              key={id}
              id={id}
              className={`${topStyle.btnSlider}`}
              onClick={onClick}
            ></li>
          );
        })}
      </ul>
    );
  }