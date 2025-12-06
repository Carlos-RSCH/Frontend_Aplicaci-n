<template>
  <!-- Contenedor principal con estilos de ancho máximo, centrado, fondo blanco, padding, esquinas redondeadas y sombra -->
  <section class="max-w-md mx-auto mt-8 bg-white p-6 rounded shadow">
    <!-- Título del formulario -->
    <h2 class="text-2xl font-bold mb-4">Registro</h2>

    <!-- Formulario de registro -->
    <!-- @submit.prevent="onSubmit" → ejecuta la función onSubmit y evita que la página se recargue -->
    <!-- class="space-y-4" → agrega espacio vertical entre los elementos -->
    <form @submit.prevent="onSubmit" class="space-y-4">

      <!-- Campo de texto para el nombre de usuario -->
      <!-- v-model="username" → enlaza el input con la variable reactiva username -->
      <!-- placeholder="Usuario" → texto de ayuda dentro del campo -->
      <!-- required → obliga a que el campo no esté vacío -->
      <!-- class="..." → estilos de ancho completo, borde, padding y esquinas redondeadas -->
      <input 
        v-model="username" 
        placeholder="Usuario" 
        required
        class="w-full border px-3 py-2 rounded"
      />

      <!-- Campo de texto para la contraseña -->
      <!-- type="password" → oculta los caracteres al escribir -->
      <!-- v-model="password" → enlaza el input con la variable reactiva password -->
      <!-- placeholder="Contraseña" → texto de ayuda -->
      <!-- required → obligatorio -->
      <!-- class="..." → estilos similares al campo de usuario -->
      <input 
        v-model="password" 
        type="password" 
        placeholder="Contraseña" 
        required
        class="w-full border px-3 py-2 rounded"
      />

      <!-- Botón para enviar el formulario -->
      <!-- :disabled="auth.loading" → se desactiva mientras el store auth está cargando -->
      <!-- class="..." → estilos (azul, hover más oscuro, texto blanco, esquinas redondeadas) -->
      <button 
        :disabled="auth.loading"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        Registrarse
      </button>
    </form>

    <!-- Mensaje de error -->
    <!-- v-if="auth.error" → se muestra solo si existe un error en el store auth -->
    <!-- {{ auth.error }} → imprime el mensaje de error -->
    <p v-if="auth.error" class="text-red-600 mt-3">
      {{ auth.error }}
    </p>

    <!-- Mensaje de éxito -->
    <!-- v-if="success" → se muestra solo si la variable success es true -->
    <p v-if="success" class="text-green-600 mt-3">
      Registro exitoso, ahora puedes iniciar sesión.
    </p>
  </section>
</template>

<script setup>
  // Importa ref para crear variables reactivas
  import { ref } from 'vue'

  // Importa el store de autenticación (Pinia)
  import { useAuthStore } from '../stores/auth'

  // Instancia del store de autenticación
  const auth = useAuthStore()

  // Variables reactivas para usuario, contraseña y estado de éxito
  const username = ref('')
  const password = ref('')
  const success = ref(false)

  // Función que se ejecuta al enviar el formulario
  const onSubmit = async () => {
    // Reinicia el estado de éxito
    success.value = false
    
    // Llama al método register del store, enviando usuario y contraseña
    const ok = await auth.register(username.value, password.value)

    // Si el registro fue exitoso:
    if (ok) {
      success.value = true          // activa el mensaje de éxito
      username.value = ''           // limpia el campo usuario
      password.value = ''           // limpia el campo contraseña
    }
  }
</script>