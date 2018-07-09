var addBooksUI = function() {
  Library.call(this);
  this._tempBookShelf = new Array();
};

addBooksUI.prototype = Object.create(Library.prototype);

addBooksUI.prototype.init = function() {
  this._bindEvents();
};

addBooksUI.prototype._bindEvents = function() {
  $('.add-books-btn').on('click', $.proxy(this._handleModalOpen, this));
}

addBooksUI.prototype._queueBooks = function() {

}

addBooksUI.prototype._addBooksToLib = function() {

}

addBooksUI.prototype._handleModalOpen = function() {
  $('#addBkModal').modal('show');
}
$(function() {
  window.gAddBooksUI = new addBooksUI();
  window.gAddBooksUI.init();
});
