// Configuration for the sliders
// * type of slider
// * number of items per slide
// * make item in the center active item
const small__conf = {
    type: 'carousel',
    perView: 3,
    focusAt: 'center',
    startAt: 0
}
const big__conf = {
    type: 'carousel',
    perView: 5,
    focusAt: 'center',
    startAt: 0
}

let selectedFilters = {
    type: "all",
    time: "all",
    cuisine: "all",
    diet: "all",
};

var mainRecipeDiv = document.getElementById('recipe-page');
var currentStep = 0;


// Create meal slider
let mealType = new Glide('.glide', small__conf)
mealType.on('swipe.end', function () {
    console.log(mealType)
    console.log(mealType._c.Html.slides[mealType.index].childNodes)
    console.log(mealType._c.Html.slides[mealType.index].childNodes[3].innerHTML);
    selectedFilters.type = mealType._c.Html.slides[mealType.index].childNodes[3].innerHTML;
})
mealType.mount();

// Create time slider
let mealTime = new Glide('.glide__time', big__conf);
mealTime.on('swipe.end', function () {
    console.log(mealTime._c.Html.slides[mealTime.index].innerHTML);
    selectedFilters.time = mealTime._c.Html.slides[mealTime.index].innerHTML;
})
mealTime.mount();

// Cuisine slider
let mealCuisine = new Glide('.glide__cuisine', small__conf)
mealCuisine.on('swipe.end', function () {
    console.log(mealCuisine._c.Html.slides[mealCuisine.index].innerHTML);
    selectedFilters.cuisine = mealCuisine._c.Html.slides[mealCuisine.index].innerHTML;
})
mealCuisine.mount();

// Diet slide
let mealDiet = new Glide('.glide__diet', small__conf)
mealDiet.on('swipe.end', function () {
    console.log(mealDiet._c.Html.slides[mealDiet.index].innerHTML);
    selectedFilters.diet = mealDiet._c.Html.slides[mealDiet.index].innerHTML;
})
mealDiet.mount();

// Creating menu open/close function
var menuButton = document.getElementById('menu__trigger--js');
let filterMenu = document.getElementById('filter__trigger--js');
let submitButton = document.getElementById('submit-fliter--js'); // Hide if menu is not open

menuButton.addEventListener('click', () => {
    filterMenu.classList.add('menu__opened');
    filterMenu.style.bottom = "0%";
    submitButton.style.display = "flex";
})

submitButton.addEventListener('click', () => {
    filterMenu.classList.remove('menu__opened');
    filterMenu.style.bottom = "-10%";
    submitButton.style.display = "none";

    filterRecipes(recipesData);
})

function populateHtml(recipes) {
    recipes.forEach(recipe => {
        // console.log(recipe);
        const recipeWrapper = document.createElement('div');
        const orangeDiv = document.createElement('div');
        const recipeTitle = document.createElement('h1');
        const recipeInfo = document.createElement('div');
        const recipeImage = document.createElement('img');
        const wrapInfo = document.createElement('div');
        const recipeTime = document.createElement('span');
        const recipeRating = document.createElement('span');
        const starIcon = document.createElement('img');


        // adding classes
        recipeWrapper.classList.add('recipe');
        orangeDiv.classList.add('recipe__orange');
        recipeTitle.classList.add('recipe__title');
        recipeInfo.classList.add('recipe__info');
        recipeImage.classList.add('recipe__info-photo');
        wrapInfo.classList.add('wrap-info');
        recipeTime.classList.add('recipe__info-time');
        recipeRating.classList.add('recipe__rating');
        starIcon.src = "/imagesandicons/star__icon.svg";
        recipeImage.src = "/imagesandicons/food-plate.png";
        // attach data
        recipeTitle.innerText = recipe.title;
        recipeTime.innerText = `~ ${recipe.time}min`;
        recipeRating.innerText = `${recipe.rating.stars}(${recipe.rating.reviewsNumber})`;
        recipeWrapper.setAttribute("data-recipe-id", recipe.recipeId);

        recipeWrapper.addEventListener("click", () => {
            document.querySelector("#recipe-page").classList.remove("displayed");
            document.querySelector("#guide-page").classList.add("displayed");
            document.getElementById('menu__trigger--js').style.display = 'none';
            getRecipeData(recipe.recipeId);
        });

        //append children(FREAK THEM)
        recipeRating.append(starIcon);
        wrapInfo.append(recipeTime, recipeRating);
        recipeInfo.append(recipeImage, wrapInfo);
        orangeDiv.append(recipeTitle);
        recipeWrapper.append(orangeDiv, recipeInfo);
        mainRecipeDiv.append(recipeWrapper);
    });
}

