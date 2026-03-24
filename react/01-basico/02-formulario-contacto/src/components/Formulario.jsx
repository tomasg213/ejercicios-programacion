import { useState } from 'react'
import { CampoFormulario } from './CampoFormulario'
import { validarFormulario, validarNombre, validarEmail, validarTelefono, validarMensaje } from './Validacion'

export function Formulario() {
  const [datos, setDatos] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  })
  
  const [errores, setErrores] = useState({})
  const [touched, setTouched] = useState({})
  const [estado, setEstado] = useState('idle') // idle, loading, success, error
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setDatos(prev => ({ ...prev, [name]: value }))
    
    if (touched[name]) {
      validarCampo(name, value)
    }
  }
  
  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    validarCampo(name, value)
  }
  
  const validarCampo = (name, value) => {
    let error = null
    
    switch (name) {
      case 'nombre':
        error = validarNombre(value)
        break
      case 'email':
        error = validarEmail(value)
        break
      case 'telefono':
        error = validarTelefono(value)
        break
      case 'mensaje':
        error = validarMensaje(value)
        break
    }
    
    setErrores(prev => ({ ...prev, [name]: error }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const validacion = validarFormulario(datos)
    if (!validacion.esValido) {
      setErrores(validacion.errores)
      setTouched({ nombre: true, email: true, telefono: true, mensaje: true })
      return
    }
    
    setEstado('loading')
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setEstado('success')
      setDatos({ nombre: '', email: '', telefono: '', mensaje: '' })
      setErrores({})
      setTouched({})
    } catch (error) {
      setEstado('error')
    }
  }
  
  const handleReset = () => {
    setDatos({ nombre: '', email: '', telefono: '', mensaje: '' })
    setErrores({})
    setTouched({})
    setEstado('idle')
  }
  
  return (
    <form className="formulario-contacto" onSubmit={handleSubmit}>
      <h2>Formulario de Contacto</h2>
      
      <CampoFormulario
        label="Nombre"
        name="nombre"
        value={datos.nombre}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errores.nombre}
      />
      
      <CampoFormulario
        label="Email"
        name="email"
        type="email"
        value={datos.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errores.email}
      />
      
      <CampoFormulario
        label="Teléfono"
        name="telefono"
        type="tel"
        value={datos.telefono}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errores.telefono}
      />
      
      <CampoFormulario
        label="Mensaje"
        name="mensaje"
        type="textarea"
        value={datos.mensaje}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errores.mensaje}
      />
      
      <div className="botones">
        <button type="submit" disabled={estado === 'loading'}>
          {estado === 'loading' ? 'Enviando...' : 'Enviar'}
        </button>
        <button type="button" onClick={handleReset}>Limpiar</button>
      </div>
      
      {estado === 'success' && (
        <div className="mensaje-exito">✓ Mensaje enviado correctamente</div>
      )}
      
      {estado === 'error' && (
        <div className="mensaje-error">✗ Error al enviar el mensaje</div>
      )}
    </form>
  )
}
