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
                $('<strong> ID: </strong> ' + data[i]._id + '<br>').appendTo($('#list'));
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

var colorTags = ["Red", "Green", "Blue"];

document.querySelector("#redBtn").addEventListener('change', function () {
    if (this.checked) {
        var index = colorTags.indexOf("Red");
        if (index > -1) {
        } else {
            colorTags.push("Red");
        }
    } else {
        var index = colorTags.indexOf("Red");
        if (index > -1) {
            colorTags.splice(index, 1);
        }
    }
});

document.querySelector("#greenBtn").addEventListener('change', function () {
    if (this.checked) {
        var index = colorTags.indexOf("Green");
        if (index > -1) {
        } else {
            colorTags.push("Green");
        }
    } else {
        var index = colorTags.indexOf("Green");
        if (index > -1) {
            colorTags.splice(index, 1);
        }
    }
});

document.querySelector("#blueBtn").addEventListener('change', function () {
    if (this.checked) {
        var index = colorTags.indexOf("Blue");
        if (index > -1) {
        } else {
            colorTags.push("Blue");
        }
    } else {
        var index = colorTags.indexOf("Blue");
        if (index > -1) {
            colorTags.splice(index, 1);
        }
    }
});

$("#putShoeBtn").click(function () {
    putShoe();
});

// Put zapato
function putShoe() {
    var shoeID = $("#id").val();

    if (shoeID != "") {
        var shoename = $("#shoename").val();
        var brand = $("#brand").val();
        var size = $("#size").val();

        var shoe = new Object();
        if (shoename != "")
            shoe.shoename = shoename;
        if (brand != "")
            shoe.brand = brand;
        if (size != "")
            shoe.size = size;
        if (colorTags.length > 0)
            shoe.color = colorTags;

        var data = JSON.stringify(shoe);

        var url = "http://localhost:3000/shoe/" + shoeID;

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
        window.alert("Debes poner un ID");
    }
}