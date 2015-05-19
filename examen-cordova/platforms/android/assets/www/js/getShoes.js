window.onload = getShoes();

// Obtener todos los zapatos
function getShoes() {
    $.ajax({
        url: "http://localhost:3000/shoes",
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            for (i = 0; i < data.length; i++) {
                $('<h2>' + data[i].shoename + '</h2>')
                    .appendTo($('#list'));
                $('<strong> Marca: </strong> ' + data[i].brand + '<br>').appendTo(
                    $('#list'));
                $('<strong> Talla: </strong> ' + data[i].size + '<br>').appendTo(
                    $('#list'));
                $('<strong> Colores: </strong> ' + data[i].color + '<br>').appendTo($('#list'));
                $('<br> <br>').appendTo($('#list'));
                $('<paper-button id=' + data[i]._id + ' class="coloredDelete" raised="true" role="button" onclick="deleteShoe(id)">DELETE</paper-button> <hr>').appendTo($('#list'));
            }
        },
        error: function () {
            window.alert("FAIL");
        }
    });
}

function deleteShoe(id) {
    var url = "http://localhost:3000/shoe/" + id;
    $.ajax({
        url: url,
        type: 'DELETE',
        crossDomain: true,
        success: function (data) {
            $('#list').html("");
            getShoes();
        },
        error: function (err) {
            window.alert("FAIL");
        }
    });
}