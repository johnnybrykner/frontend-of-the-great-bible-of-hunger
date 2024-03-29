document.addEventListener("DOMContentLoaded", () => {
    var recipesData = [];

    const vh = window.innerHeight;
    document.body.style.setProperty('--vh', vh + 'px');

    // vars for pages:
    let homePage = document.getElementById('home-page');
    let recipePage = document.getElementById('recipe-page');
    let ingredientsPage = document.getElementById('ingredients-page');

    //vars for back buttons:
    let ingredientsPageBack = document.getElementById('ingredients-page-back');
    let recipePageBack = document.getElementById('recipe-page-back');

    // hide filter menu
    let filterMenu = document.getElementById('menu__trigger--js');
    filterMenu.style.display = 'none';

    // fixed menu items
    let fixedMenuSpans = document.getElementsByClassName('fixed-nav__text');
    let fixedMenuIcons = document.getElementsByClassName('fixed-menu-icon');

    // get the element with the displayed and delete it depending 
    // on the page
    // Delete class from all function

    if (window.localStorage.getItem("currentPage")) {
        let currentPage = document.getElementById(window.localStorage.getItem("currentPage"));
        removeDisplayedClass();
        showFixedNavigation();
        currentPage.classList.add('displayed')
    }

    function removeDisplayedClass() {
        let displayedClass = document.querySelectorAll('.displayed');
        displayedClass.forEach(cls => {
            cls.classList.remove('displayed');
        });
    }

    //shows the fixed bottom navigation
    function showFixedNavigation() {
        let fixedNavigation = document.getElementById('recipe-listing-page');
        fixedNavigation.classList.add('displayed');
    }


    // Skip button
    let skipButton = document.getElementById('skip__button');
    skipButton.addEventListener('click', () => {
        removeDisplayedClass();
        ingredientsPage.classList.add('displayed');
        localStorage.setItem("currentPage", "ingredients-page");
        showFixedNavigation();
        addActivemenu();
    })

    // Recipes page button
    let recipeButton = document.getElementById('recipe__button');
    recipeButton.addEventListener('click', () => {
        removeDisplayedClass();
        homePage.classList.add('displayed');
        localStorage.setItem("currentPage", "home-page");
        showFixedNavigation();
        recipePage.classList.remove('displayed');
        //display menu from this page
        // filterMenu.style.display = 'flex';
        addActivemenu();
    });

    function addActivemenu() {
        if (ingredientsPage.classList.contains('displayed')) {
            fixedMenuSpans[1].classList.remove('menu-active--js');
            fixedMenuIcons[1].classList.remove('menu-active--js');
            fixedMenuSpans[0].classList.add('menu-active--js');
            fixedMenuIcons[0].classList.add('menu-active--js');
        } else if (homePage.classList.contains('displayed')) {
            fixedMenuSpans[0].classList.remove('menu-active--js');
            fixedMenuIcons[0].classList.remove('menu-active--js');
            fixedMenuSpans[1].classList.add('menu-active--js');
            fixedMenuIcons[1].classList.add('menu-active--js');
        } else {
            console.log('This is the worst code I have written in my life')
        }
    }

    // Products button
    let productsButton = document.getElementById('products__button');
    productsButton.addEventListener('click', () => {
        removeDisplayedClass();
        ingredientsPage.classList.add('displayed');
        localStorage.setItem("currentPage", "ingredients-page");
        showFixedNavigation();
        addActivemenu();
    });


    // Let's cook button
    let letsButton = document.getElementById('lets-cook__button');
    letsButton.addEventListener('click', () => {
        removeDisplayedClass();
        showFixedNavigation();
        recipePage.classList.add('displayed');
        localStorage.setItem("currentPage", "recipe-page");
        filterMenu.style.display = 'flex';
    })

    // ingredients Page Back Button
    ingredientsPageBack.addEventListener('click', () => {
        removeDisplayedClass();
        showFixedNavigation();
        homePage.classList.add('displayed');
        localStorage.setItem("currentPage", "home-page");
    })

    // recipe Page Back Button
    recipePageBack.addEventListener('click', () => {
        removeDisplayedClass();
        showFixedNavigation();
        homePage.classList.add('displayed');
        localStorage.setItem("currentPage", "home-page");
        filterMenu.style.display = 'none';
    })

    // guide page back button
    document.querySelector('.guide__page-back').addEventListener('click', () => {
        removeDisplayedClass();
        showFixedNavigation();
        recipePage.classList.add('displayed');
        document.getElementById('menu__trigger--js').style.display = 'flex';
        localStorage.setItem("currentPage", "recipe-page");
    })
});

    // let recipeToGuidePage = document.getElementById('recipe-to-guide-page');
    // let guidePage = document.getElementById('guide-page');
    //let fixedNavigation = document.getElementById('recipe-listing-page');