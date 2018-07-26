var Book = function(oArgs) {
  this._id = oArgs._id;
  this.Cover = oArgs.Cover;
  this.Title = oArgs.Title;
  this.Author = oArgs.Author;
  this.Number_Of_Pages = oArgs.Number_Of_Pages;
  this.Publish_Date = new Date(oArgs.Publish_Date.toString()).getUTCFullYear();
  this.Synopsis = oArgs.Synopsis;
  this.Rating = oArgs.Rating;
  this.Delete = "delete";
  this.__v = oArgs.__v;
};
