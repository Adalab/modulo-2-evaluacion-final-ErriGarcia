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
