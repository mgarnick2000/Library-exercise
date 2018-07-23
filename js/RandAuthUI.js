var RandAuthUI = function(container) {
  Library.call(this);
  this.$container = $('#randAuthModal');
}
RandAuthUI.prototype = Object.create(Library.prototype);

RandAuthUI.prototype.init = function () {
  // this.pull();
  this._bindEvents();

};

RandAuthUI.prototype._bindEvents = function () {
  $('#randAuthBtn').on('click', $.proxy(this._handleRandAuth, this))
  return false;
};
RandAuthUI.prototype._handleRandAuth = function () {
  // var authors = this.getRandomAuthorName();
  this.$container.modal('show');
  this.$container.find('.modal-body').html(this._findRandAuth());
  return false;
};

RandAuthUI.prototype._findRandAuth = function () {
  var ul = document.createElement('ul');
  var li = document.createElement('li')
  ul.append(li);
  var authors = this.getRandomAuthorName();
  $('author-name').html(authors.Author);
  li.append(authors);
  return ul;
}

$(function() {
  window.gRandAuthUI = new RandAuthUI();
  window.gRandAuthUI.init();
})
