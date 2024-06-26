import React from 'react';
import { trackPromise } from 'react-promise-tracker';
import { Results } from "./results"
import "../../styles/search.css";


const apiKey = process.env.API_KEY;
const apiURL = "https://www.googleapis.com/books/v1/volumes";
const fields = "fields=items(id,volumeInfo(title,subtitle,authors,imageLinks(thumbnail,smallThumbnail),publishedDate,pageCount))";
console.log(process.env.API_KEY)
export class Search extends React.Component {
	state = {
		searchTerm: '',

	};

	handleChange = event => {
		const {
			target: { name, value }
		} = event;
		this.setState({ [name]: value });
	};

	handleSubmit(e) {
		e.preventDefault();
		this.fetchBooks();
	}

	fetchBooks = () => {
		const getURL = `${apiURL}?key=${apiKey}&langRestrict=es,en&maxResults=6&orderBy=relevance&q=${this.state.searchTerm}&${fields}`;

		trackPromise(
			fetch(getURL)
				.then(res => {
					if (!res.ok) {
						throw new Error("Something went wrong, please try again later.");
					}
					return res;
				})
				.then(res => {
					return res.json();
				})
				.then(data => {
					this.setState({
						books: data.items,
						error: null,
					});
				})
				.catch(err => {
					this.setState({
						error: err.message,
					});
				})
		);
	};

	render() {

		return (
			<div className="header_content text-center">
				<h1>Busca un libro para añadir una review aquí: </h1>

				<form id="form" className="pb-2" onSubmit={e => this.handleSubmit(e)}>
					<legend />

					<label className='searchlabel' htmlFor="searchTerm">
						<input className='searchinput'
							type="text"
							name="searchTerm"
							id="searchTerm"
							required
							aria-required="true"
							placeholder="Busca aquí el libro"
							value={this.state.searchTerm}
							onChange={this.handleChange}
						/>
					</label>
					<button id="search"><i className="fa-brands fa-searchengin"></i></button>
				</form>
				<div className="row">
					{this.state.books && this.state.books.map((book, index) => (
						<div key={index} className="col-md-4">
							<Results book={book} />
						</div>
					))}
				</div>
				<p id="error-message" className="error-message">
					{this.state.error}
				</p>
			</div>
		);
	};
}