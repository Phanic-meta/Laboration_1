import Abstract from "./Abstract.js";

export default class Mainmenu extends Abstract {
    constructor() {
        super();
    }

    async getHtml() {
        return `
            <h1>Mainmeu</h1>
            <p>
                This is the menu view.
            </p>
        `;
    }
}