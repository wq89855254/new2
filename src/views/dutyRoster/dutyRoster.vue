<template>
    <div class="container">
        <div class="head">
            <div>
                <select name="" id="">
                    <option value="">2018年</option>
                </select>
                <select name="" id="">
                    <option value="">5月</option>
                </select>
            </div>
            <div class="imgWrap">
                <img src="./imgs/zhib.png" alt="">
            </div>
            <div class="back" @click="$router.back()">
                <img src="./imgs/back.png" alt="">
                <span>返回上级</span>
            </div>
        </div>
        <div class="dutyInfo">
            <!-- <a-table :columns="columns" :dataSource=tableData 
                bordered 
                :pagination=false
            >
                
            </a-table> -->

            <!-- <a-table :columns="columns" :dataSource=tableData 
                bordered 
                :pagination=false
            >
                
            </a-table> -->

            <table class="table">
                <thead>
                    <tr>
                        <th colspan="2" class="red">一级值班</th>
                        <th class="chief">副首席</th>
                        <th class="chief">应急副首席</th>
                        <th class="foreman">领班大夜</th>
                        <th class="foreman">领班白班</th>
                        <th class="mainboard">主班</th>
                        <th class="mainboard">应急主班</th>
                        <th class="follow">跟班(领班)</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td class="red">二</td>
                        <td class="chief">樊利强</td>
                        <td class="chief" rowspan="6">杨波</td>
                        <td class="foreman">周康辉</td>
                        <td class="foreman">康文苑</td>
                        <td class="mainboard">曹艳察</td>
                        <td class="mainboard">曹艳察</td>
                        <td rowspan="7">尤悦<br/>万子为</td>

                    </tr>
                    <tr>
                        <td>2</td>
                        <td>三</td>
                        <td class="chief">周晓霞</td>
                        <td class="foreman" >唐文苑</td>
                        <td class="foreman" >樊利强</td>
                        <td class="mainboard">韩旭卿</td>
                        <td class="mainboard">韩旭卿</td>

                    </tr>
                    <tr>
                        <td>3</td>
                        <td>四</td>
                        <td class="chief">樊利强</td>
                        <td class="foreman">周康辉</td>
                        <td class="foreman">康文苑</td>
                        <td class="mainboard">曹艳察</td>
                        <td class="mainboard">曹艳察</td>

                    </tr>
                    <tr>
                        <td>4</td>
                        <td>五</td>
                        <td class="chief">樊利强</td>
                        <td class="foreman">周康辉</td>
                        <td class="foreman">康文苑</td>
                        <td class="mainboard">曹艳察</td>
                        <td class="mainboard">曹艳察</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td class="red">六</td>
                        <td class="chief">樊利强</td>
                        <td class="foreman">周康辉</td>
                        <td class="foreman">康文苑</td>
                        <td class="mainboard">曹艳察</td>
                        <td class="mainboard">曹艳察</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td class="red">日</td>
                        <td class="chief">林隐静</td>
                        <td class="foreman">周康辉</td>
                        <td class="foreman">康文苑</td>
                        <td class="mainboard">曹艳察</td>
                        <td class="mainboard">曹艳察</td>
                    </tr>

                    <tr>
                        <td>7</td>
                        <td>一</td>
                        <td class="chief">樊利强</td>
                        <td rowspan="7"  class="chief">张小玲</td>
                        <td class="foreman" >周康辉</td>
                        <td class="foreman" >康文苑</td>
                        <td class="mainboard">曹艳察</td>
                        <td class="mainboard">曹艳察</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>二</td>
                        <td class="chief">樊利强</td>
                        <td class="foreman">周康辉</td>
                        <td class="foreman">康文苑</td>
                        <td class="mainboard">曹艳察</td>
                        <td class="mainboard">曹艳察</td>
                        <td>周云霞</td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td>三</td>
                        <td class="chief">樊利强</td>
                        <td class="foreman">周康辉</td>
                        <td class="foreman">康文苑</td>
                        <td class="mainboard">曹艳察</td>
                        <td class="mainboard">曹艳察</td>
                        <td>周云霞</td>

                    </tr>
                    <tr>
                        <td>10</td>
                        <td>四</td>
                        <td class="chief">樊利强</td>
                        <td class="foreman">周康辉</td>
                        <td class="foreman">康文苑</td>
                        <td class="mainboard">曹艳察</td>
                        <td class="mainboard">曹艳察</td>
                        <td>黄艇</td>
                        
                    </tr>
                    <tr>
                        <td>11</td>
                        <td>五</td>
                        <td class="chief">樊利强</td>
                        <td class="foreman">周康辉</td>
                        <td class="foreman">康文苑</td>
                        <td class="mainboard">曹艳察</td>
                        <td class="mainboard">曹艳察</td>
                        <td>黄艇</td>

                    </tr>
                    <tr>
                        <td>12</td>
                        <td class="red">六</td>
                        <td class="chief">樊利强</td>
                        <td class="foreman">周康辉</td>
                        <td class="foreman">康文苑</td>
                        <td class="mainboard">曹艳察</td>
                        <td class="mainboard">曹艳察</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>13</td>
                        <td class="red">日</td>
                        <td class="chief">樊利强</td>
                        <td class="foreman">周康辉</td>
                        <td class="foreman">康文苑</td>
                        <td class="mainboard">曹艳察</td>
                        <td class="mainboard">曹艳察</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>


        </div>
    </div>
</template>


<script src='./dutyRoster.js'>

</script>

<style src="./dutyRoster.styl" lang="stylus" scoped>

</style>
