// one off functions, should not inherit. this is minimal.
// resolve URL or path a global variable to grab global URL.
var bookShelf = new Array();
var libraryURL = 'http://127.0.0.1:3002/Library/'
this.currentPage = 1;
this.totalPages;
this.numberResults = 5;

_updateTable = function (e) {
  var _self = this;
    var $tbody = $('#data-table').find('tbody');
    $tbody.empty();
    if(e) {
    $('#data-table').find('#table-head').replaceWith(this._createHeader(e[0]))
    $.each(e, function(index, book){
      $tbody.append(_self._createRow(book));
      // $tbody.remove(_self._deleteBook(book))
    });
  }
};
_createRow = function (book) {
  var tr = document.createElement('tr');
  $(tr).attr("del-row", book._id);
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
_createHeader = function (head) {
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
_createRandBook = function () {

  var books = this.getRandomBook();
  $('.modal-title-rand').html(books.Title + " written by " + books.Author)
  $('#cover-img').attr('src', books.Cover);
  $('#coverImgPrev').attr('src', books.Cover);
  // $('#randBkDetails');
  $('#randSynopsis').html(books.Synopsis);
  $('#randBkPages').html(books.Number_Of_Pages);

  $('#randBkPages').html(books.Number_Of_Pages + " pages");
  $('#randBkPubDate').html(books.Publish_Date);
  $('#randBkPubDate').html("Publication Date:" + " " + books.Publish_Date);
  // this.$container.find('#randBkRating')
  // this.$container.find('span').addClass('glyphicon glyphicon-star checked')
  // this.$container.find('#randBkRating').append('#randBkDetails')
  // this.$container.find('#randBkRating').attr('book-rating', books.Rating);

  return books;


};
