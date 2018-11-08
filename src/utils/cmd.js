const cmd = require('node-cmd');


export const run = (script) => {
  cmd.run(script);
}

export var get = () => {
cmd.get(
       `hcadmin`,
       function(err, data, stderr){
           if (!err) {
              console.log('the node-cmd cloned dir contains these files :\n\n',data)
           } else {
              console.log('error', err)
           }

       }
   );
  return "win"
}
