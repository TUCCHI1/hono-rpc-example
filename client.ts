import { hc } from "hono/client";
import type { AppType } from "./server";

const client = hc<AppType>("http://localhost:3000");

async function callRpc(method: string, params: (string | number)[]) {
	const res = await client.rpc.$post({
		json: { method, params },
	});

	if (res.ok) {
		const data = await res.json();
		console.log(data);
	} else {
		const error = await res.json();
		console.error(error);
	}
}

(async () => {
	await callRpc("hello", ["world"]); // { result: "Hello, world!" }
	await callRpc("add", [1, 2]); // { result: 3 }
})();
