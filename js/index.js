// URLs
const BASE_URL = "http://localhost:3000"
const BOOKS_URL = `${BASE_URL}/books`


// GLOBAL VARIABLES
const titleList = document.querySelector("#list")
const showPanel = document.querySelector("#show-panel")
const user1 = {"id":1, "username":"pouros"}


document.addEventListener("DOMContentLoaded", () => {

    const getData = url => {
        return fetch(url)
        .then(response => response.json())
    }

    getData(BOOKS_URL)
    .then(books => renderBooks(books))

    

    const renderBooks = books => {
        titleList.innerText = "List Of Books"
        books.forEach((book) => renderBook(book))
    }
    // "List Of Books" needs to be in the renderBooks function
    // before the iteration command line
    // Including it in the renderBook function will only give one instance
    // of a book and delete all others. 

    // Try to render each book title
    // From the book title list, a user should be able to click on the title
    // which should take them to the id page which has all the attirbutes for the book instance
    const renderBook = book => {
        
        const li = document.createElement("li")
        li.classList.add("title")
        li.setAttribute("id", `${book.id}`)
        li.innerText = book.title
        
        titleList.append(li)

        li.addEventListener("click", () => {
            // remember that everytime the addEventListener is clicked, 
            // the page should clear out before displaying the instance 
            // clicked on.
            showPanel.innerText = ""

            const header = document.createElement("h2")
            header.innerText = book.title

            const p = document.createElement("p")
            p.innerText = book.description

            const img  = document.createElement("img")
            img.src = book.img_url

            const ul = document.createElement("ul")
            ul.innerText = "Liked By: "
            
            userBooks(book.users, ul)

            const readBtn = document.createElement("button")
            readBtn.innerText = "Read Book"

            readBtn.addEventListener("click", (event) => {
                book.users.find(user => user.id === user1.id) ? book.users = book.users.filter(user => user.id !== user1.id) : book.users.push(user1)
                // console.log(book.users.includes(user1))
                const dataPack = {
                    "users": [
                        ...book.users
                    
                    ]
                  }
                //   console.log(dataPack)
                const configObject = {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    },
                    body: JSON.stringify (
                        dataPack
                        )
                        
                        
                    }
                    // debugger
                fetch(`${BOOKS_URL}/${book.id}`, configObject)
                .then(response => response.json())
                .then(updatedBook => {
                    book = updatedBook
                    ul.innerText = "Liked By: "
                    userBooks(book.users, ul)
                })
                

                
            })
            
            showPanel.append(header, p, img, ul, readBtn)

        })  
        
        
    }

    const userBooks = (users, ul) => {
        
        users.forEach((user) => renderUser(user, ul))
    }

    const renderUser = (user, ul) => {

        const userLi = document.createElement("li")
        userLi.classList.add("users")
        userLi.setAttribute("id", `User-${user.id}`)
        userLi.innerText = user.username
        ul.append(userLi)
    }
    


});

