<template>
  <!-- Contenedor principal de la pantalla de edición -->
  <section class="edit-container">
    <div class="card">
      <!-- Título de la sección -->
      <h2 class="title">Editar contacto</h2>

      <!-- Mensaje que aparece mientras se cargan los datos -->
      <p v-if="loading" class="loading">Cargando...</p>

      <!-- Formulario que se muestra cuando ya se cargaron los datos -->
      <!-- @submit.prevent="guardar" → ejecuta la función guardar y evita recargar la página -->
      <form v-if="!loading" @submit.prevent="guardar" class="form">
        
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

        <!-- Botón para guardar cambios -->
        <button class="btn">Guardar cambios</button>
      </form>

      <!-- Mensaje de error si ocurre algún problema -->
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </section>
</template>

<script setup>
  // Importa funciones de Vue para reactividad y ciclo de vida
  import { ref, onMounted } from 'vue'
  // Importa herramientas de Vue Router para obtener parámetros y redirigir
  import { useRoute, useRouter } from 'vue-router'
  // Importa helper para hacer peticiones a la API
  import { apiFetch } from '../helpers/api'

  // Obtiene la ruta actual y el router
  const route = useRoute()
  const router = useRouter()

  // Obtiene el id del contacto desde la URL
  const id = route.params.id

  // Variables reactivas para los datos del contacto
  const nombre = ref('')
  const apellido = ref('')
  const telefono = ref('')
  const email = ref('')
  const direccion = ref('')
  const notas = ref('')
  const loading = ref(true)   // indica si está cargando
  const error = ref('')       // almacena mensajes de error

  // Función para cargar la información del contacto desde la API
  async function cargar() {
    const res = await apiFetch('/contactos/')
    if (!res.ok) {
      error.value = res.message
      return
    }
    const contacto = res.data.find(c => c.id == id)

    if (!contacto) {
      error.value = 'Contacto no encontrado'
      return
    }

    // Asigna los datos del contacto a las variables reactivas
    nombre.value = contacto.nombre
    apellido.value = contacto.apellido
    telefono.value = contacto.telefono
    email.value = contacto.email
    direccion.value = contacto.direccion
    notas.value = contacto.notas

    loading.value = false
  }

  // Función para guardar los cambios en el contacto
  async function guardar() {
    const res = await apiFetch(`/contactos/actualizar.php?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        nombre: nombre.value,
        apellido: apellido.value,
        telefono: telefono.value,
        email: email.value,
        direccion: direccion.value,
        notas: notas.value
      })
    })

    // Si la actualización fue exitosa, redirige a la agenda
    if (res.ok) {
      router.push('/agenda')
    } else {
      error.value = res.message
    }
  }

  // Al montar el componente, se ejecuta la función cargar
  onMounted(cargar)
</script>

<style scoped>
  /* Estilos generales del contenedor */
  .edit-container {
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

  /* Mensaje de carga */
  .loading {
    text-align: center;
    color: #555;
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
    background: #0d6efd;
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
    background: #0b5ed7;
  }
</style>