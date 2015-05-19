$("#getShoesByNameBtn").click(function () {
    getShoes();
});

// Obtener zapatos por nombre
function getShoes() {
    var shoename = $("#shoename").val();
    var url = "http://localhost:3000/shoe/shoename/" + shoename;
    $.ajax({
        url: url,
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            $('#listName').html("");
            $('<h2>' + data.shoename + '</h2>')
                .appendTo($('#listName'));
            $('<strong> Marca: </strong> ' + data.brand + '<br>').appendTo(
                $('#listName'));
            $('<strong> Talla: </strong> ' + data.size + '<br>').appendTo(
                $('#listName'));
            $('<strong> Colores: </strong> ' + data.color + '<br>').appendTo($('#listName'));
            $('<br> <br>').appendTo($('#listName'));
        },
        error: function () {
            window.alert("FAIL");
        }
    });
}