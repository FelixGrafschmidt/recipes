import { kv } from "@vercel/kv";
import { Data } from "~~/models/interfaces/Recipe";

export default defineEventHandler(async (event) => {
	if (!event.node.req.url) {
		event.node.req.statusCode = 401;
		return "";
	}
	const url = new URL(event.node.req.url, `http://${event.node.req.headers.host}`);
	const id = url.searchParams.get("id");

	if (!id) {
		event.node.res.statusCode = 401;
		return "";
	}
	const data: Data = await readBody(event);

	kv.set("data-" + data.id, data);

	event.node.res.statusCode = 204;
	return null;
});
