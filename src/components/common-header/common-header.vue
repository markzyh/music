<template>
  <div class="common-header">
    <img src="@/images/logo@2x.png" alt="" class="header-logo"><span>Music</span>  
  </div>
</template>

<script>
export default {
  name: 'CommonHeader',
  data () {
    return {
      msg:'hahah'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  .common-header{
    text-align: center;
    height: 44px;
    border-bottom: 1px solid #333;
    span{
      line-height: 44px;
      display: inline-block;
      vertical-align: top;
      font-size: 30px;
      margin-left: 10px;
    }
  }
  .header-logo{
    width: 30px;height: 32px;
    margin-top: 6px;
  }
  
</style>
