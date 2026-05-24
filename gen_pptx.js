const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "Telangana Tourism Blog";

// Brand colors
const MAROON  = "2A1520";
const GOLD    = "D4A84B";
const CREAM   = "FAF3E0";
const WHITE   = "FFFFFF";
const LIGHT   = "F5EFE0";
const DARKGRAY= "3D2B1F";
const MUTED   = "8B6F5C";

// ─── Slide 1: Title ───────────────────────────────────────────────────────────
{
  const sl = pres.addSlide();
  sl.background = { color: MAROON };

  // Gold accent bar left
  sl.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.18, h: 5.625, fill: { color: GOLD }, line: { color: GOLD } });

  // Decorative circle top right
  sl.addShape(pres.shapes.OVAL, { x: 7.8, y: -1.2, w: 3.5, h: 3.5, fill: { color: GOLD, transparency: 88 }, line: { color: GOLD, transparency: 70 } });
  sl.addShape(pres.shapes.OVAL, { x: 8.4, y: -0.5, w: 2.2, h: 2.2, fill: { color: GOLD, transparency: 78 }, line: { color: GOLD, transparency: 60 } });

  // Category badge
  sl.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 1.0, w: 2.6, h: 0.38, fill: { color: GOLD }, line: { color: GOLD }, rectRadius: 0.05 });
  sl.addText("BTECH PROJECT PRESENTATION", { x: 0.5, y: 1.0, w: 2.6, h: 0.38, fontSize: 7, bold: true, color: MAROON, align: "center", valign: "middle", margin: 0 });

  // Main title
  sl.addText("TELANGANA\nTOURISM BLOG", { x: 0.5, y: 1.6, w: 8.5, h: 2.0, fontSize: 52, bold: true, color: WHITE, fontFace: "Georgia", align: "left", valign: "top" });

  // Gold underline accent
  sl.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 3.5, w: 4.2, h: 0.05, fill: { color: GOLD }, line: { color: GOLD } });

  // Subtitle
  sl.addText("A Full-Stack Web Application for Tourism Content Management", { x: 0.5, y: 3.7, w: 7.0, h: 0.5, fontSize: 14, color: GOLD, fontFace: "Calibri", align: "left", italic: true });

  // Tech stack pills
  const techs = ["Node.js", "Express.js", "MongoDB", "JWT", "Bootstrap 5", "Cloudinary"];
  techs.forEach((t, i) => {
    const col = i % 3; const row = Math.floor(i / 3);
    const px = 0.5 + col * 1.8; const py = 4.4 + row * 0.55;
    sl.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: px, y: py, w: 1.55, h: 0.38, fill: { color: DARKGRAY }, line: { color: GOLD, width: 0.8 }, rectRadius: 0.05 });
    sl.addText(t, { x: px, y: py, w: 1.55, h: 0.38, fontSize: 9, color: GOLD, align: "center", valign: "middle", bold: true, margin: 0 });
  });

  // Department info right side
  sl.addText([
    { text: "Department of Computer Science & Engineering", options: { breakLine: true } },
    { text: "B.Tech — 2025–2026", options: { breakLine: true } },
    { text: "May 2026" }
  ], { x: 6.2, y: 4.2, w: 3.6, h: 1.2, fontSize: 10, color: MUTED, align: "right", fontFace: "Calibri" });
}

