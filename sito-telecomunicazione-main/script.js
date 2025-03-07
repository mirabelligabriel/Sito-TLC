function mostra() {
    let card = document.getElementById("cardNascosta");
    let bottone = document.getElementById("bottone");
    if (card.classList.contains("d-none")) {
        card.classList.remove("d-none");
        bottone.innerHTML = "Nascondi";
    } else {
        card.classList.add("d-none");
        bottone.innerHTML = "Mostra Calcolatore Intensità";
    }
}

function mostra1() {
    let card = document.getElementById("cardNascosta1");
    let bottone = document.getElementById("bottone1");
    if (card.classList.contains("d-none")) {
        card.classList.remove("d-none");
        bottone.innerHTML = "Nascondi";
    } else {
        card.classList.add("d-none");
        bottone.innerHTML = "Mostra Calcolatore Tensione";
    }
}

function mostra2() {
    let card = document.getElementById("cardNascosta2");
    let bottone = document.getElementById("bottone2");
    if (card.classList.contains("d-none")) {
        card.classList.remove("d-none");
        bottone.innerHTML = "Nascondi";
    } else {
        card.classList.add("d-none");
        bottone.innerHTML = "Mostra Calcolatore Resistenza";
    }
}

function mostra3() {
    let card = document.getElementById("cardNascosta3");
    let bottone = document.getElementById("bottone3");
    if (card.classList.contains("d-none")) {
        card.classList.remove("d-none");
        bottone.innerHTML = "Nascondi";
    } else {
        card.classList.add("d-none");
        bottone.innerHTML = "Mostra Calcolatore Kirchhoff";
    }
}

function mostra4() {
    let card = document.getElementById("cardNascosta4");
    let bottone4 = document.getElementById("bottone4");
    if (card.classList.contains("d-none")) {
        card.classList.remove("d-none");
        bottone4.innerHTML = "Nascondi";
    } else {
        card.classList.add("d-none");
        bottone4.innerHTML = "Mostra Calcolatore Sovrapposizione degli Effetti";
    }
}

function mostra5() {
    let card = document.getElementById("cardNascosta5");
    let bottone5 = document.getElementById("bottone5");
    if (card.classList.contains("d-none")) {
        card.classList.remove("d-none");
        bottone5.innerHTML = "Nascondi";
    } else {
        card.classList.add("d-none");
        bottone5.innerHTML = "Mostra Calcolatore Mappe di Karnaugh";
    }
}

function calcolaTensione() {
    const resistenza = parseFloat(document.getElementById("resistenzaB").value);
    const intensita = parseFloat(document.getElementById("intensitaB").value);

    if (isNaN(resistenza) || isNaN(intensita)) {
        alert("Inserisci dei valori validi.");
        return;
    }

    const tensione = resistenza * intensita;
    document.getElementById("risultatoB").innerText = "La tensione è: " + tensione.toFixed(2) + " V";
}

function calcolaIntensita() {
    const tensione = parseFloat(document.getElementById("tensioneA").value);
    const resistenza = parseFloat(document.getElementById("resistenzaA").value);

    if (isNaN(tensione) || isNaN(resistenza)) {
        alert("Inserisci dei valori validi.");
        return;
    }

    const intensita = tensione / resistenza;
    document.getElementById("risultatoA").innerText = "L'intensità è: " + intensita.toFixed(2) + " A";
}

function calcolaResistenza() {
    const tensione = parseFloat(document.getElementById("tensioneC").value);
    const intensita = parseFloat(document.getElementById("intensitaC").value);

    if (isNaN(tensione) || isNaN(intensita)) {
        alert("Inserisci dei valori validi.");
        return;
    }

    const resistenza = tensione / intensita;
    document.getElementById("risultatoC").innerText = "La resistenza è: " + resistenza.toFixed(2) + " Ohm";
}

