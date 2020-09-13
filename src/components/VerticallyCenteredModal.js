import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

const VerticallyCenteredModal = (props) => {
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
};

export default VerticallyCenteredModal;