// ─── Slide 2: Problem Statement ───────────────────────────────────────────────
{
  const sl = pres.addSlide();
  sl.background = { color: CREAM };

  // Top bar
  sl.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.65, fill: { color: MAROON }, line: { color: MAROON } });
  sl.addText("PROBLEM STATEMENT", { x: 0.4, y: 0, w: 9, h: 0.65, fontSize: 13, bold: true, color: GOLD, fontFace: "Georgia", valign: "middle", charSpacing: 3 });

  // Section heading
  sl.addText("Why does Telangana need a dedicated tourism platform?", { x: 0.4, y: 0.85, w: 9.2, h: 0.6, fontSize: 18, bold: true, color: MAROON, fontFace: "Georgia" });

  // Problem cards
  const problems = [
    { icon: "💰", title: "Commercial Bias", desc: "Travel aggregators prioritize paid listings & generic destinations over local heritage narratives" },
    { icon: "🔍", title: "Poor Discoverability", desc: "Social media posts lack structured categorization, searchability, and long-term archival value" },
    { icon: "🚫", title: "No Community Voice", desc: "Government portals are authoritative but static — no user participation or comment features" },
    { icon: "⚙️", title: "No Lightweight CMS", desc: "Content creators lack a self-hosted blogging system with authentication and moderation controls" },
  ];

  problems.forEach((p, i) => {
    const col = i % 2; const row = Math.floor(i / 2);
    const cx = 0.35 + col * 4.85; const cy = 1.65 + row * 1.55;
    sl.addShape(pres.shapes.RECTANGLE, { x: cx, y: cy, w: 4.55, h: 1.35, fill: { color: WHITE }, line: { color: "E8DDD0", width: 1 }, shadow: { type: "outer", blur: 8, offset: 2, angle: 135, color: "000000", opacity: 0.08 } });
    sl.addShape(pres.shapes.RECTANGLE, { x: cx, y: cy, w: 0.1, h: 1.35, fill: { color: GOLD }, line: { color: GOLD } });
    sl.addText(p.icon + "  " + p.title, { x: cx + 0.2, y: cy + 0.1, w: 4.2, h: 0.42, fontSize: 13, bold: true, color: MAROON, fontFace: "Georgia", margin: 0 });
    sl.addText(p.desc, { x: cx + 0.2, y: cy + 0.52, w: 4.2, h: 0.72, fontSize: 10.5, color: DARKGRAY, fontFace: "Calibri", margin: 0 });
  });

  // Bottom callout
  sl.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 4.9, w: 9.3, h: 0.48, fill: { color: MAROON }, line: { color: MAROON } });
  sl.addText("Solution: A secure, categorized, full-stack blogging platform tailored to Telangana tourism themes", { x: 0.35, y: 4.9, w: 9.3, h: 0.48, fontSize: 11, color: GOLD, align: "center", valign: "middle", bold: true, margin: 0 });
}

// ─── Slide 3: Proposed System ──────────────────────────────────────────────────
{
  const sl = pres.addSlide();
  sl.background = { color: MAROON };

  sl.addText("PROPOSED SYSTEM", { x: 0.5, y: 0.3, w: 9, h: 0.55, fontSize: 13, bold: true, color: GOLD, fontFace: "Georgia", charSpacing: 3 });
  sl.addText("Telangana Tourism Blog — Core Capabilities", { x: 0.5, y: 0.85, w: 9, h: 0.55, fontSize: 22, bold: true, color: WHITE, fontFace: "Georgia" });

  // Three actors
  const actors = [
    { role: "🧳 Visitor", perms: ["Browse home page", "View all blogs", "Filter by category", "Read comments"] },
    { role: "✍️ Registered User", perms: ["All visitor rights", "Create & publish blogs", "Upload images", "Post comments"] },
    { role: "🛡️ Administrator", perms: ["All user rights", "Admin dashboard", "Delete any blog/comment", "View all users"] },
  ];

  actors.forEach((a, i) => {
    const cx = 0.35 + i * 3.2;
    sl.addShape(pres.shapes.RECTANGLE, { x: cx, y: 1.6, w: 3.0, h: 3.6, fill: { color: "3D2530" }, line: { color: GOLD, width: 0.8 } });
    sl.addShape(pres.shapes.RECTANGLE, { x: cx, y: 1.6, w: 3.0, h: 0.62, fill: { color: GOLD }, line: { color: GOLD } });
    sl.addText(a.role, { x: cx, y: 1.6, w: 3.0, h: 0.62, fontSize: 13, bold: true, color: MAROON, align: "center", valign: "middle", margin: 0 });
    a.perms.forEach((perm, j) => {
      sl.addText("▶  " + perm, { x: cx + 0.15, y: 2.32 + j * 0.68, w: 2.7, h: 0.6, fontSize: 10.5, color: WHITE, fontFace: "Calibri", margin: 0 });
    });
  });

  // Five categories
  sl.addText("Tourism Categories:", { x: 0.5, y: 5.15, w: 2.2, h: 0.35, fontSize: 11, bold: true, color: GOLD, margin: 0 });
  const cats = ["🏛 Historical", "🕌 Temples", "💧 Waterfalls", "🎉 Culture & Festivals", "🍛 Food Places"];
  cats.forEach((c, i) => {
    sl.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 2.85 + i * 1.43, y: 5.13, w: 1.32, h: 0.35, fill: { color: "5C3040" }, line: { color: GOLD, width: 0.7 }, rectRadius: 0.05 });
    sl.addText(c, { x: 2.85 + i * 1.43, y: 5.13, w: 1.32, h: 0.35, fontSize: 8, color: GOLD, align: "center", valign: "middle", margin: 0, bold: true });
  });
}

