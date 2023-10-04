document.addEventListener("DOMContentLoaded", function () {
    let urlJSON = "https://japceibal.github.io/emercado-api/cats_products/101.json";
    let nomProucto = document.getElementById("prodNom");
    let imgProduct = document.getElementById("prodImg");
    let btnActualizar = document.getElementById("btnUpdate");
    let arrayProducts = [];
    let contenedorList = document.getElementById("list");

    fetch(urlJSON)
        .then(function(response) {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("No se pudo cargar el producto");
            }
        })
        .then(function(data) {
            arrayProducts = data.products;   
            showProducts(arrayProducts);
        })
        .catch(function(error) {
            if (error.message === "No se pudo cargar el producto") {
                // Manejar el error aquí
            }
        });

    function showProducts(array) {
        let htmlContentToAppend = "";
        for (let i = 0; i < array.length; i++) {
            let producto = array[i];
            htmlContentToAppend += `<option id="opcion">${producto.name}</option>`;
        }
        contenedorList.innerHTML = htmlContentToAppend;
    }

    contenedorList.addEventListener("change", function () {
        let productoSelec = contenedorList.options[contenedorList.selectedIndex].text;
        console.log(productoSelec);
        let auxNom = "";
        let auxFoto = "";
        let productoSeleccionado = arrayProducts.find(producto => producto.name === productoSelec);
        console.log(productoSeleccionado);
        console.log(productoSeleccionado.image);
        auxNom += `<p>${productoSeleccionado.name}</p>`;
        auxFoto += `<img src="${productoSeleccionado.image}" alt="${productoSeleccionado.name}"></img>`;
        nomProucto.innerHTML = auxNom;
        imgProduct.src = productoSeleccionado.image;
    });
});
