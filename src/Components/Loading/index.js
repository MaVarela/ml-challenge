import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

/*
Renderiza un componente para indicar carga
*/
const Loading = (props) => {
  return (
    <CircularProgress
      variant="indeterminate"
      disableShrink
      className="top"
      classes={{
        circle: "circle"
      }}
      size={40}
      thickness={4}
      {...props}
    />
  );
};

export default Loading;