<template>
  <div class="singer">
    <list-view :data="singerList"></list-view>
  </div>
</template>

<script>

import ListView from "@/base/list-view/list-view";
import { ERR_OK } from "@/api/config";
import { getSingerList } from "@/api/singer";
export default {
  name: "Singer",
  components: {
    ListView
  },
  data() {
    return {
      singerList: [],
    };
  },
  created() {
    this._getSingerList();
  },
  methods: {
    _normalizeSingerList(list) {
      let HOT_NAME = "热门";
      let HOT_NAME_LEN = 10;
      //数据结构,map对象,分为hot,和拼音缩写等
      //下面是hot
      let map = {
        hot: {
          title: HOT_NAME,
          item: []
        }
      };
      list.forEach((item, index) => {
        //先寫入hot對象
        if (index < HOT_NAME_LEN) {
          map.hot.item.push({
            id: item.Fsinger_mid,
            name: item.Fsinger_name,
            pic: `http://y.gtimg.cn/music/photo_new/T001R150x150M000${
              item.Fsinger_mid
            }.jpg?max_age=2592000`
          });
        }
        //按照拼音縮寫劃分
        let key = item.Findex;
        if (!map[key]) {
          //如果map下索引不存在,就創建
          map[key] = {
            title: item.Findex,
            item: []
          };
        }
        map[key].item.push({
          id: item.Fsinger_mid,
          name: item.Fsinger_name,
          pic: `http://y.gtimg.cn/music/photo_new/T001R150x150M000${
            item.Fsinger_mid
          }.jpg?max_age=2592000`
        });
      });
      //因為對象是無序的,所以需要把對象轉換為數組----------為啥變成繁體字
      let hot = []; //热门数组
      let ret = []; //剩下的数组
      for (let key in map) {
        let val = map[key];
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(map[key]);
        } else if (val.title === HOT_NAME) {
          hot.push(map[key]);
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return hot.concat(ret);
    },
    _getSingerList() {
      getSingerList()
        .then(res => {
          if (res.code == ERR_OK) {
            this.singerList = res.data.list;
            // console.log(this.singerList);對象時
            this.singerList = this._normalizeSingerList(this.singerList); //序列化数据
            console.log(this.singerList);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.singer{
  position: fixed;
  overflow: hidden;
  width: 100%;

  top: 88px;
  bottom: 0;
}
</style>
