const currentReadArea = document.querySelector('#current-read-area')
const stackArea = document.querySelector('#stack-area')
const shelfArea = document.querySelector('#shelf-area')
const addBtn = document.querySelector('#add-book-btn')
const addBookModal = document.querySelector('#add-book-modal')
const exitBtn = document.querySelector('#add-modal-exit-btn')
const bookTitle = document.querySelector('#book_title')
const bookAuthor = document.querySelector('#book_author')
const bookSeries = document.querySelector('#book_series')
const bookLocationBtns = document.querySelectorAll('input[name="location"]') 
const addForm = document.querySelector('#add-book-form')
const bookCards = document.querySelectorAll('.book-card')
const app = document.querySelector('#app')


addBtn.addEventListener('click', () => {
  clearForm()
  addBookModal.showModal()
})

exitBtn.addEventListener('click', () => {
  addBookModal.close()
})

const generateID = () => {
  return new Date().getTime()
}

addForm.addEventListener("submit", (e) => {
  e.preventDefault()
  
  let bookLocation

  for (const bookLocationBtn of bookLocationBtns) {
    if (bookLocationBtn.checked) {
      bookLocation = bookLocationBtn.value
    }
  }

  const newBookId = generateID()

  const newBook = new Book(
    newBookId,
    bookTitle.value, 
    bookAuthor.value,
    bookSeries.value, 
    bookLocation
  )

  library.addBook(newBook)
  library.saveLibraryToLocalStorage()
  genBooks()
  addBookModal.close()
  console.log(library)
})

class Book  {
  constructor (id, title, author, series, location){
    this.bookId = id
    this.title = title
    this.author = author
    this.series = series
    this.location = location
  }
}

class Library {
  constructor() {
    this.library = []
  }

  addBook(newBook) {
    this.library.push(newBook)
  }

  editBook(index, updatedTitle, updatedAuthor, updatedSeries, updatedLocation) {
    const book = this.library[index]
    book.title = updatedTitle
    book.author = updatedAuthor
    book.series = updatedSeries
    book.location = updatedLocation
    console.log(`Editting Book: ${book.bookId}`)
  }

  changeBookLocation(index, newLocation) {
    const book = this.library[index]
    book.location = newLocation
  }

  getBook(index) {
    return this.library[index]
  }

  getLibrary() {
    return this.library
  }

  saveLibraryToLocalStorage() {
    localStorage.setItem('library', JSON.stringify(this.library))
    console.log('Save Successful')
  }
  
  loadLibraryFromLocalStorage(){
    const libraryData = localStorage.getItem('library')
    if (libraryData) {
      this.library = JSON.parse(libraryData)
      console.log('Retrieval Successful')
    }
  }
}

const library = new Library()


const clearForm = () => {
  bookTitle.value = ""
  bookAuthor.value = ""
  bookSeries.value = ""
}



const createBookCard = (book) => {
  console.log(`Created Book ${book.title} at ${book.location}`)
  const bookCard = document.createElement('div')
  const bookTextInfo = document.createElement('div')
  const title = document.createElement('div')
  const author = document.createElement('div')
  const series = document.createElement('div')

  bookCard.classList.add('book-card')
  bookTextInfo.classList.add('book-text-info')
  title.classList.add('title')
  author.classList.add('author')
  series.classList.add('series')

  console.log(`Book ID: ${book.bookId}`);

  title.textContent = `${book.title}`
  author.textContent = `${book.author}`
  series.textContent = `${book.series}`

  

  bookCard.setAttribute('data-book-id', book.bookId)
  console.log(`Data Book ID Attribute: ${bookCard.getAttribute('data-book-id')}`);

  bookCard.appendChild(bookTextInfo)
  bookTextInfo.appendChild(title)
  bookTextInfo.appendChild(author)
  bookTextInfo.appendChild(series)

  switch (book.location){
    case "shelf-area":
      shelfArea.appendChild(bookCard)
      bookCard.classList.add('completed')
      bookTextInfo.classList.add('shelved')
      break
    case "current-read-area":
      currentReadArea.appendChild(bookCard)
      bookCard.classList.add('current-read')
      break
    default: 
      stackArea.appendChild(bookCard)
  } 

  
}



