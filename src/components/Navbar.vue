<template>
  <!-- Barra de navegación principal -->
  <nav class="navbar">
    <!-- Logo que redirige al inicio -->
    <div class="logo">
      <RouterLink to="/">FastAgenda</RouterLink>
    </div>

    <!-- Enlaces de navegación -->
    <div class="links">
      <!-- Si el usuario está autenticado, muestra enlaces a Agenda y Perfil -->
      <RouterLink v-if="isAuthenticated" to="/agenda" class="nav-link">Agenda</RouterLink>
      <RouterLink v-if="isAuthenticated" to="/perfil" class="nav-link">Perfil</RouterLink>

      <!-- Si el usuario NO está autenticado, muestra enlaces a Login y Registro -->
      <RouterLink v-if="!isAuthenticated" to="/login" class="nav-link">Login</RouterLink>
      <RouterLink v-if="!isAuthenticated" to="/registro" class="nav-link">Registro</RouterLink>

      <!-- Botón de salir, visible solo si el usuario está autenticado -->
      <button 
        v-if="isAuthenticated" 
        @click="logout" 
        class="btn-logout"
      >
        Salir
      </button>
    </div>
  </nav>
</template>

<script setup>
  // Importa RouterLink para navegación y useRouter para redirecciones
  import { RouterLink, useRouter } from 'vue-router'
  // Importa storeToRefs para extraer valores reactivos del store
  import { storeToRefs } from 'pinia'
  // Importa el store de autenticación
  import { useAuthStore } from '../stores/auth'

  // Instancia del store de autenticación
  const auth = useAuthStore()
  // Extrae el getter isAuthenticated como referencia reactiva
  const { isAuthenticated } = storeToRefs(auth)
  // Instancia del router para redirecciones
  const router = useRouter()

  // Función de logout: limpia la sesión y redirige al login
  const logout = () => {
    auth.clearAuth()
    router.push({ name: 'login' })
  }
</script>

<style scoped>
  /* Estilos de la barra de navegación */
  .navbar {
    background: #0d6efd;
    color: white;
    padding: 14px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 3px 10px rgba(0,0,0,0.15);
  }

  /* Estilo del logo */
  .logo a {
    color: white;
    font-size: 22px;
    font-weight: 700;
    text-decoration: none;
  }

  /* Contenedor de enlaces */
  .links {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  /* Estilo de los enlaces */
  .nav-link {
    color: white;
    font-weight: 500;
    text-decoration: none;
    transition: 0.2s;
  }

  .nav-link:hover {
    color: #dfe9ff;
  }

  /* Botón de salir */
  .btn-logout {
    background: #dc3545;
    border: none;
    padding: 8px 14px;
    border-radius: 6px;
    color: white;
    cursor: pointer;
    font-weight: 600;
    transition: 0.2s;
  }

  .btn-logout:hover {
    background: #bb2d3b;
  }

  /* menú de navegación central de la aplicación */
</style>
