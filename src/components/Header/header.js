/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import Link from "next/link";
import headerStyle from "./header.module.css";
import { Search } from "baseui/icon";
import { useState } from "react";
import ArrowRight from "baseui/icon/arrow-right";
import Image from "next/image";

export default function Header() {
  const [searchVal, setSearch] = useState("");
  const [movies, setMovies] = useState(null);

  const generateElements = () => {
    return movies.map((m, i) => {
      return (
        <Link
          href={`/movie/${m.id}`}
          key={i}
          className={headerStyle.movieLink}
          onClick={() => setSearch("")}
          passHref={true}
        >
          <div className={headerStyle.movieContainer}>
            <li className={headerStyle.movie}>
              <Image
                width={40}
                height={40}
                src={`${process.env.image}w200/${m.poster_path}`}
                className={headerStyle.movieImg}
              />
              <div className={headerStyle.movieInfos}>
                <h5>{m.original_title}</h5>
                <p>{m.release_date ? m.release_date.split("-")[0] : "0000"}</p>
              </div>
            </li>
            <ArrowRight className={headerStyle.arrowIcon} size={24} />
          </div>
        </Link>
      );
    });
  };

  const handleSearch = async (e) => {
    const val = e.target.value;
    setSearch(val);
    const res = await fetch(
      `${process.env.search}movie?api_key=${process.env.TMDB_API_KEY}&query=${val}&language=fr`
    );
    const data = await res.json();
    const results = data.results;
    setMovies(results);
  };

  return (
    <header className={headerStyle.header}>
      <Link href="/" passHref={true}>
        <h1 className={headerStyle.title} onClick={() => setSearch("")}>
          MOVIENIGHT
        </h1>
      </Link>
      <div className={headerStyle.inputContainer}>
        <input
          value={searchVal}
          placeholder="Rechercher un film, un réalisateur, un acteur"
          className={headerStyle.searchInput}
          type="search"
          onChange={handleSearch}
        />
        <Search size={24} className={headerStyle.icon} />
        {searchVal ? (
          <div className={headerStyle.suggestions}>
            <div className={headerStyle.top}>
              <p>Affiner votre recherche pour plus de résultat</p>
              <p>{movies ? movies.length : "0"}+ résultats</p>
            </div>
            {movies && movies.length > 0 ? (
              <ul className={headerStyle.list}>{generateElements()}</ul>
            ) : (
              <p>No results.</p>
            )}
            <div className={headerStyle.moreResult}>
              <Link href={`/search/${searchVal}`} onClick={() => setSearch("")}>
                Voir tous les résultats
              </Link>
            </div>
          </div>
        ) : (
          false
        )}
      </div>
    </header>
  );
}
