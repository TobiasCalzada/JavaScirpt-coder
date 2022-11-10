//elementos llamados por id
const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const buscador = document.getElementById("buscador");
const modalcontainer = document.getElementById("modalContainer");
const cantidadCarrito = document.getElementById("cantidadCarrito");
const boton = document.getElementById("boton");

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
    <p class ="stock"> stock: ${product.stock}</p>`;
    shopContent.append(content)

    //botton compra
    let comprar = document.createElement("button")
    comprar.innerText = "Agregar al carrito";
    comprar.className = "comprar"
    content.append(comprar);

    //funcionalidad
    comprar.addEventListener("click", () =>{

    const repetir = carrito.some((repetirProducto) => repetirProducto.id === product.id);
    console.log(repetir);
    
    Toastify({
      text: `Se a agregado al carrito el producto : ${product.nombre}`,
      duration: 2000,
      offset: {
        x: 60,
        y: -5
      },
      style: {
        background:"linear-gradient(to top, #3F3F3F, #D6D2D2)",
      },
    }).showToast();

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



//fetch
fetch("proximamente.json")
.then((responsivo) => responsivo.json())
.then((info) => creador(info))

function creador(info){

  console.log(info);
  
  info.forEach((prod) => {
    let divProximamente = document.createElement("div");
    divProximamente.className = "cardDeProximamente"
    divProximamente.innerHTML = `
    <img src="${prod.imgProximamente}">
    <h3 class ="tituloDeCards">${prod.nombreProximamente}</h3>
    <p class ="precio"> precio: ${prod.precior} $</p>
    <P class ="stock">stock: ${prod.stockr}</p>
    `;
    shopContent.append(divProximamente)
});

}

