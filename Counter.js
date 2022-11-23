import { Header } from "./Header.js"

import { Button } from "./Button.js"

const DB_URL = 'https://mk--sandbox-default-rtdb.firebaseio.com/counter-2.json'

export const Counter = class {

    constructor(selector) {
        const container = document.querySelector(selector)

        if (!container) throw new Error('Container element not found')

        this.selector = selector
        this.container = container
        this.isLoading = true
        this.number = 0
    }

    innit() {
        this.render()
        this.fetchNumber()
    }

    fetchNumber() {
        this.isLoading = true

        return fetch(DB_URL)
            .then((r) => r.json())
            .then((numberFromDB) => {
                this.number = numberFromDB
                this.isLoading = false
                this.render()
            })
    }

    incAndRefetch() {
        this.isLoading = true

        const newNumber = this.number + 1

        return fetch(DB_URL, {
            method: 'PUT',
            body: JSON.stringify(newNumber)
        }).then(() => this.fetchNumber())
    }

    render() {
        this.container.innerText = ''

        const h1 = new Header(this.isLoading ? '...' : this.number)
        const button = new Button('+', () => this.inc(), this.isLoading)

        this.container.appendChild(h1.render())
        this.container.appendChild(button.render())

    }

    inc() {
        this.incAndRefetch()
        this.render()
    }


}

export default Counter