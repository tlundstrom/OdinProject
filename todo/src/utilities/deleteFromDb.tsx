export const deleteFromDb = (id: number) => {
	const settings = {
		method: "'delete'",
	};

	fetch(`http://localhost:3000/todos/${id}`, settings).then((res) => res.json());
};
