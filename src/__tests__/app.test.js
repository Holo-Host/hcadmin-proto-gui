// import { getPath } from '../utils/file-system';

const { getAllApps , get } = require('../utils/app-cmd');

// it('Test if script is running', () => {
//   expect(run('touch test1.cmd.file')).toEqual("win");
// });


it('Test if script gets info is running', () => {
  expect(getAllApps()).toEqual("win");
});
