import path from 'path';
import genDiff from '../src';

const answerVisual =
  [
    '{',
    '   common: {',
    '      setting1: Value 1',
    '    - setting2: 200',
    '      setting3: true',
    '    - setting6: {',
    '         key: value',
    '      }',
    '    + setting4: blah blah',
    '    + setting5: {',
    '         key5: value5',
    '      }',
    '   }',
    '   group1: {',
    '    - baz: bas',
    '    + baz: bars',
    '      foo: bar',
    '   }',
    ' - group2: {',
    '      abc: 12345',
    '   }',
    ' + group3: {',
    '      fee: 100500',
    '   }',
    '}',
  ].join('\n');
const answerPlain = [
  'Property \'common.setting2\' was removed\n',
  'Property \'common.setting6\' was removed\n',
  'Property \'common.setting4\' was added with value: blah blah\n',
  'Property \'common.setting5\' was added with complex value\n',
  'Property \'group1.baz\' was updated. From \'bas\' to \'bars\'\n',
  'Property \'group2\' was removed\n',
  'Property \'group3\' was added with complex value\n',
].join('');
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
