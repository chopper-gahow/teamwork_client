<template>
  <div id="mainback">
      <div id="datilcontent">
          <div id="datiltitle">
              {{datil.title}}
          </div>
          <div id="datiltext" v-html="datil.content">
              
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            datil:{}
        }
    },
    mounted(){
        this.$axios({
            method:'get',
            url:`/study/getdatil?id=${sessionStorage.getItem('datil')}`
        })
        .then(res => {
            this.datil = res.data.data
            console.log(this.datil);
        })
    }
}
</script>

<style>
    #mainback{
        background: #F5F5F5;
        width: 100vw;
        min-height: 100vh;
    }
    #datilcontent{
        margin:30px auto 0 auto;
        width: 80%;
        min-height: 100vh;
        background: white;
        padding-top: 20px;
        padding-right: 30px;
        padding-left: 30px;
    }
    #datiltitle{
        font-size: 2.3em;
        font-weight: 600;
    }
    #datiltext{
        font-size: 1.2em;
        text-align: left;
        text-indent: 2em; 
        margin-top: 50px;
    }
</style>