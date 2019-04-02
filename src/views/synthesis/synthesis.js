import Maps from "./maps/Maps.vue";
import MenuPanel from "./menu-panel/MenuPanel.vue";
import LayerLegend from "./layer-legend/LayerLegend.vue";
import LayerManage from "./layer-manage/LayerManage.vue";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers(
  "synthesis"
);

export default {
  name: "synthesis",
  components: { Maps, MenuPanel, LayerLegend, LayerManage },
  data() {
    return {};
  },
  computed: {},
  mounted() {},

  methods: {}
};
