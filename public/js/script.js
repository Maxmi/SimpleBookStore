document.addEventListener('DOMContentLoaded', (e) => {
  console.log('DOM fully loaded and parsed');
});


//validate the form for adding new book
// const validateNewBookForm = () => {
//
// }

//create new fields for saving updated book info

const createInput = (type, cssClass, val) => {
  const inputEl = document.createElement('input');
  inputEl.setAttribute('type', type);
  inputEl.classList.add(cssClass);
  inputEl.value = val;
  return inputEl;
};

const editBook = li => {
  const id = document.getElementsByName('id')[0];
  const title = document.getElementsByName('title')[0];
  const author = document.getElementsByName('author')[0];
  const genre = document.getElementsByName('genre')[0];
  const height = document.getElementsByName('height')[0];
  const publ = document.getElementsByName('publisher')[0];

  const idText = id.innerText;
  const titleText = title.innerText;
  const authorText = author.innerText;
  const genreText = genre.innerText;
  const heightText = height.innerText;
  const publText = publ.innerText;

  const idInput = createInput('text', 'form-control', idText);
  const titleInput = createInput('text', 'form-control', titleText);
  const authorInput = createInput('text', 'form-control', authorText);
  const genreInput = createInput('text', 'form-control', genreText);
  const heightInput = createInput('text', 'form-control', heightText);
  const publInput = createInput('text', 'form-control', publText);

  id.parentNode.removeChild(id);
  title.parentNode.removeChild(title);
  author.parentNode.removeChild(author);
  genre.parentNode.removeChild(genre);
  height.parentNode.removeChild(height);
  publ.parentNode.removeChild(publ);

  li.appendChild(idInput, titleInput, authorInput, genreInput, heightInput, publInput);
  
}

editBook();
