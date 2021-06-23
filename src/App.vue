<template>
  <Header></Header>
  <Body></Body>
</template>

<script>
import Header from './components/Header.vue'
import Body from './components/Body.vue'
export default {
  name: 'App',
  components: {
    Header,
    Body
  }
 
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

</style>
