import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import './index.css';

function Header() {

  const [searchText, setSearchText] = useState("");

  const handleChangeText = (event) => {
    var text = event.target.value;
    setSearchText(text);
  }

  const handleSearchClick = () => {
    if (searchText.length > 0)
      return alert("Estás buscando: " + searchText)
    else
      return alert("Debes ingresar texto")
  }

  return (
    <InputGroup className="searchContainer">
      <a className="logo"></a>
      <FormControl
        placeholder="Buscar"
        aria-label="Buscar"
        className="searchBox form-control"
        onChange={handleChangeText}
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

