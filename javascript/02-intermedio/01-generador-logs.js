/**
 * Ejercicio 1: Generador de Logs de Aplicación
 * 
 * DevOps - Sistema de logging para producción.
 */

const fs = require('fs');
const path = require('path');

const LOG_LEVELS = {
    INFO: { nombre: 'INFO', color: '\x1b[34m' },
    WARNING: { nombre: 'WARNING', color: '\x1b[33m' },
    ERROR: { nombre: 'ERROR', color: '\x1b[31m' }
};
const RESET = '\x1b[0m';

class Logger {
    constructor(nombreArchivo = 'app') {
        this.logsDir = path.join(__dirname, 'logs');
        this.nombreArchivo = nombreArchivo;
        this.crearDirectorioLogs();
    }

    crearDirectorioLogs() {
        if (!fs.existsSync(this.logsDir)) {
            fs.mkdirSync(this.logsDir, { recursive: true });
        }
    }

    obtenerFechaActual() {
        return new Date().toISOString().replace('T', ' ').substring(0, 19);
    }

    obtenerNombreArchivo() {
        const fecha = new Date().toISOString().split('T')[0];
        return path.join(this.logsDir, `${fecha}.log`);
    }

    formatearMensaje(nivel, mensaje) {
        const timestamp = this.obtenerFechaActual();
        return `[${timestamp}] [${nivel.nombre}] ${mensaje}`;
    }

    log(nivel, mensaje) {
        const mensajeFormateado = this.formatearMensaje(nivel, mensaje);
        console.log(`${nivel.color}${mensajeFormateado}${RESET}`);
    }

    logToFile(nivel, mensaje) {
        const mensajeFormateado = this.formatearMensaje(nivel, mensaje);
        const archivoLog = this.obtenerNombreArchivo();
        
        try {
            fs.appendFileSync(archivoLog, mensajeFormateado + '\n');
        } catch (error) {
            console.error('Error al escribir en log:', error.message);
        }
    }

    info(mensaje) {
        this.log(LOG_LEVELS.INFO, mensaje);
        this.logToFile(LOG_LEVELS.INFO, mensaje);
    }

    warning(mensaje) {
        this.log(LOG_LEVELS.WARNING, mensaje);
        this.logToFile(LOG_LEVELS.WARNING, mensaje);
    }

    error(mensaje) {
        this.log(LOG_LEVELS.ERROR, mensaje);
        this.logToFile(LOG_LEVELS.ERROR, mensaje);
    }
}

const logger = new Logger();

logger.info('Aplicacion iniciada');
logger.warning('Intento de acceso sin autenticacion');
logger.error('Fallo al conectar con base de datos');
logger.info('Procesando solicitud del usuario');
logger.warning('Tiempo de respuesta elevado: 3000ms');
logger.error('Memoria disponible baja: 10%');

console.log('\nLogs guardados en:', logger.obtenerNombreArchivo());
