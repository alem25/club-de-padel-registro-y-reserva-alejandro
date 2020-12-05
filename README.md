# ClubDePadelRegistroyReserva

Este proyecto es una Web App desarrollada en Angular CLI y para funcionar necesita que esté el proyecto llamado ClubDePadelRegistroyReservaApiRest en ejecución.

## Ejecutar el servidor

Es necesario descargar el comprimido o clonar el proyecto, compilarlo y ejecutarlo con el comando 'ng serve' o 'npm start' en la consola o powershell en la ruta del proyecto descargado. Es necesario tener instalado node.js y algunas otras dependencias del proyecto. Una vez ejecutado el proyecto, accede a la ruta [https://localhost:puerto1] en el navegador web. Por defecto, se abre en el puerto 4200.

## Conectar esta Web App con la Web Api Rest

Para utilizar la aplicación web completa, debes descargar y ejecutar ambos proyectos. Luego debes modificar los archivos environment.ts de este proyecto, cambiando el valor del campo URL por la del servidor donde se está ejecutando la API REST. Finalmente, debes ir al Web.config del proyecto API REST y actualizar el campo 'value' de la línea de código 31: [add name="Access-Control-Allow-Origin" value="http://localhost:4200"] con la ruta del servidor y puerto de esta WEB (por defecto el puerto del servidor WEB es 4200, en este caso no será necesario actualizar esta línea).

## Más información

En el archivo README.md del proyecto ClubDePadelRegistroyReservaApiRest hay instrucciones más detalladas sobre como descargar y ejecutar ese proyecto.

### Desarrollado por: [https://github.com/alem25]