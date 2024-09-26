Spoti Player 🎵

Descripción
Spoti Player es una aplicación web inspirada ,en gran parte, en la estética  de Spotify para la gestión y reproducción de pistas de música desde un servidor local, diseñada para una agrupación musical amateur, permitiendo compartir bases musicales, ensayos, arreglos, versiones, y facilitar el intercambio de gustos musicales entre los miembros, dando a conocer obras o artistas de interés para el grupo.

La aplicación cuenta con un único administrador, quien se encarga de gestionar el contenido y los usuarios. Los demás usuarios pueden registrarse, acceder a sus cuentas y disfrutar del contenido disponible, pero no tienen permisos para administrar o modificar los datos.

Actualmente, la aplicación está siendo desarrollada con Angular utilizando el modo tradicional (standalone: false) para practicar y familiarizarse con versiones anteriores del framework. En una fase posterior, se actualizará a la versión más moderna de Angular con standalone: true.

Características ✨
Interfaz similar a Spotify: Estética y diseño inspirados en la popular plataforma de streaming.
Gestión de usuarios: Un solo administrador controla el contenido y las cuentas de usuario. Los demás usuarios solo pueden registrarse y hacer uso de la aplicación.
Reproducción de música: Permite gestionar y reproducir pistas de música almacenadas localmente.
Autenticación: Uso de JSON Web Tokens (JWT) para autenticación segura.
Aplicación Fullstack: Angular en el frontend y Node.js en el backend.

Tecnologías Utilizadas 🛠️

Frontend:
Angular (en modo standalone: false actualmente): Framework para el desarrollo de la interfaz de usuario.
HTML/CSS: Estructuración y estilos de la aplicación.
JavaScript/TypeScript: Lógica del frontend.

Backend:
Node.js: Servidor backend para manejar las peticiones y gestionar la API.
Express: Framework para Node.js que facilita el desarrollo del backend.
MongoDB: Base de datos NoSQL para almacenar la información de usuarios y pistas.
JWT (JSON Web Tokens): Para la autenticación de usuarios.

Estado del Proyecto 🛠️
Actualmente, Spoti Player está en desarrollo bajo el modo tradicional de Angular (standalone: false), lo que permite practicar versiones anteriores del framework. En una fase posterior, la aplicación se convertirá a la versión más moderna de Angular, aprovechando las ventajas de standalone components.

Próximas Mejoras 🔧

Migración a Angular con standalone: true.
Mejora en el sistema de búsqueda de pistas 
Optimización de la reproducción de audio.
Interfaz más responsiva para dispositivos móviles.
Despliegue en la nube (Heroku o similar) para acceso remoto.



