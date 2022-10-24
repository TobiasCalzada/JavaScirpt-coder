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
        <img src="${product.img}"
        <h3>${product.nombre}</h3>
        <p>${product.precio} $<p>
        <span class="restar"> - </span>
        <p>Cantidad: ${product.cantidad}</p>
        <span class="sumar"> + </span>
        <p>Total: ${product.cantidad * product.precio}</p>
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


    let eliminar = document.createElement("span");
    eliminar.innerText = "✖";
    eliminar.className = "eliminaProducto";
    carritoContent.append(eliminar);

    eliminar.addEventListener("click",eliminarProducto)
  });

  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

  const totalcompra = document.createElement("div");
  totalcompra.className = "totalcompra";
  totalcompra.innerHTML = `<p> total a Pagar: ${total} $ <p>`;

  modalcontainer.append(totalcompra);
};



verCarrito.addEventListener("click" , pintarcarrito);

//eliminar productos funcion
const eliminarProducto = () => {
  const foundId = carrito.find((element) => element.id);

  carrito = carrito.filter((carritoid) => {
    return carritoid !== foundId;
  });
  carritoCounter();
  guardadoLocal();
  pintarcarrito();
};



//funcion conttador carrito icono
const carritoCounter = () =>{
  cantidadCarrito.style.display = "block";

  const carritolength = carrito.length;

  localStorage.setItem("carritolength", JSON.stringify(carritolength));
  
  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritolength"));
}

carritoCounter();