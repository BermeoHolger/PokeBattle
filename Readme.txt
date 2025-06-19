1.- Instalar libreria JWT decode. Para esto se debe estar parado en la raiz del proyecto pokebattle en una terminal y tirar el comando: npm install jwt-decode
    luego reiniciar el servidor del frontend y funcona.

2.- En el index del backend corregir la linea de permisos de los metodos para que quede asi: header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
3.- En UserController del backend cambiar el mensaje de respuesta de la funcion 'actualizar' cuando status=200 -> Cambiar de 'error' a 'estado'.