const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
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
					const res = await fetch("https://expert-winner-5gx76wgr744f7w4w-3001.app.github.dev/api/token", {
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
					console.error("There has been an error:", error);
					return false;
				}
			},
			logout: () => {
				sessionStorage.removeItem("token");
				console.log("session ends")
				setStore({ token: null })
			},
			register: async (email, password) => {
				try {
					const res = await fetch("https://expert-winner-5gx76wgr744f7w4w-3001.app.github.dev/api/user", {
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
						alert("Successful registration");
						return true;
					} else if (res.status === 401) {
						const errorData = await res.json();
						alert(errorData.msg)
						return false
					};
				} catch (error) {
					console.error("There has been an error:", error);
					return false;
				}
			},
			getMessage: async () => {
				const store = getStore();
				try {
					const resp = await fetch("https://expert-winner-5gx76wgr744f7w4w-3001.app.github.dev/api/hello", {
						headers: {
							'Authorization': 'Bearer ' + store.token
						}
					});
					const data = await resp.json()
					setStore({ message: data.message })
					console.log(data.message)
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			getUser: async () => {
				const store = getStore();
				try {
					const resp = await fetch("https://expert-winner-5gx76wgr744f7w4w-3001.app.github.dev/api/privateuser", {
						headers: {
							'Authorization': 'Bearer ' + store.token
						}
					});
					const data = await resp.json()
					setStore({ message: data.message })
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
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
			}
		},

	}
};


export default getState;