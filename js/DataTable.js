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

};
DataTable.prototype._bindCustomListeners = function () {
  $(document).on('objUpdate', $.proxy(this._updateTable, this));
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
    });
  }
};


DataTable.prototype._createRow = function (book) {
  var tr = document.createElement('tr');
  var deleteInput = document.createElement('input');
  var att = document.createAttribute("type");
  att.value = "checkbox";
  deleteInput.setAttributeNode(att);

  for(var key in book){
    var td = document.createElement('td');
    $(td).text(book[key]);
    tr.append(td);

  }
  // tr.append(document.createElement('td').append(deleteInput));
  return tr;
};

$(function() {
  window.gDataTable = new DataTable();
  window.gDataTable.init();
});
