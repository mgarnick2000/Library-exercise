var DataTable = function(container) {
  Library.call(this);
  this.$container = $('#data-table');
};

DataTable.prototype = Object.create(Library.prototype);

DataTable.prototype.init = function() {
  // this.pull();
  this._dbTable();
  this._updateTable();
  this._bindEvents();
  this._bindCustomListeners();
};
DataTable.prototype._bindEvents = function () {
  this.$container.on('click', ".delete-top-right", $.proxy(this._deleteBook, this));
  this.$container.on('click', '#table-cover-id', $.proxy(this.tableBookInfo,this))
  this.$container.on('blur',  ".library-content", $.proxy(this.updateBookDetails, this))


};
DataTable.prototype._bindCustomListeners = function () {
  $(document).on('objUpdate', $.proxy(this._updateTable, this));
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
  console.log('_dbTable');
  $.ajax({
    url: window.libraryURL,
    dataType: 'json',
    method: 'GET',
    success: (data) => {
      console.log(data);
      window.bookShelf = this._createBookObj(data);
      this._updateTable();
    }
  })
};




DataTable.prototype._updateTable = function () {
  var _self = this;
  var $tbody = this.$container.find('tbody');
  $tbody.empty();
  if(window.bookShelf) {
    this.$container.find('#table-head').replaceWith(this._createHeader(window.bookShelf[0]))
    $.each(window.bookShelf, function(index, book){
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
// console.log(id); clicking this row identifies the id associated with the book object in the row.
var editLibCont = $(e.currentTarget).attr('edit')
// console.log(editLibCont); clicking on this td cell identifies the key of the cell that was selected, such a Author in the Book Object.
// this allows developers to target the td cell. Without the attr on the td cell, it will not overwrite the changes to the cell.
var editedText = $(e.currentTarget).text();
// console.log(editedText); clicking on this td cell identifies the text value of the td cell, such as Brian McClellan in the Book Object.
var editObj;
  for (var i = 0; i < window.bookShelf.length; i++) {
    if(window.bookShelf[i]._id === id) {
      // looping the bookshelf and searching the indexes for the _id. You will check the _id of bookShelf versus the id on the book object selected. This returns the book object of the id selected.
      var editObj = window.bookShelf[i]
      // if the _id and id is the same, you set the editObj to the window.bookshelf[i]. This displays the entire book object of the td cell selected.
      for (key in editObj) {
        // next, you loop through keys of the selected td cell in the the book object named editObj
        if(key === editLibCont) {
          // if the key of the td cell selected matches the book object selected. You can overwrite the text within the td cell.
          window.bookShelf[i][editLibCont] = editedText;
          // This overwrites the text of the selected td cell and pushes the changes to the book object. This takes the book._id and key of td selected and sets them equal to the edited text.
          this.updateBookContent(editObj._id, editObj)
          // this is the PUT request that takes the changes to the objects _id and book object and sends them to the database.
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
      $(td).attr("data-target", "#cover-id");
      $(td).addClass('btn');
      $(td).html("<img class='img-thumbnail' src='" + book[key] + "' alt='book cover'>")
      $(tr).append(td);
    } else if(key === 'Delete') {
      var tdDel = document.createElement('td');
      var delBtn = document.createElement('button');
      $(delBtn).addClass('delete-lib-item delete-top-right glyphicon glyphicon-remove')
      $(tr).append(delBtn);
    } else if( key.toLowerCase() == 'synopsis') {
      $(td).attr('edit', key)
      $(td).text(book[key].substring(0, 100) + "...");
      $(tr).append(td);
    } else {
      $(td).attr('edit', key) /* this is where i create a key for the title, author, number of pages, publication date, synopsis, and rating td values. this allows developers to match the key to the value in the table data cell to the book object..*/
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
