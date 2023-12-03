import { render, html } from "./../../node_modules/lit-html/lit-html.js"

import { handleEditCharacter } from "./../services/characters.js";

const main = document.querySelector('main');

function editCharacterTemplate(character) {
    return html`
          <section id="edit">
          <div class="form">
            <img class="border" src="./images/border.png" alt="">
            <h2>Edit Character</h2>
            <form class="edit-form" @submit=${(e) => handleEditCharacter(e, character._id)}>
              <input
              type="text"
              name="category"
              id="category"
              placeholder="Character Type"
              value=${character.category}
            />
            <input
              type="text"
              name="image-url"
              id="image-url"
              placeholder="Image URL"
              value=${character.imageUrl}
            />
            <textarea
            id="description"
            name="description"
            placeholder="Description"
            rows="2"
            cols="10"
          >${character.description}</textarea>
          <textarea
            id="additional-info"
            name="additional-info"
            placeholder="Additional Info"
            rows="2"
            cols="10"
          >${character.moreInfo}</textarea>
              <button type="submit">Edit</button>
            </form>
            <img class="border" src="./images/border.png" alt="">
          </div>
        </section>
    `
}

export function editCharacterView(ctx) {
    render(editCharacterTemplate(ctx.character), main)
}