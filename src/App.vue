<template>
  <div id="app">
    <common-header></common-header>
    <tab></tab>  

    <router-view/>
  </div>
</template>

<script>
import CommonHeader from 'components/common-header/common-header'
import Tab from 'components/tab/tab'
export default {
  components:{
    CommonHeader,Tab
  },
  name: 'App'
}
</script>

<style>
* { box-sizing:border-box; -webkit-box-sizing:border-box; -moz-box-sizing:border-box; font-family: "幼圆"; margin:0; padding:0;}
body { line-height: 1.6em; color: #333; font-size: 16px;background: #222;}
a { text-decoration: none; color: #333; border:none; outline: none;}
a:focus,img { border:none;}
a:focus { outline: none;}
ul,li { list-style: none;}
input,select { border: none; -webkit-appearance:none;}
table { border-collapse: collapse;border-spacing: 0;}
h1, h2, h3, h4, h5, h6 { font-weight: normal; }
em, i, address {font-style: normal;}
.clear { zoom:1;}
.clear:after { height: 0; display: block; content: "\20"; clear: both;}
.fl { float: left;}
.fr { float: right;}
.mc { margin:0 auto;}
.dis-inline { display: inline-block; vertical-align: middle;}
.text-center { text-align: center;}
.table-cell { vertical-align: middle; display: table-cell; }
#app{
      background: #222;
    color: #fff;
}
</style>
