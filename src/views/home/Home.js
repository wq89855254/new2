import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import { createNamespacedHelpers } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      locale: zhCN,
      menus: [
        {
          name: '综合',
          path: '/synthesis',
          id: 'synthesis'
        },
        {
          name: '监测',
          path: '/monitor',
          id: 'monitor'
        },
        {
          name: '诊断',
          path: '/diagnosis',
          id: 'diagnosis'
        },
        {
          name: '短临',
          path: '/shortimpending',
          id: 'shortimpending'
        },
        {
          name: '短期',
          path: '/shorttime',
          id: 'shorttime'
        },
        {
          name: '检验',
          path: '/verify',
          id: 'verify'
        },
        {
          name: '归档',
          path: '/archive',
          id: 'archive'
        },
        {
          name: '管理',
          path: '/manage',
          id: 'manage'
        }
      ]
    }
  },
  components: {},
  mounted() {
    // this.menus.forEach(el => {
    //   ['', '_check', '_hover'].forEach(prefix => {
    //     const img = new Image();
    //     img.src = '../../assets/images/header/'+ el.id + prefix +'.png';
    //   })
    // })
  },
};
