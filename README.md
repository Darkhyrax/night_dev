# Ernesto España — CV Web

CV online profesional, multi-página y bilingüe (español/inglés) diseñado para publicarse en **GitHub Pages**.

## Propósito

Este sitio es la versión web de mi currículum: una presentación clara y navegable de mi experiencia como desarrollador backend, líder técnico y full stack. Está pensado para que reclutadores, clientes o colaboradores puedan conocer mi trayectoria, habilidades, proyectos públicos y datos de contacto en pocos clics.

## Demo

Disponible en: `https://Darkhyrax.github.io/night_dev`

## Secciones

| Página | Contenido |
|--------|-----------|
| `index.html` | Perfil, resumen, experiencia destacada, proyectos principales, stack, educación e idiomas |
| `experience.html` | Historial laboral completo con línea de tiempo |
| `skills.html` | Habilidades técnicas organizadas por categorías |
| `projects.html` | Proyectos públicos con descripción, stack y enlaces |
| `contact.html` | Información de contacto y formulario `mailto` |

## Características

- **Multi-página estática**: 5 páginas HTML sin necesidad de build ni backend.
- **Bilingüe**: alternancia entre español e inglés con persistencia en `localStorage`.
- **Tema claro/oscuro/sistema**: toggle de tema respetuoso con `prefers-color-scheme`.
- **Diseño responsive**: mobile-first, adaptable a escritorio, tablet y móvil.
- **Componentes compartidos**: header y footer se cargan vía `fetch()` para evitar duplicación.
- **Animaciones sutiles**: scroll reveal, hover lift en tarjetas y transiciones de tema.
- **Accesible**: respeta `prefers-reduced-motion` y usa etiquetas ARIA.
- **Listo para imprimir**: estilos de impresión ocultan la UI y optimizan el CV en papel.

## Stack

- HTML5 semántico
- CSS3 con variables y diseño mobile-first
- JavaScript vanilla (carga de componentes, i18n, tema, navegación, IntersectionObserver)
- [Lucide Icons](https://lucide.dev/) para iconografía ligera
- Google Fonts: Geist e Inter

## Estructura

```
.
├── index.html
├── experience.html
├── skills.html
├── projects.html
├── contact.html
├── components/
│   ├── header.html
│   └── footer.html
├── assets/
│   ├── css/styles.css
│   └── js/
│       ├── main.js
│       └── content.js
└── README.md
```

## Despliegue

El sitio está preparado para **GitHub Pages**: basta con activar la opción en `Settings > Pages` del repositorio, eligiendo la rama `main` y la raíz `/`.

## Autor

**Ernesto España**
- Email: ernesto.espana@gmail.com
- LinkedIn: https://linkedin.com/in/eespan
- GitHub: https://github.com/Darkhyrax
