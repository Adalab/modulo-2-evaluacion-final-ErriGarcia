/**
 * GLOBAL VARIABLES
 */

// Use for the home page and search
let favoriteCocktails = []
let cocktails = []
const searchInput = document.querySelector('.js-search-input')
const searchButton = document.querySelector('.js-search-button')
const resetButton = document.querySelector('.js-reset-button')
const removeFavoriteListButton = document.querySelector('.js-remove-favorite-cocktail-list')
const errorElement = document.querySelector('.js-error-message')

searchCocktails()

/**
 * EVENTS LISTENERS
 */

function handleClickSearchButton() {
    searchCocktails()
}
searchButton.addEventListener('click', handleClickSearchButton)

function handleEnterKeyPress(event) {
    if (event.key === "Enter") {
        event.preventDefault()
        searchCocktails()
    }
}
searchInput.addEventListener('keypress', handleEnterKeyPress)

function handleClickResetButton() {
    searchInput.value = ""
    handleClickRemoveFavoriteListButton()
}
resetButton.addEventListener('click', handleClickResetButton)

/**
 * GET COCKTAILS FROM LOCAL STORAGE
*/
function getCocktailsFromLocalStorage() {
    let favoriteCocktailsStored = JSON.parse(localStorage.getItem('favoriteCocktails'))
    if (favoriteCocktailsStored) {
        favoriteCocktails = favoriteCocktailsStored
        createTitle('.js-favorite-cocktails-title', `Hay ${favoriteCocktails.length} cocktails favoritos`)
        showCocktailList('.js-favorite-cocktails-list', favoriteCocktails)
    }
}

/**
 * SHOW ERROR MESSAGE
 */
function showErrorMessage() {
    errorElement.classList.remove('hidden')
}

/**
 * REMOVE ERROR MESSAGE
 */
function removeErrorMessage() {
    errorElement.classList.add('hidden')
}

/**
 * GENERAL FUNCTIONTS
 */

/**
 * Receives a text and a class and create a title
 * 
 * @param {*} listClassSelector element's class in which you want to show the title
 * @param {*} textTitle text for the title
 */
function createTitle(listClassSelector, textTitle) {
    const element = document.querySelector(listClassSelector)
    element.innerHTML = textTitle
}

/**
 * Receives a class and a cocktail list you want to show
 * 
 * @param {*} classList element's class in which you want to add the cocktails
 * @param {*} cocktailsList list of cocktails you want to show
 */
function showCocktailList(classList, cocktailsList) {
    let selected = ''
    let favoriteList = ''

    // add class selected to all button in favorite cocktail list
    if (classList === '.js-favorite-cocktails-list') {
        selected = 'selected'
        favoriteList = '-favorite-list'
    }

    const element = document.querySelector(classList)
    element.innerHTML = ''
    for (const cocktail of cocktailsList) {
        if (!cocktail.strDrinkThumb) {
            cocktail.strDrinkThumb = `https://via.placeholder.com/210x295/ffffff/666666/?text=${cocktail.strDrink}`
        }
        
        let paragraph = ''
        if (cocktail.strAlcoholic === 'Non alcoholic') {
            paragraph = "No es alcolico"
        } else {
            paragraph = "Es alcolico"
        }

        element.innerHTML +=
        `<li class="main-container-section-cocktails-list-main-list-li">
            <article class="main-container-section-cocktails-list-main-list-li-article">
            <img class="cocktail-img" src="${cocktail.strDrinkThumb}">
            <div class="main-container-section-cocktails-list-main-list-li-container">
                <h4>${cocktail.strDrink}</h4>
                <p>${paragraph}</p>
                <ion-icon name="heart" class="js-favorite-icon${favoriteList} ${selected} favorite-button" id="${cocktail.idDrink}">
                </ion-icon>
            </div>
            </article>
        </li>`
    }
    
    // add event listeners just to button in favorite cocktail list
    if (classList === '.js-favorite-cocktails-list') {
        removeFavoriteCocktail()
    }
}

