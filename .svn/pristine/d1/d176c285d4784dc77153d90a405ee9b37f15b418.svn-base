import { ToolBtn, ConditionLayout } from '../../base';

export default {
  name: "level-select",
  components: { ConditionLayout, ToolBtn },
  props: {
    level: {
      validator(value) {
        return /^\d{3,}$/.test(value) || value === '';
      }
    },
    levelList: {
      validator(value) {
        if (Array.isArray(value)) {
          if (value.length === 0) return true;
          return value.every(el => {
            if (typeof el === "string") {
              return /^\d{3,}$/.test(el);
            }
            return false;
          });
        }
        return false;
      }
    }
  },
  data() {
    return {
      currLevel: this.level,
      index: 0,
      length: this.levelList.length
    };
  },
  watch: {
    level(val) {
      this.index = this.levelList.findIndex(el => el === val);
    },
    levelList(val) {
      this.length = val.length;
    }
  },
  updated() {
    this.currLevel = this.level;
  },
  mounted() {

    const levelIndex = this.levelList.findIndex(el => el === this.level);
    if (levelIndex === -1) {
      this.index = 0;
      if ( this.levelList.length) {
        this.currLevel = this.levelList[0];
        this.$emit("update:level", this.currLevel);
        this.$emit('level-change');
      }
    } else {
      this.index = levelIndex;
    }
  },
  methods: {
    onLevelChange() {
      this.$emit("update:level", this.currLevel);
      this.$emit('level-change');
    },
    onTuningLevel(sign) {
      if (sign === 1) {
        this.index++;
      } else {
        this.index--;
      }
      if (this.index < 0) {
        this.index = this.length - 1;
      } else if (this.index >= this.length) {
        this.index = 0;
      }
      this.currLevel = this.levelList[this.index];
      this.$emit("update:level", this.currLevel);
      this.$emit('level-change');
    }
  }
};
