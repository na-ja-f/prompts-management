import fs from 'fs'
import promptClass from './src/prompts.js'

const prompts = JSON.parse(fs.readFileSync('./data/prompts.json', 'utf8'));
const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));

const promptManager = new promptClass(prompts, users);

// write tests below ------

console.log(promptManager.getAll('johndoe'));
// console.log(promptManager.get('johndoe', "64b51308916fea7090b6efdf"));
// console.log(promptManager.create('johndoe',{ prompt: 'New Prompt', label: 'label', visibility: 'public', sharedAccess: [], description: '', type: '', subtype: '' }));
// console.log(promptManager.update('sarahwilson', "64b51308916fea7090b6efdf", { label: 'Updated label' }));
// console.log(promptManager.delete('jamesgarcia', "64b51576a6745f6db0452771"));
