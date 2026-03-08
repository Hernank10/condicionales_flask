# 🎓 Constructor de Oraciones Condicionales

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![Flask](https://img.shields.io/badge/Flask-2.3.2-green.svg)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

Aplicación web educativa interactiva para aprender y practicar las **oraciones condicionales en español** según las normas de la **Real Academia Española (RAE)**. Incluye 5 juegos educativos con sistema de progreso, estadísticas y autenticación de usuarios.

<div align="center">
    <img src="https://via.placeholder.com/800x400/2c3e50/ffffff?text=Constructor+de+Oraciones+Condicionales" alt="Captura de la aplicación" width="80%">
</div>

## 📋 Tabla de Contenidos
- [Características](#-características)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Los 5 Juegos](#-los-5-juegos)
- [Tipos de Oraciones Condicionales](#-tipos-de-oraciones-condicionales)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [API Endpoints](#-api-endpoints)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)
- [Contacto](#-contacto)

## ✨ Características

- ✅ **5 Juegos Interactivos** para practicar diferentes aspectos de las condicionales
- ✅ **Sistema de Usuarios** con registro, inicio de sesión y progreso personalizado
- ✅ **Estadísticas detalladas** con puntuación, niveles y rachas
- ✅ **Base de datos** con 15+ ejemplos de oraciones condicionales clasificadas
- ✅ **Interfaz responsive** que funciona en móviles, tablets y escritorio
- ✅ **Retroalimentación inmediata** en cada ejercicio
- ✅ **Historial de partidas** para seguir tu progreso
- ✅ **Diseño moderno** con Bootstrap 5 y colores atractivos

## 📸 Capturas de Pantalla

<div align="center">
    <table>
        <tr>
            <td><img src="https://via.placeholder.com/300x200/3498db/ffffff?text=Menú+Principal" width="100%"></td>
            <td><img src="https://via.placeholder.com/300x200/2ecc71/ffffff?text=Juego+1" width="100%"></td>
        </tr>
        <tr>
            <td align="center">Menú Principal</td>
            <td align="center">Juego 1: Construye la Oración</td>
        </tr>
        <tr>
            <td><img src="https://via.placeholder.com/300x200/f39c12/ffffff?text=Juego+2" width="100%"></td>
            <td><img src="https://via.placeholder.com/300x200/9b59b6/ffffff?text=Estadísticas" width="100%"></td>
        </tr>
        <tr>
            <td align="center">Juego 2: Clasifica el Tipo</td>
            <td align="center">Panel de Estadísticas</td>
        </tr>
    </table>
</div>

## 🛠️ Tecnologías Utilizadas

### Backend
- **Python 3.8+** - Lenguaje de programación
- **Flask 2.3.2** - Framework web
- **Flask-SQLAlchemy** - ORM para base de datos
- **Flask-Login** - Gestión de sesiones y autenticación
- **Werkzeug** - Seguridad y hashing de contraseñas
- **SQLite** - Base de datos

### Frontend
- **Bootstrap 5** - Framework CSS
- **jQuery** - Manipulación del DOM y AJAX
- **HTML5** - Estructura de la interfaz
- **CSS3** - Estilos personalizados
- **JavaScript** - Lógica de los juegos

## 📦 Requisitos Previos

- Python 3.8 o superior
- pip (gestor de paquetes de Python)
- Git (opcional, para clonar)

## 🚀 Instalación

### 1. Clonar el repositorio
```bash
###git clone https://github.com/Hernank10/condicionales_flask.git
###cd condicionales_flask


###🎮 Los 5 Juegos
###🎯 Juego 1: Construye la Oración
###Crea oraciones condicionales similares a los ejemplos proporcionados. Practica la estructura correcta usando "si" y coma.

###Ejemplo:

###text
###📝 Modelo: "Si llueve, nos quedamos en casa."
###✍️  Tu turno: "Si hace sol, vamos a la playa."
###✅ ¡Correcto!
###🏷️ Juego 2: Clasifica el Tipo
###Identifica si una oración es Real, Potencial o Irreal según las normas de la RAE.

###Opciones:

###🔵 Real: Condición posible (presente/futuro factible)

###🟢 Potencial: Condición improbable (hipotética)

###🔴 Irreal: Condición imposible (pasado no cumplido)

🔤 Juego 3: Completa los Huecos
Rellena los espacios en blanco en oraciones condicionales. Pon a prueba tu vocabulario y comprensión.

Ejemplo:

text
Oración: "Si _____ dinero, compraría una casa."
Respuesta: "tuviera"
🔀 Juego 4: Ordena las Palabras
Organiza palabras desordenadas para formar oraciones correctas. Mejora tu sintaxis.

Ejemplo:

text
Palabras: "casa" "quedamos" "llueve" "nos" "en" "Si" ","
Orden correcto: "Si llueve, nos quedamos en casa."
🧠 Juego 5: Memoria Condicional
Encuentra pares de condición y consecuencia. Un juego de memoria para aprender divirtiéndote.

text
Cartas: [❓] [❓] [❓] [❓]
        [❓] [❓] [❓] [❓]
¡Encuentra los 4 pares!
📚 Tipos de Oraciones Condicionales
Tipo	Descripción	Estructura	Ejemplo
Reales	Condiciones posibles en presente/futuro	Si + Presente Indicativo + Presente/Futuro	"Si estudias, apruebas el examen."
Potenciales	Condiciones improbables o hipotéticas	Si + Imperfecto Subjuntivo + Condicional	"Si tuviera dinero, viajaría por el mundo."
Irreales	Condiciones imposibles (pasado)	Si + Pluscuamperfecto Subjuntivo + Condicional Compuesto	"Si hubieras estudiado, habrías aprobado."
###📁 Estructura del Proyecto
###text
condicionales_flask/
│
├── app.py                 # Aplicación principal Flask
├── requirements.txt       # Dependencias del proyecto
├── utils.py               # Funciones auxiliares
├── README.md              # Documentación
├── .gitignore             # Archivos ignorados por Git
│
├── static/                # Archivos estáticos
│   ├── css/
│   │   └── style.css      # Estilos personalizados
│   ├── js/
│   │   └── games.js       # Lógica de juegos
│   └── images/            # Imágenes del proyecto
│
├── templates/             # Plantillas HTML
│   ├── base.html          # Plantilla base
│   ├── index.html         # Página principal
│   ├── login.html         # Inicio de sesión
│   ├── register.html      # Registro de usuarios
│   ├── stats.html         # Estadísticas
│   └── games/             # Juegos
│       ├── game1.html     # Juego 1: Construye la Oración
│       ├── game2.html     # Juego 2: Clasifica el Tipo
│       ├── game3.html     # Juego 3: Completa los Huecos
│       ├── game4.html     # Juego 4: Ordena las Palabras
│       └── game5.html     # Juego 5: Memoria Condicional
│
└── instance/              # Base de datos (se crea automáticamente)
    └── condicionales.db   # Base de datos SQLite
🔌 API Endpoints
La aplicación proporciona endpoints RESTful para la comunicación asíncrona:

Endpoint	Método	Descripción
/api/random_example	GET	Obtiene un ejemplo aleatorio
/api/update_score	POST	Actualiza la puntuación del usuario
/api/user_stats	GET	Obtiene estadísticas del usuario
/api/classify	POST	Clasifica una oración
🤝 Contribuir
Las contribuciones son bienvenidas. Para contribuir:

Fork el repositorio

Crea una rama para tu feature (git checkout -b feature/NuevaCaracteristica)

Commit tus cambios (git commit -m 'Agregar nueva característica')

Push a la rama (git push origin feature/NuevaCaracteristica)

Abre un Pull Request

📝 Licencia
Este proyecto está bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.

👨‍💻 Autor
Hernán Rodríguez

GitHub: @Hernank10

🙏 Agradecimientos
A la Real Academia Española (RAE) por las normas gramaticales

A la comunidad de Flask y Bootstrap por sus excelentes frameworks

A todos los estudiantes de español que usarán esta herramienta

📊 Estado del Proyecto
https://img.shields.io/badge/Progress-100%2525-brightgreen.svg
https://img.shields.io/badge/Build-Passing-success.svg
https://img.shields.io/badge/Version-1.0.0-blue.svg

<div align="center"> <p>⭐ ¡No olvides darle una estrella si te gustó el proyecto! ⭐</p> <p>Hecho con ❤️ para estudiantes de español</p> </div> ```
