import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    {
        path: "/home",
        component: () => import("../pages/GameList.vue"),
    },
    {
        path: "/game/:gameId(\\d+)",
        component: () => import("../pages/GameVoteResult.vue"),
    },
    {
        path: "/game/:gameId(\\d+)/vote",
        component: () => import("../pages/Vote.vue"),
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