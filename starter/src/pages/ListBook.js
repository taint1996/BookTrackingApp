import React, { useState, useEffect } from "react";
import { getAll } from "../BooksAPI";
export const ListBook = ({ onHandleSearchBook }) => {
	const [books, setBooks] = useState([]);
	const BOOK_SHELF_LIST = ["Currently Reading", "Want To Read", "Read"];

	useEffect(() => {
		getAllBooks()
	}, []);

	const getAllBooks = async () => {
		try {
			const getAllBooks = await getAll();
			setBooks(getAllBooks);
		} catch (e) {
			console.log(`Error when get all books ${e}`);
		}
	};

	const shelfBooks = (shelf) => {
		if (books) {
			return books.filter(
				(book) =>
					book.shelf.toLowerCase() === shelf.toLowerCase().replace(/\s+/g, "")
			);
		}
		return shelf;
	};

	return (
		<div className="list-books">
			<div className="list-books-title">
				<h1>MyReads</h1>
			</div>
			<div className="list-books-content">
				<div>
					{BOOK_SHELF_LIST.map((shelf, shelfIdx) => {
						return (
							<div className="bookshelf" key={`shelf-${shelfIdx}`}>
								<h2 className="bookshelf-title">{shelf}</h2>
								<div className="bookshelf-books">
									<ol className="books-grid">
										{shelfBooks(shelf).map((book, idx) => {
											return (
												<li key={`${book.id}-${idx}`}>
													<div className="book">
														<div className="book-top">
															<div
																className="book-cover"
																style={{
																	width: 128,
																	height: 193,
																	backgroundImage: `url(${book.imageLinks.thumbnail})`,
																}}
															></div>
															<div className="book-shelf-changer">
																<select>
																	<option value="none" disabled>
																		Move to...
																	</option>
																	<option value="currentlyReading">
																		Currently Reading
																	</option>
																	<option value="wantToRead">
																		Want to Read
																	</option>
																	<option value="read">Read</option>
																	<option value="none">None</option>
																</select>
															</div>
														</div>
														<div className="book-title">{book.title}</div>
														<div className="book-authors">
															{book.authors?.join(", ")}
														</div>
													</div>
												</li>
											);
										})}
									</ol>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className="open-search">
				<a onClick={onHandleSearchBook}>Add a book</a>
			</div>
		</div>
	);
};
