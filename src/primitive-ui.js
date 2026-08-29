import { makePrimitive } from './primitive-factory.js?v=0.30.4';

const addButton = document.querySelector('#outlinerAddBtn');
const status = document.querySelector('#selectionStatus');
let menu = null;

function manager(){ return globalThis.__boxlabObjectManager || null; }
function label(type){ return type.charAt(0).toUpperCase() + type.slice(1); }

function closeMenu(){
  menu?.remove();
  menu = null;
}

function buildMenu(){
  if (menu) return menu;
  const panel = document.createElement('div');
  panel.className = 'boxlab-primitive-menu';
  Object.assign(panel.style, {
    position:'fixed', zIndex:'2000', minWidth:'250px', padding:'10px',
    border:'1px solid rgba(255,255,255,.16)', borderRadius:'12px',
    background:'rgba(24,27,33,.98)', boxShadow:'0 14px 36px rgba(0,0,0,.42)'
  });

  const title = document.createElement('div');
  title.textContent = 'Add Primitive';
  Object.assign(title.style,{fontWeight:'700',fontSize:'13px',marginBottom:'8px'});
  panel.append(title);

  const grid = document.createElement('div');
  Object.assign(grid.style,{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'6px'});
  const types = ['cube','plane','cylinder','sphere','cone','torus'];
  for (const type of types) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label(type);
    button.dataset.primitive = type;
    button.addEventListener('click', event => {
      event.preventDefault(); event.stopPropagation();
      const detail = panel.querySelector('input[name="primitiveDetail"]:checked')?.value || 'medium';
      const m = manager();
      const mesh = makePrimitive(type, detail);
      if (!m?.addMesh || !mesh) return;
      m.addMesh(mesh, label(type), { enterObjectMode:true });
      if (status) status.textContent = `${label(type)} added • ${detail} detail`;
      closeMenu();
    });
    grid.append(button);
  }
  panel.append(grid);

  const detailTitle = document.createElement('div');
  detailTitle.textContent = 'Starting detail';
  Object.assign(detailTitle.style,{fontSize:'11px',opacity:'.7',marginTop:'10px',marginBottom:'5px'});
  panel.append(detailTitle);

  const detail = document.createElement('div');
  Object.assign(detail.style,{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'5px'});
  [['low','Low'],['medium','Medium'],['high','High']].forEach(([value,text]) => {
    const wrapper = document.createElement('label');
    Object.assign(wrapper.style,{display:'flex',alignItems:'center',justifyContent:'center',gap:'4px',fontSize:'11px',padding:'5px',border:'1px solid rgba(255,255,255,.1)',borderRadius:'8px'});
    const input = document.createElement('input');
    input.type='radio'; input.name='primitiveDetail'; input.value=value; input.checked=value==='medium';
    const span = document.createElement('span'); span.textContent=text;
    wrapper.append(input,span); detail.append(wrapper);
  });
  panel.append(detail);
  document.body.append(panel);
  menu = panel;
  return panel;
}

function positionMenu(panel){
  const r = addButton.getBoundingClientRect();
  const width = panel.offsetWidth || 250;
  const left = Math.max(8, Math.min(window.innerWidth - width - 8, r.left));
  const top = Math.max(8, Math.min(window.innerHeight - panel.offsetHeight - 8, r.bottom + 6));
  panel.style.left = `${left}px`;
  panel.style.top = `${top}px`;
}

addButton?.addEventListener('click', event => {
  event.preventDefault();
  event.stopImmediatePropagation();
  if (menu) { closeMenu(); return; }
  const panel = buildMenu();
  positionMenu(panel);
}, true);

if (addButton) addButton.textContent = '+ Add';

document.addEventListener('pointerdown', event => {
  if (!menu) return;
  if (menu.contains(event.target) || event.target === addButton) return;
  closeMenu();
}, true);
window.addEventListener('resize', closeMenu);
