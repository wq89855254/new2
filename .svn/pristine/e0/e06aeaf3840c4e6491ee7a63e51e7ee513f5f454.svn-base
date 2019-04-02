import { ConditionLayout } from "../../base";

export default {
  name: "area-select",
  components: { ConditionLayout },
  props: {
    area: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      currArea: this.area,
      areaList: [
        {
          label: "全国",
          value: "全国",
          disabled: false
        },
        {
          label: "华北",
          value: "华北",
          disabled: false
        },
        {
          label: "东北",
          value: "东北",
          disabled: false
        },
        {
          label: "华东",
          value: "华东",
          disabled: false
        },
        {
          label: "华南",
          value: "华南",
          disabled: false
        },
        {
          label: "西南",
          value: "西南",
          disabled: false
        },
        {
          label: "西北",
          value: "西北",
          disabled: false
        },
        {
          label: "青藏",
          value: "青藏",
          disabled: false
        },
        {
          label: "新疆",
          value: "新疆",
          disabled: false
        },
        {
          label: "近海",
          value: "近海",
          disabled: false
        }
      ]
    };
  },
  methods: {
    onAreaChange() {
      this.$emit("update:area", this.currArea);
      this.$emit("area-change");
    }
  }
};
