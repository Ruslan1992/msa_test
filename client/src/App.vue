<template>
  <div id="app">
    <router-view />
    <div class="message" v-if="messages.isMessage">{{ messages.message }}</div>
    <div class="loading__wrapper" v-if="loading">
      <div class="lds-dual-ring"></div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    messages() {
      if (this.$store.state.message) {
        return {
          isMessage: true,
          message: this.$store.state.message
        };
      } else {
        return {
          isMessage: false
        };
      }
    },
    loading() {
      return this.$store.state.loading;
    }
  }
};
</script>

<style lang="scss">
body,
html {
  margin: 0;
  padding: 0;
}
* {
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 25px;
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

.message {
  width: 240px;
  padding: 15px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  position: fixed;
  top: 20px;
  right: 20px;
  border-radius: 4px;
}
.loading__wrapper{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.15);
  z-index: 10;
}
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
