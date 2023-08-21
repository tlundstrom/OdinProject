class Book{
    constructor
    (
        title = "Blank",
        author = "Blank",
        pages = 0, 
        read = false
    ) {
        this.title = title;
        this.author = author
        this.pages = pages;
        this.read = read;
    }
}
class Library{
    constructor() {
        this.books = []
    }

    setLibrary = (newBook) => {
        this.books.push(newBook);
    }

    getLibrary = () => {
        return this.books;
    }

    getBook(title) {
        return this.books.find((book) => book.title === title)
    }
}

const myLibrary = new Library;

const getFormInput = ()=>{
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    return new Book(title, author, pages, read);
}

const addBook = (e) => {
    e.preventDefault();
    const newBook = getFormInput();
    myLibrary.setLibrary(newBook);
    clearModal();
    renderLibrary();
}

const clearModal = () => {
    $('#addBookModal').on("hidden.bs.modal", ()=>{
        $('.modalForm').trigger('reset');
    })
}

const toggleRead = (e) => {
    const title = e.target.parentNode.firstChild.innerHTML.replaceAll(
        '"',
        ''
        )
    myLibrary.getBook(title).read = !myLibrary.getBook(title).read;
    renderLibrary();
    
}

const renderLibrary = ()=>{
    const App = document.getElementById('App');
    let html = ''
    myLibrary.getLibrary().forEach(book => {
        html += '<div className="bookCard">';
        html += '<h5>' + book.title + '</h5>';
        html += '<p>By:' + book.author + '</p>';
        html += '<p>Pages:' + book.pages + '</p>';
        html += book.read===true? '<button onclick="toggleRead(event)" class="btn">Read</button>': '<button onclick="toggleRead(event)" class="btn">Unread</button>'
        html += '</div>'
    });
    App.innerHTML = html;

}
