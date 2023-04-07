<template>
  <h2>Login</h2>
  <v-text-field
    v-model="username"
    type="email"
    name="email"
    id="email"
    label="Email"
    autocomplete="off"
  />
  <v-text-field
    v-model="password"
    type="password"
    name="password"
    id="password"
    label="Password"
    autocomplete="off"
  />
  <div>
    <v-btn @click="doLogin">Login</v-btn>
    <v-btn @click="($event) => router.push('/create-account')"
      >Create Account</v-btn
    >
  </div>
  <router-link to="/change-password">Forgot Password?</router-link>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePocketbase } from '../composables/usePocketbase.js';

const { pb } = usePocketbase();
const router = useRouter();
const currentUser = ref();
const username = ref('');
const password = ref('');

onMounted(async () => {
  pb.value.authStore.onChange(() => {
    currentUser.value = pb.value.authStore.model;
  }, true);
});

const doLogin = async () => {
  try {
    const authData = await pb.value
      .collection('users')
      .authWithPassword(username.value, password.value);
    pb.value.authStore.isValid && router.replace('/home');
  } catch (error) {
    alert(error.message);
  }
};
</script>
