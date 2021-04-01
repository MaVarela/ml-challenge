import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import './index.css';

function ContainerCard(props) {

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={8} lg={12}>
        <Card className={"mainContainer"}>
          {props.children}          
        </Card>
      </Grid>
    </Grid >
  )
}

export default ContainerCard;