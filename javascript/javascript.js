//Acceso a la tabla
let tableEl = document.getElementById("table");

//Variable global que almacena la data de la API
let jugadores = [];

//Variable global
let filaActual = 0;

//Acceso a las claves de los jugadores. Claves es un arreglo con las propiedades.
let obtenerClaves = (arreglo) => {
    return Object.keys(arreglo[0]);
}

//     -----------------

//------------------ <<<<<<<FUNCIONES PARA CREAR TABLA>>>>>>> ------------------

//----------<< CREAR HEADER >>----------
let createHeader = (claves) => {
    let tHeadEl = document.createElement('thead');
    let trEl = document.createElement('tr');

    for (let i = 0; i < claves.length; i++) {
        
        let thEl = document.createElement('th');
        thEl.innerHTML = claves[i];
        trEl.appendChild(thEl);

        thEl.setAttribute('scope', 'col');
    };

    tHeadEl.appendChild(trEl);
    tableEl.appendChild(tHeadEl);
}

//----------<< CREAR FILA >>----------
//Va a recibir un jugador {} 
//1 jugador = 1 objeto
let createRow = (jugador, numeroFila) => {
    let trEl = document.createElement('tr');
    for (clave in jugador) {
        let tdEl = document.createElement('td');
        tdEl.innerHTML = jugador[clave];
        trEl.appendChild(tdEl);
    }
    trEl.appendChild(createButtonEliminar(numeroFila));
    trEl.appendChild(createButtonEditar(numeroFila));

    return trEl;
};

//----------<< CREAR BODY >>----------
//Va a recibir un arreglo con los jugadores
//elementos = [{elemento}. {elemento}, {elemento}, {elemento}]   --> jugadores
let createBody = (jugadores) => {
    let tbodyEl = document.createElement('tbody');
    for (let i = 0; i < jugadores.length; i++) {
        tbodyEl.appendChild(createRow(jugadores[i], i));
    };
    tableEl.appendChild(tbodyEl);
    tbodyEl.appendChild(createButtonAgregar());

};



//------------------ <<<<<<< FUNCIONES PARA CREAR BOTONES DE LA TABLA >>>>>>> ------------------

//----------<< CREAR BOTON ELIMINAR >>----------
let createButtonEliminar = (numeroFila) => {

    let buttonEliminarEl = document.createElement('button');
    buttonEliminarEl.innerText = 'Eliminar';
    buttonEliminarEl.classList.add('btn,btn-primary,btn-lg');
    buttonEliminarEl.setAttribute('data-toggle', 'modal');
    buttonEliminarEl.setAttribute('data-target', '#miModalEliminar');

    buttonEliminarEl.onclick = () => {
        filaActual = numeroFila;
    }

    let tdEl = document.createElement('td');
    tdEl.appendChild(buttonEliminarEl);
    return tdEl;
};


//----------<< CREAR BOTON EDITAR >>----------
let createButtonEditar = (numeroFila) => {


    let buttonEditarEl = document.createElement('button');
    buttonEditarEl.innerText = 'Editar';
    buttonEditarEl.classList.add('btn,btn-primary,btn-lg');
    buttonEditarEl.setAttribute('data-toggle', 'modal');
    buttonEditarEl.setAttribute('data-target', '#miModalEditar');
    buttonEditarEl.setAttribute('id', 'btn-editar');

    buttonEditarEl.onclick = () => {
        filaActual = numeroFila;

        let apellido = document.getElementById('editarApellido');
        let ranking = document.getElementById('editarRanking');
        let puntaje = document.getElementById('editarPuntaje');
        let puesto = document.getElementById('editarPuesto');


        apellido.setAttribute('placeholder', jugadores[filaActual].Apellido);
        ranking.setAttribute('placeholder', jugadores[filaActual].Ranking);
        puntaje.setAttribute('placeholder', jugadores[filaActual].Puntos);
        puesto.setAttribute('placeholder', jugadores[filaActual].Puesto);
    }

    let tdEl = document.createElement('td');
    tdEl.appendChild(buttonEditarEl);
    return tdEl;
};



