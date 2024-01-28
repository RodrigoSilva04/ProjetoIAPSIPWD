$(document).ready(function(){
    var cloneCard = $(".card-cao").clone();
//Clique no botão search//
$("#btn-search").on("click",function(){
    //vamos limpar a listagem
    $(".lista-caes").empty();

    var valueSearch = $("#pesquisa").val();/* Isto vai buscar o valor do value na pesquisa*/

//Acrescenta ao lista filmes o nome do que estamos a
    $(".search-title").text("Lista de cães encontrados: "+ valueSearch);

    // Adicione o token Bearer à sua solicitação AJAX
    var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJvR3dXeU9hY29ZWkUzYXdEUDhCU2FTQWZMU1VlbFNCS1dNb0ZrU2R4R3piV2R4ZnlvdCIsImp0aSI6IjI5NTFmYWViYjVjOTM4MDE5MDI0NDcwNjAxM2FlOTZiYTU2MWZhNTlkZjQ0Mjc5ZDA5YmY0MDBkY2I3NjMzMzdlZDI4ZDRjZTA5N2FmMjgwIiwiaWF0IjoxNzA1ODg4NjE3LCJuYmYiOjE3MDU4ODg2MTcsImV4cCI6MTcwNTg5MjIxNywic3ViIjoiIiwic2NvcGVzIjpbXX0.bX9h9bTD3KtzQbY6cwAOE9cUxiQ0zLPsvFOhYVjlv70josKyBOjE4t1BonkNR9L2skH6hQ722OtQAh8rBfNCQ9_G-g2fLjyHUnSWM-q3qrBKckr48StBkmoW-BRkINWJlGjlcBCeW2jDoM-0zBJCaklENzLI_rLZMcR79afAsITYreZ6XKbp3OJ6AQ7hqTzA29G5VArL22-SoEDbpwLGgI-BFdCp1qCBrqiE94T1uFtAgKuIQSnhAmivGfLSoZZ5jeGcRcjU-X_UNFif_xz3-gBFjxQ3XzjkSWqJNm3RjgAPP73hFWmlCHp-nXMPaBgBGk5D28u_fRQELXbDpWCLbA"; // Substitua pelo seu token Bearer

    $.ajax({
        method: "GET",
        url: "https://api.petfinder.com/v2/animals?type=dog&name=" + valueSearch,
        headers: {
            "Authorization": "Bearer " + token
        },
    })
    .done(function(data){
        console.log(data.animals);
        
        /* Aqui vamos fazer um ciclo para ir buscar todos os objetos 
        dentro do data search o parametro result do "each" tem o obejecto de cada filme*/
         $.each(data.animals, function(index, result) {
            console.log(result);
            var card = cloneCard.clone();//copia o card
            // Adiciona os detalhes do cão no link
          var detailsLink = $(".link-movie", card);
detailsLink.attr("href", "detalhescao.html?name=" + encodeURIComponent(result.name) + "&type=" + encodeURIComponent(result.type) + "&id=" + encodeURIComponent(result.id));

detailsLink.attr("target", "_blank"); // Open link in a new tab/window

          // Preenche o card automaticamente
          $(".tipo-cao", card).text(result.type);
          $(".nome-cao", card).text(result.name);
          $(".id-cao", card).text(result.id);
          $(".link-movie", card).attr("href", detailsLink.attr("href"));


            var favoriteButton = $(".add-fav",card);
            var adopedButton =$(".add-adopted",card);
            //vou passar dois parametros na função
            updateFavoriteButton(favoriteButton,result);
            updateAdoptedButton(adopedButton,result);

            $(".lista-caes").append(card);//colocal cada card a seguir aos outros

        });
    })
    .fail(function(error){
        console.error("Erro na solicitação AJAX: ", error);
    });
});

    //Função para adicionar aos favoritos
    function saveToFavorites(cao){
        //Vou buscar o valor que esta na local storage
        var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        favorites.push(cao);
        //gravar na localstorage
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    //Função para verificar se esta nos fav
    function isFavorite(id) {
        console.log(id);
        // vai buscar ao localstorage "favorites"
        var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        // verifica se o array não é null
        if (favorites != null) {
            // Alternativa 1
            for (var i = 0; i < favorites.length; i++) {
                if (favorites[i].id == id) {
                    return true;
                }
            }
            return false;
            /* Alternativa 2
            return favorites.find(result => result.id === id) != -1;
            */
            /* Alternativa 3
            return favorite.some(result => result.id === id);
            */
        }
        return false;
    }
        


    function updateFavoriteButton(button,cao){
        //Update estado visual do botão
        if(isFavorite(cao.id))
        {
            button.text("Remover Favoritos");
            button.removeClass("btn-primary");
            button.addClass("btn-danger");
            button.addClass("event-added")
        }
        else{
            button.text("Adicionar Favoritos");
            button.removeClass("btn-danger");
            button.addClass("btn-primary");
            
        }
        //Verifica se não tem a class "event-added" pois tem o !.
        button.off("click").on("click", function () {
            if (isFavorite(cao.id)) {
                alert("Removeu dos fav");
                removeFromFavorites(cao.id);
            } else {
                alert("Adicionado aos fav");
                saveToFavorites(cao);
            }
            // Atualiza o botão após adicionar ou remover
            updateFavoriteButton(button, cao);
        });
        }

        // Função para remover dos favoritos
function removeFromFavorites(id) {
    // Vai buscar o valor que está na local storage
    var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    // Filtra os favoritos, removendo o cão com o ID correspondente
    var updatedFavorites = favorites.filter((fav) => fav.id !== id);
    // Grava de volta na local storage
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
}

// Funcao para ober o URL
function getUrlParameter(name) {
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Obter detalhes pelo URL
var dogName = getUrlParameter('name');
var dogType = getUrlParameter('type');
var dogId = getUrlParameter('id');
        
//Função para adicionar aos adotados
    function saveToAdopted(cao){
        //Vou buscar o valor que esta na local storage
        var adotados = JSON.parse(localStorage.getItem("adopted")) || [];
        adotados.push(cao);
        //gravar na localstorage
        localStorage.setItem("adopted", JSON.stringify(adotados));
    }

    function isAdopted(id) {
        console.log(id);
        // vai buscar ao localstorage "adopted"
        var adotados = JSON.parse(localStorage.getItem("adopted")) || [];
        // verifica se o array não é null
        if (adotados != null) {
            // Alternativa 1
            for (var i = 0; i < adotados.length; i++) {
                if (adotados[i].id == id) {
                    return true;
                }
            }
            return false;
        }
        return false;
    }

    function updateAdoptedButton(button,cao){
        //Update estado visual do botão
        if(isAdopted(cao.id))
        {
            button.text("Já foi adotado");
            button.removeClass("btn-primary");
            button.addClass("btn-danger");
            button.addClass("event-added")
        }
        else{
            button.text("Adotar cao🐕");
            button.removeClass("btn-danger");
            button.addClass("btn-primary");
            
        }
        //Verifica se não tem a class "event-added" pois tem o !.
        button.off("click").on("click", function () {
            if (isAdopted(cao.id)) {
                alert("Removeu dos adotados");
                removeFromAdopted(cao.id);
            } else {
                alert("Adicionado aos fav");
                saveToAdopted(cao);
            }
            // Atualiza o botão após adicionar ou remover
            updateAdoptedButton(button, cao);
        });
        }

        // Função para remover dos favoritos
function removeFromAdopted(id) {
    // Vai buscar o valor que está na local storage
    var adotados = JSON.parse(localStorage.getItem("adopted")) || [];
    // Filtra os favoritos, removendo o cão com o ID correspondente
    var updatedAdotados = adotados.filter((fav) => fav.id !== id);
    // Grava de volta na local storage
    localStorage.setItem("adopted", JSON.stringify(updatedAdotados));
}              
});
