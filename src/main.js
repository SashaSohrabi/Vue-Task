import 'vue-toastification/dist/index.css';
import './assets/base.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Toast from 'vue-toastification';

const app = createApp(App);

app.use(router);
app.use(Toast, {
  // Toast configuration options
  position: 'top-right',
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
});

app.mount('#app');
