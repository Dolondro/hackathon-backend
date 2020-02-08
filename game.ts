export class Game {
    id: string;
    players: any;

    constructor(id: string)
    {
        this.id = id;
    }


    addPlayer(playerId: string)
    {
        this.players.push(playerId);
    }
}