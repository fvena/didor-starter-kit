<p align="center">
  <a href="http://www.fvena.com/didor/">
    <img src="http://www.fvena.com/didor/img/didor-logo.png" alt="Didor logo" width="150px" />
  </a>
</p>


#Didor starter
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
luego solo tienes que ejecutar gulp, y automáticamente se abrirá el navegador
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


## Producción

Optimiza tu proyecto y lo deja listo para que lo subas a producción.

```shell
gulp build
gulp serve-dist
```

Se creará una carpeta "dist" donde tendrás todo tu proyecto optimizado y listo para
subir a producción. Puedes comprobar como se visualiza la versión optimizada
ejecutando un servidor de producción `gulp serve-dist`.


##Estructura de archivos
Esta es la estructura de archivos base, tenga en cuenta que si varía el nombre o
ubicación de un archivo o directorio, deberá modificar las rutas en el archivo
'gulp/config.js' o podrían fallar algunas herramientas.

```
myproject/
├── gulp/
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   ├── icons/
│   │   └── images/
│   ├── scripts/
│   ├── scss/
│   └── index.pug
├── .editorconfig
├── .gitignore
├── .jshintrc
├── .pug-lintrc.json
├── .sass-lint
├── bower.json
├── gulpfile.js
├── LICENSE
├── package.json
└── README.md
```


## Características
El starter utiliza [Gulp](http://gulpjs.com) para automatizar las tareas
difíciles o que llevan mucho tiempo en tu flujo de trabajo.

Como plantilla base del proyecto se ha utilizado [HTML 5 Boilerplate](https://html5boilerplate.com/) - La plantilla más popular
para desarrollar aplicaciones web rápidas, robustas y adaptables.


#### Manejo de Dependencias

- Instala las dependencias mediante bower y se enlazarán automáticamente en tu
proyecto, no tendrás que crear los enlaces manualmente. Para ello, asegúrate de
usar `--save` cuando instales alguna dependencia con bower:

```shell
bower install --save angular
```

#### Desarrollo
- Live reload, tu navegador se recargará automáticamente al guardar algún cambio
en tu código.
- Podrás ver tu proyecto en cualquier dispositivo conectado a tu red wifi mediante
la url: http://192.168.1.1:3000 (sustituye 192.168.1.1 por la IP local de tu equipo).
- Todos los dispositivos estarán sincronizados, cualquier acción que hagas (scroll,
click, ...) se replicará en el resto de los dispositivos conectados.
- Para los estilos utiliza [Sass](http://sass-lang.com/), CSS con superpoderes.
- Utiliza [Pug](https://github.com/pugjs/pug) como motor de plantillas, simplifica
tu HTML y añádele nueva funcionalidad.
- Para mejorar la calidad del código, mantener el estilo de codificación y depurar
errores, tiene configurados linters para javascript, pug y sass.
- Con sourcemaps el mantenimiento de los estilos será más sencillo, indicando el
archivo y la línea de tu código sass cuando depures mediante el inspector del
navegador.
- Autoprefixer añadirá automáticamente los prefijos al CSS para que sean soportados
por todos los navegadores, por lo que mantendrás tu código más limpio.
- Enlaza todos tus archivos javascript y css automáticamente al crearlos con
[Inject](https://github.com/klei/gulp-inject), no tendrás que añadirlos en tu
index.

#### Producción
- Unifica y comprime todos los archivos para mejorar los tiempos de carga.
- Añade un hash aleatorio (código alfanumérico) al nombre del archivo cada vez
que se compila, para evitar que sea cacheado por el navegador y no muestre los
últimos cambios.


##Herramientas utilizadas
- [HTML 5 Boilerplate](https://html5boilerplate.com/) - v5.3.0
- [browsersync](https://browsersync.io/) - v2.18.5
- [Gulp](http://gulpjs.com) - v3.9.1
- [Gulp Clean css](https://github.com/scniro/gulp-clean-css) - v2.3.2
- [Gulp Inject](https://github.com/klei/gulp-inject) - v4.2.0
- [Gulp Jshint](https://github.com/spalger/gulp-jshint) - v2.0.4
- [Gulp Pleeease](http://pleeease.io) - v2.0.2
- [Gulp Pug](https://github.com/pugjs/gulp-pug) - v3.2.0
- [Gulp Pug linter](https://github.com/ilyakam/gulp-pug-linter) - v.0.4.1
- [Gulp Rev](https://github.com/sindresorhus/gulp-rev) - v7.1.2
- [Gulp Rev replace](https://github.com/jamesknelson/gulp-rev-replace) - v0.4.3
- [Gulp Sass](https://github.com/dlmanning/gulp-sass) - v3.0.0
- [Gulp Sass lint](https://github.com/sasstools/gulp-sass-lint) - v1.3.2
- [Gulp Sourcemaps](https://github.com/floridoo/gulp-sourcemaps) - v1.9.1
- [Gulp Uglify](https://github.com/terinjokes/gulp-uglify) - v2.0.0
- [Gulp Useref](https://github.com/jonkemp/gulp-useref) - v3.1.2
- [Jshint](https://github.com/jshint/jshint) - v2.9.4
- [Jshint stylish](https://github.com/sindresorhus/jshint-stylish) - v.2.2.1
- [Wiredep](https://github.com/taptapship/wiredep) - v4.0.0

## Contribuir
Si estás interesado en contribuir, haz un fork del reporsitorio y desarrolla la
nueva funcionalidad en una rama. Cualquier pull request será gratamente recibido.


## Soporte
Por favor [abre un error] (https://github.com/fvena/didor-template/issues/new)
si encuentra algún problema.


## Licencia
El código de este proyecto, está bajo [licencia MIT](https://github.com/fvena/didor-template/LICENSE).


Desarrollado con ♥ por [Francisco Vena](http://www.fvena.com).
