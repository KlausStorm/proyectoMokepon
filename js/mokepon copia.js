const sectionCombat = document.getElementById("estadisticas-de-combate")
const sectionAttackChoose = document.getElementById("elige-un-ataque")
const sectionInfo = document.getElementById("información")
const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let botonFuego
let botonAgua
let botonTierra
let botonViento
let botonHielo

let botonNormal
let botonHeal
let botonGuard
let botonStats

const botonChoose = document.getElementById("boton-choose")
const botonReinicio = document.getElementById("boton-reinicio")

const sectionElegirMokepon = document.getElementById("elige-tu-mokepon")

const spanPlayer = document.getElementById("mokepon-player")
const spanEnemy = document.getElementById("mokepon-enemigo")

const spanVidaEnemigo = document.getElementById("vida-enemigo")
const spanVida = document.getElementById("vida-mokepon")

const mensajeResultado = document.getElementById("resultado")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorBotones = document.getElementById("contenedorBotones")

let playerAttack
let enemyAttack

let tipoMokepon
let tipoMokeponEnemigo

let playerHealth
let playerHealth0
let enemyHealth
let enemyHealth0
let damageNeutral = Math.ceil(11.64)
let damageEfectivo = Math.ceil(37.7)
let damageNotEfectivo = Math.ceil(7.6)

let mokepones = []

let mokeponName
let mokeponEnemigo
let opcionMokepones
let playerId = null
let enemyMokepones = []

let mokeponChoosen

let inputAquaflare
let inputBlazewind
let inputTerraclod 
let inputGustflare
let inputFrostglint

let playerTurn = true

let mokeponPlayer
let ataquesMokepon
let cantidadHeal = 5
let cantidadAgua = 3
let cantidadFuego = 3
let cantidadTierra = 3
let cantidadViento = 3
let cantidadHielo = 3



let alturaEsperada
let anchoMapa = window.innerWidth - 40
const anchoMaxMapa = 800

if(anchoMapa > anchoMaxMapa) {
    anchoMapa = anchoMaxMapa - 40
}

alturaEsperada = anchoMapa * 600 / 800


mapa.width = anchoMapa
mapa.height = alturaEsperada

let lienzo = mapa.getContext("2d")
let intervalo

let mapaBackground = new Image()
mapaBackground.src = "./assets/mokemap png.webp"

class Mokepon {
    constructor(nombre, foto, vida, defensa, neutral, efectivo, noefectivo,  tipo, fotoMapa, id = null){
        this. id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.defensa = defensa
        this.neutral = neutral
        this.efectivo = efectivo
        this.noefectivo = noefectivo
        this.tipo = tipo
        this.ataques = []
        this.ancho = 80
        this.alto = 80
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.speedX = 0
        this.speedY = 0
    }

    printMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto,
        )

    }
}


const aquaflare = new Mokepon("aquaflare", "./assets/fotor-ai-20240520191929.jpg", 80, 0.09, Math.ceil(11.64), Math.ceil(37.7), Math.ceil(7.6), "agua", "./assets/fotor-ai-20240520191929.jpg")
const blazewind = new Mokepon("blazewind", "./assets/fotor-ai-20240520192050.jpg", 90, 0.08, Math.ceil(11.64), Math.ceil(37.7), Math.ceil(7.6), "fuego","./assets/fotor-ai-20240520192050.jpg")
const terraclod = new Mokepon("terraclod", "./assets/terraclod.png", 120, 0.05, Math.ceil(11.64), Math.ceil(37.7), Math.ceil(7.6), "tierra", "./assets/terraclod.png")
const gustflare = new Mokepon("gustflare", "./assets/gustflare.png", 80, 0.09, Math.ceil(11.64), Math.ceil(37.7), Math.ceil(7.6), "viento", "./assets/gustflare.png")
const frostglint = new Mokepon("frostglint", "./assets/frostglint.png", 100, 0.07, Math.ceil(11.64), Math.ceil(37.7), Math.ceil(7.6), "hielo", "./assets/frostglint.png")



aquaflare.ataques.push(
    { nombre: "tsunami", id: "boton-agua", tipo: "agua" },
    { nombre: "cabezazo", id: "boton-normal", tipo: "normal" },
    { nombre: "curar", id: "boton-heal", tipo: "heal" },
    { nombre: "guardia", id: "boton-guard", tipo: "guard" },
    { nombre: "potenciar", id: "boton-stats", tipo: "stats" },
)

blazewind.ataques.push(
    { nombre: "llamarada", id: "boton-fuego", tipo: "fuego" },
    { nombre: "cabezazo", id: "boton-normal", tipo: "normal" },
    { nombre: "curar", id: "boton-heal", tipo: "heal" },
    { nombre: "guardia", id: "boton-guard", tipo: "guard" },
    { nombre: "potenciar", id: "boton-stats", tipo: "stats"  },
)

terraclod.ataques.push(
    { nombre: "terremoto", id: "boton-tierra", tipo: "tierra" },
    { nombre: "cabezazo", id: "boton-normal", tipo: "normal" },
    { nombre: "curar", id: "boton-heal", tipo: "heal" },
    { nombre: "guardia", id: "boton-guard", tipo: "guard" },
    { nombre: "potenciar", id: "boton-stats", tipo: "stats"  },
)

gustflare.ataques.push(
    { nombre: "tornado", id: "boton-viento", tipo: "viento" },
    { nombre: "cabezazo", id: "boton-normal", tipo: "normal" },
    { nombre: "curar", id: "boton-heal", tipo: "heal" },
    { nombre: "guardia", id: "boton-guard", tipo: "guard" },
    { nombre: "potenciar", id: "boton-stats", tipo: "stats"  },
)

