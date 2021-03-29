import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";
import './index.css';

function Header() {

  const [searchText, setSearchText] = useState("");
  let history = useHistory();

  const handleChangeText = (event) => {
    var text = event.target.value;
    setSearchText(text);
  }

  const handleKeyDown  = (event) => {
    if (event.key === 'Enter' && searchText.length > 0) {
      history.push("/items/?search=" + searchText);
    }
  }

  const handleSearchClick = () => {
    if (searchText.length > 0) {
      history.push("/items/?search=" + searchText);
    }
  }

  return (
    <InputGroup className="searchContainer">
      <a className="logo"></a>
      <FormControl
        placeholder="Buscar"
        aria-label="Buscar"
        className="searchBox form-control"
        onChange={handleChangeText}
        onKeyDown={handleKeyDown}
      />
      <InputGroup.Append className="searchBox">
        <Button variant="outline-light" className="searchButton" onClick={handleSearchClick}>
          <FaSearch className="searchIcon"></FaSearch>
        </Button>
      </InputGroup.Append>
    </InputGroup>
  )
}

export default Header;

