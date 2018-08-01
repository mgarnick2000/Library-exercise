var SearchUI = function(container) {
  Library.call(this);
  this.$container = $('#search-form');
}

SearchUI.prototype = Object.create(Library.prototype)

SearchUI.prototype.init = function () {
  // this.pull();
  this._bindEvents();
};
SearchUI.prototype._bindEvents = function () {
  $('#search-btn').on('click', $.proxy(this._handleSearch, this))
  // $('#cover-bk-img').on('click', $.proxy(this.openResults, this));
  $('#return-lib-btn').on('click', $.proxy(this.returnLibrary, this));



  return false;

};
SearchUI.prototype._searchLoadIcon = function() {
  var div = document.createElement('div');
  $(div).attr("id", "load-btn");
  $(div).addClass('loader search-progress')
  var searchLoad = $('#search-form').append(div);


}

SearchUI.prototype._handleSearch = async function (args) {
  // args.preventDefault();
  this._searchLoadIcon()
  var searchInput = this.$container.find('#exampleInputSearch').val();
  var searchResults = await this.search(searchInput);
  $('#load-btn').remove();

  // args.preventDefault()
  this.handlerTrigger('searchUpdate', searchResults)
  // args.preventDefault()
  $('#search-form')[0].reset()
  return;
  }





SearchUI.prototype.returnLibrary = function () {
  console.log('happened!');
  window.location.reload(true);
};


$(function() {
  window.gSearchUI = new SearchUI();
  window.gSearchUI.init();
})
