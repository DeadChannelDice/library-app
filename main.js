const currentReadArea = document.querySelector('#current-read-area')
const stackArea = document.querySelector('#stack-area')
const shelfArea = document.querySelector('#shelf-area')
const addBtn = document.querySelector('#add-book-btn')
const addBookModal = document.querySelector('#add-book-modal')
// const moveBookCurrentBtn = document.querySelector('#current-btn')
// const moveBookStackBtn = document.querySelector('#stack-btn')
// const moveBookShelfBtn = document.querySelector('#shelf-btn')
// const deleteBookBtn = document.querySelector('#delete-btn')
const exitBtn = document.querySelector('#add-modal-exit-btn')
const bookTitle = document.querySelector('#book_title')
const bookAuthor = document.querySelector('#book_author')
const bookSeries = document.querySelector('#book_series')
const bookLocationBtns = document.querySelectorAll('input[name="location"]') 
const addForm = document.querySelector('#add-book-form')
const bookCards = document.querySelectorAll('.book-card')
const app = document.querySelector('#app')
const editForm = document.querySelector('#edit-book-form')
const editBookModal = document.querySelector('#edit-book-modal')
const editExitBtn = document.querySelector('#edit-modal-exit-btn')
const editBookLocationBtns = document.querySelectorAll('input[name="edit-location"]')

addBtn.addEventListener('click', () => {
  clearForm()
  addBookModal.showModal()
})

exitBtn.addEventListener('click', () => {
  addBookModal.close()
})

editExitBtn.addEventListener('click', () => {
  editBookModal.close()
})



addForm.addEventListener("submit", (e) => {
  e.preventDefault()
  let bookLocation

  for (const bookLocationBtn of bookLocationBtns) {
    if (bookLocationBtn.checked) {
      bookLocation = bookLocationBtn.value
    }
  }

  let newBook = new Book(
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
  constructor (title, author, series, location){
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

  title.textContent = `${book.title}`
  author.textContent = `${book.author}`
  series.textContent = `${book.series}`

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

const applyEventListeners = () => {
  const bookCardArray = [...document.querySelectorAll(".book-card")]

  bookCardArray.forEach((bookCard) => {
    bookCard.addEventListener('click', () => {
      const clickedBookTitle = bookCard.querySelector('.title').textContent
      const libraryData = JSON.parse(localStorage.getItem('library'))
      const bookIndex = libraryData.findIndex((book) => book.title === clickedBookTitle)
      
      if (bookIndex != -1) {
        editBook(bookIndex)
      } else {
        console.log('Book Not Found in Local Storage')
      }
    })
  })
}


const genBooks = () => {
  stackArea.innerHTML = ''
  currentReadArea.innerHTML = ''
  shelfArea.innerHTML = ''
  
  library.library.forEach((book) => {
    return createBookCard(book)
  })
  applyEventListeners()
}




const bookTitleEdit = document.querySelector('#book_title_edit')
const bookAuthorEdit = document.querySelector('#book_author_edit')
const bookSeriesEdit = document.querySelector('#book_series_edit')
const stackBtnEdit = document.querySelector('#stack_btn_edit')
const currentBtnEdit = document.querySelector('#current_btn_edit')
const shelfBtnEdit = document.querySelector('#shelf_btn_edit')


const editBook = (index) => {
  const book = library.getBook(index)
  editBookModal.showModal()
  bookTitleEdit.value = book.title
  bookAuthorEdit.value = book.author
  bookSeriesEdit.value = book.series



  editForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const updatedTitle = bookTitleEdit.value
    const updatedAuthor = bookAuthorEdit.value
    const updatedSeries = bookSeriesEdit.value
    library.editBook(index, updatedTitle, updatedAuthor, updatedSeries)
    library.saveLibraryToLocalStorage()
    editBookModal.close()
    genBooks()
  })


  // let updatedLocation 
  
  // for (const editBookLocationBtn of editBookLocationBtns) {
  //   if (editBookLocationBtn.checked) {
  //     updatedLocation = editBookLocationBtn.value
  //   }
  // }


  

 
  
 

  
  
}





library.loadLibraryFromLocalStorage()
genBooks()

 // bookLocationBtns.forEach((radio) => {
  //   if(radio.checked) {
  //     radio.value === updatedLocation
  //   } 
  // })
