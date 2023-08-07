export default [{ 
    path: '/', 
    component: () => import('pages/home/Index.vue') 
}, { 
    path: '/changepassword', 
    component: () => import('pages/home/ChangePassword.vue') 
}, { 
    path: '/myprofile', 
    component: () => import('pages/home/MyProfile.vue') 
}]