function addOrRemoveCocktailToFavoriteList() {
    const favoriteButtons = document.querySelectorAll('.js-favorite-icon')

    for (const favoriteButton of favoriteButtons) {
        favoriteButton.addEventListener('click', handleClickFavoriteButton)
    }


    function handleClickFavoriteButton(event) {
        const cocktailId = event.target.id
        const selectedCocktail = cocktails.find(cocktail => cocktail.idDrink === cocktailId)
        const indexFavoriteCocktail = favoriteCocktails.findIndex(cocktail => cocktail.idDrink === cocktailId)

        if (indexFavoriteCocktail === -1) {
            event.target.classList.add('selected')
            favoriteCocktails.push(selectedCocktail)
            // show button to reset the list favorite
            removeFavoriteListButton.classList.remove('hidden')
        } else {
            event.target.classList.remove('selected')
            favoriteCocktails.splice(indexFavoriteCocktail, 1)
        }

        if (favoriteCocktails.length > 0) {
            createTitle('.js-favorite-cocktails-title', `Hay ${favoriteCocktails.length} cocktails favoritos`)
            removeFavoriteListButton.classList.remove('hidden')
        } else {
            createTitle('.js-favorite-cocktails-title', 'Añade un cocktail en tu lista de favoritos')
            removeFavoriteListButton.classList.add('hidden')
        }
        showCocktailList('.js-favorite-cocktails-list', favoriteCocktails)
        localStorage.setItem('favoriteCocktails', JSON.stringify(favoriteCocktails))
    }
}

/**
 * Function that allows favorite cocktails to be unselected thanks to the button
 */
function removeFavoriteCocktail() {
    const favoriteButtonsInFavoriteList = document.querySelectorAll('.js-favorite-icon-favorite-list')

    for (const favoriteButtoninFavoriteList of favoriteButtonsInFavoriteList) {
        favoriteButtoninFavoriteList.addEventListener('click', handleClickFavoriteButtonInFavoriteList)
    }

    function handleClickFavoriteButtonInFavoriteList(event) {
        const cocktailId = event.target.id

        // find cocktail by Id
        const favoriteCocktail = favoriteCocktails.find(cocktail => cocktail.idDrink === cocktailId)

        const indexFavoriteCocktail = favoriteCocktails.findIndex(cocktail => cocktail.idDrink === cocktailId)
        favoriteCocktails.splice(indexFavoriteCocktail, 1)

        const selectedButtonCocktail = document.getElementById(cocktailId)
        selectedButtonCocktail.classList.remove('selected')

        if (favoriteCocktails.length > 0) {
            createTitle('.js-favorite-cocktails-title', `Hay ${favoriteCocktails.length} cocktails favoritos`)
        } else {
            createTitle('.js-favorite-cocktails-title', 'Añade un cocktail en tu lista de favoritos')
            removeFavoriteListButton.classList.add('hidden')
        }
        
        showCocktailList('.js-favorite-cocktails-list', favoriteCocktails)
        localStorage.setItem('favoriteCocktails', JSON.stringify(favoriteCocktails))
    }
}

function searchCocktails() {
    let searchInputValue = "margarita"

    if (searchInput.value) {
        searchInputValue = searchInput.value
    } else {
        showErrorMessage()
    }

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInputValue}`)
        .then(response => response.json())
        .then(data => {
            cocktails = data.drinks
            if (!cocktails) {
                showErrorMessage()
            } else {
                createTitle('.js-cocktails-title', `Hay ${cocktails.length} cocktails`)
                showCocktailList('.js-cocktails-list', cocktails)
                addOrRemoveCocktailToFavoriteList()
                getCocktailsFromLocalStorage()
                keepCocktailsSelected()
                removeErrorMessage()
            }
        })
}

function handleClickRemoveFavoriteListButton() {
    localStorage.removeItem('favoriteCocktails')
    favoriteCocktails = []
    createTitle('.js-favorite-cocktails-title', 'Añade un cocktail en tu lista de favoritos')
    showCocktailList('.js-favorite-cocktails-list', favoriteCocktails)
    removeFavoriteListButton.classList.add('hidden')

    // Select all favorite button in main list to remove the class 'selected'
    const favoriteButtons = document.querySelectorAll('.js-favorite-icon')
    for (const favoriteButton of favoriteButtons) {
        favoriteButton.classList.remove('selected')
    }    
}
removeFavoriteListButton.addEventListener('click', handleClickRemoveFavoriteListButton)

function keepCocktailsSelected() {
    const cocktailsInLocalStorage = JSON.parse(localStorage.getItem('favoriteCocktails'))
    if (cocktailsInLocalStorage) {
        const cocktailsIds = cocktailsInLocalStorage.map(cocktail => cocktail.idDrink)

        for (const cocktailId of cocktailsIds) {
            const element = document.getElementById(cocktailId)
            element.classList.add('selected')
            removeFavoriteListButton.classList.remove('hidden')
        }
    }
}

const buttonLog = document.querySelector('.js-log')

function handleClickButtonLog(event) {
    console.log(event)
    for (const cocktail of cocktails) {
        console.log(cocktail.strDrink)
    }
}

buttonLog.addEventListener('click', handleClickButtonLog)
//# sourceMappingURL=main.js.map
