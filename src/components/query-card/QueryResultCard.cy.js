import { GlobalMixin } from '@/mixins/globalMixin';
import QueryResultCard from './QueryResultCard.vue';
import AppEcharts from '@/components/helpers/AppEcharts.vue';
import AppTable from '@/components/helpers/AppTable.vue';

let card = {
    "uuid": "8a650796-e9e3-4a76-93a8-27e395f8121c",
    "query": {
      "id": 3,
      "query": "SELECT name, unitsInStock, unitPrice FROM products",
      "label": "Get Products",
      "dataName": "products.json",
      "columns": {
        "dimensions": [
          "productID",
          "name"
        ],
        "measures": [
          "unitsInStock",
          "unitPrice"
        ]
      }
    },
    "data": {
      "chart": null,
      "table": {
        "headers": [
          {
            "name": "productID",
            "label": "productID",
            "index": 0
          },
          {
            "name": "unitPrice",
            "label": "unitPrice",
            "index": 1
          },
          {
            "name": "unitsInStock",
            "label": "unitsInStock",
            "index": 2
          },
          {
            "name": "name",
            "label": "name",
            "index": 3
          }
        ],
        "body": [
          {
            "cells": [
              {
                "name": "productID",
                "value": 4,
                "styles": {}
              },
              {
                "name": "unitPrice",
                "value": 22,
                "styles": {}
              },
              {
                "name": "unitsInStock",
                "value": 53,
                "styles": {}
              },
              {
                "name": "name",
                "value": "Chef Anton's Cajun Seasoning",
                "styles": {}
              }
            ]
          },
          {
            "cells": [
              {
                "name": "productID",
                "value": 5,
                "styles": {}
              },
              {
                "name": "unitPrice",
                "value": 21.35,
                "styles": {}
              },
              {
                "name": "unitsInStock",
                "value": 0,
                "styles": {}
              },
              {
                "name": "name",
                "value": "Chef Anton's Gumbo Mix",
                "styles": {}
              }
            ]
          },
          {
            "cells": [
              {
                "name": "productID",
                "value": 6,
                "styles": {}
              },
              {
                "name": "unitPrice",
                "value": 25,
                "styles": {}
              },
              {
                "name": "unitsInStock",
                "value": 120,
                "styles": {}
              },
              {
                "name": "name",
                "value": "Grandma's Boysenberry Spread",
                "styles": {}
              }
            ]
          },
          {
            "cells": [
              {
                "name": "productID",
                "value": 7,
                "styles": {}
              },
              {
                "name": "unitPrice",
                "value": 30,
                "styles": {}
              },
              {
                "name": "unitsInStock",
                "value": 15,
                "styles": {}
              },
              {
                "name": "name",
                "value": "Uncle Bob's Organic Dried Pears",
                "styles": {}
              }
            ]
          },
          {
            "cells": [
              {
                "name": "productID",
                "value": 8,
                "styles": {}
              },
              {
                "name": "unitPrice",
                "value": 40,
                "styles": {}
              },
              {
                "name": "unitsInStock",
                "value": 6,
                "styles": {}
              },
              {
                "name": "name",
                "value": "Northwoods Cranberry Sauce",
                "styles": {}
              }
            ]
          },
          {
            "cells": [
              {
                "name": "productID",
                "value": 9,
                "styles": {}
              },
              {
                "name": "unitPrice",
                "value": 97,
                "styles": {}
              },
              {
                "name": "unitsInStock",
                "value": 29,
                "styles": {}
              },
              {
                "name": "name",
                "value": "Mishi Kobe Niku",
                "styles": {}
              }
            ]
          },
          {
            "cells": [
              {
                "name": "productID",
                "value": 10,
                "styles": {}
              },
              {
                "name": "unitPrice",
                "value": 31,
                "styles": {}
              },
              {
                "name": "unitsInStock",
                "value": 31,
                "styles": {}
              },
              {
                "name": "name",
                "value": "Ikura",
                "styles": {}
              }
            ]
          },
          {
            "cells": [
              {
                "name": "productID",
                "value": 2,
                "styles": {}
              },
              {
                "name": "unitPrice",
                "value": 19,
                "styles": {}
              },
              {
                "name": "unitsInStock",
                "value": 17,
                "styles": {}
              },
              {
                "name": "name",
                "value": "Chang",
                "styles": {}
              }
            ]
          },
          {
            "cells": [
              {
                "name": "productID",
                "value": 3,
                "styles": {}
              },
              {
                "name": "unitPrice",
                "value": 10,
                "styles": {}
              },
              {
                "name": "unitsInStock",
                "value": 13,
                "styles": {}
              },
              {
                "name": "name",
                "value": "Aniseed Syrup",
                "styles": {}
              }
            ]
          },
          {
            "cells": [
              {
                "name": "productID",
                "value": 11,
                "styles": {}
              },
              {
                "name": "unitPrice",
                "value": 21,
                "styles": {}
              },
              {
                "name": "unitsInStock",
                "value": 22,
                "styles": {}
              },
              {
                "name": "name",
                "value": "Queso Cabrales",
                "styles": {}
              }
            ]
          },
          {
            "cells": [
              {
                "name": "productID",
                "value": 12,
                "styles": {}
              },
              {
                "name": "unitPrice",
                "value": 38,
                "styles": {}
              },
              {
                "name": "unitsInStock",
                "value": 86,
                "styles": {}
              },
              {
                "name": "name",
                "value": "Queso Manchego La Pastora",
                "styles": {}
              }
            ]
          },
          {
            "cells": [
              {
                "name": "productID",
                "value": 13,
                "styles": {}
              },
              {
                "name": "unitPrice",
                "value": 6,
                "styles": {}
              },
              {
                "name": "unitsInStock",
                "value": 24,
                "styles": {}
              },
              {
                "name": "name",
                "value": "Konbu",
                "styles": {}
              }
            ]
          },
          {
            "cells": [
              {
                "name": "productID",
                "value": 14,
                "styles": {}
              },
              {
                "name": "unitPrice",
                "value": 23.25,
                "styles": {}
              },
              {
                "name": "unitsInStock",
                "value": 35,
                "styles": {}
              },
              {
                "name": "name",
                "value": "Tofu",
                "styles": {}
              }
            ]
          },
          {
            "cells": [
              {
                "name": "productID",
                "value": 15,
                "styles": {}
              },
              {
                "name": "unitPrice",
                "value": 15.5,
                "styles": {}
              },
              {
                "name": "unitsInStock",
                "value": 39,
                "styles": {}
              },
              {
                "name": "name",
                "value": "Genen Shouyu",
                "styles": {}
              }
            ]
          },
          {
            "cells": [
              {
                "name": "productID",
                "value": 1,
                "styles": {}
              },
              {
                "name": "unitPrice",
                "value": 18,
                "styles": {}
              },
              {
                "name": "unitsInStock",
                "value": 39,
                "styles": {}
              },
              {
                "name": "name",
                "value": "Chai",
                "styles": {}
              }
            ]
          },
          {
            "cells": [
              {
                "name": "productID",
                "value": 16,
                "styles": {}
              },
              {
                "name": "unitPrice",
                "value": 17.45,
                "styles": {}
              },
              {
                "name": "unitsInStock",
                "value": 29,
                "styles": {}
              },
              {
                "name": "name",
                "value": "Pavlova",
                "styles": {}
              }
            ]
          },
          {
            "cells": [
              {
                "name": "productID",
                "value": 17,
                "styles": {}
              },
              {
                "name": "unitPrice",
                "value": 39,
                "styles": {}
              },
              {
                "name": "unitsInStock",
                "value": 0,
                "styles": {}
              },
              {
                "name": "name",
                "value": "Alice Mutton",
                "styles": {}
              }
            ]
          },
          {
            "cells": [
              {
                "name": "productID",
                "value": 18,
                "styles": {}
              },
              {
                "name": "unitPrice",
                "value": 62.5,
                "styles": {}
              },
              {
                "name": "unitsInStock",
                "value": 42,
                "styles": {}
              },
              {
                "name": "name",
                "value": "Carnarvon Tigers",
                "styles": {}
              }
            ]
          },
          {
            "cells": [
              {
                "name": "productID",
                "value": 19,
                "styles": {}
              },
              {
                "name": "unitPrice",
                "value": 9.2,
                "styles": {}
              },
              {
                "name": "unitsInStock",
                "value": 25,
                "styles": {}
              },
              {
                "name": "name",
                "value": "Teatime Chocolate Biscuits",
                "styles": {}
              }
            ]
          },
          {
            "cells": [
              {
                "name": "productID",
                "value": 20,
                "styles": {}
              },
              {
                "name": "unitPrice",
                "value": 81,
                "styles": {}
              },
              {
                "name": "unitsInStock",
                "value": 40,
                "styles": {}
              },
              {
                "name": "name",
                "value": "Sir Rodney's Marmalade",
                "styles": {}
              }
            ]
          },
          {
            "cells": [
              {
                "name": "productID",
                "value": 24,
                "styles": {}
              },
              {
                "name": "unitPrice",
                "value": 4.5,
                "styles": {}
              },
              {
                "name": "unitsInStock",
                "value": 20,
                "styles": {}
              },
              {
                "name": "name",
                "value": "Guaraná Fantástica",
                "styles": {}
              }
            ]
          },
          {
            "cells": [
              {
                "name": "productID",
                "value": 25,
                "styles": {}
              },
              {
                "name": "unitPrice",
                "value": 14,
                "styles": {}
              },
              {
                "name": "unitsInStock",
                "value": 76,
                "styles": {}
              },
              {
                "name": "name",
                "value": "NuNuCa Nuß-Nougat-Creme",
                "styles": {}
              }
            ]
          },
          {
            "cells": [
              {
                "name": "productID",
                "value": 26,
                "styles": {}
              },
              {
                "name": "unitPrice",
                "value": 31.23,
                "styles": {}
              },
              {
                "name": "unitsInStock",
                "value": 15,
                "styles": {}
              },
              {
                "name": "name",
                "value": "Gumbär Gummibärchen",
                "styles": {}
              }
            ]
          },
          {
            "cells": [
              {
                "name": "productID",
                "value": 27,
                "styles": {}
              },
              {
                "name": "unitPrice",
                "value": 43.9,
                "styles": {}
              },
              {
                "name": "unitsInStock",
                "value": 49,
                "styles": {}
              },
              {
                "name": "name",
                "value": "Schoggi Schokolade",
                "styles": {}
              }
            ]
          },
          {
            "cells": [
              {
                "name": "productID",
                "value": 28,
                "styles": {}
              },
              {
                "name": "unitPrice",
                "value": 45.6,
                "styles": {}
              },
              {
                "name": "unitsInStock",
                "value": 26,
                "styles": {}
              },
              {
                "name": "name",
                "value": "Rössle Sauerkraut",
                "styles": {}
              }
            ]
          },
          {
            "cells": [
              {
                "name": "productID",
                "value": 29,
                "styles": {}
              },
              {
                "name": "unitPrice",
                "value": 123.79,
                "styles": {}
              },
              {
                "name": "unitsInStock",
                "value": 0,
                "styles": {}
              },
              {
                "name": "name",
                "value": "Thüringer Rostbratwurst",
                "styles": {}
              }
            ]
          }
        ],
        "uuid": "67945aed-0be1-4ba3-be31-390c92f7130d"
      },
      "json": [
        {
          "productID": 4,
          "unitPrice": 22,
          "unitsInStock": 53,
          "name": "Chef Anton's Cajun Seasoning"
        },
        {
          "productID": 5,
          "unitPrice": 21.35,
          "unitsInStock": 0,
          "name": "Chef Anton's Gumbo Mix"
        },
        {
          "productID": 6,
          "unitPrice": 25,
          "unitsInStock": 120,
          "name": "Grandma's Boysenberry Spread"
        },
        {
          "productID": 7,
          "unitPrice": 30,
          "unitsInStock": 15,
          "name": "Uncle Bob's Organic Dried Pears"
        },
        {
          "productID": 8,
          "unitPrice": 40,
          "unitsInStock": 6,
          "name": "Northwoods Cranberry Sauce"
        },
        {
          "productID": 9,
          "unitPrice": 97,
          "unitsInStock": 29,
          "name": "Mishi Kobe Niku"
        },
        {
          "productID": 10,
          "unitPrice": 31,
          "unitsInStock": 31,
          "name": "Ikura"
        },
        {
          "productID": 2,
          "unitPrice": 19,
          "unitsInStock": 17,
          "name": "Chang"
        },
        {
          "productID": 3,
          "unitPrice": 10,
          "unitsInStock": 13,
          "name": "Aniseed Syrup"
        },
        {
          "productID": 11,
          "unitPrice": 21,
          "unitsInStock": 22,
          "name": "Queso Cabrales"
        },
        {
          "productID": 12,
          "unitPrice": 38,
          "unitsInStock": 86,
          "name": "Queso Manchego La Pastora"
        },
        {
          "productID": 13,
          "unitPrice": 6,
          "unitsInStock": 24,
          "name": "Konbu"
        },
        {
          "productID": 14,
          "unitPrice": 23.25,
          "unitsInStock": 35,
          "name": "Tofu"
        },
        {
          "productID": 15,
          "unitPrice": 15.5,
          "unitsInStock": 39,
          "name": "Genen Shouyu"
        },
        {
          "productID": 1,
          "unitPrice": 18,
          "unitsInStock": 39,
          "name": "Chai"
        },
        {
          "productID": 16,
          "unitPrice": 17.45,
          "unitsInStock": 29,
          "name": "Pavlova"
        },
        {
          "productID": 17,
          "unitPrice": 39,
          "unitsInStock": 0,
          "name": "Alice Mutton"
        },
        {
          "productID": 18,
          "unitPrice": 62.5,
          "unitsInStock": 42,
          "name": "Carnarvon Tigers"
        },
        {
          "productID": 19,
          "unitPrice": 9.2,
          "unitsInStock": 25,
          "name": "Teatime Chocolate Biscuits"
        },
        {
          "productID": 20,
          "unitPrice": 81,
          "unitsInStock": 40,
          "name": "Sir Rodney's Marmalade"
        },
        {
          "productID": 24,
          "unitPrice": 4.5,
          "unitsInStock": 20,
          "name": "Guaraná Fantástica"
        },
        {
          "productID": 25,
          "unitPrice": 14,
          "unitsInStock": 76,
          "name": "NuNuCa Nuß-Nougat-Creme"
        },
        {
          "productID": 26,
          "unitPrice": 31.23,
          "unitsInStock": 15,
          "name": "Gumbär Gummibärchen"
        },
        {
          "productID": 27,
          "unitPrice": 43.9,
          "unitsInStock": 49,
          "name": "Schoggi Schokolade"
        },
        {
          "productID": 28,
          "unitPrice": 45.6,
          "unitsInStock": 26,
          "name": "Rössle Sauerkraut"
        },
        {
          "productID": 29,
          "unitPrice": 123.79,
          "unitsInStock": 0,
          "name": "Thüringer Rostbratwurst"
        }
      ]
    },
    "filters": []
  };
  const visualization = {
    "label": "Table",
    "name": "table",
    "type": "table"
  }
describe("<QueryResultCard />", () => {
    // Getting some error while mounting
  beforeEach(() => {
    cy.mount(QueryResultCard, { propsData: { card, visualization }, components: {AppEcharts, AppTable}, mixins: [GlobalMixin]})
  })
})