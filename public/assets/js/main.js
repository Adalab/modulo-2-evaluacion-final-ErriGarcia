'use strict'
// Variables

const inputSearch = document.querySelector('.js-search-input')
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita'
const productsList = document.querySelector('.js-cocktails-list')
const searchButton = document.querySelector('.js-search-button')
const favoriteproductsList = document.querySelector('.js-favorite-cocktails-list')


let productsListData = []
let favoriteProductsListData = []

// First: Fetch

fetch(url)
.then((response) => response.json())
.then((data) => {
    productsListData = data.drinks
    renderPoducts(productsList)
})


// function to show for each product
const renderPoducts = (list) => {
    list.innerHTML = ""
    list.innerHTML = `<h3>Hay ${productsListData.length} tipos de cocktails</h3>`
    for (const eachProduct of productsListData) {

        list.innerHTML += `<li>
        <article>
            <img src="${eachProduct.strDrinkThumb}" width="200">
            <div>
                <h4>${eachProduct.strDrink}</h4>
                <a href="#" class="js-favorite-button" id="${eachProduct.idDrink}">
                    <i class="fa-regular fa-heart"></i>
                </a>
            </div>
        </article>
        </li>` 
    }
    addEventToIcon()
}

// function for click search button
const handleSearchClick = (event) => {
    event.preventDefault()
    const inputSearchValue = inputSearch.value.toLowerCase()
    let newUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearchValue}`
    fetch(newUrl)
    .then((response) => response.json())
    .then((data) => {
        productsListData = data.drinks
        renderPoducts(productsList)
    })
}

// function for click favorite button
const handleFavoriteClick = (event) => {
    event.preventDefault()
    const idProductSelected = event.currentTarget.id
    event.currentTarget.classList.toggle('selected')
    
    const selectedProduct = productsListData.find((product) => {
    product.id === idProductSelected})
    console.log(selectedProduct)
        
    favoriteProductsListData.push(selectedProduct)
    console.log(favoriteProductsListData)
    renderPoducts(favoriteproductsList)
}

// function to add event to an array
function addEventToIcon() {
const favoriteButtons = document.querySelectorAll('.js-favorite-button')
    for (const eachFavoriteIcon of favoriteButtons) {
        eachFavoriteIcon.addEventListener('click', handleFavoriteClick)
    }
}


// Events
searchButton.addEventListener('click', handleSearchClick)

//# sourceMappingURL=main.js.map
