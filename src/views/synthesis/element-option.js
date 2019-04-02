// 此处要素id和vuex中的要保持一致
import * as moment from "moment";
export default {
  // 基本图层
  default: {
    id: "default",
    path:
      "http://10.20.67.111:80/MapCache/googleMap/gis/world/Map_x={x}y={y}zoom={z}.png"
  },
  xingzheng: {
    id: "xingzheng",
    path:
      "http://10.1.64.146/map/{z}/{x}/{y}.png"
  },
  street: {
    id: "street",
    path:
      "http://10.20.67.111:80/MapCache/googleMap/gis/googlemap_street/Map_x={x}y={y}zoom={z}.png"
  },
  terrain: {
    id: "terrain",
    path:
      "http://10.20.67.111:80/MapCache/googleMap/gis/googlemap_dixing/Map_x={x}y={y}zoom={z}.png"
  },
  moon: {
    id: "moon",
    path:
      "http://10.20.67.111:80/MapCache/googleMap/gis/googlemap_satellite/Map_x={x}y={y}zoom={z}.png"
  },
  highway: {
    id: "highway",
    path:
      "http://10.20.67.111:80/MapCache/googleMap/gis/road/Map_x={x}y={y}zoom={z}.png"
  },
  highterrain: {
    id: "highterrain",
    path:
      "http://10.20.67.111:80/MapCache/googleMap/gis/TOPO30S/Map_x={x}y={y}zoom={z}.png"
  },

  // 图层要素(边界线，行政点名称，河流等)
  layer_ele_boundary: {
    id: "layer_ele_boundary",
    path:
      "http://10.20.67.111:80/MapCache/googleMap/gis/province_l/Map_x={x}y={y}zoom={z}.png"
  },

  layer_ele_point_name: {
    id: "layer_ele_point_name",
    path:
      "http://10.20.67.111:80/MapCache/googleMap/gis/provincial_capital/Map_x={x}y={y}zoom={z}.png"
  },

  layer_ele_river: {
    id: "layer_ele_river",
    path:
      "http://10.20.67.111:80/MapCache/googleMap/gis/river/Map_x={x}y={y}zoom={z}.png"
  },

  // -------强天气-------
  sw_short_rain: {
    id: "sw_short_rain",
    name: "短时强降水",
    dataType: "tile",
    isHasLegend: false,
    zIndex: 600,
    legendColNum: 2,
    legendList: [
      {
        value: "",
        color: ""
      }
    ],
    pathParams: {
      latestTime: "YYYYMMDDHH",
      currHour: ""
    },
    path:
      "/proxy/10.20.67.190:8080/MapCache/googleMap/monitor/StormRain/ac_{{currHour}}hr/{{latestTime}}/Map_x={x}y={y}zoom={z}.png"
  },
  sw_thunder_wind: {
    id: "sw_thunder_wind",
    name: "雷暴大风",
    dataType: "tile",
    isHasLegend: false,
    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHH",
      currHour: ""
    },
    path:
      "/proxy/10.20.67.190:8080/MapCache/googleMap/monitor/thunderwind/ac_{{currHour}}hr/{{latestTime}}/Map_x={x}y={y}zoom={z}.png"
  },
  sw_hail: {
    id: "sw_hail",
    name: "冰雹",
    dataType: "tile",
    isHasLegend: false,
    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHH",
      currHour: ""
    },
    path:
      "/proxy/10.20.67.190:8080/MapCache/googleMap/monitor/Hail/ac_{{currHour}}hr/{{latestTime}}/Map_x={x}y={y}zoom={z}.png"
  },
  sw_lightning: {
    id: "sw_lightning",
    name: "闪电",
    dataType: "tile",
    isHasLegend: false,
    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHH",
      currHour: ""
    },
    path:
      "/proxy/10.20.67.190:8080/MapCache/googleMap/monitor/Lightning/ac_{{currHour}}hr/{{latestTime}}/Map_x={x}y={y}zoom={z}.png"
  },
  sw_fy4_lightning_watch: {
    id: "sw_fy4_lightning_watch",
    name: "FY4闪电监测",
    dataType: "text",
    isHasLegend: false,
    zIndex: 600,
    pathParams: {
      latestTime: "YYMMDDHHmm",
      currObserve: "",
      currAcc: ""
    },
    path:
      "/proxy/10.20.67.125/lightning/FYLMI/{{currObserve}}/ac_{{currAcc}}/{{latestTime}}.000"
  },
  sw_fy4_floor_lightning: {
    id: "sw_fy4_floor_lightning",
    name: "FY4和地基闪电定位综合数据",
    dataType: "text",
    isHasLegend: false,
    zIndex: 600,
    pathParams: {
      latestTime: "YYMMDDHHmm",
      currObserve: "",
      currAcc: ""
    },
    path:
      "/proxy/10.20.67.125/lightning/FYLMI_ADTD/{{currObserve}}/ac_{{currAcc}}/{{latestTime}}.000"
  },
  sw_thunder_drive_floor_lightning: {
    id: "sw_thunder_drive_floor_lightning",
    name: "雷暴追踪与外推(地闪数据)",
    dataType: "tile",
    isHasLegend: false,
    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path:
      "/proxy/10.20.67.190:8080/MapCache/googleMap/monitor/swan/M7TS/{{latestTime}}.000/Map_x={x}y={y}zoom={z}.png"
  },
  sw_thunder_drive_fy4: {
    id: "sw_thunder_drive_fy4",
    name: "雷暴追踪与外推(FY4闪电和地闪综合)",
    dataType: "tile",
    isHasLegend: false,
    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path:
      "/proxy/10.20.67.112/MapCache/googleMap/monitor/light/M7TS/{{latestTime}}.000/Map_x={x}y={y}zoom={z}.png"
  },

  //-------云图-------
  cp_kh_satellite_base_infrared: {
    id: "cp_kh_satellite_base_infrared",
    name: "红外",
    dataType: "imageOverlay",
    isHasLegend: true,
    zIndex: 500,
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path:
      "/proxy/10.20.90.83:8080/MapCache/googleMap/monitor/Satellite/HMW8/MDFS/mdfs/IR1/{{latestTime}}.000_6_0000.png"
  },
  cp_kh_satellite_base_water: {
    id: "cp_kh_satellite_base_water",
    name: "水汽(350hPa)",
    dataType: "imageOverlay",
    isHasLegend: true,
    zIndex: 500,
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path:
      "/proxy/10.20.90.83:8080/MapCache/googleMap/monitor/Satellite/HMW8/MDFS/mdfs/WV/{{latestTime}}.000_6_0000.png"
  },
  cp_kh_satellite_base_light: {
    id: "cp_kh_satellite_base_light",
    name: "可见光",
    dataType: "imageOverlay",
    isHasLegend: true,

    zIndex: 500,
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path:
      "/proxy/10.20.90.83:8080/MapCache/googleMap/monitor/Satellite/HMW8/MDFS/mdfs/VIS/{{latestTime}}.000_6_0000.png"
  },
  cp_kh_satellite_base_cloud_picture: {
    id: "cp_kh_satellite_base_cloud_picture",
    name: "伪彩云图",
    dataType: "imageOverlay",
    isHasLegend: false,
    zIndex: 500,
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path:
      "/proxy/10.20.90.83:8080/MapCache/googleMap/monitor/Satellite/HMW8/MDFS/mdfs/SSRGB/{{latestTime}}.000_6_0000.png"
  },
  cp_kh_satellite_pro_infrared: {
    id: "cp_kh_satellite_pro_infrared",
    name: "云有效粒子半径",
    dataType: "imageOverlay",
    isHasLegend: false,
    zIndex: 500,
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path:
      "/proxy/10.20.90.83:8080/MapCache/googleMap/monitor/Satellite/HMW8/MDFS/mdfs/ER_day/{{latestTime}}.000_6_0000.png"
  },
  cp_kh_satellite_pro_cloud_ice: {
    id: "cp_kh_satellite_pro_cloud_ice",
    name: "云冰水含量",
    dataType: "imageOverlay",
    isHasLegend: false,
    zIndex: 500,
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path:
      "/proxy/10.20.90.83:8080/MapCache/googleMap/monitor/Satellite/HMW8/MDFS/mdfs/IWP_day/{{latestTime}}.000_6_0000.png"
  },
  cp_kh_satellite_pro_cloud: {
    id: "cp_kh_satellite_pro_cloud",
    name: "云液水含量",
    dataType: "imageOverlay",
    isHasLegend: false,
    zIndex: 500,
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path:
      "/proxy/10.20.90.83:8080/MapCache/googleMap/monitor/Satellite/HMW8/MDFS/mdfs/LWP_day/{{latestTime}}.000_6_0000.png"
  },
  cp_kh_satellite_pro_ply: {
    id: "cp_kh_satellite_pro_ply",
    name: "云光学厚度",
    dataType: "imageOverlay",
    isHasLegend: false,
    zIndex: 500,
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path:
      "/proxy/10.20.90.83:8080/MapCache/googleMap/monitor/Satellite/HMW8/MDFS/mdfs/OD_day/{{latestTime}}.000_6_0000.png"
  },
  cp_kh_satellite_pro_pressure: {
    id: "cp_kh_satellite_pro_pressure",
    name: "云顶气压",
    dataType: "imageOverlay",
    isHasLegend: false,
    zIndex: 500,
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path:
      "/proxy/10.20.90.83:8080/MapCache/googleMap/monitor/Satellite/HMW8/MDFS/mdfs/Topp/{{latestTime}}.000_6_0000.png"
  },
  cp_kh_satellite_cloud_top_temp: {
    id: "cp_kh_satellite_cloud_top_temp",
    name: "云顶温度，负80-60℃",
    dataType: "imageOverlay",
    isHasLegend: false,
    zIndex: 500,
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path:
      "/proxy/10.20.90.83:8080/MapCache/googleMap/monitor/Satellite/HMW8/MDFS/mdfs/Topt/{{latestTime}}.000_6_0000.png"
  },
  cp_kh_satellite_cloud_top_height: {
    id: "cp_kh_satellite_cloud_top_height",
    name: "云顶高度，0-18km",
    dataType: "imageOverlay",
    isHasLegend: false,
    zIndex: 500,
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path:
      "/proxy/10.20.90.83:8080/MapCache/googleMap/monitor/Satellite/HMW8/MDFS/mdfs/Topz/{{latestTime}}.000_6_0000.png"
  },
  cp_kh_satellite_cloud_type: {
    id: "cp_kh_satellite_cloud_type",
    name: "云类型",
    dataType: "imageOverlay",
    isHasLegend: false,
    zIndex: 500,
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path:
      "/proxy/10.20.90.83:8080/MapCache/googleMap/monitor/Satellite/HMW8/MDFS/mdfs/Type/{{latestTime}}.000_6_0000.png"
  },
  cp_kh_satellite_cloud_type_2: {
    id: "cp_kh_satellite_cloud_type_2",
    name: "云类型II",
    dataType: "imageOverlay",
    isHasLegend: false,
    zIndex: 500,
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path:
      "/proxy/10.20.90.83:8080/MapCache/googleMap/monitor/Satellite/HMW8/MDFS/mdfs/TypeII/{{latestTime}}.000_6_0000.png"
  },
  cp_kh_satellite_swipe: {
    id: "cp_kh_satellite_swipe",
    name: "局地对流初生指数(SWIPE)",
    dataType: "imageOverlay",
    isHasLegend: false,
    zIndex: 500,
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path:
      "/proxy/10.20.90.83:8080/MapCache/googleMap/monitor/M3/{{latestTime}}.dat_6_0000.png"
  },
  cp_fy_satellite_infrared: {
    id: "cp_fy_satellite_infrared",
    name: "红外",
    dataType: "tile",
    isHasLegend: false,
    zIndex: 500,
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path:
      "/proxy/10.20.67.190:8080/MapCache/googleMap/monitor/Satellite/IR1/{{latestTime}}/Map_x={x}y={y}zoom={z}.png"
  },
  cp_fy_satellite_water: {
    id: "cp_fy_satellite_water",
    name: "水汽",
    dataType: "tile",
    isHasLegend: false,
    zIndex: 500,
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path:
      "/proxy/10.20.67.190:8080/MapCache/googleMap/monitor/Satellite/Vapour/{{latestTime}}/Map_x={x}y={y}zoom={z}.png"
  },
  cp_fy_satellite_light: {
    id: "cp_fy_satellite_light",
    name: "可见光",
    dataType: "tile",
    isHasLegend: false,
    zIndex: 500,
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path:
      "/proxy/10.20.67.190:8080/MapCache/googleMap/monitor/Satellite/VIS/{{latestTime}}/Map_x={x}y={y}zoom={z}.png"
  },
  cp_fy_satellite_mcs: {
    id: "cp_fy_satellite_mcs",
    name: "MCS",
    dataType: "tile",
    isHasLegend: false,
    zIndex: 500,
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path:
      "/proxy/10.20.67.190:8080/MapCache/googleMap/monitor/Satellite/{{latestTime}}/Map_x={x}y={y}zoom={z}.png"
  },
  cp_fy4_satellite_infrared: {
    id: "cp_fy4_satellite_infrared",
    name: "红外",
    dataType: "imageOverlay",
    isHasLegend: true,
    zIndex: 500,
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path:
      "/proxy/10.20.90.83:8080/MapCache/googleMap/monitor/Satellite/AWX/FY4-120/IR1/{{latestTime}}_6_0000.png"
  },
  cp_fy4_satellite_water: {
    id: "cp_fy4_satellite_water",
    name: "水汽",
    dataType: "imageOverlay",
    isHasLegend: true,
    zIndex: 500,
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path:
      "/proxy/10.20.90.83:8080/MapCache/googleMap/monitor/Satellite/AWX/FY4-062/vapour/{{latestTime}}_6_0000.png"
  },
  cp_fy4_satellite_light: {
    id: "cp_fy4_satellite_light",
    name: "可见光",
    dataType: "imageOverlay",
    isHasLegend: true,
    zIndex: 500,
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path:
      "/proxy/10.20.90.83:8080/MapCache/googleMap/monitor/Satellite/AWX/FY4-004/vis/{{latestTime}}_6_0000.png"
  },
  cp_fy4_satellite_convection_know: {
    id: "cp_fy4_satellite_convection_know",
    name: "对流识别",
    dataType: "imageOverlay",
    isHasLegend: true,
    zIndex: 500,
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path:
      "/proxy/10.20.90.84/MapCache/googleMap/monitor/agri/M4/mdfsm411_convectionIdentification/{{latestTime}}.dat_6_0000.png"
  },
  cp_fy4_satellite_convection_cloud: {
    id: "cp_fy4_satellite_convection_cloud",
    name: "对流云发展阶段判识",
    dataType: "imageOverlay",
    isHasLegend: true,
    zIndex: 500,
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path:
      "/proxy/10.20.90.84/MapCache/googleMap/monitor/agri/M4/mdfsm411_convectiveStages/{{latestTime}}.dat_6_0000.png"
  },
  cp_fy4_satellite_convection_cape: {
    id: "cp_fy4_satellite_convection_cape",
    name: "对流参数CAPE",
    dataType: "imageOverlay",
    isHasLegend: true,
    zIndex: 500,
    pathParams: {
      latestTime: "YYYYMMDDHH",
      latestAging: ""
    },
    path:
      "/proxy/10.20.90.84/MapCache/googleMap/monitor/giirs/m3tom4_cape/{{latestTime}}.{{latestAging}}_CAPE_6_0000.png"
  },
  cp_fy4_satellite_convection_cin: {
    id: "cp_fy4_satellite_convection_cin",
    name: "对流参数CIN",
    dataType: "imageOverlay",
    isHasLegend: true,
    zIndex: 500,
    pathParams: {
      latestTime: "YYYYMMDDHH",
      latestAging: ""
    },
    path:
      "/proxy/10.20.90.84/MapCache/googleMap/monitor/giirs/m3tom4_cin/{{latestTime}}.{{latestAging}}_CIN_6_0000.png"
  },
  cp_fy4_satellite_convection_t850: {
    id: "cp_fy4_satellite_convection_t850",
    name: "对流参数T850",
    dataType: "imageOverlay",
    isHasLegend: true,
    zIndex: 500,
    pathParams: {
      latestTime: "YYYYMMDDHH",
      latestAging: ""
    },
    path:
      "/proxy/10.20.90.84/MapCache/googleMap/monitor/giirs/m3tom4_t850500/{{latestTime}}.{{latestAging}}_T850_500_6_0000.png"
  },
  cp_fy4_satellite_convection_thse850: {
    id: "cp_fy4_satellite_convection_thse850",
    name: "对流参数THSE850",
    dataType: "imageOverlay",
    isHasLegend: true,
    zIndex: 500,
    pathParams: {
      latestTime: "YYYYMMDDHH",
      latestAging: ""
    },
    path:
      "/proxy/10.20.90.84/MapCache/googleMap/monitor/giirs/m3tom4_THSE850500/{{latestTime}}.{{latestAging}}_THSE850_500_6_0000.png"
  },
  cp_fy4_satellite_convection_zht: {
    id: "cp_fy4_satellite_convection_zht",
    name: "对流参数ZHT",
    dataType: "imageOverlay",
    isHasLegend: true,
    zIndex: 500,
    pathParams: {
      latestTime: "YYYYMMDDHH",
      latestAging: ""
    },
    path:
      "/proxy/10.20.90.84/MapCache/googleMap/monitor/giirs/m3tom4_zht/{{latestTime}}.{{latestAging}}_ZHT_6_0000.png"
  },
  cp_fy4_satellite_short_thunder: {
    id: "cp_fy4_satellite_short_thunder",
    name: "雷暴短时",
    dataType: "imageOverlay",
    isHasLegend: true,
    zIndex: 500,
    pathParams: {
      latestTime: "YYMMDDHH",
      latestAging: ""
    },
    path:
      "/proxy/10.20.90.84/MapCache/googleMap/monitor/giirs/M4/m4_thunderP/{{latestTime}}.{{latestAging}}_6_0000.png"
  },
  cp_fy4_satellite_lightning_1h: {
    id: "cp_fy4_satellite_lightning_1h",
    name: "闪电密度1H",
    dataType: "imageOverlay",
    isHasLegend: true,
    zIndex: 500,
    pathParams: {
      latestTime: "YYMMDDHHmm"
    },
    path:
      "/proxy/10.20.90.84/MapCache/googleMap/monitor/giirs/M4/m4_light1h/{{latestTime}}.000_6_0000.png"
  },
  cp_fy4_satellite_lightning_3h: {
    id: "cp_fy4_satellite_lightning_3h",
    name: "闪电密度3H",
    dataType: "imageOverlay",
    isHasLegend: true,
    zIndex: 500,
    pathParams: {
      latestTime: "YYMMDDHHmm"
    },
    path:
      "/proxy/10.20.90.84/MapCache/googleMap/monitor/giirs/M4/m4_light3h/{{latestTime}}.000_6_0000.png"
  },
  cp_fy4_satellite_lightning_6h: {
    id: "cp_fy4_satellite_lightning_6h",
    name: "闪电密度6H",
    dataType: "imageOverlay",
    isHasLegend: true,
    zIndex: 500,
    pathParams: {
      latestTime: "YYMMDDHHmm"
    },
    path:
      "/proxy/10.20.90.84/MapCache/googleMap/monitor/giirs/M4/m4_light6h/{{latestTime}}.000_6_0000.png"
  },
  cp_fy4_satellite_lightning_10m: {
    id: "cp_fy4_satellite_lightning_10m",
    name: "闪电密度10M",
    dataType: "imageOverlay",
    isHasLegend: true,
    zIndex: 500,
    pathParams: {
      latestTime: "YYMMDDHHmm"
    },
    path:
      "/proxy/10.20.90.84/MapCache/googleMap/monitor/giirs/M4/m4_light10m/{{latestTime}}.000_6_0000.png"
  },
  cp_fy4_satellite_convection: {
    id: "cp_fy4_satellite_convection",
    name: "多源对流强度",
    dataType: "imageOverlay",
    isHasLegend: true,
    zIndex: 500,
    pathParams: {
      latestTime: "YYYYMMDDHHmmss"
    },
    path:
      "/proxy/10.20.90.84/MapCache/googleMap/monitor/giirs/m4_conclassify/CON_CLASSIFY_{{latestTime}}.dat_6_0000.png"
  },

  // pup拼图
  pp_group_ref: {
    id: "pp_group_ref",
    name: "组合反射率",
    dataType: "imageOverlay",
    isHasLegend: true,

    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path:
      "/proxy/10.20.90.83:8080/MapCache/googleMap/monitor/ACHN/CREF/{{latestTime}}.000_6_0000.png"
  },
  pp_1h_rain: {
    id: "pp_1h_rain",
    name: "1小时降水",
    dataType: "imageOverlay",
    isHasLegend: false,
    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path:
      "/proxy/10.20.90.83:8080/MapCache/googleMap/monitor/ACHN/OHP/{{latestTime}}.000_6_0000.png"
  },
  pp_base_ref: {
    id: "pp_base_ref",
    name: "基本反射率",
    dataType: "imageOverlay",
    isHasLegend: true,

    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path:
      "/proxy/10.20.90.83:8080/MapCache/googleMap/monitor/ACHN/QREF/{{latestTime}}.000_6_0000.png"
  },
  pp_vtl_water: {
    id: "pp_vtl_water",
    name: "垂直液态水",
    dataType: "imageOverlay",
    isHasLegend: true,

    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path:
      "/proxy/10.20.90.83:8080/MapCache/googleMap/monitor/ACHN/VIL/{{latestTime}}.000_6_0000.png"
  },

  // 自动站
  st_all_rain: {
    id: "st_all_rain",
    name: "总降水",
    dataType: "tile",
    isHasLegend: false,
    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHH",
      currHour: ""
    },
    path:
      "/proxy/10.20.67.190:8080/MapCache/googleMap/monitor/Rain/ac_{{currHour}}hr/{{latestTime}}/Map_x={x}y={y}zoom={z}.png"
  },
  st_large_rain_warn: {
    id: "st_large_rain_warn",
    name: "暴雨预警",
    dataType: "tile",
    isHasLegend: false,
    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHH"
    },
    path:
      "/proxy/10.20.67.190:8080/MapCache/googleMap/monitor/Rain/RainWarn/{{latestTime}}/Map_x={x}y={y}zoom={z}.png"
  },
  st_wind: {
    id: "st_wind",
    name: "风",
    dataType: "tile",
    isHasLegend: false,
    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHH"
    },
    path:
      "/proxy/10.20.67.190:8080/MapCache/googleMap/monitor/AWS/Wind/{{latestTime}}/Map_x={x}y={y}zoom={z}.png"
  },
  st_temp: {
    id: "st_temp",
    name: "温度",
    dataType: "dat",
    isHasLegend: false,
    zIndex: 600,
    clevels: [
      -32,
      -28,
      -24,
      -20,
      -16,
      -12,
      -8,
      -4,
      0,
      4,
      8,
      12,
      16,
      20,
      24,
      28,
      32,
      36,
      40
    ],
    ccolors: [
      20,
      100,
      210,
      255,
      30,
      110,
      235,
      255,
      40,
      130,
      240,
      255,
      60,
      150,
      245,
      255,
      80,
      165,
      245,
      255,
      120,
      185,
      250,
      255,
      150,
      210,
      250,
      255,
      180,
      240,
      250,
      255,
      225,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      250,
      170,
      255,
      255,
      232,
      120,
      255,
      255,
      192,
      60,
      255,
      255,
      160,
      0,
      255,
      255,
      96,
      0,
      255,
      255,
      50,
      0,
      255,
      225,
      20,
      0,
      255,
      192,
      0,
      0,
      255,
      165,
      0,
      0,
      255
    ],
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path: "/proxy/10.20.67.200/Data/obsanaly/AWSJMCN/T/{{latestTime}}00.dat"
  },
  st_dew_point: {
    id: "st_dew_point",
    name: "露点",
    dataType: "dat",
    isHasLegend: false,
    zIndex: 600,
    clevels: [
      -32,
      -28,
      -24,
      -20,
      -16,
      -12,
      -8,
      -4,
      0,
      4,
      8,
      12,
      16,
      20,
      24,
      28,
      32,
      36,
      40
    ],
    ccolors: [
      20,
      100,
      210,
      255,
      30,
      110,
      235,
      255,
      40,
      130,
      240,
      255,
      60,
      150,
      245,
      255,
      80,
      165,
      245,
      255,
      120,
      185,
      250,
      255,
      150,
      210,
      250,
      255,
      180,
      240,
      250,
      255,
      225,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      250,
      170,
      255,
      255,
      232,
      120,
      255,
      255,
      192,
      60,
      255,
      255,
      160,
      0,
      255,
      255,
      96,
      0,
      255,
      255,
      50,
      0,
      255,
      225,
      20,
      0,
      255,
      192,
      0,
      0,
      255,
      165,
      0,
      0,
      255
    ],
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path: "/proxy/10.20.67.200/Data/obsanaly/AWSJMCN/TD/{{latestTime}}00.dat"
  },
  st_pressure: {
    id: "st_pressure",
    name: "海平面气压",
    dataType: "dat",
    isHasLegend: false,
    zIndex: 600,
    clevels: [
      980,
      985,
      990,
      995,
      1000,
      1005,
      1010,
      1015,
      1020,
      1025,
      1030,
      1035,
      1040,
      1045,
      1050
    ],
    ccolors: [
      80,
      0,
      80,
      255,
      134,
      0,
      134,
      255,
      187,
      0,
      187,
      255,
      241,
      0,
      241,
      255,
      255,
      80,
      255,
      255,
      255,
      134,
      255,
      255,
      255,
      187,
      255,
      255,
      255,
      241,
      255,
      255,
      187,
      255,
      187,
      255,
      134,
      255,
      134,
      255,
      80,
      255,
      80,
      255,
      0,
      241,
      0,
      255,
      0,
      187,
      0,
      255,
      0,
      134,
      0,
      255,
      0,
      80,
      0,
      255
    ],
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path: "/proxy/10.20.67.200/Data/obsanaly/AWSJMCN/P_ALL/{{latestTime}}00.dat"
  },
  st_relative_temp: {
    id: "st_relative_temp",
    name: "假相当位温",
    dataType: "dat",
    isHasLegend: false,
    zIndex: 600,
    clevels: [335, 340, 345, 350, 355, 360, 365, 370],
    ccolors: [
      255,
      255,
      255,
      0,
      255,
      245,
      204,
      255,
      255,
      230,
      112,
      255,
      255,
      204,
      51,
      255,
      255,
      153,
      51,
      255,
      255,
      85,
      0,
      255,
      230,
      40,
      30,
      255,
      200,
      30,
      20,
      255
    ],
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path:
      "/proxy/10.20.67.200/Data/obsanaly/AWSJMCN/Thetase/{{latestTime}}00.dat"
  },
  st_curr_warn_rain: {
    id: "st_curr_warn_rain",
    name: "降水",
    dataType: "plot10min",
    isHasLegend: false,
    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHHmmss"
    },
    path:
      "/proxy/10.20.67.112:80/MapCache/googleMap/monitor/severeWeather/Plot10min/{{latestTime}}.json"
  },
  st_curr_warn_max_wind: {
    id: "st_curr_warn_max_wind",
    name: "极大风",
    dataType: "plot10min",
    isHasLegend: false,
    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHHmmss"
    },
    path:
      "/proxy/10.20.67.112:80/MapCache/googleMap/monitor/severeWeather/Plot10min/{{latestTime}}.json"
  },
  st_curr_warn_gt_temp: {
    id: "st_curr_warn_gt_temp",
    name: "温度>",
    dataType: "plot10min",
    isHasLegend: false,
    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHHmmss"
    },
    path:
      "/proxy/10.20.67.112:80/MapCache/googleMap/monitor/severeWeather/Plot10min/{{latestTime}}.json"
  },
  st_curr_warn_lt_temp: {
    id: "st_curr_warn_lt_temp",
    name: "温度<",
    dataType: "plot10min",
    isHasLegend: false,
    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHHmmss"
    },
    path:
      "/proxy/10.20.67.112:80/MapCache/googleMap/monitor/severeWeather/Plot10min/{{latestTime}}.json"
  },

  // SWAN拼图
  sn_group_ref: {
    id: "sn_group_ref",
    name: "组合反射率",
    dataType: "imageOverlay",
    isHasLegend: false,
    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path:
      "/proxy/10.20.90.83:8080/MapCache/googleMap/monitor/swan/RADAMCR/0/{{latestTime}}.000_6_0000.png"
  },
  sn_echo_top: {
    id: "sn_echo_top",
    name: "回波顶高",
    dataType: "imageOverlay",
    isHasLegend: false,
    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path:
      "/proxy/10.20.90.83:8080/MapCache/googleMap/monitor/swan/RADAMTOP/0/{{latestTime}}.000_6_0000.png"
  },
  sn_water: {
    id: "sn_water",
    name: "液态水含量",
    dataType: "imageOverlay",
    isHasLegend: false,
    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path:
      "/proxy/10.20.90.83:8080/MapCache/googleMap/monitor/swan/RADAMVIL/0/{{latestTime}}.000_6_0000.png"
  },
  sn_rain_estimate: {
    id: "sn_rain_estimate",
    name: "定量降水估测",
    dataType: "imageOverlay",
    isHasLegend: false,
    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path:
      "/proxy/10.20.90.83:8080/MapCache/googleMap/monitor/swan/RADAMQPE/0/{{latestTime}}.000_6_0000.png"
  },
  sn_titan: {
    id: "sn_titan",
    name: "Titan",
    dataType: "imageOverlay",
    isHasLegend: false,
    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHHmm"
    },
    path:
      "/proxy/10.20.90.83:8080/MapCache/googleMap/monitor/swan/TITAN/{{latestTime}}.000_6_0000.png"
  },
  sn_three_ref: {
    id: "sn_three_ref",
    name: "三维反射率",
    dataType: "imageOverlay",
    isHasLegend: false,
    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHHmm",
      latestLevel: ""
    },
    path:
      "/proxy/10.20.90.83:8080/MapCache/googleMap/monitor/swan/MOSAIC/{{latestLevel}}/{{latestTime}}.000_6_0000.png"
  },
  sn_rain_qpf: {
    id: "sn_rain_qpf",
    name: "定量降水(QPF)",
    dataType: "imageOverlay",
    isHasLegend: false,
    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHHmm",
      latestAging: ""
    },
    path:
      "/proxy/10.20.90.83:8080/MapCache/googleMap/monitor/swan/QPF/500/{{latestTime}}.{{latestAging}}_6_0000.png"
  },
  sn_echo_fcst_swan: {
    id: "sn_echo_fcst_swan",
    name: "回波预报(SWAN)",
    dataType: "imageOverlay",
    isHasLegend: false,
    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHHmm",
      latestAging: ""
    },
    path:
      "/proxy/10.20.67.112:80/MapCache/googleMap/monitor/REF_FST/{{latestTime}}.{{latestAging}}_6_0000.png"
  },
  sn_echo_fcst_qh: {
    id: "sn_echo_fcst_qh",
    name: "回波预报(清华)",
    dataType: "imageOverlay",
    isHasLegend: false,
    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHHmm",
      latestAging: ""
    },
    path:
      "/proxy/10.20.90.83:8080/MapCache/googleMap/monitor/ACHN/CREF/{{latestTime}}.{{latestAging}}_6_0000.png"
  },

  // 单站pup
  stp: {
    id: "stp",
    name: "单站pup",
    dataType: "tile",
    isHasLegend: false,
    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHHmmss",
      currEleId: "",
      currStationId: ""
    },
    path:
      "/proxy/10.20.67.112:80/MapCache/googleMap/monitor/swan/SHP/shp_pup{{currEleId}}_Z{{currStationId}}/{{latestTime}}.shp/Map_x={x}y={y}zoom={z}.png"
  },

  // 预报预警
  fw_short_term: {
    id: 'fw_short_term',
    typeName: '短期预报',
    place: {
      west: 67.5,
      east: 140.625,
      south: 16.6361918783976,
      north: 55.7765730186677
    },
    timeFormat: 'YYYYMMDDHHmm',
    dataType: "imageOverlay",
    isHasLegend: false,
    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHH",
      aging: "",
    },
    path:
      "/proxy/10.20.90.82:8888/MapCache/googleMap/Product/Forecast/{{latestTime}}.{{aging}}_6_0000.png"
  
  },
  fw_short_time: {
    id: 'fw_short_time',
    typeName: '短时预报',
    place: {
      west: 67.5,
      east: 140.625,
      south: 16.6361918783976,
      north: 55.7765730186677
    },
    timeFormat: 'YYYYMMDDHHmm',
    dataType: "imageOverlay",
    isHasLegend: false,
    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHHmm",
      pathId: "",
    },
    path:
      "/proxy/10.20.90.82:8888/MapCache/googleMap/Product/Watch/{{pathId}}/{{latestTime}}.006_6_0000.png"
  },
  fw_warn_state: {
    id: 'fw_warn_state',
    typeName: '国家级预警',
    place: {
      west: 67.5,
      east: 140.625,
      south: 16.6361918783976,
      north: 55.7765730186677
    },
    timeFormat: 'YYYYMMDDHHmm',
    dataType: "imageOverlay",
    isHasLegend: false,
    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHH",
      aging: ''
    },
    path:
      "/proxy/10.20.90.82:8888/MapCache/googleMap/Product/Warning/{{latestTime}}.{{aging}}_6_0000.png"
  },
  fw_warn_province: {
    id: 'fw_warn_province',
    typeName: '省级预警',
    timeFormat: 'YYYYMMDDHHmm',
    dataType: "tile",
    isHasLegend: false,
    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHHmm",
      pathId: "",
      aging: ''
    },
    path:
      "/proxy/10.20.67.112:80/MapCache/googleMap/monitor/XMLWARN/xmlwarn_shade{{aging}}h/{{pathId}}/{{latestTime}}.xml/Map_x={x}y={y}zoom={z}.png"
  },

  // 数值预报
  vf_ncep: {
    id: 'vf_ncep',
    typeName: 'NCEP',
    timeFormat: 'YYYYMMDDHHmm',
    dataType: "tile",
    isHasLegend: false,
    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHH",
      pathId: "",
      aging: '',
      level: ''
    },
    path:
      "/proxy/10.20.90.84:8081/MapCache/googleMap/monitor/ncep/{{pathId}}{{level}}/{{latestTime}}.{{aging}}/Map_x={x}y={y}zoom={z}.png"
  },
  vf_ec: {
    id: 'vf_ec',
    typeName: 'EC',
    timeFormat: 'YYYYMMDDHHmm',
    dataType: "tile",
    isHasLegend: false,
    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHH",
      pathId: "",
      aging: '',
      level: ''
    },
    path:
      "/proxy/10.20.90.84:8081/MapCache/googleMap/monitor/ecmwf/{{pathId}}{{level}}/{{latestTime}}.{{aging}}/Map_x={x}y={y}zoom={z}.png"
  },

  // 雷达特征量
  rf_windstorm_go: {
    id: "rf_windstorm_go",
    name: "风暴追踪",
    dataType: "PupMosaicJson58",
    isHasLegend: false,
    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHHmmss"
    },
    path:
      "/proxy/10.20.67.112:80/MapCache/googleMap/monitor/PupMosaicJson/58/{{latestTime}}.json"
  },
  rf_hail_index: {
    id: "rf_hail_index",
    name: "冰雹指数",
    dataType: "PupMosaicJson59",
    isHasLegend: false,
    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHHmmss"
    },
    path:
      "/proxy/10.20.67.112:80/MapCache/googleMap/monitor/PupMosaicJson/59/{{latestTime}}.json"
  },
  rf_middle_cyclone: {
    id: "rf_middle_cyclone",
    name: "中尺度气旋",
    dataType: "PupMosaicJson60",
    isHasLegend: false,
    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHHmmss"
    },
    path:
      "/proxy/10.20.67.112:80/MapCache/googleMap/monitor/PupMosaicJson/60/{{latestTime}}.json"
  },
  rf_spout_feature: {
    id: "rf_spout_feature",
    name: "龙卷涡漩特征",
    dataType: "PupMosaicJson61",
    isHasLegend: false,
    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHHmmss"
    },
    path:
      "/proxy/10.20.67.112:80/MapCache/googleMap/monitor/PupMosaicJson/61/{{latestTime}}.json"
  },
  rf_windstorm_structure: {
    id: "rf_windstorm_structure",
    name: "风暴结构",
    dataType: "PupMosaicJson62",
    isHasLegend: false,
    zIndex: 600,
    pathParams: {
      latestTime: "YYYYMMDDHHmmss"
    },
    path:
      "/proxy/10.20.67.112:80/MapCache/googleMap/monitor/PupMosaicJson/62/{{latestTime}}.json"
  },



  getPath(eleOption) {
    const op = this[eleOption.id];
    const params = {};
    for (const key in op.pathParams) {
      const val = op.pathParams[key];
      if (key === "latestTime") {
        params[key] = moment(eleOption.latestTime, "YYYYMMDDHHmm").format(val);
      } else {
        params[key] = eleOption[key];
      }
    }
    let path = op.path;
    for (const key in params) {
      const val = params[key];
      path = path.replace("{{" + key + "}}", val);
    }
    return path;
  }
};