function generaResistenze() {
    const numResistenze = document.getElementById("numeroResistenze").value;
    const resistenzeForm = document.getElementById("resistenzeForm");
    resistenzeForm.innerHTML = "";

    for (let i = 1; i <= numResistenze; i++) {
        const div = document.createElement("div");
        div.classList.add("mb-3");
        const label = document.createElement("label");
        label.classList.add("form-label");
        label.setAttribute("for", `resistenza${i}`);
        label.innerText = `Resistenza R${i} (Ohm):`;
        const input = document.createElement("input");
        input.classList.add("form-control");
        input.setAttribute("type", "number");
        input.setAttribute("id", `resistenza${i}`);
        input.setAttribute("placeholder", `Inserisci la resistenza R${i} (Ohm)`);
        input.required = true;
        div.appendChild(label);
        div.appendChild(input);
        resistenzeForm.appendChild(div);
    }
}

function calcolaTensioniSerie(resistenze, intensita) {
    return resistenze.map(R => (R * intensita).toFixed(2));
}

function calcolaTensioniParallelo(resistenze, intensita) {
    return resistenze.map(R => (intensita / R).toFixed(2));
}

function calcolaKirchhoff() {
    let numResistenze = document.getElementById('numeroResistenze').value;
    let resistenze = [];
    let configurazione = document.getElementById('configurazione').value;
    for (let i = 1; i <= numResistenze; i++) {
        let R = parseFloat(document.getElementById(`resistenza${i}`).value);
        if (!isNaN(R)) {
            resistenze.push(R);
        }
    }
    let intensita = parseFloat(document.getElementById('intensitaD').value);
    let risultato;
    if (configurazione === 'serie') {
        risultato = resistenze.reduce((acc, R) => acc + R, 0).toFixed(2);
        document.getElementById('risultatoD').innerHTML = "La resistenza equivalente in serie è: " + risultato + " Ohm";
        if (!isNaN(intensita)) {
            let tensioni = calcolaTensioniSerie(resistenze, intensita);
            document.getElementById('risultatoD').innerHTML += "<br>Le tensioni ai capi delle resistenze sono: " + tensioni.join(" V , ") + " V";
        }
    } else if (configurazione === 'parallelo') {
        let invResistenze = resistenze.reduce((acc, R) => acc + (1 / R), 0);
        risultato = (1 / invResistenze).toFixed(2);
        document.getElementById('risultatoD').innerHTML = "La resistenza equivalente in parallelo è: " + risultato + " Ohm";
        if (!isNaN(intensita)) {
            let tensioni = calcolaTensioniParallelo(resistenze, intensita);
            document.getElementById('risultatoD').innerHTML += "<br>Le tensioni ai capi delle resistenze sono: " + tensioni.join(" V , ") + " V";
        }
    }
}

function calcolaSovrapposizione() {
    const R1 = parseFloat(document.getElementById("resistenza1").value);
    const R2 = parseFloat(document.getElementById("resistenza2").value);
    const R3 = parseFloat(document.getElementById("resistenza3").value);
    const E1 = parseFloat(document.getElementById("tensioneE1").value);
    const E2 = parseFloat(document.getElementById("tensioneE2").value);

    if (isNaN(R1) || isNaN(R2) || isNaN(R3) || isNaN(E1) || isNaN(E2)) {
        alert("Inserisci dei valori validi.");
        return;
    }

    // Contributo di E1 (spegnendo E2)
    const I1 = E1 / (R1 + (R2 * R3) / (R2 + R3)); // Corrente dal ramo con E1
    const V1 = I1 * (R2 * R3) / (R2 + R3);        // Tensione su R2 (V_out con E1 attivo)

    // Contributo di E2 (spegnendo E1)
    const I2 = E2 / (R3 + (R1 * R2) / (R1 + R2)); // Corrente dal ramo con E2
    const V2 = I2 * (R1 * R2) / (R1 + R2);        // Tensione su R2 (V_out con E2 attivo)

    // Risultato totale
    const Vout = V1 + V2; // La polarità dipende dalla direzione della corrente

    document.getElementById("risultatoE").innerText = "La tensione ai capi di R2 è: " + Vout.toFixed(2) + " V";
}

