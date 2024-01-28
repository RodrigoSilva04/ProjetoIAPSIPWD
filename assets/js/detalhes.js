$(document).ready(function() {
    // Extrair o dogID do URL
    var urlParams = new URLSearchParams(window.location.search);
    var dogId = urlParams.get('id');

    // Faz um pedido ha API
    var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJvR3dXeU9hY29ZWkUzYXdEUDhCU2FTQWZMU1VlbFNCS1dNb0ZrU2R4R3piV2R4ZnlvdCIsImp0aSI6IjI5NTFmYWViYjVjOTM4MDE5MDI0NDcwNjAxM2FlOTZiYTU2MWZhNTlkZjQ0Mjc5ZDA5YmY0MDBkY2I3NjMzMzdlZDI4ZDRjZTA5N2FmMjgwIiwiaWF0IjoxNzA1ODg4NjE3LCJuYmYiOjE3MDU4ODg2MTcsImV4cCI6MTcwNTg5MjIxNywic3ViIjoiIiwic2NvcGVzIjpbXX0.bX9h9bTD3KtzQbY6cwAOE9cUxiQ0zLPsvFOhYVjlv70josKyBOjE4t1BonkNR9L2skH6hQ722OtQAh8rBfNCQ9_G-g2fLjyHUnSWM-q3qrBKckr48StBkmoW-BRkINWJlGjlcBCeW2jDoM-0zBJCaklENzLI_rLZMcR79afAsITYreZ6XKbp3OJ6AQ7hqTzA29G5VArL22-SoEDbpwLGgI-BFdCp1qCBrqiE94T1uFtAgKuIQSnhAmivGfLSoZZ5jeGcRcjU-X_UNFif_xz3-gBFjxQ3XzjkSWqJNm3RjgAPP73hFWmlCHp-nXMPaBgBGk5D28u_fRQELXbDpWCLbA"; // Replace with your Petfinder API token
    var apiUrl = "https://api.petfinder.com/v2/animals/" + dogId;

    $.ajax({
        method: "GET",
        url: apiUrl,
        headers: {
            "Authorization": "Bearer " + token
        },
    })
    .done(function(data) {
        // Debug
        console.log(data.animal);

        // Atualiza o texto para os resultados da API
        $(".nome-cao").text(data.animal.name);
        $(".tipo-cao").text(data.animal.breeds);
        $(".genero-cao").text(data.animal.gender);
        $(".tamanho-cao").text(data.animal.size);
        $(".idade-cao").text(data.animal.age);
        $(".pelo-cao").text(data.animal.coat);
        $(".historia-cao").text(data.animal.description);
    })
    .fail(function(error) {
        console.error("Error fetching dog details: ", error);
    });
});
