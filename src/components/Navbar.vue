<template>
  <div id="navbar">
      <div id="navcontent">
        <div id="logo">研学天下</div>

        <div id="navinfo" v-if="islogin">
            <i class="el-icon-s-home" style="font-weight:bolder" @click="gohome"> 首页</i>
            <div id="logindiv">
                <i class="el-icon-s-promotion" style="font-weight:bolder" @click="gospace"> 研学空间</i>
                <el-button id="fabuyanxue" type="primary" icon="el-icon-edit" circle @click="openfengcai"></el-button>
                <div id="headimg" @click="outlogin"><img :src="navheadimg" alt=""></div>
            </div>
        </div>
        <div id="navinfo" v-if="!islogin">
            <i class="el-icon-s-home" style="font-weight:bolder" @click="gohome"> 首页</i>
            <div id="logindiv">
                <div  style="font-weight:bolder" @click="loginadmin"> 立即登陆</div>
            </div>

        </div>
      </div>
      <el-dialog
        title="登陆"
        :visible.sync="centerDialogVisible"
        width="50%"
        center>
        账号
        <el-input v-model="username" placeholder="请输入内容"></el-input>
        密码
        <el-input v-model="password" placeholder="请输入密码" type="password"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="login">确 定</el-button>
        </span>
        </el-dialog>
        <el-dialog
            id="blogdialog"
            title="发布风采"
            :visible.sync="centerDialogVisible2"
            width="85%"
            center>
            <el-input v-model="title" placeholder="请输入标题..."></el-input>
            <el-select v-model="fengcaiclass" placeholder="请选择课程" id="kindselect">
                <el-option v-for="(item,index) in myallclasses" :key="index" :label="item.name" :value="item._id"></el-option>
            </el-select>
            <div>
                <span id="coverdec">请选择风采的封面</span>
            </div>
            <div id="titandcov">
                <div>
                    <el-upload
                        class="upload-demo"
                        drag
                        action="http://upload-z2.qiniup.com"
                        :data="postData"
                        :on-success="uploadcoverSuccess"
                        multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </div>
                <div v-if='imgUrl' id="editcoverimg"><img :src="imgUrl"></div>
            </div>
            <!-- {{text}} -->
            <!-- {{bsText}} -->
            <el-card style="height: 500px;">
                <el-row v-loading="quillUpdateImg">
                    <quill-editor v-model="content" ref="myQuillEditor" style="height: 410px;" :options="editorOption">
                    </quill-editor>
                    <el-upload
                            style="display:none"
                            class="avatar-uploader"
                            action="http://upload-z2.qiniup.com"
                            :data="postData"
                            :show-file-list="false"
                            :on-success="uploadSuccess"
                            :before-upload="beforeUpload">
                    </el-upload>
                </el-row>
            </el-card>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="upload">发 布</el-button>
            </span>
        </el-dialog>
  </div>
</template>