frostglint.ataques.push(
    { nombre: "ventisca", id: "boton-hielo", tipo: "hielo"  },
    { nombre: "cabezazo", id: "boton-normal", tipo: "normal" },
    { nombre: "curar", id: "boton-heal", tipo: "heal" },
    { nombre: "guardia", id: "boton-guard", tipo: "guard" },
    { nombre: "potenciar", id: "boton-stats", tipo: "stats"  },
)

mokepones.push(aquaflare, blazewind, terraclod, gustflare, frostglint)


function startGame(){
    
    sectionCombat.style.display = "none"
    sectionAttackChoose.style.display = "none"
    sectionInfo.style.display = "none"
    sectionVerMapa.style.display = "none"

    mokepones.forEach((mokepon) => {
        opcionMokepones = `
        <input class="input-${mokepon.tipo}" type="radio" name="mokepon" id=${mokepon.nombre}>
        <label class="tarjeta-mokepon-${mokepon.tipo}
        " for=${mokepon.nombre}><p>${mokepon.nombre} tipo ${mokepon.tipo}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
            </label>
            `
    contenedorTarjetas.innerHTML += opcionMokepones

    })
    botonChoose.addEventListener("click", seleccionarMokepon)

    botonReinicio.style.display = "none"
    botonReinicio.addEventListener("click", restartGame)

    joinGame()
}

function joinGame(){
    fetch("http://localhost:8080/join")
        .then(function (res){

            if (res.ok){
                res.text()
                    .then(function (respuesta){
                        console.log(respuesta)
                        playerId = respuesta
                    })
            }
        })
}

function seleccionarMokepon(){

    sectionElegirMokepon.style.display = "none"
    sectionVerMapa.style.display = "flex"

    iniciarMapa()
    //sectionAttackChoose.style.display = "flex"
    //sectionCombat.style.display = "flex"
    
    mokeponChoosen = mokepones.find(mokepon => {
        let input = document.getElementById(mokepon.nombre)
        return input.checked
    })

    if(mokeponChoosen)
        {
            playerHealth = mokeponChoosen.vida
            playerHealth0 = mokeponChoosen.vida
            tipoMokepon = "tipo-" + mokeponChoosen.tipo
            mokeponPlayer = mokeponChoosen.nombre
            mokeponDefense = mokeponChoosen.defensa
            mokeponNeutral = mokeponChoosen.neutral
            mokeponEfective = mokeponChoosen.efectivo
            mokeponNotEfective = mokeponChoosen.noefectivo

            alert("La vida de " + mokeponPlayer + " es " + playerHealth)
        
            spanPlayer.innerHTML = mokeponPlayer   
            spanVida.innerHTML = playerHealth

            extraerAtaques(mokeponPlayer)        
        }
    else 
        {
            alert("Selecciona un mokepon para combatir")

            return restartGame()
        }

        mokeponSeleccionado(mokeponPlayer)

        document.querySelectorAll("input[type=radio]").forEach(input => input.disabled = true)
}

