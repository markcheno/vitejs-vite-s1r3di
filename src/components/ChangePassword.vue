<template>
  <h2>Change Password</h2>
  <div>
    <v-text-field
      v-model="email"
      type="email"
      name="email"
      id="email"
      label="Email"
      autocomplete="off"
    />
    <v-btn @click="doChangePassword">Send Email</v-btn>
    <v-btn @click="router.back()">Cancel</v-btn>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Pocketbase from 'pocketbase';
import { useRouter } from 'vue-router';
import { usePocketbase } from '../composables/usePocketbase.js';

const { pb } = usePocketbase();
const router = useRouter();
const email = ref('');

const doChangePassword = async () => {
  try {
    const authData = await pb.value
      .collection('users')
      .requestPasswordReset(email.value);
    router.replace('/home');
  } catch (error) {
    alert(error.message);
  }
};
</script>
