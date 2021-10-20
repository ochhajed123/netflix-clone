// Parent Component Showing Rows on Website like - Trending Now, Netflix Originals
import React, { useEffect, useState } from "react";
import instance from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  // state - to keep track of movies
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    // pull images right when single row/ Rows load on screen
    // everytime this row loads useEffect will run
    // if [], run once when the row loads, and don't run again
    // [movies], it's gonna run every single time when movie changes

    async function fetchData() {
      const request = await instance.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1, // autoplay when it loads in
    },
  };

  //when user clicks on picture
  const handleClick = (movie) => {
    // If you already clcicked picture/ open video then just clear it and hide video
    if (trailerUrl) {
      setTrailerUrl(""); // way for closing already opened video
    } else {
      // i/p - movie name and it will find movie trailer for us
      movieTrailer(movie?.name || "") // "" - bcz sometimes name is also undefined
        .then((url) => {
          // Using promise - here we are getting url
          /*
          https://www.youtube.com/watch?v=16y1AkoZkmQ&list=RD16y1AkoZkmQ&start_radio=1
          from URL above we need part after v=
          */
          const urlParams = new URLSearchParams(new URL(url).search); // to get everything afetr ?
          // URLSearchParams - allows us to use get()
          setTrailerUrl(urlParams.get("v")); // urlParams.get("v") - gonna give us value for v
        })
        .catch((error) => console.log(error)); // if no url is coming then track error
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {console.log(movies)}
        {/** row_posters */}
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            // when I click image play youtube video, pass movie Obj from here
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      {/** when we have trailerUrl then show <Youtube /> */}
      {trailerUrl && (
        <YouTube
          videoId={trailerUrl} // defaults -> null
          opts={opts} // defaults -> {obj}
        />
      )}
    </div>
  );
}

export default Row;
