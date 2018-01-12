import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const fixturesPath = path.resolve(process.cwd(), '__tests__/__fixtures__');
const answerVisual = fs.readFileSync(`${fixturesPath}/answer.visual.txt`, 'utf-8');
const answerPlain = fs.readFileSync(`${fixturesPath}/answer.plain.txt`, 'utf-8');
const answerJSON = fs.readFileSync(`${fixturesPath}/answer.json.txt`, 'utf-8');
test('Testing plain output with JSON', () => {
  const testFile1Path = `${fixturesPath}/befor.json`;
  const testFile2Path = `${fixturesPath}/after.json`;
  expect(genDiff(testFile1Path, testFile2Path, 'plain')).toEqual(answerPlain);
});
test('Testing visual output with JSON', () => {
  const testFile1Path = `${fixturesPath}/befor.json`;
  const testFile2Path = `${fixturesPath}/after.json`;
  expect(genDiff(testFile1Path, testFile2Path, 'visual')).toEqual(answerVisual);
});
test('Testing visual output genDiff with YML', () => {
  const testFile1Path = `${fixturesPath}/befor.yml`;
  const testFile2Path = `${fixturesPath}/after.yml`;
  expect(genDiff(testFile1Path, testFile2Path)).toEqual(answerVisual);
});
test('Testing visual output genDiff with JSON and YML', () => {
  const testFile1Path = `${fixturesPath}/befor.json`;
  const testFile2Path = `${fixturesPath}/after.yml`;
  expect(genDiff(testFile1Path, testFile2Path)).toEqual(answerVisual);
});
test('Testing visual output genDiff with INI', () => {
  const testFile1Path = `${fixturesPath}/befor.ini`;
  const testFile2Path = `${fixturesPath}/after.ini`;
  expect(genDiff(testFile1Path, testFile2Path)).toEqual(answerVisual);
});
test('Testing JSON output genDiff with JSON', () => {
  const testFile1Path = `${fixturesPath}/befor.json`;
  const testFile2Path = `${fixturesPath}/after.json`;
  expect(genDiff(testFile1Path, testFile2Path, 'json')).toEqual(answerJSON);
});
