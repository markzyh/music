<template>
  <div class="list-view">
    <scroll class="singer-content" ref="scroll" v-if="data.length">
      <div class="singer-lists">
        <ul class="singer-list-panel" v-for="(item,index) in data" :key="index">
          <h3 class="singer-list-title">{{item.title}}</h3>
          <li v-for="(items,indexs) in item.item" :key="indexs">
            <div class="flex">
              <img v-lazy="items.pic" alt>
              <h4>{{items.name}}</h4>
            </div>
          </li>
        </ul>
      </div>
      <ul class="singer-title-list" @touchstart="onTouchShortcut">
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
export default {
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
    onTouchShortcut(e){
      console.log(e.target.getAttribute('data-index'))
      return e.target.getAttribute('data-index')
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



