# Batch process tool for Lacuna
This repository contains code to batch run the Lacuna (https://github.com/nielsgrootobbink/lacuna) dead code removal tool.


## Setup
Place this repository folder in the same directory as Lacuna and the TodoMVC examples repository clones:

```
 - Lacuna/
   - lacuna.js
   - [...]

 - TodoMVC/
   - examples
      - ampersand
      - [...]

 - jdce-batch-process-tools/
    - README.md
    - work.js
    - [...]
```

Alternatively, you can change the paths in `work.js` (line 20 and 72) and `add_originals.js` (line 33).


## Running
```
node ./work.js
```
This will take a long time. It will collect all results in the `output.csv` file.

Then, run
```
node ./add_originals.js
```
This will add the original versions to the `processed` directory.

Then, run
```
node ./extract.js
```
This will output a LaTeX table with all results.
