window.onload = getRaces();

// Obtener todas las Carreras
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
                //$('<strong> Name: </strong> ' + data[i].Name + '<br>').appendTo(
                  //  $('#list'));
                $('<strong> Level: </strong> ' + data[i].Level + '<br>').appendTo(
                    $('#list'));
                $('<strong> Distance: </strong> ' + data[i].Distance + '<br>').appendTo(
                    $('#list'));
                $('<strong> Date: </strong> ' + data[i].Date + '<br>').appendTo(
                    $('#list'));
                $('<strong> Type: </strong> ' + data[i].Type + '<br>').appendTo(
                    $('#list'));

                //$('<strong> Name: </strong> ' + data[i].Name + '<br>').appendTo($('#list'));
                $('<br> <br>').appendTo($('#list'));
            }
        },
        error: function () {
            window.alert("FAIL");
        }
    });
}

// --------------------------------------------------------------------------------------------------
// UPDATE



$("#putRaceBtn").click(function () {
    if($('#Name').val() == ""){
        window.alert("Debes proporcionar un nombre");
    }else if ($('#Level').val()== "" ){
        window.alert("Debes proporcionar un Nivel: Begginer, Initiated, Professional");
    }
    else if ($('#Distance').val()== "" || isNaN($('#Distance').val())){
        window.alert("Debes proporcionar una distancia y que sea un numero");
    }
    else if ($('#Date').val()== ""){
        window.alert("Debes proporcionar una Fecha en el formato 2015-12-05T23:00:00.000Z");
    }else if ($('#Type').val()== ""){
        window.alert("Debes proporcionar una modalidad de Carrera");
    }else{
    putRace();}
});

// Actualizar Carrera
function putRace() {
    var name = $("#Name").val();

    if (name != "") {

        var Level = $("#Level").val();
        var Distance = $("#Distance").val();
        var Date = $("#Date").val();
        var Type = $("#Type").val();

        var race = new Object();
        if(name != "")
        race.Name= name;
        if (Level != "")
            race.Level = Level;
        if (Distance != "")
            race.Distance = Distance;
        if (Date != "")
            race.Date = Date;
        if (Type != "")
        race.Type = Type;


        var data = JSON.stringify(race);

        var url = "http://localhost:5000/race/" + name;
        console.log(url);

        $.ajax({
            url: url,
            type: 'PUT',
            crossDomain: true,
            contentType: 'application/json',
            data: data,
            success: function (data) {
                window.location.reload();
            },
            error: function () {
                window.alert("FAIL");
            }
        });
    } else {
        window.alert("Debes poner el Nombre de la Carrera que quieres modificar");
    }
}