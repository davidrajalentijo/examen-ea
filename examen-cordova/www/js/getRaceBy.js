$("#getRaceByNameBtn").click(function () {
    if($('#name').val() == ""){
        window.alert("Debes proporcionar un nombre");
    }else{
    getRace();}
});

// Obtener zapatos por nombre
function getRace() {
    var name = $("#name").val();
    var url = "http://localhost:5000/race/" + name;
    $.ajax({
        url: url,
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            $('#listName').html("");
            $('<h2>' + data.Name + '</h2>')
                .appendTo($('#listName'));
            $('<strong> Level: </strong> ' + data.Level + '<br>').appendTo(
                $('#listName'));
            $('<strong> Type: </strong> ' + data.Type + '<br>').appendTo(
                $('#listName'));
            $('<strong> Date: </strong> ' + data.Date + '<br>').appendTo(
                $('#listName'));
            $('<strong> Distance: </strong> ' + data.Distance + '<br>').appendTo(
                $('#listName'));


            $('<br> <br>').appendTo($('#listName'));
        },
        error: function () {
            window.alert("La Carrera no existe");
            window.location.reload();
        }
    });
}