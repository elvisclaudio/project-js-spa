class Product {
    constructor(id, title, description, price, image, category, subcategory, stock) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.image = image;
        this.category = category;
        this.subcategory = subcategory;
        this.stock = stock;
    }


    getTitle() {
        return this.title;
    }

    setPrice(price) {
        this.price = price;
    }

    demoProduct = () => {
        console.log(`${this.title} belongs to ${this.category}`);
    }   

    isInStock() {
        return this.stock > 0;
    }

 
}