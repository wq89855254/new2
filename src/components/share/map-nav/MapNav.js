import L from "leaflet";
// import 'proj4';
// import 'proj4leaflet';
import * as axios from "axios";

export default {
  name: "map-nav",
  components: {},
  model: {
    prop: "sign",
    event: "change"
  },
  props: {
    sign: {
      type: Number,
      required: true
    },

    isSync: {
      type: Boolean,
      default: false
    },

    // list = [
    //   latitude: 31.41
    //   longitude: 121.46
    //   name: ""
    //   number: 58362
    //   province: ""
    // ]
    list: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {},

  watch: {
    list(list) {
      // console.log(list);
      // console.log(this.map);
      if (!this.map) return;
      if (list.length) {
        this.renderData();
        this.addCheckedMarker();
      }
    },
    sign() {
      this.addCheckedMarker();
    }
  },

  mounted() {
    this.imitMap();
    this.renderData();
    this.addCheckedMarker();
  },

  beforeDestroy() {},

  methods: {
    imitMap() {
      // var lcc_attrs = {
      //   proj4string:
      //     "+a=6378137.0 +b=6356752.3142 +y_0=3462665.93846 +lon_0=120.0 +proj=lcc +x_0=5752704.73052 +units=m +lat_2=30.0 +lat_1=10.0 +lat_0=25.0",
      //   resolutions: [
      //     0.0,
      //     0.0,
      //     24197.67378,
      //     12098.83689,
      //     6049.418445,
      //     3024.709222,
      //     1493.683567,
      //     742.259932
      //   ],
      //   bounds: (0.0, 0.0, 12098836.88981346, 10618170.208304904),
      //   zoom: {
      //     min: 2,
      //     max: 7
      //   }
      // };
      // var transformation = new L.Transformation(
      //   1,
      //   21136.401573461,
      //   -1,
      //   10718170.208304904
      // );
      // var lcc_crs = new L.Proj.CRS("EPSG:2154", lcc_attrs.proj4string, {
      //   transformation: transformation,
      //   resolutions: lcc_attrs.resolutions //rss
      // });

      this.map = L.map(this.$refs.map, {
        center: [36.87962060502676, 103.71093750000001],
        zoom: 3,
        minZoom: 3,
        // maxZoom: lcc_attrs.zoom.max, //6,
        // minZoom: lcc_attrs.zoom.min, //0,
        // crs: lcc_crs,
        attributionControl: false,
        zoomControl: false
      });

      this.addBaseLayer();

      // this.map.on("click", e => {
      //   console.log(e);
      // });
    },
    renderData() {
      // console.log(this);
      if (this.layerGroup) {
        this.layerGroup.remove();
        this.layerGroup = null;
      }
      this.layerGroup = L.layerGroup();
      this.list.forEach(el => {
        const marker = L.circle([el.latitude, el.longitude], {
          radius: 10,
          color: "#080",
          pane: "markerPane"
        });
        if (el.name) {
          marker.bindTooltip(el.name);
        }
        marker.on("click", e => {
          if (this.sign === el.number) return;
          this.$emit("change", el.number);
        });
        this.layerGroup.addLayer(marker);
      });
      this.layerGroup.addTo(this.map);
    },

    // 用marker标记当前选中的marker
    addCheckedMarker() {
      const checkedItem = this.list.find(el => el.number === this.sign);
      if (!checkedItem) return;
      if (this.checkedMarker) {
        this.checkedMarker.remove();
        this.checkedMarker = null;
      }
      this.checkedMarker = L.circle(
        [checkedItem.latitude, checkedItem.longitude],
        { radius: 10, color: "red", pane: "markerPane" }
      ).addTo(this.map);
      if (checkedItem.name) {
        this.checkedMarker.bindTooltip(checkedItem.name);
      }
    },

    // 添加基本图层：边界线
    addBaseLayer() {
      axios.get("./json/china.geo.json").then(data => {
        L.geoJson(data.data, {
          color: "#a3abb3",
          fill: true,
          fillColor: "#fff",
          fillOpacity: 1,
          weight: 0.3,
          opacity: 1
        }).addTo(this.map);
      });
      axios.get("./json/countries.geo.json").then(data => {
        L.geoJson(data.data, {
          color: "#FFF",
          fill: false,
          weight: 0.3
        }).addTo(this.map);
      });
      axios.get("./json/jiuduanxian.json").then(data => {
        L.geoJSON(data.data, {
          style: function(feature) {
            return { color: "#fff", stroke: true, weight: 1 };
          }
        }).addTo(this.map);
      });
    }
  }
};
