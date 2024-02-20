import React from "react";
import { useState, useEffect } from "react";
import { SearchBook } from "./SearchBook";
import { ListBook } from "./ListBook";
import { search } from "../BooksAPI";

export const Home = () => {
	const [showSearchPage, setShowSearchPage] = useState(false);

	const onHandleSearchBook = () => {
		setShowSearchPage(!showSearchPage);
	};

	return (
		<>
			{showSearchPage ? (
				<SearchBook
					onHandleSearchBook={onHandleSearchBook}
				/>
			) : (
				<ListBook onHandleSearchBook={onHandleSearchBook} />
			)}
		</>
	);
};
