// Singleton content
var Library;
(function() {
 var instance;

 Library = function(key) {
   if (instance) {
     return instance;
   }

   instance = this;
   this.bookShelf = []; //Holding array
   this._Libkey = key;
 }
})();
// var Library = function(key) {
//   this.bookShelf = new Array ();
//   this._Libkey = key;
// };
// Library.prototype.bookShelf = new Array();
Library.prototype.validInput = function (input) {
  if (input && input !== "") {
    return true
  }
  return false;
};

Library.prototype.addBook = function(book) {
if(this.validInput(book)) {
  for (var i = 0; i < this.bookShelf.length; i++) {
    var currentBooks = this.bookShelf[i];
    if (book === currentBooks) {
      console.log("this book already exists.");
      return false;
      }
    }
    this.bookShelf.push(book);
    this.storage();
    return true;
  }
  return false;
}

Library.prototype.addBooks = function (books) {
var addNewBooks = 0;
  for (var i = 0; i < books.length; i++) {
    if (this.addBook(books[i]) && Array.isArray(books)) {
      this.addBook(books[i]);
      addNewBooks++;
    }
  }
  this.storage();
  return addNewBooks;
};

Library.prototype.removeBookByTitle = function (title) {
  for (var i = 0; i < this.bookShelf.length; i++) {
    if(title.toLowerCase().trim() === this.bookShelf[i].title.toLowerCase().trim()) {
      this.bookShelf.splice(i,1);
      this.storage();
      return true;
    }
  }
  console.log("No books match the title.");
  return false
};


Library.prototype.removeBookByAuthor = function (authorName) {
var authorRemove = 0;
  for (var i = 0; i < this.bookShelf.length; i++) {
    if (authorName.toLowerCase().trim() === this.bookShelf[i].author.toLowerCase().trim()) {
      this.bookShelf.splice(i,1);
      i--;
      authorRemove++;
    }
  }
  if (authorRemove > 0) {
    this.storage();
    return true;
  } else {
    console.log("No books match that Author's name.");
    return false;
  }
};

Library.prototype.getRandomBook = function () {
  if(this.bookShelf.length === 0) {
    return null;
  }
  return this.bookShelf[Math.floor(Math.random() * this.bookShelf.length)];
};

Library.prototype.getBookByTitle = function (title) {
if(this.validInput(title)) {
  var matchTitleSearch = [];
    for (var i = 0; i < this.bookShelf.length; i++) {
      if (this.bookShelf[i].title.toLowerCase().indexOf(title.toLowerCase().trim()) > -1) {
        matchTitleSearch.push(this.bookShelf[i]);
      }
    }
    return matchTitleSearch;
  }
  return false;
};


Library.prototype.getBooksByAuthor = function (authorName) {
if(this.validInput(authorName)) {
  var matchAuthSearch = [];
    for (var i = 0; i < this.bookShelf.length; i++) {
      if (this.bookShelf[i].author.toLowerCase().indexOf(authorName.toLowerCase().trim()) > -1) {
        matchAuthSearch.push(this.bookShelf[i]);
      }
    }
    return matchAuthSearch;
  }
  return false;
};

Library.prototype.getAuthors = function (authorName) {
var indivAuthors = [];
// var allAuthors = this.getBooksByAuthor(authorName);
var allAuthors = [];

// if (allAuthors.length > 0) {
//   for (var i = 0; i < allAuthors.length; i++) {
//     if(allAuthors[i].author) {
//       indivAuthors.push(allAuthors[i].author)
//       }
//     }
//   }
  for (var i = 0; i < this.bookShelf.length; i++) {
      allAuthors.push(this.bookShelf[i].author);
    }
      indivAuthors = allAuthors.filter(function(value, index, self) {
        return self.indexOf(value) === index
      });
  return indivAuthors;
};

Library.prototype.getRandomAuthorName = function () {
if (this.bookShelf.length === 0) {
  return null;
};
 return this.getRandomBook().author;
};

Library.prototype.getBooksByPubDate = function (title, year) {
  /* This searches for title and publication date.
  Users can search by partial information and partial year.
  if you know the year and title, you can partially or completely enter the year
  and title to get results ("sh", "19"). Output is ["Shogun 1975"].
  if you know the year and title, users can enter it in the quotations
   to find intended results.
  */
  if(this.validInput(title, year)) {
    var pubDateTitleConcate = [];
    var titleSearchPubD = this.getBookByTitle(title);

    if (titleSearchPubD.length > 0) {
      for (var i = 0; i < titleSearchPubD.length; i++) {
        if (titleSearchPubD[i].publishDate.toString().indexOf(year) > -1) {
          pubDateTitleConcate.push(titleSearchPubD[i].title + ", " + titleSearchPubD[i].publishDate.toString())
        }
      }
    }
    return pubDateTitleConcate;
  }
  return false;
};

Library.prototype.getBooksByYear = function (year) {
  /* This is used to search by year as a string to find books that partially
  match the year. This is also used in the searchAuthTitleYear to allow users
  to allow users to search for books by year. The year is formatted to a string
  and the output is set to the book object that matches the year input.
  */

  var pubYear = [];
  if(this.validInput(year)) {
    for (var i = 0; i < this.bookShelf.length; i++) {
      if (this.bookShelf[i].publishDate.toString().indexOf(year) > -1) {
        pubYear.push(this.bookShelf[i]);
      }
    }
    return pubYear;
  }
  return false;
};

