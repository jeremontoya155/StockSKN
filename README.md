<h1>API para Gestión de Equipos</h1>

<p>Esta API permite gestionar los equipos de clientes, con endpoints para autenticación, visualización, creación y eliminación de equipos. El sistema utiliza sesiones para la autenticación.</p>

<h2>Tabla de Contenidos</h2>
<ul>
  <li><a href="#autenticación">Autenticación</a></li>
  <li><a href="#gestión-de-equipos">Gestión de Equipos</a></li>
</ul>

<h2 id="autenticación">Autenticación</h2>

<h3>Inicio de sesión</h3>
<p><strong>URL:</strong> <code>/api/auth/login</code></p>
<p><strong>Método:</strong> <code>POST</code></p>
<p><strong>Descripción:</strong> Autentica a un usuario y establece una sesión.</p>
<p><strong>Body (JSON):</strong></p>
<code>
{
  "email": "clienteA@example.com",
  "password": "clienteA123"
}
</code>
<p><strong>Respuesta exitosa (200 OK):</strong></p>
<code>
{
  "mensaje": "Inicio de sesión exitoso."
}
</code>

<h3>Cerrar sesión</h3>
<p><strong>URL:</strong> <code>/api/auth/logout</code></p>
<p><strong>Método:</strong> <code>POST</code></p>
<p><strong>Descripción:</strong> Cierra la sesión del usuario autenticado.</p>
<p><strong>Respuesta exitosa (200 OK):</strong></p>
<code>
{
  "mensaje": "Sesión cerrada con éxito."
}
</code>

<h2 id="gestión-de-equipos">Gestión de Equipos</h2>

<h3>Obtener todos los equipos de un cliente</h3>
<p><strong>URL:</strong> <code>/api/equipments/:clienteId</code></p>
<p><strong>Método:</strong> <code>GET</code></p>
<p><strong>Descripción:</strong> Devuelve una lista de todos los equipos de un cliente específico.</p>
<p><strong>Parámetros:</strong></p>
<ul>
  <li><code>clienteId</code>: ID del cliente (en la URL).</li>
</ul>
<p><strong>Respuesta exitosa (200 OK):</strong></p>
<code>
[
  {
    "id": 1,
    "cliente_id": 1,
    "nombre_equipo": "Equipo A1",
    "detalles_componentes": {
      "procesador": "Intel i7",
      "memoria": "16GB",
      "almacenamiento": "1TB SSD"
    }
  },
  ...
]
</code>

<h3>Obtener un equipo específico</h3>
<p><strong>URL:</strong> <code>/api/equipments/:clienteId/:equipoId</code></p>
<p><strong>Método:</strong> <code>GET</code></p>
<p><strong>Descripción:</strong> Devuelve los detalles de un equipo específico.</p>
<p><strong>Parámetros:</strong></p>
<ul>
  <li><code>clienteId</code>: ID del cliente (en la URL).</li>
  <li><code>equipoId</code>: ID del equipo (en la URL).</li>
</ul>
<p><strong>Respuesta exitosa (200 OK):</strong></p>
<code>
{
  "id": 1,
  "cliente_id": 1,
  "nombre_equipo": "Equipo A1",
  "detalles_componentes": {
    "procesador": "Intel i7",
    "memoria": "16GB",
    "almacenamiento": "1TB SSD"
  }
}
</code>

<h3>Agregar un equipo</h3>
<p><strong>URL:</strong> <code>/api/equipments/:clienteId</code></p>
<p><strong>Método:</strong> <code>POST</code></p>
<p><strong>Descripción:</strong> Permite agregar un nuevo equipo para un cliente específico.</p>
<p><strong>Parámetros:</strong></p>
<ul>
  <li><code>clienteId</code>: ID del cliente (en la URL).</li>
</ul>
<p><strong>Body (JSON):</strong></p>
<code>
{
  "nombre_equipo": "Nuevo equipo",
  "detalles_componentes": {
    "procesador": "Intel i9",
    "memoria": "32GB",
    "almacenamiento": "2TB SSD"
  }
}
</code>
<p><strong>Respuesta exitosa (201 Created):</strong></p>
<code>
{
  "mensaje": "Equipo cargado con éxito."
}
</code>

<h3>Eliminar un equipo</h3>
<p><strong>URL:</strong> <code>/api/equipments/:equipoId</code></p>
<p><strong>Método:</strong> <code>DELETE</code></p>
<p><strong>Descripción:</strong> Elimina un equipo específico.</p>
<p><strong>Parámetros:</strong></p>
<ul>
  <li><code>equipoId</code>: ID del equipo (en la URL).</li>
</ul>
<p><strong>Respuesta exitosa (200 OK):</strong></p>
<code>
{
  "mensaje": "Equipo eliminado con éxito."
}
</code>

<h2>Notas</h2>
<p>- Todas las solicitudes a los endpoints protegidos requieren que el usuario haya iniciado sesión y esté autenticado mediante sesiones.</p>
<p>- Las cookies de sesión deben ser habilitadas para todas las solicitudes protegidas.</p>
<p>- Si la sesión expira o el usuario no ha iniciado sesión, el servidor responderá con un error <code>401</code> (Acceso no autorizado).</p>
