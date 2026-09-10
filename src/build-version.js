// BoxLab v0.36.18.98 — single visible build-version owner.
// Older feature modules still contain historical version stamp timers; hide their
// mutable text and render one stable version label from this owner instead.

const BUILD='v0.36.18.98';
const version=document.querySelector('#appVersion');

if(version){
  version.textContent=BUILD;
  version.dataset.boxlabBuild=BUILD;
  if(!document.querySelector('#boxlabBuildVersionStyle')){
    const style=document.createElement('style');
    style.id='boxlabBuildVersionStyle';
    style.textContent=`
#appVersion[data-boxlab-build]{font-size:0!important}
#appVersion[data-boxlab-build]::after{content:attr(data-boxlab-build);font-size:10px}
`;
    document.head.appendChild(style);
  }
}

document.title=`BoxLab ${BUILD}`;
globalThis.__boxlabBuildVersion=BUILD;
