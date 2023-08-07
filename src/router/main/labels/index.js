export default [{ 
    path: '/labels', 
    component: () => import('pages/labels/Index.vue') 
}, { 
    path: '/labels/create', 
    component: () => import('pages/labels/Create.vue') 
}, { 
    path: '/labels/edit/:id', 
    component: () => import('pages/labels/Edit.vue') 
}, { 
    path: '/labels/:id', 
    component: () => import('pages/labels/Item.vue') 
}]