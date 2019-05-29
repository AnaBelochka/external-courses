function View(controller) {
    this.controller = controller;
}

View.prototype.init = function () {

    callApi('https://rsu-library-api.herokuapp.com/books', (booksArray) => {
        this.controller.model.state.booksArray = booksArray;
        this.showBooks(booksArray);
    });
    this.events();
}

// function for listeners
View.prototype.events = function () {
    var self = this,
        filters = document.getElementsByClassName("filter"),
        asideFilters = document.getElementsByClassName("asideFilter");

    var bindedClickFilterAll = self.controller.bind(self.controller.clickFilterAll, self);
    filters[0].addEventListener('click', bindedClickFilterAll);
    var bindedClickTopFilter = self.controller.bind(self.controller.clickTopFilter, self);
    for (let index = 1; index < filters.length; index++) {
        filters[index].addEventListener('click', bindedClickTopFilter)
    }

    var bindedClickAsideFilter = self.controller.bind(self.controller.clickAsideFilter, self);
    for (let index = 0; index < asideFilters.length; index++) {
        asideFilters[index].addEventListener('click', bindedClickAsideFilter)
    }

    var bindedHandleInput = self.controller.bind(self.controller.handleInput, self);
    var debouncedInput = debounce(bindedHandleInput, 300);
    var input = document.getElementsByClassName("searchBook")[0];

    input.addEventListener('keyup', debouncedInput);

    var addBookButton = document.getElementsByClassName('button')[0];
    addBookButton.addEventListener('click', this.show);

    var modalForm = document.getElementsByClassName('overlay')[0];
    modalForm.addEventListener('click', this.close);

    var modalButton = document.getElementsByClassName('modalButton')[0];
    var bindedAddBook = self.controller.bind(self.addBook, self);
    modalButton.addEventListener('click', bindedAddBook);
}

// functions for render books
View.prototype.createBook = function (bookInfo) {
    var article = document.createElement('article'),
        divImg = document.createElement('div'),
        img = document.createElement('img'),
        divText = document.createElement('div'),
        textH2 = document.createElement('h2'),
        textP = document.createElement('p'),
        divRating = document.createElement('div'),
        self = this;

    article.className = "article";
    divImg.className = "articleImg";
    textH2.className = "title";
    textP.className = "author";
    divRating.className = "articleRating";

    img.src = bookInfo.image_url;
    textH2.textContent = bookInfo.title;
    textP.textContent = "by " + bookInfo.author.firstName + " " + bookInfo.author.lastName;

    article.appendChild(divImg);
    article.appendChild(divText);
    article.appendChild(divRating);
    divImg.appendChild(img);
    divText.appendChild(textH2);
    divText.appendChild(textP);

    var rating = bookInfo.rating;

    divRating.setAttribute('data-id', bookInfo.id - 1);

    self.createStars(divRating, rating);
    var bindedclickOnStarRating = self.controller.bind(self.clickOnStarRating, self)
    divRating.addEventListener('click', bindedclickOnStarRating);

    return article;
}

View.prototype.clickOnStarRating = function (event) {
    var starNumber = event.target.getAttribute('data-star-number'),
        container = event.target.parentNode,
        containerNumber = event.target.parentNode.getAttribute('data-id'),
        isRated = event.target.getAttribute('data-rated'),
        self = this,
        model = self.controller.model.state;
    if (isRated && starNumber === model.booksArray[containerNumber].rating) {
        model.booksArray[containerNumber].rating = 0;
        self.createStars(container, 0);
    } else {
        model.booksArray[containerNumber].rating = starNumber;
        self.createStars(container, starNumber);
    }
}

View.prototype.createStars = function (container, rating) {

    var starCounter = 1;

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    for (let j = 0; j < rating; j++) {
        var star = document.createElement('i');
        star.className = 'fa fa-star';
        star.setAttribute('data-star-number', starCounter++);
        star.setAttribute('data-rated', true);
        container.appendChild(star);
    }

    if (rating !== 5) {
        for (let index = 0; index < 5 - rating; index++) {
            var voidStar = document.createElement('i');
            voidStar.className = 'fa fa-star-o';
            voidStar.setAttribute('data-star-number', starCounter++);
            container.appendChild(voidStar);
        }
    }
}

View.prototype.showBooks = function (booksArray) {
    var self = this;
    var displayedBooks = booksArray;
    var section = document.querySelector('section');

    while (section.firstChild) {
        section.removeChild(section.firstChild);
    }

    if (self.controller.model.state.asideFilter !== '') {
        displayedBooks = this.controller.asideFilter(displayedBooks, self.controller.model.state.asideFilter);
    }

    if (self.controller.model.state.search !== '') {
        displayedBooks = this.controller.searchBooks(displayedBooks, self.controller.model.state.search);
    }

    if (self.controller.model.state.topFilters.get('mostPopular')) {
        displayedBooks = this.controller.filterPop(displayedBooks);
    }

    if (self.controller.model.state.topFilters.get('freeBooks')) {
        displayedBooks = this.controller.filterFree(displayedBooks);
    }

    if (self.controller.model.state.topFilters.get('mostRecent')) {
        displayedBooks = this.controller.filterRecent(displayedBooks);
    }

    if (!self.controller.model.state.topFilters.get('mostPopular') &&
        !self.controller.model.state.topFilters.get('freeBooks') &&
        !self.controller.model.state.topFilters.get('mostRecent')) {
        self.changeStyleOnAllBooksFilter();
    }

    displayedBooks.forEach(function (item) {
        var bindedCreateBook = self.controller.bind(self.createBook, self);
        var itemBook = bindedCreateBook(item);
        section.appendChild(itemBook);
    });
}