Library.prototype.removeAllBooksInBookShelf = function () {
  /*
  this was used to clear all the books in the bookshelf when i was testing
  local storage. the addBooks function did not have this.storage() initially
  and was causing duplicates. i had to remove books by author to remove duplicates.
  this function expedites this process. it is long on purpose to discourage use.
  */
  this.bookShelf = [];
  return true;
};

Library.prototype.search = function (authorName, pubDate) {
  // You need two quotations inside the parentheses to use the search function.
  // One example is ("", ""). if you know the author and the year,
  // you can search for the exact book. Otherwise,
  // if you know the author you can type the name and leave the second quotation blank.
  // if you know the year, you can type the year as a string, and leave the first quotation an empty string.
  // examples, ("carl", "") Output equals ["Carl Sagan", "1997"]
  // second example ("", "1997") Output equals ["Carl Sagan", "1997"]
  var searchContate = [];
  var aAuthSearch = this.getBooksByAuthor(authorName);
  if(aAuthSearch.length > 0) {
    for(var i = 0; i < aAuthSearch.length; i++) {

      if (aAuthSearch[i].publishDate.toString().indexOf(pubDate) > -1) {
        searchContate.push(aAuthSearch[i].author + " " + aAuthSearch[i].publishDate);
      }
    }
  }
  return searchContate;
};

Library.prototype.searchAnyAuthTitleYear = function (args) {
/*
This allows users to search for any book by the year, author, and title
with full or partial search capability.
*/
  var searchResults = [];
  if (this.validInput(args)) {
  var searchAnyArg = this.getBooksByAuthor(args).concat(this.getBookByTitle(args), this.getBooksByYear(args));
    if(searchAnyArg.length > 0) {
      for (var i = 0; i < searchAnyArg.length; i++) {
        searchResults.push(searchAnyArg[i])
      }
    }
    return searchResults;
  }
  return false;
};

Library.prototype.searchPageNumber = function (pages, range) {
  /*
  this allows users to search for books by the number of pages. Users simply enter
  a number in the parentheses and a list of books from the library within 100 pages.
  */
var bookLengthGreater500 = [];
var range = range || 100;
    for (var i = 0; i < this.bookShelf.length; i++) {
      var bookPagesSearch = this.bookShelf[i].numberOfPages;
      if (bookPagesSearch >= pages - range && bookPagesSearch <= pages + range) {
        bookLengthGreater500.push(this.bookShelf[i].author + ", " + this.bookShelf[i].title + ", " + this.bookShelf[i].numberOfPages);
      }
    }
  return bookLengthGreater500;
};


var Book = function(title, author, numberOfPages, publishDate) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.publishDate = new Date(publishDate.toString()).getUTCFullYear();
};

// Local Storage
Library.prototype.storage = function () {
  var dataLib = JSON.stringify(this.bookShelf);
  localStorage.setItem(this._Libkey, dataLib);
};

Library.prototype.pull = function () {
  var translate = JSON.parse(localStorage.getItem(this._Libkey));
  var StorageLib = new Array ();
  for (i = 0; i < translate.length; i++) {
    this.bookShelf[i] = new Book(translate[i].title, translate[i].author, translate[i].numberOfPages, translate[i].publishDate);
  }
};

// Local Storage End

document.addEventListener('DOMContentLoaded', function() {
  window.gLibrary = new Library ("gLibrary");
  // gLibrary.addBook(gBookOne)
  // gLibrary.addBook(gBookTwo)
  // gLibrary.addBook(gBookThree)
  // gLibrary.addBook(gBookFour)
  // gLibrary.addBook(gBookFive)
  // gLibrary.addBook(gBookSix)
  // gLibrary.addBook(gBookSeven)
  // gLibrary.addBook(gBookEight)
  // gLibrary.addBook(gBookNine)
  // gLibrary.addBook(gBookTen)
  // gLibrary.addBook(gBookEleven)
  // gLibrary.addBook(gBookTwelve)
  // gLibrary.addBook(gBookThirteen)
  // gLibrary.addBook(gBookFourteen)
  if(localStorage.length > 0) {
    console.log("Successfully pulled from Local Storage.");
    window.gLibrary.pull();
  }
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
var gBookThirteen = new Book ("Possession", "A.S Byatt", 576, new Date (1991, 09, 01));
var gBookFourteen = new Book ("Possession", "Ann Rule", 384, new Date (2011, 03, 02));
var gBookFifteen = new Book ("Assassin's Apprentice", "Robin Hobb", 448, new Date (1996, 02, 01));
var gBookSixteen = new Book ("Genghis Khan and the Making of the Modern World", "Jack Weatherford", 312, new Date(2005, 02, 22));
var gBookSeventeen = new Book("Pale Blue Dot: A Vision of the Human Future in Space", "Carl Sagan", 386, new Date(1997, 08, 08));
var gBookEighteen = new Book("A Brief History of Time", "Stephen Hawking", 212, new Date (1998, 08, 01));
var booksLibrary = [gBookOne, gBookTwo, gBookThree, gBookFour, gBookFive, gBookSix, gBookSeven, gBookEight, gBookNine, gBookTen, gBookEleven, gBookTwelve, gBookThirteen, gBookFourteen, gBookFifteen, gBookSixteen, gBookSeventeen, gBookEighteen];