function generaTabella() {
    const numVariabili = document.getElementById('numVariabili').value;
    let tableHTML = '';

    if (numVariabili == 2) {
        tableHTML = `
            <table class="table table-bordered text-center">
                <tr>
                    <th></th>
                    <th>0</th>
                    <th>1</th>
                </tr>
                <tr>
                    <th>0</th>
                    <td class="karnaugh-cell inactive" onclick="toggleCell(this)">0</td>
                    <td class="karnaugh-cell inactive" onclick="toggleCell(this)">0</td>
                </tr>
                <tr>
                    <th>1</th>
                    <td class="karnaugh-cell inactive" onclick="toggleCell(this)">0</td>
                    <td class="karnaugh-cell inactive" onclick="toggleCell(this)">0</td>
                </tr>
            </table>
        `;
    } else if (numVariabili == 3) {
        tableHTML = `
            <table class="table table-bordered text-center">
                <tr>
                    <th></th>
                    <th>00</th>
                    <th>01</th>
                    <th>11</th>
                    <th>10</th>
                </tr>
                <tr>
                    <th>0</th>
                    <td class="karnaugh-cell inactive" onclick="toggleCell(this)">0</td>
                    <td class="karnaugh-cell inactive" onclick="toggleCell(this)">0</td>
                    <td class="karnaugh-cell inactive" onclick="toggleCell(this)">0</td>
                    <td class="karnaugh-cell inactive" onclick="toggleCell(this)">0</td>
                </tr>
                <tr>
                    <th>1</th>
                    <td class="karnaugh-cell inactive" onclick="toggleCell(this)">0</td>
                    <td class="karnaugh-cell inactive" onclick="toggleCell(this)">0</td>
                    <td class="karnaugh-cell inactive" onclick="toggleCell(this)">0</td>
                    <td class="karnaugh-cell inactive" onclick="toggleCell(this)">0</td>
                </tr>
            </table>
        `;
    } else if (numVariabili == 4) {
        tableHTML = `
            <table class="table table-bordered text-center">
                <tr>
                    <th></th>
                    <th>00</th>
                    <th>01</th>
                    <th>11</th>
                    <th>10</th>
                </tr>
                <tr>
                    <th>00</th>
                    <td class="karnaugh-cell inactive" onclick="toggleCell(this)">0</td>
                    <td class="karnaugh-cell inactive" onclick="toggleCell(this)">0</td>
                    <td class="karnaugh-cell inactive" onclick="toggleCell(this)">0</td>
                    <td class="karnaugh-cell inactive" onclick="toggleCell(this)">0</td>
                </tr>
                <tr>
                    <th>01</th>
                    <td class="karnaugh-cell inactive" onclick="toggleCell(this)">0</td>
                    <td class="karnaugh-cell inactive" onclick="toggleCell(this)">0</td>
                    <td class="karnaugh-cell inactive" onclick="toggleCell(this)">0</td>
                    <td class="karnaugh-cell inactive" onclick="toggleCell(this)">0</td>
                </tr>
                <tr>
                    <th>11</th>
                    <td class="karnaugh-cell inactive" onclick="toggleCell(this)">0</td>
                    <td class="karnaugh-cell inactive" onclick="toggleCell(this)">0</td>
                    <td class="karnaugh-cell inactive" onclick="toggleCell(this)">0</td>
                    <td class="karnaugh-cell inactive" onclick="toggleCell(this)">0</td>
                </tr>
                <tr>
                    <th>10</th>
                    <td class="karnaugh-cell inactive" onclick="toggleCell(this)">0</td>
                    <td class="karnaugh-cell inactive" onclick="toggleCell(this)">0</td>
                    <td class="karnaugh-cell inactive" onclick="toggleCell(this)">0</td>
                    <td class="karnaugh-cell inactive" onclick="toggleCell(this)">0</td>
                </tr>
            </table>
        `;
    }

    document.getElementById('karnaughTable').innerHTML = tableHTML;
}

function toggleCell(cell) {
    if (cell.innerHTML == '0') {
        cell.innerHTML = '1';
        cell.classList.remove('inactive');
        cell.classList.add('active');
    } else {
        cell.innerHTML = '0';
        cell.classList.remove('active');
        cell.classList.add('inactive');
    }
}

