const fs = require('fs'),
      path = require('path');

function fix_name(name)
{
	if(name == 'dynamic') return 'dynamic';

	if(name == 'static_nativecalls') return 'static';

	if(name == 'dynamic_static_nativecalls') return 'dynamic & static';
}


let raw = fs.readFileSync('output.csv').toString();
let lines = raw.split('\n');


let per_type = {};

for(let i = 0; i < lines.length; i++)
{
	let line = lines[i];
	let s = line.split(',');
	let name_split = s[0].split('/');
	let name = name_split[2];

	if(!per_type[name])
	{
		per_type[name] = [];
	}

	let entry = {};


	entry.type = fix_name(name_split[3]);
	entry.js_files = s[1];
	entry.functions = s[2];
	entry.removed = s[3];
	entry.runtime = s[4];

	per_type[name].push(entry);
}


let string_results = [];

// name, js files, original functions, dynamic, static, dynamic & static, load errors
string_results.push("\\begin{tabular}{lcccccc}");
string_results.push("Framework & \\# JavaScript files & original functions & \\verb|dynamic| & \\verb|static| & \\verb|dynamic| \\& \\verb|static| \\\\");
string_results.push("\\hline");

for(let todo in per_type)
{
	if(todo == 'undefined') continue;

	let row = [];
	let values = per_type[todo];


	row.push(todo.replace('_',' ').replace('_', ' '));
	row.push(values[0].js_files == '' ? '-' : values[0].js_files);
	row.push(values[0].functions == '' ? '-' : values[0].functions);

	let dynamic = values[0] ? values[0].removed : '-';
	let statics = values[1] ? values[1].removed : '-';
	let both = values[2] ? values[2].removed : '-';

	if(dynamic == '') dynamic = '-';
	if(statics == '') statics = '-';
	if(both == '') both = '-';

	row.push(dynamic);
	row.push(statics);
	row.push(both);

	string_results.push( row.join('&') + '\\\\' );
}

string_results.push("\\end{tabular}");


console.log(string_results.join('\n'));

/*
          1	&	google.com		&	8	&	165	&	165	&	136	&	136	\\

*/
