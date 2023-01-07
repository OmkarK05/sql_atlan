import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: "#6C00FF",
                secondary: "#3C79F5",
                tertiary: "#F2DEBA"
            }
        }
    }
});
