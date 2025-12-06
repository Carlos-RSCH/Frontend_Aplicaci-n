<template>
  <!-- Parte visual del componente -->
  <!-- Es una sección centrada con estilos, que muestra el formulario de inicio de sesión -->
  <section class="login-container">
    <h2>Iniciar sesión</h2>

    <!-- Formulario de login -->
    <!-- @submit.prevent="onSubmit" → ejecuta la función onSubmit y evita que la página se recargue -->
    <form @submit.prevent="onSubmit" class="login-form">
      <!-- Campo para el nombre de usuario -->
      <input v-model="username" placeholder="Usuario" required class="input" />

      <!-- Campo para la contraseña -->
      <input v-model="password" type="password" placeholder="Contraseña" required class="input" />

      <!-- Botón para enviar el formulario -->
      <!-- :disabled="auth.loading" → se desactiva mientras el store auth está procesando -->
      <button :disabled="auth.loading" class="btn">
        Entrar
      </button>
    </form>

    <!-- Mensaje de error si el login falla -->
    <p v-if="auth.error" class="error">{{ auth.error }}</p>
  </section>
</template>

<script setup>
  // Parte lógica del componente
  // Se importan herramientas de Vue, el router y el store de autenticación
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '../stores/auth'

  // Se accede al store de autenticación
  const auth = useAuthStore()

  // Se accede al router para poder redirigir después del login
  const router = useRouter()

  // Variables reactivas para usuario y contraseña
  const username = ref('')
  const password = ref('')

  // Función que se ejecuta al enviar el formulario
  // Llama al método login del store y, si funciona, redirige a la ruta "agenda"
  const onSubmit = async () => {
    try {
      await auth.login(username.value, password.value)
      router.push({ name: 'agenda' })
    } catch (err) {
      // El error ya se maneja dentro del store
    }
  }
</script>

<style scoped>
  /* Parte de estilos del componente */
  /* Define el diseño del formulario: caja centrada, inputs con bordes redondeados, botón azul */
  .login-container {
    max-width: 350px;
    margin: 80px auto;
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 0 20px rgba(0,0,0,0.1);
    text-align: center;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .input {
    padding: 10px;
    border: 1px solid gray;
    border-radius: 8px;
    font-size: 15px;
  }

  .btn {
    background: #007bff;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }

  .btn:disabled {
    background: #999;
  }

  .error {
    color: red;
    margin-top: 10px;
  }
</style>