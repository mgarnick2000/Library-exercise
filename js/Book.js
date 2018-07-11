var Book = function(chooseFile, title, author, numberOfPages, publishDate, synopsis, rating) {
  this.chooseFile ="../assets/Library-catalogues.jpg";
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.publishDate = new Date(publishDate.toString()).getUTCFullYear();
  this.synopsis = "this is a synopsis";
  this.rating = "5-Star";
};
