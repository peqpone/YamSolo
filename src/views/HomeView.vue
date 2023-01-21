<script setup lang="ts">
import { useRouter } from 'vue-router';
import reset from '@/stores/reset';

const router = useRouter();

const startGame = ():void => {
  reset();
  router.push({ name: 'game' });
};

</script>

<template>
  <div id="splash-screen">
    <a @click="startGame" @keydown="startGame" class="button-play">
      <img src="../graphics/play.svg" alt="Start" />
    </a>
  </div>
  <div id="splash-screen-background" />
</template>

<style lang="scss" scoped>
#splash-screen {
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
#splash-screen-background {
  position: absolute;
  z-index: -1;
  height: 70vh;
  background: url(/src/graphics/logo-gold.svg) no-repeat top left;
  background-size: cover;
  width: 70%;
  bottom: 0;
  right: 0;
}
.button-play {
  text-align: center;
  img {
    width: 20%;
  }
}
</style>
