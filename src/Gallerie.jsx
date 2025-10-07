import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
const url =
  "https://api.unsplash.com/search/photos?client_id=FW46CZLGjuOU93iYU_YbPTZEuq0W6ZLGOrpoJtcQ5Rc&query=office";
const Gallerie = () => {
  const response = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      const result = await axios.get(url);
      return result.data;
    },
  });
  if (response.isLoading) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    );
  }
  if (response.isError) {
    return (
      <section className="image-container">
        <h4>Error...</h4>
      </section>
    );
  }

  const results = response.data.results;
  if (results.length < 1) {
    return (
      <section className="image-container">
        <h4>No images found</h4>
      </section>
    );
  }
  return (
    <section className="image-container">
      {results.map((item) => {
        const url = item?.urls?.regular;
        return (
          <img
            key={item.id}
            src={url}
            className="img"
            alt={item.alt_description}
          />
        );
      })}
    </section>
  );
};

export default Gallerie;
