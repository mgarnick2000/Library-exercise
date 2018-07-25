var DataTable = function(container) {
  Library.call(this);
  this.$container = $('#data-table');
};

DataTable.prototype = Object.create(Library.prototype);

DataTable.prototype.init = function() {
  // this.pull();
  this._dbTable();
  this._updateTable(window.bookShelf);
  this._bindEvents();
  this._bindCustomListeners();
};
DataTable.prototype._bindEvents = function () {
  this.$container.on('click', ".delete-top-right", $.proxy(this._deleteBook, this));
  this.$container.on('click', '#table-cover-id', $.proxy(this.tableBookInfo,this))
  this.$container.on('blur',  ".library-content", $.proxy(this.updateBookDetails, this))


};
DataTable.prototype._bindCustomListeners = function () {
  $(document).on('objUpdate', $.proxy(this._updateTable, this, window.bookShelf));
  $(document).on('searchUpdate', $.proxy(this._searchTable, this));
};

DataTable.prototype._deleteBook = function (e) {
  var $btnClicked = $(e.currentTarget).closest('tr');
  $btnClicked.remove();

  if(this.removeBookByID($btnClicked.attr("del-row"))) {
    alert("Your book was removed");
    return true;

  }
};

DataTable.prototype._createHeader = function (head) {
  var thead = document.createElement('thead');
    $(thead).attr("id", "table-head")
  var tr = document.createElement('tr');
    $(tr).attr("class", "library-head");
    thead.append(tr)

    for(var key in head) {
      if(key === "_id" || key === "__v") {

      } else {
        var th = document.createElement('th');
        $(th).text([key]);
        tr.append(th);
        $(th).text(key.replace(/_/g, " "));
      }

    }
    return thead;

};

DataTable.prototype._searchTable = function (e) {
  this._updateTable(e.detail)
};

DataTable.prototype._dbTable = function () {
  // console.log("in db-table");
  $.ajax({
    url: window.libraryURL,
    dataType: 'json',
    method: 'GET',
    success: (data) => {
      console.log(data);
      window.bookShelf = data;
      this._updateTable(data);
    }
  })
};




DataTable.prototype._updateTable = function (e) {
  var _self = this;
    var $tbody = this.$container.find('tbody');
    $tbody.empty();
    if(e) {
    this.$container.find('#table-head').replaceWith(this._createHeader(e[0]))
    $.each(e, function(index, book){
      $tbody.append(_self._createRow(book));
      // $tbody.remove(_self._deleteBook(book))
    });
  }
};

DataTable.prototype.updateBookContent = function (_id, update) {
  $.ajax({
    url: window.libraryURL + _id,
    data: update, /* this will be the book object*/
    dataType: 'text',
    method: 'PUT',
    success: (data) => {
      this.handlerTrigger('objUpdate', window.bookShelf);
      this._dbTable();

    }
  })
};

DataTable.prototype.updateBookDetails = function (e) {
var id = $(e.currentTarget).closest('tr').attr('data-id');
console.log(id);
var editLibCont = $(e.currentTarget).attr('edit')
console.log(editLibCont);
var editedText = $(e.currentTarget).text();
console.log(editedText);
var editObj;
  for (var i = 0; i < window.bookShelf.length; i++) {
    if(window.bookShelf[i]._id === id) {
      var editObj = window.bookShelf[i]
      for (key in editObj) {
        // console.log(key);
        if(key === editLibCont) {
          window.bookShelf[i][editLibCont] = editedText;
          this.updateBookContent(editObj._id, editObj)
        }
      }
    }
  }
};


DataTable.prototype._createRow = function (book) {
  var tr = document.createElement('tr');
  $(tr).attr("del-row", book._id);
  $(tr).attr('data-id', book._id);
  $(tr).attr("tdata-id", book.Title);
  // $(tr).attr("trem-id", book._ID);
  // console.log(trem-id);
  // var addTD = document.createElement('td');
  // var delBtn = document.createElement('button');
  // $(delBtn).addClass('Library-content delete-top-right glyphicon glyphicon-remove')
  // $(addTD).append(delBtn);
  // var deleteGlyp = document.createElement('span');
  // tr.setAttribute('data-row', book.Title)

  for(var key in book){
    var td = document.createElement('td');
    $(td).attr('contenteditable', "true");
    $(td).addClass('library-content');
    if(key === "_id" || key === "__v") {
      // do nothing
    } else if (key.toLowerCase() === "cover") {
      $(td).attr('id', 'table-cover-id');
      $(td).attr("data-toggle", "modal");
      $(td).attr("data-target", "#cover-id")
      $(td).addClass('btn');
      $(td).html("<img class='img-thumbnail' src='" + book[key] + "' alt='book cover'>")
      // $(td).text(book[key]);
      $(tr).append(td);
    } else if(key === 'Delete') {
      var tdDel = document.createElement('td');
      var delBtn = document.createElement('button');
      $(delBtn).addClass('delete-lib-item delete-top-right glyphicon glyphicon-remove')
      $(tr).append(delBtn);
    } else if( key.toLowerCase() == 'synopsis') {
      // console.log(book[key].substring(0, 30) + "...");
      $(td).text(book[key].substring(0, 30) + "...");
      $(tr).append(td);
    } else {
      $(td).attr('edit', key) /* this is where i create a key for the title, author, number of pages, publication date, synopsis, and rating td values*/
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
DataTable.prototype.tableBookInfo = function (e) {
  var title = $(e.currentTarget).closest('tr').attr('tdata-id');
  var newBook = this.getBookByTitle(title);

  $('#modal-title-search').html(newBook[0].Title + " written by " + newBook[0].Author)
  // $('#cover-bk-img').html(newBook[0].Cover);
  $('#cover-bk-img').attr('src', newBook[0].Cover);
  // $('#randBkDetails');
  $('#coverSynopsis').html(newBook[0].Synopsis);
  $('#coverBkPages').html(newBook[0].Number_Of_Pages);

  $('#coverBkPages').html(newBook[0].Number_Of_Pages + " pages");
  $('#coverBkPubDate').html(newBook[0].Publish_Date);
  $('#coverBkPubDate').html("Publication Date:" + " " + newBook[0].Publish_Date);
  $('#coverBkRating').html(newBook[0].Rating);

};

$(function() {
  window.gDataTable = new DataTable();
  window.gDataTable.init();
});
