import * as moment from "moment";
import * as axios from "axios";
import options from '../../assets/config/shortimpending_config';

export default {
  name: "shortimpending",
  components: {},
  data() {
    return {
      options
    };
  },
  computed: {},

  mounted() {
    console.log(this.options);
  },

  beforeDestroy() {},

  methods: {}
};
