import { layoutWideToolPanel } from './tool-session-wide-layout.js?v=0.36.18.716';
// Shared viewport-relative dock for session controls and numeric popups.
// All future session popups use this placement instead of following the model.
export function placeToolSessionPanel(panel){
  if(!panel)return;
  layoutWideToolPanel(panel);
  Object.assign(panel.style,{
    position:'absolute',left:'50%',top:'12px',transform:'translateX(-50%)',
    maxWidth:'calc(100% - 16px)',maxHeight:'calc(100% - 24px)',
    overflowY:'auto',boxSizing:'border-box',zIndex:'134'
  });
}
