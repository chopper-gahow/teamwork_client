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
              <span>我的课程</span> ·
                <el-button type="success" @click="addnewclass">选课</el-button>
          </div>
          <div id="myitems" v-for="(item,index) in myclass" :key="index">
              <div id="itemcover">
                  <img :src="item.coverimg" alt="">
              </div>
              <div id="myiteminfo">
                  <div id="myitemtitle">{{item.name}}                    
                    <span id="feedback_button"><el-button @click="feedback(item._id)" type="warning" round>课程反馈</el-button></span>
                  </div>
                  <div id="myitemcontent">{{item.desc}}</div>
                  <div style="text-align:right">
                    <div>教师:{{item.techer}}</div>
                    <div>课时:{{item.classtime}}</div>
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
          <el-table
            :data="allclasses"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="techer"
              label="教师"
              width="80">
            </el-table-column>
            <el-table-column
              prop="desc"
              label="描述"
              width="200">
            </el-table-column>
            <el-table-column
              prop="classtime"
              label="课时">
            </el-table-column>
            <el-table-column
                                label="操作"
                                style="">
                                <template slot-scope="scope">
                                        <el-button
                                        size="mini"
                                        type="danger"
                                        @click="selectthis(scope.row)">选课</el-button>
                                    </template>
                                </el-table-column>
          </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">关闭</el-button>
        </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="feedbackdialog"
      width="60%"
      center>
      <div>课程评分
        <el-rate
          v-model="studycase"
          :colors="colors">
        </el-rate>
      </div>
      <div>课程评价
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="classthink">
        </el-input>
      </div>
      <div>教师评价
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="teacherthink">
        </el-input>
      </div>
      <div>反馈信息
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="comment">
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="feedbackdialog = false">取 消</el-button>
        <el-button type="primary" @click="sendfeedback()">确 定</el-button>
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
           feedbackdialog:false,
           studycase:null,
           colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
           classthink:"",
           teacherthink:"",
           comment:"",
           classid:'',
           islogin:sessionStorage.getItem("isLogin"),
           realname:sessionStorage.getItem('realname'),
           headimg:sessionStorage.getItem('headimg'),
           allclasses:[],
           myclass:[],
           personclass:[]
        }
    },
    methods:{
        addnewclass(){
            this.centerDialogVisible=true
        },
        selectthis(row){
          this.$axios({
            method:"get",
            url:`/user/chooseclass?classid=${row._id}&username=${sessionStorage.getItem('username')}`
          })
          .then(res=>{
            if (res.data.code == 200){
              this.$message({
                    showClose: true,
                    message: res.data.msg,
                    type: 'success'
                    });
            }
            else if (res.data.code == 201){
              this.$message.error(res.data.msg);
            }
          })
        },
        feedback(id){
          this.classid = id
          this.feedbackdialog = true
        },
        sendfeedback(){
          const that = this
          this.$axios.post('/feedback/sendnew', {
            studycase: that.studycase,
            classthink: that.classthink,
            teacherthink: that.teacherthink,
            comment: that.comment,
            class: that.classid,
            sender: sessionStorage.getItem('username')
          })
          .then(res => {
            this.feedbackdialog = false
            console.log('反馈成功');
          })
        },
        gomine(){
          this.$router.push({name:"StudySpace"})
        },
        gomine1(){
          this.$router.push({name:"MyFc"})
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
          url:'/study/findbyone'
          })
          .then(res=>{
          this.mystudy = res.data.data
          })
        this.$axios({
          method:'get',
          url:'/class/findbyclass?class='+sessionStorage.getItem('class')
        })
        .then(res=>{
          this.allclasses = res.data.data
          console.log(this.allclasses,'_____');
        })
        this.$axios({
          method:'get',
          url:'/person/finduserbyid'
        })
        .then(res=>{
            console.log(res);
            this.personclass = res.data.data[0].myclass
        })
        .then(()=>{
          this.personclass.map(item=>{
            this.$axios({
              method:'get',
              url:`/class/findbyid?id=${item}`
            })
            .then(res=>{
              this.myclass.push(res.data.data)
            })
          })

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
      display: flex;
      justify-content: space-between;
  }
  #myitemcontent{
      margin-top: 20px;
      font-size: .9em;
      font-weight: 500;
      text-align: left;
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