function mokeponSeleccionado(mokeponPlayer){
    fetch(`http://localhost:8080/mokepon/${playerId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mokeponPlayer
        })
        
    })
}

function extraerAtaques(mokeponPlayer){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mokeponPlayer === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
            
        }
        
    }
    console.log(ataques)
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        let ataquesMokepon = `
        <button class="${ataque.tipo} BAtaque" id=${ataque.id}>${ataque.nombre}</button>
        `
        contenedorBotones.innerHTML += ataquesMokepon
    })
    if(mokeponPlayer == "aquaflare")
        {
            botonAgua = document.getElementById("boton-agua")
            botonNormal = document.getElementById("boton-normal")
            botonHeal = document.getElementById("boton-heal") 
            botonGuard = document.getElementById("boton-guard")
            botonStats = document.getElementById("boton-stats")

            botonAgua.addEventListener("click", ataqueAgua)
            botonNormal.addEventListener("click", ataqueNormal)
            botonHeal.addEventListener("click", healingAction)
            botonGuard.addEventListener("click", guardAction)
            botonStats.addEventListener("click", statsAction)
        }
    else if(mokeponPlayer == "blazewind")
        {
            botonFuego = document.getElementById("boton-fuego")
            botonNormal = document.getElementById("boton-normal")
            botonHeal = document.getElementById("boton-heal") 
            botonGuard = document.getElementById("boton-guard")
            botonStats = document.getElementById("boton-stats")

            botonFuego.addEventListener("click", ataqueFuego)
            botonNormal.addEventListener("click", ataqueNormal)
            botonHeal.addEventListener("click", healingAction)
            botonGuard.addEventListener("click", guardAction)
            botonStats.addEventListener("click", statsAction)
        }
    else if(mokeponPlayer == "terraclod")
        {
            botonTierra = document.getElementById("boton-tierra")
            botonNormal = document.getElementById("boton-normal")
            botonHeal = document.getElementById("boton-heal") 
            botonGuard = document.getElementById("boton-guard")
            botonStats = document.getElementById("boton-stats")

            botonTierra.addEventListener("click", ataqueTierra)
            botonNormal.addEventListener("click", ataqueNormal)
            botonHeal.addEventListener("click", healingAction)
            botonGuard.addEventListener("click", guardAction)
            botonStats.addEventListener("click", statsAction)
        }
    else if(mokeponPlayer == "gustflare")
            {
            botonViento = document.getElementById("boton-viento")
            botonNormal = document.getElementById("boton-normal")
            botonHeal = document.getElementById("boton-heal") 
            botonGuard = document.getElementById("boton-guard")
            botonStats = document.getElementById("boton-stats")

            botonViento.addEventListener("click", ataqueViento)
            botonNormal.addEventListener("click", ataqueNormal)
            botonHeal.addEventListener("click", healingAction)
            botonGuard.addEventListener("click", guardAction)
            botonStats.addEventListener("click", statsAction)
            }
    else if(mokeponPlayer == "frostglint")
        {
            botonHielo = document.getElementById("boton-hielo")
            botonNormal = document.getElementById("boton-normal")
            botonHeal = document.getElementById("boton-heal") 
            botonGuard = document.getElementById("boton-guard")
            botonStats = document.getElementById("boton-stats")

            botonHielo.addEventListener("click", ataqueHielo)
            botonNormal.addEventListener("click", ataqueNormal)
            botonHeal.addEventListener("click", healingAction)
            botonGuard.addEventListener("click", guardAction)
            botonStats.addEventListener("click", statsAction)
        }   
    else{
        alert("no se encontró")
    }
}

function seleccionarMokeponEnemigo(enemigo)
{

    mokeponEnemigo = enemigo.nombre
    enemyHealth = enemigo.vida
    enemyHealth0 = enemigo.vida
    tipoMokeponEnemigo = enemigo.tipo
    enemyDefense = enemigo.defensa
    enemyEfective = enemigo.efectivo
    enemyNotEfective = enemigo.noefectivo
    enemyNeutral = enemigo.neutral


    spanEnemy.innerHTML = mokeponEnemigo
    spanVidaEnemigo.innerHTML = enemyHealth

    botonChoose.disabled = true    
}

function aleatorio(min, max) 
    {
        return Math.floor(Math.random() * (max - min + 1) + min)
}

function enemyTurn(){
    playerTurn = false
    let contenedorBotones = document.getElementById("contenedorBotones")
    contenedorBotones.style.display = "none"

    setTimeout(() => {
        if(playerHealth && enemyHealth >= 0){
            contenedorBotones.style.display = "flex"
            if(playerTurn === false){
            enviarAtaque()}
            playerTurn = true
            resultadoPelea()
        }
    }, 1000)
}
function enviarAtaque() {
    fetch(`http://localhost:8080/mokepon/${playerId}/ataque`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataque: playerAttack
        })
    })
}
function ataqueFuego()
{
    let porcentajeFallo = Math.random()
    sectionInfo.style.display = "flex"

    if(porcentajeFallo <= 0.1) 
        {
            playerAttack = "falló"

            if(playerHealth && enemyHealth >= 0){
                enemyTurn()
                mensajeAccionPlayer()}
            else{
                resultadoPelea()
            }
        }
    else
    { 
        playerAttack = "fuego"

        if(playerAttack == "fuego" && (tipoMokeponEnemigo == "hielo" || tipoMokeponEnemigo == "tierra"))
            {
                enemyHealth = enemyHealth - (mokeponEfective - Math.ceil(mokeponEfective * enemyDefense))

                spanVidaEnemigo.innerHTML = enemyHealth
            }
        else if(playerAttack == "fuego" && (tipoMokeponEnemigo == "agua" || (tipoMokeponEnemigo == "fuego")))
        {
            enemyHealth = enemyHealth - (mokeponNotEfective - Math.ceil(mokeponNotEfective * enemyDefense))

            spanVidaEnemigo.innerHTML = enemyHealth
        }
        else
        {
            enemyHealth = enemyHealth - (mokeponNeutral - Math.ceil(mokeponNeutral * enemyDefense))

            spanVidaEnemigo.innerHTML = enemyHealth
        }
        if(playerHealth && enemyHealth >= 0){
            enemyTurn()
            mensajeAccionPlayer()}
        else{
            resultadoPelea()
        }

    }
}

function ataqueAgua()
{
    let porcentajeFallo = Math.random()
    sectionInfo.style.display = "flex"

    if(porcentajeFallo <= 0.1)
        {
            playerAttack = "falló"

            if(playerHealth && enemyHealth >= 0){
                enemyTurn()
                mensajeAccionPlayer()}
            else{
                resultadoPelea()
            }
        }
    else
    {
        playerAttack = "agua"

        if(playerAttack == "agua" && (tipoMokeponEnemigo == "fuego" || tipoMokeponEnemigo == "tierra"))
            {
                enemyHealth = enemyHealth - (mokeponEfective - Math.ceil(mokeponEfective * enemyDefense))

                spanVidaEnemigo.innerHTML = enemyHealth
            }
        else if(playerAttack == "agua" && (tipoMokeponEnemigo == "agua") || (tipoMokeponEnemigo == "hielo"))
        {
            enemyHealth = enemyHealth - (mokeponNotEfective - Math.ceil(mokeponNotEfective * enemyDefense))

            spanVidaEnemigo.innerHTML = enemyHealth
        }
        else
        {
            enemyHealth = enemyHealth - (mokeponNeutral - Math.ceil(mokeponNeutral * enemyDefense))

            spanVidaEnemigo.innerHTML = enemyHealth 
        }
        
        if(playerHealth && enemyHealth >= 0){
            enemyTurn()
            mensajeAccionPlayer()}
        else{
            resultadoPelea()
        }

    }
}

