<p align="center">
  <a href="http://www.fvena.com/didor/">
    <img src="http://www.fvena.com/didor/img/didor-logo.png" alt="Didor logo" width="150px" />
  </a>
</p>


#Didor Starter Kit
> Plantilla frontend para agilizar el inicio y desarrollo de aplicaciones web.

La plantilla cuenta con una estructura de archivos básica que te permitirá poder
iniciar el desarrollo de un proyecto rápidamente. También cuenta con varias
herramientas que te ayudarán durante el desarrollo del proyecto.


## Requisitos previos

Didor Starter Kit utiliza herramientas basadas en Nodejs para ayudarte en el
desarrollo de tu aplicación, y Gulp como gestor de tareas. Necesitas tener ambos
instalados en tu equipo para poder usarla.

Nota: *Usar Nodejs para el desarrollo, no implica que nuestra aplicación vaya a usarse
en un entorno Nodejs. Podrás usar tu aplicación en cualquier entorno*.


### [Nodejs.org](https://nodejs.org/en/)

Vaya al terminal y escriba `node --version`.

Si Nodejs está instalado devolverá un número de versión igual o superior a 6.9.x.
Si necesita instalar o actualizar Nodejs, vaya a la página de
[nodejs.org](https://nodejs.org/en/) y haga click en el botón de instalación
verde grande que pone: *Recommended For Most Users*.

### [Gulp](http://gulpjs.com)

Vaya al terminal y escriba `gulp --version`.

Si Gulp está instalado devolverá un número de versión igual o superior a 3.9.x.
Si necesita instalar/actualizar Gulp, escriba en el terminal lo siguiente:

```shell
$ npm install --global gulp
```

*Esto instalará de forma global Gulp. Dependiendo de tu configuración, necesitarás
[configurar tu sistema](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md)
para instalar paquetes sin usar los permisos de administrador*[Recomendado]


## Como empezar

[Descarga](https://github.com/fvena/didor-starter-kit/releases/latest) el kit o
clona este repositorio en tu equipo. Revisa el apartado de instalación para verificar
que tu entorno está preparado para ejecutar DSK. Luego comprueba los comandos
disponibles antes de comenzar.

Para comenzar a desarrollar con DSK necesitas:

1. Tener en tu equipo una copia de DSK.
2. Instalar las dependencias.
3. Modificar los datos de su proyecto en la aplicación.
4. Ejecutar gulp para comenzar a desarrollar.

#### Inicio rápido

```shell
$ git clone https://github.com/fvena/didor-starter.git myproyect
$ cd myproyect
$ npm install
$ gulp serve
```

Esto creará un directorio con el nombre `myproyect`, luego instalará las
librerías necesarias para que funcionen todas las herramientas de la plantilla,
después solo tienes que ejecutar `gulp serve`, y automáticamente se abrirá el
navegador con la plantilla por defecto y podrás comenzar a desarrollar.


## Comandos

### Desarrollo

Inicia el servidor, vigilará los cambios, refrescará y sincronizará automáticamente
todos los dispositivos. También se activarán el resto de herramientas como
Sass, pug, linters, ...

```shell
$ gulp serve
```

En el terminal te indicará una dirección IP local para ver tu aplicación en tu
equipo, y una externa para verla en otros dispositivos. Solo tienes que escribir
la dirección IP externa en el navegador de cualquier otro equipo o dispositivo.

Durante el desarrollo se creará una carpeta '.tmp' donde se copiarán los
archivos compilados css, html, fuentes de iconos,... El contenido de esta
carpeta será eliminado cada vez que ejecutemos `gulp serve`.


### Producción

Construye una copia optimizada de tu aplicación en una carpeta 'dist', lista
para su publicación.

```shell
$ gulp
```

- Copia todas las imágenes, fuentes, favicons y assets a la carpeta dist.
- Compila todos los estilos de tu aplicación, los unifica en un solo archivo,
luego lo comprime y añade un hash aleatorio al nombre del archivo, para evitar
que sea cacheado por el navegador y no muestre los cambios.
- Con los archivos JavaScript también los unifica, comprime y añade el hash, salvo
que generá dos archivos, uno con las librerías externas (angular, jquery,
plugins, ...) y otro con los archivos JavaScript de nuestra aplicación.


### Probar versión de producción

Inicia en un servidor la versión de producción, para que puedas comprobarla antes
de publicarla. Al igual que con la versión de desarrollo, podrás verla y
sincronizarla en cualquier dispositivo mediante la IP externa.

```shell
$ gulp serve:dist
```

*Utiliza un puerto distinto para evitar que pueda haber interferencias con algún
contenido cacheado en el proceso de desarrollo.*


### Información del rendimiento

Podemos obtener un informe de la
[complejidad](https://github.com/philbooth/complexity-report) de nuestro código.

```shell
$ gulp jsreport
```


### Tamaño de archivos

Nos muestra una tabla con el tamaño de los archivos html, js, css y fuentes, una
vez comprimidos y optimizados.

```shell
$ gulp sizereport
```


##Estructura de archivos
Esta es la estructura de archivos base, tenga en cuenta que si varía el nombre o
ubicación de un archivo o directorio, deberá modificar las rutas en el archivo
'gulp/config.js' o podrían fallar algunas herramientas.

```
myproject/
├── app/
│   ├── assets/
│   │   ├── fonts/
│   │   ├── icons/
│   │   └── images/
│   ├── scripts/
│   ├── styles/
│   └── index.pug
├── .babelrc
├── .editorconfig
├── .gitignore
├── .pug-lintrc.json
├── .sass-lint
├── gulpfile.babel.js
├── LICENSE
├── package.json
└── README.md
```


## Características
DSK utiliza como plantilla base para el proyecto
[HTML 5 Boilerplate](https://html5boilerplate.com/) - La plantilla más popular
para desarrollar aplicaciones web rápidas, robustas y adaptables.


### Desarrollo
- Desarrollo en un servidor HTTP - Visualiza tu aplicación en un servidor HTTP
mientras la desarrollas.
- Live reload - Tu navegador se recargará automáticamente al guardar algún cambio
en tu código.
- Sincronización entre dispositivos - Sincroniza clicks, scroll, formularios y
recargas del navegador entre todos los dispositivos conectados a tu misma red
wifi. Gracias a [browserSync](https://browsersync.io/).
- Soporte para [Sass](http://Sass-lang.com/) - Compila archivos Sass a CSS,
podrás usar variables, mixins, funciones y mucho más. CSS con superpoderes.
- Plantillas [Pug](https://github.com/pugjs/pug) - Compila archivos Pug a HTML,
simplifica tu HTML y añádele nueva funcionalidad.
- Linters - DSK utiliza linters para JavaScript, Sass y pug. Los linters mejoran
la calidad del código y ayudan a mantener el estilo de codificación y depurar
errores. Para JavaScript se utiliza la configuración [eslint-config-google]()
basada en la guía de estilo de Google para JavaScript.
- Sourcemaps - Facilita el mantenimiento de los estilos, indicando el
archivo y la línea de tu código Sass cuando depures mediante el inspector del
navegador.
- Autoprefixer - Añade automáticamente los prefijos al CSS para que sean soportados
por todos los navegadores, manteniendo tu código más limpio.
- Enlaza archivos automáticamente - Ya no tendrás que añadir manualmente cada
archivo css y javascript que añadas en tus HTML,
[Inject](https://github.com/klei/gulp-inject) lo hará por ti.
- ES2015 - Opcionalmente podrás usar ES2015 gracias a [Babel]().


### Producción
- Unifica y comprime todos los archivos para mejorar los tiempos de carga.
- Añade un hash aleatorio (código alfanumérico) al nombre del archivo cada vez
que se compila, para evitar que sea cacheado por el navegador y no muestre los
últimos cambios.


## Browser Support

Actualmente, se ha comprobado su funcionamiento en las dos últimas versiones de
los siguientes navegadores:

* Chrome
* Edge
* Firefox
* Safari
* Opera
* Internet Explorer 9+

Esto no quiere decir, que SDK no pueda ser ejecutado en navegadores más antiguos,
simplemente no se ha comprobado.


## Inspiración

Didor Starter Kit está inspirado en
[Web Starter Kit](https://github.com/google/web-starter-kit) y en el generador
Yeoman [generator-gulp-webapp](https://github.com/yeoman/generator-webapp),
tomando ideas de ambos durante el desarrollo inicial.


## Contribuir
Si estás interesado en contribuir, haz un fork del reporsitorio y desarrolla la
nueva funcionalidad en una rama. Cualquier pull request será gratamente recibido.


## Soporte
Por favor [abre un error] (https://github.com/fvena/didor-template/issues/new)
si encuentra algún problema.


## Licencia
El código de este proyecto, está bajo [licencia MIT](https://github.com/fvena/didor-template/LICENSE).


Desarrollado con ♥ por [Francisco Vena](http://www.fvena.com).
