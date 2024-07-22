import './assets/main.css';

import { createApp } from 'vue';

import App from './App.vue';

const app = createApp(App);

if (import.meta.env.DEV) {
  let showKeyCodes = true;
  (window as any).keys = () => {
    showKeyCodes = true;
  };
  window.addEventListener('keyup', e => {
    if (!showKeyCodes) return;
    const log = [
      `event.code === '${e.code}'`,
      e.metaKey && 'event.metaKey',
      e.shiftKey && 'event.shiftKey',
      e.ctrlKey && 'event.ctrlKey',
    ]
      .filter(Boolean)
      .join(' && ');

    console.log(log);
  });
}

app.mount('#app');
