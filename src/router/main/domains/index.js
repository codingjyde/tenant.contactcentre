export default [{ 
    path: '/domains', 
    component: () => import('pages/domains/Index.vue') 
}, { 
    path: '/domains/create', 
    component: () => import('pages/domains/Create.vue') 
}, { 
    path: '/domains/:id', 
    component: () => import('pages/domains/Item.vue') 
}]