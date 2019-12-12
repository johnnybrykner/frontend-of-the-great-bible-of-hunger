document.addEventListener('DOMContentLoaded', () => {

    fetch('https://api-hungry-bible.azurewebsites.net/api/recipe', {
        headers: {"Content-Type": "application/json"}
    })
    .then(async (response) => { return await response.json()})
    .then(recipes => {
        console.log(recipes);
        recipes.forEach(recipe => {
            // console.log(recipe);
            const recipeWrapper = document.createElement('div');
            const orangeDiv     = document.createElement('div');
            const recipeTitle   = document.createElement('h1');
            const recipeInfo    = document.createElement('div');
            const recipeImage   = document.createElement('img');
            const wrapInfo      = document.createElement('div');
            const recipeTime    = document.createElement('span');
            const recipeRating  = document.createElement('span');
            const starIcon      = document.createElement('img');


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

            //append children(FREAK THEM)
            recipeRating.append(starIcon);
            wrapInfo.append(recipeTime, recipeRating);
            recipeInfo.append(recipeImage, wrapInfo);
            orangeDiv.append(recipeTitle);
            recipeWrapper.append(orangeDiv, recipeInfo);

            const mainRecipeDiv = document.getElementById('recipe-page');
            mainRecipeDiv.append(recipeWrapper);
        });
    })

});