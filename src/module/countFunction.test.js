import { countCom } from './countFunctions';
import { JSDOM } from 'jsdom';
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
  