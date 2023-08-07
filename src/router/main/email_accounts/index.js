export default [{ 
    path: '/emailaccounts/create', 
    component: () => import('pages/email_accounts/Create.vue') 
}, { 
    path: '/emailaccounts/edit/:id', 
    component: () => import('pages/email_accounts/Edit.vue') 
}, { 
    path: '/emailaccounts/:id', 
    component: () => import('pages/email_accounts/Item.vue') 
}, ]