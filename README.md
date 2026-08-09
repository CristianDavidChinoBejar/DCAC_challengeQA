# QA Automation Challenge - FakeStore API Testing

Contiene la suite de pruebas automatizadas de integración y contrato para la API FakeStore API (https://fakestoreapi.com/), desarrollada con **Cypress** y **TypeScript**.

## Tecnologías y Arquitectura

* **Framework:** Cypress (API Testing)
* **Lenguaje:** TypeScript
* **Validación de Contratos:** AJV (JSON Schema Validation)

---

## Estructura del Proyecto

```plaintext
DCAC_challengeQA/
├── cypress/
│   ├── e2e/
│   │   └── api_fakestore_flow.cy.ts   # Suite principal de pruebas E2E y Contrato
│   ├── fixtures/
│   │   └── schemas/                   # Esquemas JSON para validación con AJV
│   │       ├── cart_schema.ts
│   │       └── login_schema.ts
│   └── support/
│       ├── commands.ts                # Custom Commands (cy.login)
│       ├── index.d.ts                 # Tipado custom de TypeScript
│       └── helpers/
│           └── schema_validator.ts    # Helper para validación de esquemas con AJV
├── cypress.config.ts                  # Configuración global de Cypress (baseUrl, etc.)
├── cypress.env.json.example           # Plantilla de variables de entorno
├── package.json                       # Dependencias y scripts de ejecución
├── tsconfig.json                      # Configuración de TypeScript
└── README.md                          # Documentación del proyecto
```
## Requisitos Previos

Tener instalados:

* [Node.js](https://nodejs.org/) (Versión 18.x o superior recomendada)
* [npm] (Viene instalada con Node.js)
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

Para ejecutar la suite de pruebas sin hardcodear credenciales en el código base, debes crear un archivo `cypress.env.json` en la raíz del proyecto (basándote en la plantilla `cypress.env.json.example`). A continuación se explican los pasos a seguir:

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

**Ejemplo de cypress.env.json final:**
```json
{
  "auth_username": "johnd",
  "auth_password": "m38rmF$",
  "user_id": 1
}
```

## Ejecución de Pruebas

Los scripts de ejecución están definidos dentro de package.json:
1. Ejecución en modo Headless

* Corre todas las pruebas en segundo plano desde la terminal:
```bash
npm run test
```

* o directamente ejecuta:
```bash
npx cypress run
```

2. Ejecución con Interfaz Gráfica (Cypress Test Runner)

```bash
npm run cypress:open
```

---

## 🤝 Nota Final

¡Gracias por revisar el proyecto! Quedo abierto a cualquier comentario o feedback sobre la implementación de las pruebas y la estructura del proyecto. 

* **LinkedIn:** [Cristian David Chino Bejar](https://www.linkedin.com/in/tu-usuario)
* **Email:** cristianrg095@gmail.com