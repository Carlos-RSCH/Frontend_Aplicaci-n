<template>
  <!-- Contenedor principal de la agenda -->
  <section class="agenda-container">
    
    <!-- Encabezado con título y botón para crear un nuevo contacto -->
    <div class="header">
      <h2 class="title">Mis Contactos</h2>

      <!-- Enlace hacia la pantalla de creación de contacto -->
      <RouterLink to="/agenda/crear">
        <button class="btn-primary">+ Nuevo contacto</button>
      </RouterLink>
    </div>

    <!-- Mensajes de estado -->
    <p v-if="loading" class="loading">Cargando contactos...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <!-- Lista de contactos en forma de tarjetas -->
    <div v-if="contactos.length > 0" class="grid">
      <div 
        v-for="c in contactos" 
        :key="c.id" 
        class="card"
      >
        <!-- Nombre y apellido del contacto -->
        <h3 class="name">{{ c.nombre }} {{ c.apellido }}</h3>

        <!-- Teléfono y otros datos opcionales -->
        <p><strong>Tel:</strong> {{ c.telefono }}</p>
        <p v-if="c.email"><strong>Email:</strong> {{ c.email }}</p>

        <!-- Acciones disponibles para cada contacto -->
        <div class="actions">
          <!-- Ver detalle del contacto -->
          <RouterLink :to="`/agenda/ver/${c.id}`">
            <button class="btn-view">Ver</button>
          </RouterLink>

          <!-- Editar contacto -->
          <RouterLink :to="`/agenda/${c.id}`">
            <button class="btn-edit">Editar</button>
          </RouterLink>

          <!-- Eliminar contacto -->
          <button class="btn-delete" @click="eliminar(c.id)">Eliminar</button>
        </div>
      </div>
    </div>

    <!-- Mensaje si no hay contactos y ya terminó la carga -->
    <p v-else-if="!loading" class="empty">No tienes contactos aún</p>
    
  </section>
</template>

<script setup>
  // Importa funciones de Vue para reactividad y ciclo de vida
  import { ref, onMounted } from 'vue'
  // Importa RouterLink para navegación
  import { RouterLink } from 'vue-router'
  // Importa helper para llamadas a la API
  import { apiFetch } from '../helpers/api'

  // Variables reactivas para lista de contactos, estado de carga y error
  const contactos = ref([])
  const loading = ref(true)
  const error = ref('')

  // Función para cargar contactos desde la API
  async function cargarContactos() {
    const res = await apiFetch('/contactos/')
    if (!res || !res.ok) {
      error.value = res?.message || 'Error al cargar contactos'
    } else {
      contactos.value = res.data
    }
    loading.value = false
  }

  // Función para eliminar un contacto
  async function eliminar(id) {
    if (!confirm('¿Seguro que deseas eliminar este contacto?')) return

    const res = await apiFetch(`/contactos/eliminar.php?id=${id}`, {
      method: 'DELETE'
    })

    if (res.ok) {
      // Si se elimina correctamente, se actualiza la lista filtrando el contacto borrado
      contactos.value = contactos.value.filter(c => c.id !== id)
    } else {
      alert(res.message)
    }
  }

  // Al montar el componente, se cargan los contactos
  onMounted(cargarContactos)
</script>

<style scoped>
  /* Estilos generales del contenedor de la agenda */
  .agenda-container {
    padding: 30px 20px;
  }

  /* Encabezado con título y botón */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
  }

  .title {
    font-size: 26px;
    font-weight: bold;
  }

  /* Mensajes de estado */
  .loading, .error, .empty {
    text-align: center;
    margin-top: 15px;
    font-size: 17px;
  }

  .error {
    color: red;
  }

  /* Grid de tarjetas de contactos */
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    gap: 20px;
  }

  /* Tarjeta de cada contacto */
  .card {
    background: #fff;
    padding: 20px;
    border-radius: 14px;
    box-shadow: 0 4px 14px rgba(0,0,0,0.08);
    border: 1px solid #e5e5e5;
    transition: 0.2s;
  }

  .card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 18px rgba(0,0,0,0.12);
  }

  .name {
    font-size: 20px;
    margin-bottom: 10px;
  }

  /* Contenedor de acciones */
  .actions {
    margin-top: 15px;
    display: flex;
    gap: 10px;
  }

  /* Botón para crear nuevo contacto */
  .btn-primary {
    background: #0d6efd;
    color: white;
    padding: 10px 14px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: 0.2s;
  }

  .btn-primary:hover {
    background: #0b5ed7;
  }

  /* Botón ver */
  .btn-view {
    background: #2563eb;
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    border: none;
    font-weight: 600;
    cursor: pointer;
  }

  .btn-view:hover {
    background: #1e4ec9;
  }

  /* Botón editar */
  .btn-edit {
    background: #ffc107;
    color: #000;
    padding: 8px 12px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    transition: 0.2s;
  }

  .btn-edit:hover {
    background: #e0a800;
  }

  /* Botón eliminar */
  .btn-delete {
    background: #dc3545;
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    transition: 0.2s;
  }

  .btn-delete:hover {
    background: #bb2d3b;
  }
</style>