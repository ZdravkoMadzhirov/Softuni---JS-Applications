import page from './../../node_modules/page/page.mjs'

import { deleteCharacter } from '../services/characters.js'

export function deleteView(ctx) {
    deleteCharacter(ctx.params.id)
        .then(() => {
            page.redirect('/characters')
        })
        .catch((err) => {
            alert(err.message)
        })
}
