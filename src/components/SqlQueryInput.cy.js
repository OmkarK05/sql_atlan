import SqlQueryInput from "./SqlQueryInput.vue";

describe("<SqlQueryInput />", () => {
  beforeEach(() => {
    it("renders", () => {
      // see: https://on.cypress.io/mounting-vue
      cy.mount(SqlQueryInput);
    });
  });

  it("check if text input has rendered", () => {});
});
