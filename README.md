# gLibrary
This read me file is used to describe the functions used in the Library. This program is an application that uses jQuery, mongo database, Ajax requests, bootstrap, css, and html. This application also has a rest endpoint that runs on a node.js server.

## Book Constructor
The book constructor located in Book.js stores the following properties: id, Cover, Title, Author, Number_Of_Pages, Publish_Date, Synopsis, Rating, Delete, and version. The id and version is created with the post function in the mongoose database. The book properties set the header in the DataTable.js file. These properties take the parameter of oArgs. The value of all properties takes oArgs."value", such as oArgs.Title, or oArgs.Author.The only unique property is the Publish_Date property, which takes a new Date(oArgs.Publish_Date.toString()).getUTCFullYear(). This displays the date as a year.

## Javascript files
The main javascript engine is the library-main file. Additionally, we have js files for: addBooks, DataTable, RandAuthUI, RandomBook, RemoveBook, SearchUI, ShowAllBooks, ShowAllAuthors, and util. Each file stores unique methods that relate to a modal or the table that displays book objects. In the section below, i describe the methods within the javascript files and the inputs needed to return intended outputs.

## Library-main.js
The file serves as the engine for the application. The methods within the engine include: handlerTrigger, addBook, checkDuplicates, addBooks, removeBookByID, removeBookByAuthor, getRandomBook, getRandomBookByID, getBookByTitle, getBookByID, getBooksByAuthor, getAuthors, getTitles, getRandomAuthorName, getBooksByYear, removeAllBooksInBookShelf, search, and searchPageNumber. The main functions are addBook, addBooks, removeBookByAuthor, removeBookByID, handlerTrigger, search, and getRandomBookByID.

### addBook
this method takes a book parameter. The user passes in the book object properties. The method loops through the bookShelf and checks whether the book exists; and if it does not exist, then it adds the book. This works best when creating a variable of the book object. and pass in the variable book object to add a book. This function is used in the add books modal on the html webpage.

### addBooks.js
The addBooks.js file creates an event handler to manage the click events for opening the modal, adding books to queue, and adding to the bookshelf.  There is also an event for adding an image to the myFile input field. The methods within are queueBooks, addBooksToLib, and addImage. A temporary bookshelf is created for the queueBooks function. This is a global array within the container.  The queueBooks takes all the inputs in the modal which have names assigned to create a `serializearray`. From the array of name and value pairs, an object is created, where the jquery `$.each` was used to loop through the key value pairs and place them in an array. the inputs were used to create a book object, error handling was added to prevent empty strings. The checkDuplicates methods was used to verify a user was not attempting to add a book that already exists in the temporary bookshelf. The queueBooks is the longest method in the application.
> The modal takes the title, author, number of pages, publish date, synopsis, rating, and image to create the book object. The Rating is set to a string of 1-5 Stars. The Publish Date is set to the Year. Only the year is necessary to add a book.
>
The AddBooksToLib checks for duplicates against the main bookshelf. Once no duplicates are detected, then the books are added to the bookshelf after selecting the Add Books To Library button. Users can add multiple books by inputing the fields and selecting Queue Books to Add. This can be done multiple times and a counter is set to notify the user how many books are in the queue. When ready to add books, simply select the Add Books to Library button. The book will send a post request via Ajax to the mongodb and the handlerTrigger will fire to update the table and the bookshelf.
> if users accidently close the modal without selecting queue books to library, the information will remain in the input fields.
>
The addImage method takes the images and sets them to base64 encoded. The method takes the `querySelector`, `FileReader`,  and creates a `reader`.`addEventListener('load', function())`. Finally, the addEventListener takes the `readAsDataURL(file);`

### DataTable.js
One of the most robust set of methods lies within the datatable file. The click event are for the book modal, delete Book row, and edit book object input values. This is heavily connected with the database. Most GET and PUT requests are used in this file. There are custom listeners set for the table and bookshelf to reflect changes. The search capability updates the table to reflect the results that match the criteria setup in the search function in library-main.js.The delete book by row function resides in this file. An attribute is set on the row and the delete button is placed inside the delete column. An event handler is set to remove the closest tr on the row with the attribute attachd to it. The header was created in this file. Using the id on the `<thead>`, i looped through the book object to create the table heading.

#### searchTable
SearchTable simply takes the function update table with the parameter `e.detail`.

#### updateTable
the container is `<tbody>`. The method takes the parameter of 'e' and replaces the header with the createHeader function. The `$.each` is used to loop over the book objects, where the createRow function is called to append them to the table rows.

#### updateBookDetails
Takes a parameter of 'e' an attribute is assigned to the table rows with the book id attached. An event handler is binded to a blur event on the table data cell and row. 
