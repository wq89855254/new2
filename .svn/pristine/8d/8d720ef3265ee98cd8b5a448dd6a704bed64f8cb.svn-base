import * as moment from "moment";
export default {

  // 是否关联
  isConcat: true,

  // 当前选中的要素名称
  currActiveElement: '雷达回波',

  // 客观产品
  products: [
    {
      id: "rainAll",
      name: "强对流综合",
      elements: [
        {
          parentId: 'rainAll',  //父id
          name: "多模式集成组合反射率",
          currStartDate: '',
          startHourList: ['08', '20']
        },
        {
          parentId: 'rainAll',
          name: "35dbz回波邻近概率",
          currStartDate: '',
          startHourList: ['08', '20']
        },
        {
          parentId: 'rainAll',
          name: "风暴6小时预报",
          currStartDate: '',
          startHourList: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
        },
        {
          parentId: 'rainAll',
          name: "风暴追踪外推",
          currStartDate: '',
          startHourList: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
        }
      ]
    },
    {
      id: "rain",
      name: "强降水",
      elements: [
        {
          parentId: 'rain',
          name: "短历时强降水",
          currStartDate: '',
          startHourList: ['02', '05','08','11', '14','17', '20', '23'],
        },
        {
          parentId: 'rain',
          name: "短时强降水邻近概率(>=20mm/h)",
          currStartDate: '',
          startHourList: ['08', '20']
        },
        {
          parentId: 'rain',
          name: "短时强降水邻近概率(>=50mm/h)",
          currStartDate: '',
          startHourList: ['08', '20']
        },
        {
          parentId: 'rain',
          name: "暴雨风险预警",
          currStartDate: '',
          startHourList: ['02', '05','08','11', '14','17', '20', '23']
        }
      ]
    },
    {
      id: "modeProduct",
      name: "模式产品",
      elements: [
        {
          parentId: 'modeProduct',
          name: "雷达回波"
        },
        {
          parentId: 'modeProduct',
          name: "1小时降水量"
        },
        {
          parentId: 'modeProduct',
          name: "3小时降水量"
        },
        {
          parentId: 'modeProduct',
          name: "6小时降水量"
        },
        {
          parentId: 'modeProduct',
          name: "CAPE"
        },
        {
          parentId: 'modeProduct',
          name: "CIN"
        },
        {
          parentId: 'modeProduct',
          name: "红外云图"
        },
        {
          parentId: 'modeProduct',
          name: "水汽云图"
        }
      ]
    },
    {
      id: "analyze",
      name: "中分析产品(预报)",
      elements: [
        {
          parentId: 'analyze',
          name: "通用：BLI、925h湿度和风场、500高度",
          currStartDate: '',
          startHourList: ['08', '20']
        },
        {
          parentId: 'analyze',
          name: "通用：Cape、850湿度和风场、500高度",
          currStartDate: '',
          startHourList: ['08', '20']
        },
        {
          parentId: 'analyze',
          name: "强降水：K、0-6km风切、小时雨量",
          currStartDate: '',
          startHourList: ['08', '20']
        },
        {
          parentId: 'analyze',
          name: "风雹1：0-3KMSHR、最大垂直速度和回波",
          currStartDate: '',
          startHourList: ['08', '20']
        },
        {
          parentId: 'analyze',
          name: "风雹2：2M温度、SWEAT、0-3km风切",
          currStartDate: '',
          startHourList: ['08', '20']
        },
        {
          parentId: 'analyze',
          name: "龙卷：UH指数+925急流+925相对湿度",
          currStartDate: '',
          startHourList: ['08', '20']
        },
        {
          parentId: 'analyze',
          name: "云图：IR1+850风场+500高度场",
          currStartDate: '',
          startHourList: ['08', '20']
        }
      ]
    }
  ],


  // 中分析产品(自动站客观分析)
  analyzeProducts: [
    {
      name: "海平面气压、温度、风场"
    },
    {
      name: "海平面气压、露点、风场"
    },
    {
      name: "温度、流场"
    },
    {
      name: "露点、流场"
    },
    {
      name: "30分钟变温、风场"
    },
    {
      name: "60分钟变温、风场"
    },
    {
      name: "30分钟变露点、风场"
    },
    {
      name: "60分钟变露点、风场"
    },
    {
      name: "60分钟变压、风场"
    },
    {
      name: "Thetase、风场、海平面气压"
    },
    {
      name: "Thetase、流线"
    },
    {
      name: "60分钟变Thetase、风场"
    }
  ],

  // 实况时间
  // actDate: moment(),
  // actHour: moment().minutes() >= 30 ? moment().format('HH') : moment().subtract(1, 'hours').format('HH'),
  // actHourList: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
  
  // 模式时间（即预报时间）
  fcstDate: '',
  fcstHour: '',
  fcstHourList: [],

  // 中分析产品(自动站客观分析)的时间
  centerDate: '',
  centerHour: '',
  centerMinute: '',
  centerHourList: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
  centerMinuteList: ['00', '10', '20', '30', '40', '50'],


  // 模式产品---多模式
  currModeNavValue: 'Grapes',
  multiModelCurrStartDate: '',  //多模式起报时间
  modeNavs: [
    {
      name: 'Grapes',
      value: 'Grapes',
      startHourList: ['02', '05','08','11', '14','17', '20', '23'],
      timeName: '雷达回波_GRAPES',
      currStartDate: '',
    },
    {
      name: '上海9KM',
      value: '上海',
      startHourList: ['08', '20'],
      timeName: '雷达回波_SMB',
      currStartDate: '',
    },
    {
      name: '上海3KM',
      value: '上海3KM',
      startHourList: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
      timeName: '雷达回波_SMB3KM',
      currStartDate: '',
    },
    {
      name: 'grapesCR',
      value: '广东',
      startHourList: ['02', '08', '14', '20'],
      timeName: '雷达回波_GRAPESCR',
      currStartDate: '',
    },
    {
      name: '多模式集成',
      value: '多模式',
      startHourList: ['08', '20'],
      timeName: '雷达回波_GRAPES',
      currStartDate: '',
    },
    {
      name: '北京9KM',
      value: '北京',
      startHourList: ['08', '20'],
      timeName: '雷达回波_BJ',
      currStartDate: '',
    },
    {
      name: '广州9KM',
      value: '广州',
      startHourList: ['02', '08', '14', '20'],
      timeName: '雷达回波_GZ',
      currStartDate: '',
    },
    {
      name: '广州3KM',
      value: '广州3KM',
      startHourList: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
      timeName: '雷达回波_GZ3KM',
      currStartDate: '',
    },
    {
      name: '北京3KM',
      value: '北京3KM',
      startHourList: ['02', '05', '08', '11', '14', '17', '20', '23'],
      timeName: '雷达回波_BJ3KM',
      currStartDate: '',
    },
  ],


  // 预报服务
  fcstServes: [
    {
      id: 'latent',
      name: '潜势预报',
      dataName: '潜势预报',
      currDate: '',
      currHour: '06',
      startDates: [],  //格式：YYMMDDHHmm
      startHours: ['06', '18'],
      active: false,
      eleName: '强天气潜势预报:qsyb'
    },
    {
      id: 'warning',
      name: '预警',
      dataName: '强天气预警',
      currDate: '',
      startDates: [],  //格式：YYMMDDHHmm
      active: false,
      eleName: '强天气预警:qtqyj'
    },
    {
      id: 'short',
      name: '短时预报',
      dataName: '强天气短时预报',
      currDate: '',
      currElement: 'fb',
      startDates: [],  //格式：YYMMDDHHmm
      elements: [
        {
          id: 'fb',
          name: '风雹',
          eleName: '强天气短时预报:qtqdsyb:fb'
        },{
          id: 'qjs',
          name: '强降水',
          eleName: '强天气短时预报:qtqdsyb:qjs'
        }
      ],
      active: false,
    }
  ]
}


