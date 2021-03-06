import MyCarousel from "../components/Carousel/carousel";
import Top from "../components/Top/top";
import Layout from "../components/Header/layout";
import homeStyle from "./index.module.css";

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
   `${process.env.trend}movie/week?api_key=${process.env.TMDB_API_KEY}&language=fr`
  );
  const lastReleased = await fetch(
    `${process.env.movie}now_playing?api_key=${process.env.TMDB_API_KEY}&language=fr`
  );
  const topRated = await fetch(
   `${process.env.movie}top_rated?api_key=${process.env.TMDB_API_KEY}&language=fr`
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
