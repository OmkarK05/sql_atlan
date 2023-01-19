import ColumnList from "@/components/data/common/ColumnsList.vue";
import { mount } from "@vue/test-utils";
import { localVue, vuetify, createStore } from "../../../../main.js";
import data from "../../../../mock-data/data";

describe("Column List", () => {
  let wrapper;
  let store = createStore(["data"]);
  store.commit("data/SET_DATA", data.dataSet);

  wrapper = mount(ColumnList, {
    store,
    localVue,
  });

  it("Checks if columns title is rendered", () => {
    let columnsTitle = wrapper.find("#columns-title");
    expect(columnsTitle.text()).toBe("Columns");
  });

  it("Checks if dimensions section title is rendered", () => {
    let columnsTitle = wrapper.find("#column-section-dimensions-title");
    expect(columnsTitle.text()).toBe("Dimensions");
  });

  it("Checks if dimensions are rendered", () => {
    let columnsTitle = wrapper.find("#column-dimensions-city");
    expect(columnsTitle.text()).toContain("city");
  });
});
