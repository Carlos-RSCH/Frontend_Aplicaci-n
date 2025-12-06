<template>
  <!-- Parte visual del componente -->
  <!-- Muestra la información de un contacto específico -->
  <section>
    <h2>Información del contacto</h2>

    <!-- Mensajes de estado -->
    <!-- Se muestra "Cargando..." mientras se obtiene la información -->
    <p v-if="loading">Cargando...</p>
    <!-- Se muestra un mensaje en rojo si ocurre un error -->
    <p v-if="error" style="color:red">{{ error }}</p>

    <!-- Si ya se cargó el contacto y no hay error -->
    <div v-if="contacto && !loading" class="card">
      <!-- Nombre y apellido del contacto -->
      <h3>{{ contacto.nombre }} {{ contacto.apellido }}</h3>

      <!-- Datos del contacto -->
      <p><strong>Teléfono:</strong> {{ contacto.telefono }}</p>
      <p v-if="contacto.email"><strong>Email:</strong> {{ contacto.email }}</p>
      <p v-if="contacto.direccion"><strong>Dirección:</strong> {{ contacto.direccion }}</p>
      <p v-if="contacto.notas"><strong>Notas:</strong> {{ contacto.notas }}</p>

      <!-- Botón para regresar a la agenda -->
      <br>
      <RouterLink to="/agenda">
        <button>Regresar</button>
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
  // Parte lógica del componente
  // Se importan herramientas de Vue, el router y un helper para llamadas a la API
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { apiFetch } from '../helpers/api'

  // Se obtiene la ruta actual y el parámetro "id" del contacto
  const route = useRoute()
  const id = route.params.id

  // Variables reactivas para manejar el estado
  const contacto = ref(null)   // almacena los datos del contacto
  const loading = ref(true)    // indica si se está cargando
  const error = ref('')        // almacena mensajes de error

  // Función para cargar la información del contacto desde la API
  async function cargar() {
    const res = await apiFetch('/contactos/')
    if (!res.ok) {
      error.value = res.message
      return
    }

    // Busca el contacto por su id dentro de los datos recibidos
    contacto.value = res.data.find(c => c.id == id)

    // Si no se encuentra, muestra error
    if (!contacto.value) {
      error.value = 'Contacto no encontrado'
      return
    }

    // Si todo va bien, se desactiva el estado de carga
    loading.value = false
  }

  // Al montar el componente, se ejecuta la función cargar
  onMounted(cargar)
</script>

<style>
  /* Estilos de la tarjeta que muestra la información del contacto */
  .card {
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 1rem;
    margin-top: 1rem;
  }
</style>