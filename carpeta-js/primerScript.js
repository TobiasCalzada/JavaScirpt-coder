//elementos llamados por id
const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalcontainer = document.getElementById("modalContainer");
const cantidadCarrito = document.getElementById("cantidadCarrito");

//carrito
let carrito = JSON.parse(localStorage.getItem("elementos-carrito")) || [];

//elementos de mis cards
productos.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card"
    content.innerHTML = `
    <img src="${product.img}">
    <h3 class ="tituloDeCards">${product.nombre}</h3>
    <p class ="precio"> precio: ${product.precio} $</p>
    `;

    shopContent.append(content)

    //botton compra
    let comprar = document.createElement("button")
    comprar.innerText = "Comprar";
    comprar.className = "comprar"

    content.append(comprar);

    //funcionalidad
    comprar.addEventListener("click", () =>{

    const repetir = carrito.some((repetirProducto) => repetirProducto.id === product.id);
    console.log(repetir);

    //condicion
    if(repetir){
      carrito.map((prod)=>{
        if(prod.id === product.id){
          prod.cantidad++;
        }
      });
    }else { 
      carrito.push({
        id: product.id,
        img: product.img,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: product.cantidad,
      });
    };
      console.log(carrito);
      console.log(carrito.length);
      carritoCounter();
      guardadoLocal();
    });
});

//local storage
const guardadoLocal = () =>{
  localStorage.setItem("elementos-carrito", JSON.stringify(carrito));
};

//get
JSON.parse(localStorage.getItem("elementos-carrito"));







