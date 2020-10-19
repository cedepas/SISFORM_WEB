


window.loadstart = function () {
    //modoNoche();
    var modo = localStorage.getItem("modoNoche");
    console.log('onload ' + modo)
}


function CrearTabla(rpta) {

    if (rpta) {
        var lObj = JSON.parse(rpta)
        for (var i = 0; i < lObj.length; i++) {
            delete lObj[i]['FK_ID_UsuarioCrea'];
            delete lObj[i]['FK_ID_PuestoTrabajo'];
            delete lObj[i]['FK_ID_Empresa'];
            delete lObj[i]['fechaIngreso'];
            delete lObj[i]['fechaFin'];
        }

        var cols = [];

        for (var i = 0; i < lObj.length; i++) {
            for (var k in lObj[i]) {
                if (cols.indexOf(k) === -1) {
                    cols.push(k);
                }
            }
        }

        var table = document.createElement("table");
        var tr = table.insertRow(-1);

        for (var i = 0; i < cols.length; i++) {
            var theader = document.createElement("th");
            theader.innerHTML = cols[i];
            tr.appendChild(theader);
        }

        for (var i = 0; i < lObj.length; i++) {
            trow = table.insertRow(-1);
            for (var j = 0; j < cols.length; j++) {
                var cell = trow.insertCell(-1);
                cell.innerHTML = lObj[i][cols[j]];
            }
        }

        //var divTable = document.getElementById('divTable');

        divTabla.innerHTML = "";
        table.classList.add("table");
        table.classList.add("table-inner-bordered");
        divTabla.appendChild(table);

    } else {
        toastDangerAlert("Usuario o contraseña incorrecto", "!Error¡");
    }
}


function modoNoche() {
    //localStorage.setItem("modoNoche", 'negro');
    var modo = localStorage.getItem("modoNoche");
    console.log('boton' + modo)
    if (modo == 'negro') {
        bodys.classList.add("dark-mode");
        localStorage.setItem("modoNoche", 'blanco');
    } else {
        bodys.classList.remove("dark-mode");
        localStorage.setItem("modoNoche", 'negro');
    }
}