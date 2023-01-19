import QueryInput from "@/components/data/query/QueryInput.vue";
import { mount } from "@vue/test-utils";
import { localVue, vuetify } from "../../../../main.js";

describe("Data Toolbar", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(QueryInput, {
      localVue,
      vuetify,
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("checks if text area is rendered", () => {
    expect(wrapper.find("#query-text-area-input").exists()).toBe(true);
  });

  it("checks if text area has placeholder", () => {
    expect(
      wrapper.find("#query-text-area-input").attributes().placeholder
    ).toBe("Enter your query here");
  });

  it("checks if run query button is rendered", () => {
    expect(wrapper.find("#query-input-run-query-button").text()).toContain(
      "Run Query"
    );
  });
});
