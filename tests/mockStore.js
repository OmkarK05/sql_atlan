import { data } from "@/store/components/data";

const moduleMapping = {
  data: data,
};

function generateMockFunctions(actions = {}) {
  let mockedFunctions = {};
  Object.keys(actions).forEach((funKey) => {
    mockedFunctions[funKey] = jest.fn();
  });
  return mockedFunctions;
}

export default {
  getMockStoreModule: function (module = "") {
    if (!moduleMapping[module]) return { namespaced: true };
    return {
      state: { ...(moduleMapping[module]["state"] || {}) },
      actions: {
        ...(generateMockFunctions(moduleMapping[module]["actions"]) || {}),
      },
      mutations: { ...(moduleMapping[module]["mutations"] || {}) },
      getters: moduleMapping[module]["getters"] || {},
      namespaced: true,
    };
  },
};
