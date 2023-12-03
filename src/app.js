import page from "./../node_modules/page/page.mjs"

import { authMiddleware } from "./middlewares/authMiddleware.js";
import { navbarView } from "./views/navbar.js";
import { homeView } from "./views/home.js";
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";
import { logoutView } from "./views/logout.js";
import { getCharacters, getCharacter } from "./services/characters.js";
import { charactersView } from "./views/characters.js";
import { createCharacterView } from "./views/createCharacter.js";
import { characterDetailsView } from "./views/characterDetails.js";
import { editCharacterView } from "./views/edit.js";
import { deleteView } from "./views/delete.js";

page(authMiddleware);
page(navbarView);
page("/", homeView);
page("/login", loginView);
page("/register", registerView);
page("/logout", logoutView);
page("/characters", getCharacters, charactersView);
page("/create", getCharacters, createCharacterView);
page("/characters/:id", getCharacter, characterDetailsView);
page("/edit/:id", getCharacter, editCharacterView)
page("/delete/:id", deleteView)

page.start();