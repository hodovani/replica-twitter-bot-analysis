// Setup jsdom
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const d3 = require('d3');

const fs = require('fs');

// Constants

const height = 500;
const width = 500;
const margin = { top: 25, right: 20, bottom: 35, left: 40 };

// Get data from csv file

const data = fs
	.readFileSync('./dates.csv', {
		encoding: 'utf8',
	})
	.toString()
	.split('\n')
	.splice(1)
	.map((d, i) => {
		return { y: new Date(d), x: i };
	});

// Setup plot

const x = d3
	.scaleLinear()
	.domain(d3.extent(data, (d) => d.x))
	.nice()
	.range([margin.left, width - margin.right]);

const y = d3
	.scaleTime()
	.domain(d3.extent(data, (d) => d.y))
	.nice()
	.range([height - margin.bottom, margin.top]);

const grid = (g) =>
	g
		.attr('stroke', 'currentColor')
		.attr('stroke-opacity', 0.1)
		.call((g) =>
			g
				.append('g')
				.selectAll('line')
				.data(x.ticks())
				.join('line')
				.attr('x1', (d) => 0.5 + x(d))
				.attr('x2', (d) => 0.5 + x(d))
				.attr('y1', margin.top)
				.attr('y2', height - margin.bottom)
		)
		.call((g) =>
			g
				.append('g')
				.selectAll('line')
				.data(y.ticks())
				.join('line')
				.attr('y1', (d) => 0.5 + y(d))
				.attr('y2', (d) => 0.5 + y(d))
				.attr('x1', margin.left)
				.attr('x2', width - margin.right)
		);

const xAxis = (g) =>
	g
		.attr('transform', `translate(0,${height - margin.bottom})`)
		.call(d3.axisBottom(x).ticks(width / 80))
		.call((g) => g.select('.domain').remove())
		.call((g) =>
			g
				.append('text')
				.attr('x', width)
				.attr('y', margin.bottom - 4)
				.attr('fill', 'currentColor')
				.attr('text-anchor', 'end')
				.text(data.x)
		);

const yAxis = (g) =>
	g
		.attr('transform', `translate(${margin.left},0)`)
		.call(d3.axisLeft(y))
		.call((g) => g.select('.domain').remove())
		.call((g) =>
			g
				.append('text')
				.attr('x', -margin.left)
				.attr('y', 10)
				.attr('fill', 'currentColor')
				.attr('text-anchor', 'start')
				.text(data.y)
		);

// Setup svg

const dom = new JSDOM(`<!DOCTYPE html><body></body>`);

let body = d3.select(dom.window.document.querySelector('body'));

let svg = body
	.append('svg')
	.attr('width', 1000)
	.attr('height', 1000)
	.attr('xmlns', 'http://www.w3.org/2000/svg');

svg.append('g').call(xAxis);

svg.append('g').call(yAxis);

svg.append('g').call(grid);

svg
	.append('g')
	.attr('stroke', 'steelblue')
	.attr('stroke-width', 1)
	.attr('fill', 'black')
	.selectAll('circle')
	.data(data)
	.join('circle')
	.attr('cx', (d) => x(d.x))
	.attr('cy', (d) => y(d.y))
	.attr('r', 1);

svg
	.append('g')
	.attr('font-family', 'sans-serif')
	.attr('font-size', 10)
	.selectAll('text')
	.data(data)
	.join('text')
	.attr('dy', '0.35em')
	.attr('x', (d) => x(d.x) + 7)
	.attr('y', (d) => y(d.y))
	.text((d) => d.name);

fs.writeFileSync('out.svg', body.html());
