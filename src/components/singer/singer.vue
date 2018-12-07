<template>
  <div class="singer">Singer</div>
</template>

<script>
import { ERR_OK } from "@/api/config";
import { getSingerList } from "@/api/singer";
export default {
  name: "Singer",
  data() {
    return {
      singerList: []
    };
  },
  created() {
    this._getSingerList();
  },
  methods: {
    //处理数组
    _normaalizeSinger(list) {
      const HOT_NAME = "热门";
      const HOT_NAME_LEN = 10;
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };
      //遍历数组
      list.forEach((items, index) => {
        if (index < HOT_NAME_LEN) {
          map.hot.items.push({
            id: items.Fsinger_mid,
            name: items.Fsinger_name,
            pic: `https://y.gtimg.cn/music/photo_new/T001R150x150M00000"${
              items.Fsinger_mid
            }.jpg?max_age=2592000`
          });
        }
        //拼音缩写
        const key = items.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push({
          id: items.Fsinger_mid,
          name: items.Fsinger_name,
          pic: `https://y.gtimg.cn/music/photo_new/T001R150x150M00000"${
            items.Fsinger_mid
          }.jpg?max_age=2592000`
        });
      });
      //处理按拼音排序
      let hot = [];
      let ret = [];
      for(let key in map){
        let val = map[key]
        if(val.title === HOT_NAME){
          hot.push(val)
        }else if(val.title.match(/[a-zA-Z]/)){
          ret.push(val)
        }
      }
      //sort方法
      ret.sort((a,b) =>{
        return a.title.charCodeAt(0) - b.title.charCodeAt(0) //如果a<b,则a排在前面 
      })
      return hot.concat(ret)
      //return map;
    },
    _getSingerList() {
      getSingerList()
        .then(res => {
          if (res.code == ERR_OK) {
            this.singerList = res.data.list;
            console.log(this.singerList);

            console.log(this._normaalizeSinger(this.singerList));
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
</style>
