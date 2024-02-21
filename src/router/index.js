import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    {
        path: "/",
        redirect: "/home"
    },
    {
        path: "/home",
        component: () => import("../pages/GameList.vue"),
        meta: {
            title: "Moe Voting"
        },
    },
    {
        path: "/game/:gameId(\\d+)",
        component: () => import("../pages/GameVoteResult.vue"),
        meta: {
            title: "投票结果"
        }
    },
    {
        path: "/game/:gameId(\\d+)/vote",
        component: () => import("../pages/Vote.vue"),
        meta: {
            title: "投票"
        }
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
});

router.beforeEach((to, from, next) => {
    to.meta.title && (document.title = to.meta.title);
    next();
});

export default router;