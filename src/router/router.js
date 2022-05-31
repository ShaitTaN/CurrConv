import { createRouter, createWebHistory } from "vue-router";
import HomePage from '@/pages/HomePage.vue'
import CurrPortfolioPage from '@/pages/CurrPortfolioPage.vue'

const routes = [
	{
		path: '/',
		component: HomePage
	},
	{
		path: '/portfolio',
		component: CurrPortfolioPage
	}
]

const router = createRouter({
	routes,
	history: createWebHistory(process.env.BASE_URL),
	linkActiveClass: 'active-link'
})

export default router