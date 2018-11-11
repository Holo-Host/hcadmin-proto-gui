export const filterApps=(installed_apps,downloaded_apps,running_apps)=>{

  const mergedAppsList=mergeApps(installed_apps,downloaded_apps);
  const markedRunningApps=markRunningApps(mergedAppsList,running_apps);
  console.log("markedRunningApps: ",markedRunningApps);

  return markedRunningApps;
}

const mergeApps=(installed_apps,downloaded_apps)=>{
  const fileterd_downloaded_apps=downloaded_apps.filter((d_apps)=>{
    const duplicate_app=installed_apps.find((i_apps)=>{
      return i_apps.appName===d_apps.appName;
    })
    return duplicate_app==undefined
  })
  return [...new Set([...installed_apps, ...fileterd_downloaded_apps])]
}

const markRunningApps=(appsList,runningApp)=>{
  return appsList.map((app)=>{
    let flag=false;
    for(let runApp of runningApp){
      if(app.appName===runApp.app_name){
        flag = true;
      }
    }

    app.running=flag;
    return app;
  });
}
