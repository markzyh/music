<template>
  <div class="recommend">
      <slider :sliders="slider" v-if="slider.length">
      </slider>
  </div>
</template>

<script>
import axios from 'axios'
import Slider from '@/base/slider/slider'
import {getRecommend} from '@/api/recommend'
import {ERR_OK} from '@/api/config'
export default {
  name: 'Recommend',
  components:{
    Slider
  },
  data () {
    return {
      slider:[]
    }
  },
  /* created(){
    this._getRecommend()
  }, */
  mounted(){
    this._getRecommend()
  },
  methods:{
    _getRecommend(){
      getRecommend().then(res =>{
        if(res.code == ERR_OK){
          this.slider = res.data.slider
          //console.log(res.data.slider)
        }
      })
    }
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>

  
</style>
