var Book = function(title, author, numberOfPages, publishDate, synopsis, rating, chooseFile) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.publishDate = new Date(publishDate.toString()).getUTCFullYear();
  this.synopsis = synopsis;
  this.rating = rating;
  this.chooseFile = chooseFile;
};
