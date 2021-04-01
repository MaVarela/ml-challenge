import React, { useState, useEffect } from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { connect } from 'react-redux'
import './index.css';

function Breadcrumb(props) {

  const [categoria, setCategoria] = useState(null);

  useEffect(() => {
    if (props.categoria !== null && props.categoria !== undefined)
      setCategoria(props.categoria)
    else
      setCategoria([])
  }, [props.categoria])

  return (
    <Breadcrumbs aria-label="breadcrumb" id="breadcrumb">
      <Link color="inherit" href="/">
        Inicio
      </Link>
      {categoria !== null ? categoria.map((x, i) => {
        return (
          <Link key={i} color="inherit" href={"/items/?search=" + x}>
            {x}
          </Link>
        )
      }) : null}
    </Breadcrumbs>
  )
}

const mapStateToProps = state => ({
  categoria: state.categoria?.categories
})

export default connect(mapStateToProps, null)(Breadcrumb);