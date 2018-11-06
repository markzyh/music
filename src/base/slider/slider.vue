<template>
  <div class="slider" ref="sliderGroup">
    <div v-for="(item,index) in sliders" :key="index" class="slider-panel">
      <a :href="item.linkUrl">
        <img  :src="item.picUrl" alt="">
      </a>
    </div>  
  </div>
</template>

<script>
import Bscroll from "better-scroll";
export default {
  name: "Slider",
  props: {
    sliders: {
      type: Array
    },
    loop: {
      type: Boolean,
      default: false
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    interval: {
        type: Number,
        default: 2000
    }
  },
  mounted(){   
      setTimeout( ()=>{
        this.setSliderWidth()
      },20)
  },
  methods:{
      setSliderWidth(){
        this.children = this.$refs.sliderGroup.children
        console.log(this.$refs.sliderGroup.clientWidth)
        console.log(this.children.length)
      }
  },
  data() {
    return {
        children:''
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>

.slider{
  width: 100%;
  .slider-panel{
    width: 100%;
    height: 100%;
  }
  img{
    width: 100%;
  }
}
</style>
