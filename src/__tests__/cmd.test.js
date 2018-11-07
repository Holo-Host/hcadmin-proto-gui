// import { getPath } from '../utils/file-system';

const { run, get } = require('../utils/cmd');

it('Test if script is running', () => {
  expect(run('touch test.cmd.file')).toEqual("win");
});


it('Test if script gets info is running', () => {
  expect(get('hcadmin')).toEqual("win");
});
