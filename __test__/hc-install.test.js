import {
  hcJoin,
  hcStart
} from '../app/utils/hc-install'

//
// it('Testing the Holochain install process', () => {
//   expect(hcJoin('Errand')).toEqual("");
// });

it('Testing the Holochain start process', () => {
  expect(hcStart('Errand', 4141)).toEqual("");
});
