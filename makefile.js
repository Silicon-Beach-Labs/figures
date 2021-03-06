#!/usr/bin/env node
'use strict';
const fs = require('fs');
const table = require('markdown-table');
const {main: darwin, windows: win32} = require('.');

const data = Object.entries(darwin).map(([name, figure]) => [name, figure, win32[name]]);

const jsonTable = [
	[
		'Name',
		'Non-Windows',
		'Windows'
	],
	...data
];

const figureTable = table(jsonTable, {
	align: [
		'',
		'c',
		'c'
	]
});

let readme = fs.readFileSync('readme.md', 'utf8');
readme = readme.replace(/## Figures[^#]*/gm, `## Figures\n\n${figureTable}\n\n\n`);

fs.writeFileSync('readme.md', readme);
