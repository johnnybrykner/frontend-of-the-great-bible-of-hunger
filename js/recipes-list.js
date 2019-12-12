document.addEventListener('DOMContentLoaded', () => {

    fetch('https://api-hungry-bible.azurewebsites.net/api/recipe', {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(async (response) => {
            return await response.json()
        })
        .then(recipes => {

            recipesData = recipes

            populateHtml(recipes);

        });
});