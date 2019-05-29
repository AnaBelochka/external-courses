function Controller (model) {
    this.model = model;
}

Controller.prototype.bind = function (func, context) {
    return function() {
        return func.apply(context, arguments);
    };
}

// function for return books
Controller.prototype.returnBooks = function () {
    return this.controller.model.state.booksArray;
}

// function for push book
Controller.prototype.pushBook = function (book) {
    this.controller.model.state.booksArray.push(book);
}

// functions for search input
Controller.prototype.handleInput = function (event) {
    
    var inputValue = event.target.value,
        self = this;
    self.controller.model.state.search = inputValue.toLowerCase();

    var bindedShowBooks = this.controller.bind(self.showBooks, self);
    bindedShowBooks(self.controller.model.state.booksArray);

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

    var self = this,
        bindedClearFilters = self.controller.bind(self.controller.clearFilters, self);

    bindedClearFilters();
    event.preventDefault();
    var filter = event.target.innerHTML;
    self.underline();

    if (filter === "Must Read Titles") {
        self.controller.model.state.asideFilter = "must_read";
    } else if (filter === "Best Of List") {
        self.controller.model.state.asideFilter = "best";
    } else if (filter === "Classic Novels") {
        self.controller.model.state.asideFilter = "classic";
    } else {
        self.controller.model.state.asideFilter = "non_fiction";
    }     

    self.changeStyleOnAllBooksFilter();
    var bindedShowBooks = this.controller.bind(self.showBooks, self);
    bindedShowBooks(self.controller.model.state.booksArray);
}

Controller.prototype.asideFilter = function (books, filter) {

    return books.filter(function(element) {
        if (element.categories.length !== 0) {
            for (let index = 0; index < element.categories.length; index++) {
                if (element.categories[index] === filter) {
                    return true;
                }
                
            }
        }
        return false;
    })

}

// function for reset top filters
Controller.prototype.clearFilters = function () {
    var self = this;
    self.controller.model.state.topFilters.set('allBooks', true);
    self.controller.model.state.topFilters.set('mostPopular', false);
    self.controller.model.state.topFilters.set('freeBooks', false);
    self.controller.model.state.topFilters.set('mostRecent', false);
}

// functions for top filters
Controller.prototype.clickFilterAll = function (event) {

    var self = this,
        state = self.controller.model.state;
    state.topFilters.set('allBooks', true);
    event.preventDefault();

    state.topFilters.set('mostPopular', false);
    state.topFilters.set('freeBooks', false);
    state.topFilters.set('mostRecent', false);

    self.changeStyleOnAllBooksFilter();    

    var bindedShowBooks = this.controller.bind(self.showBooks, self);
    bindedShowBooks(self.controller.model.state.booksArray);

}

Controller.prototype.clickTopFilter = function (event) {

    var filter = event.target.innerHTML,
        self = this,
        state = self.controller.model.state;
    event.preventDefault();

    if (filter === "Most Recent") {
        state.topFilters.set('mostRecent', !state.topFilters.get('mostRecent'));
        self.changeStyle(state.topFilters.get('mostRecent'));
    } else if (filter === "Most Popular") {
        state.topFilters.set('mostPopular', !state.topFilters.get('mostPopular'));
        self.changeStyle(state.topFilters.get('mostPopular'));
    } else {
        state.topFilters.set('freeBooks', !state.topFilters.get('freeBooks'));
        self.changeStyle(state.topFilters.get('freeBooks'));
    }
    
    state.topFilters.set('allBooks', false);    
    self.notAllBooksSelected();
    
    var bindedShowBooks = this.controller.bind(self.showBooks, self);
    bindedShowBooks(self.controller.model.state.booksArray);

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