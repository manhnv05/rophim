"use client"

import {moviePoster} from "@/utils/image";
import {memo} from "react";

const MovieImagesPosterHorizontal = ({movie, size}) => {
  return (
    <img src={moviePoster(movie.images.horizontal_posters, size)}
         alt={`Xem Phim ${movie.title} Vietsub HD Online - Rophim`}
         loading="lazy"/>
  )
}

export default memo(MovieImagesPosterHorizontal)