function ataqueTierra()
{
    let porcentajeFallo = Math.random()
    sectionInfo.style.display = "flex"

    if(porcentajeFallo <= 0.1)
        {
            playerAttack = "falló"

            if(playerHealth && enemyHealth >= 0){
                enemyTurn()
                mensajeAccionPlayer()}
            else{
                resultadoPelea()
            }
        }
    else
    {
        playerAttack = "tierra"

        if(playerAttack == "tierra" && (tipoMokeponEnemigo == "agua" || tipoMokeponEnemigo == "viento"))
            {
                enemyHealth = enemyHealth - (mokeponEfective - Math.ceil(mokeponEfective * enemyDefense))

                spanVidaEnemigo.innerHTML = enemyHealth
            }
        else if(playerAttack == "tierra" && (tipoMokeponEnemigo == "tierra" || tipoMokeponEnemigo == "hielo"))
        {
            enemyHealth = enemyHealth - (mokeponNotEfective - Math.ceil(mokeponNotEfective * enemyDefense))

            spanVidaEnemigo.innerHTML = enemyHealth
        }
        else
        {
            enemyHealth = enemyHealth - (mokeponNeutral - Math.ceil(mokeponNeutral * enemyDefense))

            spanVidaEnemigo.innerHTML = enemyHealth
        }

        if(playerHealth && enemyHealth >= 0){
            enemyTurn()
            mensajeAccionPlayer()}
        else{
            resultadoPelea()
        }
    }
}
function ataqueViento()
{
    let porcentajeFallo = Math.random()
    sectionInfo.style.display = "flex"

    if(porcentajeFallo <= 0.1)
        {
            playerAttack = "falló"

            if(playerHealth && enemyHealth >= 0){
                enemyTurn()
                mensajeAccionPlayer()}
            else{
                resultadoPelea()
            }
        }
    else
    {
        playerAttack = "viento"

        if(playerAttack == "viento" && (tipoMokeponEnemigo == "fuego" || tipoMokeponEnemigo == "hielo"))
            {
                enemyHealth = enemyHealth - (mokeponEfective - Math.ceil(mokeponEfective * enemyDefense))

                spanVidaEnemigo.innerHTML = enemyHealth
            }
        else if(playerAttack == "viento" && (tipoMokeponEnemigo == "tierra") || (tipoMokeponEnemigo == "viento"))
        {
            enemyHealth = enemyHealth - (mokeponNotEfective - Math.ceil(mokeponNotEfective * enemyDefense))

            spanVidaEnemigo.innerHTML = enemyHealth
        }
        else
        {
            enemyHealth = enemyHealth - (mokeponNeutral - Math.ceil(mokeponNeutral * enemyDefense))

            spanVidaEnemigo.innerHTML = enemyHealth
        }
        
        if(playerHealth && enemyHealth >= 0){
            enemyTurn()
            mensajeAccionPlayer()}
        else{
            resultadoPelea()
        }
    }
}

function ataqueHielo()
{
    let porcentajeFallo = Math.random()
    sectionInfo.style.display = "flex"

    if(porcentajeFallo <= 0.1)
        {
            playerAttack = "falló"

            if(playerHealth && enemyHealth >= 0){
                enemyTurn()
                mensajeAccionPlayer()}
            else{
                resultadoPelea()
            }
        }
    else
    {
        playerAttack = "hielo"

        if(playerAttack == "hielo" && (tipoMokeponEnemigo == "agua" || tipoMokeponEnemigo == "viento"))
            {
                enemyHealth = enemyHealth - (mokeponEfective - Math.ceil(mokeponEfective * enemyDefense))

                spanVidaEnemigo.innerHTML = enemyHealth
            }
        else if(playerAttack == "hielo" && (tipoMokeponEnemigo == "fuego" || tipoMokeponEnemigo == "hielo"))
        {
            enemyHealth = enemyHealth - (mokeponNotEfective - Math.ceil(mokeponNotEfective * enemyDefense))

            spanVidaEnemigo.innerHTML = enemyHealth
        }
        else
        {
            enemyHealth = enemyHealth - (mokeponNeutral - Math.ceil(mokeponNeutral * enemyDefense))

            spanVidaEnemigo.innerHTML = enemyHealth
        }

        if(playerHealth && enemyHealth >= 0){
            enemyTurn()
            mensajeAccionPlayer()}
        else{
            resultadoPelea()
        }
    }
}

function ataqueNormal(){
    let porcentajeFallo = Math.random()
    sectionInfo.style.display = "flex"

    if(porcentajeFallo <= 0.1) 
        {
            playerAttack = "falló"

            if(playerHealth && enemyHealth >= 0){
                enemyTurn()
                mensajeAccionPlayer()}
            else{
                resultadoPelea()
            }
        }
    else
        { 
        playerAttack = "normal"

            enemyHealth = enemyHealth - (mokeponNeutral - Math.ceil(mokeponNeutral * enemyDefense))

            spanVidaEnemigo.innerHTML = enemyHealth

            if(playerHealth && enemyHealth >= 0){
                enemyTurn()
                mensajeAccionPlayer()}
            else{
                resultadoPelea()
            }
        }

        

    }

function healingAction(){

    sectionInfo.style.display = "flex"

        playerAttack = "heal"

        heal = aleatorio(6, 30)

        if(playerHealth + heal >= playerHealth0)
            {
                playerHealth = playerHealth0

                spanVida.innerHTML = playerHealth

                if(playerHealth && enemyHealth >= 0){
                    enemyTurn()
                    mensajeAccionPlayer()}
                else{
                    resultadoPelea()
                }
            }
        else{
            playerHealth = playerHealth + heal

            spanVida.innerHTML = playerHealth

            if(playerHealth && enemyHealth >= 0){
                enemyTurn()
                mensajeAccionPlayer()}
            else{
                resultadoPelea()
            }
        }

    }

function guardAction(){
    let porcentajeFallo = Math.random()
    sectionInfo.style.display = "flex"

    if(porcentajeFallo <= 0.05) 
        {
            playerAttack = "falló"

            if(playerHealth && enemyHealth >= 0){
                enemyTurn()
                mensajeAccionPlayer()}
            else{
                resultadoPelea()
            }
        }
    else
    { 
        playerAttack = "guard"
        mokeponDefense = mokeponDefense + 0.02
        
        if(playerHealth && enemyHealth >= 0){
            enemyTurn()
            mensajeAccionPlayer()}
        else{
            resultadoPelea()
        }
    }
}

