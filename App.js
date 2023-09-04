import { useState } from 'react';
import { useEffect } from 'react';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';
import axios from 'axios';

// App component has 3 functions
//1) edit
//2 delete
//3)  create


function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks=async()=>
  {
    
      const response = await axios.get('http://localhost:3001/books'); 

      setBooks(response.data);
  };

  useEffect(() =>
  {
    fetchBooks();
  },[]);

  /////////////////////

  const editBookById = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title: newTitle,
    });


    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, ...response.data };
      }

      return book;
    });

    setBooks(updatedBooks);
  };


  //////////////////////////////

  const deleteBookById = async(id) => {

    const response = await axios.get('http://localhost:3001/books')
  
  };

    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });

    setBooks(updatedBooks);
  };

  //////////////////////////////

 
  const createBook = async (title) => {
    const response = await axios.post('http://localhost:3001/books', {
      title,
    });

    const updatedBooks = [...books, response.data];
    setBooks(updatedBooks);
  };



// App component has 2 child components here
//1) booklist
//2) bbok create

  return (
    <div className="app">
      <h1>My Reading List</h1>
      <BookList onEdit={editBookById} books={books} onDelete={deleteBookById} />
      <BookCreate onCreate={createBook} />
    </div>
  );


export default App;