//----------<< CREAR BOTON AGREGAR >>----------
let createButtonAgregar = () => {

    let buttonAgregarEl = document.createElement('button');
    buttonAgregarEl.innerText = 'Agregar';
    buttonAgregarEl.classList.add('btn,btn-primary,btn-lg');
    buttonAgregarEl.setAttribute('data-toggle', 'modal');
    buttonAgregarEl.setAttribute('data-target', '#miModalAgregar');

    let tdEl = document.createElement('td');
    tdEl.appendChild(buttonAgregarEl);
    return tdEl;
};






//------------------ <<<<<<< FUNCIONES DE BOTONES >>>>>>> ------------------

//----------<< BORRAR TABLA >>----------
let borrarTabla = () => {
    tableEl.innerHTML = " ";
}

//----------<< VACIAR INPUT DEL BOTON AGREGAR >>----------
let vaciarInputAgregar = () => {
    document.getElementById('apellido').value = "";
    document.getElementById('puestoRanking').value = "";
    document.getElementById('puntaje').value = "";
    document.getElementById('puestoTorneo').value = "";
}

//----------<< VACIAR INPUT DEL BOTON EDITAR >>----------
let vaciarInputEditar = () => {
    document.getElementById('editarApellido').value = " ";
    document.getElementById('editarRanking').value = " ";
    document.getElementById('editarPuntaje').value = " ";
    document.getElementById('editarPuesto').value = " ";
}

//----------<< MOSTRAR/OCULTAR PROGRESS BAR EDITAR>>----------
let mostrarProgressBar = () => {
    let progressBarEl = document.getElementById('progress-agregar-id');
    progressBarEl.classList.remove('progress-hidden');
}

let ocultarProgressBar = () => {
    let progressBarEl = document.getElementById('progress-agregar-id');
    progressBarEl.classList.add('progress-hidden');
}


//----------<< MOSTRAR/OCULTAR PROGRESS BAR AGREGAR>>----------
let mostrarProgressBarAgregar = () => {
    let progressBarEl = document.getElementById('progress-editar-id');
    progressBarEl.classList.remove('progress-hidden');
}

let ocultarProgressBarAgregar = () => {
    let progressBarEl = document.getElementById('progress-editar-id');
    progressBarEl.classList.add('progress-hidden');
}


//----------<< FILTRAR >>----------

//-----Filtrar por ranking (devuelve los que estan en el puesto 3 a 1)-----
let filtrarTop3Ranking = () => {
    borrarTabla();

    const result = jugadores.filter(jugador => jugador.Ranking <= 3);
    console.log(result);

    createHeader(obtenerClaves(result));
    createBody(result);
}

//-----Filtrar por puntos del torneo (devuelve los puntajes mayores o iguales a 70)-----
let filtrarPuntajeMayorA70 = () => {
    borrarTabla();

    const result = jugadores.filter(jugador => jugador.Puntos >= 70);
    console.log(result);

    createHeader(obtenerClaves(result));
    createBody(result);
}

//-----Filtrar por puntos del torneo (devuelve los puntajes menores a 70)-----
let filtrarPuntajeMenorA70 = () => {
    borrarTabla();
    const result = jugadores.filter(jugador => jugador.Puntos <= 70);
    console.log(result);

    createHeader(obtenerClaves(result));
    createBody(result);
}

//-----Select - dropdown-----
let btnFiltrarEl = document.getElementById('btn-filtrar');

btnFiltrarEl.onclick = () => {
    let selectEl = document.getElementById('select-js');

    switch (selectEl.value) {

        case "1":
            filtrarPuntajeMayorA70();
            break;

        case "2":
            filtrarPuntajeMenorA70();
            break;

        case "3":
            filtrarTop3Ranking();
            break;
        default:
            console.log('Error en los filtros');
            break;
    }
}



//----------<< ELIMINAR >>----------

