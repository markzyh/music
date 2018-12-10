<template>
  <div class="list-view">
    <scroll class="singer-content" ref="listview" v-if="data.length">
      <div class="singer-lists">
        <ul class="singer-list-panel" v-for="(item,index) in data" :key="index" ref="listgroup">
          <h3 class="singer-list-title">{{item.title}}</h3>
          <li v-for="(items,indexs) in item.item" :key="indexs">
            <div class="flex">
              <img v-lazy="items.pic" alt>
              <h4>{{items.name}}</h4>
            </div>
          </li>
        </ul>
      </div>
      <ul class="singer-title-list" @touchstart="onTouchShortcut" @touchmove.stop.prevent="onTouchmoveShortcut">
        <li v-for="(item,index) in shortcutLists" :key="index" :data-index="index">{{item}}</li>
      </ul>
    </scroll>
    <div class="loading-container" v-if="!data.length">
      <loading></loading>
    </div>
  </div>
</template>
<script>
import Loading from "@/base/loading/loading";
import Scroll from "@/base/scroll/scroll";
let ANCHOR_HEIGHT = 16
export default {
  created(){
    this.touch = {}
  },
  components: {
    Loading,
    Scroll
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  methods:{
    onTouchmoveShortcut(e){
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY//获取移动时,y轴的位置
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      let index = parseInt(this.touch.index) + delta
      //console.log(index)
    },
    onTouchShortcut(e){
      let index = e.target.getAttribute('data-index')//获取touch的index
      let firstTouch = e.touches[0]//
      this.touch.y1 = firstTouch.pageY//获取开始点击时y轴的位置
      this.touch.index = index//存入对象中
      //console.log(this.touch.y1)
      this._scrollTo(index)//调用better-scroll插件
    },
    _scrollTo(index){
      this.$refs.listview.scrollToElement(this.$refs.listgroup[index],0)
    }
  },
  computed: {
    shortcutLists() {
      return this.data.map(item => {
        return item.title.substr(0, 1);
      });
    }
  }
};
</script>
<style lang="scss">
.singer-title-list {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  width: 20px;
  padding: 20px 0;
  border-radius: 10px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
  font-family: Helvetica;
  li {
    line-height: 1.5;
  }
}
.singer-content,.list-view {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.singer-list-title {
  width: 100%;
  height: 30px;

  line-height: 30px;
  padding-left: 20px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  background: #333;
}
.singer-list-panel {
  .flex {
    display: flex;
    align-items: center;
  }
  li {
    padding: 20px 0 10px 30px;
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 20px;
  }
}
.singer-lists{
    padding-bottom: 30px;
}
</style>



