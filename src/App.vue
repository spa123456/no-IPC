<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

/* 滚动条样式 */
::-webkit-scrollbar,
::-webkit-scrollbar {
  width: 5px;
  height: 10px;
}
::-webkit-scrollbar-track,
::-webkit-scrollbar-track {
  background: rgb(239, 239, 239);
  border-radius: 2px;
}
::-webkit-scrollbar-thumb,
::-webkit-scrollbar-thumb {
  background: #bfbfbf;
}
::-webkit-scrollbar-thumb:hover,
::-webkit-scrollbar-thumb:hover {
  background: #333;
}
::-webkit-scrollbar-corner,
::-webkit-scrollbar-corner {
  background: #179a16;
}
</style>
