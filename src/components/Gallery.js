import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

import VerticallyCenteredModal from "./VerticallyCenteredModal";

const Gallery = (props) => {
  const {
    hero,
    images,
    setModalShow,
    setModalImage,
    modalImage,
    modalShow,
    page,
    handlePage,
    nextPageResults,
  } = props;
  return hero ? null : (
    <>
      <Row>
        <Col>
          <div className={"gallery"}>
            {images.length ? (
              images.map((image) => (
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
              ))
            ) : (
              <p>No results.</p>
            )}
            <VerticallyCenteredModal
              image={modalImage}
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>
        </Col>
      </Row>

      <Row>
        <Col className={"d-flex justify-content-around"}>
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
        <Col className={"d-flex justify-content-around"}>
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
  );
};

export default Gallery;
