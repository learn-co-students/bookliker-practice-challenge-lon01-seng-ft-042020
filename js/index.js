
 const listUl = document.querySelector("#list");
 const showPanel = document.querySelector("#show-panel");
 const likeButton = document.createElement("button")

document.addEventListener("DOMContentLoaded", function() {
 getBooks(); 
//  updateLikes();
});

function getBooks() {
    return fetch('http://localhost:3000/books')
    .then(resp => resp.json() )
    .then( booksArray => {
        for (const bookObject of booksArray ){
          const bookLi = document.createElement("li")
          const bookTitle = bookObject.title
          bookLi.innerHTML = bookTitle
          listUl.appendChild(bookLi)
        //   debugger
          //Add a click event listener on each book title
          bookLi.addEventListener("click", function () {
            //Create a h3, img & p tags to display a book
          const bookHeader = document.createElement("h3")
          bookHeader.innerHTML = bookObject.title
            
          const bookImg = document.createElement("img")
          bookImg.setAttribute("src", bookObject.img_url)

          //Iterate over the array of users that have liked a book 
          //add each one to the show panel  
          const bookLikerUl = document.createElement("ul")
        for (const user of bookObject.users ){
            const bookLikerLi = document.createElement("li")
            bookLikerLi.innerHTML = user.username
            bookLikerUl.appendChild(bookLikerLi)
        }

          const bookDescription  = document.createElement("p")
          bookDescription.innerHTML = bookObject.description
        
         
          likeButton.setAttribute("class", "like")
          likeButton.innerHTML = "👍🏿"

          //When the like button is clicked, update the DOM with the user who clicked it
          likeButton.addEventListener("click", function(){
            
            //Do computation for data that will go into BODY
            const liker = {"id":1, "username":"pouros"}
            bookObject.users.push(liker)

              //Define the configuration Object
             let configObj = {
                method: "PATCH",
                headers: {
                 "Content-Type": "application/json",
                 "Accept": "application/json"
                },
                body: JSON.stringify(
                    //Data being sent to the server  
                    {"users": bookObject.users}
                )
            }        
            // debugger
              
              return fetch(`http://localhost:3000/books/${bookObject.id}`, configObj)
               .then(function(resp){return resp.json() })
               //Update the DOM with the data that was sent to the server
               .then(function(jsObject) {
                   debugger
                const bookLikerLi = document.createElement("li")
                bookLikerLi.innerHTML = liker.username
                bookLikerUl.appendChild(bookLikerLi)
               })
          })

          //Remove all prior element displayed in the show panel
          while (showPanel.firstChild) {
              showPanel.removeChild(showPanel.lastChild);
            }
           
          //Append each book element to the dom 
          showPanel.append(bookHeader, bookImg, bookLikerUl, bookDescription, likeButton)
        } )
        }
    })
}



