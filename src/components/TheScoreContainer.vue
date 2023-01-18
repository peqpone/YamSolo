<script setup lang="ts">

</script>

<template>
  <div class="score-area">
    <div class="dice-container">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
    </div>
    <div class="text-score-container">
      <div>3 of a K</div>
      <div>4 of a K</div>
      <div>fullHouse</div>
      <div>straight</div>
      <div>STRAIGHT</div>
      <div>yams</div>
      <div>chance</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.score-area {
  display: grid;
  grid: 1fr 3fr / auto;
  .dice-container {
    display: grid;
    grid: auto/repeat(6, 1fr);
  }
  .text-score-container {
    display: grid;
    grid: auto / repeat(3, 1fr);
  }
}
</style>
