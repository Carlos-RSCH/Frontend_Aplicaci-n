import { defineStore } from 'pinia'

// Dirección base de la API
const API_BASE = 'http://localhost:8000/api'

// Se define el store de autenticación con Pinia
export const useAuthStore = defineStore('auth', {
  // Estado inicial del store
  state: () => ({
    token: localStorage.getItem('token') || '',   // token guardado en localStorage (si existe)
    user: JSON.parse(localStorage.getItem('user') || 'null'), // usuario guardado en localStorage
    loading: false,   // indica si hay una operación en curso (login/registro)
    error: ''         // almacena mensajes de error
  }),

  // Getters → valores derivados del estado
  getters: {
    isAuthenticated: (state) => !!state.token   // devuelve true si hay token (usuario autenticado)
  },

  // Actions → funciones que modifican el estado y realizan lógica
  actions: {
    // Guarda datos de autenticación en el store y en localStorage
    setAuthData(token, user) {
      this.token = token
      this.user = user
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
    },

    // Limpia datos de autenticación (logout)
    clearAuth() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },

    // Acción para iniciar sesión
    async login(username, password) {
      this.loading = true
      this.error = ''

      try {
        // Petición al backend para login
        const res = await fetch(`${API_BASE}/auth/login.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        })

        const data = await res.json()

        // Si la respuesta no es correcta, lanza error
        if (!res.ok || !data.ok) {
          throw new Error(data.message || 'Error al iniciar sesión')
        }

        // Si funciona, guarda token y usuario
        this.setAuthData(data.token, data.user)
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    // Acción para registrar un nuevo usuario
    async register(username, password) {
      this.loading = true
      this.error = ''

      try {
        // Petición al backend para registro
        const res = await fetch(`${API_BASE}/auth/registrar.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        })

        const data = await res.json()

        // Si la respuesta no es correcta, lanza error
        if (!res.ok || !data.ok) {
          throw new Error(data.message || 'Error al registrarse')
        }

        // Devuelve los datos de la respuesta (no guarda token aquí)
        return data
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    }
  }
})

//este código es el módulo central que controla el inicio de sesión, 
// registro y cierre de sesión en tu aplicación, 
// asegurando que el estado de autenticación se 
// mantenga sincronizado entre el frontend (Vue + Pinia) y el backend (PHP + MySQL).