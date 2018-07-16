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
  var searchResults = this.search(args);
  var searchResObj = {searchR: searchResults};
  this.handlerTrigger('objUpdate', searchResults)
  // console.log('searchResObj')
  // searchResults.append(searchTable);
  return searchResults;
};



$(function() {
  window.gSearchUI = new SearchUI();
  window.gSearchUI.init();
})
