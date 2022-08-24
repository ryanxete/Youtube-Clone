import React, { useState } from "react";
import axios from "axios";
import "./SearchBar.css";

const SearchBar = (props) => {
  const [entry, setEntry] = useState("");

  async function handleSubmit() {
    let response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?q=${entry}&key=AIzaSyDmAd6-cTFWb0pjvlO3noSa-1AwgNEGHIc&part=snippet&maxResults=9`
    );
    props.setVideos(response.data.items);
    setEntry("");
  }

  return (
    <div className="searchbar-container">
      <input
        className="searchbar"
        type="text"
        value={entry}
        onChange={(event) => setEntry(event.target.value)}
      />
      <button className="searchbutton" onClick={handleSubmit}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
