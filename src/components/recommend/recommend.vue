<template>
  <div class="Recommend">
      Recommend
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

    }
  },
  created(){
    this._getRecommend()
  },
  methods:{
    _getRecommend(){
      getRecommend().then((res) =>{
        if( res.code === ERR_OK){
          console.log(0)
          console.log(res.data.slider)
        }
      })
      /* axios.get('https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg')
      .then(res =>{
        console.log(res)
      }).catch(err =>{
        console.log(err)
      }) */
    }
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>

  
</style>
