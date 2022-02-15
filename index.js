const searchForm = document.querySelector('form')
const searchResultDiv = document.querySelector('.search-result')
const container = document.querySelector('.container')
let searchQuery = ''
const APP_ID = '988f672d'
const APP_KEY = 'c119d24ccfc7ac64c474ba615973a967'

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    searchQuery = e.target.querySelector('input').value
    fetchAPI()
})

async function fetchAPI () {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`
    const response = await fetch(baseURL)
    const data = await response.json()
    generateHTML(data.hits)
    console.log(data)
}

function generateHTML(result) {
    let generatedHTML = '';
    result.map(result => {
        generatedHTML +=
        `
        <div class="item">
                    <img src="${result.recipe.image}" alt="">
                    <div class="flex-container">
                        <h1 class="title">${result.recipe.label}</h1>
                        <a href="${result.recipe.url}" target="_blank" class="view-button">View Recipe</a>
                    </div>
                    <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
                    <p class="item-data">Diet Label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels.dietLabels : 'No Data Found'}</p>
                    <p class="item-data">Health Label: ${result.recipe.healthLabels}</p>
                </div>
        `
    })

    searchResultDiv.innerHTML = generatedHTML
}