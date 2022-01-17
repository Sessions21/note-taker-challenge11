//Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');

//read-write async processes
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const PORT = process.env.PORT || 5000;
const app = express()
