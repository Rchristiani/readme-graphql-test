function queryGraphQL(query) {
	const queryParams = new URLSearchParams();
	queryParams.append('query',query);
	return fetch(`http://localhost:3000/topics?${queryParams.toString()}`,{
		method: "GET"
	})
	.then(res => res.json())
}

queryGraphQL(`{
	topics {
		title,
		body
	}
}`)
.then(console.log);

queryGraphQL(`{
	topics {
		title
	}
}`)
.then(console.log);




