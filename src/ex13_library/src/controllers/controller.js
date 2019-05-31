function Controller (model) {
    this.model = model;
}

// function for return books
Controller.prototype.returnBooks = function () {
    return this.model.state.booksArray;
}

// function for push book
Controller.prototype.pushBook = function (book) {
    this.model.state.booksArray.push(book);
}

// functions for search input
Controller.prototype.handleInput = function (event) {
    
    var inputValue = event.target.value;
    this.controller.model.state.search = inputValue.toLowerCase();

    this.showBooks(this.controller.model.state.booksArray);

}

Controller.prototype.searchBooks = function(books, word) {

    return books.filter(function(element){
        return element.title.toLowerCase().indexOf(word) !== -1 ||
               element.author.firstName.toLowerCase().indexOf(word) !== -1 || 
               element.author.lastName.toLowerCase().indexOf(word) !== -1 ;
    });

}

// functions for aside filters
Controller.prototype.clickAsideFilter = function (event) {

    this.controller.clearFilters();

    event.preventDefault();
    var filter = event.target.innerHTML;
    this.underline();

    if (filter === "Must Read Titles") {
        this.controller.setAsideFilter("must_read");
    } else if (filter === "Best Of List") {
        this.controller.setAsideFilter("best");
    } else if (filter === "Classic Novels") {
        this.controller.setAsideFilter("classic");
    } else {
        this.controller.setAsideFilter("non_fiction");
    }     

    this.changeStyleOnAllBooksFilter();
    this.showBooks(this.controller.model.state.booksArray);
}

Controller.prototype.asideFilter = function (books, filter) {

    return books.filter(element => {
        if (element.categories.length !== 0) {
            if (element.categories.find( el => {
                if (el === filter) {
                    return el;
                }
                return false;
            })) {
                return true;
            }
        }
        return false;
    })

}

Controller.prototype.setAsideFilter = function (filter) {
    this.model.state.asideFilter = filter;
}

// function for reset top filters
Controller.prototype.clearFilters = function () {
    this.model.state.topFilters.set('allBooks', true);
    this.model.state.topFilters.set('mostPopular', false);
    this.model.state.topFilters.set('freeBooks', false);
    this.model.state.topFilters.set('mostRecent', false);
}

// functions for top filters
Controller.prototype.clickFilterAll = function (event) {

    var state = this.controller.model.state;
    state.topFilters.set('allBooks', true);
    event.preventDefault();

    state.topFilters.set('mostPopular', false);
    state.topFilters.set('freeBooks', false);
    state.topFilters.set('mostRecent', false);

    this.changeStyleOnAllBooksFilter();    

    this.showBooks(this.controller.model.state.booksArray);

}

Controller.prototype.clickTopFilter = function (event) {

    var filter = event.target.innerHTML,
        state = this.controller.model.state;
    event.preventDefault();

    if (filter === "Most Recent") {
        state.topFilters.set('mostRecent', !state.topFilters.get('mostRecent'));
        this.changeFilterStyle(state.topFilters.get('mostRecent'));
    } else if (filter === "Most Popular") {
        state.topFilters.set('mostPopular', !state.topFilters.get('mostPopular'));
        this.changeFilterStyle(state.topFilters.get('mostPopular'));
    } else {
        state.topFilters.set('freeBooks', !state.topFilters.get('freeBooks'));
        this.changeFilterStyle(state.topFilters.get('freeBooks'));
    }
    
    state.topFilters.set('allBooks', false);    
    this.notAllBooksSelected();
    
    this.showBooks(this.controller.model.state.booksArray);

}

Controller.prototype.filterPop = function (books) {
    
    return books.filter(function(element) {
        return element.rating === 5;
    });

}

Controller.prototype.filterFree = function (books) {

    return books.filter(function(element) {
        return element.cost === 0;
    });

}

Controller.prototype.filterRecent = function (books) {
    var min = 10000000000000000000;

    books.forEach(element => {
        if (element.createdAt < min) {
            min = element.createdAt;
        }
    });

    return books.filter(function(element) {
        return element.createdAt === min;
    });

}