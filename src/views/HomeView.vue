<template>
  <!-- Parte visual del componente -->
  <!-- Es la pantalla de inicio (home) de la aplicación -->
  <section class="home-container">
    <div class="card">
      <!-- Título principal -->
      <h1 class="title">Bienvenido a la Agenda de Contactos</h1>

      <!-- Texto descriptivo del proyecto -->
      <p class="subtitle">
        Proyecto Full Stack con 
        <strong>Vue 3</strong>, 
        <strong>Pinia</strong>, 
        <strong>Vue Router</strong>, 
        <strong>PHP</strong> y 
        <strong>MySQL</strong>.
      </p>

      <!-- Botones de navegación -->
      <!-- router-link → enlaces que usan Vue Router para cambiar de página -->
      <router-link to="/login" class="btn">Iniciar sesión</router-link>
      <router-link to="/registro" class="btn-secondary">Registrarme</router-link>
    </div>
  </section>
</template>

<style scoped>
  /* Parte de estilos del componente */
  /* Define el diseño de la pantalla de inicio */

  /* Contenedor principal: centra el contenido vertical y horizontalmente */
  .home-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    padding: 20px;
  }

  /* Tarjeta que contiene el título, descripción y botones */
  .card {
    max-width: 500px;
    background: white;
    padding: 35px;
    border-radius: 16px;
    text-align: center;
    box-shadow: 0 0 25px rgba(0,0,0,0.1);
  }

  /* Estilo del título */
  .title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 15px;
  }

  /* Estilo del subtítulo */
  .subtitle {
    font-size: 16px;
    margin-bottom: 25px;
    color: #555;
  }

  /* Botón principal (login) */
  .btn {
    display: block;
    width: 100%;
    padding: 12px;
    margin-bottom: 12px;
    background: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    transition: 0.2s;
  }
  .btn:hover {
    background: #0064d6;
  }

  /* Botón secundario (registro) */
  .btn-secondary {
    display: block;
    width: 100%;
    padding: 12px;
    background: #444;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    transition: 0.2s;
  }
  .btn-secondary:hover {
    background: #222;
  }
</style>