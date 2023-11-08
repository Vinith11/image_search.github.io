const accessKey = "w5yG83p4NK0NswvzK2Iv7yiwJgzPLzlFuGt9Y3Rv_z4";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = ""
let page = 1;

async function searchImages(){
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=$(page)&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url)
    const data = await response.json()

    const results = data.results

    if (page === 1){
        searchResults.innerHTML = "";
    }

    results.map((result)=>{
        const imageWrappper = document.createElement('div')
        imageWrappper.classList.add("search-result")
        const image = document.createElement('img')

        image.src = result.urls.small
        image.alt = result.alt_description

        const imageLink = document.createElement('a')
        imageLink.href = result.links.innerHTML
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description

        imageWrappper.appendChild(image)
        imageWrappper.appendChild(imageLink)
        imageWrappper.appendChild(imageWrappper)

    });

    page++
    if(page>1){
        showMore.style.display = "block"
    }
}

formEl.addEventListener("submit", (event)=>{
    event.preventDefault()
    page = 1;
    searchImages()
})

showMore.addEventListener("click", ()=>{
    searchImages()
})