// ─── Slide 4: Tech Stack ───────────────────────────────────────────────────────
{
  const sl = pres.addSlide();
  sl.background = { color: CREAM };

  sl.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.65, fill: { color: MAROON }, line: { color: MAROON } });
  sl.addText("TECHNOLOGY STACK", { x: 0.4, y: 0, w: 9, h: 0.65, fontSize: 13, bold: true, color: GOLD, valign: "middle", charSpacing: 3 });

  const techs = [
    { layer: "Backend", items: [
      { name: "Node.js v18", desc: "JavaScript runtime — non-blocking I/O" },
      { name: "Express.js", desc: "REST API routing & middleware pipeline" },
      { name: "Mongoose ODM", desc: "Schema validation & MongoDB interaction" },
    ]},
    { layer: "Frontend", items: [
      { name: "HTML/CSS/JS", desc: "Vanilla JS with fetch API for API calls" },
      { name: "Bootstrap 5", desc: "Responsive grid, modals & mobile nav" },
      { name: "Custom CSS", desc: "Maroon & gold Telangana brand theme" },
    ]},
    { layer: "Security & Storage", items: [
      { name: "JWT + bcryptjs", desc: "Stateless auth; 7-day token, 10 rounds hash" },
      { name: "Cloudinary CDN", desc: "Cloud image hosting via multer + base64" },
      { name: "MongoDB Atlas", desc: "Document store — users, blogs, comments" },
    ]},
  ];

  techs.forEach((group, gi) => {
    const cx = 0.35 + gi * 3.22;
    sl.addShape(pres.shapes.RECTANGLE, { x: cx, y: 0.75, w: 3.0, h: 0.4, fill: { color: MAROON }, line: { color: MAROON } });
    sl.addText(group.layer.toUpperCase(), { x: cx, y: 0.75, w: 3.0, h: 0.4, fontSize: 10, bold: true, color: GOLD, align: "center", valign: "middle", charSpacing: 2, margin: 0 });

    group.items.forEach((item, ii) => {
      const iy = 1.28 + ii * 1.38;
      sl.addShape(pres.shapes.RECTANGLE, { x: cx, y: iy, w: 3.0, h: 1.2, fill: { color: WHITE }, line: { color: "E0D5C8", width: 1 }, shadow: { type: "outer", blur: 6, offset: 2, angle: 135, color: "000000", opacity: 0.08 } });
      sl.addShape(pres.shapes.RECTANGLE, { x: cx, y: iy, w: 3.0, h: 0.06, fill: { color: GOLD }, line: { color: GOLD } });
      sl.addText(item.name, { x: cx + 0.15, y: iy + 0.12, w: 2.7, h: 0.38, fontSize: 13, bold: true, color: MAROON, fontFace: "Georgia", margin: 0 });
      sl.addText(item.desc, { x: cx + 0.15, y: iy + 0.52, w: 2.7, h: 0.58, fontSize: 10, color: DARKGRAY, fontFace: "Calibri", margin: 0 });
    });
  });
}

