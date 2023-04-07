import { ref } from 'vue';
import Pocketbase from 'pocketbase';

export const usePocketbase = () => {
  const pb = ref(null);
  pb.value = new Pocketbase('https://cheno.xyz');

  return {
    pb,
  };
};
