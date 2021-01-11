const catContainer = document.querySelector('#images-container')
const catForm = document.querySelector('#new-cat-form')

// ADD ELEMENT //

function addElement(url, id) {
  let newImage = document.createElement('img')
  newImage.addEventListener("click", deleteCat)
  newImage.dataset.id = id
  catContainer.appendChild(newImage)
  newImage.src = url
  return newImage
}

// GET //

fetch('http://localhost:3000/cats')
  .then(function(response) {
    return response.json()
  })
  .then(function(parsedResponse) {
    const catImages = parsedResponse.map(function(cat) {
      return addElement(cat.img_url, cat.id)
    })
    console.log(catImages)
  })


// POST //

catForm.addEventListener('submit', function(event) {
  event.preventDefault()

  const name = catForm.querySelectorAll('input')[1].value
  const url = catForm.querySelectorAll('input')[0].value

  addElement(url)

  fetch('http://localhost:3000/cats', {
    body: JSON.stringify({
      name: name,
      img_url: url
    }),
    method: "POST",
    headers: {
      "Accepts": "application/json",
      "Content-Type": "application/json"
    }
  })

})

// DELETE //
function deleteCat(event) {

  event.target.remove()

  fetch(`http://localhost:3000/cats/${event.target.dataset.id}`, {
    method: "DELETE",
    headers: {
      "Accepts": "application/json",
      "Content-Type": "application/json"
    }
  })

}
