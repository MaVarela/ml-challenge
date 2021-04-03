import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import "./index.css";

/*
Renderiza un componente contenedor
*/
function ContainerCard(props) {
  const [estilos, setEstilos] = useState("mainContainer");
  const { className } = props;

  useEffect(() => {
    const updateStyles = () => {
      if (className !== undefined && className !== "")
        setEstilos((e) => {
          return e + " " + className;
        });
    };
    return updateStyles();
  }, [className]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={8} lg={12}>
        <Card className={estilos}>{props.children}</Card>
      </Grid>
    </Grid>
  );
}

export default ContainerCard;
