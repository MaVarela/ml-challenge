import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './index.css';

function ContainerCard(props) {

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={8} lg={12}>
        <Card className="fixedHeight" style={{ paddingLeft: 5, paddingRight: 5, flex: 1 }}>
          {/* {props.children} */}
          <Card style={{ height: "24.8%", marginBottom: 3, flex: 1, flexDirection: "row", display: "flex" }}>
            <div className={"imageContainer"} >
              <img className="minImage" src="http://http2.mlstatic.com/D_935701-MLA43747292279_102020-O.jpg"></img>
            </div>
            <p className="cardText">$ 1980</p>
          </Card>
          <Card style={{ height: "24.8%", marginBottom: 3, flex: 1, flexDirection: "row", display: "flex" }}>
            <div className={"imageContainer"} >
              <img className="minImage" src="http://http2.mlstatic.com/D_935701-MLA43747292279_102020-O.jpg"></img>
            </div>
            <p className="cardText">$ 1980</p>
          </Card>
          <Card style={{ height: "24.8%", marginBottom: 3, flex: 1, flexDirection: "row", display: "flex" }}>
            <div className={"imageContainer"} >
              <img className="minImage" src="http://http2.mlstatic.com/D_935701-MLA43747292279_102020-O.jpg"></img>
            </div>
            <p className="cardText">$ 1980</p>
          </Card>
          <Card style={{ height: "24.8%", marginBottom: 3, flex: 1, flexDirection: "row", display: "flex" }}>
            <div className={"imageContainer"} >
              <img className="minImage" src="http://http2.mlstatic.com/D_935701-MLA43747292279_102020-O.jpg"></img>
            </div>
            <p className="cardText">$ 1980</p>
          </Card>
        </Card>
      </Grid>
    </Grid >
  )
}

export default ContainerCard;