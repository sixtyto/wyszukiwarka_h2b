import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

const VerticallyCenteredModal = (props) => {
  const { image } = props;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {image ? (
        <>
          <Modal.Header closeButton>
            <Modal.Title
              id="contained-modal-title-vcenter"
              class="d-flex align-items-center"
            >
              <div class="p-2">
                <Image
                  roundedCircle
                  fluid
                  src={image.user.profile_image.small}
                />
              </div>
              <div>
                <div>
                  {image.user.first_name} {image.user.last_name}
                </div>
                <div>{image.user.location}</div>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Image src={image.urls.full} fluid />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </>
      ) : null}
    </Modal>
  );
};

export default VerticallyCenteredModal;