<script>
import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'
import  Quill  from 'quill'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
var fonts = ['SimSun','SimHei','Microsoft-YaHei','KaiTi','FangSong','Arial','Times-New-Roman','sans-serif'];
var Font = Quill.import('formats/font');
Font.whitelist = fonts; //将字体加入到白名单 
Quill.register(Font, true);
Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  [{'header': 1}, {'header': 2}],               // custom button values
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
  [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
  [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
  [{'header': [1, 2, 3, 4, 5, 6, false]}],
  [{'color': []}, {'background': []}],          // dropdown with defaults from theme
  [{'font': []}],
  [{'align': []}],
  ['link', 'image'],
  ['clean']                                         // remove formatting button
]
export default {
    data(){
        return{
            title:'',
            content:'',
            fengcaiclass:'',
            postData:{
                token:this.$store.state.qiniutoken,
                domain:'hcpr.s3-cn-south-1.qiniucs.com'
            },
            myallclasses:[],
            islogin:sessionStorage.getItem('isLogin'),
            username:'',
            password:'',
            centerDialogVisible:false,
            centerDialogVisible2:false,
            navheadimg:sessionStorage.getItem('headimg'),
            imgUrl:'',
            quillUpdateImg:false,  
            editorOption:{
                placeholder:"请在这里输入内容...",
                modules:{
                    imageResize:{
                            displayStyles:{
                                backgroundColor:'black',
                                border:'none',
                                color:'white'
                            },
                            modules:['Resize','DisplaySize','Toolbar']
                    },
                    imageDrop:true,
                    toolbar:{
                        container:toolbarOptions,
                        handlers:{
                            'image': function (value) {
                                    if (value) {
                                        document.querySelector('.avatar-uploader input').click()
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                        }
                    }
                }
            },
        }
    },
    components:{
        quillEditor
    },
    methods:{
        upload(){
            var that = this
            this.$axios.post('/study/uploadnew',{
                title:that.title,
                master:sessionStorage.getItem('username'),
                content:that.content,
                school:that.fengcaiclass,
                headimg:sessionStorage.getItem('headimg'),
                coverimg:that.imgUrl
            })
            .then(res=>{
                this.$message({
                    showClose: true,
                    message: res.data.msg,
                    type: 'success'
                    });
                    that.centerDialogVisible = false
                    location.reload()
            })
        },
        beforeUpload() {this.quillUpdateImg = true},
        uploadSuccess(res) {
            let quill = this.$refs.myQuillEditor.quill
            if(res.hash!==''){
                let length = quill.getSelection().index;
                quill.insertEmbed(length,'image','http://hchopper.top/'+res.hash)
                quill.setSelection(length + 1)
            }
            else{
                this.$message.error('图片插入失败')
            }
            this.quillUpdateImg= false

        },
        uploadcoverSuccess(res){
            console.log(res);
            this.imgUrl = 'http://hchopper.top/'+res.hash
        },
        openfengcai(){
            this.centerDialogVisible2 = true
        },
        outlogin(){
            var that = this
            this.$axios({
                method:'get',
                url:'/login/outlogin?username='+sessionStorage.getItem('username')
            })
            .then(res=>{
                
                console.log(res);
                if(res.data.code==200){
                    this.$message({
                    showClose: true,
                    message: res.data.msg,
                    type: 'success'
                    });
                    sessionStorage.clear()
                    this.isLogin=false;
                    this.$router.push({ name: "Blog" });
                    location.reload()
                }
                else{
                    this.$message.error('退出失败，检查网络后重试');
                }
            })
            
            },
        login(){
            var that = this
            this.$axios({
                method:'get',
                url:'/login/userlogin?username='+that.username+'&password='+that.password
            })
            .then(res=>{
                if(res.config.url === '/login/userLogin?username=&password='){
                    this.$message.error('用户名密码不能为空');
                }
                else if(res.config.url !== '/login/userLogin?username=&password='&& res.data === 'no!'){
                    this.$message.error('用户名或密码错误');
                }
                else if(res.config.url !== '/login/userLogin?username=&password='&& res.data !== 'no!'){
                    this.centerDialogVisible = false
                    this.$message({
                    showClose: true,
                    message: res.data.msg,
                    type: 'success'
                    });
                    console.log(res);
                    this.$store.state.username=res.data.data.username
                    this.$store.state.password=res.data.data.password
                    this.$store.state.realname=res.data.data.realname
                    this.$store.state.role=res.data.data.role
                    this.$store.state.headimg=res.data.data.headimg
                    this.$store.state.jurisdiction=res.data.data.jurisdiction
                    this.$store.state.isLogin=true
                    localStorage.setItem('username',res.data.data.username)
                    sessionStorage.setItem('username',res.data.data.username)
                    sessionStorage.setItem('password',res.data.data.password)
                    sessionStorage.setItem('isLogin',true)
                    sessionStorage.setItem('headimg',res.data.data.headimg)
                    sessionStorage.setItem('realname',res.data.data.realname)
                    sessionStorage.setItem('jurisdiction',res.data.data.jurisdiction)
                    sessionStorage.setItem('role',res.data.data.role)
                    location.reload()
                }
            })
        },
        loginadmin(){
            this.centerDialogVisible = true
        },
        gohome(){
            this.$router.push({name:"Home"})
        },
        gospace(){
            this.$router.push({name:"StudySpace"})
        }
    },
    mounted(){
                this.$axios({
                        method:'get',
                        url:'/token/cper/gettoken'
                    })
                .then(res=>{
                        this.postData.token = res.data.token
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
              this.myallclasses.push(res.data.data)
            })
          })

        })
    }
}
</script>

<style>
    #navbar{
        width: 100vw;
        height: 100px;
        background: white;
    }
    #navcontent{
        width: 90%;
        height: 100%;
        margin: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    #logo{
        font-size: 2em;
        font-weight: bolder;
    }
    #navinfo{
        width: 400px;
        font-size: 1.5em;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    #message{
        width: 40px;
        height: 40px;
        font-size:120%;
        text-align: center;
        background: #FF8A5E;
        color: white;
        border: none;
        outline: none;
        border-radius: 7px;
    }
    #message:hover{
        background: #ffa280;
    }
    #edit{
        width: 40px;
        height: 40px;
        font-size:120%;
        text-align: center;
        background: #5E99FF;
        color: white;
        border: none;
        outline: none;
        border-radius: 7px;
    }
    #edit:hover{
        background: #85b2ff;
    }
    #headimg{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        background: red;
    }
    #headimg>img{
        width: 100%;
    }
    i{
        cursor: pointer;
    }
    #logindiv{
        width: 300px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    #loginbtn{
        font-size: 1.5em;
    }
    #fabuyanxue{
        width: 50px;
        height: 50px;
    }
    #titandcov{
        display: flex;
    }
     #editcoverimg{
        width: 366px;
        height: 200px;
        overflow: hidden;
    }
    #editcoverimg>img {
        width: 100%;
    }
</style>