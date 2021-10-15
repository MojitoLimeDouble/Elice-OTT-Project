import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ContentsCard } from "./Prediction";

const Search = ({ windowHeight }) => {
  const [searchList, setSearchList] = useState("");

  const params = useParams();
  const fetchData = async () => {
    if (params.query === " ") {
      return;
    }
    const body = {
      search_word: params.query,
    };
    console.log(body);
    try {
      const response = await axios.post(`/api/search`, body);
      console.log(response.data);
      setSearchList(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params]);

  return (
    <div
      style={{
        minHeight: `${windowHeight - 320}px`,
      }}
    >
      <div>
        <div>MOVIE Contents</div>
        {searchList?.movie?.map((movie) => (
          <ContentsCard contents={movie} key={movie.id} category="movie" />
        ))}
      </div>

      <div>
        <div>TV Contents</div>
        {searchList?.tv?.map((tv) => (
          <ContentsCard contents={tv} key={tv.id} category="tv" />
        ))}
      </div>
    </div>
  );
};

export default Search;
