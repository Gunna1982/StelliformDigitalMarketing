#!/usr/bin/env node
const {execSync, spawnSync} = require('child_process');
const {exit} = require('process');

const RESERVED = new Set([
  'con','prn','aux','nul','clock$',
  // com1..com9 and lpt1..lpt9
  ...Array.from({length:9},(_,i)=>`com${i+1}`),
  ...Array.from({length:9},(_,i)=>`lpt${i+1}`)
]);

function getStagedFiles(){
  try{
    return execSync('git diff --cached --name-only --no-renames',{encoding:'utf8'})
      .split(/\r?\n/).filter(Boolean);
  }catch(e){
    return [];
  }
}
function getAllFiles(){
  try{
    return execSync('git ls-files',{encoding:'utf8'})
      .split(/\r?\n/).filter(Boolean);
  }catch(e){
    return [];
  }
}
function getHistoryFiles(){
  try{
    const out = execSync('git log --pretty=format: --name-only --all',{encoding:'utf8'});
    return Array.from(new Set(out.split(/\r?\n/).filter(Boolean)));
  }catch(e){
    return [];
  }
}

function basename(path){
  const parts = path.replace(/\\\\/g,'/').split('/');
  return parts[parts.length-1];
}

function check(paths){
  const matches = [];
  for(const p of paths){
    const base = basename(p).toLowerCase();
    if(!base) continue;
    const namePart = base.split('.')[0];
    if(RESERVED.has(namePart)) matches.push(p);
  }
  return matches;
}

async function main(){
  const arg = process.argv[2] || '--staged';
  let paths = [];
  if(arg === '--staged') paths = getStagedFiles();
  else if(arg === '--all') paths = getAllFiles();
  else if(arg === '--history') paths = getHistoryFiles();
  else {
    console.error('Unknown arg:',arg); process.exit(2);
  }

  const matches = check(paths);
  if(matches.length){
    console.error('\u26A0\uFE0F Reserved Windows device-name(s) found:');
    for(const m of matches) console.error('  -',m);
    console.error('\nPlease rename or remove these files before committing (Windows reserves names like NUL, CON, PRN, AUX, COM1..COM9, LPT1..LPT9).');
    process.exit(1);
  }
  // no matches
  process.exit(0);
}

main();
