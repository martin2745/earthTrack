# plantillaPHP
arquitecturaPHP_REST

Proyecto en PHP7 de una arquitectura basada en principio REST con autenticación JWT.

Este proyecto ha sido desarrollado empleando XAMPP en windows 11 (Apache, MySQL, phpmyadmin y PHP en su versión 7.4).

El proyecto se fundamenta en la idea de desarrollar una arquitectura REST que pueda servir de platilla para realizar el BACK y el FRONT de futuros proyectos. Esta arquitectura consta de Controladores, Servicios, Modelos y Mapping siguiendo el patron MVA (Modelo-Vista-Adaptador). A mayores tenemos el FRONT básico realizado con
HTML5, CSS3, JavaScript, JQuery y BootStrap 5 que tiene la gestión de usuarios, rol, funcionalidad, accion, permisos, log de excepción de acciones y atributos y test.
Arquitectura

Nuestros controladores corresponden a nuestros puntos de acceso donde vamos a realizar la validación de atributos de las peticiones HTTP mediante excepciones. Una vez realizado este proceso el controlador invocará al servicio o servicios correspondientes donde se llevará a cabo la validación de acciones mediante excepciones. En el caso de que se produzca alguna excepción se devolverá una respuesta JSON con el código de error correspondiente. En el caso de que el proceso se haya producido con éxito se invocará al modelo o modelos para realizar las peticiones necesarias a base de datos.
Mapping PDO genérico

Se ha creado un archivo llamado mapping.php en la carpeta /Back/Mapping/mapping.php que consta de una serie de métodos capaces de generar de forma automática las sentencias SQL. Un ejemplo es la inserción, si queremos realizar una inserción de un usuario llamaremos a la función function insertar($tabla, $arrayDatoValor) donde indicamos la tabla donde se realizará la petición SQL y el array asociativo con los valores a insertar para un usuario. Esto nos evitará mucho trabajo ya que podremos generar sentencias SQL para inserciones, ediciones, borrados, busquedas de forma automática. Evidentemente esto se ha realizado para consultas SQL sencillas, aquellas que tengan un mayor grado de complejidad deberán realizarse a mano en los modelos.
JWT

Se ha empleado un sistema de autenticación JSON WEB TOKEN (JWT) que guarda la información codificada del usuario. Este token de autenticación tiene una expiración de dos horas y almacena el usuario, su contraseña y el rol de este. Su formato es el siguiente:

Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjUwODIwMDcsImp0aSI6IjlaRGJMUkNJaVBzV0NweE04OEhpUVJmXC8xbmdYaTU2WFVKMjQ1YXJ6R3ZzPSIsImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdCIsImV4cCI6MTY2NTA4OTIwNywiZGF0YSI6eyJjb250cmFzZW5hIjoiMjEyMzJmMjk3YTU3YTVhNzQzODk0YTBlNGE4MDFmYzMiLCJ1c3VhcmlvIjoiYWRtaW4iLCJyb2wiOiJhZG1pbmlzdHJhZG9yIn19.tDbmEDeepl542q_5OfMSIdrq-QDjiejMMKCfkGf-Rf8

Este token almacena la siguiente información:

HEADER: { "typ": "JWT", "alg": "HS256" }

PAYLOAD { "iat": 1665082007, "jti": "9ZDbLRCIiPsWCpxM88HiQRf/1ngXi56XUJ245arzGvs=", "iss": "http://localhost", "exp": 1665089207, "data": { "contrasena": "21232f297a57a5a743894a0e4a801fc3", "usuario": "admin", "rol": "administrador" } }

VERIFY SIGNATURE HMACSHA256( base64UrlEncode(header) + "." + base64UrlEncode(payload), your-256-bit-secret ) secret base64 encoded
Test

Como ya se ha indicado anteriormente se ha llevado a cabo un control de excepciones a nivel de atributo y acción. Se ha empleado la herramienta POSTMAN para poder generar consultas a nuestro BACK. En la dirección Back/Testeo existe un archivo JSON con todas las consultas generadas, así como el código resultante. A mayores este proyecto cuenta con dos bases de datos, una de producción y otra de test.
Proyecto realizado por: Martín Gil Blanco

Graduado en Ingeniería informática ESEI Uvigo www.linkedin.com/in/martín-gil-blanco