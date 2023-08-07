export default [{ 
    path: '/webchataccounts/create', 
    component: () => import('pages/web_chat_accounts/Create.vue') 
}, { 
    path: '/webchataccounts/edit/:id', 
    component: () => import('pages/web_chat_accounts/Edit.vue') 
}, { 
    path: '/webchataccounts/:id', 
    component: () => import('pages/web_chat_accounts/Item.vue') 
}, ]