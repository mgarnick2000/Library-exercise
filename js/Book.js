var Book = function(oArgs) {
  this.Cover ="../assets/Library-catalogues.jpg";
  this.Title = oArgs.title;
  this.Author = oArgs.author;
  this.NumberOfPages = oArgs.numberOfPages;
  this.PublishDate = new Date(String(oArgs.publishDate)).getUTCFullYear();
  this.Synopsis = oArgs.synopsis;
  this.Rating = oArgs.rating;
};
