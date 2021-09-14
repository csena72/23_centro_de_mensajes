# 23_centro_de_mensajes

### Consigna:  

Sobre el desafío entregable de la última clase, cambiar la persistencia de los mensajes en el filesystem por persistencia en base de datos SQLite3.
Sobre el desafío entregable de la clase anterior, vamos a reformar el formato de los mensajes y la forma de comunicación del chat (centro de mensajes).
El nuevo formato de mensaje será:

```
 var mensaje = { 
            author: {
                id: 'mail del usuario', 
                nombre: 'nombre del usuario', 
                apellido: 'apellido del usuario', 
                edad: 'edad del usuario', 
                alias: 'alias del usuario',
                avatar: 'url avatar (foto, logo) del usuario'
            },
            text: 'mensaje del usuario'
        }
```

### >> Aspectos a incluir en el entregable: 
1. El mensaje se envía del frontend hacia el backend, el cual lo almacenará en el base de datos. Luego cuando el cliente se conecte o envie un mensaje, recibirá ***un array de mensajes*** a representar en su vista. 

2. El array debe estar ***normalizado con normalizr,*** conteniendo una entidad de autores. Considerar que el array tiene sus autores con su correspondiente id (mail del usuario), pero necesita incluir para el proceso de normalización un ***id para todo el array*** en su conjunto (podemos asignarle nosotros un valor fijo).

3. El frontend debería poseer el ***mismo esquema de normalización*** que el backend, para que este pueda desnormalizar y presentar la información adecuada en la vista.

4. Considerar que se puede ***cambiar el nombre del id*** que usa normalizr, agregando un tercer parametro a la función schema.Entity, por ejemplo:

```
const schemaAuthor = new schema.Entity('author',{...},{idAttribute: 'email'});
```
En este schema cambia el nombre del id con que se normaliza el nombre de los autores a 'email'. Más info en la web oficial.  
Presentar en el frontend (a modo de test) el ***porcentaje de compresión*** de los mensajes recibidos. Puede ser en el título del centro de mensajes.


### >> Nota: 
incluir en el frontend el script de normalizr de la siguiente cdn: https://cdn.jsdelivr.net/npm/normalizr@3.6.1/dist/normalizr.browser.min.js
Así podremos utilizar los mismos métodos de normalizr que en el backend. Por ejemplo:  
```
new normalizr.schema.Entity , normalizr.denormalize(...,...,...)
```