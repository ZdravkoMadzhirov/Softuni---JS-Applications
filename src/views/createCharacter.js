import { render, html } from "./../../node_modules/lit-html/lit-html.js"

import { handleCreateCharacter } from "../services/characters.js";

const main = document.querySelector('main');

function createCharacterTemplate() {
    return html`
        <section id="create">
          <div class="form">
            <img class="border" src="./images/border.png" alt="">
            <h2>Add Character</h2>
            <form class="create-form" @submit=${handleCreateCharacter}>
              <input
                type="text"
                name="category"
                id="category"
                placeholder="Character Type"
              />
              <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL"
              />
              <textarea
              id="description"
              name="description"
              placeholder="Description"
              rows="2"
              cols="10"
            ></textarea>
            <textarea
              id="additional-info"
              name="additional-info"
              placeholder="Additional Info"
              rows="2"
              cols="10"
            ></textarea>
              <button type="submit">Add Character</button>
            </form>
            <img class="border" src="./images/border.png" alt="">
          </div>
        </section>
    `
}

export function createCharacterView(ctx) {
    render(createCharacterTemplate(ctx.characters), main)
}