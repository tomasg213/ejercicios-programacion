export function validarNombre(nombre) {
  if (!nombre || nombre.length < 2) {
    return 'El nombre debe tener al menos 2 caracteres'
  }
  return null
}

export function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email || !regex.test(email)) {
    return 'Ingresa un email válido'
  }
  return null
}

export function validarTelefono(telefono) {
  const regex = /^\d{9,15}$/
  if (!telefono || !regex.test(telefono)) {
    return 'El teléfono debe tener entre 9 y 15 dígitos'
  }
  return null
}

export function validarMensaje(mensaje) {
  if (!mensaje || mensaje.length < 10) {
    return 'El mensaje debe tener al menos 10 caracteres'
  }
  return null
}

export function validarFormulario(datos) {
  const errores = {}
  
  const nombreError = validarNombre(datos.nombre)
  if (nombreError) errores.nombre = nombreError
  
  const emailError = validarEmail(datos.email)
  if (emailError) errores.email = emailError
  
  const telefonoError = validarTelefono(datos.telefono)
  if (telefonoError) errores.telefono = telefonoError
  
  const mensajeError = validarMensaje(datos.mensaje)
  if (mensajeError) errores.mensaje = mensajeError
  
  return {
    esValido: Object.keys(errores).length === 0,
    errores
  }
}
