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

// Create meal slider
let mealType = new Glide('.glide', small__conf)
mealType.on('swipe.end', function() {
    console.log(mealType._c.Html.slides[mealType.index].childNodes[3].innerHTML);
})
mealType.mount();

// Create time slider
let mealTime = new Glide('.glide__time', big__conf);
mealTime.on('swipe.end', function() {
    console.log(mealTime._c.Html.slides[mealTime.index].innerHTML);
})
mealTime.mount();

// Cuisine slider
let mealCuisine = new Glide('.glide__cuisine', small__conf)
mealCuisine.on('swipe.end', function() {
    console.log(mealCuisine._c.Html.slides[mealCuisine.index].innerHTML);
})
mealCuisine.mount();

// Diet slide
let mealDiet = new Glide('.glide__diet', small__conf)
mealDiet.on('swipe.end', function() {
    console.log(mealDiet._c.Html.slides[mealDiet.index].innerHTML);
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
})
