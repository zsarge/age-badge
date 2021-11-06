"use strict";

const BIRTHDAY = "06/07/2004";

/**
 * returns a string with the time since my birthday
 * NOTE: This is an approximation, and is not exactly accurate.
 * @param {number} the degree to which the answer is specified (between 1 and 6)
 * @returns {String} Returns a human readable string with the time since my birthday
 */
function getTimeString(length = 6) {
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
		result += `, ${seconds} second${s(seconds)}`;
	}

	return result + " old";
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.handler = async (event) => {
	// Just show a star as an example
	const timeString = getTimeString(getRandomInt(1, 6));
	const width = (timeString.length * 6.62) + 20;
	const height = 30;
	const svg = `
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" fill="none" data-minimalscrollbar="yes" height="${height}" width="${width}">
        <style>
			.lang-name {
				font-size: 11px;
				font-family: monospace;
				fill: #daf7dc;
			}
        </style>

        <rect data-testid="card-bg" x="0.5" y="0.5" rx="4.5" height="100%" stroke="#e4e2e2" width="100%" fill="#151515" stroke-opacity="1"> 
			test
		</rect>
        
		<g transform="translate(10, 20)">
			<text x="0" y="0" class="lang-name" data-testid="lang-name">${timeString}</text>
		</g>

		<span xmlns=""/>
		<auto-scroll xmlns="http://www.w3.org/1999/xhtml">
		</auto-scroll>
	</svg>
	`;

	const response = {
		statusCode: 200,
		body: svg,
		headers: {
			// Set the content type to the correct Mime type
			'Content-Type': 'image/svg+xml',
		},
	};
	return response;
};

