var DataTable = function(container) {
  Library.call(this);
  this.$container = $('#data-table');
};

DataTable.prototype = Object.create(Library.prototype);

DataTable.prototype.init = function() {
  this.pull();
  this._updateTable();
  this._bindEvents();
  this._bindCustomListeners();
};
DataTable.prototype._bindEvents = function () {
  this.$container.on('click', ".delete-top-right", $.proxy(this._deleteBook, this));

};
DataTable.prototype._bindCustomListeners = function () {
  $(document).on('objUpdate', $.proxy(this._updateTable, this));
};

DataTable.prototype._deleteBook = function (e) {
  var $btnClicked = $(e.currentTarget).closest('tr');
  $btnClicked.remove();

  if(this.removeBookByTitle($btnClicked.attr('tdata-id'))) {
    alert("Your book was removed");
    return true;

  }




};

DataTable.prototype._createHeader = function (head) {
  var thead = document.createElement('thead');
    $(thead).addClass("library-head")
  var tr = document.createElement('tr');
    thead.append(tr)

    for(var key in head) {
      var th = document.createElement('th');
      $(th).text([key]);
      tr.append(th);
      $(th).text(key.replace(/_/g, " "));

    }
    return thead;
};
DataTable.prototype._updateTable = function (e) {
  var _self = this;
    var $tbody = this.$container.find('tbody');
    $tbody.empty();
    if(window.bookShelf) {
    this.$container.append(this._createHeader(window.bookShelf[0]))
    $.each(window.bookShelf, function(index, book){
      $tbody.append(_self._createRow(book));
      // $tbody.remove(_self._deleteBook(book))
    });
  }
};


DataTable.prototype._createRow = function (book) {
  var tr = document.createElement('tr');
  $(tr).attr('tdata-id', book.Title);
  var addTD = document.createElement('td');
  // var delBtn = document.createElement('button');
  // $(delBtn).addClass('Library-content delete-top-right glyphicon glyphicon-remove')
  // $(addTD).append(delBtn);
  // var deleteGlyp = document.createElement('span');
  // tr.setAttribute('data-row', book.Title)

  for(var key in book){
    var td = document.createElement('td');
    $(td).addClass('library-content');
    if(key === 'Delete') {
      var tdDel = document.createElement('td');
      var delBtn = document.createElement('button');
      $(delBtn).addClass('delete-lib-item delete-top-right glyphicon glyphicon-remove')
      $(tr).append(delBtn);
    } else if( key.toLowerCase() == 'synopsis') {
      // console.log(book[key].substring(0, 30) + "...");
      $(td).text(book[key].substring(0, 30) + "...");
      $(tr).append(td);

    } else {
      $(td).text(book[key]);
      $(tr).append(td);
    }
  }
  // var tdDel = document.createElement('td');
  // var delBtn = document.createElement('button');
  // $(delBtn).addClass('Library-content delete-top-right glyphicon glyphicon-remove')
  // $(tr).append(delBtn);
  // tr.append(document.createElement('td').append(deleteInput));

  return tr;
};

$(function() {
  window.gDataTable = new DataTable();
  window.gDataTable.init();
});
