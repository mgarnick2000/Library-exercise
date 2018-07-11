  // Singleton content
var Library;
(function() {
 var instance;

 Library = function(key) {
   if (instance) {
     return instance;
   }

   instance = this;
   this._Libkey = key;
 }
})();
// var Library = function(key) {
//   this.bookShelf = new Array ();
//   this._Libkey = key;
// };
// Library.prototype.bookShelf = new Array();
// Library.prototype.validInput = function (input) {
//   if (input && input !== "") {
//     return true
//   }
//   return false;
// };
Library.prototype.handlerTrigger = function (sEvent, oData) {
  var oData = oData || {}
  if (sEvent) {
    var event = new CustomEvent(sEvent, oData);
    document.dispatchEvent(event);
  }
  // this.handlerTrigger('objUpdate', {detail: Library + "books were added"});
}


Library.prototype.addBook = function(book) {
if(book) {
for (var i = 0; i < window.bookShelf.length; i++) {
  var currentBooks = window.bookShelf[i];
  if (book === currentBooks) {
    console.log("this book already exists.");
    return false;
  }
}
  window.bookShelf.push(book);
  this.storage();
  return true;
}
return false;
}

Library.prototype.checkDuplicates = function(book) {
  if (book) {
    for (var i = 0; i < window.bookShelf.length; i++) {
      var currentBookShelf = window.bookShelf[i];
      if (book.title == currentBookShelf.title) {
        console.log("this book already exists.");
        return false;
      }
    }
    return true;
  }
};

Library.prototype.addBooks = function (books) {
var addNewBooks = 0;
for (var i = 0; i < books.length; i++) {
  if (this.addBook(books[i]) && Array.isArray(books)) {
    // this.addBook(books[i]);
    addNewBooks++;
  }
}
if(addNewBooks > 0){
  this.handlerTrigger('objUpdate', {detail: Library + "books were added"});
}
this.storage();
return addNewBooks;
};

Library.prototype.removeBookByTitle = function (title) {
for (var i = 0; i < window.bookShelf.length; i++) {
  if(title.toLowerCase().trim() === window.bookShelf[i].title.toLowerCase().trim()) {
  window.bookShelf.splice(i,1);
  this.storage();
  return true;
  }
}
console.log("No books match the title.");
return false
};


