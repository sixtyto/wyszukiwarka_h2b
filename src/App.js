import React, { useState, useEffect } from "react";
import Unsplash, { toJson } from "unsplash-js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Jumbotron from "react-bootstrap/Jumbotron";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const APP_ACCESS_KEY = "q2mG3uuehVG6zS8CkSTPDyi4XkYmvs0F2hZY3VeOYPE";

const unsplash = new Unsplash({ accessKey: APP_ACCESS_KEY });

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {props.image ? (
        <>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter" class="flex">
              <div class="p-2">
                <Image
                  roundedCircle
                  fluid
                  src={props.image.user.profile_image.small}
                />
              </div>
              <div>
                <div>
                  {props.image.user.first_name} {props.image.user.last_name}
                </div>
                <div>{props.image.user.location}</div>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Image src={props.image.urls.full} fluid />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </>
      ) : null}
    </Modal>
  );
}

function App() {
  const [images, setImages] = useState([]);
  const [input, setInput] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [hero, setHero] = useState(true);
  const [page, setPage] = useState(0);
  const [flag, setFlag] = useState(false);
  const [nextPageResults, setNextPageResults] = useState(0);

  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      document.getElementById("search_button").click();
    }
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

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
  }, [page, flag]);

  const handleClick = () => {
    setHero(false);
    setPage(1);
    setFlag(!flag);
  };

  const handlePage = () => {
    setPage(page + 1);
  };

  console.log(images);
  console.log(page);
  console.log(nextPageResults);

  return (
    <Container>
      {hero ? (
        <Jumbotron>
          <h1>Unsplash App!</h1>
          <p>This is a simple search app using React.</p>
          <p>Type word below to display images.</p>
        </Jumbotron>
      ) : null}
      <Row>
        <InputGroup className="m-3">
          <FormControl
            placeholder="What are you looking for"
            aria-describedby="search bar"
            id="search"
            onChange={handleChange}
            onKeyDown={handleEnter}
          />
          <InputGroup.Append>
            <Button
              variant="outline-secondary"
              id="search_button"
              onClick={handleClick}
            >
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Row>
      {hero ? null : (
        <>
          <Row>
            <Col>
              <div className={"gallery"}>
                {images.map((image) => (
                  <>
                    <Button
                      key={image.id}
                      className={"gallery_item p-0"}
                      variant="link"
                      onClick={() => {
                        setModalShow(true);
                        setModalImage(image);
                      }}
                    >
                      <Image
                        src={image.urls.thumb}
                        alt={image.alt_description}
                        fluid
                      />
                    </Button>
                  </>
                ))}
                <MyVerticallyCenteredModal
                  image={modalImage}
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={{ offset: 8 }}>
              <div className="p-3">
                <Button
                  disabled={!nextPageResults}
                  variant={!nextPageResults ? "light" : "primary"}
                  onClick={handlePage}
                >
                  Next page
                </Button>
              </div>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default App;
