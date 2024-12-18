import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home'
import Todo from '@/components/Todo'
import Sample1 from '@/components/Sample1'
import Sample2 from '@/components/Sample2'
import Sample3 from '@/components/Sample3'
import Sample4 from '@/components/Sample4'
import Review from '../components/Review.vue';
import ThankYou from '../components/ThankYou.vue'; // 新しいコンポーネントをインポート

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/todo',
    name: 'Todo',
    component: Todo
  },
  {
    path: '/sample1',
    name: 'Sample1',
    component: Sample1
  },
  {
    path: '/sample2',
    name: 'Sample2',
    component: Sample2
  },
  {
    path: '/sample3',
    name: 'Sample3',
    component: Sample3
  },
  {
    path: '/sample4',
    name: 'Sample4',
    component: Sample4
  },
  {
    path: '/review',
    name: 'Review',
    component: Review
  },
  {
    path: '/thankyou',
    name: 'ThankYou',
    component: ThankYou
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router