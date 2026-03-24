export function CampoFormulario({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  error, 
  onBlur 
}) {
  const tieneError = !!error
  
  return (
    <div className={`campo-formulario ${tieneError ? 'error' : ''}`}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {tieneError && <span className="mensaje-error">{error}</span>}
    </div>
  )
}
