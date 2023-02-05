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
    <render-die
      class="die-preview"
      :die-value="1"
    />
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
      <render-die
        v-for="(theme, index) in themes"
        :class="`die-button theme-${theme}`"
        :key="index"
        @click="setTheme(theme)"
        :die-value="1"
        :force-theme="theme" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.die-preview {
  display: block;
  margin: 0 auto;
  width: 50px;
}
.die-button {
  cursor: pointer;
  width: 30px;
}
</style>
