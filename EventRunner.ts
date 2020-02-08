import AppEvent from "./AppEvent.ts";
import { Game } from "./game.ts";
import UserEventEmitter from "./UserEventEmitter.ts";
import { WebSocket } from "../../../../Users/doug/Library/Caches/deno/deps/https/deno.land/std/ws/mod.ts";
// import rand from "https://github.com/rsp/deno-rand"

// Because I'm a terrible person, I'm going to put all my f'ing state on here. Also my domain logic. And everything. All because it's half 3 and I've not got much work done
const games = {};
const connectionMap = {};
const userMap = {};

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
    
}

export default function run(event: AppEvent)
{
    console.log("Trying to handle", event);
    let name = event.name;
    let params = event.params;

    switch (name) {
        case "identify":
            connectionMap[params['id']] = event.connection;
            userMap[params['id']] = params
            break;

        case "create":
            let id = makeId(6);
            games[id] = new Game(id);
            // Send the original connection a "enter-game" event
            
            break;

    }

    
}