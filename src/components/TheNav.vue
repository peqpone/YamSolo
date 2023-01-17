<script lang="ts" setup>
import { reactive } from 'vue';
import { RouterLink } from 'vue-router';

const state = reactive({ isNavOpen: false });
const toggleNav = ():void => {
  state.isNavOpen = !state.isNavOpen;
};

</script>
<template>
  <a id="toggle-nav-button" @click="toggleNav" @keydown="toggleNav">nav</a>
  <nav id="nav-container" :class="state.isNavOpen ? 'open' : 'close'">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/game">Game</RouterLink>
  </nav>
</template>

<script lang="ts">
export default {
  name: 'TheNav',
};
</script>

<style lang="scss" scoped>
#toggle-nav-button {
  position: absolute;
  z-index: 999;
}
nav {
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  &.close {
    display: none;
  }
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  nav {
    text-align: left;
    font-size: 1rem;
    margin-top: 1rem;
  }
}
</style>
