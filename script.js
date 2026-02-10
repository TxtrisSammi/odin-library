// Global Variables
const addBookButton = document.getElementById("add-book");
const dialog = document.querySelector('dialog');
const closeButton = document.getElementById("close-dialog");
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

    this.toggleRead = function () {
        this.read = !this.read;
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
    const buttonDiv = document.createElement("div")
    const delButton = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const readSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    console.log(book.read);
    if (book.read == false) {
        readSVG.classList.add('unread-button')
    } else {
        readSVG.classList.remove('unread-button');
    }

    newBook.setAttribute('index', `${book.id}`);
    newBook.setAttribute('read', `${book.read}`);
    delButton.setAttribute("viewBox", "0 0 24 24");
    readSVG.setAttribute("fill", "none")
    readSVG.setAttribute("viewBox", "0 0 1024 1024");

    title.textContent = book.title;
    author.textContent = `By: ${book.author}`;
    pages.textContent = `Pages: ${book.pages}`;
    delButton.innerHTML = `<g fill="none" stroke="#E8D8C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 11V17"></path><path d="M14 11V17"></path><path d="M4 7H20"></path><path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"></path><path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"></path></g>`;
    readSVG.innerHTML = `<g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M706.3 422.3V94H542.2v328.3l82.1-82 82 82zM788.4 94h-49.3v49.3h49.3c4.5 0 8.2 3.7 8.2 8.2v722.4c0 4.5-3.7 8.2-8.2 8.2H230.2c-4.5 0-8.2-3.7-8.2-8.2V151.5c0-4.5 3.7-8.2 8.2-8.2h279.1V94H230.2c-31.7 0-57.5 25.8-57.5 57.5v722.4c0 31.7 25.8 57.5 57.5 57.5h558.3c31.7 0 57.5-25.8 57.5-57.5V151.5c-0.1-31.7-25.9-57.5-57.6-57.5z" fill="#E8D8C4"></path></g>`

    title.classList.add('book-title');
    author.classList.add('book-author');
    pages.classList.add('book-pages');
    buttonDiv.classList.add('book-buttons');

    readSVG.addEventListener('click', () => {
        book.toggleRead();
        populateBookshelf();
    });

    delButton.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(book), 1);
        populateBookshelf();
    }
    )


    bookDiv.append(author, pages);
    buttonDiv.append(delButton, readSVG);

    newBook.append(title, buttonDiv, bookDiv);

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