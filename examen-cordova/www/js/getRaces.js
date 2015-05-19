window.onload = getRaces();

// Obtener todas los Carreras
function getRaces() {
    $.ajax({
        url: "http://localhost:5000/race",
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            for (i = 0; i < data.length; i++) {
                $('<h2>' + data[i].Name + '</h2>')
                    .appendTo($('#list'));
                $('<strong> Level: </strong> ' + data[i].Level + '<br>').appendTo(
                    $('#list'));
                $('<strong> Date: </strong> ' + data[i].Date + '<br>').appendTo(
                    $('#list'));
                $('<strong> Distance: </strong> ' + data[i].Distance + '<br>').appendTo(
                    $('#list'));
                $('<strong> Type: </strong> ' + data[i].Type + '<br>').appendTo(
                    $('#list'));

                $('<br> <br>').appendTo($('#list'));
                $('<paper-button id=' + data[i]._id + ' class="coloredDelete" raised="true" role="button" onclick="deleteRace(id)">DELETE</paper-button> <hr>').appendTo($('#list'));
            }
        },
        error: function () {
            window.alert("FAIL");
        }
    });
}

function deleteRace(id) {
    var url = "http://localhost:5000/race/" + id;
    $.ajax({
        url: url,
        type: 'DELETE',
        crossDomain: true,
        success: function (data) {
            $('#list').html("");
            getRaces();
        },
        error: function (err) {
            window.alert("FAIL");
        }
    });
}