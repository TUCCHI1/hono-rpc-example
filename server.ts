import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono();

const rpcSchema = z.object({
	method: z.string(),
	paramss: z.array(z.union([z.string(), z.number()])),
});

const route = app.post("/rpc", zValidator("json", rpcSchema), async (c) => {
	const { method, params } = await c.req.json();
	let result: string | number;

	switch (method) {
		case "hello":
			result = `Hello, ${params[0]}!`;
			break;
		case "add":
			if (typeof params[0] === "number" && typeof params[1] === "number") {
				result = params[0] + params[1];
			} else {
				result = String(params[0]) + String(params[1]);
			}
			break;
		default:
			return c.json({ error: "Method not found" }, 404);
	}

	return c.json({ result });
});

export type AppType = typeof route;

export default app;
