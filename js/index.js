document.addEventListener("DOMContentLoaded", function() {

    // consts
    const ul = document.querySelector('#list');
    const showPanel = document.querySelector('#show-panel');

    // --------------------------------------------------------------------------------------
    // Get all Books 
    // --------------------------------------------------------------------------------------
    const mainHeader = document.createElement('h1')
    mainHeader.innerText = "Book Titles"
    ul.append(mainHeader)

    const renderBooks = () => {
    fetch('http://localhost:3000/books')
    .then(resp => resp.json())
    .then(books => showBooks(books))
    }

    const showBooks = (books) => {
        books.forEach(book => {
            showBook(book)
        })
    };

    const showBook = (book) => {
        const header = document.createElement('h5');
        const button = document.createElement('button')
        button.innerText = book.title
        header.append(button)
        button.addEventListener('click', e => {
            bookShowPage(book)
        });
        mainHeader.append(header);
    }

    // --------------------------------------------------------------------------------------
    // Get all Books 
    // --------------------------------------------------------------------------------------

    const bookShowPage = (book) => {
        mainHeader.innerText = book.title;

        const p = document.createElement('p');
        p.innerText = book.description;

        const image = document.createElement('img');
        image.src = book.img_url;

        const button = document.createElement('button');
        button.innerText  ="Like";
        button.addEventListener('click', e => {
            likeBook(book);
            const user = {"id":1, "username":"pouros"}
            book.users.push(user)
        })

        const likedBy = document.createElement('h5');
        likedBy.innerText = "This book was liked by:"

        book.users.forEach(user => {
            const name = document.createElement('p');
            name.innerText = user.username;
            likedBy.append(name)
        })

        mainHeader.append(p, image, likedBy, button);
    }

    const likeBook = (book) => {
        const user = {"id":1, "username":"pouros"}
        book.users.push(user)

        const configObject = {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
        },
        body: JSON.stringify({
                "users": book.users
        })
        };
        
        return fetch(`http://localhost:3000/books/${book.id}`, configObject)
        .then(resp => resp.json())
        .then(bookShowPage)

    }
renderBooks();

});
