## 🧪 Entrega de la Práctica:

Testing & CI/CD (Frontend) Repositorio correspondiente al laboratorio de Testing del Máster Frontend (Lemoncode). Incluye la suite de pruebas unitarias con Vitest, pruebas End-to-End (E2E) con Playwright y Cypress, y una pipeline de Integración Continua (CI) mediante GitHub Actions.

## 🚀 Instalación y Requisitos Previos.

Debido a ligeras discrepancias entre las peer dependencies de paquetes como Babel y Cypress en el proyecto base, la instalación de dependencias en local la he tenido que realizar utilizando el flag --legacy-peer-deps

## 📜 Comandos de Testing Disponibles

Se puede ejecutar cada suite por separado o lanzar la verificación completa con un solo comando:

ComandoDescripción
npm run type-checkRealiza la verificación estática de tipos con tsc.npm run test:unitEjecuta las pruebas unitarias con Vitest.npm run test:e2e:playwrightEjecuta la suite E2E en headless con Playwright.npm run test:e2e:cypress:runEjecuta la suite E2E en headless con Cypress.npm run test:allOrquestación completa: lanza unitarios + Playwright + Cypress de forma secuencial.

## 🛠️ Resoluciones Técnicas y Retos Encontrados

1. Conflicto del Runner de Vitest con la carpeta e2e/Al lanzar npm run test:unit, Vitest escaneaba y pretendía ejecutar los archivos .spec.ts ubicados dentro de e2e/. Como esos specs utilizan el runner y las aserciones nativas de @playwright/test, Vitest colisionaba lanzando el error Playwright Test did not expect test.describe() to be called here.Solución:

Se configuró el archivo ./config/test/config.ts de Vitest para excluir explícitamente el directorio de pruebas de integración:TypeScriptexport default defineConfig({
test: {
exclude: ['**/node_modules/**', '**/dist/**', '**/e2e/**'],
},
});

2. Centralización del Puerto y Compatibilidad Multiplataforma (Windows) Sintaxis en Windows (CMD/PowerShell): La sintaxis tipo bash ${PORT:-4173} dentro de los scripts de package.json causaba que Vite fallara en entornos Windows al intentar parsear literalmente la cadena como número de puerto. Se fijó el puerto 4173 explícitamente en el script start:preview: "start:preview": "vite preview --port 4173"Liberación de puertos con kill-port: Para evitar que ejecuciones consecutivas o cierres de Playwright dejen colgado el puerto e impidan que start-server-and-test levante la preview para Cypress, se añadió un hook automático de limpieza antes del bloque E2E: "pretest:e2e": "npx kill-port 4173"4. Orquestación Unificada con start-server-and-testPlaywright gestiona internamente el ciclo de vida del servidor web mediante el bloque webServer configurado en playwright.config.ts.Cypress requiere que la aplicación ya esté levantada. Se integró start-server-and-test en la cadena de scripts para garantizar que el servidor preview responda en http://localhost:4173 antes de desencadenar la ejecución de las suites E2E.⚙️ Pipeline de Integración Continua (GitHub Actions)El flujo de trabajo está automatizado en .github/workflows/ci.yml. En cada push o pull request a la rama main, el entorno de CI ejecuta ordenadamente las siguientes etapas:Setup & Cache: Checkout del repositorio e instalación limpia con npm ci.Type Check: Verificación estática de tipos (npm run type-check).Tests Unitarios: Pruebas unitarias de componentes, mappers y helpers (npm run test:unit).Instalación de Navegadores: npx playwright install --with-deps para disponer de Chromium/Firefox/WebKit en la máquina virtual.Build de Producción: Compilación del paquete (npm run build:prod).Ejecución E2E: Lanzamiento unificado de la suite de pruebas de integración.
