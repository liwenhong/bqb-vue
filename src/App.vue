<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default{
    name: 'App'
  }
</script>
<style lang="scss">
.loading{
  background: url(../static/img/loading.gif) no-repeat center;
  background-size: 35%;
  opacity: .5;
}
.el-upload--picture-card{
  border: 0 !important;
}
.bq-describe{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 36px;
}
.common-imgwidth {
  width: 200px
}
</style>

