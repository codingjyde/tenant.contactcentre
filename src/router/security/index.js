export default [{ 
    path: '/forgotpassword', 
    component: () => import('pages/security/ForgotPassword.vue') 
}, { 
    path: '/login', 
    component: () => import('pages/security/Login.vue') 
}, { 
    path: '/register', 
    component: () => import('pages/security/Register.vue') 
}, { 
    path: '/resetpassword/:code', 
    component: () => import('pages/security/ResetPassword.vue') 
}]