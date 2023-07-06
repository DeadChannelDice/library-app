const currentRead = document.querySelector('#current-read-area')
const stackArea = document.querySelector('#stack-area')
const shelfArea = document.querySelector('#shelf-area')
const addBtn = document.querySelector('#add-book-btn')
const addBookModal = document.querySelector('#add-book-modal')
const moveBookCurrentBtn = document.querySelector('#current-btn')
const moveBookStackBtn = document.querySelector('#stack-btn')
const moveBookShelfBtn = document.querySelector('#shelf-btn')
// const deleteBookBtn = document.querySelector('#delete-btn')
const exitBtn = document.querySelector('#modal-exit-btn')
const bookTitle = document.querySelector('#book_title')
const bookAuthor = document.querySelector('#book_author')
const bookSeries = document.querySelector('#book_series')
const bookLocation = document.querySelector('#book_location')
const form = document.querySelector('#add-book-form')

class Book  {
  constructor (title, author, series, location = "shelf-area"){
    this.title = title
    this.author = author
    this.series = series
    this.location = location
  }

  consoleLog() {
    return `${this.title} by ${this.author}, part of the ${this.series} series.`
  }
}

class Library {
  constructor() {
    this.books = []
  }

  addBook(newBook) {
    this.books.push(newBook)
  }

  removeBook(title) {

  }
}

const myLibrary = new Library()

addBtn.addEventListener('click', () => {
  addBookModal.showModal()
})

exitBtn.addEventListener('click', () => {
  addBookModal.close()
})

moveBookCurrentBtn.addEventListener("click", () => {

})
  

form.addEventListener("submit", (e) => {
  e.preventDefault()
  let newBook = new Book(bookTitle.value, bookAuthor.value, bookSeries.value, )
  myLibrary.addBook(newBook)
  clearForm()
  genBooks()
  addBookModal.close()
  console.log(myLibrary)
})

const clearForm = () => {
  bookTitle.value = ""
  bookAuthor.value = ""
  bookSeries.value = ""
}

const createBookCard = (book) => {
  const bookCard = document.createElement('div')
  const title = document.createElement('div')
  const author = document.createElement('div')
  const series = document.createElement('div')

  bookCard.classList.add('book-card')
  bookCard.classList.add('completed')
  title.classList.add('title')
  author.classList.add('author')
  series.classList.add('series')

  title.textContent = `${book.title}`
  author.textContent = `${book.author}`
  series.textContent = `${book.series}`

  shelfArea.appendChild(bookCard)
  bookCard.appendChild(title)
  bookCard.appendChild(author)
  bookCard.appendChild(series)

  bookCard.addEventListener("click", () => {

    addBookModal.showModal()
  })
}

const genBooks = () => {
  stackArea.innerHTML = ''
  myLibrary.books.forEach((book) => {
  return createBookCard(book)
})
}


