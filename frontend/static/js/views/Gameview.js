import Abstract from "./Abstract.js";

export default class Gameview extends Abstract {
    constructor() {
        super();
    }

    async getHtml() {
        return `
            <div class="popover" popover id="container-settings">
                <button popovertarget="container-settings" popovertargetaction="hide"></button>
                <form id="settings-form">
                    <li>
                        <input type="radio" name="time" value="20" id="20 sec"/>
                        <label for="20 sec">20 sec:</label>
                        <input type="radio" name="time" value="40" id="40 sec"/>
                        <label for="40 sec">40 sec:</label>
                        <input type="radio" name="time" value="60" id="60 sec"/>
                        <label for="60 sec">60 sec:</label>
                    </li>
                    <input type="submit" value="Save Settings" onclick="setSettings()">
                </form>
    
            </div>
            <div class="popover" popover id="container-highscore">
                <button popovertarget="container-highscore" popovertargetaction="hide"></button>
                <p>World Hello</p>
            </div>
    
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