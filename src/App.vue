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
</style>

