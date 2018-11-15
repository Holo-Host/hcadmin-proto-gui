export const filterApps=(installed_apps,downloaded_apps,running_apps,allStats)=>{

  const mergedAppsList=mergeApps(installed_apps,downloaded_apps);
  // const markedRunningApps=markRunningApps(mergedAppsList,running_apps);
  const allAppsWithStats=addStats(mergedAppsList,allStats)
  console.log("allAppsWithStats: ",allAppsWithStats);
  return allAppsWithStats;
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

const addStats = (allApps,allStats) => {
  console.log("AllStats:",allStats);
  const allAppsStats=allApps.map((app)=>{
    if(allStats[app.appName]){
      const stats=allStats[app.appName];
      console.log("ENTERED:",stats);
      return {...app,'CPU%':stats.CPU,'MEM%':stats.MEM,'portNumber':stats.portNumber,'running':true}
    }else{
      return {...app,'CPU%':0,'MEM%':0,'portNumber':'-','running':false}
    }
  }
)
  console.log("All Apps Stats: ",allAppsStats)
  return allAppsStats
}
