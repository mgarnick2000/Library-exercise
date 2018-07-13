var ShowAllBooksUI = function(container) {
  Library.call(this);
  this.$container = $('#allBkModal')
};

ShowAllBooksUI.prototype = Object.create(Library.prototype);

ShowAllBooksUI.prototype.init = function () {
  this.pull();
  this._bindEvents();
  return false;
};

ShowAllBooksUI.prototype._bindEvents = function () {
  $('#show-books').on('click', $.proxy(this._handleShowBooks, this))
  return false;
};

ShowAllBooksUI.prototype._handleShowBooks = function () {
  var titles = this.getTitles();

  if(titles.length) {
    this.$container.modal('show');
    this.$container.find('.modal-body').html(this._createULListOfBooks(titles));
  } else {
    alert("The are no books in the Library");
  }
    return false;
  };

ShowAllBooksUI.prototype._createULListOfBooks = function (titles) {
  var ul = document.createElement('ul');
  for(var i = 0; i < titles.length; i++) {
    var li = document.createElement('li');
    $(li).text(titles[i]);
    ul.append(li);
  }
  return ul;
};


$(function(){
  window.gShowAllBookUI = new ShowAllBooksUI();
  window.gShowAllBookUI.init();
})
