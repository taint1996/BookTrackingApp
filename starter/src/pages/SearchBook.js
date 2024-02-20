import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { search } from "../BooksAPI";

export const SearchBook = ({ onHandleSearchBook }) => {
	const [searchText, setSearchText] = useState("");
	const [searchBooks, setSearchBooks] = useState([]);

	useEffect(() => {
		if (searchText) {
			handleSearchBook();
		}
	}, [searchText]);

	const handleSearchBook = async () => {
		const resultSearch = await search(searchText);
		const matchCondition = searchText.length > 0 && Array.isArray(resultSearch);

		const result = matchCondition
			? resultSearch.filter((res) => {
					return (
						res.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
						res.authors
							.join(", ")
							.toLowerCase()
							.indexOf(searchText.toLowerCase()) !== -1
					);
			  })
			: [];

		console.log("res ", result);
		setSearchBooks(result);
		return result;
	};

	const onSearchTextChange = (txt) => {
		setSearchText(txt);
	};

	const renderSearchBooks = (searchBooks) => {
		return (
			searchBooks &&
			searchText.length > 0 && (
				<>
					{searchBooks.map((book, idx) => {
						return (
							<li key={`${book.id}-${idx}`}>
								<div className="book">
									<div className="book-top">
										<div
											className="book-cover"
											style={{
												width: 128,
												height: 193,
												backgroundImage: `url(${book.imageLinks?.thumbnail})`,
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
												<option value="wantToRead">Want to Read</option>
												<option value="read">Read</option>
												<option value="none">None</option>
											</select>
										</div>
									</div>
									<div className="book-title">{book.title}</div>
									<div className="book-authors">{book.authors?.join(", ")}</div>
								</div>
							</li>
						);
					})}
				</>
			)
		);
	};

	console.log(searchBooks);
	return (
		<div className="search-books">
			<div className="search-books-bar">
				<Link to="/" onClick={onHandleSearchBook} className="close-search">
					Close
				</Link>
				<div className="search-books-input-wrapper">
					<input
						type="text"
						value={searchText}
						placeholder="Search by title, author, or ISBN"
						onChange={(e) => onSearchTextChange(e.target.value)}
					/>
				</div>
			</div>
			<div className="search-books-results">
				<ol className="books-grid">{renderSearchBooks(searchBooks)}</ol>
			</div>
		</div>
	);
};
