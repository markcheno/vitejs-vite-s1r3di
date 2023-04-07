<template>
  <h1>
    Welcome {{ (currentUser && currentUser?.name) || currentUser?.email }}
  </h1>
  <v-btn @click="doLogout">Logout</v-btn>
</template>

<style scoped></style>

<script setup>
import { onMounted, ref } from 'vue';
import Pocketbase from 'pocketbase';
import { useRouter } from 'vue-router';
import { usePocketbase } from '../composables/usePocketbase.js';

const { pb } = usePocketbase();
const router = useRouter();
const currentUser = ref();

onMounted(async () => {
  currentUser.value = pb.value.authStore.isValid ? pb.value.model : null;
});

const doLogout = () => {
  pb.value.authStore.clear();
  currentUser.value = null;
  router.replace('/login');
};
</script>
