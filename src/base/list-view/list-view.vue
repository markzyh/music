<template>
  <div class="list-view">
    <scroll
      class="singer-content"
      ref="listview"
      v-if="data.length"
      :listenScroll="listenScroll"
      :probeType="probeType"
      @scroll="scroll"
    >
      <div class="singer-lists">
        <ul
          class="singer-list-panel"
          v-for="(item,index) in data"
          :key="index"
          ref="listgroup"
          :class="{current: currentIndex === index}"
        >
          <h3 class="singer-list-title">{{item.title}}</h3>
          <li v-for="(items,indexs) in item.item" :key="indexs">
            <div class="flex">
              <img v-lazy="items.pic" alt>
              <h4>{{items.name}}</h4>
            </div>
          </li>
        </ul>
      </div>
      <ul
        class="singer-title-list"
        @touchstart="onTouchShortcut"
        @touchmove.stop.prevent="onTouchmoveShortcut"
      >
        <li
          v-for="(item,index) in shortcutLists"
          :key="index"
          :data-index="index"
          :class="{current:currentIndex == index}"
        >{{item}}</li>
      </ul>
      <div class="fixed_title" ref="fixed_title">
        <div >{{fixedTitle}}</div>
      </div>
      <div class="loading-container" v-if="!data.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>
<script>
import Loading from "@/base/loading/loading";
import Scroll from "@/base/scroll/scroll";
const ANCHOR_HEIGHT = 16;
const FIXED_HEIGHT = 30;
export default {
  created() {
    this.touch = {};
    this.listenScroll = true; //是否监听滚动,better-scroll的props
    this.probeType = 3;
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeigth(); //计算高度
      }, 20);
    },
    scrollY(newY) {
      //这边没太听懂
      //newY是betterscroll传过来的,为负值
      //顶部
      if (newY > 0) {
        this.currentIndex = 0;
        return;
      }
      const listHeight = this.listHeight;
      //中间部分
      for (let i = 0; i < listHeight.length - 1; i++) {
        let min = listHeight[i];
        let max = listHeight[i + 1];
        if (-newY >= min && -newY < max) {
          this.currentIndex = i;
          //debugger
          this.diff = max + newY; //当前group的最大高度-偏移的高度,为了后面做判断
          console.log(this.currentIndex);
          return;
        }
      }
      //底部
      this.currentIndex = listHeight.length - 2;
      console.log(listHeight);
      //console.log(this.currentIndex)
    },
    diff(newVal) {
      console.log(newVal)
      let fixedTop;
      if (newVal > 0 && newVal < FIXED_HEIGHT) {//大于0,且小于title的高度,也就是,在group之间滚动时,且下一个title已经顶到当前title时
        fixedTop = newVal - FIXED_HEIGHT;
      }else{
        fixedTop = 0
      }
      this.$refs.fixed_title.style.transform = `translate3d(0,${fixedTop}px,0)`;
    }
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
  data() {
    return {
      scrollY: -1, //Y轴滚动的值
      currentIndex: 0,
      listHeight: [],
      diff: -1 //title和group滚动的上限的差
    };
  },
  methods: {
    //touchmove事件
    onTouchmoveShortcut(e) {
      let firstTouch = e.touches[0];
      this.touch.y2 = firstTouch.pageY; //获取移动时,y轴的位置
      let delta = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0; //移动的位置,几个锚点,取整
      let index = parseInt(this.touch.index) + delta; //偏移的锚点数+初始的点数
      this._scrollTo(index);
    },
    //touch事件
    onTouchShortcut(e) {
      let index = e.target.getAttribute("data-index"); //获取touch的index
      let firstTouch = e.touches[0]; //
      this.touch.y1 = firstTouch.pageY; //获取开始点击时y轴的位置
      this.touch.index = index; //存入对象中
      //console.log(this.touch.y1)
      //this.currentIndex = index;
      //console.log(this.currentIndex);
      this._scrollTo(index); //调用better-scroll插件
    },
    //计算高度,存入数组,把每个group的高度值计算出来,存入到数组中
    _calculateHeigth() {
      this.listHeight = [];
      let list = this.$refs.listgroup;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    //子组件,better-scroll触发的事件,用来获取better-scroll派发的pos位置信息
    scroll(pos) {
      this.scrollY = pos.y; //better-scroll插件派发的pos位置值
    },
    _scrollTo(index) {
      if (!index) {
        return;
      }
      if (index < 0) {
        index = 0;
      } else if (index > this.listHeight.length - 2) {
        //因为左边多一组数组0,且索引要-1
        index = this.listHeight.length - 2;
      }
      this.scrollY = -this.listHeight[index]; //这里是为了让点击btn和movebtn时,改变currentIndex,主要是为了move
      this.$refs.listview.scrollToElement(this.$refs.listgroup[index], 0); //第二个参数的,动画时间
    }
  },
  computed: {
    shortcutLists() {
      return this.data.map(item => {
        return item.title.substr(0, 1);
      });
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return "";
      }
      if (this.data.length) {
        return this.data[this.currentIndex].title;
      }
    }
  }
};
</script>
<style lang="scss">
.fixed_title {
  position: absolute;
  top: 0;
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  background: #333;
  overflow: hidden;
}
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
  li.current {
    color: #ff0000;
  }
}
.singer-content,
.list-view {
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
.singer-lists {
  padding-bottom: 30px;
}
</style>



