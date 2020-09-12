import React, { useState, useEffect } from "react";
import Unsplash, { toJson } from "unsplash-js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Jumbotron from "react-bootstrap/Jumbotron";
import Select from "react-select";

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

  const options = [
    { value: "Chocolate", label: "Chocolate" },
    { value: "Strawberry", label: "Strawberry" },
    { value: "Vanilla", label: "Vanilla" },
    { value: "Cat", label: "Cat" },
    { value: "Dog", label: "Dog" },
  ];

  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      document.getElementById("search_button").click();
    }
  };

  const handleChange = (e) => {
    setHero(false);
    setInput(e.value);
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
  }, [page, flag, input]);

  const handleClick = () => {
    setPage(1);
    setFlag(!flag);
  };

  const handlePage = (value) => {
    setPage(page + value);
  };

  console.log(images);
  console.log(page);
  console.log(input);
  console.log(nextPageResults);

  return (
    <Container>
      {hero ? (
        <Row>
          <Col>
            <Jumbotron>
              <h1>Unsplash App!</h1>
              <p>This is a simple search app using React.</p>
              <p>Type word below to display images.</p>
            </Jumbotron>
          </Col>
        </Row>
      ) : null}
      <Row>
        <InputGroup>
          <Col sm={11}>
            <Select
              options={options}
              onChange={handleChange}
              onKeyDown={handleEnter}
            />
          </Col>
          <Col sm={1}>
            <InputGroup.Append>
              <Button
                variant="outline-secondary"
                id="search_button"
                onClick={handleClick}
              >
                Search
              </Button>
            </InputGroup.Append>
          </Col>
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
            <Col xs={{ offset: 2 }}>
              <div className="p-3">
                <Button
                  disabled={page === 1}
                  variant={page === 1 ? "light" : "primary"}
                  onClick={() => handlePage(-1)}
                >
                  Previous page
                </Button>
              </div>
            </Col>
            <Col xs={{ offset: 4 }}>
              <div className="p-3">
                <Button
                  disabled={!nextPageResults}
                  variant={!nextPageResults ? "light" : "primary"}
                  onClick={() => handlePage(1)}
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
