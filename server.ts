import { Hono } from "hono";

const app = new Hono();

app.post("/rpc", async (c) => {
	const { method, param } = await c.req.json();
	let result: string;

	switch (method) {
		case "hello":
			result = `Hello, ${param[0]}!`;
			break;
		case "add":
			result = param[0] + param[1];
			break;
		default:
			return c.json({ error: "Method not found" }, 404);
	}
});
