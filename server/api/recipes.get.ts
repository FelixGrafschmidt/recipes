import { createClient } from "redis";
import { Data } from "~~/models/interfaces/Recipe";

const port = parseInt(process.env.REDIS_PORT || "6378");
const client = createClient({ url: `redis://127.0.0.1:${port}`, database: 2 });
client.connect();

export default defineEventHandler(async (event) => {
	if (!event.req.url) {
		event.res.statusCode = 401;
		return "";
	}
	const url = new URL(event.req.url, `http://${event.req.headers.host}`);
	const id = url.searchParams.get("id");

	if (!id) {
		event.res.statusCode = 401;
		return "";
	}

	const result: Data = JSON.parse((await client.get(`data-${id}`)) || "{}");

	if (!result.id) {
		event.res.statusCode = 404;
		return "";
	}

	return result;
});
