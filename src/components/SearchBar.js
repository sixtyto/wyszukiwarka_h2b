import React from "react";
import Select from "react-select";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

const SearchBar = (props) => {
  const { options, handleChange, handleEnter, handleClick } = props;
  return (
    <Row className="m-3">
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
  );
};

export default SearchBar;
