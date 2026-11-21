/* Service worker van Maanlegging: toont pushmeldingen en opent de app als je erop tikt. */
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('push',e=>{
  let d={};
  try{d=e.data?e.data.json():{}}catch(_){d={body:e.data?e.data.text():''}}
  e.waitUntil(self.registration.showNotification(d.title||'Maanlegging',{
    body:d.body||'',icon:'icon-192.png',badge:'icon-192.png',tag:d.tag||undefined,data:{tab:d.tab||'maand'}
  }));
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  const tab=(e.notification.data&&e.notification.data.tab)||'maand';
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{
    for(const c of list){
      if('focus' in c){c.postMessage({tab});return c.focus()}
    }
    return self.clients.openWindow(self.registration.scope+'?tab='+tab);
  }));
});
