const currentRead = document.querySelector('#current-read-area')
const stackArea = document.querySelector('#stack-area')
const shelfArea = document.querySelector('#shelf-area')
const addBtn = document.querySelector('#add-book-btn')
const addBookModal = document.querySelector('#add-book-modal')
const moveBookCurrentBtn = document.querySelector('#current-btn')
const moveBookStackBtn = document.querySelector('#stack-btn')
const moveBookShelfBtn = document.querySelector('#shelf-btn')
const deleteBookBtn = document.querySelector('#delete-btn')
const exitBtn = document.querySelector('#modal-exit-btn')

addBtn.addEventListener('click', () => {
  addBookModal.showModal()
})

exitBtn.addEventListener('click', () => {
  addBookModal.close()
})


class Book {
  constructor (
    title = 'n/a',
    author = 'n/a',
    series = 'n/a',
    location = 'n/a'
  ) {
    this.title = title
    this.author = author
    this.series = series
    this.location = location
  }
}

class Library {
  constructor() {
    this.books = []
  }

  addBook(newBook) {
    this.books.push(newBook)
  }

  removeBook(title){
    
  }
}

