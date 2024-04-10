
# Apuntes REDUX

## Introducción y definiciones

### ¿Qué es REDUX?

Redux es un patrón de manejo de la información con el que se puede saber con un historico quien ha cambiado cierta variable, cuando y que valor tenía.

El patrón Redux es la centralización de los datos de la aplicación, en una estructura definida. 

El lugar donde se guarda la información se llama store

El store no se modifica directamente

Cualquier interacción del usuario y/o codigo dispara acciones qque describen qué sucedió

El valor actual de la información de la aplicación se llama state

Un nuevo estado es creado en base a la combinación del viejo estado y a una acción por la función llamada reducer

El state es un objeto de JS que almacena toda la información de la aplicación

### Acción

Es la única fuente de información que se envía por interacciones de usuario o programa

Se busca que las acciones sean lo más simples posible

Una acción tiene únicamente dos propiedades:

* type:
  * tarea
  * Obligatorio
* payload:
  * la menor cantidad de información para realizar dicha tarea
  * Opcional

### Reducer

Es una función que únicamente recibe dos argumentos y siempre retorna un estado

Los argumentos que recibe un reducer son:

* oldState:
  * El estado actual de la aplicación, tal y como se encuentra en este momento
* action:
  * Es un objeto plano que indica qué hay que hacer

### State

Hay varias reglar que se tiene para usar un state:

* El state es de sólo lectura
* Nunca se mutará el state de forma directa
* Hay funciones que estan prohibidas de JS:
  * push
  * cualquier funcion que modifica un objeto
  * manipulación directa del objeto oldState

### Store

El store es un objeto que tiene las siguientes responsabilidades:

* Contiene el estado de la aplicación
* Permite la lectura del estado via: `getState()`
* Permite crear un nuevo estado utilizando: `dispatch(ACTION)`
* Permite notificar los cambios via: `subcribe()`
