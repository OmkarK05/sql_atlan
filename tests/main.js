import Vuetify from "vuetify";
import mockStore from "./mockStore";
import Vuex from "vuex";
import { GlobalMixin } from "@/mixins/globalMixin";

import { createLocalVue } from "@vue/test-utils";

const localVue = createLocalVue();
localVue.mixin(GlobalMixin);

localVue.use(Vuex);

const vuetify = new Vuetify();

const createStore = function (modules) {
  const dynamicModules = {};
  modules.forEach((module) => {
    dynamicModules[module] = mockStore.getMockStoreModule(module);
  });
  return new Vuex.Store({
    modules: dynamicModules,
  });
};

export { localVue, vuetify, createStore };
