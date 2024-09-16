import { Hono } from "hono";

const app = new Hono();

const route = app.post("/rpc", async (c) => {
	const { method, param } = await c.req.json();
	let result: string | number;

	switch (method) {
		case "hello":
			result = `Hello, ${param[0]}!`;
			break;
		case "add":
			if (typeof param[0] === "number" && typeof param[1] === "number") {
				result = param[0] + param[1];
			} else {
				result = String(param[0]) + String(param[1]);
			}
			break;
		default:
			return c.json({ error: "Method not found" }, 404);
	}

	return c.json({ result });
});

export type AppType = typeof route;

export default app;
