import {getDefaultCheck} from '../mutation-types'

const state = {
    defaultChecked:['实况-强天气','监测-强天气','监测-卫星-时间累积次数']
}
const getters = {
    
}
  
const actions = {
    getDefaultCheck({commit},checkedKeys){
        commit(getDefaultCheck,checkedKeys)
        console.log(checkedKeys)
    }
}
  
const mutations = {
    [getDefaultCheck](state,checkedKeys){
        state.defaultChecked=checkedKeys
    }
}
  
export default {
    state,
    getters,
    actions,
    mutations
}