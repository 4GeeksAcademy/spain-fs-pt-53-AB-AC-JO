import React from 'react';


import { trackPromise } from 'react-promise-tracker';
// import LoadingIndicator from './LoadingIndicator/LoadingIndicator';

const apiKey = "AIzaSyCS2PIzm7JZBy6eR6K-WlJ45aWGcZRnwbo";
const apiURL = "https://www.googleapis.com/books/v1/volumes";
const fields = "fields=items(volumeInfo(title,subtitle,authors,imageLinks(thumbnail,smallThumbnail),publishedDate,pageCount))"

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
		const getURL = `${apiURL}?key=${apiKey}&langRestrict=es,en&maxResults=5&orderBy=relevance&q=${this.state.searchTerm}&${fields}`;

		// console.log(getURL);
		// console.log(JSON.stringify(this.state.searchTerm, null, 2));

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
					this.props.updateResults(data);
				})
				.catch(err => {
					this.setState({
						error: err.message
					});
				})
		);
	};

	render() {

		return (
			<div className="header_content">
				<h1>Buscador de libros</h1>

				<form id="form" onSubmit={e => this.handleSubmit(e)}>
					<legend />

					<label htmlFor="searchTerm">
						<input
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
					<button id="search">Search</button>
				</form>

				<p id="error-message" className="error-message">
					{this.state.error}
				</p>

			</div>
		);
	};
}
