import DataToolbar from "@/components/data/preview/DataToolbar.vue";
import { mount } from "@vue/test-utils";
import { localVue, vuetify, createStore } from "../../../../main.js";

const dataset = {
  name: "orders",
  label: "Orders",
  id: 10,
  columns: {
    measures: [
      {
        name: "orderID",
        column_id: 1,
        label: "orderID",
        data_type: "numeric",
      },
      {
        name: "freight",
        column_id: 2,
        label: "freight",
        data_type: "numeric",
      },
      {
        name: "unitPrice",
        column_id: 3,
        label: "unitPrice",
        data_type: "numeric",
      },
      {
        name: "quantity",
        column_id: 4,
        label: "quantity",
        data_type: "numeric",
      },
      {
        name: "discount",
        column_id: 5,
        label: "discount",
        data_type: "numeric",
      },
    ],
    dimensions: [
      {
        name: "city",
        column_id: 6,
        label: "city",
        data_type: "text",
      },
      {
        name: "city",
        column_id: 7,
        label: "city",
        data_type: "text",
      },
      {
        name: "country",
        column_id: 8,
        label: "country",
        data_type: "text",
      },
    ],
    date: [],
  },
  format: "json",
  description: "This table contains data related to food orders",
  row_count: 830,
  column_count: 8,
  created: "Sat Jan 7 2023 10:38:20",
  modified: "Tue Jan 10 2023 11:38:20",
  data_source: {
    name: "Sample Food Data",
    id: 1,
    source: "snowflake",
    owner: {
      name: "Omkar Kesarkhane",
      id: 2,
      email: "omkesarkhane@gmail.com",
    },
  },
};
describe("Data Toolbar", () => {
  let wrapper;
  let store = createStore(["data"]);
  store.commit("data/SET_DATA", dataset);

  beforeEach(() => {
    wrapper = mount(DataToolbar, {
      localVue,
      vuetify,
      store,
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("checks if table icon is rendered", () => {
    expect(wrapper.find("#data-toolbar-table-icon").exists()).toBe(true);
  });

  it("checks if table name is rendered", () => {
    expect(wrapper.find("#data-toolbar-table-name").text()).toBe("orders");
  });

  it("checks if table icon is mounted", () => {
    expect(wrapper.find("#data-toolbar-last-update-time").text()).toBe(
      "last updated on 10 January 2023 11:38:20"
    );
  });

  it("checks if table icon is mounted", () => {
    expect(wrapper.find("#data-toolbar-last-update-time").text()).toBe(
      "last updated on 10 January 2023 11:38:20"
    );
  });

  it("checks if data source  name and icon is rendered", () => {
    expect(wrapper.find("#data-toolbar-data-source").find("svg").exists()).toBe(
      true
    );
    expect(wrapper.find("#data-toolbar-data-source").text()).toBe("snowflake");
  });

  it("checks if data base name and icon is rendered", () => {
    expect(wrapper.find("#data-toolbar-data-base").find("svg").exists()).toBe(
      true
    );
    expect(wrapper.find("#data-toolbar-data-base").text()).toBe(
      "Sample Food Data"
    );
  });

  it("checks if rows count is rendered", () => {
    expect(wrapper.find("#data-row-count").text()).toBe("830 rows");
  });

  it("checks if column count is rendered", () => {
    expect(wrapper.find("#data-column-count").text()).toBe("8 columns");
  });
});
