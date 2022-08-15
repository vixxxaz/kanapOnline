//Je vais chercher la page
var urlConfirm = window.location.href;

// je crée url qui va chercher la page
var url = new URL(urlConfirm);

//Je recupere l'id de commande dans l'url
var orderId = url.searchParams.get("orderid");

//J'injecte l'id dans le dom
document.getElementById("orderId").innerHTML = `${orderId}`;