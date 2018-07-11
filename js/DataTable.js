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

DataTable.prototype._updateTable = function (e) {
  console.log('called :: _updateTable');
  var _self = this;
    var $tbody = this.$container.find('tbody');
    $tbody.empty();

    $.each(window.bookShelf, function(index, book){
      $tbody.append(_self._createRow(book));
    });
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
