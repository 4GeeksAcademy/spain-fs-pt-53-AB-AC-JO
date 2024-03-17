const backUrl = 'https://crispy-space-umbrella-4j79xjxrj54j2qrpj-3001.app.github.dev/'   // Hay que modificar esta URL con la 3001 (La de nuestro back) y modifica el resto.
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			error: null,
			reviews: [],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},


			syncToken: async () => {
				const token = sessionStorage.getItem("token");
				console.log("Session loading getting token")
				if (token && token != "" && token != undefined && token != null) await setStore({ token: token })
			},
			
			login: async (email, password) => {
				try {
					const res = await fetch(backUrl + 'api/token', {
						method: 'POST',
						body: JSON.stringify({
							email: email,
							password: password
						}),
						headers: {
							'Content-Type': 'application/json'
						}
					});

					if (res.status === 200) {
						const data = await res.json();
						sessionStorage.setItem("token", data.access_token);
						setStore({ token: data.access_token });
						return true;
					} else if (res.status === 401) {
						const errorData = await res.json();
						alert(errorData.msg);
						return false;
					}
				} catch (error) {
					console.error("Ha ocurrido un error:", error);
					return false;
				}
			},
			logout: () => {
				sessionStorage.removeItem("token");
				console.log("session ends")
				setStore({ token: null })
			},
			register: async (email, password, user, visibility) => {
				try {
					const res = await fetch(backUrl + 'api/user', {
						method: 'POST',
						body: JSON.stringify({
							email: email,
							password: password,
							username: user,
							visibility: visibility
						}),
						headers: {
							'Content-Type': 'application/json'
						}
					});

					if (res.status === 200) {
						alert("Successful registration");
						return true;
					} else if (res.status === 401) {
						const errorData = await res.json();
						alert(errorData.msg)
						return false
					};
				} catch (error) {
					console.error("Ha ocurrido un error:", error);
					return false;
				}
			},
			getMessage: async () => {
				const store = getStore();
				try {
					const resp = await fetch(backUrl + 'api/hello', {
						headers: {
							'Authorization': 'Bearer ' + store.token
						}
					});
					const data = await resp.json()
					setStore({ message: data.message })
					console.log(data.message)
					return data;
				} catch (error) {
					console.log("Error cargando mensaje del backend", error)
				}
			},
			getUser: async () => {
				const store = getStore();
				try {
					const resp = await fetch(backUrl + 'api/privateuser', {
						headers: {
							'Authorization': 'Bearer ' + store.token
						}
					});
					const data = await resp.json()
					setStore({ message: data.message })
					return data;
				} catch (error) {
					console.log("Error cargando mensaje del backend", error)
				}
			},
			changepassword: async (currentPassword, newPassword) => {
				try {
				  const resp = await fetch(backUrl + 'api/change_password', {
					method: 'PUT',
					headers: {
					  'Content-Type': 'application/json',
					  'Authorization': 'Bearer ' + sessionStorage.getItem('token')
					},
					body: JSON.stringify({
						current_password: currentPassword,
						new_password: newPassword
					}),
				  });
				  if (resp.ok) {
					console.log('Password changed')
					return true;
				} else {
					throw new Error('Failed to change password');
				}
			} catch (error) {
				console.error('Error changing password:', error);
				return false;
			}
				},
			createReview(book, comment) {
				return async () => {
				  try {
					const user_id = await getJwtIdentity();
					const response = await fetch(backUrl + '/api/reviews', {
					  method: 'POST',
					  headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${store.token}`
					  },
					  body: JSON.stringify({
						title: book.volumeInfo.title,
						author: book.volumeInfo.authors[0],
						published_year: book.volumeInfo.publishedDate.slice(0, 4),
						pages: book.volumeInfo.pageCount,
						thumbnail: book.volumeInfo.imageLinks.thumbnail,
						small_thumbnail: book.volumeInfo.imageLinks.smallThumbnail,
						google_id: book.id,
						user_id: user_id,
						comment: comment
					  })
					});
			  
					if (!response.ok) {
					  throw new Error('Failed to create review');
					}
			  
					const data = await response.json();
					store.addReview(data.review);
					store.setMessage(data.message);
			  
				  } catch (error) {
					store.setError(error.message);
				  }
				};
			  },
			getPublicReviews() { 				// Testing not done yet, cross your fingers
				return async () => {
				  try {
					const res = await fetch(backUrl + '/api/reviews');
			  
					if (!res.ok) {
					  throw new Error('Network response was not ok');
					}
			  
					const data = await res.json();
			  
					// Dispatch the GET_REVIEWS_SUCCESS action with the response data
					setStore({ reviews: data });
			  
				  } catch (error) {
					// Dispatch the GET_REVIEWS_FAILURE action with the error message
					setStore({ error: error.message });
				  }
				};
			  },
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			changePassword: async (currentPassword, newPassword) => {
				try {
				  const email = getJwtIdentity(); // Get the email from the JWT token
			  
				  const res = await fetch(backUrl + '/api/change_password', {
					method: 'PUT',
					headers: {
					  'Content-Type': 'application/json',
					  'Authorization': 'Bearer ' + sessionStorage.getItem('token')
					},
					body: JSON.stringify({ email, currentPassword, newPassword })
				  });
			  
				  if (!res.ok) {
					throw new Error('Network response was not ok');
				  }
			  
				  const data = await res.json();
			  
				  // Dispatch the CHANGE_PASSWORD_SUCCESS action with the response data
				  setStore({ message: data.message });
			  
				} catch (error) {
				  // Dispatch the CHANGE_PASSWORD_FAILURE action with the error message
				  setStore({ error: error.message });
				}
			  },
		},

	}
};


export default getState;