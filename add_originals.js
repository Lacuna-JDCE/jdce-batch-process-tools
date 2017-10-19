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


function get_copy_command(from, to)
{
	return 'cp -rf "' + from + '" "' + to + '"';
}



function execute( cmd )
{
	const execute = child_process.execSync;

	return execute(cmd);

}



const directory = '../TodoMVC/examples/';

let folders = get_directories(directory);


for(let i = 0; i <= folders.length; i++)
{
	let entry = folders[i];
	if(!entry) continue;

	let overfolder = './processed/' + entry + '/original/';

	execute( get_copy_command(path.join(directory, entry) + '/.', overfolder) );
}
