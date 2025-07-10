# 🎲 Gestor de Partidas de Juegos de Mesa

Este proyecto es una aplicación web fullstack para registrar, visualizar y filtrar partidas de juegos de mesa. Fue desarrollado como parte del **Parcial 2 de la materia Desarrollo de Software** (UTN FRC, 2025 - 3K2), a partir de un sistema base construido en el pre-enunciado.

---

## 🚀 Funcionalidades principales

### 🧩 Frontend (React + Bootstrap)
- Alta, edición y eliminación de partidas
- Filtro por:
  - Juego
  - Fecha máxima
  - Si fue cooperativa o no
  - Puntos obtenidos mínimos
- Visualización de estrellas ⭐ según puntuación de la partida
- Íconos para identificar partidas cooperativas 🤝 o competitivas ⚔️
- Detalle desplegable con información del juego

### 🛠 Backend (Node.js + Express + Sequelize + SQLite)
- API REST para CRUD de partidas y juegos
- Validaciones:
  - Fecha válida
  - Al menos 2 jugadores
  - Ganador no vacío
  - Juego existente
  - Puntos entre 0 y 100
  - Campo booleano `esCooperativa`
- Filtros opcionales aplicados directamente en consultas Sequelize
- Conexión a base de datos SQLite (`dbJuegos.sqlite`)

---

## 📊 Tecnologías utilizadas

- **Frontend:** React, React Router, Bootstrap
- **Backend:** Node.js, Express, Sequelize
- **Base de datos:** SQLite
- **Herramientas:** Git, DB Browser for SQLite, Postman

---

## 🎯 Objetivo del proyecto
Este proyecto no solo fue una evaluación académica, sino también una oportunidad para aplicar prácticas reales de desarrollo fullstack, integrando validaciones robustas, separación de capas y una interfaz amigable para el usuario final.

---

## 👤 Autor
- **Francisco López Mora**
- https://www.linkedin.com/in/franciscolopezmora/

UTN FRC - Ingeniería en Sistemas de Información