const bookCardListener = (bookCard) => {
  console.log(`Clicked: ${bookCard.dataset.bookId}`)
  const clickedBookId = bookCard.dataset.bookId
  const libraryData = JSON.parse(localStorage.getItem('library'))
  const bookIndex = libraryData.findIndex((book) => book.bookId == clickedBookId)
  console.log(libraryData)
  
  if (bookIndex != -1) {
    populateEditBookForm(bookIndex)
    return index = bookIndex
  } else {
    console.log('Book Not Found in Local Storage')
  }
}

const applyEventListeners = () => {
  const bookCardArray = [...document.querySelectorAll(".book-card")]
  console.log("Applying Event Listeners")

  bookCardArray.forEach((bookCard) => {
    console.log(`Applying Event Listener to: ${bookCard.dataset.bookId}`)
    bookCard.addEventListener('click', () => {
      bookCardListener(bookCard),
      {once: true}
    })
  })
}


const genBooks = () => {
  console.log("Running genBooks")
  library.loadLibraryFromLocalStorage()
  stackArea.innerHTML = ''
  currentReadArea.innerHTML = ''
  shelfArea.innerHTML = ''
  library.library.forEach((bookData) => {
    const newBook = new Book(
      bookData.bookId,
      bookData.title,
      bookData.author,
      bookData.series,
      bookData.location
    )
    createBookCard(newBook)
  })
  applyEventListeners()
}




const bookTitleEdit = document.querySelector('#book_title_edit')
const bookAuthorEdit = document.querySelector('#book_author_edit')
const bookSeriesEdit = document.querySelector('#book_series_edit')
const stackBtnEdit = document.querySelector('#stack-btn-edit')
const currentBtnEdit = document.querySelector('#current-btn-edit')
const shelfBtnEdit = document.querySelector('#shelf-btn-edit')
const editForm = document.querySelector('#edit-book-form')
const editBookModal = document.querySelector('#edit-book-modal')
const editExitBtn = document.querySelector('#edit-modal-exit-btn')
const editBookLocationBtns = document.querySelectorAll('input[name="edit-location"]')

let index 

editForm.addEventListener('submit', (e) => submitEditForm(e, index))

editExitBtn.addEventListener('click', () => {
  editBookModal.close()
})

const clearEditForm = () => {
  console.log("Clearing Edit Form")
  bookTitleEdit.value = ""
  bookAuthorEdit.value = ""
  bookSeriesEdit.value = ""
}


const populateEditBookForm = (index) => {
 
  clearEditForm()
  console.log("Populating Edit Book Form")
  const bookToEdit = library.getBook(index)
  console.log(bookToEdit)
  bookTitleEdit.value = bookToEdit.title
  bookAuthorEdit.value = bookToEdit.author
  bookSeriesEdit.value = bookToEdit.series

  for(const editBookLocationBtn of editBookLocationBtns) {
    if(bookToEdit.location === editBookLocationBtn.value){
      editBookLocationBtn.checked = true
    }
  }

  // editForm.removeEventListener('submit', (e) => submitEditForm(e,index));
  editBookModal.showModal()
  return index
  
}


const submitEditForm = (e, index) => {
  editBookModal.close()
  e.preventDefault()
  e.stopPropagation()
  const updatedTitle = bookTitleEdit.value
  const updatedAuthor = bookAuthorEdit.value
  const updatedSeries = bookSeriesEdit.value
  let updatedLocation = ""

  for (const editBookLocationBtn of editBookLocationBtns) {
    if (editBookLocationBtn.checked) {
      updatedLocation = editBookLocationBtn.value
    }
  }

  library.editBook(index, updatedTitle, updatedAuthor, updatedSeries, updatedLocation)
  library.saveLibraryToLocalStorage()
  console.log("Edit Form Submitted")
  genBooks()
 
}

genBooks()
