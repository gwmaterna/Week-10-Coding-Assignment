
class Favorite {
    constructor(name, reason) {
        this.name = name;
        this.reason = reason;        
    }
}

class Game {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.favorites = [];
    }
    addFavorite(favorite) {
        this.favorites.push(favorite);
    }

    // deleteFavorite(favorite) {
    //     let index = this.favorites.indexOf(favorite);
    //     this.favorites.splice(index, 1);
    // }

}

let games = [];
let gameId = 0;

onclick('new-game', () => {
    games.push(new Game(gameId++, getValue('new-game-name')));
    drawDOM();
});

function onclick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

function getValue(id) {
    return document.getElementById(id).value;
}

function drawDOM() {
    let gameDiv = document.getElementById('games');
    clearElement(gameDiv);
    for (game of games) {
        let table = createGameTable(game);
        let title = document.createElement('h2');
        title.innerHTML = game.name;

        // title.appendChild(createDeleteGameButton(game));

        gameDiv.appendChild(title);
        gameDiv.appendChild(table);
        for (favorite of game.favorites) {
            createFavoriteRow(game, table, favorite);
        }
    }
}

function createFavoriteRow(game, table, favorite) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = favorite.name;
    row.insertCell(1).innerHTML = favorite.reason;
    let actions = row.insertCell(2);

    // actions.appendChild(createDeleteRowButton(game, favorite));

}


// function createDeleteRowButton(game, favorite) {
//     let btn = document.createElement('button');
//     btn.className = 'btn btn-primary';
//     btn.innerHTML = 'Delete';
//     btn.onclick = () => {
//         let index = game.favorites.indexOf(favorite);
//         game.favorites.splice(index, 1);
//         drawDOM();
//     }
//     return btn;
// }


// function createDeleteGameButton(game) {
//     let btn = document.createElement('button');
//     btn.className = 'btn btn-primary';
//     btn.innerHTML = 'Delete Game';
//     btn.onclick = () => {
//         let index = games.indexOf(game);
//         games.splice(index, 1);
//         drawDOM();
//     };
//     return btn;
// }


function createNewFavoriteButton(game) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        game.favorites. push(new Favorite(getValue(`name-input-${game.id}`), getValue(`reason-input-${game.id}`)));
        drawDOM();
    };
    return btn;
}

function createGameTable(game) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let reasonColumn = document.createElement('th');
    nameColumn.innerHTML = 'Your Name';
    reasonColumn.innerHTML = 'Reason';
    row.appendChild(nameColumn);
    row.appendChild(reasonColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let reasonTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${game.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let reasonInput = document.createElement('input');
    reasonInput.setAttribute('id', `reason-input-${game.id}`);
    reasonInput.setAttribute('type', 'text');
    reasonInput.setAttribute('class', 'form-control');
    let newFavoriteButton = createNewFavoriteButton(game);
    nameTh.appendChild(nameInput);
    reasonTh.appendChild(reasonInput);
    createTh.appendChild(newFavoriteButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(reasonTh);
    formRow.appendChild(createTh);
    return table;
}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}