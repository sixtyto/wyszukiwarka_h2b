import React, { useState, useEffect } from "react";
import Unsplash, { toJson } from "unsplash-js";
import Container from "react-bootstrap/Container";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import Gallery from "./components/Gallery";
import options from "./options";

const APP_ACCESS_KEY = "q2mG3uuehVG6zS8CkSTPDyi4XkYmvs0F2hZY3VeOYPE";

const unsplash = new Unsplash({ accessKey: APP_ACCESS_KEY });

const App = () => {
  const [images, setImages] = useState([]);
  const [input, setInput] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [hero, setHero] = useState(true);
  const [page, setPage] = useState(1);
  const [nextPageResults, setNextPageResults] = useState(0);

  useEffect(() => {
    unsplash.search
      .photos(input, page, 30, { orientation: "landscape" })
      .then(toJson)
      .then((json) => {
        setImages([...json.results]);
      });
    unsplash.search
      .photos(input, page + 1, 30, { orientation: "landscape" })
      .then(toJson)
      .then((json) => {
        setNextPageResults([...json.results].length);
      });
  }, [page, input]);

  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      document.getElementById("search_button").click();
    }
  };

  const handleChange = (e) => {
    setHero(false);
    setInput(e.value);
  };

  const handlePage = (value) => {
    setPage(page + value);
  };

  return (
    <Container>
      <Hero hero={hero} />
      <SearchBar
        options={options}
        handleEnter={handleEnter}
        handleChange={handleChange}
      />
      <Gallery
        hero={hero}
        images={images}
        setModalShow={setModalShow}
        setModalImage={setModalImage}
        modalImage={modalImage}
        modalShow={modalShow}
        page={page}
        handlePage={handlePage}
        nextPageResults={nextPageResults}
      />
    </Container>
  );
};

export default App;
