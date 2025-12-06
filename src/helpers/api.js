// src/helpers/api.js
import { useAuthStore } from '../stores/auth'   // Importa el store de autenticación
import router from '../router'                  // Importa el router para poder redirigir

// Dirección base de la API — BACKEND EN RENDER
const API_BASE = 'https://backend1-aplicaci-n.onrender.com/api'

// Función auxiliar para hacer peticiones a la API
export async function apiFetch(endpoint, options = {}) {
  const auth = useAuthStore()   // Accede al store de autenticación

  // Configuración inicial de los headers
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})   // Permite sobrescribir o agregar más headers
  }

  // Agregar token de autenticación si existe
  if (auth.token) {
    headers['Authorization'] = `Bearer ${auth.token}`
  }

  let response

  try {
    // Realiza la petición al servidor con fetch
    response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    })
  } catch (err) {
    // Si no se puede conectar con el servidor, devuelve un error uniforme
    return {
      ok: false,
      message: 'No se pudo conectar con el servidor.'
    }
  }

  let data = {}
  try {
    // Intenta convertir la respuesta en JSON
    data = await response.json()
  } catch (err) {
    // Si falla, deja data como objeto vacío
    data = {}
  }

  // Si el servidor devuelve 401 (token inválido o expirado)
  if (response.status === 401) {
    auth.clearAuth()            // Limpia la sesión en el store
    router.push('/login')       // Redirige al login
    return { ok: false, message: 'Sesión expirada. Inicia sesión nuevamente.' }
  }

  // Devuelve un objeto con formato uniforme para todas las respuestas
  return {
    ok: data.ok ?? response.ok,       // true/false según éxito
    data: data.data ?? null,          // datos recibidos (si existen)
    message: data.message ?? null     // mensaje recibido (si existe)
  }
}//su función principal es simplificar y asegurar la comunicación con la API, manejando tokens, errores y respuestas de forma consistente en toda tu aplicación.