var addBooksUI = function(container) {
  Library.call(this);
  this._tempBookShelf = new Array();
  this.numberBooksInQueue = 0;
  this.$container = $('#addBkModal');
};

addBooksUI.prototype = Object.create(Library.prototype);

addBooksUI.prototype.init = function() {
  this._bindEvents();
};

addBooksUI.prototype._bindEvents = function() {
  $('#add-books-btn').on('click', $.proxy(this._handleModalOpen, this));
  $('#queue-bk-btn').on('click', $.proxy(this._queueBooks, this));
  // $('.cart-queue-num').on('click', $.proxy(this._queueBooks, this));
  $('.complete-add-bk').on('click', $.proxy(this._addBooksToLib, this));
  // $('.bk-add-success').on('click', $.proxy(this._addBooksToLib, this));
}


addBooksUI.prototype._queueBooks = function() {
// If selecting input field by id, push the data to temporary _tempBookShelf
// uptick the first letter in a string with i++
  var queInputs = $('#addBookForm').serializeArray();

  var queBooksObj = new Object();
  $.each(queInputs, function(index, ivp) {
    queInputs[ivp.name] = ivp.value;
  })

  var badCount = 0;
  var newBook = new Book(queInputs);
  if(newBook.title === "" || newBook.author === "" || newBook.numberOfPages === "" || newBook.pubDate === "") {
    alert("Please enter the required information.")
    return false;
  }
  if(this.checkDuplicates(newBook)) {
  for(var i = 0; i < this._tempBookShelf.length; i++) {
    var currentTempBookShelf = this._tempBookShelf[i];
    if (queInputs === currentTempBookShelf.title) {
      badCount++;
      break;
    }
  }
  if(badCount > 0) {
    return console.log('false');
  }
} else{
  alert("this book already exists in the library");
  return console.log("this book already exists in the library");
}
  this.numberBooksInQueue++;
  $('.cart-num').text(this.numberBooksInQueue + ' ');
  this._tempBookShelf.push(newBook);
  $('#addBookForm')[0].reset();
  // this.numberBookInQueue = 0;
  // $('.cart-num').text(this.numberBooksInQueue.length);
    return this._tempBookShelf
  }

addBooksUI.prototype.clearTempBookQueue = function () {
  this._tempBookShelf = [];
  this.numberBooksInQueue = [];
  return true;
};


addBooksUI.prototype._addBooksToLib = function(book) {
  if (this.checkDuplicates(book)) {
  this.addBooks(this._tempBookShelf);
  $('.lib-num').text(this.numberBooksInQueue + ' ');
  $('#addBookForm')[0].reset();
  this.clearTempBookQueue()
  $('.lib-num').text(this.numberBooksInQueue.length)
  // this.numberBooksInQueue = 0;
  // this._tempBookShelf = [
  // this.numberBooksInQueue++;
  }
}

addBooksUI.prototype._handleModalOpen = function() {
  this.$container.modal('show');
}

$(function() {
  window.gAddBooksUI = new addBooksUI();
  window.gAddBooksUI.init();
});
