import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory, useRouter } from 'vue-router';
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import CreateAccount from './components/CreateAccount.vue';
import ResetPassword from './components/ResetPassword.vue';
import { usePocketbase } from './composables/usePocketbase.js';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import './style.css';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home, meta: { reqAuth: true } },
    { path: '/login', component: Login },
    { path: '/create-account', component: CreateAccount },
    { path: '/reset-password', component: ResetPassword },
  ],
});

router.beforeEach((to, from, next) => {
  const { pb } = usePocketbase();

  if (to.meta?.reqAuth && !pb.value.authStore.isValid) {
    router.replace('/login');
  } else {
    next();
  }
});

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);
app.use(vuetify);
app.use(router);
app.mount('#app');
