import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import IssueList from "@/components/IssueList.vue";
import Content2 from "@/components/Content2.vue";
import Content3 from "@/components/Content3.vue";
import Content0 from "@/components/Content0.vue";
import IssueDetail from "@/components/IssueDetail.vue";
import Content2Detail from "@/components/Content2Detail.vue";
import Login from "@/views/Login.vue";
import ChangePassword from "@/components/ChangePassword.vue";

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
                {path: "issue", component: IssueList},
                {path: "issue/:id", component: IssueDetail},

                {path: "content2", component: Content2},
                {path: "content2/:id", component: Content2Detail},
                {path: "content3", component: Content3},
                {path: "change-password", component: ChangePassword},
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        }

    ],
})

export default router
