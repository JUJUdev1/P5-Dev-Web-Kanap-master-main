import { productApi } from "./http/product_config.js";

const img = document.querySelector(".item__img");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colors = document.getElementById("colors");
const quantity = document.getElementById("quantity");

(async () => {
  const params = new URLSearchParams(window.location.search);
  const data = await productApi.fetch(params.get("id"));
  console.log(data);

  // changer le titre du document
  document.querySelector("title").textContent = data.name;
  // Insérer un produit et ses détails dans la page Produit
  let img2 = document.createElement("img");
  img.appendChild(img2);
  img2.src = data.imageUrl;
  img2.alt = data.altTxt;

  title.textContent = data.name;
  price.textContent = data.price;
  description.textContent = data.description;

  data.colors.forEach((color) => {
    let option = document.createElement("option");
    option.textContent = color;
    option.value = color;
    colors.appendChild(option);
  });

  // Ajouter un produit au panier
  let addToCart = document.getElementById("addToCart");
  addToCart.addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart"));

    // si on ajoute un produit identique au panier alors on additionne la quantité du panier
    // si le produit est dans le panier on ajoute la quantité au panier
    // si le produit n'est pas dans le panier on ajoute le produit au panier

    // si la couleurs est vide alors on affiche un message d'erreur
    if (colors.value === "") {
      return alert("Veuillez choisir une couleur");
    }

    // si la quandité est vide alors on affiche un message d'erreur
    if (quantity.value <= 0) {
      return alert("Veuillez choisir une quantité");
    }
    // si la quantité est supérieur à 0 et la couleur est non vide alors on ajoute le produit au panier
    if (quantity.value > 0 && colors.value !== "") {
      if (cart === null) {
        cart = [];
      }
      cart.push({
        id: data._id,
        name: data.name,
        color: colors.value,
        quantity: quantity.value,
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      return alert("Le produit a été ajouté au panier");
    }
    console.log(cart);
  });
})();
