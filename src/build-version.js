// BoxLab v0.36.18.106 — single visible build-version owner.
// Older feature modules may still contain historical version stamp timers; hide their
// mutable text and render one stable version label from this owner instead.

const BUILD='v0.36.18.106';
const version=document.querySelector('#appVersion');

function stamp(){
  if(version){
    version.textContent=BUILD;
    version.dataset.boxlabBuild=BUILD;
  }
  document.title=`BoxLab ${BUILD}`;
}

if(version&&!document.querySelector('#boxlabBuildVersionStyle')){
  const style=document.createElement('style');
  style.id='boxlabBuildVersionStyle';
  style.textContent=`
#appVersion[data-boxlab-build]{font-size:0!important}
#appVersion[data-boxlab-build]::after{content:attr(data-boxlab-build);font-size:10px}
`;
  document.head.appendChild(style);
}

stamp();
setTimeout(stamp,1800);

globalThis.__boxlabBuildVersion=BUILD;