function statsAction(){

    sectionInfo.style.display = "flex"
    let tasaAumento = 1.15 

            playerAttack = "stats"
            mokeponEfective = Math.ceil(mokeponEfective * tasaAumento)
            mokeponNotEfective = Math.ceil(mokeponNotEfective * tasaAumento)
            mokeponNeutral = Math.ceil(mokeponNeutral * tasaAumento)
            
            if(playerHealth && enemyHealth >= 0){
                enemyTurn()
                mensajeAccionPlayer()}
            else{
                resultadoPelea()
            }
}
enviarAtaque(

)
function ataqueEnemigo()
{

    if(mokeponEnemigo == "aquaflare"){

        enemyAttack = aleatorio(1,6)

        if(enemyAttack == 1){

            enemyAttack = "agua"

            if((tipoMokepon == "tipoFuego") || (tipoMokepon == "tipoTierra"))
                {
                    playerHealth = playerHealth - (enemyEfective - Math.ceil(enemyEfective * mokeponDefense))
                    
                    spanVida.innerHTML = playerHealth
                }
            else if((tipoMokepon == "tipoAgua") || (tipoMokepon == "tipoHielo"))
                {
                    playerHealth = playerHealth - (enemyNotEfective - Math.ceil(enemyNotEfective * mokeponDefense))

                    spanVida.innerHTML = playerHealth
                }
            else
            {
                playerHealth = playerHealth - (enemyNeutral - Math.ceil(enemyNeutral * mokeponDefense))

                spanVida.innerHTML = playerHealth

                
            }
        }
        else if(enemyAttack == 2){

            enemyAttack = "normal"

            playerHealth = playerHealth - (enemyNeutral - Math.ceil(enemyNeutral * mokeponDefense))

            spanVida.innerHTML = playerHealth 
            }
        else if(enemyAttack == 3){

            healenemy = aleatorio(6, 30)

            enemyAttack = "heal"

            if(enemyHealth + healenemy >= enemyHealth0)
                {
                    enemyHealth = enemyHealth0
    
                    spanVidaEnemigo.innerHTML = enemyHealth
    
                }
            else{
                enemyHealth = enemyHealth + healenemy
    
                spanVidaEnemigo.innerHTML = enemyHealth
                }
            }
        else if(enemyAttack == 4){
            enemyAttack = "guard"
            enemyDefense = enemyDefense + 0.02


        }
        else if(enemyAttack == 5){
            enemyAttack = "stats"

            tasaAumentoEnemigo = 1.15

            enemyEfective = Math.ceil(enemyEfective * tasaAumentoEnemigo)
            enemyNotEfective = Math.ceil(enemyNotEfective * tasaAumentoEnemigo)
            enemyNeutral = Math.ceil(enemyNeutral * tasaAumentoEnemigo)
        }
        else{
            enemyAttack = "falló"
        }

    }  
    else if(mokeponEnemigo == "blazewind"){

        enemyAttack = aleatorio(1,6)

        if(enemyAttack == 1)
            {
                enemyAttack = "fuego"
    
                if((tipoMokepon == "tipoTierra") || (tipoMokepon == "tipoHielo"))
                    {
                        playerHealth = playerHealth - (enemyEfective - Math.ceil(enemyEfective * mokeponDefense))
                        
                        spanVida.innerHTML = playerHealth
                    }
                else if((tipoMokepon == "tipoAgua" ) || (tipoMokepon == "tipoFuego") || (tipoMokepon == "tipoViento"))
                    {
                        playerHealth = playerHealth - (enemyNotEfective - Math.ceil(enemyNotEfective * mokeponDefense))
    
                        spanVida.innerHTML = playerHealth
                    }
                else
                {
                    playerHealth = playerHealth - (enemyNeutral - Math.ceil(enemyNeutral * mokeponDefense))
    
                    spanVida.innerHTML = playerHealth
                }
            }
            else if(enemyAttack == 2){

                enemyAttack = "normal"
    
                playerHealth = playerHealth - (enemyNeutral - Math.ceil(enemyNeutral * mokeponDefense))
    
                spanVida.innerHTML = playerHealth 
                }
            else if(enemyAttack == 3){
    
                healenemy = aleatorio(6, 30)
    
                enemyAttack = "heal"
    
                if(enemyHealth + healenemy >= enemyHealth0)
                    {
                        enemyHealth = enemyHealth0
        
                        spanVidaEnemigo.innerHTML = enemyHealth
                    }
                else{
                    enemyHealth = enemyHealth + healenemy
        
                    spanVidaEnemigo.innerHTML = enemyHealth
        
                    }
                }
            else if(enemyAttack == 4){
                enemyAttack = "guard"
                enemyDefense = enemyDefense + 0.02
    
    
            }
            else if(enemyAttack == 5){
                enemyAttack = "stats"
    
                tasaAumentoEnemigo = 1.15
    
                enemyEfective = Math.ceil(enemyEfective * tasaAumentoEnemigo)
                enemyNotEfective = Math.ceil(enemyNotEfective * tasaAumentoEnemigo)
                enemyNeutral = Math.ceil(enemyNeutral * tasaAumentoEnemigo)
            }
            else{
                enemyAttack = "falló"
            }
    }
    else if(mokeponEnemigo == "terraclod"){

        enemyAttack = aleatorio(1,6)

        if(enemyAttack == 1){
                enemyAttack = "tierra"

                if((tipoMokepon == "tipoAgua") || (tipoMokepon == "tipoViento"))
                    {
                        playerHealth = playerHealth - (enemyEfective - Math.ceil(enemyEfective * mokeponDefense))
                        
                        spanVida.innerHTML = playerHealth
                    }
                else if((tipoMokepon == "tipoTierra") || (tipoMokepon == "tipoHielo"))
                    {
                        playerHealth = playerHealth - (enemyNotEfective - Math.ceil(enemyNotEfective * mokeponDefense))
    
                        spanVida.innerHTML = playerHealth
                    }
                else
                    {
                        playerHealth = playerHealth - (enemyNeutral - Math.ceil(enemyNeutral * mokeponDefense))
        
                        spanVida.innerHTML = playerHealth
                    }

            }
        else if(enemyAttack == 2){

                enemyAttack = "normal"
    
                playerHealth = playerHealth - (enemyNeutral - Math.ceil(enemyNeutral * mokeponDefense))
    
                spanVida.innerHTML = playerHealth 
                }
        else if(enemyAttack == 3){
    
                healenemy = aleatorio(6, 30)
    
                enemyAttack = "heal"
    
                if(enemyHealth + healenemy >= enemyHealth0)
                    {
                        enemyHealth = enemyHealth0
        
                        spanVidaEnemigo.innerHTML = enemyHealth
        
                    }
                else{
                    enemyHealth = enemyHealth + healenemy
        
                    spanVidaEnemigo.innerHTML = enemyHealth
        
                    }
                }
        else if(enemyAttack == 4){
                enemyAttack = "guard"
                enemyDefense = enemyDefense + 0.02
            }
        else if(enemyAttack == 5){
                enemyAttack = "stats"
    
                tasaAumentoEnemigo = 1.15
    
                enemyEfective = Math.ceil(enemyEfective * tasaAumentoEnemigo)
                enemyNotEfective = Math.ceil(enemyNotEfective * tasaAumentoEnemigo)
                enemyNeutral = Math.ceil(enemyNeutral * tasaAumentoEnemigo)
            }
        else{
                enemyAttack = "falló"
        }
    }
    else if(mokeponEnemigo == "gustflare"){

        enemyAttack = aleatorio(1,6)

        if(enemyAttack == 1)
            {
                enemyAttack = "viento"
            
                        if((tipoMokepon == "tipoFuego") || (tipoMokepon == "tipoHielo"))
                            {
                                playerHealth = playerHealth - (enemyEfective - Math.ceil(enemyEfective * mokeponDefense))
                                
                                spanVida.innerHTML = playerHealth
                            }
                        else if((tipoMokepon == "tipoTierra") || (tipoMokepon == "tipoViento"))
                            {
                                playerHealth = playerHealth - (enemyNotEfective - Math.ceil(enemyNotEfective * mokeponDefense))
            
                                spanVida.innerHTML = playerHealth
                            }
                        else
                        {
                            playerHealth = playerHealth - (enemyNeutral - Math.ceil(enemyNeutral * mokeponDefense))
            
                            spanVida.innerHTML = playerHealth 
                        }
                    }
            
        else if(enemyAttack == 2){

                enemyAttack = "normal"
    
                playerHealth = playerHealth - (enemyNeutral - Math.ceil(enemyNeutral * mokeponDefense))
    
                spanVida.innerHTML = playerHealth 
                }
        else if(enemyAttack == 3){
    
                healenemy = aleatorio(6, 30)
    
                enemyAttack = "heal"
    
                if(enemyHealth + healenemy >= enemyHealth0)
                    {
                        enemyHealth = enemyHealth0
        
                        spanVidaEnemigo.innerHTML = enemyHealth
        
                    }
                else{
                    enemyHealth = enemyHealth + healenemy
        
                    spanVidaEnemigo.innerHTML = enemyHealth
        
                    }
                }
        else if(enemyAttack == 4){
                enemyAttack = "guard"
                enemyDefense = enemyDefense + 0.02
    
    
            }
        else if(enemyAttack == 5){
                enemyAttack = "stats"
    
                tasaAumentoEnemigo = 1.15
    
                enemyEfective = Math.ceil(enemyEfective * tasaAumentoEnemigo)
                enemyNotEfective = Math.ceil(enemyNotEfective * tasaAumentoEnemigo)
                enemyNeutral = Math.ceil(enemyNeutral * tasaAumentoEnemigo)
            }
        else{
                enemyAttack = "falló"
            }
    }
    else if(mokeponEnemigo == "frostglint"){

        enemyAttack = aleatorio(1,6)

        if(enemyAttack == 1)
            {
                enemyAttack = "hielo"
            
                if((tipoMokepon == "tipoAgua")||(tipoMokepon == "tipoViento"))
                    {
                        playerHealth = playerHealth - (enemyEfective - Math.ceil(enemyEfective * mokeponDefense))
                                
                        spanVida.innerHTML = playerHealth
                    }
                    else if((tipoMokepon == "tipoFuego") || (tipoMokepon == "tipoHielo"))
                        {
                            playerHealth = playerHealth - (enemyNotEfective - Math.ceil(enemyNotEfective * mokeponDefense))
            
                            spanVida.innerHTML = playerHealth
                        }
                    else
                        {
                            playerHealth = playerHealth - (enemyNeutral - Math.ceil(enemyNeutral * mokeponDefense))
            
                            spanVida.innerHTML = playerHealth
                        }
                    }
            
            else if(enemyAttack == 2){

                enemyAttack = "normal"
    
                playerHealth = playerHealth - (enemyNeutral - Math.ceil(enemyNeutral * mokeponDefense))
    
                spanVida.innerHTML = playerHealth 
                }
            else if(enemyAttack == 3){
    
                healenemy = aleatorio(6, 30)
    
                enemyAttack = "heal"
    
                if(enemyHealth + healenemy >= enemyHealth0)
                    {
                        enemyHealth = enemyHealth0
        
                        spanVidaEnemigo.innerHTML = enemyHealth
                    }
                else{
                    enemyHealth = enemyHealth + healenemy
        
                    spanVidaEnemigo.innerHTML = enemyHealth
                    }
                }

            else if(enemyAttack == 4){
                enemyAttack = "guard"
                enemyDefense = enemyDefense + 0.02
    
    

            }
            else if(enemyAttack == 5){

                enemyAttack = "stats"
    
                tasaAumentoEnemigo = 1.15
    
                enemyEfective = Math.ceil(enemyEfective * tasaAumentoEnemigo)
                enemyNotEfective = Math.ceil(enemyNotEfective * tasaAumentoEnemigo)
                enemyNeutral = Math.ceil(enemyNeutral * tasaAumentoEnemigo)
            }

            else{
                enemyAttack = "falló"
            }
    }   
    if(playerHealth && enemyHealth >= 0){
        mensajeAccionEnemy()}
    else{
            resultadoPelea()
        }
}

