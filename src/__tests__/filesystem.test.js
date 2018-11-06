// import { getPath } from '../utils/file-system';

const {getPath} = require('../utils/file-system');

it('Test if the tests are working-->', () => {
  expect(getPath()).toEqual("win");
});
