import { WebSocket } from "https://deno.land/std/ws/mod.ts";
import AppEvent from "./AppEvent.ts";

export default class UserEvent implements AppEvent
{
    name: string;
    params: object;
    connection: WebSocket

    constructor(name: string, params: object, connection: WebSocket)
    {
        this.name = name;
        this.params = params;
        this.connection = connection;
    }
}