function View(controller) {
    this.controller = controller;
}

View.prototype.init = function () {

    callApi('https://rsu-library-api.herokuapp.com/books', (booksArray) => {
        this.controller.model.state.booksArray = booksArray;
        this.showBooks(booksArray);
    });
    this.addEventListeners();
}

// function for listeners
View.prototype.addEventListeners = function () {
    var filters = document.getElementsByClassName("filter"),
        asideFilters = document.getElementsByClassName("asideFilter");

    filters[0].addEventListener('click', event => {
        this.controller.handleFilterAll.bind(this);
        event.preventDefault();
    });
    for (let index = 1; index < filters.length; index++) {
        filters[index].addEventListener('click', event => {
            var bindedHandleTopFilter = this.controller.handleTopFilter.bind(this);
            event.preventDefault();
            bindedHandleTopFilter(event.target.innerHTML);
        })
    }

    for (let index = 0; index < asideFilters.length; index++) {
        asideFilters[index].addEventListener('click', event => {
            var bindedHandleAsideFilter = this.controller.handleAsideFilter.bind(this);
            event.preventDefault();
            bindedHandleAsideFilter(event.target.innerHTML);
        })
    }

    var debouncedInput = debounce(this.controller.handleInput.bind(this), 300);
    var input = document.getElementsByClassName("searchBook")[0];

    input.addEventListener('keyup', event => debouncedInput(event.target.value));

    var addBookButton = document.getElementsByClassName('button')[0];
    addBookButton.addEventListener('click', this.show);

    var modalForm = document.getElementsByClassName('overlay')[0];
    modalForm.addEventListener('click', this.close);

    var modalButton = document.getElementsByClassName('modalButton')[0];
    modalButton.addEventListener('click', this.addBook.bind(this));
}

// functions for render books
View.prototype.createBook = function (bookInfo) {
    var article = document.createElement('article'),
        divImg = document.createElement('div'),
        img = document.createElement('img'),
        divText = document.createElement('div'),
        textH2 = document.createElement('h2'),
        textP = document.createElement('p'),
        divRating = document.createElement('div');

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

    this.createStars(divRating, rating);
    divRating.addEventListener('click', this.clickOnStarRating.bind(this));

    return article;
}

View.prototype.clickOnStarRating = function (event) {
    var starNumber = event.target.getAttribute('data-star-number'),
        container = event.target.parentNode,
        containerNumber = event.target.parentNode.getAttribute('data-id'),
        isRated = event.target.getAttribute('data-rated');
        model = this.controller.model.state;
    if (isRated && starNumber === model.booksArray[containerNumber].rating) {
        model.booksArray[containerNumber].rating = 0;
        this.createStars(container, 0);
    } else {
        model.booksArray[containerNumber].rating = starNumber;
        this.createStars(container, starNumber);
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
    var displayedBooks = booksArray;
    var section = document.querySelector('section');

    while (section.firstChild) {
        section.removeChild(section.firstChild);
    }

    if (this.controller.model.state.asideFilter !== '') {
        displayedBooks = this.controller.asideFilter(displayedBooks, this.controller.model.state.asideFilter);
    }

    if (this.controller.model.state.search !== '') {
        displayedBooks = this.controller.searchBooks(displayedBooks, this.controller.model.state.search);
    }

    if (this.controller.model.state.topFilters.get('mostPopular')) {
        displayedBooks = this.controller.filterPop(displayedBooks);
    }

    if (this.controller.model.state.topFilters.get('freeBooks')) {
        displayedBooks = this.controller.filterFree(displayedBooks);
    }

    if (this.controller.model.state.topFilters.get('mostRecent')) {
        displayedBooks = this.controller.filterRecent(displayedBooks);
    }

    if (!this.controller.model.state.topFilters.get('mostPopular') &&
        !this.controller.model.state.topFilters.get('freeBooks') &&
        !this.controller.model.state.topFilters.get('mostRecent')) {
        this.changeStyleOnAllBooksFilter();
    }

    displayedBooks.forEach(element => {
        var itemBook = this.createBook(element);
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
View.prototype.changeFilterStyle = function (isClicked) {
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
        filters = elems.category,
        returnedBooks = this.controller.getBooks();
    
    event.preventDefault();
    book.id = returnedBooks[returnedBooks.length - 1].id + 1;
    
    if (elems.title.parentNode.lastChild.className === "errorMessage") {
        this.deleteErrorMsg(elems.title.parentNode);
    }

    if (!elems.title.value) {
        this.errorMsg(elems.title.parentNode, "Введите название книги!");
    } else {
        book.title = elems.title.value;
    }
    
    book.author = {};

    if (elems.authorFirstName.parentNode.lastChild.className === "errorMessage") {
        this.deleteErrorMsg(elems.authorFirstName.parentNode);
    }

    if (!elems.authorFirstName.value) {
        this.errorMsg(elems.authorFirstName.parentNode, "Введите фамилию автора!");
    } else {
        book.authorFirstName = elems.authorFirstName.value;
    }
    
    if (elems.authorLastName.parentNode.lastChild.className === "errorMessage") {
        this.deleteErrorMsg(elems.authorLastName.parentNode);
    }

    if (!elems.authorLastName.value) {
        this.errorMsg(elems.authorLastName.parentNode, "Введите имя автора!");
    } else {
        book.authorLastName = elems.authorLastName.value;
    }
    
    if (elems.rating.parentNode.lastChild.className === "errorMessage") {
        this.deleteErrorMsg(elems.rating.parentNode);
    }
    
    if (!elems.rating.value) {
        this.errorMsg(elems.rating.parentNode, "Введите рейтинг книги!");
    } else {
        if (isNumeric(elems.rating.value)) {            
            book.rating = elems.rating.value;
        } else {
            this.errorMsg(elems.rating.parentNode, "Введите число от 0 до 5");
        }
    }

    if (elems.cost.parentNode.lastChild.className === "errorMessage") {
        this.deleteErrorMsg(elems.cost.parentNode);
    }

    if (!elems.cost.value) {
        this.errorMsg(elems.cost.parentNode, "Введите стоимость книги!");
    } else {
        if (isNumeric(elems.cost.value)) {            
            book.cost = elems.cost.value;
        } else {
            this.errorMsg(elems.cost.parentNode, "Введите число!");
        }
    }

    book.categories = [];

    if (elems.picture.parentNode.lastChild.className === "errorMessage") {
        this.deleteErrorMsg(elems.picture.parentNode);
    }

    if (!elems.picture.value) {
        this.errorMsg(elems.picture.parentNode, "Введите ссылку на картинку к книге!");
    } else {
        book.picture = elems.picture.value;
    }

    filters.forEach(element => {
        if (element.checked) {
            book.categories.push(element.value);
        }
    });

    if (elems.title.value && elems.authorFirstName.value && elems.authorLastName.value && isNumeric(elems.rating.value) && isNumeric(elems.cost.value) && elems.picture.value) {
        this.controller.addBook(book);
        this.close();
        this.showBooks(returnedBooks);
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