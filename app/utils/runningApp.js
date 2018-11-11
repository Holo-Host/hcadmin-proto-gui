const fs = require("fs");
const path = require("path");

export const getRunningApps = () => {
  const data = fs.readFileSync(path.resolve(__dirname, "../hcadmin-track.txt"));
  const dataString = data.toString();
  const lines = dataString.split('\n').map((line) => {
    if (line !== "") {
      const values = line.split(',')
      return {
        "app_name": values[0],
        "app_url": values[1]
      };
    }
  })
  const runningApps = lines.filter((app) => {
    return app !== undefined;
  });
  console.log("Running Apps: ", runningApps);
  return runningApps;
}
