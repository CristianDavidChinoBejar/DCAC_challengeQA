# QA Automation Challenge - FakeStore, SauceDemo y Reporte de errores

Este repositorio contiene automatización de pruebas End to End utilizando [Cypress](https://www.cypress.io/) y TypeScript. 

El proyecto cubre los flujos principales de dos aplicaciones de prueba: **FakeStore** (API Testing) y **SauceDemo** (UI Testing).

## Tecnologías y Arquitectura

* **Framework:** Cypress
* **Lenguaje:** TypeScript
* **Validación de Contratos:** AJV (JSON Schema Validation)

---

## Estructura de Pruebas

- `fakestore_flow.cy.ts`: Valida los flujos principales de FakeStore (login, lista de productos, carrito de compras).
- `saucedemo_flow.cy.ts`: Valida el flujo completo de compra en SauceDemo (Agregar productos al carrito, checkout y confirmación de compra).

## Requisitos Previos

Tener instalados:

* [Node.js](https://nodejs.org/) (Versión 18.x o superior recomendada)
* npm (Viene instalada con Node.js)
---

## Instalación

1. Clonar repositorio remoto:
   ```bash
   git clone https://github.com/CristianDavidChinoBejar/DCAC_challengeQA.git
   cd DCAC_challengeQA
   ```

2. Instalar dependencias del proyecto:
    ```bash
    npm install
    ```

## Configuración de Variables de entorno (`cypress.env.json`)

Para ejecutar la suite de pruebas sin hardcodear credenciales en el código base, tenes que crear un archivo `cypress.env.json` en la raíz del proyecto (basándote en la plantilla `cypress.env.json.example`). A continuación se explican los pasos a seguir:

### 1. Obtención de Credenciales de Prueba

Dado que FakeStore API es un Mock API con usuarios preconfigurados, las credenciales válidas deben obtenerse realizando una petición `GET` al endpoint de usuarios:

* **Endpoint:** `GET https://fakestoreapi.com/users` (se puede consultar con Postman, curl o pegando la URL en el navegador).

De la lista de usuarios retornada, podes seleccionar cualquier objeto de la respuesta. Por ejemplo:

```json
{
  "address": { ... },
  "id": 1,
  "email": "john@gmail.com",
  "username": "johnd",
  "password": "m38rmF$",
  "name": { ... },
  "phone": "1-570-236-7033",
  "__v": 0
}
```

### 2. Creación del archivo local cypress.env.json

Crea el archivo cypress.env.json en la raíz del proyecto, mapeando las propiedades de la API a las variables de entorno de la siguiente manera:

* ```auth_username```: Valor extraído de la clave ```username``` del usuario elegido (ej. "johnd").
* ```auth_password```: Valor extraído de la clave ```password``` del usuario elegido (ej. "m38rmF$").
* ```user_id```: Identificador numérico asociado al usuario o cualquier número entero válido (ej. 1 o 2).
* ```api_url```: conservar valor "https://fakestoreapi.com",
* ```ui_url```: conservar valor "www.saucedemo.com"

**Ejemplo de cypress.env.json final:**
```json
{
  "auth_username": "johnd",
  "auth_password": "m38rmF$",
  "user_id": 1,
  "api_url": "https://fakestoreapi.com",
  "ui_url": "www.saucedemo.com"
}
```

## Ejecución de Pruebas

Los scripts de ejecución están definidos dentro de package.json:
1. Ejecución en modo Headless

* Corre todas las pruebas en segundo plano desde la terminal:
```bash
npm run test:all
```

* o directamente ejecuta:
```bash
npm run cy:run
```

2. Ejecución con Interfaz Gráfica (Cypress Test Runner)

```bash
npm run cy:open
```
## Reportes de Pruebas

El proyecto implementa **Mochawesome** (`cypress-mochawesome-reporter`) cuando las pruebas se ejecutan en modo headless.

### Generar el reporte localmente

1. Una vez finalizada la ejecución de la suite en modo headless, abrir el archivo autogenerado en el navegador:
  ```bash
# En Windows
  start cypress/reports/index.html
  ```

  ```bash
  # En Mac
  open cypress/reports/index.html
  ```
---

### Reporte de errores

<a href="https://docs.google.com/spreadsheets/d/1IVgDH1q6Sh2kFVx-E3wzTk7n7RjkG6jDp6kkoLYiXlM/edit?usp=sharing" target="_blank">Ver tabla de reporte de errores en Google Sheets</a>

## 🤝 Nota Final

¡Gracias por revisar el proyecto! Quedo abierto a cualquier comentario o feedback sobre la implementación de las pruebas y la estructura del proyecto. 

* **LinkedIn:** [Cristian David Chino Bejar](https://www.linkedin.com/in/cristian-david-chino-bejar)
* **Email:** cristianrg095@gmail.com
