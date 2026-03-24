export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Contacto</h4>
            <p>info@agenciadigital.com</p>
            <p>+1 234 567 890</p>
          </div>
          <div className="footer-section">
            <h4>Síguenos</h4>
            <p>Twitter | LinkedIn | Instagram</p>
          </div>
          <div className="footer-section">
            <h4>Dirección</h4>
            <p>Calle Principal 123</p>
            <p>Ciudad, País</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Agencia Digital. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
