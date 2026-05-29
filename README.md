# Logan Luque — Portfolio

A polished, playful "developer's terminal" single-page portfolio. GitHub-dark by
default with a light "paper terminal" theme, JetBrains Mono throughout, typed hero,
`$ command` section headers, and a functional ⌘K command palette.

**Stack:** Next.js 16 (static export), React 19, TypeScript (strict), Tailwind CSS v4,
`next-themes`, JetBrains Mono, Heroicons, `simple-icons`.

## Develop

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # type-checked production build → static export in out/
```

Package manager is **pnpm** (Node 22). There is no test runner — verification is
`pnpm build` (TypeScript checking is on) plus manual checks in `pnpm dev`.

## Where content lives

All personal facts are centralized in typed modules under `content/` — edit these and
every section updates automatically. Do **not** hard-code facts into components.

- `content/profile.ts` — name, role, tagline, about prose, fun facts, socials, avatar/resume paths
- `content/projects.ts` — project cards
- `content/experience.ts` — work timeline
- `content/skills.ts` — skill categories

---

## ✅ Manual TODOs (fill these in)

The redesign left intentional placeholders so no personal facts were invented. Search
the repo for `TODO(logan)` to find them. Each item below is real and needs your input.

### `content/profile.ts`

- [ ] **Tagline** (line ~17) — replace `"I build fullstack things at Twilio — TODO…"` with your real one-line hero tagline, in your voice.
- [ ] **About prose** (lines ~20–22) — replace the three `TODO` paragraphs with your real about text (2–3 short paragraphs).
- [ ] **Fun fact "off the clock"** (line ~31) — replace `'TODO: a hobby'` with a real hobby. (The other two fun facts are reasonable defaults — tweak if you like.)
- [ ] **Email** (line ~37) — replace `mailto:TODO@example.com` with your real contact email.
- [ ] **GitHub URL** (line ~34) — verify `https://github.com/LLuque-twilio` is the correct handle/casing.
- [x] **LinkedIn URL** — set to `https://www.linkedin.com/in/logan-luque`.

### `content/projects.ts`

- [ ] **Both projects are placeholders** ("TODO: Project One/Two" with `github: '#'`, `demo: '#'`). Replace with your real projects — title, description, technologies, and real `github`/`demo` URLs. Drop the `demo` field on any project without a live demo (it renders conditionally).

### Assets to add to `public/` (currently empty)

- [ ] **`public/avatar.jpg`** — your portrait, shown in the About section. Until it exists you'll see a broken-image icon. If you use a different name/extension, update `avatar:` in `content/profile.ts`.
- [ ] **`public/resume.pdf`** — your resume; the hero "Download resume" button links here. If named differently, update `resumePath:` in `content/profile.ts`.

### Worth a review (auto-carried content, not placeholders)

- [ ] **`content/experience.ts`** — the Twilio timeline carried over from the old site. Titles/dates look real, but the **descriptions** contain generic boilerplate (e.g. "improving performance by 40%", repeated text across two entries). Reword for accuracy.

### Optional product decision

- [ ] **Theme default** — the site uses `enableSystem` with `defaultTheme='dark'` (`app/layout.tsx`), so a first-time visitor on a light-mode OS sees the light "paper" theme. If you'd prefer **always-dark until the user toggles**, set `enableSystem={false}`.
