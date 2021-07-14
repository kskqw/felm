<template>
    <div class='pay bounceInDown animated'>
        <h2>订单提交成功</h2>
        <p>订单总额：
            <em style='color:red;font-size:.3rem'>
                {{$route.params.totalPrice}}
            </em>元
        </p>
        <h3>订单编号：
            <p class='order-num'>1234234324</p>
            </h3>
        <p><button class='pay-btn'>去付款</button></p>
        <p>
            <button class='goback-btn' @click=goback>返回主菜单</button>
        </p>
    </div>
</template>
<script>
export default({
    name:'pay',
    methods:{
        goback(){
            this.$router.push('home')
        }
    }
})
</script>