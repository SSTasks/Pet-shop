
class PetShop {
    constructor(){
        this.animals = [];
        this.myPetShopView = {};
    }

    render() {
        fetch('./js/animals.json')
            .then(response => response.json())
            .then(json => {
                this.animals = parsing(json);

                this.myPetShopView = new PetShopView(this.animals);
                this.myPetShopView.lists();
            });
    }

    addAnimal(index){
        addAnimal(this.animals, index);
    }

    delAnimal(id){
        delAnimal(this.animals, id);
    }
}

// render main page
let myPetShop = new PetShop();
myPetShop.render();


// JSON's objects to array of animals
function parsing(data) {
    let animals = [];

    for (let i = 0; i < data[0].length; i++) {
        let name = data[0][i].name,
            price = data[0][i].price,
            color = data[0][i].color;

        animals.push(new Dog(name, price, color));
    }

    for (let i = 0; i < data[1].length; i++) {
        let name = data[1][i].name,
            price = data[1][i].price,
            color = data[1][i].color,
            fluffy = data[1][i].fluffy;

        animals.push(new Cat(name, price, color, fluffy));
    }

    for (let i = 0; i < data[2].length; i++) {
        let price = data[2][i].price,
            color = data[2][i].color,
            fluffy = data[2][i].fluffy;

        animals.push(new Hamster(price, color, fluffy));
    }

    return animals;
}



// add new animal
function addAnimal(animals, index) {
    let getForm = document.querySelectorAll('.add-animal form')[index], //form number
        getInputs = getForm.querySelectorAll('input');

    if (index === 0) {
        let name = getInputs[0].value,
            price = parseInt(getInputs[1].value),
            color = getInputs[2].value;

        if (name && price > 0) { //check if the form is filled in
            animals.push(new Dog(name, price, color));
            myPetShop.myPetShopView.lists();
            showForm(index);
        }

    }  else if (index === 1) {
        let name = getInputs[0].value,
            price = parseInt(getInputs[1].value),
            color = getInputs[2].value,
            fluffy = getInputs[3].checked;

        if (name && price > 0) { //check if the form is filled in
            animals.push(new Cat(name, price, color, fluffy));
            myPetShop.myPetShopView.lists();
            showForm(index);
        }

    } else {
        let price = parseInt(getInputs[0].value),
            color = getInputs[1].value,
            fluffy = getInputs[2].checked;

        if (price > 0) { //check if the form is filled in
            animals.push(new Hamster(price, color, fluffy));
            myPetShop.myPetShopView.lists();
            showForm(index);
        }
    }
}

//delete the animal
function delAnimal(animals, id) {
    console.log('animals', animals);
    // define index of the animal
    let removeIndex = animals.map(item => item._id).indexOf(id);
    animals.splice(removeIndex, 1);
    // animals = animals.filter( animal => animal._id !== id);
    console.log('animals', animals);
    myPetShop.myPetShopView.lists();
}







// SECONDARY functions
function showForm(index) {
    let getForm = document.querySelectorAll('.add-animal form')[index];
    getForm.classList.toggle('show-form');

    // clean form
    let getInputs = getForm.querySelectorAll('input');
    let len = index === 2 ? 1 : 2;

    for (let i = 0; i < len; i++) {
        getInputs[i].value ='';
    }
}


function addEvents() {
    let buttons = document.querySelectorAll('.btn-success');

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', () => myPetShop.addAnimal(i), false);
    }
}

addEvents();