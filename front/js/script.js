"use strict";

//fonction qui va chercher les données de l 'api :

async function getKanap() {
    var kanapData = await fetch("https://api-kanap.onrender.com/api/products");
    return await kanapData.json();
};


// function qui reprend les données de l'api pour les envoyer dans le dom

async function kanapDisplay() {

    var kanapData = await getKanap()

    .then(function(resultApi) {

        const kanaps = resultApi;

        // boucle pour afficher les données des kanap dans des cartes sur la page d'accueil.
        for (let kanap in kanaps) {

            //creation de l element <a> :
            let kanapLink = document.createElement('a');

            //Ajout comme enfant à la classe items
            document.querySelector('.items').appendChild(kanapLink);

            //Ajout de attribut href et envois sur la page produit avec l'id du produit choisi.
            kanapLink.href += `./product.html?id=${resultApi[kanap]._id}`;


            //création de lélément <article> :
            let kanapArticle = document.createElement('article');

            //Ajout de l'élément comme enfant de l'élément <a>
            kanapLink.appendChild(kanapArticle);


            //création de lélément <img>
            let kanapImg = document.createElement('img');

            //ajout de l'élément image au parent 
            kanapArticle.appendChild(kanapImg);

            // attribution de l'adresse de l'image
            kanapImg.src = resultApi[kanap].imageUrl;

            // attribution de l'attribut alt .
            kanapImg.alt = resultApi[kanap].altTxt;


            //création de l'élément h3
            let kanapName = document.createElement("h3");

            //Crétion d'une classe a la balise <article>
            kanapArticle.classList.add("kanapName");

            //ajout de l'élément h3 au parent par la classe ajoutée précédemment.
            kanapArticle.appendChild(kanapName);

            //Remplir le titre avec le nom dans l'api.
            kanapName.innerHTML = resultApi[kanap].name;


            //création de l'élément <p>
            let kanapDescription = document.createElement("p");

            //ajout de lélément au parent 
            kanapArticle.appendChild(kanapDescription);

            // ajout de la classe a la balise <p>
            kanapDescription.classList.add("kanapName");

            //Remplire le paragraphe avec la description de l'api
            kanapDescription.innerHTML = resultApi[kanap].description;

        }

    })
}

kanapDisplay();
