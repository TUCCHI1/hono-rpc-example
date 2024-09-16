async function callRpc(method: string, params: string[] | number[]) {
	const response = await fetch("http://localhost:3000/rpc", {
		method: "POST",
		headers: {
			"Content-Type": "applicattion/json",
		},
		body: JSON.stringify({ method, params }),
	});
	const result = await response.json();
	return result;
}

(async () => {
	const helloRequest = await callRpc("hello", ["World"]);
	console.log(helloRequest); // { result: "Hello, World!" }

	const addRequest = await callRpc("add", [1, 2]);
	console.log(addRequest); // { result: 3 }
})();
