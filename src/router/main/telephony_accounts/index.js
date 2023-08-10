export default [{
    path: '/telephonyaccounts/create',
    component: () => import('pages/telephony_accounts/Create.vue')
}, {
    path: '/telephonyaccounts/:id',
    component: () => import('pages/telephony_accounts/Item.vue')
}]
