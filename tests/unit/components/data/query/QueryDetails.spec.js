import QueryDetails from "@/components/data/query/QueryDetails.vue";
import { mount } from "@vue/test-utils";
import { localVue, vuetify } from "../../../../main.js";

const propsData = {
  query: {
    query: "SELECT * FROM orders Where country='USA'",
    id: 1,
    title: "Orders from USA",
    data_id: 10,
  },
  selectedQuery: {
    query: "SELECT * FROM orders Where country='USA'",
    id: 1,
    title: "Orders from USA",
    data_id: 10,
  },
};
describe("Data Toolbar", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(QueryDetails, {
      propsData,
      localVue,
      vuetify,
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("checks if mounted", () => {
    expect(wrapper.find("#query-details-block").exists()).toBe(true);
  });

  it("checks header is rendered", () => {
    expect(wrapper.find("#query-details-header-title").text()).toBe(
      "Orders from USA"
    );
  });

  it("checks query is rendered", () => {
    expect(wrapper.find("#query-details-query").text()).toBe(
      "SELECT * FROM orders Where country='USA'"
    );
  });

  it("checks if active class is present", () => {
    expect(wrapper.find("#query-details-block").classes()).toContain(
      "--active"
    );
  });
});