//-----Funcion eliminar fila-----
let eliminarJugador = (eliminado) => {
    borrarTabla();

    let eliminados = jugadores.splice(filaActual, 1);

    createHeader(obtenerClaves(jugadores));
    createBody(jugadores);

}

//-----Botones-----
//-----Boton aceptar del modaL-----
let btnEliminarAceptarEl = document.getElementById('btn-eliminar-aceptar');
btnEliminarAceptarEl.onclick = () => {
    eliminarJugador(jugadores[filaActual]);
}


//-----Boton cancelar del modal-----
let btnEliminarCancelarEl = document.getElementById('btn-eliminar-cancelar');
btnEliminarCancelarEl.onclick = () => {
    console.log('No se elimino ningun elemento');
}




//----------<< AGREGAR >>----------

//-----Funcion agregar fila-----
let agregarFila = () => {

    borrarTabla();

    let apellido = document.getElementById('apellido').value;
    let ranking = document.getElementById('puestoRanking').value;
    let puntaje = document.getElementById('puntaje').value;
    let puesto = document.getElementById('puestoTorneo').value;

    let jugadorNuevo = {
        'Apellido': apellido || "Sin datos",
        'Puesto': ranking || "Sin datos",
        'Puntos': puntaje || "Sin datos",
        'Ranking': puesto || "Sin datos"
    };

    jugadores.push(jugadorNuevo);

    createHeader(obtenerClaves(jugadores));
    createBody(jugadores);

    console.log(jugadores);
    
    vaciarInputAgregar();

};



//-----Botones-----
//-----Boton aceptar del modaL-----
let btnAgregarAceptarEl = document.getElementById('btn-agregar-aceptar');
btnAgregarAceptarEl.onclick = () => {
    mostrarProgressBarAgregar();

    setTimeout(ocultarProgressBar, 1000);
    
    setTimeout(agregarFila, 2000);

}

//-----Boton cancelar del modal-----
let btnAgregarCancelarEl = document.getElementById('btn-agregar-cancelar');
btnAgregarCancelarEl.onclick = () => {
    vaciarInputAgregar();
}






//----------<< EDITAR >>----------

//-----Funcion editar fila-----
let editarFila = (numeroFila) => {
    borrarTabla();

    let apellido = document.getElementById('editarApellido').value;
    let ranking = document.getElementById('editarRanking').value;
    let puntaje = document.getElementById('editarPuntaje').value;
    let puesto = document.getElementById('editarPuesto').value;


    let jugadorNew = {
        'Apellido': apellido,
        'Ranking': ranking,
        'Puntaje': puntaje,
        'Puesto': puesto
    }

    //Splice
    jugadores.splice(numeroFila, 1, jugadorNew);

    console.log(jugadorNew);

    //Progress bar y setTimeOut de 2 seg
    createHeader(obtenerClaves(jugadores));
    createBody(jugadores);

    console.log(jugadores);


    vaciarInputEditar();

};

//-----Botones-----
//-----Boton aceptar del modal "Editar fila"-----
let btnEditarAceptarEl = document.getElementById('btn-editar-aceptar');

btnEditarAceptarEl.onclick = () => {

    mostrarProgressBar();

    setTimeout(ocultarProgressBar, 1000);
    
    setTimeout(() => {
         editarFila(filaActual);
    }, 2000);

}

//-----Boton cancelar del modal "Editar fila"-----
let btnEditarCancelarEl = document.getElementById('btn-editar-cancelar');
btnEditarCancelarEl.onclick = () => {

    vaciarInputEditar();

}


//           ------------------ <<<<<<< PEDIDO A LA API >>>>>>> ------------------
const url = "https://5fc92fcf2af77700165ae4c9.mockapi.io/jugadores/TablaJugadores";
fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        jugadores = data; //Guardo la data recibida en la variable global llamada Jugadores, que es un arreglo.
        createHeader(obtenerClaves(jugadores)); //En vez de poner ClavesJugadores, llamo a la funcion que me retorna eso.
        createBody(jugadores);



    });
