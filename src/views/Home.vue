<template>
  <div class="home">
    <div id="mainleft">
      <div id="studyitem" v-for="(item,index) in studyitem" :key="index">
        <div id="itemheadimg">
          <img :src="item.headimg" alt="">
        </div>
        <div id="trangle"></div>
        <div id="itemcontent" @click="goDatil(item._id)">
          <div id="smalltitle">研学精选</div>
          <div id="contentmain">
            <div id="studycover"><img :src="item.coverimg" alt=""></div>
            <div id="studyinfo">
              <div id="studytitle">{{item.title}}-{{item.master}}</div>
              <div id="studydate">{{item.date}}</div>
              <div id="studycontent" v-html="item.content"></div>
            </div>
          </div>
          <div id="studyfoot">来自于-{{item.school}}</div>
        </div>
      </div>
    </div>
    <div id="mainright">
      <div id="righttop" v-show="islogin">
        <div id="righttopimg">
          <img src="top.png" alt="">
        </div>
        <div id="topheadimg">
          <img :src="headimg" alt="">
        </div>
        <div id="topnickname">
          {{realname}}
        </div>
        <div id="topfoot">
          <div id="topfootdiv">
            <div id="topfootdivtop">1</div>
            <div id="topfootdivfoot">关注</div>
          </div>
          <div id="topfootdiv">
            <div id="topfootdivtop">2</div>
            <div id="topfootdivfoot">粉丝</div>
          </div>
          <div id="topfootdiv">
            <div id="topfootdivtop">3</div>
            <div id="topfootdivfoot">风采</div>
          </div>
        </div>
      </div>
      <div id="rightfoot">
        <div id="rightfoothead">
          <div>公告栏</div>
          <a href="">更多</a>
        </div>
        <div id="rightfootmain">
          <div id="rightfootmainitem" v-for="(item,index) in pushednotice" :key="index">
              <div id="itemtitle">{{item.title}}</div>
              <div id="itemdate">{{item.date}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data(){
    return{
      pushednotice:[],
      studyitem:[],
      islogin:sessionStorage.getItem("isLogin"),
      realname:sessionStorage.getItem('realname'),
      headimg:sessionStorage.getItem('headimg')
    }
  },
  methods:{
    goDatil(id){
      sessionStorage.setItem('datil', id)
      this.$router.push({name:'Datil'})
    }
  },
  mounted(){
    this.$axios({
      method:'get',
      url:'/notice/findpushed'
    })
    .then(res=>{
      this.pushednotice = res.data.data
    })
    this.$axios({
      method:'get',
      url:'/study/findpassed'
    })
    .then(res=>{
      this.studyitem = res.data.data
    })
  }
}
</script>
  
<style>
  .home{
    width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    margin-top: 45px;
  }
  #mainleft{
    width: 70vw;
  }
  #mainright{
    width: 20vw;
    height: 700px;
  }
  #studyitem{
    width: 95%;
    height: 400px;
    display: flex;
    cursor: pointer;
  }
  #itemheadimg{
    width: 97px;
    height: 97px;
    background: blue;
  }
  #trangle{
    width: 0px;
    height: 0px;
    margin-left: 30px;
    border-top: 20px white solid;
    border-right: 20px white solid;
    border-bottom: 20px #F5F5F5 solid;
    border-left: 20px #F5F5F5 solid;
  }
  #itemcontent{
    width: 1000px;
    height: 350px;
    background: white;
    box-shadow: 5px 5px 5px rgb(227, 227, 227);
  }
  #righttop{
    width: 100%;
    height: 370px;
    background: white;
    position: relative;
    box-shadow: 5px 5px 5px rgb(227, 227, 227);

  }
  #righttopimg{
    width: 100%;
    height: 129px;
  }
  #righttopimg img{
    width: 100%;
  }
  #topheadimg{
    width: 130px;
    height: 130px;
    background: red;
    position: relative;
    border-radius: 50%;
    margin: 0 auto;
    margin-top: -65px;
    border: 4px white solid; 
    overflow: hidden;
  }
  #topheadimg>img{
    width: 100%;
  }
  #topnickname{
    width: 100%;
    height: 50px;
    font-size: 1.5em;
    font-weight: bolder;
    margin-top: 20px;
  }
  #topfoot{
    width: 100%;
    display: flex;
    justify-content: center;
  }
  #topfootdiv{
    width: 90px;
    height: 70px;
    border-right: 2px #F5F5F5 solid;
  }
  #topfootdiv:nth-last-of-type(1){
    border: none;
  }
  #topfootdivtop{
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2em;
    font-weight: bolder;
  }
  #topfootdivfoot{
    font-size: 1.4em;
    font-weight: bolder;
  }
  #rightfoot{
    width: 100%;
    height: 350px;
    background: white;
    margin-top: 50px;
  }
  #rightfoothead{
    width: 100;
    height: 50px;
    border-bottom: 2px #ECECEC solid; 
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
  #rightfoothead>div{
    font-size: 1.2em;
  }
  #rightfoothead>a{
    text-decoration: none;
    color: #A4A4A4;
  }
  #rightfootmain{
    width: 80%;
    height: 70%;
    margin: 0 auto;
    margin-top: 20px;
  }
 #itemtitle{
    width: 60%;
    height: 30px;
    display: flex;
    align-items: center;
    color: #FF894E;
  }
  #itemdate{
    width: 35%;
    height: 30px;
    font-size: 0.8em;
    display: flex;
    align-items: center;
    color: #909090;
  }
  #studyitem{
    width: 95%;
    height: 400px;
    display: flex;
  }
   #itemheadimg{
    width: 95px;
    height: 95px;
    background: blue;
    overflow: hidden;
  }
  #itemheadimg>img{
    width: 100%;
  }
  #rightfootmainitem{
    width: 110%;
    display: flex;
    justify-content: space-between;
  }
  #smalltitle{
    height: 90px;
    width: 90%;
    margin:0 auto;
    text-align: left;
    display: flex;
    align-items: center;
    font-weight: bolder;
    font-size: 1.1em;
  }
  #studycover{
    width: 244px;
    height: 162px;
    overflow: hidden;
  }
  #studycover>img{
    width: 100%;
  }
  #contentmain{
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  #studyinfo{
    width: 65%;
    height: 162px;
  }
  #studytitle{
    width: 100%;
    font-size: 1.1em;
    font-weight: 400;
    text-align: left;
  }
  #studydate{
    text-align: left;
    font-size: 0.9em;
    color: #B0B0B0;
  }
  #studycontent{
    margin-top: 10px;
    width: 100%;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp:4;
    -webkit-box-orient: vertical;
  }
  #studyfoot{
    width: 90%;
    margin: 0 auto;
    text-align: left;
    height: 100px;
    display: flex;
    align-items: center;
    font-size: 0.8em;
    font-weight: 400;
  }
  #rightfoot{
    width: 100%;
    height: 350px;
    background: white;
    margin-top: 50px;
  }
  #rightfoothead{
    width: 100;
    height: 30px;
    border-bottom: 2px #ECECEC solid; 
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
  #rightfoothead>div{
    font-size: 1.2em;
  }
  #rightfoothead>a{
    text-decoration: none;
    color: #A4A4A4;
  }
  #rightfootmain{
    width: 80%;
    height: 70%;
    margin: 0 auto;
    margin-top: 20px;
  }
</style>
