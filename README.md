# Valenzos PC — Frontend (Angular)

Aplicación web en Angular para la venta y gestión de productos y servicios de computación. Incluye catálogo, detalle de productos y servicios, carrito de compras, autenticación de usuarios, perfil protegido y panel básico de administración para crear/editar productos y servicios. El proyecto está configurado con Angular Material y renderizado del lado del servidor (SSR) para mejor rendimiento y SEO.

## Stack Principal
- Framework: Angular 19
- UI: Angular Material (+ CDK)
- Estado y utilidades: RxJS
- SSR: `@angular/ssr` con `express`

## Características
- Catálogo: listado y tarjetas de productos/servicios en la home.
- Detalle: páginas de detalle para `producto/:id` y `servicio/:id`.
- Carrito: gestión básica del carrito en `carrito`.
- Autenticación: login y registro; `authGuard` protege la ruta `perfil`.
- Perfil: página de usuario autenticado (`/perfil`).
- Administración: crear/editar productos y servicios:
  - `admin/productos/crear`, `admin/productos/editar/:id`
  - `admin/servicios/crear`, `admin/servicios/editar/:id`
- SSR y prerender: configuración en `angular.json` con entrada `src/server.ts`.

## Rutas Principales
- `/` → Home (`HomePageComponent`)
- `/login` → Login
- `/register` → Registro
- `/carrito` → Carrito
- `/producto/:id` → Detalle de producto
- `/servicio/:id` → Detalle de servicio
- `/perfil` → Perfil (protegido por `authGuard`)
- `/admin/productos/crear` → Crear producto
- `/admin/productos/editar/:id` → Editar producto
- `/admin/servicios/crear` → Crear servicio
- `/admin/servicios/editar/:id` → Editar servicio
- `**` → Redirección a `/`

## Scripts (package.json)
- `start`: ejecuta `ng serve` en desarrollo.
- `build`: compila la app (`dist/valenzos-pc`).
- `watch`: compila en modo watch (dev).
- `test`: ejecuta tests con Karma/Jasmine.
- `serve:ssr:ValenzosPC`: sirve la build SSR (`node dist/valenzos-pc/server/server.mjs`).

## Inicio Rápido
1. Requisitos: Node.js 18+ y Angular CLI instalado globalmente.
2. Instalar dependencias:
	```powershell
	npm install
	```
3. Desarrollo (HMR):
	```powershell
	npm start
	```
4. Build producción:
	```powershell
	npm run build
	```
5. SSR (después de build):
	```powershell
	npm run serve:ssr:ValenzosPC
	```

## Tecnologías y Dependencias
- `@angular/*` 19, `@angular/material`, `@angular/cdk`
- `@angular/ssr`, `express` para servidor SSR
- `rxjs`, `zone.js`, `tslib`
- Dev: `@angular/cli`, `@angular-devkit/build-angular`, `typescript`, Karma/Jasmine
- Estilos: tema Material preconstruido `magenta-violet`

## Estructura del Proyecto
- `src/app/pages`: vistas (home, login, register, carrito, perfil, detalle producto/servicio, crear/editar servicio)
- `src/app/components`: componentes (crear/editar producto, diálogos, tarjetas)
- `src/app/services`: servicios (`auth.service`, `product.service`, `service.service`, `cart.service`) y `auth.guard`
- `src`: `main.ts`, `main.server.ts`, `server.ts`, `index.html`, `styles.css`
- `public`: assets estáticos copiados al build

## Notas SSR
- `angular.json` define `ssr.entry` en `src/server.ts` y tiene `prerender: true`.
- Para producción, servir `dist/valenzos-pc` con `serve:ssr:ValenzosPC`.

## Pruebas
- Configuradas con Karma y Jasmine.
- Ejecutar: `npm test`.

## Convenciones
- Prefijo de componentes: `app-`.
- Rutas y guard en `src/app/app.routes.ts`.

## Licencia
Uso interno del proyecto Valenzos PC.
