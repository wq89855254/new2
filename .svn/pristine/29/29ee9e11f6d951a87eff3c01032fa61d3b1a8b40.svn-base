/*

值始终不变的数据应该放在别处（可放在element-option.js里），而不是放在vuex里，以后有时间在转移,但难度较大

解释:
名为 '***EleList' 的字段表示的是存储要素的配置列表， 其各字段含义如下：
    id: '',  要素id, 注意在任意要素中都要保证其id的唯一性
    name: '短时强降水',  //要素名
    interval: 1,  //时间间隔
    intervalType: 'hours',  //时间间隔de类型，值与moment保持一致,
    time: '',  //当前要素的时间，格式:YYYYMMDDHHmmss
    timeFormat: 'YYYYMMDDHH',  //time格式化
    checked: false,  //要素是否选中
    timeApiName: 'dataTime',  //请求时间接口的表示
    dataName: 'FY4闪电监测',  //请求时间时用到的参数
    outerDataNameChipKey: 'conditionValue',  //请求时间时用到的参数, 该值表示要素配置中的一个键(在提交mutation中生成的键)，用于取该键对应的值以拼接dataName的值
    innerDataNameChipKey: 'currAcc',  //请求时间时用到的参数, 当用outerDataNameChipKey没有获取到值时使用该字段
*/

