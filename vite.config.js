// Este archivo le dice a Vite cómo debe trabajar con tu proyecto.

// 1. Importamos "defineConfig" desde Vite.
//    Es una función que nos ayuda a escribir la configuración de manera ordenada.
import { defineConfig } from 'vite'

// 2. Importamos el plugin de Vue.
//    Este plugin le enseña a Vite cómo entender los archivos .vue.
import vue from '@vitejs/plugin-vue'

// 3. Exportamos la configuración.
//    Aquí le decimos a Vite: "usa el plugin de Vue".
export default defineConfig({
  plugins: [vue()] // Activamos el soporte para Vue
})