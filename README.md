# NgTraining

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

Következő megoldást alkalmaztam:
A “Log In” oldal átalakításra került  modális ablakra és a “shared” modulba került, mivel mindig elérhetőnek kell lennie.
Létre lett hozva egy “ApiRequestStorage” szervíz, mely az API híváskor token hibával való visszatéréskor az hívás adatokat eltárolja. Ha esetleg több jönne egymás után azokat is.
Ebben az esetben meghívásra kerül modális Log In ablak és újra be lehet jelentkezni anélkül, hogy az oldalt elhagynánk. sikeres bejelentkezéskor az “ApiRequestStorage” szervíz meghívja az API-t az eltárolt kérésekkel, így onnan folytatódik a folyamat, ahol a hiba fellépet. Lehetőség van a bejelentkezés elutasítására. Ebben az esetben a kijelentkezés folyamata hajtódik végre. A modális bejelentkező ablakot nem lehet bezárni semmilyen billentyű leütésével vagy egér művelettel, csakis a modális bejelentkező ablakon lévő gombokkal.
A függőségek miatt készítettem egy “BroadcasterService”-t, mely a szervizek és komponensek közötti komunikációt biztosítja és meg akadályozza a körbe hivatkozást.

A “Tasks” lapon található egy “Token clear” gomb, mely segítségével érvényteleniteni lehet az aktuális token-t.
