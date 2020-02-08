import { WebSocket } from "https://deno.land/std/ws/mod.ts";

export default class AppEvent
{
    name: string;
    params: object;
    connection: WebSocket|null

    constructor(name: string, params: object, connection: WebSocket|null)
    {
        this.name = name;
        this.params = params;
        this.connection = connection;
    }
}