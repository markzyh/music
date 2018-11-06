<template>
  <div class="slider">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item, index) in sliders" :key="index">
        <a :href="item.linkUrl"><img :src="item.picUrl" alt=""></a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div> 
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "Slider",
  props: {
    sliders: {
      type: Array
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  mounted() {
    /* setInterval(() => {
        //console.log('simulate async data')
        if (this.swiperSlides.length < 10) {
          this.swiperSlides.push(this.swiperSlides.length + 1)
        }
      }, 3000) */
  },
  methods: {},
  destroyed() {
    this.swiperOption.autoplay = false;
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        },
        loop: true,
        autoplay: {
          disableOnInteraction: true,
          delay : 1000,
        },
/*         on: {
          touchEnd: function(event) {
            this.autoplay.start = true
            console.log(0)
          }
        } */
      },
      swiperSlides: [1, 2]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.slider {
  width: 100%;
  .slider-panel {
    width: 100%;
    height: 100%;
  }
  img {
    width: 100%;
  }
}
.slider-wrap {
}
</style>
