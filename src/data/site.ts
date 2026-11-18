export const profile = {
  name: "Rhenel Jhon Sajol",
  email: "rheneljhon@gmail.com",
  photo: "/profile.jpeg",
  // Paste a Calendly (or Discord handle note / booking link) here to show a "Book a call" button
  booking: "",
};

export const featuredGame = {
  title: "Ride to the Peak",
  tagline: "13.4 km · 12 scenes · 67 Luau scripts · Rojo + StreamingEnabled",
  summary:
    "A long-distance Roblox road cycling game built end-to-end with Rojo: procedural mountain & coastal terrain, custom rigid-body bike physics, hydration & stamina survival, live climb minimap, dynamic biome audio, and DataStore persistence.",
  cover: "/games/ride-to-the-peak.png",
  playUrl:
    "https://www.roblox.com/share?code=22f4375e4715654e8035b1a5bb8fbd3e&type=ExperienceDetails&stamp=1795027705333",
  slug: "ride-to-the-peak",
};

export const socials = [
  { label: "GitHub", href: "https://github.com/Tetsuuya", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rhenel-jhon-sajol-360275324/", icon: "linkedin" },
  { label: "Instagram", href: "https://www.instagram.com/rhnl.s/", icon: "instagram" },
  // Optional: add your Roblox user profile URL when ready
  // { label: "Roblox", href: "https://www.roblox.com/users/YOUR_ID/profile", icon: "roblox" },
] as const;

// icon: file in /public/tools (omit to show a letter badge)
export const toolGroups = [
  {
    label: "roblox / engine",
    tools: [
      { name: "Luau", icon: "luau" },
      { name: "Roblox Studio", icon: "roblox" },
      { name: "DataStoreService", icon: "datastore" },
      { name: "StreamingEnabled", icon: "streaming" },
      { name: "Physics & IK", icon: "physics" },
      { name: "UI & Audio", icon: "audio" },
    ],
  },
  {
    label: "workflow & ai",
    tools: [
      { name: "Rojo", icon: "rojo" },
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "VS Code", icon: "vscode" },
      { name: "Claude", icon: "claude" },
      { name: "Antigravity", icon: "antigravity" },
    ],
  },
  {
    label: "cross-stack",
    tools: [
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "javascript" },
      { name: "Python", icon: "python" },
      { name: "ScreenGui / HUD", icon: "ui" },
    ],
  },
];

export const services = [
  {
    node: "Server",
    title: "Gameplay & DataStores",
    body: "Server-authoritative game loops, RemoteEvent validation, shops, and safe persistence.",
  },
  {
    node: "World",
    title: "Physics & Worlds",
    body: "Custom vehicle rigs, procedural Terrain & spline roads, and StreamingEnabled sync.",
  },
  {
    node: "Client",
    title: "UI, Maps & Audio",
    body: "Responsive HUDs, route minimaps, garage previews, and dynamic scene audio.",
  },
];
