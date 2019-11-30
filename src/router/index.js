import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Home = () => import("./../views/home/Home.vue")
const Cart = () => import("./../views/cart/ShoppingCar.vue")
const Category = () => import("./../views/category/Category.vue")
const Profile = () => import("./../views/profile/Profile.vue")
const Detail = () => import("./../views/detail/Detail.vue")


const router = new Router({
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/category',
      component: Category
    },
    {
      path: '/profile',
      component: Profile
    },
    {
      path: '/detail/:iid',
      component: Detail
    }
  ],
  mode: 'history'
})
export default router
