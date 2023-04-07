<template>
  <v-card>
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
  </div>
  <div>
    <router-link to="/create-account">Create Account?</router-link>
  </div>
  <div>
    <router-link to="/reset-password">Forgot Password?</router-link>
  </div>
  </v-card>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePocketbase } from '../composables/usePocketbase.js';

const { pb } = usePocketbase();
const router = useRouter();
const username = ref('');
const password = ref('');

const doLogin = async () => {
  try {
    const authData = await pb.value
      .collection('users')
      .authWithPassword(username.value, password.value);
    console.log('isValid=', pb.value.authStore.isValid);
    pb.value.authStore.isValid && router.replace('/home');
  } catch (error) {
    alert(error.message);
  }
};
</script>
