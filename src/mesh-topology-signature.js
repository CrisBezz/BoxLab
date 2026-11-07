// Shared existing import/export topology identity; positions deliberately excluded.
export function meshTopologySignature(mesh){
  if(!mesh?.faces)return'';
  return mesh.faces.map((face,index)=>`${face.join(',')}@${mesh.faceGroups?.[index]??''}`).join('|');
}
