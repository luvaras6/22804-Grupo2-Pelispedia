# Implementacion de Feature - React Query

React Query es una librería que cuenta con 2 sencillos hooks que proporcionan la obtención, el almacenamiento en caché y la actualización de datos asíncronos en las aplicaciones React. Fue creado por Tanner Linsley, adepto de proyectos Open Source en 2019, y ahora se ha demostrado que es muy útil en la gestión del estado del servidor en las aplicaciones React. También hay otras librerías como SWR, Apollo Client y RTK-Query para la gestión del estado del servidor y podemos ver su comparación con React query en su página web: https://react-query.tanstack.com/comparison. Según la comparación de la página de react-query, react-query es la mejor opción desde un punto de vista objetivo.

Algunas de las ventajas que nos aporta React-Query son:

- Configurar el stale, la caché y el tiempo de reintento creando un objeto queryClientConfig.
- Actualización de los datos obsoletos o stale data en segundo plano, ya que react-query hace un preajuste.
- Optimizar las peticiones al backend.
- Con la función refetchOnWindowFocus, se puede volver a buscar en segundo plano cuando el usuario cambia la pestaña del navegador o cuando vuelve a la aplicación.
  <br>
  <br>
  <br>
> Esta rama fue creada usando Git Flow