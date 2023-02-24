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
