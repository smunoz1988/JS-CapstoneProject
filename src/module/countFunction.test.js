import { JSDOM } from 'jsdom';
import { countCom, countItemMain } from './countFunctions.js';

const { window } = new JSDOM('<!doctype html><html><body><div id="commentContainer"></div><div id="commentCount"></div></body></html>');

global.document = window.document;
global.window = window;

test('countCom sets the comment count correctly', () => {
  // Set up the initial state of the DOM
  document.getElementById('commentContainer').innerHTML = `
    <div>Comment 1</div>
    <div>Comment 2</div>
    <div>Comment 3</div>
    <div>Comment 4</div>
  `;
  document.getElementById('commentCount').innerHTML = '';

  // Call the function being tested
  countCom();

  // Make assertions about the expected behavior
  expect(document.getElementById('commentCount').innerHTML).toBe('Comments(4)');
});

test('countItemMain sets the item count correctly', () => {
// Create a fake container element to use for testing
  const container = document.createElement('div');
  container.innerHTML = `
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  `;

  // Create the count element
  const countElement = document.createElement('div');
  countElement.setAttribute('id', 'count');
  document.body.appendChild(countElement);

  // Call the function being tested
  countItemMain(container);

  // Check that the count element was updated correctly
  expect(document.getElementById('count').innerHTML).toBe('Pokemons(3)');
});