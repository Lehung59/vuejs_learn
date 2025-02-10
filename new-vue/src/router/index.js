import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import IssueList from "@/components/IssueList.vue";
import Content2 from "@/components/Content2.vue";
import Content3 from "@/components/Content3.vue";
import Content0 from "@/components/Content0.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path: "/", redirect: "/home"},
        {
            path: '/',
            name: 'home',
            component: HomeView,
            children: [
                {path: "home", component: Content0},
                {path: "content1", component: IssueList},
                {path: "content2", component: Content2},
                {path: "content3", component: Content3},
            ]
        }

    ],
})

export default router
