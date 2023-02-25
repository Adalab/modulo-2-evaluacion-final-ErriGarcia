/**
 * HOME PAGE
 */

fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
    .then(response => response.json())
    .then(data => {
        const cocktails = data.drinks
        createTitle('.js-cocktails-title', `Hay ${cocktails.length} cocktails`)
        showCocktailList('.js-cocktails-list', cocktails)

        const favoriteButtons = document.querySelectorAll('.js-favorite-icon')




        const favoriteCocktails = []

        function handleClickFavoriteButton(event) {
            const cocktailId = event.target.id
            event.target.classList.toggle('selected')
            const selectedCocktail = cocktails.find(cocktail => cocktail.idDrink === cocktailId)

            const indexFavoriteCocktail = favoriteCocktails.findIndex(cocktail => cocktail.idDrink === cocktailId)
            console.log(indexFavoriteCocktail)

            if (indexFavoriteCocktail === -1) {
                favoriteCocktails.push(selectedCocktail)
            } else {
                favoriteCocktails.splice(indexFavoriteCocktail, 1)
            }
            createTitle('.js-favorite-cocktails-title', `Hay ${favoriteCocktails.length} cocktails favoritos`)
            for (const favoriteCocktail of favoriteCocktails) {
                showCocktailList('.js-favorite-cocktails-list', favoriteCocktails)
            }
        }

        for (const favoriteButton of favoriteButtons) {
            favoriteButton.addEventListener('click', handleClickFavoriteButton)
        }

    })


/**
 * SEARCH
 */

const searchButton = document.querySelector('.js-search-button')

function handleClickSearchButton() {
    const searchInput = document.querySelector('.js-search-input')
    const searchInputValue = searchInput.value
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInputValue}`)
        .then(response => response.json())
        .then(data => {
            const cocktails = data.drinks
            createTitle('.js-cocktails-title', `Hay ${cocktails.length} cocktails`)
            showCocktailList('.js-cocktails-list', cocktails)
        })
    
}

searchButton.addEventListener('click', handleClickSearchButton)

/**
 * FAVORITE
 */





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
    const element = document.querySelector(classList)
    element.innerHTML = ""
    for (const cocktail of cocktailsList) {
        element.innerHTML +=
        `<li>
            <article>
            <img src="${cocktail.strDrinkThumb}" width="100px">
            <div>
                <h4>${cocktail.strDrink}</h4>
                <button class="js-favorite-icon" id="${cocktail.idDrink}">
                    <i class="fa-regular fa-heart"></i>
                </button>
            </div>
            </article>
        </li>`
    }
}