console.log('this window', this);

setTimeout(function() { // we delay it intentionally
    console.log('something');
}, 1000 );

let cat = {
    name: 'Bob',
    changeName: function () {
        this.name = 'bob4';
        console.log(this.name);
    }
};

let cat2 = {};
cat2.name = 'Bob';
cat2.someOtherProp = 1;


function catNow(newName) {
    this.name = newName;
}

class CatBob {

    name;
    // newAttribute;

    constructor(attributeName, newAttribute) {

        if (newAttribute) {
            this.newAttribute = newAttribute;
        }

        this.name = attributeName;
    }


    meow() {
        console.log(this.name + ' said meow');
    }

    meow2 = () => {
        console.log(this.name + ' said meow in es6 style');

    }

}

let func = () => {
    //do something
}

func();

CatBob.prototype.height = 333;
let catBob = new CatBob('Bob6', '23223');

console.log(catBob, 'this is cat bob by class instantiated', catBob.meow(), catBob.meow2());



catNow.prototype.height = 222;

let catNow1 = new catNow('Lil Wayne');

console.log(catNow1);


cat.changeName();

console.log(cat.name)

console.log('this window', this);
