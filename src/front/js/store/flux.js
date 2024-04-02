const backUrl = process.env.BACKEND_URL  // Hay que modificar esta URL con la 3001 (La de nuestro back) y modifica el resto.
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			error: null,
			currentUser: {
				token: null,
				visibility: null,
			},
			reviews: [],
		},
		actions: {
			syncToken: async () => {
				const token = sessionStorage.getItem("token");
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
							token: data.access_token, currentUser: {
								token: data.access_token,
								visibility: data.visibility,
							},
						});
						return true;
					} else if (res.status === 401) {
						const errorData = await res.json();
						alert(errorData.msg);
						return false;
					}
				} catch (error) {
					return false;
				}
			},
			logout: () => {
				sessionStorage.removeItem("token");
				sessionStorage.removeItem("currentUser");
				setStore({ token: null, currentUser: null })
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
						alert("Se ha registrado correctamente");
						return true;
					} else if (res.status === 401) {
						const errorData = await res.json();
						alert(errorData.msg)
						return false
					};
				} catch (error) {
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
					return data;
				} catch (error) {
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
					return false;
				}
			},
		},

	}
};


export default getState;