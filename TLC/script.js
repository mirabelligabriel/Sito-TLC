function mostra()
{
    let card = document.getElementById("cardNascosta");
    let bottone = document.getElementById("bottone");
    if(card.classList.contains("d-none"))
    {
        card.classList.remove("d-none");
        bottone.innerHTML = "Nascondi";
    }
    else
    {
        card.classList.add("d-none");
        bottone.innerHTML = "Mostra Calcolatore Intensità";
    }
}

function mostra1()
{
    let card = document.getElementById("cardNascosta1");
    let bottone1 = document.getElementById("bottone1");
    if(card.classList.contains("d-none"))
    {
        card.classList.remove("d-none");
        bottone1.innerHTML = "Nascondi";
    }
    else
    {
        card.classList.add("d-none");
        bottone1.innerHTML = "Mostra Calcolatore Tensione";
    }
}

function mostra2()
{
    let card = document.getElementById("cardNascosta2");
    let bottone2 = document.getElementById("bottone2");
    if(card.classList.contains("d-none"))
    {
        card.classList.remove("d-none");
        bottone2.innerHTML = "Nascondi";
    }
    else
    {
        card.classList.add("d-none");
        bottone2.innerHTML = "Mostra Calcolatore Resistenza";
    }
}

function mostra3()
{
    let card = document.getElementById("cardNascosta3");
    let bottone2 = document.getElementById("bottone3");
    if(card.classList.contains("d-none"))
    {
        card.classList.remove("d-none");
        bottone2.innerHTML = "Nascondi";
    }
    else
    {
        card.classList.add("d-none");
        bottone2.innerHTML = "Mostra Calcolatore Kirchhoff";
    }
}

function calcolaTensione()
{
    const resistenza = parseFloat(document.getElementById("resistenzaB").value);
    const intensita = parseFloat(document.getElementById("intensitaB").value);
    
    const tensione = resistenza * intensita;
    document.getElementById("risultatoB").innerText = "tensione: " + tensione + " volt";

    if (resistenza === 0 || intensita === 0)
        {
            alert("Inserisci dei valori validi.");
            return;
        }
}

function calcolaIntensita()
{
    const resistenza = parseFloat(document.getElementById("resistenzaA").value)
    const tensione = parseFloat(document.getElementById("tensioneA").value)

    const intensita = tensione / resistenza;
    document.getElementById("risultatoA").innerText = "Intesita: " + intensita + " A";

    if (resistenza === 0 || tensione === 0)
        {
            alert("Inserisci dei valori validi.");
            return;
        }
}

function calcolaResistenza()
{
    const tensione = parseFloat(document.getElementById("tensioneC").value)
    const intesita = parseFloat(document.getElementById("intensitaC").value)

    const resistenza = tensione / intesita;
    document.getElementById("risultatoC").innerText = "Intesita: " + resistenza + " A";

    if (tensione === 0 || intesita === 0)
        {
            alert("Inserisci dei valori validi.");
            return;
        }
}

function generaResistenze() 
{
    let numResistenze = document.getElementById('numeroResistenze').value;
    let container = document.getElementById('resistenzeForm');
    container.innerHTML = "";
    for (let i = 1; i <= numResistenze; i++) 
    {
        let div = document.createElement('div');
        div.classList.add('mb-3');
        div.innerHTML = `
            <label for="resistenza${i}" class="form-label">Resistenza ${i} (R${i}):</label>
            <input type="number" class="form-control" id="resistenza${i}" placeholder="Inserisci la resistenza R${i}" required>
        `;
        container.appendChild(div);
    }
}

function calcolaTensioniSerie(resistenze, intensita) {
    return resistenze.map(R => (R * intensita).toFixed(2));
}

function calcolaTensioniParallelo(resistenze, intensita) {
    return resistenze.map(R => (intensita / R).toFixed(2));
}

function calcolaKirchhoff() 
{
    let numResistenze = document.getElementById('numeroResistenze').value;
    let resistenze = [];
    let configurazione = document.getElementById('configurazione').value;
    for (let i = 1; i <= numResistenze; i++) 
    {
        let R = parseFloat(document.getElementById(`resistenza${i}`).value);
        if (!isNaN(R)) {
            resistenze.push(R);
        }
    }
    let intensita = parseFloat(document.getElementById('intensitaD').value);
    let risultato;
    if (configurazione === 'serie') 
    {
        risultato = resistenze.reduce((acc, R) => acc + R, 0).toFixed(2);
        document.getElementById('risultatoD').innerHTML = "La resistenza equivalente in serie è: " + risultato + " Ohm";
        if (!isNaN(intensita)) {
            let tensioni = calcolaTensioniSerie(resistenze, intensita);
            document.getElementById('risultatoD').innerHTML += "<br>Le tensioni ai capi delle resistenze sono: " + tensioni.join(" V , ") + " V";
        }
    } else if (configurazione === 'parallelo') 
    {
        let invResistenze = resistenze.reduce((acc, R) => acc + (1 / R), 0);
        risultato = (1 / invResistenze).toFixed(2);
        document.getElementById('risultatoD').innerHTML = "La resistenza equivalente in parallelo è: " + risultato + " Ohm";
        if (!isNaN(intensita)) {
            let tensioni = calcolaTensioniParallelo(resistenze, intensita);
            document.getElementById('risultatoD').innerHTML += "<br>Le tensioni ai capi delle resistenze sono: " + tensioni.join(" V , ") + " V";
        }
    }
}
