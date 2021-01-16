
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


//*************************************************** */



const toyDiv = document.querySelector("#toy-collection")
const toyForm = document.querySelector(".add-toy-form")


toyForm.addEventListener('submit', grabFormInputs)

function getAllToys(){
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(data => createToyDivs(data))
}
getAllToys()

function createToyInDb(toyObj) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(toyObj)
  })
  .then(response => response.json())
  .then(slapToyOnDom)
}



  function createToyDivs(toyArray) {
    toyArray.forEach(toy => {
      toyDiv.innerHTML += `
      <div class="card" data-id=${toy.id}>
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p data-likes=${toy.likes}>${toy.likes} Likes </p>
        <button class="like-btn">Like <3</button>
      </div>
    ` 
    });
  }

  function slapToyOnDom(toy) {
    toyDiv.innerHTML += `
      <div class="card" data-id=${toy.id}>
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p data-likes=${toy.likes}>${toy.likes} Likes </p>
        <button class="like-btn">Like <3</button>
      </div>
    ` 
    };
  

  function grabFormInputs(evt) {
    evt.preventDefault()

    const name = evt.target.name.value
    const img = evt.target.image.value

    toyObj = {
      name: name,
      image: img,
      likes: 0
    }

    createToyInDb(toyObj)
  }



  toyDiv.addEventListener('click', increaseLike)


function increaseLike(e) {
  if (e.target.matches("button.like-btn")) {
    const pTag = e.target.parentElement.querySelector('p')
    debugger
    let currentLikes = parseInt(pTag.dataset.likes)

    let nextNum = currentLikes + 1
    
    pTag.innerText = `${nextNum} Likes`
    pTag.dataset.likes = nextNum

    const likesObj = {likes: nextNum}
    const totyId = pTag.parentElement.dataset.id

    updateToyInDb(totyId, {likes: nextNum})
  } 
}



function updateToyInDb(toyId, likeObj) {
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(likeObj)
  })
}


















































































// const addBtn = document.querySelector('#new-toy-btn')
// const toyForm = document.querySelector('.container')
// let addToy = false
// let divCollect = document.querySelector('#toy-collection')
// const toyHeader = document.querySelector("#toy-header")


// function getToys() {
//   return fetch('http://localhost:3000/toys')
//     .then(res => res.json())
//     .then(toys => {
//       toys.forEach(toy => {
//         //function to render toys goes here or something
//         //console.log(toy)
//         renderToys(toy)
//       })
// })}
// getToys()

// function postToy(toy_data) {
//   fetch('http://localhost:3000/toys', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: "application/json"
//       },
//       body: JSON.stringify({
//         "name": toy_data.name.value,
//         "image": toy_data.image.value,
//         "likes": 0

//       })
//     })
//     .then(res => res.json())
//     .then((obj_toy) => {
//       let new_toy = renderToys(obj_toy)
//       divCollect.append(new_toy)
//     })
// }

// function likes(e) {
//   e.preventDefault()
//   let more = parseInt(e.target.previousElementSibling.innerText) + 1

//   fetch(`http://localhost:3000/toys/${e.target.id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"

//       },
//       body: JSON.stringify({
//         "likes": more
//       })
//     })
//     .then(res => res.json())
//     .then((like_obj => {
//       e.target.previousElementSibling.innerText = `${more} likes`;
//     }))
// }

// function renderToys(toy) {
//   let h2 = document.createElement('h2')
//   h2.innerText = toy.name

//   let img = document.createElement('img')
//   img.setAttribute('src', toy.image)
//   img.setAttribute('class', 'toy-avatar')

//   let p = document.createElement('p')
//   p.innerText = `${toy.likes} likes`

//   let btn = document.createElement('button')
//   btn.setAttribute('class', 'like-btn')
//   btn.setAttribute('id', toy.id)
//   btn.innerText = "like"
//   btn.addEventListener('click', (e) => {
//     console.log(e.target.dataset);
//     likes(e)
//   })

//   let divCard = document.createElement('div')
//   divCard.setAttribute('class', 'card')
//   divCard.append(h2, img, p, btn)
//   divCollect.append(divCard)
// }


// // add listener to 'Add Toy' button to show or hide form
// addBtn.addEventListener('click', () => {
//   // hide & seek with the form
//   addToy = !addToy
//   if (addToy) {
//     toyForm.style.display = 'block'
//     toyForm.addEventListener('submit', event => {
//       event.preventDefault()
//       postToy(event.target)
//     })
//   } else {
//     toyForm.style.display = 'none'
//   }
// })

// // start by getting all toys

// // getToys().then(toys => {
// //   toys.forEach(toy => {
// //     //function to render toys goes here or something
// //     renderToys(toy)
// //   })
// // })