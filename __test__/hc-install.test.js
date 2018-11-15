import {
  hcJoin,
  hcStart
} from '../app/utils/hc-install'

import { getStatsForPID , getPIDs } from '../app/utils/stats'
//
// it('Testing the Holochain install process', () => {
//   expect(hcJoin('Errand')).toEqual("");
// });

// it('Testing the Holochain start process', () => {
//   expect(hcStart('Errand', 4141)).toEqual("");
// });

// it('Testing the Holochain stats process', () => {
//   expect(getStatsForPID(17740)).toEqual("");
// });


it('Testing the Holochain stats process', () => {
  expect(getPIDs()).toEqual("");
});
