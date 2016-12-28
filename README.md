<p align="center">
  <a href="http://www.fvena.com/didor/">
    <img src="http://www.fvena.com/didor/img/didor-logo.png" alt="Didor logo" width="150px" />
  </a>
</p>


#Didor template
> Didor template es una plantilla para agilizar el inicio y desarrollo de
proyectos web.

La plantilla cuenta con una estructura de archivos básica que te permitirá poder
iniciar el desarrollo de un proyecto rápidamente. También cuenta con varias
herramientas que te ayudarán durante el desarrollo del proyecto.


## Instalación / Como empezar

Para comenzar a usar esta plantilla debes clonarte este repositorio en tu equipo
, instalar las librerías necesarias y ejecutar gulp para comenzar
a desarrollar:

```shell
git clone https://github.com/fvena/didor-starter.git myproyect
cd myproyect
npm install
gulp
```

Esto te creará un directorio con el nombre myproyect, luego instalará las
librerías necesarias para que funcionen todas las herramientas de la plantilla,
luego solo tienes que ejecutar gulp, y automaticamente se abrirá el navegador
con la plantilla por defecto y podrás comenzar a desarrollar.


## Desarrollo

Inicia el servidor y todas las herramientas que necesitas para desarrollar como
sass, pug, linters, ..

```shell
gulp
```

Durante el desarrollo se creará una carpeta '.tmp' donde se copiarán los
archivos compilados css, html, fuentes de iconos,... El contenido de esta
carpeta será eliminado cada vez que ejecutemos gulp.


### Producción

Optimiza tu proyecto y lo deja listo para que lo subas a producción.

```shell
gulp build
gulp build-serve
```

Se creará una carpeta "dist" donde tendrás todo tu proyecto optimizado y listo para
subir a producción. Puedes comprobar como se visualiza la versión optimizada
ejecutando un servidor de producción `gulp build-serve`.


##Estructura de archivos
Esta es la estructura de archivos base, tenga en cuenta que si varía el nombre o
ubicación de un archivo o directorio, deberá modificar las rutas en el archivo
'gulp/config.js' o podrían fallar algunas herramientas.

```
myproject/
├── gulp/
├── src/
│   ├── icons/
│   ├── images/
│   ├── scripts/
│   ├── scss/
│   └── index.pug
├── .editorconfig
├── .gitignore
├── .jshintrc
├── bower.json
├── gulpfile.js
├── LICENSE
├── package.json
└── README.md
```


##Características
- [Browsersync](https://browsersync.io/) - Actualiza el navegador automáticamente
cuando hay cambios, muestra tu app en distintos dispositivos y navegadores
simultáneamente y sincroniza las acciones que hagas (scroll, click, ...) en todos
ellos.
- [HTML 5 Boilerplate](https://html5boilerplate.com/) - La plantilla más popular
para desarrollar aplicaciones web rápidas, robustas y adaptables.
- [Sass](http://sass-lang.com/) - CSS con superpoderes.
- [Pug](https://github.com/pugjs/pug) - Motor de plantillas.
- Linter Pug, Sass y Js - Mejoran la calidad del código, mantienen el estilo de
codificación y comprueban los errores.
- Generador de fuentes a partir de iconos svg.


##Herramientas utilizadas
- [HTML 5 Boilerplate](https://html5boilerplate.com/) - v5.3.0
- [browsersync](https://browsersync.io/) - v2.13.0
- [node Sass](https://www.npmjs.com/package/node-sass) - v3.8.0
- [pug](https://github.com/pugjs/pug) - v2.0.0-beta4
- [pug-cli](https://github.com/pugjs/pug-cli) - v1.0.0-alpha6
- [pug-lint](https://github.com/pugjs/pug-lint) - v2.3.0
- [sass-Lint](https://github.com/sasstools/sass-lint) - v1.8.2
- [eslint](http://eslint.org/) - v3.1.1
- [icon-font-generator](https://www.npmjs.com/package/icon-font-generator) -v1.0.4


## Contribuir
Si estás interesado en contribuir, haz un fork del reporsitorio y desarrolla la
nueva funcionalidad en una rama. Cualquier pull request será gratamente recibido.


## Soporte
Por favor [abre un error] (https://github.com/fvena/didor-template/issues/new)
si encuentra algún problema.


## Licencia
El código de este proyecto, está bajo [licencia MIT](https://github.com/fvena/didor-template/LICENSE).


Desarrollado con ♥ por [Francisco Vena](http://www.fvena.com).
