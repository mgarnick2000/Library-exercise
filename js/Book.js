var Book = function(oArgs) {
  this.Cover ="../assets/Library-catalogues.jpg";
  this.title = oArgs.title;
  this.author = oArgs.author;
  this.numberOfPages = oArgs.numberOfPages;
  this.publishDate = new Date(String(oArgs.publishDate)).getUTCFullYear();
  this.synopsis = oArgs.synopsis;
  this.rating = oArgs.rating;
};
