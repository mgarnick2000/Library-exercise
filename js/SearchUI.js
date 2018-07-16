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
  return false;

};
SearchUI.prototype._handleSearch = function (args) {
  // args.preventDefault();
  var searchInput = this.$container.find('#exampleInputSearch').val();
  var searchResults = this.search(searchInput);
  // args.preventDefault()
  this.handlerTrigger('searchUpdate', searchResults)
  args.preventDefault()


  // var searchTableHead = this._createHeader()
  // var searchTableRow = this._createRow(searchResults);
  // console.log(searchResults);

  }



$(function() {
  window.gSearchUI = new SearchUI();
  window.gSearchUI.init();
})
