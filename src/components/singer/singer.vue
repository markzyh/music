<template>
  <div class="Singer">
      Singer
  </div>
</template>

<script>
import {ERR_OK} from '@/api/config'
import {getSingerList} from '@/api/singer'
export default {
  name: 'Singer',
  data () {
    return {
      singerList:[]
    }
  },
  mounted(){
    this._getSingerList()
  },
  methods:{
    _getSingerList(){
      getSingerList().then(res =>{
        if(this.data.code == ERR_OK)
        console.log(0)
        console.log(res)
      }).catch(err =>{
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>

  
</style>
