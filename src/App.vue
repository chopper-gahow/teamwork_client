<template>
  <div id="app">
    <router-view name="head"/>
    <router-view name="main"/>
  </div>
</template>
<script>
export default {
  data(){
        return{
          begintime:'',
          differTime:''
        }
  },
  mounted(){
    window.addEventListener("unload", () =>{
        this.differTime = new Date().getTime() - this.beginTime;
        console.log(this.differTime);
        if(this.differTime <= 5){
          var data = localStorage.getItem('username')
          this.$axios({
            method:'get',
            url:'/login/outlogin?username=' + data
          })
          .then(()=>{
            localStorage.clear()
          })
        }
        
    })
    window.addEventListener("beforeunload", () => {
        this.beginTime = new Date().getTime();
    })
  },
}
</script>
<style>
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
  width: 100vw;
  min-height: 100vh;
  background: #F5F5F5;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
