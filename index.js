"use strict";

const BIRTHDAY = "06/07/2004";

/**
 * returns a string with the time since my birthday
 * NOTE: This is an approximation, and is not exactly accurate.
 * @param {number} the degree to which the answer is specified (between 1 and 6)
 * @returns {String} Returns a human readable string with the time since my birthday
 */
function getFullTimeString(length = 6) {
	// this could be parameterized, but I don't want other people using up my aws resources.
	let miliseconds = new Date() - new Date(BIRTHDAY);
	let seconds = Math.floor(miliseconds / 1000);
	let minutes = Math.floor(seconds / 60);
	let hours   = Math.floor(minutes / 60);
	let days    = Math.floor(hours / 24);
	let months  = Math.floor(days / 30);
	let years   = Math.floor(days / 365);

	seconds %= 60;
	minutes %= 60;
	hours %= 24;
	days %= 30;
	months %= 12;

	const s = (num) => num === 1 ? "" : "s";

	// length <= 1
	let result = `${years} year${s(years)}`;

	if (length >= 2) {
		result += `, ${months} month${s(months)}`;
	}
	if (length >= 3) {
		result += `, ${days} day${s(days)}`;
	}
	if (length >= 4) {
		result += `, ${hours} hour${s(hours)}`;
	}
	if (length >= 5) {
		result += `, ${minutes} minute${s(minutes)}`;
	}
	if (length >= 6) {
		result += `, and ${seconds} second${s(seconds)}`;
	}

	return result + " old";
}

for (let i = 1; i <= 6; i++)
	console.log(getFullTimeString(i));

exports.handler = async (event) => {
	// Just show a star as an example
	const exampleSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' + 
		'<path d="M50,3l12,36h38l-30,22l11,36l-31-21l-31,21l11-36l-30-22h38z" ' + 
		'fill="#FF0" stroke="#FC0" stroke-width="2"/>' + 
		'</svg>';

	const response = {
		statusCode: 200,
		body: exampleSvg,
		headers: {
			// Set the content type to the correct Mime type
			'Content-Type': 'image/svg+xml',
		},
	};
	return response;
};

