# Roblox Game Dev Skills: Rhenel Jhon Sajol

**Roblox Luau Scripter · Systems Developer (Rojo / Git)**  
Cagayan de Oro, Philippines · [GitHub](https://github.com/Tetsuuya) · [LinkedIn](https://www.linkedin.com/in/rhenel-jhon-sajol-360275324/)

I script complete Roblox experiences and modular game systems using Luau and Rojo (`src/server`, `src/client`, `src/shared`, `src/first`), with server-authoritative validation, DataStore safety guards, and `StreamingEnabled`-ready replication.

---

## Featured Experience

- **[Ride to the Peak](https://www.roblox.com/share?code=22f4375e4715654e8035b1a5bb8fbd3e&type=ExperienceDetails&stamp=1795027705333)** — 13.4 km road cycling game across 12 biome scenes (67 Luau scripts in Rojo).

---

## Core Roblox Systems

### Server Architecture & Persistence
- Clean Rojo layout (`ServerScriptService`, `StarterPlayerScripts`, `ReplicatedStorage`, `ReplicatedFirst`)
- Server-authoritative `RemoteEvent` actions with per-player rate limiting and state validation
- `DataStoreService` persistence wrapped in `pcall` with `loadedOk` guards so failed loads never overwrite real saves
- `MarketplaceService` integration scaffolding for GamePasses and Developer Products
- `CollectionService` tagging for interactive world stations (garages, vending machines, camp guides)

### Procedural Worlds, Physics & Movement
- Seeded procedural world generation (1,200 road pieces / 48,000 studs across 12 themed zones up to 1,800 studs elevation)
- Catmull-Rom spline road curves (`Curves.lua`) and `HeightCanvas` Terrain sculpting with cliff-safe prop placement (`Settle.lua`)
- Custom rigid-body vehicle physics (`LinearVelocity` + `AlignOrientation`) paired with client-side `Motor6D` wheel/crank spinning and R15 leg-reach frame fitting (`BikeBuilder.lua`, `RiderPose.client.lua`)

### Streaming, UI & Dynamic Audio
- `StreamingEnabled` (`StreamingTargetRadius = 6144`, `PersistentPerPlayer` vehicles) with server-published `RouteMap` and `Flocks`
- Rotating HUD minimap, interactive full-route map, elevation climb chart, equipment garage, and camp onboarding UI
- Surface-aware vehicle audio and 3-second crossfading biome ambience (`Ambience.client.lua`, `BikeSounds.client.lua`)
