var SearchUI = function(container) {
  Library.call(this);
  this.$container = $('#search-form');
}

SearchUI.prototype = Object.create(Library.prototype)

SearchUI.prototype.init = function () {
  this.pull();
  this._bindEvents();
};
SearchUI.prototype._bindEvents = function () {
  $('#search-btn').on('click', $.proxy(this._handleSearch, this))
  $('#cover-bk-img').on('click', $.proxy(this.openResults, this));
  return false;

};
SearchUI.prototype._handleSearch = function (args) {
  // args.preventDefault();
  var searchInput = this.$container.find('#exampleInputSearch').val();
  var searchResults = this.search(searchInput);
  // args.preventDefault()
  this.handlerTrigger('searchUpdate', searchResults)
  args.preventDefault()

  return;

  }

SearchUI.prototype.openResults = function (args) {

  var search = this.search(args)
  $('#modal-title-search').html(args.Title)
  $('#cover-bk-img').html(args.Cover);
  return;

};

$(function() {
  window.gSearchUI = new SearchUI();
  window.gSearchUI.init();
})
