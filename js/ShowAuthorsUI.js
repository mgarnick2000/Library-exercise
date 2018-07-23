var ShowAuthorsUI  = function(container){
  Library.call(this);
  this.$container = container;
};

ShowAuthorsUI.prototype = Object.create(Library.prototype);

ShowAuthorsUI.prototype.init = function () {
  // this.pull();
  this._bindEvents();
  return false;
};

ShowAuthorsUI.prototype._bindEvents = function () {
  $('#show-authors').on('click', $.proxy(this._handlesShowAuthors, this));
  return false;
};

ShowAuthorsUI.prototype._handlesShowAuthors = function () {
  var authors = this.getAuthors();
  if (authors.length) {
    this.$container.modal('show');
    this.$container.find('.modal-body').html(this._createULOfAuthors(authors));
  } else {
    alert("Nothing in Library")
  }
  return false;
};

ShowAuthorsUI.prototype._createULOfAuthors = function (authors) {
  var ul = document.createElement('ul');
  for (var i = 0; i < authors.length; i++) {
    var li = document.createElement('li');
    $(li).text(authors[i]);
    ul.append(li);
  }
  return ul;
};

$(function(){
  window.gShowAuthUI  = new ShowAuthorsUI($('#allAuthModal'));
  window.gShowAuthUI.init();
});
