import AppEvent from "./AppEvent.ts";
import { Game } from "./game.ts";
import UserEventEmitter from "./UserEventEmitter.ts";
import { WebSocket } from "../../../../Users/doug/Library/Caches/deno/deps/https/deno.land/std/ws/mod.ts";
// import rand from "https://github.com/rsp/deno-rand"

// Because I'm a terrible person, I'm going to put all my f'ing state on here. Also my domain logic. And everything. All because it's half 3 and I've not got much work done
const games = {};
const connectionMap = {};
const playerMap = {};

function makeId(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function emit(event: AppEvent, connection: WebSocket) {
    connection.send(JSON.stringify(event));
}

function emitToPlayers(game: Game, event: AppEvent)
{
    for (var x=0; x < game.players.length; x++) {
        emit(event, playerMap[game.players[x]].connection);
    }
}

function getPlayer(connection: WebSocket) {
    for (let id in connectionMap) {
        if (connectionMap.hasOwnProperty(id) && connectionMap[id] === connection) {
            return playerMap[id];
        }
    }
    return null;
}

export default function run(event: AppEvent)
{
    console.log("Trying to handle", event);
    let name = event.name;
    let params = event.params;

    let player = getPlayer(event.connection);
    if (player === null) {
        if (name === "identify") {
            connectionMap[params['id']] = event.connection;
            playerMap[params['id']] = {
                id: params['id'],
                name: params['name'],
                image: params['image'],
                connection: event.connection
            }
        }
        return;
    }

    switch (name) {
        case "create":
            let id = makeId(6);
            games[id] = new Game(id);
            // Send the original connection a "enter-game" event
            emit(new AppEvent('enter-game', {gameId: id}), event.connection)
            games[id].addPlayer(player.id);
            emitToPlayers(games[id], new AppEvent('user-entered-game', {gameId: id, playerId: player.id, playerName: player.name}))
            break;

        case "join":
            if (games[id] !== undefined) {
                emit(new AppEvent('enter-game', {gameId: id}), event.connection);
                games[id].addPlayer(player.id);
                emitToPlayers(games[id], new AppEvent('user-entered-game', {gameId: id, playerId: player.id, playerName: player.name}))
            }
            break;

        case "answer":
            break;

        case "ready":
            break;
            
    }

    
}