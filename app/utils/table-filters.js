export const filterApps=(installed_apps,downloaded_apps)=>{
  const fileterd_downloaded_apps=downloaded_apps.filter((d_apps)=>{
    const duplicate_app=installed_apps.find((i_apps)=>{
      return i_apps.appName===d_apps.appName;
    })
    return duplicate_app==undefined
  })
  return [...new Set([...installed_apps, ...fileterd_downloaded_apps])]
}
