document.addEventListener('DOMContentLoaded', (e) => {
  console.log('DOM fully loaded and parsed');
});

//create new fields for saving updated book info
const createInput = (type, name, cssClass, val) => {
  const inputEl = document.createElement('input');
  inputEl.type = type;
  inputEl.name = name;
  inputEl.classList.add(cssClass);
  inputEl.value = val;
  return inputEl;
};

//make details form editable
const editBook = () => {
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

  const idInput = createInput('text','id','form-control', idText);
  const titleInput = createInput('text', 'title', 'form-control', titleText);
  const authorInput = createInput('text', 'author', 'form-control', authorText);
  const genreInput = createInput('text', 'genre', 'form-control', genreText);
  const heightInput = createInput('text', 'height', 'form-control', heightText);
  const publInput = createInput('text', 'publisher', 'form-control', publText);

  id.replaceWith(idInput);
  title.replaceWith(titleInput);
  author.replaceWith(authorInput);
  genre.replaceWith(genreInput);
  height.replaceWith(heightInput);
  publ.replaceWith(publInput);
};


//handler for Update button
const button = document.getElementById('updateBtn');
button.addEventListener('click', (e) => {
  e.preventDefault();
  if(button.classList.contains('update')) {
    editBook();
    button.textContent = 'Save';
    button.classList.add('save');
    button.classList.remove('update');
  } else {
    button.textContent = 'Update';
    button.classList.add('update');
    button.classList.remove('save');
  }
});
