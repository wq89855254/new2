import * as axios from "axios";

export default {
    getElementTime(dataName) {
        const params = new URLSearchParams();
        params.append('dataName', dataName);
        return axios.post("/proxy/10.20.67.111/stweather/RedisQueryServlet", params);
    },
    getElementTimeForDataTime() {
        return axios.get("/proxy/10.20.67.111/nowcasting/dlsj/zh/dataTime.json");
    }
}