// ─── Slide 5: System Architecture ─────────────────────────────────────────────
{
  const sl = pres.addSlide();
  sl.background = { color: MAROON };

  sl.addText("SYSTEM ARCHITECTURE", { x: 0.5, y: 0.25, w: 9, h: 0.5, fontSize: 13, bold: true, color: GOLD, charSpacing: 3 });
  sl.addText("Three-Tier MVC Architecture with RESTful Communication", { x: 0.5, y: 0.8, w: 9, h: 0.45, fontSize: 18, bold: true, color: WHITE, fontFace: "Georgia" });

  // Tier boxes
  const tiers = [
    { label: "CLIENT TIER", sub: "Browser", items: ["Vanilla JS / Fetch API", "HTML / CSS / Bootstrap 5", "Auth state via localStorage"] },
    { label: "APPLICATION TIER", sub: "Node.js + Express", items: ["JWT Auth Middleware", "REST API Controllers", "Multer → Cloudinary Pipeline", "Mongoose ODM"] },
    { label: "DATA TIER", sub: "Persistence", items: ["MongoDB Collections", "users / blogs / comments", "ObjectId populate() joins", "Cloudinary CDN assets"] },
  ];

  tiers.forEach((t, i) => {
    const cx = 0.3 + i * 3.25;
    sl.addShape(pres.shapes.RECTANGLE, { x: cx, y: 1.45, w: 3.05, h: 3.75, fill: { color: "3D2530" }, line: { color: GOLD, width: 0.8 } });
    sl.addShape(pres.shapes.RECTANGLE, { x: cx, y: 1.45, w: 3.05, h: 0.55, fill: { color: GOLD }, line: { color: GOLD } });
    sl.addText(t.label, { x: cx, y: 1.45, w: 3.05, h: 0.55, fontSize: 10, bold: true, color: MAROON, align: "center", valign: "middle", charSpacing: 1, margin: 0 });
    sl.addText(t.sub, { x: cx + 0.1, y: 2.1, w: 2.85, h: 0.38, fontSize: 12, bold: true, color: GOLD, align: "center", margin: 0 });
    t.items.forEach((item, j) => {
      sl.addShape(pres.shapes.RECTANGLE, { x: cx + 0.12, y: 2.58 + j * 0.65, w: 2.8, h: 0.52, fill: { color: "502535" }, line: { color: "6B3545", width: 0.5 } });
      sl.addText(item, { x: cx + 0.22, y: 2.58 + j * 0.65, w: 2.6, h: 0.52, fontSize: 9.5, color: WHITE, valign: "middle", margin: 0 });
    });
    // Arrow between tiers
    if (i < 2) {
      sl.addShape(pres.shapes.RECTANGLE, { x: cx + 3.07, y: 3.22, w: 0.18, h: 0.08, fill: { color: GOLD }, line: { color: GOLD } });
      sl.addText("⇄", { x: cx + 3.07, y: 3.0, w: 0.2, h: 0.5, fontSize: 18, color: GOLD, align: "center", valign: "middle", margin: 0 });
    }
  });

  // HTTP label
  sl.addText("HTTP Request / Response  |  JWT Bearer Tokens  |  JSON Payloads", { x: 0.5, y: 5.28, w: 9, h: 0.3, fontSize: 9.5, color: MUTED, align: "center", italic: true });
}

// ─── Slide 6: Key Features ─────────────────────────────────────────────────────
{
  const sl = pres.addSlide();
  sl.background = { color: CREAM };

  sl.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.65, fill: { color: MAROON }, line: { color: MAROON } });
  sl.addText("KEY FEATURES", { x: 0.4, y: 0, w: 9, h: 0.65, fontSize: 13, bold: true, color: GOLD, valign: "middle", charSpacing: 3 });

  const features = [
    { icon: "🔐", title: "JWT Authentication", desc: "bcrypt-hashed passwords, 7-day tokens, Google OAuth integration, protected routes via middleware" },
    { icon: "📝", title: "Blog CRUD", desc: "Title, description, category & image upload. Only owners/admins can edit or delete content." },
    { icon: "💬", title: "Comment System", desc: "Authenticated users post comments on blog posts, populated with author name via Mongoose" },
    { icon: "🛡️", title: "Admin Dashboard", desc: "Manage all blogs, comments & users. Role-based adminOnly middleware enforces 403 for others." },
    { icon: "☁️", title: "Cloudinary Upload", desc: "Multer memoryStorage + 5 MB limit + MIME filter → base64 upload → secure CDN URL stored in DB" },
    { icon: "📱", title: "Responsive UI", desc: "Bootstrap 5 grid, collapsible mobile nav, category filter pills, blog detail modal overlay" },
  ];

  features.forEach((f, i) => {
    const col = i % 3; const row = Math.floor(i / 3);
    const cx = 0.32 + col * 3.24; const cy = 0.88 + row * 2.12;
    sl.addShape(pres.shapes.RECTANGLE, { x: cx, y: cy, w: 3.08, h: 1.92, fill: { color: WHITE }, line: { color: "DDD0C0", width: 1 }, shadow: { type: "outer", blur: 8, offset: 2, angle: 135, color: "000000", opacity: 0.08 } });
    sl.addShape(pres.shapes.RECTANGLE, { x: cx, y: cy, w: 0.12, h: 1.92, fill: { color: GOLD }, line: { color: GOLD } });
    sl.addText(f.icon + "  " + f.title, { x: cx + 0.22, y: cy + 0.12, w: 2.7, h: 0.48, fontSize: 12.5, bold: true, color: MAROON, fontFace: "Georgia", margin: 0 });
    sl.addText(f.desc, { x: cx + 0.22, y: cy + 0.62, w: 2.7, h: 1.18, fontSize: 9.5, color: DARKGRAY, fontFace: "Calibri", margin: 0 });
  });
}

