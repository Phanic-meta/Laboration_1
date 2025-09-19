import Abstract from "./Abstract.js";

export default class Gameview extends Abstract {
    constructor() {
        super();
    }

    async getHtml() {
        return `
            <div id="game-canvas">
                <p>Hello World</p>
            </div>
    
            <div id="game-dashboard">
                <div id="game-scoreboard">
                    <p> 999 points</p>
                </div>
    
                <div id="game-timer">
                    <p> 12:23 sec</p>
                </div>
            </div>
        `;
    }
}