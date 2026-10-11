// Only freshly built Add+ candidates: uniform fit preserves topology/proportions.
export function fitAddObjectToUnitCube(mesh){
  const min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity],keys=['x','y','z'];
  for(const v of mesh.vertices)for(let i=0;i<3;i++){
    const n=v[keys[i]];if(!Number.isFinite(n))throw new Error('Invalid object dimensions');
    min[i]=Math.min(min[i],n);max[i]=Math.max(max[i],n);
  }
  const extent=Math.max(...max.map((n,i)=>n-min[i]));
  if(!Number.isFinite(extent)||extent<=0)throw new Error('Invalid object dimensions');
  const centre=min.map((n,i)=>(n+max[i])/2);
  for(const v of mesh.vertices)for(let i=0;i<3;i++)v[keys[i]]=(v[keys[i]]-centre[i])/extent;
  return mesh;
}
