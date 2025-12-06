<template>
  <!-- Contenedor principal de la pantalla para crear un nuevo contacto -->
  <section class="create-container">
    <div class="card">
      <!-- Título de la sección -->
      <h2 class="title">Crear contacto</h2>

      <!-- Formulario para ingresar los datos del nuevo contacto -->
      <!-- @submit.prevent="crear" → ejecuta la función crear y evita recargar la página -->
      <form @submit.prevent="crear" class="form">

        <!-- Campos de nombre y apellido en dos columnas -->
        <div class="grid-2">
          <input v-model="nombre" class="input" placeholder="Nombre" required />
          <input v-model="apellido" class="input" placeholder="Apellido" />
        </div>

        <!-- Campos adicionales del contacto -->
        <input v-model="telefono" class="input" placeholder="Teléfono" required />
        <input v-model="email" class="input" placeholder="Correo electrónico" />
        <input v-model="direccion" class="input" placeholder="Dirección" />

        <!-- Campo de notas -->
        <textarea v-model="notas" class="textarea" placeholder="Notas"></textarea>

        <!-- Botón para guardar el nuevo contacto -->
        <button class="btn">Guardar</button>
      </form>

      <!-- Mensaje de error si ocurre algún problema -->
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </section>
</template>

<script setup>
  // Importa funciones de Vue para reactividad
  import { ref } from 'vue'
  // Importa el router para redirigir después de crear el contacto
  import { useRouter } from 'vue-router'
  // Importa helper para hacer peticiones a la API
  import { apiFetch } from '../helpers/api'

  // Variables reactivas para los datos del nuevo contacto
  const nombre = ref('')
  const apellido = ref('')
  const telefono = ref('')
  const email = ref('')
  const direccion = ref('')
  const notas = ref('')
  const error = ref('')

  // Instancia del router
  const router = useRouter()

  // Función para crear un nuevo contacto
  async function crear() {
    const res = await apiFetch('/contactos/crear.php', {
      method: 'POST',
      body: JSON.stringify({
        nombre: nombre.value,
        apellido: apellido.value,
        telefono: telefono.value,
        email: email.value,
        direccion: direccion.value,
        notas: notas.value
      })
    })

    // Si la creación fue exitosa, redirige a la agenda
    if (res.ok) {
      router.push('/agenda')
    } else {
      // Si falla, muestra el mensaje de error
      error.value = res.message
    }
  }
</script>

<style scoped>
  /* Contenedor principal centrado */
  .create-container {
    display: flex;
    justify-content: center;
    padding: 40px 20px;
  }

  /* Tarjeta que contiene el formulario */
  .card {
    width: 100%;
    max-width: 650px;
    background: #fff;
    padding: 35px;
    border-radius: 16px;
    box-shadow: 0 0 25px rgba(0,0,0,0.1);
  }

  /* Estilo del título */
  .title {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
  }

  /* Mensaje de error */
  .error {
    color: red;
    margin-top: 15px;
    text-align: center;
  }

  /* Formulario en columna */
  .form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  /* Grid para nombre y apellido */
  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  /* Estilo de los inputs */
  .input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 15px;
  }

  .input:focus {
    border-color: #007bff;
    outline: none;
  }

  /* Estilo del textarea */
  .textarea {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
    resize: vertical;
    min-height: 80px;
  }

  /* Botón de guardar */
  .btn {
    background: #198754;
    color: white;
    padding: 12px;
    border-radius: 8px;
    border: none;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
  }

  .btn:hover {
    background: #157347;
  }
</style>