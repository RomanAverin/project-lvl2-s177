import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('Testings genDiff', () => {
  const answerVisual = fs.readFileSync(getFixturePath('answer.visual.txt'), 'utf-8');
  const answerPlain = fs.readFileSync(getFixturePath('answer.plain.txt'), 'utf-8');
  const answerJSON = fs.readFileSync(getFixturePath('answer.json.txt'), 'utf-8');
  it('Testing plain output with JSON', () => {
    const testFile1Path = getFixturePath('befor.json');
    const testFile2Path = getFixturePath('after.json');
    expect(genDiff(testFile1Path, testFile2Path, 'plain')).toEqual(answerPlain);
  });
  it('Testing visual output with JSON', () => {
    const testFile1Path = getFixturePath('befor.json');
    const testFile2Path = getFixturePath('after.json');
    expect(genDiff(testFile1Path, testFile2Path, 'visual')).toEqual(answerVisual);
  });
  it('Testing visual output genDiff with YML', () => {
    const testFile1Path = getFixturePath('befor.yml');
    const testFile2Path = getFixturePath('after.yml');
    expect(genDiff(testFile1Path, testFile2Path)).toEqual(answerVisual);
  });
  it('Testing visual output with JSON and YML', () => {
    const testFile1Path = getFixturePath('befor.json');
    const testFile2Path = getFixturePath('after.yml');
    expect(genDiff(testFile1Path, testFile2Path)).toEqual(answerVisual);
  });
  it('Testing visual output with INI', () => {
    const testFile1Path = getFixturePath('befor.ini');
    const testFile2Path = getFixturePath('after.ini');
    expect(genDiff(testFile1Path, testFile2Path)).toEqual(answerVisual);
  });
  it('Testing JSON output with JSON', () => {
    const testFile1Path = getFixturePath('befor.json');
    const testFile2Path = getFixturePath('after.json');
    expect(genDiff(testFile1Path, testFile2Path, 'json')).toEqual(answerJSON);
  });
});
