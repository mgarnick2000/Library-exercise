var RandomBookUI = function(container) {
  Library.call(this);
  this.$container = $('#randBkModal');
}
RandomBookUI.prototype = Object.create(Library.prototype);

RandomBookUI.prototype.init = function() {
  // this.pull();
  this._bindEvents();
}

RandomBookUI.prototype._bindEvents = function () {
  $('#randBkBtn').on('click', $.proxy(this._handleRandBook, this))
};
RandomBookUI.prototype._handleRandBook = function () {
  // var randBook = this.getRandomBook();
    this.$container.modal('show');
    this.$container.find('modal-body').html(this._createRandBook());
    return false;
};
RandomBookUI.prototype._createRandBook = function (_id) {

  var books = this.getRandomBookByID(_id);
  console.log(books);
  $('.modal-title-rand').html(books.Title + " written by " + books.Author);
  $('#cover-img').attr('src', books.Cover);
  $('#coverImgPrev').attr('src', books.Cover);
  // $('#randBkDetails');
  $('#randSynopsis').html(books.Synopsis);
  $('#randBkPages').html(books.Number_Of_Pages);

  $('#randBkPages').html(books.Number_Of_Pages + " pages");
  $('#randBkPubDate').html(books.Publish_Date);
  $('#randBkPubDate').html("Publication Date:" + " " + books.Publish_Date);
  // this.$container.find('#randBkRating')
  // this.$container.find('span').addClass('glyphicon glyphicon-star checked')
  // this.$container.find('#randBkRating').append('#randBkDetails')
  // this.$container.find('#randBkRating').attr('book-rating', books.Rating);

  return books;


};


$(function(){
  window.gRandBookUI  = new RandomBookUI();
  window.gRandBookUI.init();
});
