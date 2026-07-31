# 🧪 Entrega de la Práctica

![CI Pipeline Status](https://github.com/DiegoSubires/MasterXVIII-testing/actions/workflows/ci.yml/badge.svg?branch=feature/laboratorio-testing-opcional)

## Testing & CI/CD (Frontend)

Repositorio correspondiente al laboratorio de Testing del Máster Frontend (Lemoncode).

Incluye:

- ✅ Pruebas unitarias con Vitest.
- ✅ Pruebas End-to-End con Playwright.
- ✅ Pruebas End-to-End con Cypress.
- ✅ Pipeline de Integración Continua mediante GitHub Actions.

## 🚀 Instalación

Debido a ligeras discrepancias entre las peer dependencies de algunos paquetes (como Babel y Cypress), la instalación de dependencias debe realizarse utilizando:

```bash
npm install --legacy-peer-deps
```

## 📜 Comandos disponibles

| Comando                        | Descripción                                   |
| ------------------------------ | --------------------------------------------- |
| `npm run type-check`           | Verificación estática de tipos con TypeScript |
| `npm run test:unit`            | Ejecuta las pruebas unitarias con Vitest      |
| `npm run test:e2e:playwright`  | Ejecuta la suite E2E con Playwright           |
| `npm run test:e2e:cypress:run` | Ejecuta la suite E2E con Cypress              |
| `npm run test:all`             | Ejecuta todas las pruebas de forma secuencial |

## 🛠️ Problemas encontrados y soluciones

### 1. Conflicto entre Vitest y Playwright

**Problema**

Al ejecutar npm run test:unit, Vitest intentaba analizar también los archivos .spec.ts ubicados en la carpeta e2e. Como esos archivos utilizan el runner de Playwright (@playwright/test), se producía el siguiente error:

Playwright Test did not expect test.describe() to be called here.

**Solución**

Se modificó la configuración de Vitest para excluir el directorio e2e:

```ts
export default defineConfig({
  test: {
    exclude: ['**/node_modules/**', '**/dist/**', '**/e2e/**'],
  },
});
```

### 2. Liberación automática del puerto

**Problema**

Después de algunas ejecuciones de Playwright o Cypress, el puerto 4173 podía quedar ocupado, impidiendo que start-server-and-test iniciara correctamente el servidor.

**Solución**

Se añadió un script previo para liberar automáticamente el puerto:

```json
"pretest:e2e": "npx kill-port 4173"
```

### 3. Ejecución unificada de las pruebas

**Problema**

Playwright gestiona automáticamente el ciclo de vida del servidor mediante la configuración webServer en playwright.config.ts.

Sin embargo, Cypress necesita que la aplicación ya esté en ejecución antes de comenzar las pruebas.

**Solución**

Para resolverlo se utilizó start-server-and-test, que espera a que la aplicación esté disponible en http://localhost:4173 antes de lanzar la suite de Cypress.

## ⚙️ Pipeline de Integración Continua

El flujo de trabajo definido en `.github/workflows/ci.yml` ejecuta automáticamente las siguientes fases en cada push o pull request sobre la rama principal o de trabajo:

1. **Checkout del repositorio**.
2. **Setup de Node.js** e instalación de dependencias mediante `npm ci`.
3. **Verificación estática de tipos** (`type-check`).
4. **Ejecución de pruebas unitarias** con Vitest.
5. **Instalación y configuración de navegadores** para Playwright.
6. **Compilación** de la aplicación (`build`).
7. **Ejecución de pruebas E2E** con Playwright y Cypress.

### 📊 Resultado de la ejecución de pruebas (GitHub Actions)

![Resumen de Pruebas en GitHub Actions](./docs/ci-summary.png)

> **Resumen del Job:**
>
> - **Vitest:** 17 archivos de pruebas procesados con éxito (127 tests unitarios pasados).
> - **Cypress:** 8 pruebas End-to-End ejecutadas y superadas correctamente.