// ─── Slide 7: Database Schema ──────────────────────────────────────────────────
{
  const sl = pres.addSlide();
  sl.background = { color: MAROON };

  sl.addText("DATABASE SCHEMA", { x: 0.5, y: 0.25, w: 9, h: 0.5, fontSize: 13, bold: true, color: GOLD, charSpacing: 3 });
  sl.addText("Three MongoDB Collections with Mongoose ODM", { x: 0.5, y: 0.78, w: 9, h: 0.45, fontSize: 18, bold: true, color: WHITE, fontFace: "Georgia" });

  const schemas = [
    { name: "users", fields: ["name: String (required)", "email: String (unique)", "password: String (hashed)", "role: enum [user, admin]", "googleId: String (optional)", "createdAt / updatedAt"] },
    { name: "blogs", fields: ["title: String (required)", "description: String (required)", "category: enum (5 types)", "image: String (Cloudinary URL)", "author: ObjectId → User", "createdAt: Date"] },
    { name: "comments", fields: ["text: String (required)", "author: ObjectId → User", "blog: ObjectId → Blog", "createdAt: Date"] },
  ];

  schemas.forEach((s, i) => {
    const cx = 0.3 + i * 3.25;
    sl.addShape(pres.shapes.RECTANGLE, { x: cx, y: 1.45, w: 3.05, h: 4.0, fill: { color: "3D2530" }, line: { color: GOLD, width: 0.8 } });
    sl.addShape(pres.shapes.RECTANGLE, { x: cx, y: 1.45, w: 3.05, h: 0.52, fill: { color: GOLD }, line: { color: GOLD } });
    sl.addText(s.name.toUpperCase(), { x: cx, y: 1.45, w: 3.05, h: 0.52, fontSize: 12, bold: true, color: MAROON, align: "center", valign: "middle", fontFace: "Consolas", margin: 0 });
    s.fields.forEach((f, j) => {
      sl.addShape(pres.shapes.RECTANGLE, { x: cx + 0.08, y: 2.06 + j * 0.55, w: 2.88, h: 0.48, fill: { color: j % 2 === 0 ? "4A2D38" : "502535" }, line: { color: "5C3040", width: 0.3 } });
      sl.addText(f, { x: cx + 0.18, y: 2.06 + j * 0.55, w: 2.7, h: 0.48, fontSize: 9, color: WHITE, fontFace: "Consolas", valign: "middle", margin: 0 });
    });
  });

  // Relationship note
  sl.addText("blogs.author → users  |  comments.author → users  |  comments.blog → blogs   [ Mongoose .populate() ]", { x: 0.4, y: 5.28, w: 9.2, h: 0.28, fontSize: 9, color: GOLD, align: "center", italic: true, margin: 0 });
}

