import SqlQueryInput from "../query-input/SqlQueryInput.vue";

const queries =  [
  {
    id: 1,
    query: "SELECT city, contactName, country FROM customers",
    label: "Get customers",
    dataName: "customers.json",
    columns: {
      dimensions: ["city", "customerID", "contactName", "country"],
      measures: [],
    },
  },
  {
    id: 2,
    query:
      "SELECT country, region, city, quantity, unitPrice  FROM orders",
    label: "Get Orders",
    dataName: "orders.json",
    columns: {
      dimensions: ["country", "region", "city"],
      measures: [
        "quantity",
        "unitPrice",
        "discount",
        "freight",
        "orderID",
      ],
    },
  },
  {
    id: 3,
    query: "SELECT name, unitsInStock, unitPrice FROM products",
    label: "Get Products",
    dataName: "products.json",
    columns: {
      dimensions: ["productID", "name"],
      measures: ["unitsInStock", "unitPrice"],
    },
  },
];
describe("<SqlQueryInput />", () => {
  beforeEach(() => {
    cy.mount(SqlQueryInput, { propsData: { queries }})
  })
  it("Check if search bar is rendered with Search placeholder", () => {
    let searchBar = cy.get("#query-text-area-input");
    searchBar.should("have.attr", "placeholder", "Enter your query here");
  })

  it("Check if run query button is rendered", () => {
    let searchBar = cy.get("#query-input-run-query-button");
    searchBar.should("include.text", "Run Query");
  })

  describe('When user clicks on text input', () => {
    let optionsContainer
    beforeEach(() => {
      cy.get("#query-text-area-input").click();
      optionsContainer = cy.get("#query-input-options-container");
    })

    it("Checks if recommendations are opened on click", () => {
      optionsContainer.should('be.visible')
    })

    it("Checks if recommendations are rendered", () => {
      queries.forEach((query) => {
        cy.get(`#recommendation-${query['id']}`).should('include.text', query['label'])
      })
    })
  })

})