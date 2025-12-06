<template>
  <!-- Parte visual del componente -->
  <!-- Es una sección centrada con estilos, que muestra el perfil del usuario -->
  <section class="max-w-md mx-auto mt-8 bg-white p-6 rounded shadow">
    <h2 class="text-2xl font-bold mb-4">Perfil del Usuario</h2>

    <!-- Si está cargando, se muestra un mensaje -->
    <div v-if="loading" class="text-gray-600">Cargando perfil...</div>

    <!-- Si ya cargó, se muestra el formulario -->
    <div v-else>
      <form @submit.prevent="updateProfile" class="space-y-4">
        <!-- Campo editable para el nombre de usuario -->
        <div>
          <label class="block font-semibold mb-1">Nombre de Usuario</label>
          <input v-model="username" class="w-full border px-3 py-2 rounded" required />
        </div>

        <!-- Botón para guardar cambios -->
        <button class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
          Guardar Cambios
        </button>
      </form>

      <!-- Mensaje de éxito si se actualiza correctamente -->
      <p v-if="success" class="text-green-600 mt-4">
        Perfil actualizado correctamente.
      </p>

      <!-- Mensaje de error si algo falla -->
      <p v-if="error" class="text-red-600 mt-4">
        {{ error }}
      </p>
    </div>
  </section>
</template>

<script setup>
  // Parte lógica del componente
  // Se importan herramientas de Vue y el store de autenticación
  import { ref, onMounted } from 'vue'
  import { useAuthStore } from '../stores/auth'

  // Se accede al store de autenticación
  const auth = useAuthStore()

  // Variables reactivas para manejar estado del perfil
  const username = ref('')
  const loading = ref(true)
  const error = ref('')
  const success = ref(false)

  // Dirección base de la API
  const API_BASE = 'http://localhost:8000/api'

  // Al montar el componente, se carga el perfil desde el backend
  onMounted(async () => {
    loading.value = true
    error.value = ''
    success.value = false

    try {
      // Se hace una petición al backend para obtener datos del perfil
      const res = await fetch(`${API_BASE}/auth/perfil.php`, {
        headers: { 'Authorization': 'Bearer ' + auth.token }
      })

      const data = await res.json()

      // Si la respuesta no es correcta, se muestra error
      if (!data.ok) {
        error.value = data.message
        return
      }

      // Si es correcta, se guarda el nombre de usuario en la variable reactiva
      username.value = data.user.nombre_de_usuario

    } catch (err) {
      error.value = 'No se pudo cargar el perfil.'
    } finally {
      loading.value = false
    }
  })

  // Función para actualizar el perfil
  const updateProfile = async () => {
    loading.value = true
    error.value = ''
    success.value = false

    try {
      // Se envía la actualización al backend
      const res = await fetch(`${API_BASE}/auth/editar.php`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth.token
        },
        body: JSON.stringify({ username: username.value })
      })

      const data = await res.json()

      // Si falla, se muestra error
      if (!data.ok) {
        error.value = data.message
        return
      }

      // Si funciona, se muestra éxito y se actualiza el store y localStorage
      success.value = true
      auth.user.nombre_de_usuario = username.value
      localStorage.setItem('user', JSON.stringify(auth.user))

    } catch (err) {
      error.value = 'No se pudo actualizar el perfil.'
    } finally {
      loading.value = false
    }
  }
</script>