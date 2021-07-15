<template>
  <div class='home'>
    <header>
      <label><input v-model='keyword' :placeholder='search_ico'></label>
      <button class='search-btn' @click='search'>搜索</button>
    </header>
    <aside class='animated bounceInLeft'>
      <ul>
        <li v-for='(menu,index) in goods_cls'
        :key='index'
        :class='{"ac":cur_goods_cls==menu.id}'
        @click='changeMenu(index)'>
        {{menu.name}}
        </li>
      </ul>
    </aside>
    <div style='width:100%;overflow:hidden;'>
      <div class='order-bar animated bounceInright'>
        <div class='order-class'
        v-for='(item,index) in goods_cls'
        :key='index'>
        <h3>{{item.name}}</h3>
        <ul class='good-list'>
          <li v-for='(id,index) in item.goods'
          :key='index'>
          <router-link :to='{name:"detail",params:{item:goods[id]}}'>
            <img :src='goods[id].img'/>
          </router-link>
          <h4>{{goods[id].name}}</h4>
          <p class='ellipsis'>{{goods[id].describe}}</p>
          <strong>￥{{goods[id].price}}</strong>
          <button @click='order(goods[id],$event)'
          :class='["pointer-btn",goods[id].checked?"ac":""]'
          :disabled='goods[id].checked'
          ><b>点餐</b><i>已点</i></button>

          </li>
        </ul>
        </div>
      </div>
    </div>

      <footer>
        <div class='shoping-cart animated'
          :class='{"bounceInUp":showShoppingCart,"shoping-list-slide":showShoppingCart}'>
        
        <div class='empty'>
            <span class='icon-trash' @click='clearShopping'></span>
          </div>
        <ul v-if='shopping_cart.length>0'>
        <li v-for='(item,index) in shopping_cart'
        :key='index'>
        {{item.name}}<em>￥{{item.price}}</em>
        <div>
        <button class='shoping-sub icon-minus'
        @click='s_sub(item,index)'></button>
      <span>{{item.num}}</span>
      <button class='shoping-add icon-plus'
      @click='s_add(item)'></button>
      </div>
      </li>
          </ul>
        <ul v-else>
          <li style='text-algin:center'>你还没有点餐哦！</li>
          </ul>
          <!-- 给抛物线用的-->
           <button id='shoppingBtn'
           class='shopping-btn icon-shopping-cart'
           @click='showShoppingCart = !showShoppingCart'></button>
           <span class='count' >{{totalNum}}</span>
           </div>
          <!-- 底部菜单-->
          <div class='cont'>
            <div class='order-pointer-footer'>
              <div class='total'>
                <em>￥{{totalPrice}}</em>
                </div>
                <a v-if='totalNum>0' class='pay-btn'
                  @click='pay'>去下单</a>

            </div>
          </div>
          </footer>
          <!-- 横态层-->
          <div class='modal' :class='{"hide":!showShoppingCart}'
          @click='showShoppingCart = !showShoppingCart'>
          </div>
    </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
import par from '../assets/js/parabola.js'
export default {
  name:'home',
  data(){
    return{
      keyword:'',
      search_ico:'\ue903 请输入搜索内容',
      goods:[],
      goods_cls:[],
      cur_goods_cls:0,
      showShoppingCart:true,
      shopping_cart:[
        
      ],
      totalPrice:0,
      totalNum:0
    };
  },
  methods:{
    search(){
      if(this.keyword==''){
        alert('请输入搜索的关键字')
      }else {
        this.$store.commit('update_keywords',this.keyword)
        this.$router.push('/list')
      }
    },
    changeMenu(index){
      let aUl = $('.order-class') 
      $(window).scrollTop(aUl.eq(index).position().top)
    },
    order(goods,event){
      this.shopping_cart.push({
        id:goods.id,
        name:goods.name,
        price:goods.price,
        num:1
      })
      let el=$('<div class="parabola-el"></div>')
      $(document.body).append(el)
      new par.parabola({
        origin:event.target,
        target:'#shoppingBtn',
        element:el,
        time:500,
        a:0.01,
        callback(el){
          el.remove()
        }
      }).move()
    },
    clearShopping(){
      this.shopping_cart = []
      this.showShoppingCart = false

    },
    winScroll(){
      let _this = this
      let scrollTop = $(window).scrollTop()
      let oItem = $('.order-class')
      oItem.each(function(i){
        if($(this).offset().top <scrollTop +200){
          _this.cur_goods_cls = i +1
        }
      })
    },
    pay(){
      this.$router.push({
        name:'pay',
        params:{
          totalPrice:this.totalPrice
        }
      })

    },
    s_sub(item,index){
      item.num--
      if(item.num==0){
         this.shopping_cart.splice(index,1)
      }
    },
    s_add(item){
      item.num++
    }
  },
  created(){
    axios.get('/data.json').then((res)=>{
      this.goods = res.data.goods;
      this.goods_cls = res.data.goods_cls;
      this.$store.commit('update_goods',this.goods)
    });
    this.$store.commit('update_shopping_cart',this.shopping_cart)

    this.$router.beforeEach((to,from,next)=>{
      this.keyword = ''
      this.showShoppingCart = false
      next()
    })
  },
  mounted(){
    window.addEventListener('scroll',this.winScroll)
  },
  watch:{
    shopping_cart:{
      handler(curval){
        this.totalNum = this.totalPrice = 0
        for(let key in this.goods){
          this.goods[key].checked = false
        }
        curval.forEach((item)=>{
          this.totalNum += item.num
          this.totalPrice += item.num*item.price
          this.goods[item.id].checked = true
        })
        this.$store.commit('update_shopping_cart',this.shopping_cart)
      },
      deep:true
    }
  }
};

</script>