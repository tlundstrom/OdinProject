export const formatDate = (dateInput: Date) => {
	let date = new Date(dateInput);
	return date.toLocaleDateString("en-US");
};
