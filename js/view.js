// PetShopView - create new arrays and display the lists on the screen
class PetShopView {
    constructor(animals) {
        this.animals = animals;
    }

    lists() {
        console.log('animals', this.animals);

        // get array with cats
        let cats = getArrayOfCats(this.animals);

        // get array of animals with a price above the average
        let expensive = getArrayExpensiveAnimals(this.animals);

        // get array of white or fluffy animals
        let fluffyOrWhite = getArrayFluffyOrWhiteAnimals(this.animals);

        // create lists with animals where number means type of animal
        createAnimalList(cats, 0);
        createAnimalList(expensive, 1);
        createAnimalList(fluffyOrWhite, 2);
    }
}

// add animals to the list
function createAnimalList(animals, index) {
    // get lists collection and clean all the list
    let getAnimalList = document.querySelectorAll('.list-group');
    getAnimalList[index].innerHTML = '';

    for (let i = 0; i < animals.length; i++) {
        let li = document.createElement('li');
        li.classList = 'list-group-item list-group-item-action';

        let btn = document.createElement('input');
        btn.type = 'button';
        btn.classList = 'btn btn-secondary btn-sm mb-2';
        btn.value = '✖';
        btn.addEventListener('click', () => myPetShop.delAnimal(animals[i]._id), false);

        if (index === 0) { // add cats to the list
            let name = animals[i].name,
                price = animals[i].price;

            li.innerHTML = `${name} - $${price}`;
            li.appendChild(btn);

            getAnimalList[index].appendChild(li);

        } else if (index === 1) { // add expensive animals to the list
            let name = animals[i].name ? animals[i].name : 'Just hamster',
                price = animals[i].price;

            li.innerHTML = `${name} - $${price}`;
            li.appendChild(btn);

            getAnimalList[index].appendChild(li);

        } else { // add fluffy or white animals to the list
            let name = animals[i].name ? animals[i].name : 'Just hamster',
                price = animals[i].price;

            li.innerHTML = `${name} - $${price}`;
            li.appendChild(btn);

            getAnimalList[index].appendChild(li);
        }
    }
}


function getArrayOfCats(animals) {
    let cats = animals.filter(animal => (animal instanceof Cat));
    return cats;
}

// choose animals with a price above the average
function getArrayExpensiveAnimals(animals) {
    let average = getAveragePrice(animals);

    let expensive = animals.filter(animal => parseInt(animal.price) > average);

    return expensive;
}

// get average price all of the animals
function getAveragePrice(animals) {
    // get the price each of the animal
    let arrayOfPrice = animals.map(animal => animal.price);
    // calculate the average price
    let average = arrayOfPrice.reduce((current, next) => parseInt(current) + parseInt(next))/arrayOfPrice.length;

    return average;
}

// choose white or fluffy animals
function getArrayFluffyOrWhiteAnimals(animals) {
    let fluffyOrWhite = animals.filter(animal => (animal.color === '#ffffff') || animal.fluffy);
    return fluffyOrWhite;
}