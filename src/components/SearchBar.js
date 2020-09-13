import React from "react";
import Select from "react-select";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";

const SearchBar = (props) => {
  const { options, handleChange, handleEnter } = props;
  return (
    <Row className="m-3">
      <InputGroup>
        <Col>
          <Select
            options={options}
            onChange={handleChange}
            onKeyDown={handleEnter}
          />
        </Col>
      </InputGroup>
    </Row>
  );
};

export default SearchBar;