function calcolaMappaKarnaugh() {
    const numVariabili = document.getElementById('numVariabili').value;
    const table = document.querySelector('#karnaughTable table');
    let valoriMappa = [];

    for (let i = 1; i < table.rows.length; i++) {
        for (let j = 1; j < table.rows[i].cells.length; j++) {
            valoriMappa.push(parseInt(table.rows[i].cells[j].innerHTML));
        }
    }

    let risultato = '';

    if (numVariabili == 2) {
        risultato = calcolaEspressioneBooleana2(valoriMappa);
    } else if (numVariabili == 3) {
        risultato = calcolaEspressioneBooleana3(valoriMappa);
    } else if (numVariabili == 4) {
        risultato = calcolaEspressioneBooleana4(valoriMappa);
    }

    document.getElementById('risultatoKarnaugh').innerText = risultato;
}

function calcolaEspressioneBooleana2(valoriMappa) {
    let espressione = '';

    if (valoriMappa[0] == 1) espressione += "A'B' + ";
    if (valoriMappa[1] == 1) espressione += "A'B + ";
    if (valoriMappa[2] == 1) espressione += "AB' + ";
    if (valoriMappa[3] == 1) espressione += "AB + ";

    // Semplificazione
    if (valoriMappa[0] == 1 && valoriMappa[1] == 1) espressione = "A' + ";
    if (valoriMappa[2] == 1 && valoriMappa[3] == 1) espressione = "A + ";
    if (valoriMappa[0] == 1 && valoriMappa[2] == 1) espressione = "B' + ";
    if (valoriMappa[1] == 1 && valoriMappa[3] == 1) espressione = "B + ";

    return espressione.slice(0, -3); // Rimuove l'ultimo " + "
}

function calcolaEspressioneBooleana3(valoriMappa) {
    let espressione = '';

    if (valoriMappa[0] == 1) espressione += "A'B'C' + ";
    if (valoriMappa[1] == 1) espressione += "A'B'C + ";
    if (valoriMappa[2] == 1) espressione += "A'BC + ";
    if (valoriMappa[3] == 1) espressione += "A'BC' + ";
    if (valoriMappa[4] == 1) espressione += "AB'C' + ";
    if (valoriMappa[5] == 1) espressione += "AB'C + ";
    if (valoriMappa[6] == 1) espressione += "ABC + ";
    if (valoriMappa[7] == 1) espressione += "ABC' + ";

    // Semplificazione
    // (Aggiungere logica di semplificazione per 3 variabili)

    return espressione.slice(0, -3); // Rimuove l'ultimo " + "
}

function calcolaEspressioneBooleana4(valoriMappa) {
    let espressione = '';

    if (valoriMappa[0] == 1) espressione += "A'B'C'D' + ";
    if (valoriMappa[1] == 1) espressione += "A'B'C'D + ";
    if (valoriMappa[2] == 1) espressione += "A'B'CD + ";
    if (valoriMappa[3] == 1) espressione += "A'B'CD' + ";
    if (valoriMappa[4] == 1) espressione += "A'BC'D' + ";
    if (valoriMappa[5] == 1) espressione += "A'BC'D + ";
    if (valoriMappa[6] == 1) espressione += "A'BCD + ";
    if (valoriMappa[7] == 1) espressione += "A'BCD' + ";
    if (valoriMappa[8] == 1) espressione += "AB'C'D' + ";
    if (valoriMappa[9] == 1) espressione += "AB'C'D + ";
    if (valoriMappa[10] == 1) espressione += "AB'CD + ";
    if (valoriMappa[11] == 1) espressione += "AB'CD' + ";
    if (valoriMappa[12] == 1) espressione += "ABC'D' + ";
    if (valoriMappa[13] == 1) espressione += "ABC'D + ";
    if (valoriMappa[14] == 1) espressione += "ABCD + ";
    if (valoriMappa[15] == 1) espressione += "ABCD' + ";

    // Semplificazione
    // (Aggiungere logica di semplificazione per 4 variabili)

    return espressione.slice(0, -3); // Rimuove l'ultimo " + "
}