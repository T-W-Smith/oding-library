const bookList = document.getElementById('bookList');
const newBookBtn = document.getElementById('newBook');
const dialog = document.getElementById('dialog');
const submitBtn = document.getElementById('submit');
const cancelBtn = document.getElementById('cancelBtn');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const readInput = document.getElementById('read');

newBookBtn.addEventListener("click", () => {
    dialog.showModal();
})

cancelBtn.addEventListener("click", () => {
    clearInput();
})

submitBtn.addEventListener("click", () => {
    addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readInput.checked);
})

const myLibrary = [];
let lastIndex = 0;

function Book(title, author, pages, read, index) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = index

    this.hasRead = function() {
        let hasRead = "";
        if (this.read)
            hasRead = "Read";
        else
            hasRead = "Not read";
        return hasRead;
    };
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read, lastIndex++);
    myLibrary.push(book);
    let div = document.createElement('div');
    div.setAttribute('id', book.index);
    let titleText = document.createElement('p');
    let authorText = document.createElement('p');
    let pagesText = document.createElement('p');
    let readText = document.createElement('p');
    titleText.innerHTML = "Title: " + book.title;
    authorText.innerHTML = "Author: " + book.author;
    pagesText.innerHTML = book.pages + " Pages";
    readText.innerHTML = book.hasRead();
    div.appendChild(titleText);
    div.appendChild(authorText);
    div.appendChild(pagesText);
    div.appendChild(readText);
    bookList.append(div);
    let readBtn = document.createElement('button');
    readBtn.setAttribute('id', 'read');
    readBtn.innerHTML = 'Has Read?';
    div.appendChild(readBtn);
    readBtn.addEventListener("click", () => {
        book.read = !book.read;
        readText.innerHTML = book.hasRead();
    })
    let removeBtn = document.createElement('button');
    removeBtn.setAttribute('id', 'removeBtn');
    removeBtn.innerHTML = 'Remove Book';
    div.appendChild(removeBtn);
    removeBtn.addEventListener("click", () => {
        document.getElementById(removeBtn.parentNode.id).remove();
        myLibrary.splice(removeBtn.parentNode.id, removeBtn.parentNode.id);
    })
    clearInput();
    return false;
}

function clearInput() {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readInput.checked = false;
    dialog.close();
}

window.onload = function () {
    addBookToLibrary("Lord of the Rings", "J.R.R Tolkien", "1137", true);
    addBookToLibrary("The Hobbit", "J.R.R Tolkien", "310", true);
    addBookToLibrary("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", "311", false);
}