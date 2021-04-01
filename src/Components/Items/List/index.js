import React, { useState, useEffect } from 'react';
import ContainerCard from "../../ContainerCard/index";
import Card from '@material-ui/core/Card';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import { getListaProductos, getBreadcrumb, setBreadcrumb } from '../../../state/actions';
import './index.css';

function ItemsList(props) {

  let history = useHistory();
  const [items, setItems] = useState(props.result?.items);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onChangeQuery = () => {
      const query = new URLSearchParams(window.location.search);
      let queryParams = {
        search: query.get('search')
      };
      if (queryParams.search !== '' && queryParams.search !== null) {
        setQuery(queryParams.search)
      }
    }
    return onChangeQuery();
  })

  useEffect(() => {
    const getItems = async () => {
      setItems([]);
      await props.getListaProductos(query);
    }
    return getItems();
  }, [query]);

  useEffect(() => {
    const updateItems = () => {
      if (props.result !== null && props.result !== undefined) {
        setItems(props.result?.items);
        if (props.result.categories?.length > 0) {
          props.getBreadcrumb(props.result?.categories[0]);
        }
        else {
          props.setBreadcrumb([]);
        }
      }
      else
        props.setBreadcrumb([]);
    }
    return updateItems();
  }, [props.result]);

  const handleClick = (id, index) => {
    props.getBreadcrumb(props.result?.categories[index]);
    history.push("/items/" + id);
  }

  return (
    <ContainerCard>
      {items !== undefined && items.length > 0 ? items.slice(0, 4).map((x, i) => {
        return (
          <Card key={x.id} className="cardContainer cursorPointer" onClick={() => handleClick(x.id, i)}>
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

const mapStateToProps = state => ({
  result: state.productos,
  categoria: state.categoria
})
const mapDispatchToProps = dispatch => ({
  getListaProductos: (texto) => dispatch(getListaProductos(texto)),
  getBreadcrumb: (id) => dispatch(getBreadcrumb(id)),
  setBreadcrumb: (lista) => dispatch(setBreadcrumb(lista)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);