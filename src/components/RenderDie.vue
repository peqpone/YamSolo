<script lang="ts" setup>
import { defineProps } from 'vue';

const properties = defineProps({
  dieValue: { type: Number, required: true },
});

</script>

<template>
  <img :alt="dieValue" :src="`/dice/classic/${properties.dieValue}.svg`" />
</template>

<style scoped>
img {
  max-width: 15%;
}
</style>
