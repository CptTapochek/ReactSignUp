import * as config from "./config.json";

const { URL, PORT, PROTOCOL } = config.default;

export function requestGraphql(method = "GET", query = "", variables = {}, operationName = null) {
	const reqData = {
		query,
		variables,
		operationName
	};

	const body = (method !== "GET") ? JSON.stringify(reqData) : undefined;
	const urlParams = new URLSearchParams();

	urlParams.append("query", query);
	if (Object.keys(variables).length > 0) urlParams.append("variables", JSON.stringify(variables));
	if (operationName !== null) urlParams.append("operationName", operationName);

	const reqURL = method === "GET" || method === "OPTIONS" ? `${PROTOCOL}://${URL}${PORT !== null ? `:${PORT}` : ""}/api?${urlParams.toString()}` : `${PROTOCOL}://${URL}${PORT !== null ? `:${PORT}` : ""}/api`;

	if (body) {
		return fetch(reqURL, {
			method,
			headers: {
				"content-type": "application/json"
			},
			body
		});
	} 
	return fetch(reqURL, {
		method
	});
    
}