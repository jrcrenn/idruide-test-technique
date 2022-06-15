import MyCarousel from "../components/Carousel/carousel";
import Top from "../components/Top/top";
import Layout from "../components/Header/layout";
import homeStyle from "./index.module.css";
import api from "../config/config"

export default function Home({ trend, last_released, top_rated }) {
  const top = trend.results.slice(0, 3);
  const lastReleased = last_released.results;
  const topRated = top_rated.results;
  return (
    <div className={homeStyle.home}>
      <Layout>
        <Top top={top} />
        <MyCarousel
          title="A l'affiche cette semaine"
          data={lastReleased}
          duration
        />
        <MyCarousel title="Les films les mieux notés" data={topRated} />
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  const trend = await fetch(
   api.tmdb.trend + `movie/week?` + api.key + `&language=fr`
  );
  const lastReleased = await fetch(
    api.tmdb.movie + `now_playing?` + api.key + `&language=fr`
  );
  const topRated = await fetch(
   api.tmdb.movie + `top_rated?` + api.key + `&language=fr`
  );
  const data = await trend.json();
  const dataLastReleased = await lastReleased.json();
  const dataTopRated = await topRated.json();
  return {
    props: {
      trend: data,
      last_released: dataLastReleased,
      top_rated: dataTopRated,
    },
  };
}
