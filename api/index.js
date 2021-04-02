const express = require("express");
var cors = require("cors");
const axios = require("axios");
const app = express();
const swaggerUi = require("swagger-ui-express");
const openApiDocumentation = require("./api-docs.json");
const PORT = process.env.PORT || 3001;

const extractDecimalOrInteger = (num, integer) => {
  const numStr = String(num);

  if (!integer) {
    var number = numStr.split(".")[1];
    return number !== undefined ? Number(numStr.split(".")[1]) : 0;
  }
  return Number(numStr.split(".")[0]);
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
app.use(cors());
app.use(agregarFirma());

/*
  Endpoint para obtención de listado de items
*/
app.route("/api/items").get((req, res) => {
  let { search } = req.query;

  axios
    .get("https://api.mercadolibre.com/sites/MLA/search", {
      params: {
        q: search,
      },
    })
    .then((response) => {
      var result = {
        categories: response.data.results.map((x) => x.category_id),
        items: response.data.results.map((x) => {
          return {
            id: x.id,
            title: x.title,
            price: {
              currency: x.currency_id,
              amount: extractDecimalOrInteger(x.price, true),
              decimals: extractDecimalOrInteger(x.price, false),
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
            amount: extractDecimalOrInteger(response.data.price, true),
            decimals: extractDecimalOrInteger(response.data.price, false),
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
            ...result,
          });
        })
        .catch((error) => {
          if (error.response.status === 404) {
            res.status(200).send({
              ...result,
            });
          } else {
            res.status(400).send({
              message: `Error ${error}`,
            });
          }
        });
    })
    .catch((error) => {
      res.status(400).send({
        message: `Error ${error}`,
      });
    });
});

/*
  Endpoint para obtención una categoría
*/
app.route("/api/category/:id").get((req, res) => {
  let { id } = req.params;

  axios
    .get(`https://api.mercadolibre.com/categories/${id}`)
    .then((response) => {
      var result = {
        categories: response.data.path_from_root.map((x) => x.name),
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
  Endpoint para acceder a la documentación
*/
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

app.listen(PORT, () => {
  console.log(`API Server started and listening http://localhost:${PORT}`);
});
