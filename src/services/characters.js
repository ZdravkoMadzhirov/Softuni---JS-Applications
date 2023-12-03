import page from "./../../node_modules/page/page.mjs"

import { charactersURL, createCharacterURL } from "./../constants/index.js";
import { getAuthData } from "./auth.js"

export function getCharacters(ctx, next) {
    fetch(charactersURL)
        .then((res) => res.json())
        .then((data) => {
            ctx.characters = data;
            next();
        })
}

export function getCharacter(ctx, next) {
    fetch(`${createCharacterURL}/${ctx.params.id}`)
        .then((res) => res.json())
        .then((data) => {
            ctx.character = data;
            next();
        })
}

export function handleCreateCharacter(e) {
    e && e.preventDefault();
    const formData = new FormData(e.target);
    const category = formData.get('category');
    const imageUrl = formData.get('image-url');
    const description = formData.get('description');
    const moreInfo = formData.get('additional-info');

    if (!category || !imageUrl || !description || !moreInfo) {
        return alert('All fields are required');
    }

    const body = {
        category,
        imageUrl,
        description,
        moreInfo
    }

    createCharacter(body)
        .then(() => {
            page.redirect('/characters')
        })
        .catch((err) => {
            alert(err.message)
        })
}

function createCharacter(body) {
    return fetch(createCharacterURL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': `${getAuthData().accessToken}`
        },
        body: JSON.stringify(body)
    })
}

export function handleEditCharacter(e, id) {
    e && e.preventDefault();
    const formData = new FormData(e.target);
    const category = formData.get('category')
    const imageUrl = formData.get('image-url');
    const description = formData.get('description')
    const moreInfo = formData.get('additional-info')

    if (!imageUrl || !category || !description || !moreInfo) {
        return alert('All fields are required');
    }

    const body = {
        category,
        imageUrl,
        description,
        moreInfo
    }

    editProduct(body, id)
        .then(() => {
            page.redirect(`/characters/${id}`)
        })
        .catch((err) => {
            alert(err.message)
        })
}

function editProduct(body, id) {
    return fetch(`${createCharacterURL}/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': `${getAuthData().accessToken}`
        },
        body: JSON.stringify(body)
    })
}

export function deleteCharacter(id) {
    return fetch(`${createCharacterURL}/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': `${getAuthData().accessToken}`
        }
    })
}