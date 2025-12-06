import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Importa todas las vistas (pantallas) de la aplicación
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AgendaView from '../views/AgendaView.vue'
import ContactCreateView from '../views/ContactCreateView.vue'
import ContactEditView from '../views/ContactEditView.vue'
import ContactView from '../views/ContactView.vue'   
import ProfileView from '../views/ProfileView.vue'

// Definición de las rutas de la aplicación
const routes = [
  { path: '/', name: 'home', component: HomeView },                // Página principal
  { path: '/login', name: 'login', component: LoginView },         // Pantalla de inicio de sesión
  { path: '/registro', name: 'registro', component: RegisterView },// Pantalla de registro

  // Rutas protegidas (solo accesibles si el usuario está autenticado)
  { path: '/agenda', name: 'agenda', component: AgendaView, meta: { requiresAuth: true } },
  { path: '/agenda/crear', name: 'crear-contacto', component: ContactCreateView, meta: { requiresAuth: true } },
  { path: '/agenda/:id', name: 'editar-contacto', component: ContactEditView, meta: { requiresAuth: true } },
  { path: '/agenda/ver/:id', name: 'ver-contacto', component: ContactView, meta: { requiresAuth: true } },
  { path: '/perfil', name: 'perfil', component: ProfileView, meta: { requiresAuth: true } }
]

// Se crea el router con historial en modo web (URLs limpias sin #)
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard global de navegación: se ejecuta antes de cada cambio de ruta
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()   // Accede al store de autenticación

  // Si la ruta requiere autenticación y el usuario no está logueado → redirige al login
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next({ name: 'login' })

  // Si el usuario ya está autenticado e intenta ir a login o registro → redirige a la agenda
  } else if ((to.name === 'login' || to.name === 'registro') && auth.isAuthenticated) {
    next({ name: 'agenda' })

  // En cualquier otro caso → permite la navegación normalmente
  } else {
    next()
  }
})

export default router   // Exporta el router para usarlo en la aplicación principal