Library.prototype.removeBookByAuthor = function (authorName) {
var authorRemove = 0;
for (var i = 0; i < window.bookShelf.length; i++) {
  if (authorName.toLowerCase().trim() === window.bookShelf[i].author.toLowerCase().trim()) {
    window.bookShelf.splice(i,1);
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
  if(window.bookShelf.length === 0) {
    return null;
  }
  return window.bookShelf[Math.floor(Math.random() * window.bookShelf.length)];
};

Library.prototype.getBookByTitle = function (title) {
if(title) {
var matchTitleSearch = [];
  for (var i = 0; i < window.bookShelf.length; i++) {
    if (window.bookShelf[i].title.toLowerCase().indexOf(title.toLowerCase().trim()) > -1) {
      matchTitleSearch.push(window.bookShelf[i]);
    }
  }
  return matchTitleSearch;
}
return false;
};


Library.prototype.getBooksByAuthor = function (authorName) {
if(authorName) {
var matchAuthSearch = [];
  for (var i = 0; i < window.bookShelf.length; i++) {
    if (window.bookShelf[i].author.toLowerCase().indexOf(authorName.toLowerCase().trim()) > -1) {
      matchAuthSearch.push(window.bookShelf[i]);
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
for (var i = 0; i < window.bookShelf.length; i++) {
  allAuthors.push(window.bookShelf[i].author);
}
  indivAuthors = allAuthors.filter(function(value, index, self) {
    return self.indexOf(value) === index
  });
return indivAuthors;
};

Library.prototype.getRandomAuthorName = function () {
if (window.bookShelf.length === 0) {
  return null;
};
 return this.getRandomBook().author;
};

// Library.prototype.getBooksByPubDate = function (title, year) {
//   /* This searches for title and publication date.
//   Users can search by partial information and partial year.
//   if you know the year and title, you can partially or completely enter the year
//   and title to get results ("sh", "19"). Output is ["Shogun 1975"].
//   if you know the year and title, users can enter it in the quotations
//    to find intended results.
//   */
//   if(title, year)) {
//     var pubDateTitleConcate = [];
//     var titleSearchPubD = this.getBookByTitle(title);
//
//     if (titleSearchPubD.length > 0) {
//       for (var i = 0; i < titleSearchPubD.length; i++) {
//         if (titleSearchPubD[i].publishDate.toString().indexOf(year) > -1) {
//           pubDateTitleConcate.push(titleSearchPubD[i].title + ", " + titleSearchPubD[i].publishDate.toString())
//         }
//       }
//     }
//     return pubDateTitleConcate;
//   }
//   return false;
// };

Library.prototype.getBooksByYear = function (year) {
  /* This is used to search by year as a string to find books that partially
  match the year. This is also used in the searchAuthTitleYear to allow users
  to allow users to search for books by year. The year is formatted to a string
  and the output is set to the book object that matches the year input.
  */

  var pubYear = [];
  if(year) {
  for (var i = 0; i < window.bookShelf.length; i++) {
    if (window.bookShelf[i].publishDate.toString().indexOf(year) > -1) {
      pubYear.push(window.bookShelf[i]);
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
window.bookShelf = [];
return true;
};

// Library.prototype.search = function (authorName, pubDate) {
//   // You need two quotations inside the parentheses to use the search function.
//   // One example is ("", ""). if you know the author and the year,
//   // you can search for the exact book. Otherwise,
//   // if you know the author you can type the name and leave the second quotation blank.
//   // if you know the year, you can type the year as a string, and leave the first quotation an empty string.
//   // examples, ("carl", "") Output equals ["Carl Sagan", "1997"]
//   // second example ("", "1997") Output equals ["Carl Sagan", "1997"]
//   var searchContate = [];
//   var aAuthSearch = this.getBooksByAuthor(authorName);
//   if(aAuthSearch.length > 0) {
//     for(var i = 0; i < aAuthSearch.length; i++) {
//
//       if (aAuthSearch[i].publishDate.toString().indexOf(pubDate) > -1) {
//         searchContate.push(aAuthSearch[i].author + " " + aAuthSearch[i].publishDate);
//       }
//     }
//   }
//   return searchContate;
// };

Library.prototype.search = function (args) {
/*
This allows users to search for any book by the year, author, and title
with full or partial search capability.
*/
var searchResults = [];
if (args) {
var searchAnyArg = this.getBooksByAuthor(args).concat(this.getBookByTitle(args), this.getBooksByYear(args));
  if(searchAnyArg.length > 1) {
    searchResults = searchAnyArg.filter(function(value, index, self) {
      return self.indexOf(value) === index
  //   for (var i = 0; i < searchAnyArg.length; i++) {
  //     searchResults.push(searchAnyArg[i])
  //   }
  // }
  // return searchResults;
    })
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
  for (var i = 0; i < window.bookShelf.length; i++) {
    var bookPagesSearch = window.bookShelf[i].numberOfPages;
    if (bookPagesSearch >= pages - range && bookPagesSearch <= pages + range) {
      bookLengthGreater500.push(window.bookShelf[i].author + ", " + window.bookShelf[i].title + ", " + window.bookShelf[i].numberOfPages);
    }
  }
  return bookLengthGreater500;
};

// Local Storage
Library.prototype.storage = function () {
  var dataLib = JSON.stringify(window.bookShelf);
  localStorage.setItem(this._Libkey, dataLib);
};

Library.prototype.pull = function () {
  var translate = JSON.parse(localStorage.getItem(this._Libkey));
  var StorageLib = new Array ();
  for (i = 0; i < translate.length; i++) {
    window.bookShelf[i] = new Book(translate[i].chooseFile, translate[i].title, translate[i].author, translate[i].numberOfPages, translate[i].publishDate, translate[i].synopsis, translate[i].rating);
  }
};

// Local Storage End

// document.addEventListener('DOMContentLoaded', function() {
  // window.gLibrary = new Library ('gLibrary');
//   // gLibrary.addBook(gBookOne)
//   // gLibrary.addBook(gBookTwo)
//   // gLibrary.addBook(gBookThree)
//   // gLibrary.addBook(gBookFour)
//   // gLibrary.addBook(gBookFive)
//   // gLibrary.addBook(gBookSix)
//   // gLibrary.addBook(gBookSeven)
//   // gLibrary.addBook(gBookEight)
//   // gLibrary.addBook(gBookNine)
//   // gLibrary.addBook(gBookTen)
//   // gLibrary.addBook(gBookEleven)
//   // gLibrary.addBook(gBookTwelve)
//   // gLibrary.addBook(gBookThirteen)
//   // gLibrary.addBook(gBookFourteen)
//   if(localStorage.length > 0) {
//     console.log("Successfully pulled from Local Storage.");
//     window.gLibrary.pull();
//   }
// });

var gBookOne = new Book ("Promise of Blood", "Brian McClellan", 545, new Date(2013, 03, 16), "At the beginning of Promise of Blood, Field Marshal Tamas has just committed a brutal coup against Adro's monarchy. When he kills every single member of the Royal Cabal, they all utter the same mysterious phrase: You can't break Kresimir's Promise. Adamat, a former police inspector who is now a private investigator, is asked by Tamas to help solve the mystery. Meanwhile, Tamas is busy with purging the country's nobility and struggling to maintain peace during the inevitable civil war.Taniel, Tamas's son and a talented powder mage who is able to consume gunpowder to give himself supernatural powers, is given the task to hunt down an uncommonly powerful member of the Royal Cabal who managed to escape during the coup. Soon it becomes clear that overthrowing the monarchy was just the beginning.", {"5-Star": "5-Star"}, "C:\fakepath\Promise_of_Blood-cover.jpg");
var gBookTwo = new Book ("The Blade Itself", "Joe Abercombie", 560, new Date(2015, 08, 08), "The action, for the most part, takes place in The Union, in the year 575 after its founding. It is a stagnating but powerful empire beset on all sides, by barbarians from The North led by ruthless King Bethod, and the might of the vast Gurkish Empire to the south ruled by an equally ruthless Emperor and religious leader Khalul. The story followed the interweaving stories of six characters.", {"5-Star": "5-Star"} ,"C:\fakepath\The-blade-itself-cover.jpg");
var gBookThree = new Book ("The Lies of Locke Lamora", "Scott Lynch",499, new Date(2006, 05, 27), "Elite con artists calling themselves the Gentleman Bastards rob the rich of the city of Camorr, based on late medieval Venice but on an unnamed world.[2] Two stories interweave: in the present, the Gentleman Bastards fight a mysterious Gray King taking over the criminal underworld; alternate chapters describe the history of Camorr and the Gentleman Bastards, in particular protagonist Locke Lamora.",{"3-Star": "3-Star"},"C:\fakepath\The-lies-of-lock-lamora.jpeg");
var gBookFour = new Book ("The Black Company", "Glen Cook", 319, new Date(1984, 04, 01), "The book combines elements of epic fantasy and dark fantasy as it describes the dealings of an elite mercenary unit—the Black Company—with the Lady, ruler of the Northern Empire.",{"4-Star": "4-Star"},"C:\fakepath\the-black-company-cover.jpg");
var gBookFive = new Book ("The Way of Kings", "Brandon Sanderson", 1007, new Date(2010, 07, 10), "The story rotates between the points of view of Kaladin, Shallan Davar, Szeth-son-son-Vallano, Dalinar Kholin, and several other minor characters, who lead seemingly unconnected lives. Szeth, a Shin man cast out by his people and condemned to obey his constantly changing masters, is sent to murder the king of one of the world's most powerful nations, Alethkar.", {"4-Star": "4-Star"},"C:\fakepath\the-way-of-kings_cover.jpg");
var gBookSix = new Book ("Mistborn: The Final Empire", "Brandon Sanderson",541, new Date(2006, 06, 17), "Mistborn: The Final Empire is set in an analog to the early 18th century, in the dystopian world of Scadrial, where ash constantly falls from the sky, all plants are brown, and supernatural mists cloud every night. One thousand years before the start of the novel, the prophesied Hero of Ages ascended to godhood at the Well of Ascension in order to repel the Deepness, a terror threatening the world whose true nature has been lost to time.", {"4-Star": "4-Star"},"C:\fakepath\mistborn-final-empire.jpeg");
var gBookSeven = new Book("Shogun", "James Clavell",1152, new Date(1975, 00, 01), "Beginning in feudal Japan some months before the critical Battle of Sekigahara in 1600, Shōgun gives an account of the rise of the daimyō Toranaga (based upon the actual Tokugawa Ieyasu). Toranaga's rise to the shogunate is seen through the eyes of the English sailor John Blackthorne, called Anjin (Pilot) by the Japanese, whose fictional heroics are loosely based on the historical exploits of William Adams.", {"5-Star": "5-Star"},"C:\fakepath\shogun-cover.jpg");
var gBookEight = new Book ("A Game of Thrones", "George R.R Martin",694, new Date(1996, 07, 06), "Fourteen years before the story begins, the Targaryens ruled Westeros after having conquered the Seven Kingdoms with the power of their dragons. When the mad king, Aerys Targaryen, raped Lyanna Stark, murdered her brother, and attempted to murder their allies, the Starks, Baratheons, and Arryns rebelled and overthrew the king. Afterward, Robert Baratheon was crowned king and Jon Arryn was appointed the “Hand of the King.” Meanwhile, Ned Stark returned to Winterfell, in the north, the seat of their power and where A Game of Thrones begins.", {"4-Star": "4-Star"}, "C:\fakepath\game-of-thrones-cover.jpeg");
var gBookNine = new Book ("Sapiens: A Brief History of Humankind", "Yuval Noah Harari",464, new Date(2015, 01, 10), "Harari surveys the history of humankind from the evolution of archaic human species in the Stone Age up to the twenty-first century, focusing on our own species of human, Homo sapiens. He divides the history of Sapiens into four major parts: The Cognitive Revolution (c. 70,000 BC, when Sapiens evolved imagination.", {"4-Star": "4-Star"}, "C:\fakepath\sapiens-book.png");
var gBookTen = new Book ("The Culture Code: The Secrets of Highly Successful Groups", "Daniel Coyle", 304, new Date(2018, 00, 30), "Coyle unearths helpful stories of failure that illustrate what not to do, troubleshoots common pitfalls, and shares advice about reforming a toxic culture. Combining leading-edge science, on-the-ground insights from world-class leaders, and practical ideas for action, The Culture Code offers a roadmap for creating an environment where innovation flourishes, problems get solved, and expectations are exceeded.", {"4-Star": "4-Star"},"C\fakepath\culture-code.png");
var gBookEleven = new Book ("Life 3.0: Being Human in the Age of Artificial Intelligence", "Max Tegmark",384, new Date(2017, 07, 29), "Life 3.0 discusses Artificial Intelligence (AI) and its impact on the future of life on Earth and beyond. The book discusses a variety of societal implications, what can be done to maximize the chances of a positive outcome, and potential futures for humanity, technology and combinations thereof.", {"3-Star": "3-Star"},"C:\fakepath\life-3-0.jpeg");
var gBookTwelve = new Book("Words of Radiance", "Brandon Sanderson", 1087, new Date(2014, 02, 14),"The ancient oaths have at last been spoken; the spren return. Men seek that which was lost. I fear the struggle will destroy them. It is the nature of the magic. A broken soul has cracks into which something else can be fit.  Surgebindings, the powers of creation themselves.  They can brace a broken soul; but they can also widen its fissures.", {"3-Star": "3-Star"},"C:\fakepath\words-of-radiance.jpeg");
var gBookThirteen = new Book ("Assassin's Apprentice", "Robin Hobb", 448, new Date (1996, 02, 01), " The novel covers the early life of FitzChivalry, a royal bastard living in Buckkeep Castle as he begins his training as an assassin and successfully safeguards the throne from his over-ambitious uncle Regal, almost at the cost of his life.", {"4-Star": "4-Star"},"C:\fakepath\assassins-apprentice.jpeg");
var gBookFourteen = new Book ("Genghis Khan and the Making of the Modern World", "Jack Weatherford", 312, new Date(2005, 02, 22), "The book tells the story of Genghis Khan's life, influence and legacy, through his successors to the present day. It focuses on a number of recently unearthed and translated historical texts that, in centuries past, were unavailable, such as the Secret History of the Mongols. Genghis Khan and the Making of the Modern World is effectively an extended attempt to rehabilitate the image of Genghis Khan in a much more positive light than is normal for Western historiography.", {"4-Star": "4-Star"},"C:\fakepath\genghis-khan.jpeg");
var gBookFifteen = new Book("Pale Blue Dot: A Vision of the Human Future in Space", "Carl Sagan",386, new Date(1997, 08, 08), "Sagan mixes philosophy about the human place in the universe with a description of the current knowledge about the Solar System. He also details a human vision for the future.", {"5-Star": "5-Star"}, "C:\fakepath\pale-blue-dot.jpeg");
var gBookSixteen = new Book("A Brief History of Time", "Stephen Hawking", 212, new Date (1998, 08, 01), "A Brief History Of Time is Stephen Hawking’s way of explaining the most complex concepts and ideas of physics, such as space, time, black holes, planets, stars and gravity to the average Joe, so that even you and I can better understand how our planet was created, where it came from, and where it’s going.", {"4-Star": "4-Star"},"C:\fakepath\brief-history-of-time.jpeg");
var booksLibrary = [gBookOne, gBookTwo, gBookThree, gBookFour, gBookFive, gBookSix, gBookSeven, gBookEight, gBookNine, gBookTen, gBookEleven, gBookTwelve, gBookThirteen, gBookFourteen, gBookFifteen, gBookSixteen];