function mensajeAccionPlayer()
{
    let mensajesSeccion = document.getElementById("mensajes-player")
    mensajesSeccion.innerHTML = ""

    parrafo = document.createElement("h")
    parrafo.classList.add("mensajes-p1")


    if((playerAttack == "fuego") || (playerAttack == "agua") || (playerAttack == "tierra") || (playerAttack == "viento") || (playerAttack == "hielo"))
        {
            parrafo.innerHTML = "usaste un ataque de " + playerAttack + "."

            mensajesSeccion.appendChild(parrafo)

            if(mokeponPlayer == "aquaflare" && playerAttack == "agua"){
                cantidadAgua --
                if(cantidadAgua <= 0)
                    {
                        botonAgua.disabled = true
                    }
                else{
                    botonAgua.disabled = false
                }
            }
            if(mokeponPlayer == "blazewind" && playerAttack == "fuego"){
                cantidadFuego --
                if(cantidadFuego <= 0)
                    {
                        botonFuego.disabled = true
                    }
                else{
                    botonFuego.disabled = false
                }
            }
            if(mokeponPlayer == "terraclod" && playerAttack == "tierra"){
                cantidadTierra --
                if(cantidadTierra <= 0)
                    {
                        botonTierra.disabled = true
                    }
                else{
                    botonTierra.disabled = false
                }
            }
            if(mokeponPlayer == "gustflare" && playerAttack == "viento"){
                cantidadViento --
                if(cantidadViento <= 0)
                    {
                        botonViento.disabled = true
                    }
                else{
                    botonViento.disabled = false
                }
            }
            if(mokeponPlayer == "frostglint" && playerAttack == "hielo"){
                cantidadHielo --
                if(cantidadHielo <= 0)
                    {
                        botonHielo.disabled = true
                    }
                else{
                    botonHielo.disabled = false
                }
            }
        }
    else if((playerAttack == "normal"))
        {
            parrafo.innerHTML = "usaste un ataque " + playerAttack + "."
            mensajesSeccion.appendChild(parrafo)
    }
    else if((playerAttack == "heal")){
            parrafo.innerHTML = "te curaste " + heal + " de vida"
            mensajesSeccion.appendChild(parrafo)
            cantidadHeal --
            if(cantidadHeal <= 0)
            botonHeal.disabled = true
            else{
            botonHeal.disabled = false
        }
    }
    else if((playerAttack == "guard")){
            parrafo.innerHTML = "aumentó tu defensa"
            mensajesSeccion.appendChild(parrafo)

        }

    else if((playerAttack == "stats")){
            parrafo.innerHTML = "aumentó tu ataque"
            mensajesSeccion.appendChild(parrafo)

    }
    else{
        parrafo.innerHTML = "tu ataque " + playerAttack + "."
        mensajesSeccion.appendChild(parrafo)
    }
    
}

