<script setup lang="ts">
import useGameStore from '@/stores/game';
import { ref } from 'vue';
import RenderDie from '@/components/RenderDie.vue';

const themes = ['classic', 'design', 'numbers'];
const areOptionsVisible = ref<boolean>(false);
const gameStore = useGameStore();

const toggleOptions = () => {
  areOptionsVisible.value = !areOptionsVisible.value;
};
const setTheme = (newTheme:string) => {
  gameStore.saveTheme(newTheme);
};
</script>

<template>
  <div>
    <a
      class="cta"
      @click="toggleOptions"
      @keydown="toggleOptions"
    >
      options
    </a>
    <div
      v-if="areOptionsVisible"
      class="options-container"
    >
      <RenderDie
        class="die-button"
        v-for="(theme, index) in themes"
        :key="index"
        @click="setTheme(theme)"
        :die-value="1"
        :die-id="index"
        :force-theme="theme" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.die-button {
  cursor: pointer;
  width: 30px;
}
</style>
