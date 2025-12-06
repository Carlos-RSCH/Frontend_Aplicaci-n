// Importa la función para crear la aplicación Vue
import { createApp } from 'vue'

// Importa Pinia, que es el gestor de estado (para manejar datos globales)
import { createPinia } from 'pinia'

// Importa el sistema de rutas que definiste en ./router
import router from './router'

// Importa el componente raíz de tu aplicación (App.vue)
import App from './App.vue'

// Importa los estilos principales de tu proyecto
import './assets/main.css'

// Crea la aplicación Vue usando el componente raíz App.vue
const app = createApp(App)

// Le dice a la aplicación que use Pinia (gestión de estado)
app.use(createPinia())

// Le dice a la aplicación que use el sistema de rutas
app.use(router)

// Finalmente, monta la aplicación en el elemento HTML con id="app"
// (normalmente en index.html tienes <div id="app"></div>)
app.mount('#app')