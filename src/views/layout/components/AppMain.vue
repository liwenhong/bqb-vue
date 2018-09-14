<template>
  <section class="app-main" style="min-height: 100%">
    <transition name="fade" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    }
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>
<style>
.app-main{
  margin: 20px;
}
.filter-container .filter-item {
  font-size: 14px;
  margin-right: 10px;
  display: inline-block;
  margin-bottom: 10px;
}
.filter-container .filter-item .form-input{
  width: 200px;
}
.filter-container .filter-item label {
  font-weight: normal;
}
ul {
  list-style-type: none;
}
</style>

