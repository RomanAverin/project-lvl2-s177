import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const answerFileVisual = path.join(__dirname, '__fixtures__/answer.visual.txt');
const answerFilePlain = path.join(__dirname, '__fixtures__/answer.plain.txt');
const answerFileJSON = path.join(__dirname, '__fixtures__/answer.json.txt');
const answerVisual = fs.readFileSync(answerFileVisual, 'utf-8');
const answerPlain = fs.readFileSync(answerFilePlain, 'utf-8');
const answerJSON = fs.readFileSync(answerFileJSON, 'utf-8');
test('Testing plain output with JSON', () => {
  const testFile1 = path.join(__dirname, '__fixtures__/befor.json');
  const testFile2 = path.join(__dirname, '__fixtures__/after.json');
  expect(genDiff(testFile1, testFile2, 'plain')).toEqual(answerPlain);
});
test('Testing visual output genDiff with JSON', () => {
  const testFile1 = path.join(__dirname, '__fixtures__/befor.json');
  const testFile2 = path.join(__dirname, '__fixtures__/after.json');
  expect(genDiff(testFile1, testFile2, 'visual')).toEqual(answerVisual);
});
test('Testing visual output genDiff with YML', () => {
  const testFile1 = path.join(__dirname, '__fixtures__/befor.yml');
  const testFile2 = path.join(__dirname, '__fixtures__/after.yml');
  expect(genDiff(testFile1, testFile2)).toEqual(answerVisual);
});
test('Testing visual output genDiff with JSON and YML', () => {
  const testFile1 = path.join(__dirname, '__fixtures__/befor.json');
  const testFile2 = path.join(__dirname, '__fixtures__/after.yml');
  expect(genDiff(testFile1, testFile2)).toEqual(answerVisual);
});
test('Testing visual output genDiff with INI', () => {
  const testFile1 = path.join(__dirname, '__fixtures__/befor.ini');
  const testFile2 = path.join(__dirname, '__fixtures__/after.ini');
  expect(genDiff(testFile1, testFile2)).toEqual(answerVisual);
});
test('Testing JSON output genDiff with JSON', () => {
  const testFile1 = path.join(__dirname, '__fixtures__/befor.json');
  const testFile2 = path.join(__dirname, '__fixtures__/after.json');
  expect(genDiff(testFile1, testFile2, 'json')).toEqual(answerJSON);
});