// function for aside filter style
View.prototype.underline = function () {
    var asideFilters = document.getElementsByClassName("asideFilter");

    for (let index = 0; index < asideFilters.length; index++) {
        asideFilters[index].style.textDecoration = "none";
    }
    event.target.style.textDecoration = "underline";
}

// function for change all style of top filters 
View.prototype.changeStyleOnAllBooksFilter = function () {
    var filters = document.getElementsByClassName("filter");

    filters[0].style.backgroundColor = "#97b3ce";
    filters[0].style.color = "white";
    for (let index = 1; index < filters.length; index++) {
        filters[index].style.backgroundColor = "#eef1f7";
        filters[index].style.color = "#8c97b2";
    }
}

// function for change style of clicked filter
View.prototype.changeStyle = function (isClicked) {
    if (!isClicked) {
        event.target.style.backgroundColor = "#eef1f7";
        event.target.style.color = "#8c97b2";
    } else {
        event.target.style.backgroundColor = "#97b3ce";
        event.target.style.color = "white";
    }
}

View.prototype.notAllBooksSelected = function () {
    var filter = document.getElementsByClassName("filter")[0];

    filter.style.backgroundColor = "#eef1f7";
    filter.style.color = "#8c97b2";
}

// functions for open and close modal window 
View.prototype.show = function () {
    document.getElementsByClassName('overlay')[0].style.display = "block";
    document.getElementsByClassName('modal')[0].style.display = "block";
}

View.prototype.close = function () {
    document.getElementsByClassName('overlay')[0].style.display = "none";
    document.getElementsByClassName('modal')[0].style.display = "none";
}

//function for add book 
View.prototype.addBook = function (event) {

    var form = document.forms.form,
        elems = form.elements,
        book = {},
        self = this,
        filters = elems.category,
        bindedReturnBooks = self.controller.bind(self.controller.returnBooks, self),
        returnedBooks = bindedReturnBooks();
    
    event.preventDefault();
    book.id = returnedBooks[returnedBooks.length - 1].id + 1;
    
    if (elems.title.parentNode.lastChild.className === "errorMessage") this.deleteErrorMsg(elems.title.parentNode);
    if (!elems.title.value) self.errorMsg(elems.title.parentNode, "Введите название книги!");
    else {
        book.title = elems.title.value;
    }
    
    book.author = {};

    if (elems.authorFirstName.parentNode.lastChild.className === "errorMessage") this.deleteErrorMsg(elems.authorFirstName.parentNode);
    if (!elems.authorFirstName.value) self.errorMsg(elems.authorFirstName.parentNode, "Введите фамилию автора!");
    else {
        book.authorFirstName = elems.authorFirstName.value;
    }
    
    if (elems.authorLastName.parentNode.lastChild.className === "errorMessage") this.deleteErrorMsg(elems.authorLastName.parentNode);
    if (!elems.authorLastName.value) self.errorMsg(elems.authorLastName.parentNode, "Введите имя автора!");
    else {
        book.authorLastName = elems.authorLastName.value;
    }
    
    if (elems.rating.parentNode.lastChild.className === "errorMessage") this.deleteErrorMsg(elems.rating.parentNode);
    if (!elems.rating.value) self.errorMsg(elems.rating.parentNode, "Введите рейтинг книги!");
    else {
        if (this.isNumeric(elems.rating.value)) {            
            book.rating = elems.rating.value;
        } else {
            self.errorMsg(elems.rating.parentNode, "Введите число от 0 до 5");
        }
    }

    if (elems.cost.parentNode.lastChild.className === "errorMessage") this.deleteErrorMsg(elems.cost.parentNode);
    if (!elems.cost.value) self.errorMsg(elems.cost.parentNode, "Введите стоимость книги!");
    else {
        if (this.isNumeric(elems.cost.value)) {            
            book.cost = elems.cost.value;
        } else {
            self.errorMsg(elems.cost.parentNode, "Введите число!");
        }
    }

    book.categories = [];

    if (elems.picture.parentNode.lastChild.className === "errorMessage") this.deleteErrorMsg(elems.picture.parentNode);
    if (!elems.picture.value) self.errorMsg(elems.picture.parentNode, "Введите ссылку на картинку к книге!");
    else {
        book.picture = elems.picture.value;
    }

    filters.forEach(element => {
        if (element.checked) {
            book.categories.push(element.value);
        }
    });

    if (elems.title.value && elems.authorFirstName.value && elems.authorLastName.value && this.isNumeric(elems.rating.value) && this.isNumeric(elems.cost.value) && elems.picture.value) {
        var bindedPushBook = self.controller.bind(self.controller.pushBook, self)
        bindedPushBook(book);
        self.close();
        self.showBooks(returnedBooks);
    }   

}

// functions for validate form
View.prototype.errorMsg = function (container, msg) {
    var msgP = document.createElement('p');
    msgP.innerHTML = msg;
    msgP.className = "errorMessage";
    container.appendChild(msgP);
}

View.prototype.deleteErrorMsg = function (container) {
    container.removeChild(container.lastChild);
}

View.prototype.isNumeric = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}