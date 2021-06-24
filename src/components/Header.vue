<template>
  <header>
    <img src="../assets/logo.svg" alt="Logo">
    <h3>Regex Tester</h3>
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style scoped>
header {
  height: auto;
  background: #14213d;
  color: white;
  display: flex;
  align-content: center;
  align-items: center;
  padding-left: 35px;
}
header img {
  width: 30px;
}
h3 {
  margin: 10px 5px;
  font-size: 20px;
}
</style>
