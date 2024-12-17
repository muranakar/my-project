import { createRouter, createWebHistory } from 'vue-router';
import Sample1 from './components/Sample1.vue';
import Review from './components/Review.vue';

const routes = [
  {
    path: '/',
    name: 'Sample1',
    component: Sample1
  },
  {
    path: '/review',
    name: 'Review',
    component: Review
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;