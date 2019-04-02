import * as axios from "axios";
export const commonMethod = {
  methods: {
    mx_getElementStartTime(eleName) {
      const CancelToken = axios.CancelToken;
      let token;
      const body = {
        modeName: "qiangtianqi",
        eleName,
        strTime: "",
        forecastTime: "",
        level: "",
        userDefinedParas: ""
      };
      const params = new URLSearchParams();
      for (const key in body) {
        params.append(key, body[key]);
      }
      const promise = axios
        .post("/proxy/10.20.67.111/PictureInfoForgetFilePath.action", params, {
          cancelToken: new CancelToken(c => {
            token = c;
          })
        })
        .then(data => {
          if (!data.data.path) return "";
          // [模式名字 要素名字  发布时间  预报时间 层次  文件路径]
          const [
            patternName,
            eleName,
            startTime,
            fcstTime,
            level,
            filePath
          ] = data.data.path.split(",");

          return startTime;
        });
    
        return { token, promise }

    }
  }
};
