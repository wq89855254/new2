import moment from 'moment'
// import TimeSelect from "../"
import { ToolBtn } from '../../base';
export default {
    name: 'side-bar',
    components: { ToolBtn },
    props: {
        radar: {
            type: Boolean,
            default: false
        },
        situation: {
            type: Boolean,
            default: false
        },
        forecast: {
            type: Boolean,
            default: false
        },
        warning: {
            type: Boolean,
            default: false
        },
        hourList: {
            type: Array,
        },
        hour: {
            // required: true,
        },
        date: {
            validator(value) {
                return moment.isMoment(value) || value === '';
            }
        }
    },
    data() {
        return {
            activeIndex: null,
            interval:'24h',
            box_switch: false,
            currDate:null,
            currHour:this.hour,
            // zhuangtai:5,
        }
    },
    mounted(){
        this.currDate = this.date ? this.date.clone() : null;
    },
    methods: {
        select(i) {
            if (i == this.activeIndex) {
                this.activeIndex = null;
                this.box_switch = false
                if(i==2){
                    this.$emit('loginFn')
                }else{
                    this.$emit('dieFn')
                }
                // this.zhuangtai=5
            } else {
                this.activeIndex = i
                // this.zhuangtai=i
                if(i==2){
                    this.$emit('loginFn',this.interval,moment(this.currDate).add(this.currHour,'hour').format('YYYY-MM-DD HH:mm:ss'))
                }else if(i==1){
                    this.$emit('dieFn',this.interval,moment(this.currDate).add(this.currHour,'hour').format('YYYY-MM-DD HH:mm:ss'))
                }
                // console.log(this.radar)
                if (!this.warning) {
                    this.box_switch = true
                }
            }
        },
        changDate(i){
            const time = moment(this.currDate.format('YYYYMMDD'), 'YYYYMMDD').add(+this.currHour, 'hours');
            if (i === 1) {
              time.add(parseInt(this.interval), 'hours');
            }else {
              time.subtract(parseInt(this.interval), 'hours');
            }
            this.currDate = time;
            this.currHour = time.format('HH');
            if(this.activeIndex==2){
                this.$emit('loginFn',this.interval,moment(this.currDate).format('YYYY-MM-DD HH:mm:ss'))
            }else if(this.activeIndex==1){
                this.$emit('dieFn',this.interval,moment(this.currDate).format('YYYY-MM-DD HH:mm:ss'))
            }
            // this.$emit('dieFn',this.interval,moment(this.currDate).format('YYYY-MM-DD HH:mm:ss'))
        },
        changeHour(){
            if(this.activeIndex==2){
                this.$emit('loginFn',this.interval,moment(this.currDate).add(this.currHour,'hour').format('YYYY-MM-DD HH:mm:ss'))
            }else if(this.activeIndex==1){
                this.$emit('dieFn',this.interval,moment(this.currDate).add(this.currHour,'hour').format('YYYY-MM-DD HH:mm:ss'))
            }
            
        }
    },
    watch:{
        date(val) {
            this.currDate = val ? val : null;
        },
        hour(val) {
            this.currHour = val ? val : null;
        },
    },
    computed:{
    }
}
