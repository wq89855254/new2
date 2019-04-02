export default {
    name:'Login',
    props:{
        login_switch:{
            type:Boolean,
        }
    },
    data(){
        return {
            user:'',
            pass:'',
            currLogin_switch:this.login_switch,
        }
    },
    methods:{
        loginFn(i){
            if(i){
                if(this.user=='swpc'&&this.pass=='swpc'){
                    this.currLogin_switch=false
                    this.$emit('loginResult',true)
                }else{
                    alert('用户名或密码错误')
                    this.$emit('loginResult',false)
                }
            }else{
                this.currLogin_switch=false
            }
        }
    },
    mounted(){
        // setInterval(()=>{
        //     console.log(this.login_switch)
        // },200)
    },
    watch:{
        login_switch(){
            this.currLogin_switch=this.login_switch
        }
    }
}