function mensajeAccionEnemy()
{
    let mensajesSeccion = document.getElementById("mensajes-enemigo")
    mensajesSeccion.innerHTML = ""

    parrafo = document.createElement("h")
    parrafo.classList.add("mensaje-enemy")

    if((enemyAttack == "fuego") || (enemyAttack == "agua") || (enemyAttack == "tierra") || (enemyAttack == "viento") || (enemyAttack == "hielo") || (enemyAttack == "normal"))
        {
            parrafo.innerHTML = "el enemigo usó un ataque de " + enemyAttack + "."

            mensajesSeccion.appendChild(parrafo)
        }
    else if((enemyAttack == "heal"))
        {
            if((enemyHealth + healenemy) >= enemyHealth0)
                {
                    parrafo.innerHTML = "el enemigo está al máximo de vida"
                }
            else{
                    parrafo.innerHTML = "el enemigo se curó " + healenemy + "."
            }
            mensajesSeccion.appendChild(parrafo)
        }
    else if((enemyAttack == "guard"))
        {
            parrafo.innerHTML = "el enemigo aumentó su defensa."

            mensajesSeccion.appendChild(parrafo)
        }
    else if((enemyAttack == "stats"))
        {
            parrafo.innerHTML = "el enemigo aumentó su ataque."
            mensajesSeccion.appendChild(parrafo)
        }
    else if(enemyAttack == "falló"){
        parrafo.innerHTML = "el enemigo " + enemyAttack
        mensajesSeccion.appendChild(parrafo)
    }
    resultadoPelea()
}

