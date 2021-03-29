import React, { useState, useEffect } from 'react';
import ContainerCard from "../../ContainerCard/index";
import Button from '@material-ui/core/Button';
import { useParams } from "react-router-dom";
import './index.css';

function ItemDetail() {
  const [item, setItem] = useState(null);
  const [param, setParam] = useState(null);
  let { id } = useParams();


  const getDetail = async (id) => {
    if (id != null) {
      let url = 'http://localhost:3001/api/items/' + id;
      fetch(url)
        .catch((error) => {

        })
        .then(response => response.json())
        .then(json => {
          if (json.item != undefined)
            setItem(json.item);
        });
    }
  };

  useEffect(() => {
    if (id != null && id != undefined) {
      setParam(id)
    }
  })

  useEffect(async () => {
    const getItem = async () => {
      await getDetail(param);
    }
    return getItem();
  }, [param]);

  return (
    <ContainerCard>
      {item != null ?
        <div className="detailContainer">
          <div className="detailTop">
            <div className={"imageContainer"} >
              <img src={item.picture}></img>
            </div>
            <div className="middleContainer">
              <p className="cardTextCondition">{item.condition === "new" ? "Nuevo" : "Usado"}</p>
              <p className="cardText">{item.title}</p>
              <div className="priceContainer">
                <p className="cardTextXXLarge">$ {item.price.amount.toLocaleString()}</p><p className="cardTextPriceDecimals">{item.price.decimals < 10 ? "0" : null}{item.price.decimals}</p>
              </div>
              <Button variant="contained" color="primary" className="buyButton" disableElevation>Comprar</Button>
            </div>
          </div>
          <div className="detailBottom">
            <div className="bottomContainer">
              <p className="cardTextXXLarge">Descripción del producto</p>
              <p className="cardDescription">
                {item.description}
              </p>
            </div>
          </div>
        </div>
        : null
      }
    </ContainerCard>
  );
}

export default ItemDetail;