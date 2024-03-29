# Prueba técnica frontend

## Requisitos de aplicación
- [x] Una vista inicial global que muestre los datos poblacionales por continente.
- [x] Un menú de navegación que permita seleccionar un continente y cambiar de vista, para
visualizar los datos poblacionales de los países de la región.
- [x] Un campo que permita filtrar por el número de población, limitando de esta manera los continentes (vista inicial) o los países (vistas de continente) que cumplan la condición.

## Requisitos técnicos
- [x] Utilizar un Framework de desarrollo web: Angular, React o Vue.
- [x] Implementar enrutamiento para navegar entre las diferentes vistas.
- [x] Obtener los datos mediante una API externa. Se facilita la siguiente API RESTful de uso público: https://restcountries.com/

## Recomendaciones
- [x] Integrar un único gráfico por vista. (Se aconseja el uso de gráfico de barras).
- [x] Usar una librería de terceros para presentar los datos. (Ejemplo: Highcharts o ChartJS).
- [x] Incorporar un menú de navegación y un campo de entrada (input) para el filtrado de
datos, ambos incluidos y visibles en cada vista.

## Pasos
1. Iniciamos el proyecto React con Vite
2. Configuramos un entorno de pruebas con Vitest
3. Configuramos Despliege continuo con Github Actions
4. Comenzamos a leer datos desde la API propuesta.
   - Dicha API nos permite filtrar la cantidad de campos recibidos, usamos como parámetro de consulta `?fields=name,flags,population,continents` para sólo obtener datos necesarios.
   - En la respuesta nos da un `max-age` de 1 año, cacheamos la respuesta para evitar llamadas innecesarias. De hecho, revisando el repositorio de la API, la última actualización de los datos es de hace 3 años.
   - La API provee un método para obtener datos por continente (`region`) pero no da una lista de continentes por si sola. Leemos desde `/all` y preparamos los datos para toda la aplicación
   - Proponemos un repositorio que centralice el acceso a datos (tanto de red como de cache) con dos métodos:
     - Devolver datos de continentes
     - Devolver datos de un continente
5. Añadimos React Router
   - En este punto, los test de componente no me aportan demasiado porque no tengo claro que componentes voy a usar, añado cypress con u npequeño test para validar que el enrutado funciona
6. No recordaba que Vite no configura el linter. Añado Prettier y los plugins de eslint, así como configuración para Visual Studio Code
7. Se añade la funcionalidad de filtrado. Utilizo la API de Context de React para tener acceso a los filtros en los diversos componentes. Como añadido, serializamos el filtro en la URL para tener histórico y para poder compartir URLs ya filtradas
8. Añadimos los gráficos con la libreria Highcharts
9. Varios cambios juntos:
   - Saco los datos iniciales (los de los continentes) a un Provider, necesito acceso a ellos en un par de componentes
   - Añado componentes gráficos y estilos con Bulma
   - Elimino el cambio de estado en los filtros, con la navegación basta