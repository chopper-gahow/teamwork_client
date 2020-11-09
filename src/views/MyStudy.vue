<template>
  <div class="admin">
    <div id="adminmainleft">
      <div id="adminleft">
          <div id="adminmainlefthead">研学空间</div>
          <div id="adminmainlefthead" @click="gomine"><i class="el-icon-s-promotion"></i>我的课程</div>
          <div id="adminmainlefthead" @click="gomine1"><i class="el-icon-s-promotion"></i>我的风采</div>
      </div>
      <div id="adminright">
          <div id="noticeright">
              <span>我的风采</span> 
          </div>
          <div id="myitems" v-for="(item,index) in mystudy" :key="index" @click="goDatil(item._id)">
              <div id="itemcover">
                  <img :src="item.coverimg" alt="">
              </div>
              <div id="myiteminfo">
                  <div id="myitemtitle">{{item.title}}</div>
                  <div id="myitemcontent" v-html="item.content"></div>
                  <div style="text-align:right">
                    <div>发布时间:{{item.date}}</div>
                    <div>状态:{{item.state}}</div>
                  </div>
              </div>
          </div>
      </div>
    </div>
    <div id="adminmainright">
      <div id="adminrighttop">
        <div id="adminrighttopimg">
          <img src="top.png">
        </div>
        <div id="admintopheadimg">
          <img :src="headimg" alt="">
        </div>
        <div id="admintopnickname">
          {{realname}}
        </div>
        <div id="admin">
        </div>
        <div id="admintopfoot">

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
    <el-dialog
        title="选择课程"
        :visible.sync="centerDialogVisible"
        width="40%"
        center>

        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">关闭</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
    data(){
        return{
           mystudy:[],
           pushednotice:[],
           centerDialogVisible:false,
           studycase:null,
           classthink:"",
           feedback:'',
           classid:'',
           islogin:sessionStorage.getItem("isLogin"),
           realname:sessionStorage.getItem('realname'),
           headimg:sessionStorage.getItem('headimg'),
        }
    },
    methods:{
        selectthis(row){
          this.$axios({
            method:"get",
            url:`/user/addclass?classid=${row._id}`
          })
          .then(res=>{
            this.$message({
                    showClose: true,
                    message: res.data.msg,
                    type: 'success'
                    });
          })
        },
        gomine(){
          this.$router.push({name:"StudySpace"})
        },
        gomine1(){
          this.$router.push({name:"MyFc"})
        },
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
          url:'/study/findbyone?master='+sessionStorage.getItem('username')
          })
          .then(res=>{
          this.mystudy = res.data.data
          })
        
    }
}
</script>
  
<style>
  .admin{
    width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    margin-top: 45px;
    position: relative;
  }
  #adminmainleft{
    width: 70vw;
    display: flex;
  }
  #adminleft{
    position: relative;
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 600px;
    background: white;
    margin-right: 50px;
  }
  #adminright{
    width: 900px;
    min-height: 600px;
    background: white;
    margin-right: 50px;
    padding-top: 20px;
    padding-left: 20px;
  }
  #adminmainlefthead{
      width: 70%;
      height: 30px;
      margin: 0 auto;
      text-align: left;
      font-size: 1.2em;
      font-weight: bold;
      margin-bottom: 10px;
      cursor: pointer;
  }
  #adminmainlefthead:nth-of-type(1){
      font-size: 1.4em;
      margin-bottom: 20px;
      margin-top: 20px;
  }
  #adminmainright{
    width: 20vw;
    height: 700px;
  }
  #jurisdiction{
      text-align: left;
  }
  #adminstudyitem{
    width: 95%;
    height: 400px;
    display: flex;
  }
  #adminitemheadimg{
    width: 100px;
    height: 100px;
    background: blue;
  }
  #adminrighttop{
    width: 100%;
    height: 430px;
    background: white;
    position: relative;
    box-shadow: 5px 5px 5px rgb(227, 227, 227);

  }
  #adminrighttopimg{
    width: 100%;
    height: 129px;
  }
  #adminrighttopimg img{
    width: 100%;
  }
  #admintopheadimg{
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
  #admintopheadimg img{
    width: 100%;
  }
  #admintopnickname{
    width: 100%;
    height: 40px;
    font-size: 1.5em;
    font-weight: bolder;
    margin-top: 20px;
  }
  #admintopfoot{
    width: 100%;
    display: flex;
    justify-content: center;
  }
  #admintopfootdiv{
    width: 90px;
    height: 70px;
    border-right: 2px #F5F5F5 solid;
  }
  #admintopfootdiv:nth-last-of-type(1){
    border: none;
  }
  #admintopfootdivtop{
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2em;
    font-weight: bolder;
  }
  #admintopfootdivfoot{
    font-size: 1.4em;
    font-weight: bolder;
  }
  #adminrightfoot{
    width: 100%;
    height: 350px;
    background: white;
    margin-top: 50px;
  }
  #adminrightfoothead{
    width: 100;
    height: 30px;
    border-bottom: 2px #ECECEC solid; 
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
  #adminrightfoothead>div{
    font-size: 1.2em;
  }
  #adminrightfoothead>a{
    text-decoration: none;
    color: #A4A4A4;
  }
  #adminrightfootmain{
    width: 80%;
    height: 70%;
    background: red;
    margin: 0 auto;
    margin-top: 20px;
  }
  #admin{
    font-size: 1.1em;
    color: #A5A5A5;
  }
  #admintopfoot{
    margin-top: 40px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #admintopfoot>button{
    width: 230px;
    height: 45px;
    background: #FF6C11;
    color: white;
    border: none;
    outline: none;
    border-radius: 5px;
    font-size: 1.4em;
    font-weight: 500;
  }
  #noticeright{
    width: 97%;
    display: flex;
    justify-content: space-between;
    border-bottom: 2px gray solid;
    margin-bottom: 30px;
  }
  #noticeright>span{
    font-size: 2em;
  }
  #myitems{
      width: 88%;
      height: 170px;
      margin: 0 auto;
      box-shadow: 0 0 10px rgb(185, 145, 145);
      display: flex;
      align-items: center;
      padding: 0 20px;
      justify-content: space-between;
  }
  #itemcover{
      width: 250px;
      height: 90%;
      background: red;
      overflow: hidden;
  }
  #itemcover img{
      width: 100%;
  }
  #myiteminfo{
      width: 340px;
      height: 90%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      
  }
  #myitemtitle{
      font-size: 1.2em;
      font-weight: 500;
      text-align: left;
  }
  #myitemcontent{
      margin-top: 20px;
      font-size: .9em;
      font-weight: 500;
      text-align: left;
      overflow: hidden;
  }
  #myitemfeedback{
      width: 340px;
      height: 30px;
  }
  #parentdialog{
      font-size: 1.3em;
  }
  #myitems{
    margin-bottom: 20px;
  }
</style>
