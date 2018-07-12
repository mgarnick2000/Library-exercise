var Book = function(oArgs) {
  this.chooseFile ="../assets/Library-catalogues.jpg";
  this.title = oArgs.title;
  this.author = oArgs.author;
  this.numberOfPages = oArgs.numberOfPages;
  this.publishDate = new Date(String(oArgs.publishDate)).getUTCFullYear();
  this.synopsis = "this is a synopsis";
  this.rating = "5-Star";
};
