"use strict";

const BIRTHDAY = "06/07/2004";

// this could be parameterized, but I don't want other people using up my aws resources.
const rawMiliseconds = new Date() - new Date(BIRTHDAY);
const rawSeconds = Math.floor(rawMiliseconds / 1000);
const rawMinutes = Math.floor(rawSeconds / 60);
const rawHours   = Math.floor(rawMinutes / 60);
const rawDays    = Math.floor(rawHours / 24);
const rawMonths  = Math.floor(rawDays / 30);
const rawYears   = Math.floor(rawDays / 365);

const seconds = rawSeconds % 60;
const minutes = rawMinutes % 60;
const hours   = rawHours % 24;
const days    = rawDays % 30;
const months  = rawMonths % 12;
const years   = rawYears;

const s = (num) => num === 1 ? "" : "s";

/**
 * returns a string with the time since my birthday
 * NOTE: This is an approximation, and is not exactly accurate.
 * @param {number} the degree to which the answer is specified (between 1 and 6)
 * @returns {String} Returns a human readable string with the time since my birthday
 */
function getNormalTimeString(length = 6) {
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

function getDogYears() {
	const dogYears = years * 7;
	return `${dogYears} year${s(dogYears)} old (in dog years)`;
}

function getMicroCenturies() {
	const microcenturies = Math.round((rawMinutes / 52.595) * 100) / 100;
	return `${microcenturies} microcenturies old`
}

function getTimeString(option) {
	if (option <= 6) {
		return getNormalTimeString(option);
	} else if (option === 7) {
		return getDogYears();
	} else if (option === 8) {
		return getMicroCenturies();
	}
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
	const timeString = getTimeString(getRandomInt(1, 8));
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

