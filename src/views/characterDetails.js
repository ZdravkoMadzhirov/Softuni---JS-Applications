import { render, html } from "./../../node_modules/lit-html/lit-html.js"
import page from "./../../node_modules/page/page.mjs"

import { getAuthData } from "./../services/auth.js";

const main = document.querySelector('main');

function characterDetailsTemplate(character) {
  return html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${character.imageUrl} alt="example1" />
            <div>
            <p id="details-category">${character.category}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p id="description">
                  ${character.description}
                  </p>
                   <p id ="more-info">
                    ${character.moreInfo}
                    </p>
                </div>
              </div>
              <h3>Is This Useful:<span id="likes">0</span></h3>

            
              <div id="action-buttons">
              ${getAuthData() && character._ownerId === getAuthData()._id
      ? html`
            <a href=${`/edit/${character._id}`} id="edit-btn">Edit</a>
            <a href="" id="delete-btn" @click=${(e) => onDelete(e, character._id)}>Delete</a>
        `
      : ''}
            <a href="" id="like-btn">Like</a>
          </div>
        
            
          </div>
        </section>
    `
}

function onDelete(e, id) {
  e && e.preventDefault();
  if (confirm('Are you sure?')) {
    page.redirect('/delete/' + id)
  }
}

export function characterDetailsView(ctx) {
  render(characterDetailsTemplate(ctx.character), main)
}