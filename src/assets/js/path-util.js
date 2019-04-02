import * as axios from "axios";
// import config from "./config";

export default {
  normalizePath: function(path, params) {
    if (params) {
      Object.keys(params).forEach(key => {
        let val = params[key];

        path = path.replace(new RegExp("{{" + key + "}}", "g"), val);
      });
    }

    return path;
  },

  formatValidTime: function(vt) {
    var validTimeStr = vt;

    if (validTimeStr < 10) {
      validTimeStr = "00" + validTimeStr;
    } else if (validTimeStr < 100) {
      validTimeStr = "0" + validTimeStr;
    }

    return validTimeStr;
  },

  // getConfig: function(key) {
  //   return Promise.resolve(config[key]);
  // }
};
