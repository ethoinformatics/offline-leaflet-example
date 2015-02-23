var fs = require('fs');

module.exports = [
	{name: 'airstrip', value: JSON.parse(fs.readFileSync(__dirname + '/airstrip.json', 'utf8'))},
	{name: 'camps', value: JSON.parse(fs.readFileSync(__dirname + '/camps.json', 'utf8'))},
	{name: 'islands', value: JSON.parse(fs.readFileSync(__dirname + '/islands.json', 'utf8'))},
	{name: 'lodges', value: JSON.parse(fs.readFileSync(__dirname + '/lodges.json', 'utf8'))},
	{name: 'riverlines', value: JSON.parse(fs.readFileSync(__dirname + '/riverlines.json', 'utf8'))},
	{name: 'riverpoly', value: JSON.parse(fs.readFileSync(__dirname + '/riverpoly.json', 'utf8'))},
	{name: 'roads', value: JSON.parse(fs.readFileSync(__dirname + '/roads.json', 'utf8'))},
];
