# Painted metal reflections — .925

User evidence resolved the earlier ambiguity: Channel white255 is correct, and
metalness exports correctly to Nomad. The supplied native grayscale map matches the
project R8 bytes exactly. Smooth metal rendered black in BoxLab Lit because the
painted Standard material lacked image-based reflection input.

The existing surface owner now assigns an environment map only when metalness is
present and the scene has no explicit environment. Three179 RoomEnvironment is baked
once per retained renderer into128cube PMREM. Shared references release the target
when the last surface closes; temporary room/generator assets are disposed immediately.
Channel stays unlit. Colour/roughness-only appearance and explicit scene environments
keep their original paths. No global scene lighting, source map, slider, writer,
project/history or UV change. No external image download or custom material shader.

Official Three documentation: https://threejs.org/docs/pages/RoomEnvironment.html
and https://threejs.org/docs/pages/PMREMGenerator.html . Installed179 source checked;
PMREM handles roughness-dependent reflection filtering through the original material.

Automated tests verify assignment/sharing/disposal and unchanged raw values/export.
They do not establish rendered GPU appearance. The cloud browser's existing WebGL
limitation remains. Device gate: Lit metal255/roughness0, orbit for reflections;
roughness255 should blur, Channel values stay correct, Done/reopen and Nomad retain
maps. User924 toolbar PASS protected;925 visual acceptance pending.
