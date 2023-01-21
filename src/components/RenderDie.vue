<script lang="ts" setup>
const properties = defineProps({
  dieValue: { type: Number, required: true },
});

</script>

<template>
  <img :alt="dieValue.toString()" :src="`/dice/classic/${properties.dieValue}.svg`" />
</template>

<style scoped>
img {
  max-width: 15%;
}
</style>
