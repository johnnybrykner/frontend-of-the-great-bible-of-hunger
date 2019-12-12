document.addEventListener('DOMContentLoaded', () => {
    var currentStep = 0;

    fetch('https://api-hungry-bible.azurewebsites.net/api/recipe', {
        headers: {"Content-Type": "application/json"}
    })
    .then(async (response) => { return await response.json()})
    .then(recipes => {
        recipes.forEach(recipe => {
            const recipeWrapper = document.createElement('div');
            const orangeDiv     = document.createElement('div');
            const recipeTitle   = document.createElement('h1');
            const recipeInfo    = document.createElement('div');
            const recipeImage   = document.createElement('img');
            const wrapInfo      = document.createElement('div');
            const recipeTime    = document.createElement('span');
            const recipeRating  = document.createElement('span');
            const starIcon      = document.createElement('img');

            recipesData = recipes

            populateHtml(recipes);

            //append children(FREAK THEM)
            recipeRating.append(starIcon);
            wrapInfo.append(recipeTime, recipeRating);
            recipeInfo.append(recipeImage, wrapInfo);
            orangeDiv.append(recipeTitle);
            recipeWrapper.append(orangeDiv, recipeInfo);

            const mainRecipeDiv = document.getElementById('recipe-page');
            recipeWrapper.addEventListener("click", () => {
                document.querySelector("#recipe-page").classList.remove("displayed");
                document.querySelector("#guide-page").classList.add("displayed");
                document.getElementById('menu__trigger--js').style.display = 'none';
                getRecipeData(recipe.recipeId);
            });
            mainRecipeDiv.append(recipeWrapper);
        });
    });

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
                currentStep ++;
                changeStep();
            };
        });

        document.querySelector(".guide__step-button--decrease").addEventListener("click", () =>  {
            if  (currentStep > 0) {
                currentStep --;
            }
            changeStep();
        });

    };

    function changeStep() {
        console.log(currentStep);
        const allGuideTextContainers = document.querySelectorAll(".guide__text-container");

        let allForRecipeMaking = Array.from(allGuideTextContainers);
        allForRecipeMaking.unshift(document.querySelector(".ingredient__stuff-container"));

        let progressFill = (currentStep/(allForRecipeMaking.length - 1))*100;
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
});