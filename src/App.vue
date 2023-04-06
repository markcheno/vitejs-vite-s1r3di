<template>
  <div v-if="currentUser">
    <h1>Welcome {{ currentUser?.email }}</h1>
    <v-btn @click="doLogout">Logout</v-btn>
  </div>
  <div v-else>
    <h2>{{ loginMode ? 'Login' : 'Create Account' }}</h2>
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
    <div v-if="loginMode">
      <div>
        <v-btn @click="doLogin">Login</v-btn>
        <v-btn @click="($event) => (loginMode = false)">Create Account</v-btn>
      </div>
      <div></div>
    </div>
    <div v-else>
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
      </div>
      <v-btn @click="doCreateAccount">Create User</v-btn>
      <v-btn @click="($event) => (loginMode = true)">Cancel</v-btn>
    </div>
  </div>
</template>

<style scoped></style>

<script setup>
import { onMounted, ref } from 'vue';
import Pocketbase from 'pocketbase';

let pb = null;
const currentUser = ref();
const username = ref('');
const password = ref('');
const fullname = ref('');
const loginMode = ref(true);

onMounted(async () => {
  pb = new Pocketbase('https://cheno.xyz');

  pb.authStore.onChange(() => {
    currentUser.value = pb.authStore.model;
  }, true);
});

const doLogout = () => {
  pb.authStore.clear();
  email.value = '';
  password.value = '';
  fullname.value = '';
};

const doLogin = async () => {
  try {
    const authData = await pb
      .collection('users')
      .authWithPassword(username.value, password.value);

    console.log(pb.authStore.isValid);
    console.log(pb.authStore.token);
    console.log(pb.authStore.model.id);
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

    const record = await pb.collection('users').create(data);
    //await pb.collection('users').requestVerification('test@example.com');
    await doLogin();
  } catch (error) {
    alert(error.message);
  }
};
</script>
