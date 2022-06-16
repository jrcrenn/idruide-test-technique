/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Header/layout";
import detailsStyle from "./movie.module.css";
import ReactPlayer from "react-player";
import { ProgressBar, SIZE } from "baseui/progress-bar";
import { StarRating } from "baseui/rating";
import { PlayButton } from "./utils/function";
import { Cast } from "./utils/function";
import { Spinner } from "baseui/spinner";
import { withStyle } from "baseui";
import { convertMinutes } from "./utils/function";
import { convertNoteToPercent } from "./utils/function";
import Link from "next/link";

export const Loading = withStyle(Spinner, {
  width: "80px",
  height: "80px",
  borderLeftWidth: "6px",
  borderRightWidth: "6px",
  borderTopWidth: "6px",
  borderBottomWidth: "6px",
  borderTopColor: "white",
  borderBottomColor: "rgba(255, 255, 255, 0.2);",
  borderLeftColor: "rgba(255, 255, 255, 0.2);",
  borderRightColor: "rgba(255, 255, 255, 0.2);",
});

export default function MovieDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState(null);
  const [crew, setCrew] = useState(null);
  const [cast, setCast] = useState(null);
  const [director, setDirector] = useState(null);
  const [screenplay, setScreenplay] = useState(null);
  const [story, setStory] = useState(null);
  const [videos, setVideos] = useState(null);
  const [error, setError] = useState("");

  const generateVideosElements = () => {
    return videos.map((v, i) => {
      return (
        <li key={i}>
          <ReactPlayer
            url={`https://www.youtube.com/embed/${v.key}`}
            controls={true}
            light={true}
            playIcon={<PlayButton />}
            width={350}
            height={199}
          />
        </li>
      );
    });
  };

  useEffect(() => {
    const getMovieDatas = async () => {
      const res = await fetch(
        `${process.env.movie}${id}?api_key=${process.env.TMDB_API_KEY}&language=fr`
      );

      const data = await res.json();
      if (data.success === false) setError("Movie not found");
      else setMovie(data);
    };
    const getMovieVideos = async () => {
      const res = await fetch(
        `${process.env.movie}${id}/videos?api_key=${process.env.TMDB_API_KEY}&language=fr`
      );

      const data = await res.json();
      if (data.success === false) setError("Movie not found");
      else {
        const tmp = data.results
          .filter((m) => m.official && m.site.toLowerCase() === "youtube")
          .splice(0, 3);
        setVideos(tmp);
      }
    };
    const getMovieCrew = async () => {
      const res = await fetch(
        `${process.env.movie}${id}/credits?api_key=${process.env.TMDB_API_KEY}&language=fr`
      );

      const data = await res.json();
      if (data.success === false) setError("Movie not found");
      else {
        setCast(data.cast.splice(0, 11));
        setCrew(data.crew);
      }
    };

    if (!movie && !crew && !videos && id && !error) {
      getMovieDatas();
      getMovieCrew();
      getMovieVideos();
    }

    if (crew && !director && !story && !error) {
      const crewcopy = [...crew];
      const director = crewcopy.filter((c) => c.job === "Director")[0];
      setStory(crewcopy.filter((c) => c.job === "Story"));
      if (director) setDirector(director.original_name);
      else setDirector("unknown");
    }
    if (crew && !screenplay && story && !error) {
      const crewcopy = [...crew];
      const tmp = crewcopy.filter((c) => c.job === "Screenplay" )[0];
      if (tmp) setScreenplay(tmp.original_name);
      else setScreenplay("unknown");
    }
  }, [movie, id, error, crew, videos, director, story, screenplay]);

  if (movie) {
    const genders = movie.genres.map((g, i) => {
      return (
        <p className={detailsStyle.gender} key={i}>
          {i !== 0 ? "," : false} {g.name}
        </p>
      );
    });
    return (
      <div className={detailsStyle.details}>
        <div
          className={detailsStyle.blurredBack}
          style={{
            background:  `url(${process.env.image}original/${movie.poster_path})`,
          }}
        ></div>
        <Layout>
          <div className={detailsStyle.content}>
            <div className={detailsStyle.top}>
              <div className={detailsStyle.left}>
                <h2>
                  {movie.title}{" "}
                  <span>({movie.release_date.split("-")[0]})</span>
                </h2>
                <div className={detailsStyle.allGenders}>{genders}</div>
                <div className={detailsStyle.durationContainer}>
                  <p className={detailsStyle.duration}>
                    {convertMinutes(movie.runtime)}
                  </p>
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
                  <span className={detailsStyle.votePercent}>
                    {convertNoteToPercent(movie.vote_average)}%
                  </span>
                </div>
                <div className={detailsStyle.btnContainer}>
                <Link href={"#"}>
                <button className={detailsStyle.plain}>Regarder</button>
              </Link>
              <Link href={`#`}>
                <button className={detailsStyle.empty}><StarRating numItems={1} size={22} value={0} /></button>
              </Link>
                </div>
                <div className={detailsStyle.movieInfos}>
                  <h3>Synopsis</h3>
                  <p className={detailsStyle.synopsis}>{movie.overview}</p>
                  <div className={detailsStyle.crew}>
                    <div className={detailsStyle.crewColumn}>
                      <div className={detailsStyle.crewName}>
                        <h4>Screenplay, Story</h4>
                        <p>
                          {story
                            ? story[0]
                              ? story[0].original_name
                              : "unknown"
                            : "unknown"}
                        </p>
                      </div>
                      <div className={detailsStyle.crewName}>
                        <h4>Screenplay, Story</h4>
                        <p>
                          {story
                            ? story[1]
                              ? story[1].original_name
                              : "unknown"
                            : "unknown"}
                        </p>
                      </div>
                    </div>
                    <div className={detailsStyle.castColumn}>
                      <div className={detailsStyle.crewName}>
                        <h4>Director</h4>
                        <p>{director ?? "unknown"}</p>
                      </div>
                      <div className={detailsStyle.crewName}>
                        <h4>Screenplay</h4>
                        <p>{screenplay ?? "unknown"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <img
                  src={`${process.env.image}w500/${movie.poster_path}`}
                  className={detailsStyle.movieImg}
                />
              </div>
            </div>

            <div className={detailsStyle.videosContainer}>
              <h2>Bandes annonces</h2>
              <ul>
                {videos && videos.length > 0 ? generateVideosElements() : false}
              </ul>
            </div>
            <div className={detailsStyle.castingContainer}>
              <h2>Casting</h2>
              {cast ? <Cast cast={cast} /> : false}
            </div>
          </div>
        </Layout>
      </div>
    );
  } else {
    if (error) {
      return (
        <Layout>
          <div className={detailsStyle.loading}>
            <p>{error}</p>
          </div>
        </Layout>
      );
    } else {
      return (
        <Layout>
          <div className={detailsStyle.loading}>{<Loading />}</div>
        </Layout>
      );
    }
  }
}
