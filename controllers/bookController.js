import bookArray from "../data/books.js";

class BookController {
  static addBook = (req, res) => {
    const { id: userId } = res.locals.user;

    const { name, pages } = req.body;

    const lastBook = bookArray[bookArray.length - 1];

    const bookDetails = {
      id: lastBook.id + 1,
      name,
      pages,
      userId,
    };

    try {
      if (pages && name) {
        bookArray.push(bookDetails);

        return res.status(201).json({
          message: "New Book Created",
          book: bookDetails
        });
      } else {
        throw new Error("Book creation Failed");
      }
    } catch (e) {
      return res.status(400).json({
        message: e.message,
      });
    }
  };

  static getUserBooks = (req, res) => {
    const { id: userId } = res.locals.user;

    try {
      const userBooks = bookArray.filter((aBook) => aBook.userId === userId);

      if (userBooks.length > 0) {
        return res.status(200).json({
          message: "Books by user",
          books: userBooks,
        });
      } else {
        throw new Error("You do not have any books")
      }
    } catch (e) {
      return res.status(403).json({
        message: e.message
      })
    }
  };
}

export default BookController;
