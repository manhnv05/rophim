"use client"

import {memo, useEffect, useState} from "react";
import MovieApi from "@/api/movie.api";
import {peopleAvatar} from "@/utils/image";
import Link from "next/link";
import {castUrl} from "@/utils/url";

const MovieCasts = ({movieId}) => {
  const [casts, setCasts] = useState([])

  const getCasts = async () => {
    const res = await MovieApi.casts(movieId)
    setCasts(res)
  }

  useEffect(() => {
    getCasts()
    // console.log('render movie casts')
  }, [])

  return (
    <div className="child-box child-actors">
      <div className="child-header">Diễn viên</div>
      <div className="child-actors-list">
        {casts.map(item => {
          return (
            <div className="v-item" key={`cast-${item._id}`}>
              <Link href={castUrl(item.cast)} className="v-actor v-actor-medium">
                <img src={peopleAvatar(item.cast.profile_path)} alt={item.cast.name}/>
              </Link>
              <div className="info">
                <h4 className="item-title lim-2"><Link href={castUrl(item.cast)}>{item.cast.name}</Link></h4>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default memo(MovieCasts)