var requestURL = 'https://rsu-library-api.herokuapp.com/books';
var request = new XMLHttpRequest();
request.open('GET', requestURL);

request.responseType = 'json';
request.send();

request.onload = function() {
    var books = request.response;
    showBooks(books);
}

function showBooks(booksArray) {

    var section = document.querySelector('section');

    for (var i = 0; i < booksArray.length; i++) {

        var article = document.createElement('article');
        var divImg = document.createElement('div');
        var img = document.createElement('img');
        var divText = document.createElement('div');
        var textH2 = document.createElement('h2');
        var textP = document.createElement('p');
        var divRating = document.createElement('div');

        article.className = "article";
        divImg.className = "articleImg";
        textH2.className = "title";
        textP.className = "author";
        divRating.className = "articleRating";

        img.src = booksArray[i].image_url;
        textH2.textContent = booksArray[i].title;
        textP.textContent = "by " + booksArray[i].author.firstName + " " + booksArray[i].author.lastName;

        article.appendChild(divImg);
        article.appendChild(divText);
        article.appendChild(divRating);
        divImg.appendChild(img);
        divText.appendChild(textH2);
        divText.appendChild(textP);
            
        var rating = booksArray[i].rating;

        for (let j = 0; j < rating; j++) {
            var star = document.createElement('i');
            star.className = 'fas fa-star';
            divRating.appendChild(star);            
        }
    
        section.appendChild(article);

    }
    
}