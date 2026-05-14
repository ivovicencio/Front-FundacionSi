# FrontSoysi

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

---

## Mobile / App-ready notes

This project is prepared to be packaged as a mobile app (Android / iOS) using a native wrapper like Capacitor or as a PWA. Below are recommended steps to finalize the mobile setup when you're ready to install native tooling.

- Option A — Capacitor (native apps):
	1. Install Capacitor: `npm install @capacitor/core @capacitor/cli --save`.
	2. Initialize Capacitor config: `npx cap init front-soysi com.fundacionsi.frontsoysi`.
	3. Build the web app: `npm run build -- --configuration production`.
	4. Add platforms: `npx cap add android` / `npx cap add ios`.
	5. Copy web assets and open native IDE: `npx cap copy` then `npx cap open android`.

- Option C — Ionic (UI + native):
	- Si querés componentes móviles listos y una experiencia nativa más pulida, instalar Ionic (UI framework) y usar Capacitor para el empaquetado.
	- Pasos locales (ejecutar en tu máquina):
		1. `npm install -g @ionic/cli`
		2. `ionic init` (elegir framework: Angular)
		3. `npm run build` y luego `npx cap copy` y `npx cap open android`.
	- Nota: no instalo Ionic ni lo ejecuto desde acá para no modificar tu entorno; los scripts en `package.json` contienen instrucciones.

- Option B — PWA (progressive web app):
	- Add a web manifest and Service Worker, or use Angular PWA schematics.

Notes:
- We did not include Capacitor packages to avoid changing the repo state; follow the commands above locally when you want to enable native builds.
- The project already uses responsive components and a `StorageService` in memory so it can be swapped for server persistence or native secure storage later.

## Development flags

- To work on UI without requiring backend auth, toggle `DEV_AUTH_BYPASS` in [src/app/app.settings.ts](src/app/app.settings.ts#L1-L3) to `false` when you want guards to enforce real authentication.

