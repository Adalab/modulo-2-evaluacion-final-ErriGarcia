/**
 * GLOBAL VARIABLES
 */

// Use for the home page and search
let favoriteCocktails = []
let cocktails = []
const searchInput = document.querySelector('.js-search-input')
const searchButton = document.querySelector('.js-search-button')
const resetButton = document.querySelector('.js-reset-button')

/**
 * HOME PAGE
 */

fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
    .then(response => response.json())
    .then(data => {
        cocktails = data.drinks
        createTitle('.js-cocktails-title', `Hay ${cocktails.length} cocktails`)
        showCocktailList('.js-cocktails-list', cocktails)
        addOrRemoveCocktailToFavoriteList()
        getCocktailsFromLocalStorage()
    })


/**
 * SEARCH
 */

function handleClickSearchButton() {
    const searchInputValue = searchInput.value
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInputValue}`)
        .then(response => response.json())
        .then(data => {
            cocktails = data.drinks
            createTitle('.js-cocktails-title', `Hay ${cocktails.length} cocktails`)
            showCocktailList('.js-cocktails-list', cocktails)
            addOrRemoveCocktailToFavoriteList()
        })
    
}
searchButton.addEventListener('click', handleClickSearchButton)

/**
 * RESET
 */
function handleClickResetButton() {
    searchInput.value = ""
}
resetButton.addEventListener('click', handleClickResetButton)

/**
 * SAVE COCKTAILS IN LOCAL STORAGE
 */

function saveInLocalStorage() {
    localStorage.setItem('favoriteCocktails', JSON.stringify(favoriteCocktails))
}

/**
 * GET COCKTAILS FROM LOCAL STORAGE
*/
function getCocktailsFromLocalStorage() {
    let favoriteCocktailsStored = JSON.parse(localStorage.getItem('favoriteCocktails'))
    if (favoriteCocktailsStored) {
        favoriteCocktails = favoriteCocktailsStored
        showCocktailList('.js-favorite-cocktails-list', favoriteCocktails)
    }
}

/**
 * REMOVE COCKTAIL FROM LOCAL STORAGE
 */

function removeCocktailFromLocalStorage(cocktail) {
    localStorage.removeItem(cocktail)
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

    if (classList === '.js-favorite-cocktails-list') {
        selected = 'selected'
        favoriteList = '-favorite-list'
    }

    const element = document.querySelector(classList)
    element.innerHTML = ''
    for (const cocktail of cocktailsList) {
        element.innerHTML +=
        `<li>
            <article>
            <img src="${cocktail.strDrinkThumb}" width="100px">
            <div>
                <h4>${cocktail.strDrink}</h4>
                <button class="js-favorite-icon${favoriteList} ${selected}" id="${cocktail.idDrink}">

                </button>

            </div>
            </article>
        </li>`
    }

    if (classList === '.js-favorite-cocktails-list') {
        removeFavoriteCocktail()
    }
}

function addOrRemoveCocktailToFavoriteList() {
    const favoriteButtons = document.querySelectorAll('.js-favorite-icon')

    for (const favoriteButton of favoriteButtons) {
        favoriteButton.addEventListener('click', handleClickFavoriteButton)
    }

    console.log(favoriteButtons, 'favoriteButtons')


    function handleClickFavoriteButton(event) {
        const cocktailId = event.target.id
        const selectedCocktail = cocktails.find(cocktail => cocktail.idDrink === cocktailId)
        const indexFavoriteCocktail = favoriteCocktails.findIndex(cocktail => cocktail.idDrink === cocktailId)

        console.log(event, 'event')

        if (indexFavoriteCocktail === -1) {
            event.target.classList.add('selected')
            favoriteCocktails.push(selectedCocktail)
            saveInLocalStorage()
        } else {
            event.target.classList.remove('selected')
            favoriteCocktails.splice(indexFavoriteCocktail, 1)
            removeCocktailFromLocalStorage(selectedCocktail)
            saveInLocalStorage()
        }

        if (favoriteCocktails.length > 0) {
            createTitle('.js-favorite-cocktails-title', `Hay ${favoriteCocktails.length} cocktails favoritos`)
        } else {
            createTitle('.js-favorite-cocktails-title', 'Añade un cocktail en tu lista de favoritos')
        }
        showCocktailList('.js-favorite-cocktails-list', favoriteCocktails)
    }
}

function removeFavoriteCocktail() {
    const favoriteButtonsInFavoriteList = document.querySelectorAll('.js-favorite-icon-favorite-list')

    for (const favoriteButtoninFavoriteList of favoriteButtonsInFavoriteList) {
        favoriteButtoninFavoriteList.addEventListener('click', handleClickFavoriteButtonInFavoriteList)
    }

    function handleClickFavoriteButtonInFavoriteList(event) {
        const cocktailId = event.target.id

        const indexFavoriteCocktail = favoriteCocktails.findIndex(cocktail => cocktail.idDrink === cocktailId)
        favoriteCocktails.splice(indexFavoriteCocktail, 1)

        const selectedCocktail = document.getElementById(cocktailId)
        selectedCocktail.classList.remove('selected')

        if (favoriteCocktails.length > 0) {
            createTitle('.js-favorite-cocktails-title', `Hay ${favoriteCocktails.length} cocktails favoritos`)
        } else {
            createTitle('.js-favorite-cocktails-title', 'Añade un cocktail en tu lista de favoritos')
        }
        
        showCocktailList('.js-favorite-cocktails-list', favoriteCocktails)
    }
}


'use strict'

// Variables

// const inputSearch = document.querySelector('.js-search-input')
// const margaritaUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita'
// const productsList = document.querySelector('.js-cocktails-list')
// const searchButton = document.querySelector('.js-search-button')
// const favoriteproductsList = document.querySelector('.js-favorite-cocktails-list')


// let productsListData = []
// let favoriteProductsListData = []

// // First: Fetch

// fetch(margaritaUrl)
//     .then(response => response.json())
//     .then(data => {
//         productsListData = data.drinks
//         renderPoductsList(productsListData)
//     })

// // function to show products list
// const renderPoductsList = (productsListData) => {
//     productsList.innerHTML = `<h3>Hay ${productsListData.length} tipos de cocktails</h3>`
//     for (const product of productsListData) {
//         productsList.innerHTML += renderEveryProduct(product)
//     }
//     addEventToIcon()
// }

// // function to show favorite products list
// const renderFavoriteList = (favoriteProductsListData) => {
//     favoriteproductsList.innerHTML = ""
//     favoriteproductsList.innerHTML = `<h3>Hay ${favoriteProductsListData.length} cocktails favoritos</h3>`
//     for (const product of favoriteProductsListData) {
//         favoriteproductsList.innerHTML += renderEveryProduct(product)
//     }
//     addEventToIcon()
// }

// // function to show one product
// const renderEveryProduct = (product) => {
//     let content = 
//     `<li><article>`
//     for(const eachProduct of productsListData) {
//         content += 
//         `<img src="${eachProduct.strDrinkThumb}" width="200">
//             <div>
//                 <h4>${eachProduct.strDrink}</h4>
//                 <a href="#" class="js-favorite-button" id="${eachProduct.idDrink}">
//                     <i class="fa-regular fa-heart"></i>
//                 </a>
//             </div>`
//     }
//     content += `</article></li>`
//     return content
// }