export default () => {
  return {
    date: null, // 总控日期
    hour: "08", // 总控小时
    minute: "00", // 总控分
    isAutoRefresh: true, //是否自动刷新
    timer: null,  //用于存储定时器

    // 图层显隐控制对象（其中键表示要素配置中的id,即element-option.js中对象的键，值为布尔值，true表示隐藏图层，false表示显示图层）
    showHideLayerHash: {},

    // 当前选中的基本图层
    currBaseLayerId: "default",
    // 基本图层
    baseLayerList: [
      {
        id: "default"
      },
      {
        id: "xingzheng"
      },
      {
        id: "street"
      },
      {
        id: "terrain"
      },
      {
        id: "moon"
      },
      {
        id: "highway"
      },
      {
        id: "highterrain"
      }
    ],
    // 图层要素(边界线，行政点名称，河流等)
    layerElementList: [
      {
        id: "layer_ele_boundary",
        name: "边界线",
        checked: true
      },
      {
        id: "layer_ele_point_name",
        name: "行政点名称",
        checked: true
      },
      {
        id: "layer_ele_river",
        name: "河流",
        checked: true
      }
    ],

    // 强天气
    severeWeather: {
      currHour: 24,
      hourList: [24, 21, 12, 6, 3, 1],
      hourEleList: [
        {
          id: "sw_short_rain",
          name: "短时强降水",
          time: "",
          timeList: [],
          checked: false,
          dataName: "短时强降水",
          interval: 1,
          intervalType: "hours",
          timeFormat: "YYYYMMDDHH"
        },
        {
          id: "sw_thunder_wind",
          name: "雷暴大风",
          time: "",
          timeList: [],
          checked: false,
          dataName: "雷暴大风",
          interval: 3,
          intervalType: "hours",
          timeFormat: "YYYYMMDDHH"
        },
        {
          id: "sw_hail",
          name: "冰雹",
          checked: false,
          dataName: "冰雹",
          time: "",
          timeList: [],
          interval: 3,
          intervalType: "hours",
          timeFormat: "YYYYMMDDHH"
        },
        {
          id: "sw_lightning",
          name: "闪电",
          checked: false,
          dataName: "闪电",
          time: "",
          timeList: [],
          interval: 1,
          intervalType: "hours",
          timeFormat: "YYYYMMDDHH"
        }
      ],
      fy4EleList: [
        {
          id: "sw_fy4_lightning_watch",
          name: "FY4闪电监测",
          checked: false,
          dataName: "FY4闪电监测",
          outerDataNameChipKey: "conditionValue",
          innerDataNameChipKey: "currAcc",
          time: "",
          timeList: [],
          interval: 20,
          intervalType: "minutes",
          timeFormat: "YYYYMMDDHHmm",
          currAcc: "10min",
          accList: [
            {
              name: "10分钟",
              value: "10min"
            },
            {
              name: "1小时",
              value: "1hour"
            },
            {
              name: "3小时",
              value: "3hour"
            },
            {
              name: "6小时",
              value: "6hour"
            }
          ],
          currObserve: "LMIE",
          observeList: [
            {
              name: "闪电像素",
              value: "LMIE"
            },
            {
              name: "闪电像素簇",
              value: "LMIG"
            },
            {
              name: "闪电事件",
              value: "LMIF"
            }
          ]
        },
        {
          id: "sw_fy4_floor_lightning",
          name: "FY4和地基闪电定位综合数据",
          checked: false,
          dataName: "FY4和地基闪电定位混合数据",
          outerDataNameChipKey: "conditionValue",
          innerDataNameChipKey: "currAcc",
          time: "",
          timeList: [],
          interval: 10,
          intervalType: "minutes",
          timeFormat: "YYYYMMDDHHmm",
          currAcc: "10min",
          accList: [
            {
              name: "10分钟",
              value: "10min"
            },
            {
              name: "1小时",
              value: "1hour"
            },
            {
              name: "3小时",
              value: "3hour"
            },
            {
              name: "6小时",
              value: "6hour"
            }
          ],
          currObserve: "LMIE",
          observeList: [
            {
              name: "闪电像素",
              value: "LMIE"
            },
            {
              name: "闪电像素簇",
              value: "LMIG"
            },
            {
              name: "闪电事件",
              value: "LMIF"
            }
          ]
        }
      ],
      traceEleList: [
        {
          id: "sw_thunder_drive_floor_lightning",
          name: "雷暴追踪与外推(地闪数据)",
          checked: false,
          dataName: "雷暴追踪",
          time: "",
          timeList: [],
          interval: 10,
          intervalType: "minutes",
          timeFormat: "YYYYMMDDHHmm"
        },
        {
          id: "sw_thunder_drive_fy4",
          name: "雷暴追踪与外推(FY4闪电和地闪综合)",
          checked: false,
          dataName: "雷暴追踪FY4闪电和地闪综合",
          time: "",
          timeList: [],
          interval: 10,
          intervalType: "minutes",
          timeFormat: "YYYYMMDDHHmm"
        }
      ]
    },

    // 云图
    cloudPicture: {
      currTabName: "葵花卫星",
      tabList: [
        {
          typeId: "cp_kh_satellite",
          name: "葵花卫星",
          classifyList: [
            {
              name: "基础产品",
              eleList: [
                {
                  id: "cp_kh_satellite_base_infrared",
                  name: "红外",
                  time: "",
                  timeList: [],
                  checked: false,
                  dataName: "葵花红外",
                  interval: 10,
                  intervalType: "minutes",
                  timeFormat: "YYYYMMDDHHmm"
                },
                {
                  id: "cp_kh_satellite_base_water",
                  name: "水汽(350hPa)",
                  time: "",
                  timeList: [],
                  checked: false,
                  dataName: "葵花水汽350",
                  interval: 10,
                  intervalType: "minutes",
                  timeFormat: "YYYYMMDDHHmm"
                },
                {
                  id: "cp_kh_satellite_base_light",
                  name: "可见光",
                  time: "",
                  timeList: [],
                  checked: false,
                  dataName: "葵花可见光",
                  interval: 10,
                  intervalType: "minutes",
                  timeFormat: "YYYYMMDDHHmm"
                },
                {
                  id: "cp_kh_satellite_base_cloud_picture",
                  name: "伪彩云图",
                  time: "",
                  timeList: [],
                  checked: false,
                  dataName: "葵花伪彩云图",
                  interval: 10,
                  intervalType: "minutes",
                  timeFormat: "YYYYMMDDHHmm"
                }
              ]
            },
            {
              name: "演算产品",
              eleList: [
                {
                  id: "cp_kh_satellite_pro_infrared",
                  name: "云有效粒子半径",
                  time: "",
                  timeList: [],
                  checked: false,
                  interval: 10,
                  dataName: "葵花云有效粒子半径",
                  intervalType: "minutes",
                  timeFormat: "YYYYMMDDHHmm"
                },
                {
                  id: "cp_kh_satellite_pro_cloud_ice",
                  name: "云冰水含量",
                  time: "",
                  timeList: [],
                  checked: false,
                  dataName: "葵花云冰水含量",
                  interval: 10,
                  intervalType: "minutes",
                  timeFormat: "YYYYMMDDHHmm"
                },
                {
                  id: "cp_kh_satellite_pro_cloud",
                  name: "云液水含量",
                  time: "",
                  timeList: [],
                  checked: false,
                  dataName: "葵花云液水含量",
                  interval: 10,
                  intervalType: "minutes",
                  timeFormat: "YYYYMMDDHHmm"
                },
                {
                  id: "cp_kh_satellite_pro_ply",
                  name: "云光学厚度",
                  time: "",
                  timeList: [],
                  checked: false,
                  dataName: "葵花云光学厚度",
                  interval: 10,
                  intervalType: "minutes",
                  timeFormat: "YYYYMMDDHHmm"
                },
                {
                  id: "cp_kh_satellite_pro_pressure",
                  name: "云顶气压",
                  time: "",
                  timeList: [],
                  checked: false,
                  dataName: "葵花云顶气压",
                  interval: 10,
                  intervalType: "minutes",
                  timeFormat: "YYYYMMDDHHmm"
                },
                {
                  id: "cp_kh_satellite_cloud_top_temp",
                  name: "云顶温度，负80-60℃",
                  time: "",
                  timeList: [],
                  checked: false,
                  dataName: "葵花云顶温度",
                  interval: 10,
                  intervalType: "minutes",
                  timeFormat: "YYYYMMDDHHmm"
                },
                {
                  id: "cp_kh_satellite_cloud_top_height",
                  name: "云顶高度，0-18km",
                  time: "",
                  timeList: [],
                  checked: false,
                  dataName: "葵花云顶高度",
                  interval: 10,
                  intervalType: "minutes",
                  timeFormat: "YYYYMMDDHHmm"
                },
                {
                  id: "cp_kh_satellite_cloud_type",
                  name: "云类型",
                  time: "",
                  timeList: [],
                  checked: false,
                  dataName: "葵花云类型",
                  interval: 10,
                  intervalType: "minutes",
                  timeFormat: "YYYYMMDDHHmm"
                },
                {
                  id: "cp_kh_satellite_cloud_type_2",
                  name: "云类型II",
                  time: "",
                  timeList: [],
                  checked: false,
                  dataName: "葵花云类型II",
                  interval: 10,
                  intervalType: "minutes",
                  timeFormat: "YYYYMMDDHHmm"
                },
                {
                  id: "cp_kh_satellite_swipe",
                  name: "局地对流初生指数(SWIPE)",
                  time: "",
                  timeList: [],
                  checked: false,
                  dataName: "葵花局地对流初生指数",
                  interval: 10,
                  intervalType: "minutes",
                  timeFormat: "YYYYMMDDHHmm"
                }
              ]
            }
          ]
        },
        {
          typeId: "cp_fy_satellite",
          name: "FY卫星",
          eleList: [
            {
              id: "cp_fy_satellite_infrared",
              name: "红外",
              time: "",
              timeList: [],
              checked: false,
              dataName: "FY卫星",
              interval: 10,
              intervalType: "minutes",
              timeFormat: "YYYYMMDDHHmm"
            },
            {
              id: "cp_fy_satellite_water",
              name: "水汽",
              time: "",
              timeList: [],
              checked: false,
              dataName: "FY卫星",
              interval: 10,
              intervalType: "minutes",
              timeFormat: "YYYYMMDDHHmm"
            },
            {
              id: "cp_fy_satellite_light",
              name: "可见光",
              time: "",
              timeList: [],
              checked: false,
              dataName: "FY卫星",
              interval: 10,
              intervalType: "minutes",
              timeFormat: "YYYYMMDDHHmm"
            },
            {
              id: "cp_fy_satellite_mcs",
              name: "MCS",
              time: "",
              timeList: [],
              checked: false,
              dataName: "FY卫星",
              interval: 10,
              intervalType: "minutes",
              timeFormat: "YYYYMMDDHHmm"
            }
          ]
        },
        {
          typeId: "cp_fy4_satellite",
          name: "FY4卫星",
          eleList: [
            {
              id: "cp_fy4_satellite_infrared",
              name: "红外",
              time: "",
              timeList: [],
              checked: false,
              dataName: "FY4红外",
              interval: 15,
              intervalType: "minutes",
              timeFormat: "YYYYMMDDHHmm"
            },
            {
              id: "cp_fy4_satellite_water",
              name: "水汽",
              time: "",
              timeList: [],
              checked: false,
              dataName: "FY4水汽",
              interval: 15,
              intervalType: "minutes",
              timeFormat: "YYYYMMDDHHmm"
            },
            {
              id: "cp_fy4_satellite_light",
              name: "可见光",
              time: "",
              timeList: [],
              checked: false,
              dataName: "FY4可见光",
              interval: 15,
              intervalType: "minutes",
              timeFormat: "YYYYMMDDHHmm"
            },
            {
              id: "cp_fy4_satellite_convection_know",
              name: "对流识别",
              time: "",
              timeList: [],
              checked: false,
              dataName: "csair:convectionIdentification",
              interval: 15,
              intervalType: "minutes",
              timeFormat: "YYYYMMDDHHmm"
            },
            {
              id: "cp_fy4_satellite_convection_cloud",
              name: "对流云发展阶段判识",
              time: "",
              timeList: [],
              checked: false,
              dataName: "csair:convectiveStages",
              interval: 15,
              intervalType: "minutes",
              timeFormat: "YYYYMMDDHHmm"
            },
            {
              id: "cp_fy4_satellite_lightning_1h",
              name: "闪电密度1H",
              time: "",
              timeList: [],
              checked: false,
              dataName: "csair:light1h",
              interval: 1,
              intervalType: "hours",
              timeFormat: "YYYYMMDDHH"
            },
            {
              id: "cp_fy4_satellite_lightning_3h",
              name: "闪电密度3H",
              time: "",
              timeList: [],
              checked: false,
              dataName: "csair:light3h",
              interval: 3,
              intervalType: "hours",
              timeFormat: "YYYYMMDDHH"
            },
            {
              id: "cp_fy4_satellite_lightning_6h",
              name: "闪电密度6H",
              time: "",
              timeList: [],
              checked: false,
              dataName: "csair:light6h",
              interval: 6,
              intervalType: "hours",
              timeFormat: "YYYYMMDDHH"
            },
            {
              id: "cp_fy4_satellite_lightning_10m",
              name: "闪电密度10M",
              time: "",
              timeList: [],
              checked: false,
              dataName: "csair:light10m",
              interval: 10,
              intervalType: "minutes",
              timeFormat: "YYYYMMDDHH"
            },
            {
              id: "cp_fy4_satellite_convection",
              name: "多源对流强度",
              time: "",
              timeList: [],
              checked: false,
              dataName: "csair:conclassify",
              interval: 1,
              intervalType: "hours",
              timeFormat: "YYYYMMDDHH"
            },
            {
              id: "cp_fy4_satellite_convection_cape",
              name: "对流参数CAPE",
              time: "",
              timeList: [],
              checked: false,
              dataName: "csair:m3tom4cape",
              interval: 10,
              intervalType: "minutes",
              timeFormat: "YYYYMMDDHHmm",
              currAging: "006",
              agingList: ["006", "007"]
            },
            {
              id: "cp_fy4_satellite_convection_cin",
              name: "对流参数CIN",
              time: "",
              timeList: [],
              checked: false,
              dataName: "csair:m3tom4cin",
              interval: 10,
              intervalType: "minutes",
              timeFormat: "YYYYMMDDHHmm",
              currAging: "006",
              agingList: ["006", "007"]
            },
            {
              id: "cp_fy4_satellite_convection_t850",
              name: "对流参数T850",
              time: "",
              timeList: [],
              checked: false,
              dataName: "csair:m3tom4t850500",
              interval: 10,
              intervalType: "minutes",
              timeFormat: "YYYYMMDDHHmm",
              currAging: "006",
              agingList: ["006", "007"]
            },
            {
              id: "cp_fy4_satellite_convection_thse850",
              name: "对流参数THSE850",
              time: "",
              timeList: [],
              checked: false,
              dataName: "csair:m3tom4THSE850500",
              interval: 10,
              intervalType: "minutes",
              timeFormat: "YYYYMMDDHHmm",
              currAging: "006",
              agingList: ["006", "007"]
            },
            {
              id: "cp_fy4_satellite_convection_zht",
              name: "对流参数ZHT",
              time: "",
              timeList: [],
              checked: false,
              dataName: "csair:m3tom4zht",
              interval: 10,
              intervalType: "minutes",
              timeFormat: "YYYYMMDDHHmm",
              currAging: "006",
              agingList: ["006", "007"]
            },
            {
              id: "cp_fy4_satellite_short_thunder",
              name: "雷暴短时",
              time: "",
              timeList: [],
              checked: false,
              dataName: "csair:thunderP",
              interval: 1,
              intervalType: "hours",
              timeFormat: "YYYYMMDDHHmm",
              currAging: "012",
              agingList: ["006", "009", "012"]
            }
          ]
        }
      ]
    },

    // pup拼图
    pup: {
      pupEleList: [
        {
          id: "pp_group_ref",
          name: "组合反射率",
          time: "",
          timeList: [],
          checked: true,
          dataName: "全国雷达拼图",
          interval: 6,
          intervalType: "minutes",
          timeFormat: "YYYYMMDDHHmm"
        },
        {
          id: "pp_1h_rain",
          name: "1小时降水",
          time: "",
          timeList: [],
          checked: false,
          dataName: "全国雷达拼图",
          interval: 6,
          intervalType: "minutes",
          timeFormat: "YYYYMMDDHHmm"
        },
        {
          id: "pp_base_ref",
          name: "基本反射率",
          time: "",
          timeList: [],
          checked: false,
          dataName: "全国雷达拼图",
          interval: 6,
          intervalType: "minutes",
          timeFormat: "YYYYMMDDHHmm"
        },
        {
          id: "pp_vtl_water",
          name: "垂直液态水",
          time: "",
          timeList: [],
          checked: false,
          dataName: "全国雷达拼图",
          interval: 6,
          intervalType: "minutes",
          timeFormat: "YYYYMMDDHHmm"
        }
      ]
    },

    // 自动站
    station: {
      currHour: 24,
      hourList: [24, 21, 12, 6, 3, 1],
      hourEleList: [
        {
          id: "st_all_rain",
          name: "总降水",
          time: "",
          timeList: [],
          checked: false,
          dataName: "总降水",
          interval: 1,
          intervalType: "hours",
          timeFormat: "YYYYMMDDHH"
        }
      ],
      otherEleList: [
        {
          id: "st_large_rain_warn",
          name: "暴雨预警",
          time: "",
          timeList: [],
          checked: false,
          dataName: "暴雨预警",
          interval: 1,
          intervalType: "hours",
          timeFormat: "YYYYMMDDHH"
        },
        {
          id: "st_wind",
          name: "风",
          time: "",
          timeList: [],
          checked: false,
          dataName: "自动站风",
          interval: 1,
          intervalType: "hours",
          timeFormat: "YYYYMMDDHH"
        },
        {
          id: "st_temp",
          name: "温度",
          time: "",
          timeList: [],
          checked: false,
          dataName: "自动站温度",
          interval: 1,
          intervalType: "hours",
          timeFormat: "YYYYMMDDHH"
        },
        {
          id: "st_dew_point",
          name: "露点",
          time: "",
          timeList: [],
          checked: false,
          dataName: "自动站露点",
          interval: 1,
          intervalType: "hours",
          timeFormat: "YYYYMMDDHH"
        },
        {
          id: "st_pressure",
          name: "海平面气压",
          time: "",
          timeList: [],
          checked: false,
          dataName: "自动站温度",
          interval: 1,
          intervalType: "hours",
          timeFormat: "YYYYMMDDHH"
        },
        {
          id: "st_relative_temp",
          name: "假相当位温",
          time: "",
          timeList: [],
          checked: false,
          dataName: "自动站温度",
          interval: 1,
          intervalType: "hours",
          timeFormat: "YYYYMMDDHH"
        }
      ],
      warnEleList: [
        {
          id: "st_curr_warn_rain",
          name: "降水",
          time: "",
          timeList: [],
          checked: false,
          timeApiName: "dataTime",
          dataName: "自动站",
          interval: 10,
          intervalType: "minutes",
          timeFormat: "YYYYMMDDHHmm",
          currThreshold: 0.1,
          thresholdList: [0.1, 5, 10, 25, 50, 100, 150, 200]
        },
        {
          id: "st_curr_warn_max_wind",
          name: "极大风",
          time: "",
          timeList: [],
          checked: false,
          timeApiName: "dataTime",
          dataName: "自动站",
          interval: 10,
          intervalType: "minutes",
          timeFormat: "YYYYMMDDHHmm",
          currThreshold: 25,
          thresholdList: [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            30
          ]
        },
        {
          id: "st_curr_warn_gt_temp",
          name: "温度>",
          time: "",
          timeList: [],
          checked: false,
          timeApiName: "dataTime",
          dataName: "自动站",
          interval: 10,
          intervalType: "minutes",
          timeFormat: "YYYYMMDDHHmm",
          currThreshold: 35,
          thresholdList: [0, 5, 10, 15, 20, 25, 30, 35, 40]
        },
        {
          id: "st_curr_warn_lt_temp",
          name: "温度<",
          time: "",
          timeList: [],
          checked: false,
          timeApiName: "dataTime",
          dataName: "自动站",
          interval: 10,
          intervalType: "minutes",
          timeFormat: "YYYYMMDDHHmm",
          currThreshold: 35,
          thresholdList: [0, 5, 10, 15, 20, 25, 30, 35, 40]
        }
      ]
    },

    // SWAN拼图
    swan: {
      eleList: [
        {
          id: "sn_group_ref",
          groupName: "two_col",
          name: "组合反射率",
          time: "",
          timeList: [],
          checked: false,
          dataName: "SWAN组合反射率",
          interval: 6,
          intervalType: "minutes",
          timeFormat: "YYYYMMDDHHmm"
        },
        {
          id: "sn_echo_top",
          groupName: "two_col",
          name: "回波顶高",
          time: "",
          timeList: [],
          checked: false,
          dataName: "SWAN回波顶高",
          interval: 6,
          intervalType: "minutes",
          timeFormat: "YYYYMMDDHHmm"
        },
        {
          id: "sn_water",
          groupName: "two_col",
          name: "液态水含量",
          time: "",
          timeList: [],
          checked: false,
          dataName: "SWAN液态水含量",
          interval: 6,
          intervalType: "minutes",
          timeFormat: "YYYYMMDDHHmm"
        },
        {
          id: "sn_rain_estimate",
          groupName: "two_col",
          name: "定量降水估测",
          time: "",
          timeList: [],
          checked: false,
          dataName: "SWAN定量降水估测",
          interval: 6,
          intervalType: "minutes",
          timeFormat: "YYYYMMDDHHmm"
        },
        {
          id: "sn_titan",
          groupName: "two_col",
          name: "Titan",
          time: "",
          timeList: [],
          checked: false,
          dataName: "SWANTITAN",
          interval: 6,
          intervalType: "minutes",
          timeFormat: "YYYYMMDDHHmm"
        },
        {
          id: "sn_three_ref",
          groupName: "level",
          name: "三维反射率",
          time: "",
          timeList: [],
          checked: false,
          dataName: "SWAN三维反射率",
          interval: 6,
          intervalType: "minutes",
          timeFormat: "YYYYMMDDHHmm",
          currLevel: "500",
          levelList: [
            {
              name: "0.5",
              value: "500"
            },
            {
              name: "1.0",
              value: "1000"
            },
            {
              name: "1.5",
              value: "1500"
            },
            {
              name: "2.0",
              value: "2000"
            },
            {
              name: "2.5",
              value: "2500"
            },
            {
              name: "3.0",
              value: "3000"
            },
            {
              name: "3.5",
              value: "3500"
            },
            {
              name: "4.0",
              value: "4000"
            },
            {
              name: "4.5",
              value: "4500"
            },
            {
              name: "5.0",
              value: "5000"
            },
            {
              name: "5.5",
              value: "5500"
            },
            {
              name: "6.0",
              value: "6000"
            },
            {
              name: "7.0",
              value: "7000"
            },
            {
              name: "8.0",
              value: "8000"
            },
            {
              name: "9.0",
              value: "9000"
            },
            {
              name: "10.0",
              value: "10000"
            },
            {
              name: "11.0",
              value: "11000"
            },
            {
              name: "12.0",
              value: "12000"
            },
            {
              name: "14.0",
              value: "14000"
            },
            {
              name: "15.5",
              value: "15500"
            },
            {
              name: "17.0",
              value: "17000"
            },
            {
              name: "19.0",
              value: "19000"
            }
          ]
        },
        {
          id: "sn_rain_qpf",
          groupName: "aging",
          name: "定量降水(QPF)",
          time: "",
          timeList: [],
          checked: false,
          dataName: "SWAN变分法QPF",
          interval: 6,
          intervalType: "minutes",
          timeFormat: "YYYYMMDDHHmm",
          currAging: "000",
          agingList: [
            {
              name: "00分",
              value: "000"
            },
            {
              name: "06分",
              value: "006"
            },
            {
              name: "12分",
              value: "012"
            },
            {
              name: "18分",
              value: "018"
            },
            {
              name: "24分",
              value: "024"
            },
            {
              name: "30分",
              value: "030"
            },
            {
              name: "36分",
              value: "036"
            },
            {
              name: "42分",
              value: "042"
            },
            {
              name: "48分",
              value: "048"
            },
            {
              name: "54分",
              value: "054"
            },
            {
              name: "60分",
              value: "060"
            }
          ]
        },
        {
          id: "sn_echo_fcst_swan",
          groupName: "aging",
          name: "回波预报(SWAN)",
          time: "",
          timeList: [],
          checked: false,
          dataName: "SWAN反射率预报",
          interval: 6,
          intervalType: "minutes",
          timeFormat: "YYYYMMDDHHmm",
          currAging: "030",
          agingList: [
            {
              name: "06分",
              value: "006"
            },
            {
              name: "12分",
              value: "012"
            },
            {
              name: "18分",
              value: "018"
            },
            {
              name: "24分",
              value: "024"
            },
            {
              name: "30分",
              value: "030"
            },
            {
              name: "36分",
              value: "036"
            },
            {
              name: "42分",
              value: "042"
            },
            {
              name: "48分",
              value: "048"
            },
            {
              name: "54分",
              value: "054"
            },
            {
              name: "60分",
              value: "060"
            }
          ]
        },
        {
          id: "sn_echo_fcst_qh",
          groupName: "aging",
          name: "回波预报(清华)",
          time: "",
          timeList: [],
          checked: false,
          dataName: "SWAN清华回波预报",
          interval: 6,
          intervalType: "minutes",
          timeFormat: "YYYYMMDDHHmm",
          currAging: "030",
          agingList: [
            {
              name: "00分",
              value: "000"
            },
            {
              name: "06分",
              value: "006"
            },
            {
              name: "12分",
              value: "012"
            },
            {
              name: "18分",
              value: "018"
            },
            {
              name: "24分",
              value: "024"
            },
            {
              name: "30分",
              value: "030"
            },
            {
              name: "36分",
              value: "036"
            },
            {
              name: "42分",
              value: "042"
            },
            {
              name: "48分",
              value: "048"
            },
            {
              name: "54分",
              value: "054"
            },
            {
              name: "60分",
              value: "060"
            }
          ]
        }
      ]
    },

    // 单站pup
    stationPup: {
      moduleId: "stp",
      moduleName: "单站pup",
      dataName: "单站PUP",
      currStationId: 9971,
      currEleId: "",
      currEleTime: "",
      currEleTimeList: [],
      interval: 6,
      intervalType: "minutes",
      timeFormat: "YYYYMMDDHHmm",
      // 该处要素为单选
      eleList: [
        {
          id: "37",
          name: "组合反射率37",
          checked: false
        },
        {
          id: "1901",
          name: "基本反射率0.5",
          checked: false
        },
        {
          id: "1902",
          name: "基本反射率1.5",
          checked: false
        },
        {
          id: "1903",
          name: "基本反射率2.4",
          checked: false
        },
        {
          id: "2701",
          name: "基本速度(0.5度)",
          checked: false
        },
        {
          id: "2702",
          name: "基本速度(1.5度)",
          checked: false
        },
        {
          id: "2703",
          name: "基本速度(2.4度)",
          checked: false
        }
      ]
    },

    // 预报预警
    fcstWarning: {
      // 短期预报
      shortTerm: {
        date: null,
        hour: '08',
        timeList: [],
        hourList: ['08', '14', '20'],
        aging: '',
        agingList: ['12', '24']
      },
      // 短时预报
      shortTime: {
        date: '',
        timeList: [],
        eleList: [
          {
            id: 'fcstWarning_shortTime_hailstorm',
            pathId: 'StormRain',
            name: '风雹',
            icon: 'bb',
            checked: false
          },
          {
            id: 'fcstWarning_shortTime_large_rain',
            pathId: 'StormWind',
            name: '强降水',
            icon: 'qjs',
            checked: false
          }
        ]
      },
      // 预警
      currWarnId: 'province',
      stateWarn: {
        id: 'state',
        name: '国家级预警',
        date: null,
        hour: '08',
        timeList: [],
        hourList: ['08', '14', '20'],
        aging: '',
        agingList: ['24']
      },
      provinceWarn: {
        id: 'province',
        name: '省级预警',
        date: null,
        hour: '08',
        minute: '00',
        timeList: [],
        hourList: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        minuteList: ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'],
        aging: '06',
        agingList: ['24', '12', '06', '03', '01'],
        eleList: [
          {
            id: 'fcstWarning_warn_thunder',
            pathId: 'lightning',
            name: '雷电',
            icon: 'ld',
            checked: true
          },
          {
            id: 'fcstWarning_warn_rainstorm',
            pathId: 'rainstorm',
            name: '暴雨',
            icon: 'qjs',
            checked: false
          },
          {
            id: 'fcstWarning_warn_large_wind',
            pathId: 'strongwind',
            name: '大风',
            icon: 'df',
            checked: false
          }
        ]
      }
    },


    // 数值预报
    currValueFcstId: 'ncep',
    valueFcst: [
      {
        id: 'ncep',
        name: 'NCEP',
        date: null,
        hour: '20',
        timeList: [],
        hourList: ['02', '08', '14', '20'],
        aging: '000',
        agingList: ['000', '003', '006', '009', '012', '015', '018', '021', '024', '027', '030', '033', '036'],
        typeEleId: 'up',
        typeEleList: [
          {
            id: 'up',
            name: '抬升',
            level: '500',
            levelList: ['500', '700', '850', '925'],
            eleList: [
              {
                id: 'vf_up_level0_height',
                pathId: 'M4/m4_Z0',
                name: '零度层高度',
                value: 'ncep零度层高度',
                type: '无层次',
                checked: false
              },
              {
                id: 'vf_wind_shear_0_1',
                pathId: 'M11/m11_SHR1',
                name: '0-1Km风切',
                value: 'ncep0-1Km风切',
                type: '无层次',
                checked: false
              },
              {
                id: 'vf_wind_shear_0_3',
                pathId: 'M11/m11_SHR3',
                name: '0-3Km风切',
                value: 'ncep0-3Km风切',
                type: '无层次',
                checked: false
              },
              {
                id: 'vf_wind_shear_0_6',
                pathId: 'M11/m11_SHR6',
                name: '0-6Km风切',
                value: 'ncep0-6Km风切',
                type: '无层次',
                checked: false
              },
              {
                id: 'vf_v_vortex_500',
                pathId: 'M4/m4_VOR500',
                name: '500hPa涡度',
                value: 'ncep500hPa涡度',
                type: '无层次',
                checked: false
              },
              {
                id: 'vf_v_advection_500',
                pathId: 'M4/m4_VORADV500',
                name: '500hPa涡度平流',
                value: 'ncep500hPa涡度平流',
                type: '无层次',
                checked: false
              },
              {
                id: 'vf_diver',
                pathId: 'M4/m4_DIV',
                name: '散度',
                value: 'ncep散度',
                type: '高空',
                checked: false
              },
            ]
          },
          {
            id: 'moisture',
            name: '水汽',
            level: '850',
            levelList: ['850'],
            eleList: [
              {
                id: 'vf_mt_level_rain',
                pathId: 'M4/m4_PWAT',
                name: '整层可降水',
                value: 'ncep整层可降水',
                type: '无层次',
                checked: false
              },
              {
                id: 'vf_mt_rain_6',
                pathId: 'M4/m4_PREC',
                name: '6小时降水量',
                value: 'ncep6小时降水量',
                type: '无层次',
                checked: false
              },
              {
                id: 'vf_mt_trop_rain_6',
                pathId: 'M4/m4_CPREC',
                name: '6小时对流性降水量',
                value: 'ncep6小时对流性降水量',
                type: '无层次',
                checked: false
              },
              {
                id: 'vf_mt_temp_droppoint_diff',
                pathId: 'M4/m4_TTD',
                name: '温度露点差',
                value: 'ncep温度露点差',
                type: '高空',
                checked: false
              }
            ]
          }
        ]
      },
      {
        id: 'ec',
        name: 'EC',
        date: null,
        hour: '08',
        timeList: [],
        hourList: ['08', '20'],
        aging: '000',
        agingList: ['000', '003', '006', '009', '012', '015', '018', '021', '024', '027', '030', '033', '036'],
        typeEleId: 'up',
        typeEleList: [
          {
            id: 'up',
            name: '抬升',
            level: '850',
            levelList: ['850', '925'],
            eleList: [
              {
                id: 'vf_ec_up_level0_height',
                pathId: 'M4/m4_Z0',
                name: '零度层高度',
                value: 'ec零度层高度',
                type: '无层次',
                checked: false
              },
              {
                id: 'vf_ec_wind_shear_0_1',
                pathId: 'M11/m11_SHR1',
                name: '0-1Km风切',
                value: 'ec0-1Km风切',
                type: '无层次',
                checked: false
              },
              {
                id: 'vf_ec_wind_shear_0_3',
                pathId: 'M11/m11_SHR3',
                name: '0-3Km风切',
                value: 'ec0-3Km风切',
                type: '无层次',
                checked: false
              },
              {
                id: 'vf_ec_wind_shear_0_6',
                pathId: 'M11/m11_SHR6',
                name: '0-6Km风切',
                value: 'ec0-6Km风切',
                type: '无层次',
                checked: false
              },
              {
                id: 'vf_ec_v_advection_500',
                pathId: 'M4/m4_VORADV500',
                name: '500hPa涡度平流',
                value: 'ec500hPa涡度平流',
                type: '无层次',
                checked: false
              },
              {
                id: 'vf_ec_diver',
                pathId: 'M4/m4_DIV',
                name: '散度',
                value: 'ec散度',
                type: '高空',
                checked: false
              },
              {
                id: 'vf_ec_large_ws',
                pathId: 'M11/m11_WIND',
                name: '大风速区',
                value: 'ec大风速区',
                type: '高空',
                checked: false
              }
            ]
          },
          {
            id: 'moisture',
            name: '水汽',
            level: '850',
            levelList: ['850', '925'],
            eleList: [
              {
                id: 'vf_ec_mt_level_rain',
                pathId: 'M4/m4_PWAT',
                name: '整层可降水量',
                value: 'ec整层可降水量',
                type: '无层次',
                checked: false
              },
              {
                id: 'vf_ec_mt_rain_6',
                pathId: 'M4/m4_PREC',
                name: '6小时降水量',
                value: 'ec6小时降水量',
                type: '无层次',
                checked: false
              },
              {
                id: 'vf_ec_mt_trop_rain_6',
                pathId: 'M4/m4_CPREC',
                name: '6小时对流性降水量',
                value: 'ec6小时对流性降水量',
                type: '无层次',
                checked: false
              },
              {
                id: 'vf_ec_mt_rh',
                pathId: 'M4/m4_RH',
                name: '相对湿度',
                value: 'ec相对湿度',
                type: '高空',
                checked: false
              },
              {
                id: 'vf_ec_mt_temp_droppoint_diff',
                pathId: 'M4/m4_TTD',
                name: '温度露点差',
                value: 'ec温度露点差',
                type: '高空',
                checked: false
              },
              {
                id: 'vf_ec_mt_water_diver',
                pathId: 'M4/m4_QDIV',
                name: '水汽通量散度',
                value: 'ec水汽通量散度',
                type: '高空',
                checked: false
              }
            ]
          }
        ]
      }
    ],
  

    // 雷达特征量
    radarFeature: [
      {
        id: 'rf_windstorm_go',
        name: '风暴追踪',
        time: "",
        timeList: [],
        checked: false,
        dataName: "风暴追踪",
        timeApiName: 'dataTime',
        interval: 6,
        intervalType: "minutes",
        timeFormat: "YYYYMMDDHHmm",
        icon: 'lbzz',
      },
      {
        id: 'rf_hail_index',
        name: '冰雹指数',
        time: "",
        timeList: [],
        checked: false,
        dataName: "冰雹指数",
        timeApiName: 'dataTime',
        interval: 6,
        intervalType: "minutes",
        timeFormat: "YYYYMMDDHHmm",
        icon: 'bbzs',
      },
      {
        id: 'rf_middle_cyclone',
        name: '中尺度气旋',
        time: "",
        timeList: [],
        checked: true,
        dataName: "中尺度气旋",
        timeApiName: 'dataTime',
        interval: 6,
        intervalType: "minutes",
        timeFormat: "YYYYMMDDHHmm",
        icon: 'zcdqx',
      },
      {
        id: 'rf_spout_feature',
        name: '龙卷涡漩特征',
        time: "",
        timeList: [],
        checked: true,
        dataName: "龙卷涡旋特征",
        timeApiName: 'dataTime',
        interval: 6,
        intervalType: "minutes",
        timeFormat: "YYYYMMDDHHmm",
        icon: 'ljwx',
      },
      {
        id: 'rf_windstorm_structure',
        name: '风暴结构',
        time: "",
        timeList: [],
        checked: false,
        dataName: "风暴结构",
        timeApiName: 'dataTime',
        interval: 6,
        intervalType: "minutes",
        timeFormat: "YYYYMMDDHHmm",
        icon: 'bb',
      }
    ],
  };
};
