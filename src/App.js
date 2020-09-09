import React, { useState, useEffect } from "react";
import Unsplash, { toJson } from "unsplash-js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import "bootstrap/dist/css/bootstrap.min.css";

const APP_ACCESS_KEY = "q2mG3uuehVG6zS8CkSTPDyi4XkYmvs0F2hZY3VeOYPE";
const APP_SECRET_KEY = "41xKc3ET1WEoFZc2w2PGsaVZnOwA-xXejlEsclvY3yU";

const unsplash = new Unsplash({ accessKey: APP_ACCESS_KEY });

function App() {
  const [images, setImages] = useState([]);
  useEffect(() => {
    unsplash.search
      .photos("dogs", 1, 10, { orientation: "portrait", color: "green" })
      .then(toJson)
      .then((json) => {
        setImages([...json.results]);
      });
  }, []);
  console.log(images);
  return (
    <Container>
      <Row>
        {images.map((image) => (
          <Col md={4}>
            <Image
              key={image.id}
              src={image.urls.full}
              alt={image.alt_description}
              thumbnail
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
