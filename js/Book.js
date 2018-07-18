var Book = function(oArgs) {
  this.Cover = oArgs.Cover;
  this.Title = oArgs.Title;
  this.Author = oArgs.Author;
  this.Number_Of_Pages = oArgs.Number_Of_Pages;
  this.Publish_Date = new Date(String(oArgs.Publish_Date)).getUTCFullYear();
  this.Synopsis = oArgs.Synopsis;
  this.Rating = oArgs.Rating;
  this.Delete = "delete";
};
