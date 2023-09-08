import React from "react";
import { navigate } from "raviger";
import { login } from "../utils/apiUtils";

const Login = () => {
	const [username, setUsername] = React.useState<string>("");
	const [password, setPassword] = React.useState<string>("");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const data = await login(username, password);
			localStorage.setItem("token", data.token);
			navigate("/");
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};


	return (
		<div className="w-full max-w-lg divide-y divide-gray-200">
            <h1 className="text-2xl my-2 text-gray-700">Login</h1>
				<form className="py-4" onSubmit={handleSubmit}>
					<div className="rounded-md shadow-sm">
						<div className="my-4">
							<label htmlFor="username" className="m-2 p-2">
								Username
							</label>
							<input
								required
								type="text"
								id="username"
								name="username"
								value={username}
								placeholder="Username"
								autoComplete="username"
								onChange={(e) => setUsername(e.target.value)}
								className="border-2 justify-between items-center border-gray-300 rounded-lg p-2 my-2 flex-1"
							/>
						</div>
						<div className="my-4">
							<label htmlFor="password" className="m-2 p-2">
								Password
							</label>
							<input
								required
								id="password"
								name="password"
								type="password"
								value={password}
								placeholder="Password"
								autoComplete="current-password"
								onChange={(e) => setPassword(e.target.value)}
								className="border-2 justify-between items-center border-gray-300 rounded-lg p-2 my-2 flex-1"
							/>
						</div>
					</div>
					<div className="my-4">
						<button
							type="submit"
							className=" bg-sky-700 hover:bg-sky-900 text-white font-bold py-2 px-4 m-4 rounded-lg">
							Sign in
						</button>
					</div>
				</form>
		</div>
	);
};
export default Login;
