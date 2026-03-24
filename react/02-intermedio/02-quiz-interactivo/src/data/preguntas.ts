import { Pregunta } from '../types'

export const preguntas: Pregunta[] = [
  // Ciencia
  {
    id: 1,
    categoria: 'ciencia',
    pregunta: '¿Qué gas constituye la mayor parte de la atmósfera terrestre?',
    opciones: ['Oxígeno', 'Nitrógeno', 'Dióxido de carbono', 'Hidrógeno'],
    respuestaCorrecta: 1,
    explicacion: 'El nitrógeno constituye aproximadamente el 78% de la atmósfera terrestre.'
  },
  {
    id: 2,
    categoria: 'ciencia',
    pregunta: '¿Cuál es el órgano más grande del cuerpo humano?',
    opciones: ['Hígado', 'Piel', 'Intestino', 'Cerebro'],
    respuestaCorrecta: 1,
    explicacion: 'La piel es el órgano más grande, cubriendo aproximadamente 2 metros cuadrados.'
  },
  // Historia
  {
    id: 3,
    categoria: 'historia',
    pregunta: '¿En qué año cayó el Muro de Berlín?',
    opciones: ['1987', '1989', '1991', '1993'],
    respuestaCorrecta: 1,
    explicacion: 'El Muro de Berlín cayó el 9 de noviembre de 1989.'
  },
  {
    id: 4,
    categoria: 'historia',
    pregunta: '¿Quién fue el primer emperador de Roma?',
    opciones: ['Julio César', 'Nerón', 'Augusto', 'Marco Antonio'],
    respuestaCorrecta: 2,
    explicacion: 'Augusto (Octavio Augusto) fue el primer emperador de Roma.'
  },
  // Tecnología
  {
    id: 5,
    categoria: 'tecnologia',
    pregunta: '¿Qué significa HTML?',
    opciones: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'],
    respuestaCorrecta: 0,
    explicacion: 'HTML significa Hyper Text Markup Language.'
  },
  {
    id: 6,
    categoria: 'tecnologia',
    pregunta: '¿En qué año se fundó Google?',
    opciones: ['1996', '1998', '2000', '2002'],
    respuestaCorrecta: 1,
    explicacion: 'Google fue fundado en 1998 por Larry Page y Sergey Brin.'
  },
  // Cultura
  {
    id: 7,
    categoria: 'cultura',
    pregunta: '¿Quién pintó "La Mona Lisa"?',
    opciones: ['Miguel Ángel', 'Leonardo da Vinci', 'Rafael', 'Botticelli'],
    respuestaCorrecta: 1,
    explicacion: 'La Mona Lisa fue pintada por Leonardo da Vinci.'
  },
  {
    id: 8,
    categoria: 'cultura',
    pregunta: '¿Cuál es el libro más vendido de la historia?',
    opciones: ['El Quijote', 'Harry Potter', 'La Biblia', 'El señor de los anillos'],
    respuestaCorrecta: 2,
    explicacion: 'La Biblia es el libro más vendido de la historia.'
  },
  // Más ciencia
  {
    id: 9,
    categoria: 'ciencia',
    pregunta: '¿Cuántos huesos tiene el cuerpo humano adulto?',
    opciones: ['186', '206', '226', '256'],
    respuestaCorrecta: 1,
    explicacion: 'El cuerpo humano adulto tiene 206 huesos.'
  },
  // Más tecnología
  {
    id: 10,
    categoria: 'tecnologia',
    pregunta: '¿Qué lenguaje de programación creó JavaScript?',
    opciones: ['Microsoft', 'Sun Microsystems', 'Netscape', 'Google'],
    respuestaCorrecta: 2,
    explicacion: 'JavaScript fue creado por Netscape en 1995.'
  }
]
