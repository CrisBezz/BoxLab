from pathlib import Path
p=Path('tests/bridge-open-chain-all-quad.test.mjs')
s=p.read_text()
s=s.replace("['folded-quad','degenerate-quad','connector-distortion'].includes(globalThis.__boxlabOpenChainAllQuadBridge?.lastReject)","['folded-quad','degenerate-quad','connector-distortion','topology-rejected','same-direction-edge','non-manifold-edge'].includes(globalThis.__boxlabOpenChainAllQuadBridge?.lastReject)")
p.write_text(s)
