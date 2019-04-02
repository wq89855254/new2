import Vue from "vue";
import Router from "vue-router";
import { NotFound } from "./components/base";
import { Home, Synthesis, Monitor, Diagnosis, Shorttime, Shortimpending, Verify, Archive, Manage, HistoryCase, HistorySearch, Recover, FilesManage ,DutyRoster} from './views';

Vue.use(Router);

export default new Router({
  // mode: "history",  //默认使用hash模式
  // base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      children: [
        {
          path: "/synthesis",
          name: "Synthesis",
          component: Synthesis
        },
        {
          path: "/monitor",
          name: "Monitor",
          component: Monitor
        },

        {
          path: "/diagnosis",
          name: "Diagnosis",
          component: Diagnosis
        },
        {
          path: "/shortimpending",
          name: "Shortimpending",
          component: Shortimpending
        },
        {
          path: "/shorttime",
          name: "Shorttime",
          component: Shorttime
        },
        {
          path: "/verify",
          name: "Verify",
          component: Verify
        },
        {
          path: "/archive",
          name: "Archive",
          component: Archive
        },
        {
          path: "/manage",
          name: "Manage",
          component: Manage,
          
        },
        {
          path: "/manage/historyCase",
          name: "HistoryCase",
          component: HistoryCase,
        },
        {
          path: "/manage/historySearch",
          name: "HistorySearch",
          component: HistorySearch,
        },
        {
          path: "/manage/recover",
          name: "Recover",
          component: Recover,
        },
        {
          path: "/manage/filesManage",
          name: "FilesManage",
          component: FilesManage,
        },
        {
          path: "/manage/dutyRoster",
          name: "DutyRoster",
          component: DutyRoster,
        },
        {
          path: "*",
          redirect: "/shorttime"
        },
        
      ]
    },
    {
      path: "*",
      component: NotFound
    }
  ]
});