// ─── Slide 8: Testing Results ──────────────────────────────────────────────────
{
  const sl = pres.addSlide();
  sl.background = { color: CREAM };

  sl.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.65, fill: { color: MAROON }, line: { color: MAROON } });
  sl.addText("TESTING & RESULTS", { x: 0.4, y: 0, w: 9, h: 0.65, fontSize: 13, bold: true, color: GOLD, valign: "middle", charSpacing: 3 });

  // Big stat
  sl.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.78, w: 2.5, h: 2.1, fill: { color: MAROON }, line: { color: MAROON } });
  sl.addText("20", { x: 0.35, y: 0.88, w: 2.5, h: 1.1, fontSize: 64, bold: true, color: GOLD, align: "center", fontFace: "Georgia", margin: 0 });
  sl.addText("TEST CASES\n✅ ALL PASSED", { x: 0.35, y: 2.0, w: 2.5, h: 0.78, fontSize: 11, bold: true, color: WHITE, align: "center", margin: 0 });

  // Test results table header
  sl.addShape(pres.shapes.RECTANGLE, { x: 3.0, y: 0.78, w: 6.65, h: 0.4, fill: { color: MAROON }, line: { color: MAROON } });
  sl.addText([
    { text: "Test Case", options: { bold: true } },
    { text: "       " },
    { text: "Area", options: { bold: true } },
    { text: "       " },
    { text: "Status", options: { bold: true } },
  ], { x: 3.0, y: 0.78, w: 6.65, h: 0.4, fontSize: 9.5, color: GOLD, fontFace: "Calibri", valign: "middle", margin: [0, 0, 0, 8] });

  const results = [
    ["TC-01/02", "User Registration & Login", "✅ Pass"],
    ["TC-03", "Invalid Login (wrong password)", "✅ Pass"],
    ["TC-04/05", "Create Blog & Category Filter", "✅ Pass"],
    ["TC-06", "Add Comment on Blog Post", "✅ Pass"],
    ["TC-07", "Unauthorized Access Redirect", "✅ Pass"],
    ["TC-08", "Admin Delete Blog", "✅ Pass"],
    ["TC-09/13", "Image Upload Size & Type Limits", "✅ Pass"],
    ["TC-14/18", "Role Auth, Logout, Expired Token", "✅ Pass"],
    ["TC-19/20", "Responsive Nav & Modal Comments", "✅ Pass"],
  ];

  results.forEach((row, i) => {
    const bg = i % 2 === 0 ? WHITE : "F2EBE0";
    sl.addShape(pres.shapes.RECTANGLE, { x: 3.0, y: 1.25 + i * 0.42, w: 6.65, h: 0.4, fill: { color: bg }, line: { color: "DDD0C0", width: 0.5 } });
    sl.addText(row[0], { x: 3.1, y: 1.25 + i * 0.42, w: 1.1, h: 0.4, fontSize: 9, color: MAROON, bold: true, valign: "middle", fontFace: "Consolas", margin: 0 });
    sl.addText(row[1], { x: 4.25, y: 1.25 + i * 0.42, w: 3.8, h: 0.4, fontSize: 9.5, color: DARKGRAY, valign: "middle", margin: 0 });
    sl.addText(row[2], { x: 8.1, y: 1.25 + i * 0.42, w: 1.4, h: 0.4, fontSize: 10, color: "2A7D2A", bold: true, valign: "middle", margin: 0 });
  });

  // Performance note
  sl.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 3.0, w: 2.5, h: 2.1, fill: { color: "F0E8D5" }, line: { color: "C9B89A", width: 1 } });
  sl.addText("⚡ Performance", { x: 0.35, y: 3.08, w: 2.5, h: 0.4, fontSize: 11, bold: true, color: MAROON, align: "center", margin: 0 });
  sl.addText("Home page\n< 2 sec load", { x: 0.35, y: 3.5, w: 2.5, h: 0.6, fontSize: 10, color: DARKGRAY, align: "center", margin: 0 });
  sl.addText("API response\n200–500 ms", { x: 0.35, y: 4.1, w: 2.5, h: 0.6, fontSize: 10, color: DARKGRAY, align: "center", margin: 0 });
  sl.addText("(50 blogs dataset)", { x: 0.35, y: 4.72, w: 2.5, h: 0.3, fontSize: 8, color: MUTED, align: "center", margin: 0, italic: true });
}

