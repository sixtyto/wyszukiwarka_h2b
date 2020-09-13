import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";

const Hero = (props) => {
  const { hero } = props;
  return hero ? (
    <Row>
      <Col>
        <Jumbotron>
          <h1>Unsplash App!</h1>
          <p>This is a simple search app using React.</p>
          <p>Type word below to display images.</p>
        </Jumbotron>
      </Col>
    </Row>
  ) : null;
};

export default Hero;
