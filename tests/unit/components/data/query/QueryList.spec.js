import QueryList from "@/components/data/query/QueryList.vue";
import { mount } from "@vue/test-utils";
import { localVue, vuetify } from "../../../../main.js";

const propsData = {
  queries: [
    {
      query: "SELECT * FROM orders Where country='USA'",
      id: 1,
      title: "Orders from USA",
      data_id: 10,
    },
    {
      query: "SELECT * FROM orders Where quantity > 50",
      id: 2,
      title: "Quantity greater than 50",
      data_id: 10,
    },
    {
      query: "SELECT * FROM orders Where unitPrice > 100",
      id: 3,
      title: "Unit Price greater than 100",
      data_id: 10,
    },
  ],
};
describe("Data Toolbar", () => {
  let wrapper;

  wrapper = mount(QueryList, {
    propsData,
    localVue,
    vuetify,
  });

  it("checks if title is rendered", () => {
    expect(wrapper.find("#query-list-title").text()).toBe("Suggested Queries");
  });

  it("checks header is rendered", () => {
    propsData["queries"].forEach((query) => {
      expect(wrapper.find(`#query-${query["id"]}`).exists()).toBe(true);
    });
  });
});
