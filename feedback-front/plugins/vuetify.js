import Vue from "vue";
import Vuetify, {
  VApp, // required
  VNavigationDrawer,
  VFooter,
  VToolbar,
} from "vuetify/lib";
import { Ripple } from "vuetify/lib/directives";
import "vuetify/src/stylus/app.styl";

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VToolbar,
  },
  directives: {
    Ripple,
  },
});
