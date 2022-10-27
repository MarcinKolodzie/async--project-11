import { Header } from "./Header.js"

import { Button } from "./Button.js"

const DB_URL = 'https://mk--sandbox-default-rtdb.firebaseio.com/counter-2.json'

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
        this.fetchNumber()
    }

    fetchNumber () {
        return fetch(DB_URL)
        .then((r) => r.json())
        .then((numberFromDB) => {
            this.number = numberFromDB
            this.render()
        })
    }

    saveAndRefetch(){
        const newNumber = this.number + 1

        return fetch(DB_URL, {
            method: 'PUT',
            body: JSON.stringify(newNumber)
        })
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

    
}

export default Counter