function resultadoPelea()
{   
    let botonReinicio = document.getElementById("boton-reinicio")
    let sectionInfo = document.getElementById("información")
    let contenedorBotones = document.getElementById("contenedorBotones")
    
    if(playerHealth <= 0 && enemyHealth > 0)
        {

            botonReinicio.style.display = "inline"

            sectionInfo.style.display = "none"

            contenedorBotones.style.display = "none"

            spanVida.innerHTML = 0

            resultado.innerHTML = "has perdido, el " + mokeponEnemigo + " enemigo ha ganado."
        }
    
    else if(playerHealth > 0 && enemyHealth <= 0)
        {

            botonReinicio.style.display = "inline"

            sectionInfo.style.display = "none"

            contenedorBotones.style.display = "none"

            spanVidaEnemigo.innerHTML = 0

            resultado.innerHTML = "has ganado, el " + mokeponEnemigo + " enemigo ha sido derrotado."
        }

    else if(playerHealth <= 0 && enemyHealth <= 0)
        {

            botonReinicio.style.display = "inline"

            sectionInfo.style.display = "none"

            contenedorBotones.style.display = "none"

            resultado.innerHTML = "es un empate OwO."
        }
    
}

function restartGame()
{
    location.reload()
}

function printCanvas(){

    mokeponChoosen.x = mokeponChoosen.x + mokeponChoosen.speedX
    mokeponChoosen.y = mokeponChoosen.y + mokeponChoosen.speedY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height,

    )
    mokeponChoosen.printMokepon()

    enviarPosicion(mokeponChoosen.x, mokeponChoosen.y)

    enemyMokepones.forEach(function (mokepon) {
        mokepon.printMokepon()
        
        revisarColision(mokepon)
    })
}

function enviarPosicion(x, y){
    fetch(`http://localhost:8080/mokepon/${playerId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res){
        if(res.ok){
            res.json()
                .then(function({enemigos}){
                    console.log(enemigos)
                    enemyMokepones = enemigos.map(function (enemigo){
                        let enemyMokepon = null
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        if(mokeponNombre === "aquaflare"){
                        enemyMokepon = new Mokepon("aquaflare", "./assets/fotor-ai-20240520191929.jpg", 80, 0.09, Math.ceil(11.64), Math.ceil(37.7), Math.ceil(7.6), "agua", "./assets/fotor-ai-20240520191929.jpg")
                        } else if(mokeponNombre === "blazewind"){
                        enemyMokepon = new Mokepon("blazewind", "./assets/fotor-ai-20240520192050.jpg", 90, 0.08, Math.ceil(11.64), Math.ceil(37.7), Math.ceil(7.6), "fuego","./assets/fotor-ai-20240520192050.jpg")
                        } else if(mokeponNombre === "terraclod"){
                        enemyMokepon = new Mokepon("terraclod", "./assets/terraclod.png", 120, 0.05, Math.ceil(11.64), Math.ceil(37.7), Math.ceil(7.6), "tierra", "./assets/terraclod.png")
                        } else if(mokeponNombre === "gustflare"){
                        enemyMokepon = new Mokepon("gustflare", "./assets/gustflare.png", 80, 0.09, Math.ceil(11.64), Math.ceil(37.7), Math.ceil(7.6), "viento", "./assets/gustflare.png")
                        } else if(mokeponNombre === "frostglint"){
                            enemyMokepon = new Mokepon("frostglint", "./assets/frostglint.png", 100, 0.07, Math.ceil(11.64), Math.ceil(37.7), Math.ceil(7.6), "hielo", "./assets/frostglint.png")
                        }

                        enemyMokepon.x = enemigo.x
                        enemyMokepon.y = enemigo.y
                        return enemyMokepon
                    })
                    
                })
        }
    })
}

function moverDerecha(){
    mokeponChoosen.speedX = 5
    printCanvas()
}
function moverIzquierda(){
    mokeponChoosen.speedX = -5
    printCanvas()
}

function moverAbajo(){
    mokeponChoosen.speedY = 5
    printCanvas()
}

function moverArriba(){
    mokeponChoosen.speedY = -5
    printCanvas()
}
function stopMoving(){
    mokeponChoosen.speedX = 0
    mokeponChoosen.speedY = 0
}

function keyPressed(event){
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break
        case "ArrowDown":
            moverAbajo()
            break
        case "ArrowRight":
            moverDerecha()
            break
        case "ArrowLeft":
            moverIzquierda()
            break
        default:
            break
    }
}

function iniciarMapa(){


    intervalo = setInterval(printCanvas, 30)

    window.addEventListener("keydown", keyPressed)
    
    window.addEventListener("keyup", stopMoving)
}

function revisarColision(enemigo){
const arribaEnemigo = enemigo.y
const abajoEnemigo = enemigo.y + enemigo.alto
const derechaEnemigo = enemigo.x + enemigo.ancho
const izquierdaEnemigo = enemigo.x

const arribaMokepon = mokeponChoosen.y
const abajoMokepon = mokeponChoosen.y + mokeponChoosen.alto
const derechaMokepon = mokeponChoosen.x + mokeponChoosen.ancho
const izquierdaMokepon = mokeponChoosen.x


    if(
        abajoMokepon < arribaEnemigo ||
        arribaMokepon > abajoEnemigo ||
        derechaMokepon < izquierdaEnemigo ||
        izquierdaMokepon > derechaEnemigo
    ){
        return
    }
    
    stopMoving()
    sectionAttackChoose.style.display = "flex"
    sectionCombat.style.display = "flex"
    sectionVerMapa.style.display = "none"

    seleccionarMokeponEnemigo(enemigo) 

/*     alert("Colision con " + enemigo.nombre) */
}

window.addEventListener("load", startGame)