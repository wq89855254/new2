import * as moment from "moment";
import * as axios from "axios";
import { SectionTitle } from "../common";
import datas from './datas';
import { TimeSelect } from '../../../components/share';
import { commonMethod } from '../../../mixins';

export default {
  name: "fcst",
  components: { SectionTitle, TimeSelect },
  mixins: [ commonMethod ],
  data() {
    return {
      ...datas,
      date: moment(),
      hour: '02',
      hourList: ['02', '05', '08', '11', '14', '17', '20', '23'],
      currElementId: 'objectives_1'
    };
  },
  computed: {},

  mounted() {
    this.initTime();
  },

  beforeDestroy() {},

  methods: {
    onChange() {
      let eleName, type;
      this.fcsts.forEach(item => {
        item.elements.forEach(el => {
          if (el.id === this.currElementId) {
            eleName = el.eleName;
            type = item.id;
            return;
          }
        })
      });
      this.$emit('change', {
        startTime: this.date.clone().startOf('day').add(+this.hour, 'hours'),
        eleName,
        type
      })
    },
    onClickElement(id) {
      if (this.currElementId === id) return;
      this.currElementId = id;
      this.onChange();
    },
    initTime() {
      const proRequest = this.mx_getElementStartTime('shortandnowcastforecast:objectiveforecast:雷暴');
      proRequest.promise.then(time => {
        if (time) {
          this.date = moment(time, 'YYYY-MM-DD HH:mm:ss');
          this.hour = this.date.format('HH');
        }
        this.onChange();
      })
    }
  }
};
