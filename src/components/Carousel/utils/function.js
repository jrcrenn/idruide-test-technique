/* eslint-disable jsx-a11y/alt-text */


import Link from "next/link";
import { ProgressBar, SIZE } from "baseui/progress-bar";
import Image from "next/image";
import { useEffect, useState } from "react";
import carouselStyle from "../carousel.module.css";

function convertMinutes(min) {
  let hours = min / 60;
  let rhours = Math.floor(hours);
  let minutes = (hours - rhours) * 60;
  let rminutes = Math.round(minutes);
  let final =
    rhours + (rminutes.toString().length === 1 ? "h0" : "h") + rminutes + "m";
  return final;
}

function convertNoteToPercent(note) {
  return Math.floor(note * 10);
}

export function Movie({ movie, duration }) {
    const [movieDetails, setMovieDetails] = useState(null);
    useEffect(() => {
      const getMovieDetails = async () => {
        const res = await fetch(
          `${process.env.movie}${movie.id}?api_key=${process.env.TMDB_API_KEY}&language=fr`
        );
        const data = await res.json();
        setMovieDetails(data);
      };
      if (!movieDetails) {
        getMovieDetails();
      }
    });
  
    if (movieDetails) {
      return (
        <div className={carouselStyle.movie}>
          <Link href={`/movie/${movieDetails.id}`} passHref={true}>
            <Image
              width={140}
              height={200}
              src={`${process.env.image}w500/${movieDetails.poster_path}`}
              className={carouselStyle.movieImg}
            />
          </Link>
          <Link href={`/movie/${movieDetails.id}`} passHref={true}>
            <h3 className={carouselStyle.movieTitle}>{movie.title}</h3>
          </Link>
          {duration ? (
            <p className={carouselStyle.duration}>
              {convertMinutes(movieDetails.runtime)}
            </p>
          ) : 
            <div className={carouselStyle.avgContainer}>
              <ProgressBar
                value={convertNoteToPercent(movie.vote_average)}
                size={SIZE.large}
                overrides={{
                  BarProgress: {
                    style: ({ $theme }) => ({
                      backgroundColor: "#33BD52",
                    }),
                  },
                  BarContainer: {
                    style: ({ $theme }) => ({
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                      borderRadius: "50px",
                    }),
                  },
                }}
              />
              <span className={carouselStyle.votePercent}>
                {convertNoteToPercent(movie.vote_average)}%
              </span>
            </div>
          }
        </div>
      );
    }
    return false;
  }