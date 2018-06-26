var Library = function() {
  this.bookShelf = new Array ();
};
Library.prototype.bookShelf = new Array();

Library.prototype.addBooks = function(books) {
  for (var i = 0; i < this.bookShelf.length; i++) {
    var currentBooks = this.bookShelf[i];
    if (books === currentBooks) {
      console.log("this book already exists.");
      return false;
      }
    }
    this.bookShelf.push(books);
    return true;
}

Library.prototype.removeBookByTitle = function (title) {
//   Purpose: Remove book from from the books array by its title. 
//   Return: boolean true if the book(s) were removed, false if no books match
  for (var i = 0; i < this.bookShelf.length; i++) {
    if(title === this.bookShelf[i].title) {
      this.bookShelf.splice(i,1);
      return true;
    }
  }
  console.log("No books match the title.");
  return false
};


Library.prototype.removeBookByAuthor = function (authorName) {
  // Purpose: Remove a specific book from your books array by the author name. 
  // Return: boolean true if the book(s) were removed, false if no books match 
var authorRemove = 0;
  for (var i = 0; i < this.bookShelf.length; i++) {
    if (authorName === this.bookShelf[i].author) {
      this.bookShelf.splice(i,1);
      i--;
      authorRemove++;
    }
  }
  if (authorRemove > 0) {
    return true;
  } else {
    console.log("No books match that Author's name.");
    return false;
  }
};

Library.prototype.getRandomBook = function () {
  // Purpose: Return a random book object from your books array 
  // Return: book object if you find a book, null if there are no books
var randomBook = this.bookShelf[Math.floor(Math.random() * this.bookShelf.length)];
  if(this.bookShelf.length === 0) {
    console.log(null);
    return false;
  } else {
    console.log(randomBook);
    return true;
    }
};

Library.prototype.getBookByTitle = function (title) {
//   Purpose: Return all books that completely or partially matches the string title
//   passed into the function 
//   Return: array of book objects if you find books with matching titles, empty array if
//   no books are found 
var matchTitleSearch = [];
  for (var i = 0; i < this.bookShelf.length; i++) {
    if (this.bookShelf[i].title.toLowerCase().search(title.toLowerCase()) >= 0) {
      matchTitleSearch.push(this.bookShelf[i]);
    }
  }
  return matchTitleSearch;

};


Library.prototype.getBooksByAuthor = function (authorName) {
  // Purpose: Finds all books where the author’s name partially or completely match- es the authorName argument passed to the function.
  // Return: array of books if you find books with match authors, empty array if no books match
var matchAuthSearch = [];
  for (var i = 0; i < this.bookShelf.length; i++) {
    if (this.bookShelf[i].author.toLowerCase().match(authorName.toLowerCase()) !== null) {
      matchAuthSearch.push(this.bookShelf[i]);
    }
  }
  return matchAuthSearch;
};

Library.prototype.getAuthors = function () {
//   Purpose: Find the distinct authors’ names from all books in your library 
//   Return: array of strings the names of all distinct authors, empty array if no books exist or if no authors exist 
};

Library.prototype.getRandomAuthorName = function () {
//  Purpose: Retrieves a random author name from your books collection 
//  Return: string author name, null if no books exist
};

var Book = function(title, author, numberOfPages, publishDate) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.publishDate = new Date(publishDate);
};

document.addEventListener('DOMContentLoaded', function() {
  window.gLibrary = new Library ();
  gLibrary.addBooks(gBookOne)
  gLibrary.addBooks(gBookTwo)
  gLibrary.addBooks(gBookThree)
  gLibrary.addBooks(gBookFour)
  gLibrary.addBooks(gBookFive)
  gLibrary.addBooks(gBookSix)
  gLibrary.addBooks(gBookSeven)
  gLibrary.addBooks(gBookEight)
  gLibrary.addBooks(gBookNine)
  gLibrary.addBooks(gBookTen)
  gLibrary.addBooks(gBookEleven)
  gLibrary.addBooks(gBookTwelve)



});

var gBookOne = new Book ("Promise of Blood", "Brian McClellan", 545, new Date(2013, 03, 16));
var gBookTwo = new Book ("The Blade Itself", "Joe Abercombie", 560, new Date(2015, 08, 08));
var gBookThree = new Book ("The Lies of Locke Lamora", "Scott Lynch", 499, new Date(2006, 05, 27));
var gBookFour = new Book ("The Black Company", "Glen Cook", 319, new Date(1984, 04, 01));
var gBookFive = new Book ("The Way of Kings", "Brandon Sanderson", 1007, new Date(2010, 07, 10));
var gBookSix = new Book ("Mistborn: The Final Empire", "Brandon Sanderson", 541, new Date(2006, 06, 17));
var gBookSeven = new Book("Shogun", "James Clavell", 1152, new Date(1975, 00, 01));
var gBookEight = new Book ("A Game of Thrones", "George R.R Martin", 694, new Date(1996, 07, 06));
var gBookNine = new Book ("Sapiens: A Brief History of Humankind", "Yuval Noah Harari", 464, new Date(2015, 01, 10));
var gBookTen = new Book ("The Culture Code: The Secrets of Highly Successful Groups", "Daniel Coyle", 304, new Date(2018, 00, 30));
var gBookEleven = new Book ("Life 3.0: Being Human in the Age of Artificial Intelligence", "Max Tegmark", 384, new Date(2017, 07, 29));
var gBookTwelve = new Book("Words of Radiance", "Brandon Sanderson", 1087, new Date(2014, 02, 14));
