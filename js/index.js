document.addEventListener('DOMContentLoaded', () => {

getAllBooksTitle();

})
const ulList = document.getElementById('list');
const showPanel = document.getElementById('show-panel');
const booksURL = `http://localhost:3000/books/`;
const user = {"id": 1, "username": "pouros"};


function createBookLi(book) {
    const li = document.createElement('li');
    li.innerText = book.title;
    li.addEventListener('click', () => showBook(book))
    return li
}

function renderBook(book) {
    const li = createBookLi(book);
    ulList.append(li)
}

function renderAllBooks(booksArray) {
    booksArray.forEach(book => renderBook(book));
}

function getAllBooksTitle() {
    fetch(booksURL)
      .then(res => res.json())
      .then(booksArray => renderAllBooks(booksArray));
}


function createShowBook(book) {
    const div = document.createElement('div');
    const header = document.createElement('h5');
    header.innerText = book.title
    const img = document.createElement('img');
    img.src = book.img_url;
    const p = document.createElement('p');
    p.innerText = book.description;
    readButton = document.createElement('button');
    readButton.innerText = 'Read Book';
    const ul = document.createElement('ul');

    book.users.forEach(user => {
        const li = document.createElement('li');
        li.innerText = user.username;
        ul.append(li);
    });
    readButton.addEventListener('click', () => readBookFunction(book))

    div.append(header, img, p, ul, readButton)
    return div
}

function showBook(book) {
    showPanel.innerHTML = ""
    const div = createShowBook(book);
    showPanel.append(div);
}

function readBookFunction(book) {
    let check = book.users.some(u => u.username === 'pouros');
    
    if (check === true) {
        alert('You already read this book')
        showBook(book);
    } 
    if (check === false) {
        book.users.push(user);
        let object = {
        users: book.users
        };
        
        let configObject = {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        body: JSON.stringify(object)
        };

        fetch(`${booksURL}${book.id}`, configObject)
        .then(resp => resp.json())
        .then(updatedBook => showBook(updatedBook))
        .catch(error => console.log(error));
    }
}
