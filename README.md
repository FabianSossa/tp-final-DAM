
DESARROLLO DE APLICACIONES MULTIPLATAFORMA - Resolucion del TP
=======================

El trabajo práctico se detalla en el archivo: /TP/Trabajo Práctico Desarrollo de Aplicaciones Multiplataforma.pdf

Se desarrolló una aplicación híbrida en `ionic`, una API en `NodeJs` Express, como servidor backend y una base de datos `MySQL`, para consultar y modificar los datos.

El frontend se implementa de forma local. Tanto el backend como la base de datos se implementa sobre un ecosistema `Docker`.

Se reutilizó el ecosistema `Docker` desarrollado en la materia previa.

## Comenzando 🚀

Guía con los pasos escenciales para poner en marcha la aplicación.

<details><summary><b>Mira los pasos necesarios</b></summary><br>

### Instalar las dependencias

Para correr este proyecto es necesario instalar:

`Docker` y `Docker Compose`. Referencias en [este artículo](https://www.gotoiot.com/pages/articles/docker_installation_linux/) o en la documentación oficial de[Docker](https://docs.docker.com/get-docker/) y también la de [Docker Compose](https://docs.docker.com/compose/install/).

Instalar npm: sudo npm install -g npm@8.18.0

Instalar angular cli:sudo npm install -g @angular/cli@13.0.0

Instalar ionic cli: sudo npm i -g @ionic/cli

### Descargar el código

Para descargar el código, lo más conveniente es realizar un `fork` de este proyecto  haciendo click en [este link](https://github.com/FabianSossa/tp-final-DAM/fork). A continuación se descarga con este comando (reeemplazando el usuario en el link):

```
git clone https://github.com/FabianSossa/tp-final-DAM
```

> En caso de no tener una cuenta en Github, clonar directamente este repo.
### Ejecutar la aplicación

Para ejecutar el backend con la API Express y la base de datos, hay que correr el comando `docker-compose up` desde un terminal en el directorio raiz `/`. Este comando va a descargar las imágenes de Docker de node, de la base datos y del admin de la DB, y luego ponerlas en funcionamiento.

Para ejecutar la aplicación en Ionic, abrir un terminal en el directorio `/src/frontend`. Primero ejecutar  `npm install` (para que queden instaladas las dependencias necesarias) y posteriormente `ionic serve`

Para acceder al cliente web se debe ingresar la URL [http://localhost:8100/home](http://localhost:8100/) y para acceder al admin de la DB a [localhost:8001/](http://localhost:8001/). 

### Estructura del proyecto

```sh
├── db                          # directorio de la DB
│   ├── data                    # estructura y datos de la DB
│   └── dumps                   # directorio de estructuras de la DB
│       └── estructuraTPDAM.sql # estructura con la base de datos 
├── doc                         # documentacion general del proyecto
└── src                         # directorio codigo fuente
│   ├── backend                 # directorio para el backend de la aplicacion
│   │   ├── index.js            # codigo principal del backend
│   │   ├── mysql-connector.js  # codigo de conexion a la base de datos
│   │   ├── package.json        # configuracion de proyecto NodeJS
│   │   └── package-lock.json   # configuracion de proyecto NodeJS
│   └── frontend                # directorio para el frontend de la aplicacion (ionic)
│       
├── docker-compose.yml          # archivo donde se aloja la configuracion completa
├── README.md                   # este archivo
├── CHANGELOG.md                # archivo para guardar los cambios del proyecto
├── LICENSE.md                  # licencia del proyecto
```

