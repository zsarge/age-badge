"use strict";

exports.handler = async (event) => {
	const svg = `
		<svg width="100" height="100">
		  <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
		</svg>
	`;
    const response = {
        statusCode: 200,
        body: JSON.stringify(svg),
    };
    return response;
};

