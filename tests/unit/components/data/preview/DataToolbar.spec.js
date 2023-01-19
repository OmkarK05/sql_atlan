import DataToolbar from "@/components/data/preview/DataToolbar.vue";
import { mount } from "@vue/test-utils";
import { localVue, vuetify, createStore } from "../../../../main.js";
import data from "../../../../mock-data/data";

describe("Data Toolbar", () => {
  let wrapper;
  let store = createStore(["data"]);
  store.commit("data/SET_DATA", data.dataSet);

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
