import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Movie } from "../../components/Carousel/utils/function";
import Layout from "../../components/Header/layout";
import { withStyle } from "baseui";
import { Spinner } from "baseui/spinner";

import searchStyle from "./search.module.css";

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


export default function SearchPage() {
  const router = useRouter();
  const { value } = router.query;
  const [movies, setMovies] = useState(null);
  const [totalResult, setTotalResult] = useState(0);

  useEffect(() => {
    const getMovies = async (page, prev) => {
      const res = await fetch(
        `${process.env.search}movie?api_key=${process.env.TMDB_API_KEY}&query=${value}&page=${page}`
      );
      const data = await res.json();
      const results = [...prev, ...data.results];

      if (!totalResult) setTotalResult(data.total_results);
      if (page < data.total_pages) {
        return getMovies(page + 1, results);
      } else {
        setMovies(results);
        return results;
      }
    };
    if (value) {
      getMovies(1, []);
    }
  }, [value, totalResult]);

  return (
    <div className={searchStyle.search}>
      <Layout>
        <div className={searchStyle.header}>
          <h2 className={searchStyle.title}>{value}</h2>
          <p>{totalResult} résultats</p>
        </div>
        <div className={searchStyle.container}>
          {movies ? (
            movies.length > 0 ? (
              movies.map((m, i) => {
                return <Movie movie={m} key={i} />;
              })
            ) : (
              <div className={searchStyle.loading}>{<Loading />}</div>
            )
          ) : (
            false
          )}
        </div>
      </Layout>
    </div>
  );
}
