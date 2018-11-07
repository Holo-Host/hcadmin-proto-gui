const cmd = require('node-cmd');

export var get = (script) => {
  cmd.get(
    script,
    function(err, data, stderr) {
      if (!err) {
        console.log('>> ', data)
        return data;
      } else {
        console.log('error', err)
        return err;
      }
    }
  );
}

export const run = (script) => {
  cmd.run(script);
}
