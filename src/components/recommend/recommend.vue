<template>
  <div class="recommend">
      <slider :sliders="slider" v-if="slider.length">
      </slider>
      <ul class="recommend-disc"> 
        <router-link tag="li" v-for="(item,index) in musicDiscList" :key="index" :to="'/recommend/'+item.dissid">
          <div class="recommend-disc-img">
               <img :src="item.imgurl" :alt="item.creator.name">
          </div>
          <div class="recommend-disc-text">
            <h3>{{item.creator.name}}</h3>
            <p>{{item.dissname}}</p>
          </div> 
        </router-link>
      </ul>
  </div>
</template>
<script>
import axios from 'axios'
import Slider from '@/base/slider/slider'
import {getRecommend,getDiscList} from '@/api/recommend'
import {ERR_OK} from '@/api/config'
export default {
  name: 'Recommend',
  components:{
    Slider
  },
  data () {
    return {
      slider:[],
      musicDiscList:[]
    }
  },
  /* created(){
    this._getRecommend()
  }, */
  mounted(){
    this._getRecommend()
    this._getDiscList()
  },
  methods:{
    _getRecommend(){
      getRecommend().then(res =>{
        if(res.code == ERR_OK){
          this.slider = res.data.slider
        }
      })
    },
    _getDiscList(){
      getDiscList().then(res =>{
        if(res.code == ERR_OK){
          this.musicDiscList = res.data.list
          console.log(this.musicDiscList)
        }
      })
    }
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.recommend-disc{
  li{
    display: -ms-flexbox;
    display: flex;
    box-sizing: border-box;
    -ms-flex-align: center;
    align-items: center;
    padding: 0 20px 20px 20px;
  }
}
    
.recommend-disc-img{
  flex: 0 0 60px;
  width: 100px;
  padding-right: 20px;
  img{
    width: 60px;
  }
}
.recommend-disc-text{
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex: 1;
    flex: 1;
    line-height: 20px;
    overflow: hidden;
    font-size: 14px;
}
  
</style>
