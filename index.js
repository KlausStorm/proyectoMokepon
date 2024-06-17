const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const players = []

class Player {
    constructor(id){
        this.id = id
    }
    asignarMokepon(mokepon){
        this.mokepon = mokepon
    }
    actualizarPosicion(x, y) {
        this.x = x
        this.y = y
    }
    asignarAtaque(ataque){
        this.ataque = ataque
    }
}

class Mokepon {
    constructor(nombre){
        this.nombre = nombre
    }
}

app.get("/join", (req, res) => {
    const id = `${Math.random()}`

    const player = new Player(id)

    players.push(player)

    res.setHeader("Access-Control-Allow-Origin", "*")

    res.send(id)
})

app.post("/mokepon/:playerId", (req, res) =>{
    const playerId = req.params.playerId || ""
    const nombre = req.body.mokepon || ""
    const mokepon = new Mokepon(nombre)
    
    const  playerIndex = players.findIndex((player) => playerId === player.id)

    if(playerIndex >= 0){
        players[playerIndex].asignarMokepon(mokepon)
    }

    console.log(players)
    console.log(playerId)
    res.end()
})

app.post("/mokepon/:playerId/posicion", (req, res) => {
    const playerId = req.params.playerId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const playerIndex = players.findIndex((player) => playerId === player.id)

    if(playerIndex >= 0) {
        players[playerIndex].actualizarPosicion(x, y)
    }

    const enemigos = players.filter((player) => playerId !== player.id)


    res.send({
        enemigos
    })
})
app.post("/mokepon/:playerId/ataque", (req, res) => {
    const playerId = req.params.playerId || ""
    const ataque = req.body.ataque || ""

    const playerIndex = players.findIndex((player) => playerId === player.id)

    if(playerIndex >= 0) {
        players[playerIndex].asignarAtaque(ataque)
    }
})

app.listen(8080, () =>{
    console.log("Server Open")
})