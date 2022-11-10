//carrito
const pintarcarrito = () =>{
    modalcontainer.innerHTML = "";
    modalcontainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modalHeader";
    modalHeader.innerHTML =`
        <h1 class = "modalHeaderTitle">Carrito.</h1>
  `;
  modalcontainer.append(modalHeader);

  const modalBoton = document.createElement("h1");
  modalBoton.innerText = "x";
  modalBoton.className ="modalHeaderboton";

  modalBoton.addEventListener("click", () => {
    modalcontainer.style.display = "none";
});

modalHeader.append(modalBoton);

carrito.forEach((product) =>{
    let carritoContent = document.createElement("div");
    carritoContent.className = "modalContent";
    carritoContent.innerHTML = `
        <img class="imagenModal" src="${product.img}"
        <h3>${product.nombre}</h3>
        <p class="precioModal">${product.precio} $</p>
        <span class="restar"> - </span>
        <p class="cantidadModal">Cantidad: ${product.cantidad}</p>
        <span class="sumar"> + </span>
        <p>Total: ${product.cantidad * product.precio}</p>
        <span class="eliminaProducto"> ✖ </span>
    `;

    modalcontainer.append(carritoContent);

    let restar = carritoContent.querySelector(".restar");

    restar.addEventListener("click", () =>{
      if(product.cantidad !== 1){
        product.cantidad --;
      }
      guardadoLocal();
      pintarcarrito();
    });

    let sumar = carritoContent.querySelector(".sumar");
    sumar.addEventListener("click", () =>{
      product.cantidad ++;
      guardadoLocal();
      pintarcarrito();
    });

    let eliminar = carritoContent.querySelector(".eliminaProducto")
    
    eliminar.addEventListener("click", () =>{
      Swal.fire({
        title: 'Esta seguro de eliminar el producto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#3F3F3F',
        confirmButtonText: 'Eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado',
            'El producto se elimino correctamente.',
            'success',
          )
          eliminarProducto(product.id);
        }
      });
      
    });
    
    eliminar.addEventListener("click",eliminarProducto);
  });


  
  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

  const totalcompra = document.createElement("div");
  totalcompra.className = "totalcompra";
  totalcompra.innerHTML = `<p> total a Pagar: ${total} $ <p>`;

  modalcontainer.append(totalcompra);
};

verCarrito.addEventListener("click" , pintarcarrito);

//eliminar productos funcion
const eliminarProducto = (id) => {
  const foundId = carrito.find((element) => element.id === id);

  carrito = carrito.filter((carritoid) => {
    return carritoid !== foundId;
  });

  carritoCounter();
  guardadoLocal();
  pintarcarrito();
};



//funcion conttador carrito icono
const carritoCounter = () =>{

  const carritolength = carrito.length;

  localStorage.setItem("carritolength", JSON.stringify(carritolength));
  
  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritolength"));

  carrito.length != 0 ?    cantidadCarrito.style.display = "block" :    cantidadCarrito.style.display = "none";

}

carritoCounter();