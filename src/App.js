import React, { useState, useEffect } from "react";
import Unsplash, { toJson } from "unsplash-js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const APP_ACCESS_KEY = "q2mG3uuehVG6zS8CkSTPDyi4XkYmvs0F2hZY3VeOYPE";
const APP_SECRET_KEY = "41xKc3ET1WEoFZc2w2PGsaVZnOwA-xXejlEsclvY3yU";

const unsplash = new Unsplash({ accessKey: APP_ACCESS_KEY });

function App() {
  const [images, setImages] = useState([]);
  const [input, setInput] = useState("");
  const handleChange = (event) => {
    setInput(event.target.value);
    console.log(event.target.value);
  };
  const handleClick = () => {
    unsplash.search
      .photos(input, 1, 10, { orientation: "portrait" })
      .then(toJson)
      .then((json) => {
        setImages([...json.results]);
      });
  };
  useEffect(() => {
    unsplash.search
      .photos("dog", 1, 10, { orientation: "portrait", color: "green" })
      .then(toJson)
      .then((json) => {
        setImages([...json.results]);
      });
  }, []);
  console.log(images);
  return (
    <Container>
      <Row>
        <InputGroup className="m-3">
          <FormControl
            placeholder="What are you looking for"
            aria-describedby="search bar"
            onChange={handleChange}
          />
          <InputGroup.Append>
            <Button variant="outline-secondary" onClick={handleClick}>
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Row>
      <Row>
        <Col>
          <div className={"gallery"}>
            {images.map((image) => (
              <div className={"gallery_item"}>
                <Image
                  key={image.id}
                  src={image.urls.full}
                  alt={image.alt_description}
                  fluid
                />
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
