// Add or edit your Roblox games and systems here.
//
// media (optional) — what shows in the card and the viewer:
//   { type: "image", src: "/games/my-game.png" }      screenshot in /public/games
//   { type: "video", src: "/games/my-clip.mp4" }      gameplay recording in /public/games
//   { type: "youtube", id: "VIDEO_ID" }               YouTube video id
// Without media, the card draws a clean architecture diagram from `nodes`.

export type Media =
  | { type: "image"; src: string }
  | { type: "video"; src: string; poster?: string }
  | { type: "youtube"; id: string };

export type GalleryImage = {
  src: string;
  caption?: string;
};

export type WorkItem = {
  slug: string;
  kind: "Shipped Game" | "Core System";
  title: string;
  summary: string;
  problem: string;
  result: string;
  nodes: string[];
  steps?: string[];
  playUrl?: string;
  media?: Media;
  gallery?: GalleryImage[];
};

export const work: WorkItem[] = [
  {
    slug: "ride-to-the-peak",
    kind: "Shipped Game",
    title: "Ride to the Peak",
    summary: "13.4 km Roblox road cycling game across 12 biome scenes, built with 67 Luau scripts in Rojo.",
    problem:
      "Large open-world Roblox experiences easily suffer from empty repetitive terrain, broken physics joints, client-side exploits, and high mobile memory spikes.",
    result:
      "Shipped a complete playable 13.4 km climb from camp plaza to summit temple with StreamingEnabled, DataStore persistence, procedural terrain, custom bikes, and dynamic audio.",
    nodes: ["Rojo", "Main.server", "WorldBuilder", "BikeBuilder", "Client HUD"],
    steps: [
      "Players spawn into a camp plaza with a guided 3-step onboarding card (drinks, garage, ride)",
      "Custom rigid-body bikes scale dynamically to each R15 rider and traverse 1,200 road pieces and 2 route forks",
      "11 rest stops sell hydration & boost cans, save checkpoints, and reward coins toward bikes, helmets, kits, and paint",
      "StreamingEnabled keeps phones lean while server-published RouteMap & Flocks sync the world ahead",
    ],
    playUrl:
      "https://www.roblox.com/share?code=22f4375e4715654e8035b1a5bb8fbd3e&type=ExperienceDetails&stamp=1795027705333",
    media: { type: "image", src: "/games/ride-to-the-peak.png" },
    gallery: [
      { src: "/games/Ride-to-the-peek/image.png", caption: "Camp Plaza & Start Gate" },
      { src: "/games/Ride-to-the-peek/image%20copy%207.png", caption: "Harbour Docks & Lighthouse" },
      { src: "/games/Ride-to-the-peek/image%20copy.png", caption: "Valley Farmsteads & Approach" },
      { src: "/games/Ride-to-the-peek/image%20copy%205.png", caption: "Terraced Paddies Climb" },
      { src: "/games/Ride-to-the-peek/image%20copy%203.png", caption: "Split Route Fork & Bay" },
      { src: "/games/Ride-to-the-peek/image%20copy%204.png", caption: "Coastal Cliffside Corridor" },
      { src: "/games/Ride-to-the-peek/image%20copy%202.png", caption: "Bamboo Ridge Trail" },
      { src: "/games/Ride-to-the-peek/image%20copy%206.png", caption: "Cedar Forest Canopy" },
      { src: "/games/Ride-to-the-peek/image%20copy%208.png", caption: "Alpine Snow Switchbacks" },
      { src: "/games/Ride-to-the-peek/image%20copy%209.png", caption: "Summit Shrine Gate" },
      { src: "/games/Ride-to-the-peek/image%20copy%2010.png", caption: "Summit Cloud Overlook" },
    ],
  },
  {
    slug: "procedural-world-gen",
    kind: "Core System",
    title: "Procedural 13.4 km Terrain & Spline Roads",
    summary: "Generates 1,200 road segments, Catmull-Rom curve bends, Terrain relief, and 12 themed scenes.",
    problem:
      "Hand-building a 48,000-stud mountain route with fork lanes, tunnels, harbour docks, and terraced rice paddies is slow and error-prone to iterate on.",
    result:
      "Seeded world generator builds the entire mountain climb, protects road clearance in HeightCanvas, settles props off cliffs, and exposes live progress to ReplicatedFirst.",
    nodes: ["Config", "Curves", "HeightCanvas", "WorldBuilder", "Settle"],
    steps: [
      "Config.altitudeAt and spiral turn parameters define 12 biome zones up to 1,800 studs elevation",
      "Curves.lua detects turns above 2.5 degrees and slices deck, stripes, and guardrails along a Catmull-Rom spline",
      "HeightCanvas carves ridges, coastlines, and road corridors (keeping roadside terrain 3.3 studs lower so zero gaps appear)",
      "Settle.lua grounds trees, villagers, and wildlife on finished terrain and excludes steep cliffs",
    ],
    playUrl:
      "https://www.roblox.com/share?code=22f4375e4715654e8035b1a5bb8fbd3e&type=ExperienceDetails&stamp=1795027705333",
  },
  {
    slug: "bike-physics-ik",
    kind: "Core System",
    title: "Custom Bike Physics & R15 Rider Fitting",
    summary: "Solves rider leg reach for frame scaling and drives rigid-body bikes with LinearVelocity.",
    problem:
      "Physics wheel hinges on lightweight Roblox hubs glitch out when riders mount, and fixed bike sizes leave tall or short R15 avatars floating off pedals.",
    result:
      "Smooth, reliable cycling physics that never explodes on mount, scales to the rider's avatar proportions, and animates wheels, cranks, and limbs on every client.",
    nodes: ["BikeCatalog", "BikeBuilder", "LinearVelocity", "WheelSpin", "RiderPose"],
    steps: [
      "BikeBuilder measures R15 hip, knee, and ankle Motor6Ds to compute leg reach and solve the optimal frame scale (0.7x–1.15x)",
      "The bike uses one rigid body steered via LinearVelocity and AlignOrientation rather than fragile hinge wheels",
      "Wheels and cranks attach to the saddle via Motor6D and spin locally on every client from actual bike speed",
      "RiderPose.client.lua maps the rider's hands and feet onto BarL/R and PedalL/R throughout the pedal stroke",
    ],
    playUrl:
      "https://www.roblox.com/share?code=22f4375e4715654e8035b1a5bb8fbd3e&type=ExperienceDetails&stamp=1795027705333",
  },
  {
    slug: "server-datastore-economy",
    kind: "Core System",
    title: "Server-Authoritative Economy & DataStore",
    summary: "Manages 6 loadout slots, hydration/stamina survival, shops, and wipe-safe DataStore saves.",
    problem:
      "Trusting client purchases or saving defaults after a transient DataStore failure leads to item exploits and wiped player inventories.",
    result:
      "Server-validated progression with per-player rate limits, stat caps (+40% max so free players stay competitive), and loadedOk save guards.",
    nodes: ["RemoteEvent", "Main.server", "PlayerData", "Loadout", "DataStore"],
    steps: [
      "PlayerData.load wraps GetAsync in pcall and records a loadedOk flag so failed loads never overwrite real saves on exit",
      "Main.server validates shop buys, vending machine drinks, bike/rim paint changes, and rest-stop coin rewards server-side",
      "Loadout syncs equipped bikes, helmets, jerseys, shoes, gloves, trails, and hotbar DrinkTools attributes cleanly",
      "MarketplaceService hooks support GamePasses (DoubleCoins, premium gear) and Developer Product coin packs",
    ],
    playUrl:
      "https://www.roblox.com/share?code=22f4375e4715654e8035b1a5bb8fbd3e&type=ExperienceDetails&stamp=1795027705333",
  },
  {
    slug: "live-map-garage-ui",
    kind: "Core System",
    title: "Minimap, Elevation Profile & Garage UI",
    summary: "Rotating HUD minimap, interactive full-route climb chart, garage customization, and camp guide.",
    problem:
      "With StreamingEnabled active, clients cannot inspect distant terrain directly to draw a whole-island map or track elevation progress.",
    result:
      "Server publishes a compact RouteMap once at startup, powering a live minimap, full climb profile, and clean garage & onboarding interfaces.",
    nodes: ["RouteMap", "RouteData", "Minimap", "FullMap", "Garage UI"],
    steps: [
      "World/RouteMap publishes road points, fork lanes, rest stops, tunnels, and sea grid data once world build finishes",
      "Minimap.lua renders a rotating corner map oriented to the camera while riding",
      "FullMap.lua + Profile.lua draw the full 13.4 km route, live player markers, scene list, and climb elevation profile (M key or tap)",
      "Garage.client.lua and CampGuide.client.lua provide equipment stat previews, frame/rim painting, and step-by-step camp guidance",
    ],
    playUrl:
      "https://www.roblox.com/share?code=22f4375e4715654e8035b1a5bb8fbd3e&type=ExperienceDetails&stamp=1795027705333",
  },
  {
    slug: "adaptive-audio-streaming",
    kind: "Core System",
    title: "Dynamic Biome Audio & Streaming Sync",
    summary: "3s-crossfading scene ambience, surface-aware tyre audio, and StreamingEnabled-safe replication.",
    problem:
      "Long routes feel flat with static loops, and StreamingEnabled breaks client scripts that assume distant world geometry or birds stay loaded.",
    result:
      "Seamless audio transitions across 12 scenes and altitudes plus server-driven flock/route replication and PersistentPerPlayer bikes.",
    nodes: ["Streaming", "Flocks", "SceneMixes", "Ambience", "BikeSounds"],
    steps: [
      "StreamingTargetRadius = 6144 with PauseOutsideLoadedArea and PersistentPerPlayer keeps rider bikes safely loaded",
      "Ambience.client.lua crossfades nature loops over 3 seconds using SceneMixes, sea proximity, altitude wind, and tunnel echo",
      "BikeSounds.client.lua switches tyre audio by road surface (asphalt, gravel, stone) alongside speed wind, brakes, bell, and drink pops",
      "World/Flocks publishes bird positions from the server so flying wildlife behaves consistently under streaming",
    ],
    playUrl:
      "https://www.roblox.com/share?code=22f4375e4715654e8035b1a5bb8fbd3e&type=ExperienceDetails&stamp=1795027705333",
  },
];
