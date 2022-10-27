import { Header } from "./Header.js"

import { Button } from "./Button.js"

export const Counter = class {

    constructor(selector) {
        const container = document.querySelector(selector)

        if (!container) throw new Error('Container element not found')

        this.selector = selector
        this.container = container
        this.number = 0
    }

    innit() {
        this.render()
    }

    render() {
        this.container.innerText = ''

        const h1 = new Header(this.number)
        const button = new Button('+', () => this.inc())

        this.container.appendChild(h1.render())
        this.container.appendChild(button.render())
    }

    inc() {
        this.number = this.number + 1
        this.render()
    }

    statu() {
        console.log('Current number is: ' + this.number)
        return this.number
    }

    toString() {
        return 'Current number is: ' + this.number
    }

    valueOf() {
        return this.number
    }
}

export default Counter