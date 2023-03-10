export const globalMixin = {
  methods: {
    deepCopy: function (payload) {
      const data = JSON.stringify(payload);
      return JSON.parse(data);
    },
    getUUID: function () {
      var d = new Date().getTime();
      var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      );
      return uuid;
    },
    emitEvent: function (action, payload) {
      this.$emit("event-emitted", action, payload);
    },
  },
};
