import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
// @ts-ignore
import cloneDeep from 'lodash.clonedeep';

import App from './App.vue';
import router from './router';

import './assets/main.css';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
pinia.use(({ store }) => {
  const initialState = cloneDeep(store.$state);
  // eslint-disable-next-line no-param-reassign
  store.$reset = () => store.$patch(cloneDeep(initialState));
});

app.use(pinia);
app.use(router);

app.mount('#app');
