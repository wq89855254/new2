import * as moment from "moment";
import * as axios from "axios";
import { TimeMinuteSelect } from '../../../components/share';
import { SectionTitle, ClassifyTitle } from '../common';
import { commonMethod } from '../../../mixins';

export default {
  name: "near",
  components: { TimeMinuteSelect, SectionTitle, ClassifyTitle },
  mixins: [ commonMethod ],
  data() {
    return {
      currActiveElementName: 'QPF',
      elements: [
        {
          name: 'QPF',
        }
      ],
      date: moment(),
      hour: '00',
      minute: '00',
      hourList: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
      minuteList: ['00', '10', '20', '30', '40', '50']
    };
  },
  computed: {},

  mounted() {
    this.onChange();
  },

  beforeDestroy() {},

  methods: {
    onChange() {
      const startTime = this.date.clone().startOf('day').add(+this.hour, 'hours').add(+this.minute, 'minutes');
      this.$emit('change', {
        startTime,
        elementName: this.currActiveElementName
      });

    },
    onClickElement(name) {
      if (this.currActiveElementName === name) return;
      this.currActiveElementName = name;
      this.onChange();
    },

    initTime() {
      const timeInfo = this.mx_getElementStartTime('shortandnowcastforecast:shorttimeforecast:预报:QPF:全国');
      timeInfo.promise.then(time => {
        console.log(time);
      })
    }
  }
};
