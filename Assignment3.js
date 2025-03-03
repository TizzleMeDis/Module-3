document.addEventListener("DOMContentLoaded", function() {
    const submitButton = document.getElementById("submit-btn");
    const pokemonInput = document.getElementById("input-pokemon");
    const pokemonContainer = document.getElementById("pokemon-container");

    submitButton.addEventListener('click', async function() {
        clearStyles(pokemonContainer)
        if (pokemonInput.value == "") {
            alert("Enter a Pokemon")
        } else {
            let pokeContainerColor = ''
            const pokemonPicture = document.createElement('img')
            const pokemonInfo = document.createElement('div')
            const pokemonName = document.createElement('label')
            const pokemonStats = document.createElement('div')
            const pokemonType = document.createElement('div')

            try {
                let data = await loadPokeData(pokemonInput.value)
                console.log(data)
                pokemonName.innerHTML = `Name: ${data.name}`
                pokemonPicture.src = data.sprites.front_default

                // const sound = new Audio(`${data.cries.latest}`) //Initialization of JS sound object
                // sound.volume = 0.01 // Got my ears blown out from this
                // sound.play() // To play the sound of the pokemon but super loud {USE CAREFULLY}

                data.types[0].type.name == "normal" ? pokeContainerColor = 'light' : appendStyles(pokemonContainer, data.types[0].type.name) // determine background color for pokemon type
                pokemonStats.innerHTML = "<label class='mt-2'>Stats: </label>"
                for(let i = 0; i < data.stats.length; i++)
                    pokemonStats.innerHTML += `<div class="m-0 p-0">${data.stats[i].stat.name}: ${data.stats[i].base_stat}</div>`
                    
                pokemonType.innerHTML = `<label class="mt-2">Type: ${data.types[0].type.name}</label>`
                pokemonContainer.classList = `container d-flex flex-row justify-content-around m-4 p-2 bg-${pokeContainerColor} m-4 w-75`
                pokemonContainer.innerHTML = ""
                pokemonPicture.classList = "w-50"

                pokemonInfo.appendChild(pokemonName)
                pokemonInfo.appendChild(pokemonStats)
                pokemonInfo.appendChild(pokemonType)
                pokemonContainer.appendChild(pokemonPicture)
                pokemonContainer.appendChild(pokemonInfo)
            } catch(error) {
                clearStyles(pokemonContainer)
                throw new Error(`Seems to be an error...\n${error}`)
            }
        } 
    }) 
})

function clearStyles(container) {
    container.innerHTML = ""
    container.classList = ""
    container.style = ""
}

function appendStyles(container, name) {
    switch (name) {
        case "electric":
            container.style = "background-color: rgb(255, 204, 51);"
            break
        case "fire":
            container.style = "background-color: rgb(255, 68, 34); color: white;"
            break
        case "grass":
            container.style = "background-color: rgb(119, 204, 85)"
            break
        case "water":
            container.style = "background-color: rgb(51, 153, 255);"
            break
        case "rock":
            container.style = "background-color: rgb(221, 187, 85)"
            break
        case "fighting":
            container.style = "background-color: rgb(187, 85, 68); color: white;"
            break
        case "bug":
            container.style = "background-color: rgb(170, 187, 34);"
            break
        case "flying":
            container.style = "background-color: rgb(136, 153, 255)"
            break
        case "ghost":
            container.style = "background-color: rgb(102, 102, 187); color: white;"
            break
        case "dark":
            container.style = "background-color: rgb(119, 85, 68); color: white;"
            break
        case "psychic":
            container.style = "background-color: rgb(255, 85, 153);"
            break
        case "dragon":
            container.style = "background-color: rgb(119, 102, 238); color:white;"
            break
        case "ice":
            container.style = "background-color: rgb(102, 204, 255);"
            break
        case "steel":
            container.style = "background-color: rgb(102, 102, 187); color: white;"
            break
        default:
            container.style = ''
            break
    }
}

async function loadPokeData(input) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`)
    const data = await response.json()
    return data
}