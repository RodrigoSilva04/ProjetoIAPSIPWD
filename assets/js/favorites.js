$(document).ready(function () {
  // Funçao para renderizar um card de cao
  function gerarDogCard(cao) {
    console.log("Rendering dog card:", cao);
    var card = $("<div class='col-6 col-md-4 mt-5'>").html(`
      <div class='card'>
        <div class='card-body'>
          <h2 class='tipo-cao card-text'>${cao.type}</h2>
          <p class='year-movie card-text'>${cao.name}</p>
          <p class='type-movie card-text'>${cao.id}</p>
          <a href='${cao.url}' class='link-movie card-text'>Veja Aqui o Cão</a>
        </div>
      </div>
    `);

    return card;
  }

  // Function to render all dogs from favorites
  function gerarAllFavorites() {
    var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    console.log("Favorites from local storage:", favorites); // Add this line
    var favoritesContainer = $(".lista-favoritos");

    favorites.forEach(function (cao) {
      var card = gerarDogCard(cao);
      favoritesContainer.append(card);
    });
  }

  // Render all favorites on page load
  gerarAllFavorites();
});
