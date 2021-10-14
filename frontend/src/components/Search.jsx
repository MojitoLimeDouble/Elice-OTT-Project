import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ContentsCard } from "./Prediction";

const Search = () => {
  const [searchList, setSearchList] = useState("");

  const params = useParams();
  const fetchData = async () => {
    const body = {
      search: params.query,
    };
    console.log(body);
    try {
      const response = await axios.post(`/api/search`, body);
      setSearchList(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params]);

  return (
    <div>
      {!searchList ? (
        <div>일치하는 작품이 없습니다.</div>
      ) : (
        searchList?.movie?.map((movie) => (
          <ContentsCard contents={movie} key={movie.id} />
        )) ||
        searchList?.tv?.map((tv) => <ContentsCard contents={tv} key={tv.id} />)
      )}
    </div>
  );
};

export default Search;
