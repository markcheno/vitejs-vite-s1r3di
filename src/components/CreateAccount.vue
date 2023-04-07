<template>
  <h2>Create Account</h2>
  <div>
    <v-text-field
      v-model="username"
      type="email"
      name="email"
      id="email"
      label="Email"
      autocomplete="off"
    />
  </div>
  <div>
    <v-text-field
      v-model="password"
      type="password"
      name="password"
      id="password"
      label="Password"
      autocomplete="off"
    />
  </div>
  <div>
    <v-text-field
      v-model="password2"
      type="password"
      name="password2"
      id="password2"
      label="Confirm Password"
      autocomplete="off"
    />
  </div>
  <div>
    <v-text-field
      v-model="fullname"
      type="text"
      name="fullname"
      id="fullname"
      label="Full Name"
      autocomplete="off"
    />
    <v-btn @click="doCreateAccount">Create User</v-btn>
    <v-btn @click="router.back()">Cancel</v-btn>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePocketbase } from '../composables/usePocketbase.js';

const { pb } = usePocketbase();
const router = useRouter();
const username = ref('');
const password = ref('');
const fullname = ref('');

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

const doCreateAccount = async () => {
  try {
    const data = {
      email: username.value,
      emailVisibility: true,
      password: password.value,
      passwordConfirm: password2.value,
      name: fullname.value,
    };

    const record = await pb.value.collection('users').create(data);

    //await pb.value.collection('users').requestVerification('test@example.com');
    await doLogin();
  } catch (error) {
    alert(error.message);
  }
};
</script>
