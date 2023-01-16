import DataTable from "@/components/data/preview/DataTable.vue";
import { mount } from "@vue/test-utils";
import { localVue, vuetify } from "../../../../main.js";

let table = {
  headers: [
    { name: "city", column_id: 6, label: "city", data_type: "text" },
    { name: "city", column_id: 7, label: "city", data_type: "text" },
    { name: "country", column_id: 8, label: "country", data_type: "text" },
    { name: "orderID", column_id: 1, label: "orderID", data_type: "numeric" },
    { name: "freight", column_id: 2, label: "freight", data_type: "numeric" },
    {
      name: "unitPrice",
      column_id: 3,
      label: "unitPrice",
      data_type: "numeric",
    },
    { name: "quantity", column_id: 4, label: "quantity", data_type: "numeric" },
    { name: "discount", column_id: 5, label: "discount", data_type: "numeric" },
  ],
  body: [
    {
      cells: [
        { name: "city", value: "Lander", styles: {} },
        { name: "city", value: "Lander", styles: {} },
        { name: "country", value: "USA", styles: {} },
        { name: "orderID", value: 10271, styles: {} },
        { name: "freight", value: 4.54, styles: {} },
        { name: "unitPrice", value: 2, styles: {} },
        { name: "quantity", value: 24, styles: {} },
        { name: "discount", value: 0, styles: {} },
      ],
    },
    {
      cells: [
        { name: "city", value: "Portland", styles: {} },
        { name: "city", value: "Portland", styles: {} },
        { name: "country", value: "USA", styles: {} },
        { name: "orderID", value: 10317, styles: {} },
        { name: "freight", value: 12.69, styles: {} },
        { name: "unitPrice", value: 14.4, styles: {} },
        { name: "quantity", value: 20, styles: {} },
        { name: "discount", value: 0, styles: {} },
      ],
    },
  ],
  uuid: "78a7dd77-fb5d-411f-99f4-d143b599e5f8",
};
describe("Data Toolbar", () => {
  let wrapper;

  wrapper = mount(DataTable, {
    propsData: {
      table,
    },
    localVue,
    vuetify,
  });

  it("checks if table is mounted", () => {
    expect(wrapper.find("#data-table").exists()).toBe(true);
  });

  it("checks if all headers are mounted", () => {
    table["headers"].forEach((header) => {
      let headerElement = wrapper.find(`#table-header-${header["label"]}`);
      expect(headerElement.text()).toContain(header["name"]);
    });
  });

  it("checks if table body two rows are rendered", () => {
    expect(wrapper.find("#table-body").findAll("tr").length).toEqual(2);
  });

  it("checks if table body row data is rendered", () => {
    table["body"][0]["cells"].forEach((cell, cellIndex) => {
      expect(
        wrapper.find(`#table-body-cell-${cell["name"]}-${cellIndex}`).text()
      ).toBe(cell["value"].toString());
    });
  });
});
