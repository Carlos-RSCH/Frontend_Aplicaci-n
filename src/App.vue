<template>
  <div>
    <!-- Aquí se muestra la barra de navegación -->
    <Navbar />

    <!-- Contenedor principal de la página -->
    <main class="container">
      <!-- router-view es el espacio donde se cargan las páginas según la ruta -->
      <router-view />
    </main>
  </div>
</template>

<script setup>
  // Importa el componente Navbar para usarlo en la plantilla
  import Navbar from './components/Navbar.vue'
</script>