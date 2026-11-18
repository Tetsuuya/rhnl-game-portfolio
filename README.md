# Rhenel's Roblox Game Dev Portfolio

Next.js + Tailwind CSS portfolio tailored for Roblox Luau scripting, Rojo architecture, and game systems. Run `npm run dev` and open `http://localhost:3000`.

## Editing content

- **Your info, featured game link, services, tools, socials:** `src/data/site.ts`
- **Games and system breakdowns:** `src/data/work.ts`

## Adding gameplay screenshots or clips

1. Put a screenshot (`.png` / `.jpg`) or gameplay recording (`.mp4`) in `public/games/`.
2. Add or update an entry in `work` in `src/data/work.ts` and set `media`:
   - `{ type: "image", src: "/games/my-game.png" }`
   - `{ type: "video", src: "/games/my-clip.mp4", poster: "/games/my-clip.jpg" }`
   - `{ type: "youtube", id: "VIDEO_ID" }`

If `media` is omitted, the card renders a clean system architecture diagram from `nodes`.
