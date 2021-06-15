// declearing all variables to use different function
const searchBtn = document.getElementById('submit');
const mealsNotFound = document.getElementById('wrong-search');
const mealsShow = document.getElementById('showing-meals');
const mealsDiv = document.getElementById('single-meal-details');
const spinner = document.getElementById("spinner");
const modopreparo = document.getElementById("modopreparo")



// bt pesqusias
searchBtn.addEventListener('click', function () {
    const mealsName = document.getElementById('meal-name').value;
    mealsShow.innerHTML = '';
    if (mealsName === '') {
        mealsNotFound.style.display = 'block';
    }
    if (mealsName.length >= 1) {
        spinner.removeAttribute('hidden');
        fetchMealsData(mealsName);
        mealsNotFound.style.display = 'none';
    }
});


// validação e chamada de API para buscar 
const fetchMealsData = mealsName => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealsName}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            spinner.setAttribute('hidden', '');
            if(data.meals === null || data.meals === undefined || data.meals === ''){
                mealsNotFound.style.display = 'block';
            } else{
                displayMealsData(data.meals)
            }
        }).catch(error => console.log(error));
}

//  informaçoes da refeição para apresentar 
const displayMealsData = mealsInfo => {
    const mealsDiv = document.getElementById('showing-meals');
    mealsInfo.forEach(meal => {
        const mealDiv = document.createElement('div');
        const mealInfo = `
        <div class="col">
        <div class="card h-100 text-center" onClick="singleMealDeatils(${meal.idMeal});">

          <img src="${meal.strMealThumb}" class="card-img-top">

          <div class="card-footer">
          
            <small class="text-muted"><b>${meal.strMeal}</b></small>

          </div>
          
        </div>
        </div>`;
        mealDiv.innerHTML = mealInfo;
        mealsDiv.appendChild(mealDiv);
    });
}

//informações de refeições individuais
const singleMealDeatils = idMeal =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    fetch(url)
    .then(res => res.json())
    .then(data => renderMealInfo(data.meals[0]))
    .catch(error => console.log(error));
}

// Ingredientes da refeição  e preparo
const renderMealInfo = mealsId =>{

    //mostrar ingredientes na lista
    console.log(mealsId.idMeal);
    let ingredientAndMeasures = [];
    for (let item = 1; item <= 20; item++) {
        if (mealsId[`strIngredient${item}`]) {
            ingredientAndMeasures.push(`${mealsId[`strMeasure${item}`]} ${mealsId[`strIngredient${item}`]}`);
        } else {
            break;
        }
    }
    mealsDiv.innerHTML = `
    <h2 class="py-3">${mealsId.strMeal}</h2>
    <img src="${mealsId.strMealThumb}" class="rounded img-fluid" alt="...">
        
        <h2 class="py-3">Ingredientes</h2>
         
        ${ingredientAndMeasures.map((ingredientAndMeasure) =>`
        
        <div >
        ${ingredientAndMeasure}
        </div>

        </div>`).join('')} 

        <h2 class="py-3">Forma de preparo</h2>
        <p class="py-3">${mealsId.strInstructions}</p>

        
        `;
}