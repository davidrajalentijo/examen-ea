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

$("#postShoeBtn").click(function () {
    postShoe();
});

// Post zapato
function postShoe() {
    if (colorTags.length > 0) {
        var shoename = $("#shoename").val();
        var brand = $("#brand").val();
        var size = $("#size").val();

        var shoe = new Object();
        shoe.shoename = shoename;
        shoe.brand = brand;
        shoe.size = size;
        shoe.color = colorTags;
        var data = JSON.stringify(shoe);
        console.log(data);
        $.ajax({
            url: "http://localhost:3000/shoes",
            type: 'POST',
            crossDomain: true,
            dataType: 'json',
            contentType: 'application/json',
            data: data,
            success: function (data) {
                window.alert("Zapato creado");
            },
            error: function () {
                window.alert("FAIL: No se han cargado los eventos");
            }
        });
    }
    else {
        window.alert("Debes seleccionar algún color");
    }
}