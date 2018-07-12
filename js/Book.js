var Book = function(oArgs) {
  this.Cover ="../assets/Library-catalogues.jpg";
  this.Title = oArgs.title;
  this.Author = oArgs.author;
  this.Number_Of_Pages = oArgs.numberOfPages;
  this.Publish_Date = new Date(String(oArgs.publishDate)).getUTCFullYear();
  this.Synopsis = oArgs.synopsis;
  this.Rating = oArgs.rating;
  this.Delete = oArgs.delete;
};
