import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import DetailsView from '@/views/DetailsView.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            beforeEnter: [setDefaultQuery]
        },
        {
            path: '/recipes/:id',
            name: 'details',
            component: DetailsView
        },
    ]
})


function setDefaultQuery(to) {
    const page = to.query['page']
    if (page == undefined || page == null) { return {path: to.path, query: {page: 1} }
    }
}
