import React, { useState, useEffect } from 'react';
import ContainerCard from "../../ContainerCard/index";
import Card from '@material-ui/core/Card';
import { useHistory } from "react-router-dom";
import './index.css';

function ItemsList() {

  let history = useHistory();
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");

  const searchProducts = async (text) => {
    let url = 'http://localhost:3001/api/items?search=' + text;
    fetch(url)
      .catch((error) => {

      })
      .then(response => response.json())
      .then(json => {
        if (json.items != undefined)
          setItems(json.items);
      });
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    let queryParams = {
      search: query.get('search')
    };
    if (queryParams.search !== '' && queryParams.search !== null) {
      setQuery(queryParams.search)
    }
  })

  useEffect(async () => {
    const getItems = async () => {
      await searchProducts(query);
    }
    return getItems();
  }, [query]);

  const handleClick = (id) => {
    history.push("/items/" + id);
  }

  return (
    <ContainerCard>
      {items.length > 0 ? items.slice(0, 4).map((x, i) => {
        return (
          <Card key={x.id} className="cardContainer cursorPointer" onClick={() => handleClick(x.id)}>
            <div className={"imageContainerList"} >
              <img src={x.picture}></img>
            </div>
            <div className="middleContainer">
              <p className="cardTextList">$ {x.price.amount.toLocaleString()}</p>
              <p className="cardTextListTitle">{x.title}</p>
            </div>
            <div className="rightContainer">
              <p className="cardTextShipping">{x.free_shipping ? "Envío gratis" : "Envío pago"}</p>
            </div>
          </Card>
        )
      }) : null}
    </ContainerCard>
  );
}

export default ItemsList;