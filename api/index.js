const express = require("express");
const axios = require("axios");
const app = express();
const swaggerUi = require("swagger-ui-express");
const openApiDocumentation = require("./api-docs.json");
const PORT = process.env.PORT || 3001;

const decimalCount = (num) => {
  const numStr = String(num);

  if (numStr.includes(".")) {
    return numStr.split(".")[1].length;
  }
  return 0;
};
const agregarFirma = () => {
  return (req, res, next) => {
    if (!req.originalUrl.includes("api-docs")) {
      var send = res.send;
      res.send = function (body) {
        var bodyAux = {
          author: {
            name: "Mariano",
            lastname: "Varela",
          },
          ...body,
        };

        res.send = send;
        res.send(bodyAux);
      };
    }
    next();
  };
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(agregarFirma());

/*
  Endpoint para obtención de listado de items
*/
app.route("/api/items").get((req, res) => {
  let { q } = req.query;

  axios
    .get(`https://api.mercadolibre.com/sites/MLA/search?q=${q}`)
    .then((response) => {
      var result = {
        categories: response.data.results.map((x) => x.category_id),
        items: response.data.results.map((x) => {
          return {
            id: x.id,
            title: x.title,
            price: {
              currency: x.currency_id,
              amount: x.price,
              decimals: decimalCount(x.price),
            },
            picture: x.thumbnail,
            condition: x.condition,
            free_shipping: x.shipping.free_shipping,
          };
        }),
      };

      res.status(200).send({
        ...result,
      });
    })
    .catch((error) => {
      res.status(400).send({
        message: `Error ${error}`,
      });
    });
});

/*
  Endpoint para obtención de información de un item
*/
app.route("/api/items/:id").get((req, res) => {
  let { id } = req.params;

  axios
    .get(`https://api.mercadolibre.com/items/${id}`)
    .then((response) => {
      const result = {
        item: {
          id: response.data.id,
          title: response.data.title,
          price: {
            currency: response.data.currency_id,
            amount: response.data.price,
            decimals: decimalCount(response.data.price),
          },
          picture: response.data.thumbnail,
          condition: response.data.condition,
          free_shipping: response.data.shipping.free_shipping,
          sold_quantity: response.data.sold_quantity,
        },
      };

      axios
        .get(`https://api.mercadolibre.com/items/${id}/description`)
        .then((response) => {
          result.item.description = response.data.plain_text;
          res.status(200).send({
            ...result
          });
        })
        .catch((error) => {
          res.status(400).send({
            message: `Error ${error}`,
          });
        });
    })
    .catch((error) => {
      res.status(400).send({
        message: `Error ${error}`,
      });
    });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

app.listen(PORT, () => {
  console.log(`API Server started and listening http://localhost:${PORT}`);
});
