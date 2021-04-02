import React, { useState, useEffect } from "react";
import ContainerCard from "../../ContainerCard/index";
import Button from "@material-ui/core/Button";
import Loading from "../../Loading/index";
import { connect } from "react-redux";
import { getProducto } from "../../../state/actions";
import { useParams } from "react-router-dom";
import "./index.css";

/*
Renderiza el detalle de un producto
*/
function ItemDetail(props) {
  const [item, setItem] = useState(null);
  const [param, setParam] = useState(null);
  const { getProducto } = props;
  let { id } = useParams();

  useEffect(() => {
    if (id !== null && id !== undefined) {
      setParam(id);
    }
  }, [id]);

  useEffect(() => {
    const updateItems = () => {
      setItem(props.result?.item);
    };
    return updateItems();
  }, [props.result]);

  useEffect(() => {
    const getItem = async () => {
      setItem(null);
      if (param !== null) await getProducto(param);
    };
    return getItem();
  }, [param, getProducto]);

  return (
    <ContainerCard>
      {item != null ? (
        <div className="detailContainer">
          <div className="detailTop">
            <div className={"imageContainer"}>
              <img src={item.picture} alt={item.title}></img>
            </div>
            <div className="middleContainer">
              <p className="cardTextCondition">
                {item.condition === "new" ? "Nuevo" : "Usado"}
              </p>
              <p className="cardText">{item.title}</p>
              <div className="priceContainer">
                <p className="cardTextXXLarge">
                  $ {item.price.amount.toLocaleString()}
                </p>
                <p className="cardTextPriceDecimals">
                  {item.price.decimals < 10 ? "0" : null}
                  {item.price.decimals}
                </p>
              </div>
              <Button
                variant="contained"
                color="primary"
                className="buyButton"
                disableElevation
              >
                Comprar
              </Button>
            </div>
          </div>
          <div className="detailBottom">
            <div className="bottomContainer">
              <p className="cardTextXXLarge">Descripción del producto</p>
              <p className="cardDescription">{item.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </ContainerCard>
  );
}

const mapStateToProps = (state) => ({
  result: state.producto,
});
const mapDispatchToProps = (dispatch) => ({
  getProducto: (id) => dispatch(getProducto(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);
