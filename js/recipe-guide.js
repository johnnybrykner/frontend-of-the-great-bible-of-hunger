document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = "https://api-hungry-bible.azurewebsites.net/api/recipe/1";

    var currentStep = 0;
    setBarry(0);

    (async function getRecipeData() {
        const fetchedRecipeGuides = await fetch(baseUrl, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const realFetchedRecipeGuides = await fetchedRecipeGuides.json();

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

    })();

    function changeStep() {
        const allGuideTextContainers = document.querySelectorAll(".guide__text-container");

        let allForRecipeMaking = Array.from(allGuideTextContainers);
        allForRecipeMaking.unshift(document.querySelector(".ingredient__stuff-container"));

        let progressFill = (currentStep/(allForRecipeMaking.length - 1))*100;
        setBarry(progressFill);

        for (var amountOfTimesItHasRun = 0; amountOfTimesItHasRun < allForRecipeMaking.length; amountOfTimesItHasRun++) {
            allForRecipeMaking[amountOfTimesItHasRun].classList.remove("guide__step-displayed");
        };
        allForRecipeMaking[currentStep].classList.add("guide__step-displayed");
    }

    function setBarry(percentage) {
        var limited = percentage;
        var limitedPercentage = limited.toFixed(0);
        let barry = document.querySelector(".guide__progressbar");
        barry.style.setProperty('--fill', percentage + '%');
        barry.innerText = limitedPercentage + '%';
    }
    
});