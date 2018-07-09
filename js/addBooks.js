var addBooksUI = function(container) {
  Library.call(this);
  this._tempBookShelf = new Array();
  this.$container = container;
};

addBooksUI.prototype = Object.create(Library.prototype);

addBooksUI.prototype.init = function() {
  this._bindEvents();
};

addBooksUI.prototype._bindEvents = function() {
  $('#add-books-btn').on('click', $.proxy(this._handleModalOpen, this));
}

addBooksUI.prototype._queueBooks = function() {

}

addBooksUI.prototype._addBooksToLib = function() {

}

addBooksUI.prototype._handleModalOpen = function() {
  this.$container.modal('show');
}
$(function() {
  window.gAddBooksUI = new addBooksUI($('#addBkModal'));
  window.gAddBooksUI.init();
});
