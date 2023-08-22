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

    deleteBook = (title) => {
        let counter = 0;
        this.getBook(title);
        this.books.forEach((book)=>{
            if(book.title === title){
                this.books.splice(counter,1);
            }
            counter++
        })
        renderLibrary();
    }

    getLibrary = () => {
        return this.books;
    }

    getBook = (title) => {
        return this.books.find((book) => book.title === title)
    }
}

const myLibrary = new Library;



myLibrary.setLibrary(new Book("Misery", "Stephen King", 574, true));
myLibrary.setLibrary(new Book("The Giver", "Lois Lowry", 774, true));
myLibrary.setLibrary(new Book("Meditations", "Marcus Aurelius", 367, true));
myLibrary.setLibrary(new Book("1984", "George Orwell", 328, true));
myLibrary.setLibrary(new Book("Animal Farm", "George Orwell", 140, true));

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

const removeBook = (e) => {
    const title = e.target.parentNode.firstChild.innerHTML.replaceAll(
        '"',
        ''
    )
    myLibrary.deleteBook(title);
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
        html += '<div class="bookCard bg-light">';
        html += '<h5>' + book.title + '</h5>';
        html += '<p>By: ' + book.author + '</p>';
        html += '<p>Pages: ' + book.pages + '</p>';
        html += book.read===true? '<button class="cardButton btn btn-sm btn-success" onclick="toggleRead(event)">Read</button>': '<button onclick="toggleRead(event)" class="cardButton btn btn-sm btn-secondary">Unread</button>'
        html += '<button onclick="removeBook(event)" class="btn btn-sm btn-danger">Delete</button>'
        html += '</div>'
    });
    App.innerHTML = html;
}
renderLibrary();
