<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const player = {
  name: '',
};

const state = reactive({
  players: [{ ...player }],
});

const addPlayer = ():void => {
  state.players.push({ ...player });
};
const startGame = ():void => {
  router.push({ name: 'game' });
};

</script>

<template>
  <div id="players-customization">
    <h2>Welcome</h2>
    <div v-for="(player, key) in state.players" :key="key">
      <input aria-label="Name for player {{key + 1}}" type="text" v-model="player.name" />
    </div>
    <a @click="addPlayer" @keydown="addPlayer">add</a>
    <a @click="startGame" @keydown="startGame">start</a>
  </div>
</template>
