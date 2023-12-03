import { render, html } from "./../../node_modules/lit-html/lit-html.js"

const main = document.querySelector('main');

function characterTemplate(character) {
    return html`
    <div class="character">
  <img src=${character.imageUrl} alt="example1" />
  <div class="hero-info">
    <h3 class="category">${character.category}</h3>
    <p class="description">${character.description}</p>
    <a class="details-btn" href=${`/characters/${character._id}`}>More Info</a>
  </div>
    `
}

function charactersSection(characters) {
    return html`
       <section id="characters">
        ${characters.map((character) => characterTemplate(character))}
        </section>
    `
}

function charactersTemplate(characters) {
    return html`
        <h2>Characters</h2>
        ${characters && characters.length > 0 ? charactersSection(characters) : html`<h2>No added Heroes yet.</h2>`}

    `
}

export function charactersView(ctx) {
    render(charactersTemplate(ctx.characters), main)
}