function filterRecipes(recipes) {
    filteredRecipes = recipes;

    if (selectedFilters.type !== "all") {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.dishType.name.toLowerCase() == selectedFilters.type.toLowerCase())
    }

    if (selectedFilters.cuisine !== "all") {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.cuisine.name.toLowerCase() == selectedFilters.cuisine.toLowerCase())
    }

    if (selectedFilters.time !== "all") {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.time <= Number(selectedFilters.time))
    }
    mainRecipeDiv.innerHTML = "";

    populateHtml(filteredRecipes);
}

async function getRecipeData(recipeId) {
    document.querySelector('.guide-content').innerHTML = `
            <div class="guide__container">
                <img src="imagesandicons/chicken.png" alt="" class="guide__img">
                <h1 class="guide__recipe-title">
                    
                </h1>
            </div>

            <div class="guide__progressbar">

            </div>

            <div class="ingredient__stuff-container guide__step-displayed">

            </div>

            <div class="guide__description-container">

            </div>

            <div class="guide__button-container">
                <div class="guide__step-button--decrease">
                    <span class="material-icons guide__arrow-backward">
                        arrow_back
                    </span>
                </div>

                <div class="guide__step-button--increase">
                    <span class="material-icons guide__arrow-forward">
                        arrow_forward
                    </span>
                </div>
            </div>
        `;
    const baseUrl = "https://api-hungry-bible.azurewebsites.net/api/recipe";
    currentStep = 0;

    setBarry(0);


    const fetchedRecipeGuides = await fetch(`${baseUrl}/${recipeId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const realFetchedRecipeGuides = await fetchedRecipeGuides.json();

    document.querySelector(".guide__recipe-title").innerText = realFetchedRecipeGuides.title;

    realFetchedRecipeGuides.recipeIngredients.forEach(randomObjectWithoutName => {
        document.querySelector('.ingredient__stuff-container').innerHTML += `
            <div class="ingredient__ingredients-container guide__step-displayed ${randomObjectWithoutName.ingredient.type}">
                <div>
                    <h1>${randomObjectWithoutName.ingredient.name}</h1>
                </div>

                <div>
                    <p>${randomObjectWithoutName.ingredient.type}</p>
                </div>        
            </div>
            `;
    });

    realFetchedRecipeGuides.recipeRecipeSteps.forEach(randomStepWithoutName => {
        document.querySelector('.guide-content').innerHTML += `
            <div class="guide__text-container">
                <div>
                    <h1>${randomStepWithoutName.recipeStep.recipeStepId}</h1>
                </div>
        
                <div>
                    <p>${randomStepWithoutName.recipeStep.recipeStepDescription}</p>
                </div>     
            </div>
            `;
    });

    document.querySelector(".guide__step-button--increase").addEventListener("click", () => {
        if (currentStep < realFetchedRecipeGuides.recipeRecipeSteps.length) {
            currentStep++;
            changeStep();
        };
    });

    document.querySelector(".guide__step-button--decrease").addEventListener("click", () => {
        if (currentStep > 0) {
            currentStep--;
        }
        changeStep();
    });

};

function changeStep() {
    console.log(currentStep);
    const allGuideTextContainers = document.querySelectorAll(".guide__text-container");

    let allForRecipeMaking = Array.from(allGuideTextContainers);
    allForRecipeMaking.unshift(document.querySelector(".ingredient__stuff-container"));

    let progressFill = (currentStep / (allForRecipeMaking.length - 1)) * 100;
    setBarry(progressFill);

    for (var amountOfTimesItHasRun = 0; amountOfTimesItHasRun < allForRecipeMaking.length; amountOfTimesItHasRun++) {
        allForRecipeMaking[amountOfTimesItHasRun].classList.remove("guide__step-displayed");
    };
    allForRecipeMaking[currentStep].classList.add("guide__step-displayed");
};

function setBarry(percentage) {
    var limited = percentage;
    var limitedPercentage = limited.toFixed(0);
    let barry = document.querySelector(".guide__progressbar");
    barry.style.setProperty('--fill', percentage + '%');
    barry.innerText = limitedPercentage + '%';
};