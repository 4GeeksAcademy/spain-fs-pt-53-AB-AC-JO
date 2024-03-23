const backUrl = process.env.BACKEND_URL  // Hay que modificar esta URL con la 3001 (La de nuestro back) y modifica el resto.
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			error: null,
			currentUser: null,
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
						sessionStorage.setItem("currentUser", data.user_id);
						setStore({
							token: data.access_token,
						});
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
				sessionStorage.removeItem("currentUser");
				console.log("session ends")
				setStore({ token: null,currentUser: null, })
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
						alert("Contraseña modificada correctamente");
						return true;
					} else {
						throw new Error('Failed to change password');
					}
				} catch (error) {
					console.error('Error changing password:', error);
					return false;
				}
			},


			getPublicReviews() { 				// Testing not done yet, cross your fingers
				return async () => {
					try {
						const resp = await fetch(backUrl + '/api/reviews', {
							method: 'GET',
							headers: {
								'Content-Type': 'application/json'
							}
						});

						if (!resp.ok) {
							throw new Error('Network response was not ok');
						}

						const data = await resp.json();

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
		},

	}
};


export default getState;