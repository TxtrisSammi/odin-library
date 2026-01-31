// Global Variables
const addBookButton = document.getElementById("add-book");
const dialog = document.querySelector('dialog');
const closeButton = document.querySelector('dialog button');
const bookshelf = document.querySelector('div.bookshelf')
const defaultValues = bookshelf.innerHTML;
const form = document.forms[0];

const myLibrary = [];

// Event Listeners
addBookButton.addEventListener('click', () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
    form.reset();
});

form.addEventListener("submit", addBookToLibrary);

function Book(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
    this.info = function () {
        console.log(`${title} by ${author} has ${pages} pages. Read: ${read} ID: ${id}`);
    }
}

function addBookToLibrary(e) {
    e.preventDefault();

    const id = crypto.randomUUID();
    const title = form.title.value;
    const author = form.author.value;
    const pages = form.pages.value;

    const newBook = new Book(id, title, author, pages);

    dialog.close();
    form.reset();
    myLibrary.push(newBook);
    console.log(myLibrary);
    populateBookshelf();
}

function createBookElement(book) {
    const newBook = document.createElement("div");
    newBook.classList.add('book');

    const title = document.createElement("p");
    const bookDiv = document.createElement("div");
    const author = document.createElement("p");
    const pages = document.createElement("p");

    newBook.setAttribute('index', `${book.id}`);
    newBook.setAttribute('read', `${book.read}`)

    title.textContent = book.title;
    author.textContent = `By: ${book.author}`;
    pages.textContent = `Pages: ${book.pages}`;

    title.classList.add('book-title');
    author.classList.add('book-author');
    pages.classList.add('book-pages');

    bookDiv.append(author, pages);
    newBook.append(title, bookDiv);

    bookshelf.append(newBook);
}

function populateBookshelf() {
    bookshelf.innerHTML = "";
    bookshelf.append(addBookButton);
    myLibrary.forEach(book => {
        createBookElement(book);
    });
}

// Create default book 
farenheit = new Book(crypto.randomUUID(), "Farehnheit 451", "Ray Bradbury", 260, true);
myLibrary.push(farenheit);

populateBookshelf();