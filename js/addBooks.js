var addBooksUI = function(container) {
  Library.call(this);
  this._tempBookShelf = new Array();
  this.numberBooksInQueue = 0;
  this.$container = container;
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
  var queTitle = $('#book-title').val();
  var queAuthor = $('#book-author').val();
  var quePages = $('#book-pages').val();
  var quePubDate = $('#book-pubDate').val();
  var queSynopsis = $('#synopsis').val();
  var queRating = $('#rating-btn').val();
  // var queChooseFile = $('#choose-file-btn').val();
  var newBook = new Book(queTitle, queAuthor, quePages, quePubDate, queSynopsis, queRating);
  var badCount = 0;
  for(var i = 0; i < this._tempBookShelf.length; i++) {
    var currentTempBookShelf = this._tempBookShelf[i];
    if (queTitle === currentTempBookShelf.title) {
      badCount++;
      break;
    }
  }
  if(badCount > 0){
    return console.log('false');
  }
  this.numberBooksInQueue++;
  $('.cart-num').text(this.numberBooksInQueue + ' ');
  this._tempBookShelf.push(newBook);
  $('#addBookForm')[0].reset();
    return this._tempBookShelf
  }


addBooksUI.prototype._addBooksToLib = function() {
  this.addBooks(this._tempBookShelf);
  $('.lib-num').text(this.numberBooksInQueue + ' ');
  // // $('#addBookForm')[0].reset();
  // this.numberBooksInQueue = 0;
  // this.numberBooksInQueue++;


}

addBooksUI.prototype._handleModalOpen = function() {
  this.$container.modal('show');
}

$(function() {
  window.gAddBooksUI = new addBooksUI($('#addBkModal'));
  window.gAddBooksUI.init();
});
