<template>
    <div class="content" v-if="currLogin_switch">
        <div class="login_box">
            <div class="userName">
                <i></i>
                <input type="text" name="" id="" placeholder="请输入用户名" v-model="user">
            </div>
            <div class="passWord">                <i></i>
                <input type="password" name="" id="" placeholder="请输入密码" v-model="pass"></div>
            <div class="btn">
                <button @click="loginFn(1)">登录</button><button @click="loginFn(0)">取消</button>
            </div>
        </div>
    </div>
</template>
<style src="./login.scss" lang="scss" scoped></style>
<script src="./login.js"></script>