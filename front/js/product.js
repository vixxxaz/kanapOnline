// je vais chercher l'adresse de l'api
const api = "https://kanapttemarque.herokuapp.com/api/products";

// je crée url qui va chercher la page
let url = new URL(window.location.href);

//je vais chercher id du produit
let id = url.searchParams.get("id");

var data = "";

//Je vais chercher les donnée du produit dans l'api
fetch(api + '/' + id)

.then(function(response) {
    if (response.ok) {
        return response.json();
    }
})

.then(function(data) {

    kanapDisplay(data);
})

//affiche une erreur si les donnée ne sont pas disponible
.catch(function(error) {

    alert("Erreur de telechargement des données!");
})




/*afficher les information du produit de maniere dynamique
en prenant en parametre les données de l'api
*/

function kanapDisplay(data) {

    //creé un element img
    let kanapImg = document.createElement('img');

    //choisi ou ajouter l'élément image
    document.querySelector('.item__img').appendChild(kanapImg);

    //ajout de l'image grace a l'api
    kanapImg.src = data.imageUrl;

    //ajoute le alt de l'image
    kanapImg.alt = data.altTxt;

    // crée le nom du produit avec les données de l'api
    let name = data.name;

    //Ajout du nom 
    document.getElementById('title').innerHTML = name;

    // creer le prix du produit avec les données l'api
    let price = data.price;

    // ajout du prix
    document.getElementById('price').innerHTML = price;

    // crer la description avec les données de l'api
    let description = data.description;

    // ajout de la description
    document.getElementById('description').innerHTML = description;

    //creer les option de couleur
    let options = data.colors;

    //recupere la liste deroulante
    var liste = document.getElementById("colors");

    //loop dans le tableau des couleur de l'api
    for (var i = 0; i < options.length; ++i) {

        //ajout des couleurs du tableau dans la liste déroulante
        liste[liste.length] = new Option(options[i], options[i]);
    };
    //j'appelle la fonction creer en dessous avec en parametre les données de l'api
    addToCart(data);
}

// Récupére les choix de l utilisateur
var colorChosen = document.querySelector("#colors")
var quantityChosen = document.querySelector("#quantity")

// function ajout dans le panier
function addToCart(data) {

    //recuperer le bouton
    let btnSendToCart = document.querySelector("#addToCart");

    //fenetre pop up ajout kanap
    const popUpComfirmation = () => {
        if (window.confirm(`Votre commande de ${data.name} à bien été ajouter au panier`)) {
            window.location.href = 'cart.html';
        }
    }

    //Ecoute l'action du click sur le bouton ajouter au panier
    btnSendToCart.addEventListener("click", () => {

        //Si la quantitée choisi est superieur à zero et inferieur ou egal à 100 et different de 0
        if (quantityChosen.value > 0 && quantityChosen.value <= 100 && quantityChosen.value != 0) {

            //Recupere le choix de couleur
            let colorsChoice = colorChosen.value;

            //recupere le choix de la quantity
            let quantityChoice = quantityChosen.value;

            let kanapFound = false;


            // Crée les options en un objet avec les choix de l'utilisateur et les données du produit de l'api
            var optionsKanap = {
                Id: id,
                colorKanap: colorsChoice,
                quantityKanap: quantityChoice,
                name: data.name,
                imgKanap: data.imageUrl,
                altImg: data.altTxt,
            };

            //Crée le localStorage 
            let kanapLocalStorage = JSON.parse(localStorage.getItem("cart"));

            /*importation des options et des choix dans le localstorage 
            creé ci-dessus
             */
            if (kanapLocalStorage) {

                //crée le resultat en allant chercher en fonction de l id et de la couleur
                let resultFind = kanapLocalStorage.find(
                    (el) => el.Id === optionsKanap.Id && el.colorKanap === optionsKanap.colorKanap
                );

                //si le panier à déjà un article
                if (resultFind) {
                    //crée un nouvelle quantité en additionnant les options ajouté et le resultat ci dessus
                    let newQuantity =
                        parseInt(optionsKanap.quantityKanap) + parseInt(resultFind.quantityKanap);
                    resultFind.quantityKanap = newQuantity;
                    kanapFound = true;

                    //Si le resultat trouvé est superieur à 100
                    if (parseInt(resultFind.quantityKanap) > 100) {
                        alert("Impossible d\'ajouter ce produit car limité à 100 ");
                        kanapFound = false;

                    }

                    if ((parseInt(resultFind.quantityKanap) <= 100) && (kanapFound === true)) {
                        // ajoute la nouvelle quantité dans le localstorage
                        localStorage.setItem("cart", JSON.stringify(kanapLocalStorage));
                        popUpComfirmation()
                    }

                    // sinon ajoute le produit 
                } else {
                    kanapLocalStorage.push(optionsKanap);
                    localStorage.setItem("cart", JSON.stringify(kanapLocalStorage));
                    popUpComfirmation()
                }

                //sinon ajoute les options au localstorage vide   
            } else {
                kanapLocalStorage = [];
                kanapLocalStorage.push(optionsKanap);
                localStorage.setItem("cart", JSON.stringify(kanapLocalStorage));
                popUpComfirmation()
            }
        }
    });
}