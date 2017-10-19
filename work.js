const file_system = require('fs'),
      path = require('path'),
      child_process = require('child_process');



function get_directories(src_path)
{
	return file_system.readdirSync(src_path).filter(function(file)
	{
		return file_system.lstatSync(path.join(src_path, file)).isDirectory();
	});
}


function get_lacuna_command(folder, analyzers, timeout)
{
	let command = 
	[
		'node ../Lacuna/lacuna.js',
		'"' + folder + '"',
		'--analyzer ' + analyzers.join(' '),
		'--timeout ' + timeout,
		'--csv'
	];

	return command.join(' ');
}


function get_analyzers(bits)
{
	const analyzers = ['dynamic', 'static nativecalls'];
	let list = [];

	if(bits & 0x01)	list.push(analyzers[0]);
	if(bits & 0x02) list.push(analyzers[1]);

	return list;
}


function get_copy_command(from, to)
{
	return 'cp -rf "' + from + '" "' + to + '"';
}


function get_remove_command(folder)
{
	return 'rm -rf "' + folder + '"';
}


function execute( cmd )
{
	const execute = child_process.execSync;

	//console.log(cmd);

	try
	{
		execute(cmd);
	}catch(e)
	{
		//console.log('Command', cmd, 'did crash and burn');
	}
}



const directory = '../TodoMVC/examples/';

let folders = get_directories(directory);


for(let i = 0; i <= folders.length; i++)
{
	let entry = folders[i];
	if(!entry){continue;}

	let overfolder = './processed/' + entry + '/';

	// Loop over all possible combinations of the analyzers
	for(let j = 0x01; j < 0x04; j++)
	{
		if(!file_system.existsSync(overfolder))
		{
			execute('mkdir "' + overfolder + '"');
		}

		let run_entry = overfolder + get_analyzers(j).join('_').replace(' ', '_').replace(',', '') + '/';

		if(!file_system.existsSync(run_entry))
		{
			execute('mkdir "' + run_entry + '"');
		}

		execute( get_copy_command( path.join(directory, entry) + '/.', run_entry ) );

		execute( get_lacuna_command(run_entry, get_analyzers(j), 60 * 1000) );
	}
}
