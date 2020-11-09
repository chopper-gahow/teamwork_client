import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Navbar from '../components/Navbar.vue'
import StudySpace from '../views/StudySpace.vue'
import MyStudy from '../views/MyStudy.vue'
import Datil from '../views/Datil.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    components: {
      head:Navbar,
      main:Home
    }
  },
  {
    path: '/studyspace',
    name: 'StudySpace',
    components: {
      head:Navbar,
      main:StudySpace
    }
  },
  {
    path: '/myfc',
    name: 'MyFc',
    components: {
      head:Navbar,
      main:MyStudy
    }
  },
  {
    path: '/datil',
    name: 'Datil',
    components: {
      head:Navbar,
      main:Datil
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
