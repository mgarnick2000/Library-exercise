var RemoveBooks = function(container) {
  Library.call(this);
  this.$container = $('#remBkModal');
}
RemoveBooks.prototype = Object.create(Library.prototype);

RemoveBooks.prototype.init = function() {
  this.pull();
  this._bindEvents()
}

RemoveBooks.prototype._bindEvents = function () {
  $('#remBkBtn').on('click', $.proxy(this._handleRemoveBkAuth, this));
  return false;
};
RemoveBooks.prototype._handleRemoveBkAuth = function () {
  this.$container.modal('show');
  this.$container.find('.modal-body').html(this._removeAuth());
  return false;
};
RemoveBooks.prototype._removeAuth = function () {
  var removeInput = this.$container.find('#rem-bk-author').val();
  var remAuthor = this.removeBookByAuthor(removeInput);
  this.handlerTrigger('objUpdate', removeInput);
  if(remAuthor) {
  alert("authors removed!")
  this.handlerTrigger('objUpdate', removeInput);
  } else {
  alert("the authors do not exist in the library");
  this.handlerTrigger('objUpdate', removeInput);
  return;
  }
}


$(function() {
  window.gRemoveBooks = new RemoveBooks();
  window.gRemoveBooks.init();
})
