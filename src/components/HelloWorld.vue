<template>
  <div class="hello">
    <h3>购物车</h3>
    <div>
      <ul class="cc">
          <li class="w40 line40">商品信息</li>
          <li class="w15  line40">商品金额</li>
          <li class="w15  line40">商品数量</li>
          <li class="w15  line40">总金额</li>
          <li class="w15  line40">编辑</li>
      </ul>
    </div>
    <div class="shop">
      <ul class="c100">
          <li class="w40 positr" v-for="(item, index) in productList" :key="index">
            <div class="w40">
              <!-- <img class="posit head1 wh20" src="../assets/img/check.png" :style="{'src':item.checked}" @click="check(item)"> -->
              <p class="posit head1 wh20 check" @click="selectorcheck(item)" :class="{'checked': item.checked}"></p>
                <div class="lr ml20">
                  <div class="mr20p"><img :src="item.productImage" height="65" width="65" alt="香烟"></div>
                  <div>
                    <p class="line0">{{item.productName}}</p>
                    <p class="line0">
                      <span>赠送：</span>
                      <span v-for="part in item.parts" >{{part.partsName}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    </p>
                  </div>
                </div>              
            </div>
            <div class="w15 line70">{{item.productPrice | formMoney}}</div><!--商品单价-->
            <div class="w15 line70">
              <span class="head1" @click="changeMoney(item, -1)">-</span>
              <span class="number" v-model="item.productQuantity">{{item.productQuantity}}</span><!--商品数量-->
              <span class="head1" @click="changeMoney(item, 1)">+</span>
            </div>
            <div class="w15 line70">{{item.productPrice*item.productQuantity | formMoneyYuan}}</div><!--商品金额 = 商品数量*商品单价-->
            <div class="w15 line70 head1" @click="delshow(item)">删除</div>
          </li>
      </ul> 
      <div class="flex11 ml80">
        <div class="flex11">
          <p class="head1 wh20 check" @click="checkAll(true)" :class="{'checked': checkAllFlag}"></p>
          <p class="colorred head1">全选</p>
          <p class="head1" @click="checkAll(false)">取消全选</p>          
        </div>
        <div class="flex11">
          <p class="line40">{{totalPrice  | formMoneyYuan}}</p><!--总金额-->
          <p @click="toAddress" class="add head1">结算</p>
          <!-- <router-link to="/address" class="add head1">结算</router-link> -->
        </div>
      </div>     
    </div>
    
    <div class="del-content" id="del-content">
      <div class="mask" id="mask"></div>
      <div class="mask-content" v-show="show">
        <h2>您确定要删除商品？</h2>
        <div class="lr">
          <p class="pline" @click="delproduct()">确定</p>
          <p @click="exit">取消</p>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
// import axios from 'axios'
import data from '../assets/data/cartData.json'//模拟数据

export default {
  name: 'HelloWorld',
  data () {
    return {
      totalMoney:0,//商品总金额
      productList:[],//商品列表
      checkAllFlag:false,//全选
      totalPrice:0,//选中后计算的价格
      number:0,//总的商品数量
      totalNumber:0,//后台提供的数据总和
      width:0,
      height: 0,
      show: false,
      curlProduct: '',
    }
  },
  /*beforeDestroy(){
    console.log( this.totalPrice)
    vm.$emit('H-totalPrice', this.totalPrice)
    console.log('err')
  },*/
  methods:{
    toAddress(totalPrice){
      // this.$root.Event.$emit('H-totalPrice', this.totalPrice)
      // console.log(this.totalPrice)
      // this.$router.push({ path: '/address' })
      this.$router.push({path: '/address', query:{ztotalPrice: this.totalPrice}})
      

    },
    delproduct(){//模拟数组的删除
      let index = this.productList.indexOf(this.curlProduct);
      this.productList.splice(index, 1)
      this.show = false;
    },
    exit(){//点击取消按钮隐藏
      this.show = false;
    },
    delshow(item){
      this.show = true;
      this.curlProduct = item
      // console.log(item)
    },
    del(){//删除商品功能
      // console.log(width+'---'+height)
      // document.querySelector('#mask').style.width = this.width+'px';
      // document.querySelector('#mask').style.height = this.height+'px';
      // document.querySelector('#del-content').style.width = this.width+'px';
      // document.querySelector('#del-content').style.height = this.height+'px';
      /*console.log(document.querySelector('#mask').style.width)
      console.log(this.width+'---'+this.height)
      document.querySelector('#mask').style.backgroundColor='#ccc';*/

    },
    calcTotalPrice(){//计算总金额
      this.totalPrice = 0;
      let _this = this
      this.productList.forEach(function(item, index){
        if(item.checked){
          _this.totalPrice += item.productPrice*item.productQuantity
        }
        
      })
    },
    checkAll(flag){//全选
      this.checkAllFlag = flag
      let _this = this

        this.productList.forEach(function(item, index){
          if(typeof item.checked == 'undefined'){
              _this.$set(item,'checked', _this.checkAllFlag)
              // _this.number++
            }else{
              item.checked = _this.checkAllFlag;                 
            }  
           // 判断是否选中数量是否和后台一致
            if(_this.checkAllFlag){
              _this.number = 3
            }else if(_this.checkAllFlag == false){
              _this.number = 0
            }       
        })
        this.calcTotalPrice()
    },
    selectorcheck(item){//选中商品
      // console.log(item)
      if(typeof item.checked == 'undefined'){
        this.$set(item,'checked', true)
        this.number++
        // console.log(this.number)
      }else{
        item.checked = !item.checked
        if(item.checked){
          this.number++
        }else{
          this.number--
        }
        //console.log(this.number)//打印商品选中的数量
      }

      if(this.number === this.totalNumber){
          this.checkAllFlag = true
        }else if(this.number != this.totalNumber){
          this.checkAllFlag = false
        }      


      this.calcTotalPrice();
    },
    changeMoney(product, way){//计算单个商品总金额
      if(way>0){
        product.productQuantity++
      }else{
        if(product.productQuantity <= 1){
          product.productQuantity = 1
        }else{
          product.productQuantity--
        }
      }
      this.calcTotalPrice()
    }
  },
  mounted(){
      console.log(data)
      this.productList = data.result.list;//商品列表
      this.totalMoney = data.result.totalMoney;//商品总金额
      this.totalNumber = data.result.list.length;//总的商品数量

      this.width = document.body.clientWidth;
      this.height = document.body.clientHeight;
  },
  filters:{
    /*formMoney:function(value){
      return "￥"+value.toFixed(2)//保留两位小数
    }*/
    formMoney(value){
      return "￥"+value.toFixed(2)
    },
    formMoneyYuan(value){
      return "￥"+value.toFixed(2)+"元"
    }    

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cc {
  height: 40px;
  background-color: #ccc;
  width: 100%;
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}
.line40 {
  line-height: 40px;
}
.w40 {
  width: 40%;
}
.wh20 {
  width: 20px;
  height: 20px;
}
.w15 {
  width: 15%;
}

.c100 {
  list-style: none;
    /*display: flex;*/
    display: flex;
    flex-direction: column;
}
.c100 li {
  width: 100%;
      margin-bottom: 20px;
}
.line0 {
  line-height: 10px;
}
.lr {
      display: flex;
}
.positr {
  position: relative;
  display:flex;
}
.posit {
      position: absolute;
    left: 4%;
    top: 8%;
}
.ml20{
  margin-left: 20%;
}
.mr20p {
  margin-right: 20px;
}
.number {
      width: 40px;
    height: 35px;
    display: inline-block;
    border: 1px solid #ccc;
    margin: 0 5px;
        text-align: center;
    line-height: 35px;
}
.line70 {
  line-height: 70px;
}
.flex11 {
  display: flex;
}
.ml80 {
      /*margin-left: 80px;*/
          display: flex;
    justify-content: space-between;
        padding: 0 83px;
}
.ml80 p {
  margin-right: 25px;
}
.colorred {
  color: red;
}
.add  {
  width: 150px;
    height: 40px;
    background: red;
    line-height: 40px;
    color: #fff;
}
.line40 {
  line-height: 40px;
}
.head1{
  cursor:pointer;
}
.wh20 {
  width: 20px;
  height: 20px;
}
.check {
  background-image: url('../assets/img/check.png');
  background-size: cover;
}
.checked {
  background-image: url('../assets/img/checked.png');
  background-size: cover;
}

.mask-content{
    width: 300px;
    height: 120px;
    background-color: orange;
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
.lr p {
  width: 50%;
  cursor: pointer;
}
.pline {
  border-right: 1px solid #ccc;
}
.mask {
  position: absolute;
  z-index: 100;
}
</style>
