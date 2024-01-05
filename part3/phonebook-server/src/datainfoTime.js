const templateString = () => {
	const dateInfo = new Date();
	return dateInfo
		.toLocaleString("en-US", {
			weekday: "short",
			month: "short",
			day: "numeric",
			year: "numeric",
			hour: "numeric",
			minute: "numeric",
			second: "numeric",
			timeZoneName: "short",
			timeZone: "Europe/Bucharest",
		})
		.replace(/,/g, "")
		.replace(
			/GMT\+(\d+)/,
			(_, offset) => `GMT+0${offset} (Eastern European Standard Time)`
		);
};

module.exports = templateString;
