/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import ArrowRight from "baseui/icon/arrow-right";
import detailsStyle from "../movie.module.css";
import Link from "next/link";

export function convertNoteToPercent(note) {
  return Math.floor(note * 10);
}

export function convertMinutes(min) {
  let hours = min / 60;
  let rhours = Math.floor(hours);
  let minutes = (hours - rhours) * 60;
  let rminutes = Math.round(minutes);
  let final =
    rhours + (rminutes.toString().length === 1 ? "h0" : "h") + rminutes + "m";
  return final;
}

export function PlayButton() {
    return (
      <div className={detailsStyle.playButton}>
        <div className={detailsStyle.playIcon}></div>
      </div>
    );
  }
  
export function Cast({ cast }) {
    const generateElems = () => {
      return cast.map((p, i) => {
        return (
          <div className={detailsStyle.castInfos} key={i}>
            <div className={detailsStyle.castProfileContainer}>
              <img
                src={`${process.env.image}w200/${p.profile_path}`}
                className={detailsStyle.castProfile}
              />
            </div>
            <h5>{p.original_name}</h5>
            <p>{p.character}</p>
          </div>
        );
      });
    };
  
    return (
      <ul className={detailsStyle.castList}>
        {generateElems()}
        <div className={detailsStyle.moreCast}>
          <Link href="#" passHref={true}>
            <p>Voir tout</p>
          </Link>
          <Link href="#" passHref={true}>
            <ArrowRight className={detailsStyle.arrow} size={32} />
          </Link>
        </div>
      </ul>
    );
  }