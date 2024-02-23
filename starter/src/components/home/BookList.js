import React, { memo } from "react";
import { BookItem } from "./BookItem";

const BookList = memo(function ({
	books,
	onHandleChangeSelectShelf,
	showSearchPage,
}) {
	return (
		<>
			{books.map((book, idx) => {
				return (
					<li key={`${book.id}-${idx}`}>
						<BookItem
							book={book}
							onHandleChangeSelectShelf={onHandleChangeSelectShelf}
							showSearchPage={showSearchPage}
						/>
					</li>
				);
			})}
		</>
	);
});

export default BookList;
