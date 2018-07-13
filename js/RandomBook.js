var RandomBookUI = function() {
  Library.call(this);
  this.$container = $('#randBookmasterdiv');
}
RandomBookUI.prototype = Object.create(Library.prototype);

RandomBookUI.prototype.init = function() {
  this.pull();
  this._bindEvents();
}

RandomBookUI.prototype._bindEvents = function () {
  $('#randBkBtn').on('click', $.proxy(this._handleRandBook, this))
};
RandomBookUI.prototype._handleRandBook = function () {
  var randBook = this.getRandomBook();

  if (randBook) {
    this.$container.modal('show');
    this.$container.find('.modal-body').html(this._createRandBook(randBook));
  }
  return randBook;
};
RandomBookUI.prototype._createRandBook = function () {
  var books = this.getRandomBook();
  if (books === null) {
    alert("these are not the clones you are looking for");
  } else {
    console.log()
  this.$container.find('#cover-img').attr('book-img', books.Cover);
  this.$container.find('#img-rand')
  // this.$container.find('#randBkDetails');
  this.$container.find('#randSynopsis').text(books.Synopsis);
  // this.$container.find('#randBkPages').attr('book-pages', books.Number_Of_Pages);
  this.$container.find('#randBkPages').text(books.Number_Of_Pages);
  // this.$container.find('#randBkPubDate').attr('book-pubDate', books.Publish_Date);
  this.$container.find('#randBkPubDate').text(books.Publish_Date);
  // this.$container.find('#randBkRating')
  // this.$container.find('span').addClass('glyphicon glyphicon-star checked')
  // this.$container.find('#randBkRating').append('#randBkDetails')
  // this.$container.find('#randBkRating').attr('book-rating', books.Rating);
  }
  return books;


};

$(function(){
  window.gRandBookUI  = new RandomBookUI();
  window.gRandBookUI.init();
});
