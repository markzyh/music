<template>
  <div class="Recommend">
      <img v-for="(item,index) in slider" :key="index" :src="item.picUrl" alt="">
  </div>
</template>

<script>
import axios from 'axios'
import {getRecommend} from '@/api/recommend'
import {ERR_OK} from '@/api/config'
export default {
  name: 'Recommend',
  data () {
    return {
      slider:[]
    }
  },
  created(){
    this._getRecommend()
  },
  methods:{
    _getRecommend(){
      getRecommend().then(res =>{
        if( res.code === ERR_OK){
          this.slider = res.data.slider
          console.log(this.slider)
        }
      })
    }
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>

  
</style>
