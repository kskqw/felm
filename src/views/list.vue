<template>
    <div class='list'>
        <header>
            <h1>搜索结果</h1>
            <router-link to='/home'
            class='goback-btn icon-chevron-left'>
            </router-link>
            <span class='total'>共{{search_list.length}}条</span>
        </header>
        <ul id='scrollMenu' class='good-list'>
            <li v-for='(item,index) in search_list'
            :key='index'>
            <img :src='item.img' @click='detail(item)'/>
            <h4>{{item.name}}</h4>
            <p>{{item.describe}}</p>
            <strong>￥{{item.price}}</strong>
            <button @click='point(item)'
            :class='["pointer-btn",item.checked?"ac":""]'
            :disabled = 'item.checked'>
            <b>点餐</b><i>已点</i></button>
            </li>
        </ul>
        <div v-if='search_list.length==0'>没有搜到结果</div>
    </div>
</template> 
<script>
export default({
    name:'list',
    data(){
        return {
            keyword:'',
            search_list:[],
            shopping_cart:[]
        }
    },
    created(){
        this.keyword = this.$store.state.keyword
        this.goods = this.$store.state.goods
        this.shopping_cart = this.$store.shopping_cart

        for(let key in this.goods){
            //includes() 方法用来判断一个数组是否包含一个指定的值，如果是返回 true，否则false。
            if(this.goods[key].name.includes(this.keyword) && this.keyword!=''){
                this.search_list.push(this.goods[key])
            }
          
        }
    },
    methods:{
        point(item){
            this.shopping_cart.push({
                id:item.id,
                name:item.name,
                price:item.price,
                num:1
            })
            this.$store.commit('update_shopping_cart',this.shopping_cart)
        },
   
    detail(item){
      this.$router.push({name:'detail',params:{item}})
        }
    }
})
</script>