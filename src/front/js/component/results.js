import React from 'react';

export const Results = ({ book }) => {
    return (
      <div className="card" style={{ width: "18rem" }}>
        <img src={book.volumeInfo.imageLinks?.thumbnail} className="card-img-top" alt="book cover" />
        <div className="card-body">
          <h5 className="card-title">{book.volumeInfo.title}</h5>
          <p className="card-text">
            <strong>Author(s):</strong>{" "}
            {book.volumeInfo.authors?.map((author, index) => (
              <span key={index}>
                {author}
                {index < book.volumeInfo.authors.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
          <p className="card-text">
            <strong>Published Date:</strong> {book.volumeInfo.publishedDate}
          </p>
          <p className="card-text">
            <strong>Page Count:</strong> {book.volumeInfo.pageCount}
          </p>
        </div>
      </div>
    );
  }