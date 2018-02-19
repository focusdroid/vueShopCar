<template>
	<div id="address">
		<h2>配送地址</h2>
		<div class="address">
			<ul>
			    <li v-for="(item, index) in filterAddress" :key="index" :class="{'check':index == currentIndex}" @click="currentIndex=index">
			    	<p>{{item.userName}}</p>
			    	<p>{{item.streetName}}</p>
			    	<p>{{item.tel}}</p>
			    	<p class="orange" v-if="!item.isDefault" @click="setDefault(item.addressId)">设为默认</p>
			    	<p class="orange" v-if="item.isDefault">默认地址</p>
			    </li>
					    		    
			</ul>
			<!-- <p class="mt30" @click="limitNum = addressList.length">more &gt;</p> 下面这种方法也行-->
			<p class="mt30" @click="loadAddress">more &gt;</p>
		</div>
	</div>
</template>
<script>
	import addressData from '../assets/data/address.json'

	export default{
		data(){
			return {
				limitNum: 3,
				addressList: [],
				currentIndex: 0,
			}
		},
		methods:{
			loadAddress(){
				this.limitNum = this.addressList.length;
			},
			setDefault(addressId){//判断是否为默认
				this.addressList.forEach(function(address, index){
					if(address.addressId==addressId){
						address.isDefault = true;
					}else{
						address.isDefault = false;
					}
				}, )
			},
		},
		mounted(){
			console.log(addressData)
			this.addressList = addressData.result
			console.log(this.addressList)

		},
		computed:{//在computed中计算数据之后渲染
			filterAddress(){
				return this.addressList.slice(0, this.limitNum)
			}
		},
		/*updated(){
			console.log(this.currentIndex)
		},*/
	}
</script>
<style>
* {
	margin: 0;
	padding:0;
}
	ul {
		list-style: none;
		width:100%;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
	}
	ul li {
		width: 20%;
		border: 1px solid #ccc;
		text-align:left;
		padding-left:10px;
		margin-top: 30px;
	}
	/* ul li:hover {
		border-color: orange;
	} */
	.check {
		border-color: orange;
	}
	ul li p {
		line-height: 35px;
	}
	.orange {
		color: orange;
		cursor: pointer;
	}
	.mt30 {
		margin-top: 30px;
		font-size: 20px;
		cursor: pointer;
	}
</style>









<!-- <template>
	<div id="address">
		<h2>address-{{totalPriceAdd}}</h2>
		
	</div>
</template>
<script>
	export default{
		data(){
			return {
				totalPriceAdd: this.$route.query.ztotalPriceAdd,
			}
		},
		beforeMount(){
			/*this.$root.Event.$on('H-totalPrice', function(a){
				this.totalPriceAdd = a
				console.log(a)
				console.log(a)
			}.bind(this))*/
			 this.totalPriceAdd = this.$route.query.ztotalPriceAdd
			console.log(this.$route.query.ztotalPrice)
		}
	}
</script>
<style>
	
</style> -->