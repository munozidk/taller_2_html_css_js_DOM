// funcion crear tarjeta producto 

function crearTarjeta(producto) {
  
    //contenedor principal

    const tarjeta = document.createElement('div');
    tarjeta.classList.add('tarjeta');

    //imagen

    const imagen = document.createElement('img');
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;
    tarjeta.appendChild(imagen);

    //nombre

    const nombre = document.createElement('h2');
    nombre.textContent = producto.nombre;
    tarjeta.appendChild(nombre);

    //descripcion

    const descripcion = document.createElement('p');
    descripcion.textContent = producto.descripcion;
    descripcion.classList.add('descripcion');
    tarjeta.appendChild(descripcion);

    //precio 

    const precio = document.createElement('p');
    precio.textContent = '$' + producto.precio.toFixed(2);
    precio.classList.add('precio');
    tarjeta.appendChild(precio);

    // agregar al carrito

    const btnCarrito = document.createElement('button');
    btnCarrito.textContent = 'Agregar al Carrito';
    btnCarrito.classList.add('btn-carrito');
    btnCarrito.addEventListener('click', function(){
        btnCarrito.textContent = 'Agregado';
        btnCarrito.disabled = true;
    });
    tarjeta.appendChild(btnCarrito);

    //mostrar/ocultar reseñas

    const btnResenas = document.createElement('button');
    btnResenas.textContent = 'Mostrar Reseñas';
    btnResenas.classList.add('btn-resenas');
    tarjeta.appendChild(btnResenas);

    //contenedor de reseñas

    const listaResenas = document.createElement('div');
    listaResenas.classList.add('lista-resenas');

    if (producto['reseñas'].length > 0) {
        producto['reseñas'].forEach(function(r){
            const resena = document.createElement('div');
            resena.classList.add('resena');
            
            const usuario = document.createElement('span');
            usuario.textContent = r.usuario + ':';
            usuario.classList.add('usuario');

            const fecha = document.createElement('span');
            fecha.textContent = r.fecha;
            fecha.classList.add('fecha');

            const texto = document.createElement('p');
            texto.textContent = r.texto;

            resena.appendChild(usuario);
            resena.appendChild(fecha);
            resena.appendChild(texto);
            listaResenas.appendChild(resena);
        });
    } else {
        const sinResenas = document.createElement('p');
        sinResenas.textContent = 'No hay reseñas para este producto.';
        sinResenas.classList.add('sin-resenas');
        listaResenas.appendChild(sinResenas);
    }

    tarjeta.appendChild(listaResenas);

    //logica boton mostrar/ocultar

    btnResenas.addEventListener('click', function(){
        if (listaResenas.style.display === 'none' || listaResenas.style.display === '') {
            listaResenas.style.display = 'block';
            btnResenas.textContent = 'Ocultar Reseñas';
        } else {
            listaResenas.style.display = 'none';
            btnResenas.textContent = 'Mostrar Reseñas';
        }
    });

    return tarjeta;
}

// fetch para cargar el json

const catalogo = document.getElementById('catalogo');

fetch('productos.json')
.then(function(response){
    return response.json();
})
.then(function(productos){
    productos.forEach(function(producto){
        const tarjeta = crearTarjeta(producto);
        catalogo.appendChild(tarjeta);
    });
})

.catch(function(error){
    console.error("Error al cargar los productos del catalogo:", error);
});