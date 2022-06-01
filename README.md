# Recuerdos App

### La aplicación para inmortalizar los recuerdos de tus viajes


![Imagen aplicación](/screenshots/imagen1.png)


#### Desarrollo
Para el desarrollo se ha seguido una aproximación Outside-In. Se han Dockerizado las aplicaciones de forma que agiliza el desarrollo y la puesta en producción con el uso de Docker Compose.

#### Dependencias utilizadas

Para el desarrollo del Frontend se ha utilazado React.

Nombre                          | Versión | Descipción        |
--------------------------------|---------|-------------------|
**@emotion/react**              | 11.9.0  | Paquete de animaciones utilizado por MUI |
**@emotion/styled**             | 11.8.1  |Paquete para hacer "Styled Components" usado por MUI
**@mui/icons-material**         | 5.6.2   | Paquete de iconos de Google material usado por MUI
**@mui/material**               | 5.6.4   | Framework de UI Components basado en Material Design
**@testing-library/jest-dom**   | 5.16.4  | Paquete para tsting unitario
**@testing-library/react**      | 13.1.1  | Paquete para testing desde el punto de vista del usuario
**@testing-library/user-event** | 13.5.0  | Paquete para testing desde el punto de vista del usuario
**react**                       | 18.1.0  | React
**react-dom**                   | 18.1.0  | React
**react-dropzone**              | 14.2.0  | Provee herramientas para crear Dropzones
**react-redux**                 | 8.0.1   | Redux
**react-responsive-carousel**   | 3.2.23  | Nos provee herramientas para realizar galerías de imágenes
**react-router-dom**            | 6.3.0   | Router
**react-scripts**               | 5.0.1   | Building
**redux**                       | 4.2.0   | Redux
**redux-localstorage**          | 0.4.1   | Middleware Redux Localstorage
**usehooks-ts**                 | 2.5.2   | Paquete de hooks útiles
**web-vitals**                  | 2.1.4   | Reportes de Web Performance

#### Deploy

La base de datos se ha desplegado en MongoDB Atlas y  la aplicación web se ha desplegado en heroku.


[Frontend](https://recuerdos-app-client.herokuapp.com/)