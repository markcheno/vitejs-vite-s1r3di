<script setup>
import { onMounted, ref } from 'vue';
import Pocketbase from 'pocketbase';

let pb = null;

onMounted(() => {
  pb = new Pocketbase('https://cheno.xyz');
});

</script>

<template>
  <h1>Hello, world!</h1>
</template>

<style scoped></style>