// ─── Slide 9: Future Scope ─────────────────────────────────────────────────────
{
  const sl = pres.addSlide();
  sl.background = { color: MAROON };

  sl.addText("CONCLUSION & FUTURE SCOPE", { x: 0.5, y: 0.25, w: 9, h: 0.5, fontSize: 13, bold: true, color: GOLD, charSpacing: 3 });

  // Conclusion
  sl.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.9, w: 4.7, h: 2.65, fill: { color: "3D2530" }, line: { color: GOLD, width: 0.8 } });
  sl.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.9, w: 4.7, h: 0.48, fill: { color: GOLD }, line: { color: GOLD } });
  sl.addText("✅  CONCLUSION", { x: 0.35, y: 0.9, w: 4.7, h: 0.48, fontSize: 12, bold: true, color: MAROON, align: "center", valign: "middle", margin: 0 });
  const conclusions = [
    "Full-stack app with Node.js, Express, MongoDB, JWT, Bootstrap",
    "Role-based access: visitor / user / admin with moderation",
    "5 tourism categories aligned to Telangana heritage",
    "20/20 test cases passed — stable & secure at academic scale",
    "Cloud-hosted images via Cloudinary CDN for performance",
  ];
  conclusions.forEach((c, i) => {
    sl.addText("▸  " + c, { x: 0.55, y: 1.46 + i * 0.42, w: 4.35, h: 0.38, fontSize: 9.5, color: WHITE, fontFace: "Calibri", margin: 0 });
  });

  // Future scope
  sl.addShape(pres.shapes.RECTANGLE, { x: 5.3, y: 0.9, w: 4.35, h: 4.5, fill: { color: "3D2530" }, line: { color: GOLD, width: 0.8 } });
  sl.addShape(pres.shapes.RECTANGLE, { x: 5.3, y: 0.9, w: 4.35, h: 0.48, fill: { color: GOLD }, line: { color: GOLD } });
  sl.addText("🚀  FUTURE SCOPE", { x: 5.3, y: 0.9, w: 4.35, h: 0.48, fontSize: 12, bold: true, color: MAROON, align: "center", valign: "middle", margin: 0 });
  const futures = [
    "Full-text search & content tagging",
    "Telugu & English multilingual support",
    "Interactive GPS maps for blog locations",
    "Email notifications for comments & approvals",
    "Progressive Web App (PWA) — offline reading",
    "Jest / Mocha automated unit tests",
    "CI/CD → Render, Railway, or AWS deployment",
    "Analytics dashboard for admin",
    "Telangana Tourism official API integration",
  ];
  futures.forEach((f, i) => {
    sl.addText("→  " + f, { x: 5.45, y: 1.46 + i * 0.42, w: 4.05, h: 0.38, fontSize: 9.5, color: WHITE, fontFace: "Calibri", margin: 0 });
  });

  // Bottom bar
  sl.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 3.7, w: 4.7, h: 0.9, fill: { color: GOLD }, line: { color: GOLD } });
  sl.addText("\"The platform demonstrates industry-relevant full-stack skills in modern JavaScript development.\"", { x: 0.45, y: 3.72, w: 4.5, h: 0.86, fontSize: 9.5, color: MAROON, align: "center", valign: "middle", italic: true, margin: 0 });
}

// ─── Slide 10: Thank You ───────────────────────────────────────────────────────
{
  const sl = pres.addSlide();
  sl.background = { color: MAROON };

  // Decorative circles
  sl.addShape(pres.shapes.OVAL, { x: -1.2, y: 3.8, w: 4.5, h: 4.5, fill: { color: GOLD, transparency: 88 }, line: { color: GOLD, transparency: 75 } });
  sl.addShape(pres.shapes.OVAL, { x: 7.5, y: -1.0, w: 4.0, h: 4.0, fill: { color: GOLD, transparency: 88 }, line: { color: GOLD, transparency: 75 } });

  sl.addText("జై తెలంగాణ", { x: 1.0, y: 0.8, w: 8.0, h: 0.8, fontSize: 26, color: GOLD, align: "center", fontFace: "Georgia", italic: true });
  sl.addText("THANK YOU", { x: 1.0, y: 1.65, w: 8.0, h: 1.4, fontSize: 62, bold: true, color: WHITE, align: "center", fontFace: "Georgia" });

  sl.addShape(pres.shapes.RECTANGLE, { x: 3.0, y: 3.0, w: 4.0, h: 0.06, fill: { color: GOLD }, line: { color: GOLD } });

  sl.addText("Telangana Tourism Blog", { x: 1.0, y: 3.2, w: 8.0, h: 0.52, fontSize: 18, bold: true, color: GOLD, align: "center", fontFace: "Georgia" });
  sl.addText("A Full-Stack Web Application — Node.js · Express.js · MongoDB · JWT · Bootstrap 5 · Cloudinary", { x: 1.0, y: 3.78, w: 8.0, h: 0.45, fontSize: 11, color: "C8A87A", align: "center", italic: true });

  sl.addText("Department of Computer Science & Engineering  |  B.Tech 2025–2026  |  May 2026", { x: 0.5, y: 4.9, w: 9.0, h: 0.45, fontSize: 10, color: MUTED, align: "center" });

  // Open to questions
  sl.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 3.5, y: 4.42, w: 3.0, h: 0.4, fill: { color: GOLD, transparency: 20 }, line: { color: GOLD, width: 0.8 }, rectRadius: 0.05 });
  sl.addText("Open for Questions", { x: 3.5, y: 4.42, w: 3.0, h: 0.4, fontSize: 11, bold: true, color: MAROON, align: "center", valign: "middle", margin: 0 });
}

const outPath = "/Users/basith/Downloads/telangana_tourism_blog.pptx";
pres.writeFile({ fileName: outPath }).then(() => {
  console.log("Written:", outPath);
});