// // function for click search button
// const handleSearchClick = (event) => {
//     event.preventDefault()
//     const inputSearchValue = inputSearch.value.toLowerCase()
//     let newUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearchValue}`
//     fetch(newUrl)
//     .then((response) => response.json())
//     .then((data) => {
//         productsListData = data.drinks
//         renderPoductsList(productsListData)
//     })
// }

// // function for click favorite button
// const handleFavoriteClick = (event) => {
//     event.preventDefault()
//     const idProductSelected = event.currentTarget.id
//     console.log(idProductSelected)
//     event.currentTarget.classList.toggle('selected')
//     console.log(productsListData)
    
//     const selectedProduct = productsListData.find((product) => {
//     product.idDrink === idProductSelected}) // return UNDEFINED !!??
//     console.log(selectedProduct)
        
//     favoriteProductsListData.push(selectedProduct)
//     renderFavoriteList(favoriteProductsListData)
// }

// // function to add event to an array
// function addEventToIcon() {
// const favoriteButtons = document.querySelectorAll('.js-favorite-button')
//     for (const eachFavoriteIcon of favoriteButtons) {
//         eachFavoriteIcon.addEventListener('click', handleFavoriteClick)
//     }
// }


// // Events
// searchButton.addEventListener('click', handleSearchClick)

//# sourceMappingURL=main.js.map
