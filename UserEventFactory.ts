import { WebSocket } from "https://deno.land/std/ws/mod.ts";
import AppEvent from "./AppEvent.ts";

export default function(text: string, sock: WebSocket)
{
    try{
        let object = JSON.parse(text);
        console.log(object);
        if (object['eventName'] === undefined) {
            console.error("UserEvent did not pass eventName");
            return null;
        }

        if (object['params'] === undefined) {
            console.error("UserEvent did not pass any params");
            return null;
        }

        let event = new AppEvent(object['eventName'], object['params'], sock);
        console.log(event);
        return event;
    } catch (e) {
        console.error("Received UserEvent was not JSON");
        return null;
    }
}