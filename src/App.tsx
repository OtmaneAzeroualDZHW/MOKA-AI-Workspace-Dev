// @ts-nocheck
import { useMemo, useState } from "react";

const BRAND = {
  navy: "#082b63",
  navy2: "#041736",
  ink: "#0f172a",
  gold: "#c88a2d",
  bg: "#f7f3ec",
  line: "#e8dfd0",
};

const PRIORITIES = {
  0: { label: "Ohne Bedarf", short: "P0", color: "#64748b", bg: "#f8fafc", desc: "nur ablegen / automatisch" },
  1: { label: "Hoch", short: "P1", color: "#dc2626", bg: "#fff1f2", desc: "sofort bearbeiten" },
  2: { label: "Mittel", short: "P2", color: "#b45309", bg: "#fffbeb", desc: "einplanen" },
  3: { label: "Niedrig", short: "P3", color: "#2563eb", bg: "#eff6ff", desc: "später prüfen" },
};

const TEAM = [
  { id: "kd", name: "Konrad D.", initials: "KD", color: "#2563eb" },
  { id: "sw", name: "Sarah W.", initials: "SW", color: "#7c3aed" },
  { id: "oa", name: "Otmane A.", initials: "OA", color: "#059669" },
  { id: "mw", name: "Mike W.", initials: "MW", color: "#ea580c" },
];

const CHANNELS = {
  email: { label: "E-Mail", short: "EM", color: "#2563eb" },
  whatsapp: { label: "WhatsApp", short: "WA", color: "#22c55e" },
  signal: { label: "Signal", short: "SG", color: "#3b82f6" },
};

const CATS = {
  spam: { label: "Spam", group: "in", color: "#dc2626", bg: "#fff1f2" },
  newsletter: { label: "Newsletter", group: "in", color: "#64748b", bg: "#f8fafc" },
  system: { label: "System / Auto", group: "in", color: "#16a34a", bg: "#f0fdf4" },
  info: { label: "Zur Information", group: "in", color: "#2563eb", bg: "#eff6ff" },
  invoice: { label: "Rechnung", group: "in", color: "#7c3aed", bg: "#f5f3ff" },
  awaiting: { label: "Antwort ausstehend", group: "in", color: "#ea580c", bg: "#fff7ed" },
  task: { label: "Zu bearbeiten", group: "in", color: "#059669", bg: "#ecfdf5" },
  unclear: { label: "Unklar / Prüfen", group: "in", color: "#b45309", bg: "#fffbeb" },
  to_assign: { label: "Zum Zuweisen", group: "in", color: "#db2777", bg: "#fdf2f8" },
  schedule: { label: "Termin vereinbaren", group: "in", color: "#0284c7", bg: "#f0f9ff" },
  upcoming: { label: "Anstehend", group: "in", color: "#4f46e5", bg: "#eef2ff" },
  assigned: { label: "Zugewiesen", group: "proc", color: "#db2777", bg: "#fdf2f8" },
  in_progress: { label: "In Bearbeitung", group: "proc", color: "#b45309", bg: "#fffbeb" },
  waiting: { label: "Warten auf Rückmeldung", group: "proc", color: "#2563eb", bg: "#eff6ff" },
  trash: { label: "Papierkorb", group: "done", color: "#991b1b", bg: "#fff1f2" },
  read_nl: { label: "Gelesene Newsletter", group: "done", color: "#2563eb", bg: "#eff6ff" },
  paid: { label: "Bezahlte Rechnungen", group: "done", color: "#16a34a", bg: "#f0fdf4" },
  answered: { label: "Beantwortet", group: "done", color: "#059669", bg: "#ecfdf5" },
  done_other: { label: "Sonstiges erledigt", group: "done", color: "#b45309", bg: "#fffbeb" },
};

const GROUPS = [
  { id: "in", label: "Eingang", subtitle: "KI klassifiziert automatisch" },
  { id: "proc", label: "Bearbeitung", subtitle: "Operative Tasks" },
  { id: "done", label: "Erledigt", subtitle: "Archiv & Abschluss" },
];

const PROCESS_TEMPLATES = {
  task: ["Anfrage prüfen", "Bearbeiten", "Rückmeldung senden"],
  invoice: ["Rechnung prüfen", "Freigabe einholen", "Buchung vorbereiten"],
  schedule: ["Verfügbarkeit prüfen", "Termin vorschlagen", "Bestätigung senden"],
  to_assign: ["Anforderung prüfen", "Zuständige Person wählen", "Briefing erstellen"],
  assigned: ["Briefing lesen", "Umsetzung starten", "Status aktualisieren"],
  in_progress: ["Bearbeiten", "Zwischenstand prüfen", "Abschluss vorbereiten"],
};

const ACCOUNTS = [
  {
    id: "a1",
    name: "info@meinefirma.de",
    channel: "email",
    color: "#2563eb",
    messages: [
      { id: "e1", from: "Hans Müller", email: "h.mueller@firma.de", subject: "Angebot Server-Wartung", body: "Bitte Angebot für Wartung 12 Server. Deadline 15.04.", time: "09:32", attachments: ["Serverliste.xlsx", "Wartungsvertrag.pdf"] },
      { id: "e2", from: "Tech-Blog", email: "news@tech-blog.de", subject: "Tech-Trends 2026", body: "Monatlicher Newsletter.", time: "09:10", header: { newsletter: true } },
      { id: "e3", from: "Petra Klein", email: "p.klein@intern.de", subject: "Onboarding neuer MA", body: "Ab 1. Mai neuer Kollege. Mappe vorbereiten. Deadline 28.04.", time: "08:50", attachments: ["Checkliste.pdf"] },
      { id: "e4", from: "DHL", email: "noreply@dhl.de", subject: "Sendung zugestellt", body: "Sendung erfolgreich zugestellt.", time: "08:15", header: { system: true } },
      { id: "e5", from: "Buchhaltung", email: "rechnung@bh.de", subject: "Rechnung 2026-0342", body: "Rechnung 1.248 €. Zahlbar bis 30.04.", time: "gestern", attachments: ["Rechnung_0342.pdf"] },
      { id: "e22", from: "Martin Koch", email: "m.koch@k.de", subject: "Frage", body: "Hallo, kurze Frage.", time: "09:45" },
      { id: "e50", from: "Frau Berger", email: "a.berger@k.de", subject: "Können wir Dienstag?", body: "Dienstag 14 Uhr möglich?", time: "08:30" },
    ],
  },
  {
    id: "a2",
    name: "vertrieb@meinefirma.de",
    channel: "email",
    color: "#059669",
    messages: [
      { id: "e6", from: "Max Schmidt", email: "m.schmidt@l.de", subject: "Lieferverzögerung KW16", body: "Lieferung verzögert sich.", time: "09:15" },
      { id: "e7", from: "Lisa Weber", email: "l.weber@p.com", subject: "Re: Partnervertrag", body: "Danke. Wir prüfen intern.", time: "08:00" },
      { id: "e8", from: "Lottery XYZ", email: "winner@lot.ru", subject: "SIE HABEN GEWONNEN!!!", body: "Klicken Sie hier und gewinnen Sie sofort.", time: "07:30" },
    ],
  },
  {
    id: "a3",
    name: "support@meinefirma.de",
    channel: "email",
    color: "#ea580c",
    messages: [
      { id: "e9", from: "Karin Fuchs", email: "k.fuchs@k.de", subject: "Login geht nicht", body: "Seit Update 403. Dringend!", time: "10:01", attachments: ["screenshot.png"] },
      { id: "e10", from: "Tom Richter", email: "t.richter@e.de", subject: "API-Rate-Limit", body: "Auf 1000 req/min erhöhen.", time: "gestern" },
      { id: "e11", from: "Jenny Klein", email: "j.klein@f.at", subject: "Danke für die Hilfe!", body: "Problem behoben, danke.", time: "gestern" },
      { id: "e27", from: "Andrea Vogel", email: "a.vogel@o.de", subject: "Mahnung 2025-1287", body: "Offene Rechnung beachten.", time: "gestern", attachments: ["Mahnung.pdf"] },
    ],
  },
  {
    id: "wa",
    name: "WhatsApp Business",
    channel: "whatsapp",
    color: "#22c55e",
    messages: [
      { id: "w1", from: "Markus Schmidt", email: "+49 171", subject: "Wasserschaden", body: "Freitag vorbeikommen? Wasserschaden!", time: "10:15", attachments: ["foto_keller.jpg"] },
      { id: "w2", from: "Promo Bot", email: "+48 666", subject: "80% Rabatt!!!", body: "Nur heute!", time: "09:50" },
      { id: "w3", from: "Frau Meier", email: "+49 151", subject: "Dankeschön", body: "Vielen Dank, alles super.", time: "gestern" },
      { id: "w5", from: "Herr Hartmann", email: "+49 160", subject: "Terminanfrage", body: "Nächste Woche Termin? Heizungsanlage.", time: "gestern" },
    ],
  },
  {
    id: "sig",
    name: "Signal Firma",
    channel: "signal",
    color: "#3b82f6",
    messages: [
      { id: "s1", from: "DevOps", email: "dev@sig", subject: "Server-Check", body: "Server läuft, Check machen?", time: "09:30" },
      { id: "s2", from: "Felix", email: "felix@sig", subject: "API-Keys?", body: "API-Keys vom Kunden? Bis morgen.", time: "gestern" },
      { id: "s3", from: "Alex", email: "alex@sig", subject: "Re: Meeting", body: "Passt, 10 Uhr.", time: "gestern" },
    ],
  },
];

const AI = {
  e1: { title: "Angebot Server-Wartung", summary: "Angebot für 12 Server vorbereiten.", priority: 1, urgent: true, deadline: "15.04.", assignee: "kd" },
  e3: { title: "Onboarding neuer Mitarbeiter", summary: "Hardware, Accounts und Mappe vorbereiten.", priority: 2, urgent: false, deadline: "28.04.", assignee: "sw" },
  e6: { title: "Produktionsplan anpassen", summary: "Lieferverzögerung in KW16 berücksichtigen.", priority: 1, urgent: true, deadline: "08.04.", assignee: "oa" },
  e9: { title: "Login-Bug beheben", summary: "403-Fehler seit Update analysieren und fixen.", priority: 1, urgent: true, deadline: "07.04.", assignee: "mw" },
  e10: { title: "API-Rate-Limit erhöhen", summary: "Rate-Limit auf 1000 req/min anpassen.", priority: 2, urgent: false, deadline: "14.04.", assignee: "mw" },
  w1: { title: "Wasserschaden-Termin", summary: "Freitag bei Markus Schmidt vorbeifahren.", priority: 1, urgent: true, deadline: "11.04.", assignee: "kd" },
  s1: { title: "Server-Check durchführen", summary: "Post-Restart Check durchführen.", priority: 2, urgent: false, deadline: "heute", assignee: "mw" },
  s2: { title: "API-Keys besorgen", summary: "Keys vom Kunden anfordern.", priority: 2, urgent: true, deadline: "morgen", assignee: "mw" },
};

const SIM_MESSAGES = [
  { id: "e12", account: "a1", from: "Stefan Lang", email: "s.lang@i.de", subject: "Drucker OG2", body: "3 Drucker veraltet.", time: "jetzt", ai: { title: "Drucker erneuern", summary: "3 Drucker im OG2 prüfen und ersetzen.", priority: 3, urgent: false, deadline: "30.04.", assignee: "kd" } },
  { id: "e13", account: "a2", from: "Anna Berger", email: "a.b@n.de", subject: "Pitch-Deck Freitag", body: "Bitte finalisieren!", time: "jetzt", ai: { title: "Pitch-Deck finalisieren", summary: "Deck bis Freitag vorbereiten.", priority: 1, urgent: true, deadline: "11.04.", assignee: "oa" } },
  { id: "e14", account: "a3", from: "Lukas Meier", email: "l.m@o.de", subject: "SSL-Zertifikat", body: "Läuft 20.04. ab!", time: "jetzt", ai: { title: "SSL-Zertifikat erneuern", summary: "Ablaufdatum prüfen und Zertifikat erneuern.", priority: 1, urgent: true, deadline: "18.04.", assignee: "mw" } },
  { id: "w6", account: "wa", from: "Frau Bosch", email: "+49 172", subject: "Mittwoch?", body: "Gartenbau besprechen?", time: "jetzt" },
  { id: "s4", account: "sig", from: "Alex", email: "alex@sig", subject: "Danke", body: "Top, hat geklappt!", time: "jetzt" },
];

function classify(message) {
  const s = (message.subject || "").toLowerCase();
  const b = (message.body || "").toLowerCase();
  const a = `${s} ${b}`;
  if (message.header?.system) return { cat: "system", stage: 0, confidence: 99 };
  if (message.header?.newsletter) return { cat: "newsletter", stage: 0, confidence: 99 };
  if (/gewinn|lottery|rabatt.*\d\d%|viagra|million|pillen/i.test(a)) return { cat: "spam", stage: 0, confidence: 95 };
  if (message.email && /\.(ru|cn|tk)$/i.test(message.email)) return { cat: "spam", stage: 0, confidence: 90 };
  if (/promo bot/i.test(message.from)) return { cat: "spam", stage: 0, confidence: 90 };
  if (/rechnung|invoice|mahnung|zahlung/i.test(s)) return { cat: "invoice", stage: 1, confidence: 90 };
  if (/termin|wann passt|können wir|dienstag|nächste woche|mittwoch/i.test(a) && !/^(re:|aw:)/i.test(s)) return { cat: "schedule", stage: 1, confidence: 82 };
  if (/^(re:|aw:)/i.test(s)) return /danke|dank/i.test(s) ? { cat: "info", stage: 1, confidence: 85 } : { cat: "awaiting", stage: 1, confidence: 80 };
  if (/danke|dank|super|top/i.test(s)) return { cat: "info", stage: 1, confidence: 85 };
  if (s.length < 10 || b.length < 20) return { cat: "unclear", stage: 2, confidence: 45 };
  return { cat: "task", stage: 2, confidence: 88 };
}

function buildInitialBoard(extraAi = {}) {
  const board = Object.fromEntries(Object.keys(CATS).map((id) => [id, []]));
  ACCOUNTS.forEach((account) => {
    account.messages.forEach((message) => {
      const task = buildTask(account, message, extraAi);
      board[task.cat].unshift(task);
    });
  });
  return board;
}

function buildTask(account, message, extraAi = {}) {
  const cl = classify(message);
  const ai = extraAi[message.id] || AI[message.id] || message.ai;
  const priority = ["spam", "newsletter", "system", "info"].includes(cl.cat) ? 0 : ai?.priority || 3;
  return {
    id: message.id,
    cat: cl.cat,
    stage: cl.stage,
    confidence: cl.confidence,
    title: ai?.title,
    summary: ai?.summary,
    priority,
    urgent: ai?.urgent || false,
    deadline: ai?.deadline,
    assignees: ai?.assignees || (ai?.assignee ? [ai.assignee] : []),
    accountName: account.name,
    accountColor: account.color,
    channel: account.channel,
    from: message.from,
    email: message.email,
    subject: message.subject,
    body: message.body,
    time: message.time,
    attachments: message.attachments || [],
    history: [{ text: `KI → ${CATS[cl.cat].label}`, time: "gerade eben" }],
    comments: [],
  };
}

function teamNames(ids = []) {
  if (!ids.length) return "Nicht zugewiesen";
  return ids.map((id) => TEAM.find((x) => x.id === id)?.name || id).join(", ");
}

function MokaLogo({ dark = false, size = 42 }) {
  const navy = dark ? "#ffffff" : BRAND.navy;
  const gold = BRAND.gold;
  const bg = dark ? "rgba(255,255,255,.10)" : "#fff7e8";
  const border = dark ? "rgba(255,255,255,.18)" : "rgba(200,138,45,.28)";

  return (
    <div className="moka-brand">
      <div className="moka-mark" style={{ width: size, height: size, background: bg, borderColor: border }}>
        <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <path d="M20 17h24l-4 7v14l5 7v8H19v-8l5-7V24l-4-7Z" fill="none" stroke={gold} strokeWidth="4" strokeLinejoin="round" />
          <path d="M24 24h16M23 39h18M28 13h8l3 4H25l3-4Z" stroke={gold} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M44 25c6 1 9 5 9 10s-3 9-8 10" stroke={gold} strokeWidth="4" strokeLinecap="round" />
          <circle cx="32" cy="32" r="3" fill={navy} />
        </svg>
      </div>
      <div className="moka-word">
        <div style={{ color: navy }}>MOKA AI</div>
        <span>From Inbox to Action</span>
      </div>
    </div>
  );
}

function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("demo@moka.ai");
  const [password, setPassword] = useState("demo123");

  return (
    <div className="login-page">
      <style>{CSS}</style>
      <div className="login-glow" />
      <div className="login-card">
        <MokaLogo size={52} />
        <div className="login-copy">
          <h1>Willkommen</h1>
          <p>Demo-Login für den MOKA AI Workspace.</p>
        </div>
        <label className="login-field">
          <span>E-Mail</span>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="demo@moka.ai" />
        </label>
        <label className="login-field">
          <span>Passwort</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="demo123" />
        </label>
        <button className="login-btn" onClick={() => onLogin({ email })}>Einloggen</button>
      </div>
    </div>
  );
}

function Pill({ children, color = BRAND.navy, bg }) {
  return <span className="pill" style={{ color, background: bg || `${color}14`, borderColor: `${color}28` }}>{children}</span>;
}

function TaskCard({ task, onOpen, onDragStart, dragging }) {
  const channel = CHANNELS[task.channel] || CHANNELS.email;
  const assignees = (task.assignees || []).map((id) => TEAM.find((x) => x.id === id)).filter(Boolean);
  const pr = PRIORITIES[task.priority] || PRIORITIES[0];

  return (
    <button className={`task-card ${dragging ? "dragging" : ""}`} draggable onDragStart={onDragStart} onClick={onOpen}>
      <div className="task-title">{task.subject}</div>
      <div className="task-meta"><span className="channel" style={{ background: channel.color }}>{channel.short}</span><span>{task.from}</span></div>
      {task.title && <div className="ai-title">→ {task.title}</div>}
      <div className="task-foot">
        <Pill color={task.stage === 0 ? "#16a34a" : task.stage === 1 ? "#2563eb" : "#b45309"}>S{task.stage}</Pill>
        <Pill color={pr.color} bg={pr.bg}>{pr.short} · {pr.label}</Pill>
        {task.urgent && <Pill color="#111827" bg="#11182714">⚡</Pill>}
        {task.deadline && <span className="deadline">{task.deadline}</span>}
        <span className="spacer" />
        <div className="avatar-stack">
          {assignees.slice(0, 3).map((m) => <span key={m.id} className="avatar-mini" style={{ background: m.color }}>{m.initials}</span>)}
          {assignees.length > 3 && <span className="avatar-more">+{assignees.length - 3}</span>}
        </div>
      </div>
    </button>
  );
}

function CategoryBox({ id, tasks, collapsed, onToggle, onOpen, onDrop, onDragStart, draggedId }) {
  const cat = CATS[id];
  return (
    <section className="category" style={{ background: cat.bg, borderColor: `${cat.color}33` }} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); onDrop(id); }}>
      <button className="cat-head" onClick={() => onToggle(id)} style={{ color: cat.color }}>
        <span>{collapsed ? "▸" : "▾"}</span><span>{cat.label}</span><span className="cat-count" style={{ background: `${cat.color}18` }}>{tasks.length}</span>
      </button>
      {!collapsed && <div className="cat-body">{tasks.length === 0 ? <div className="empty">leer</div> : tasks.map((task) => <TaskCard key={task.id} task={task} dragging={draggedId === task.id} onOpen={() => onOpen(task.id)} onDragStart={(e) => onDragStart(e, task.id)} />)}</div>}
    </section>
  );
}

function DetailModal({ task, onClose, onSave, onUpdate, onMove }) {
  const cat = CATS[task.cat];
  const channel = CHANNELS[task.channel] || CHANNELS.email;
  const process = PROCESS_TEMPLATES[task.cat] || PROCESS_TEMPLATES.task;
  const [comment, setComment] = useState("");
  const [moveGroup, setMoveGroup] = useState(null);

  const addComment = () => {
    if (!comment.trim()) return;
    onUpdate(task.id, { comments: [...task.comments, { by: "Du", text: comment.trim(), time: "gerade eben" }] });
    setComment("");
  };

  const toggleAssignee = (id) => {
    const current = task.assignees || [];
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
    onUpdate(task.id, { assignees: next });
  };

  const pr = PRIORITIES[task.priority] || PRIORITIES[0];

  return (
    <div className="modal-bg" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div><div className="modal-kicker">Task Detail</div><div className="modal-title">{task.title || task.subject}</div></div>
          <div className="modal-actions"><button className="btn ok" onClick={onSave}>Speichern</button><button className="btn ghost" onClick={onClose}>Schließen</button></div>
        </div>
        <div className="modal-body">
          <div className="tag-row">
            <Pill color={channel.color}>{channel.label}</Pill><Pill color={task.accountColor}>{task.accountName}</Pill><Pill color={cat.color}>{cat.label}</Pill>
            <Pill color={pr.color} bg={pr.bg}>{pr.short} · {pr.label}</Pill>
            {task.urgent && <Pill color="#111827">⚡ Zeitkritisch</Pill>}
          </div>
          <p className="summary">{task.summary || task.body}</p>
          <div className="modal-grid">
            <div className="panel"><div className="panel-title">Original-Nachricht</div><div className="small-muted">Von: {task.from} · {task.email}</div><div className="message-box">{task.body}</div>{task.attachments.length > 0 && <div className="attachments">{task.attachments.map((a) => <span key={a}>📎 {a}</span>)}</div>}</div>
            <div className="panel"><div className="panel-title">Bearbeitung</div>
              <label className="field"><span>Priorität</span><select value={task.priority} onChange={(e) => onUpdate(task.id, { priority: Number(e.target.value) })}><option value={0}>P0 — Ohne Bedarf</option><option value={1}>P1 — Hoch</option><option value={2}>P2 — Mittel</option><option value={3}>P3 — Niedrig</option></select></label>
              <div className="field multi"><span>Zuweisung</span><div className="assignee-grid">{TEAM.map((m) => <button key={m.id} className={(task.assignees || []).includes(m.id) ? "assignee-chip active" : "assignee-chip"} onClick={() => toggleAssignee(m.id)}><i style={{ background: m.color }}>{m.initials}</i>{m.name}</button>)}</div></div>
              <label className="check"><input type="checkbox" checked={task.urgent} onChange={(e) => onUpdate(task.id, { urgent: e.target.checked })} /> Zeitkritisch markieren</label></div>
            <div className="panel"><div className="panel-title">KI erkannte Daten</div><div className="data-row"><span>Kanal</span><b>{channel.label}</b></div><div className="data-row"><span>KI-Stufe</span><b>{["S0 Auto", "S1 Review", "S2 Task"][task.stage]} · {task.confidence}%</b></div><div className="data-row"><span>Frist</span><b>{task.deadline || "—"}</b></div><div className="data-row"><span>Zuweisung</span><b>{teamNames(task.assignees)}</b></div></div>
            <div className="panel"><div className="panel-title">Vorgeschlagener Prozess</div><div className="process">{process.map((step, i) => <div className="process-item" key={step}><span>{step}</span>{i < process.length - 1 && <b>›</b>}</div>)}</div></div>
          </div>
          <div className="panel full"><div className="panel-title">Kommentare</div>{task.comments.length === 0 ? <div className="empty wide">Noch keine Kommentare.</div> : task.comments.map((c, i) => <div className="comment" key={i}><b>{c.by}</b> <span>· {c.time}</span><br />{c.text}</div>)}<div className="comment-input"><input value={comment} onChange={(e) => setComment(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addComment()} placeholder="Kommentar hinzufügen..." /><button onClick={addComment}>Senden</button></div></div>
          <div className="move-box"><div className="panel-title">In andere Kategorie verschieben</div>{!moveGroup ? <div className="move-groups">{GROUPS.map((g) => <button key={g.id} onClick={() => setMoveGroup(g.id)}>{g.label}</button>)}</div> : <div className="move-cats"><button className="back" onClick={() => setMoveGroup(null)}>← Zurück</button>{Object.entries(CATS).filter(([, v]) => v.group === moveGroup).map(([id, c]) => <button key={id} disabled={id === task.cat} style={{ color: c.color, background: c.bg, borderColor: `${c.color}33` }} onClick={() => onMove(task.id, id)}>{c.label}</button>)}</div>}</div>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ user, onLogout }) {
  const [accounts, setAccounts] = useState(ACCOUNTS);
  const [board, setBoard] = useState(buildInitialBoard());
  const [openAccounts, setOpenAccounts] = useState({ a1: true, a2: true, a3: true, wa: true, sig: true });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [priorityOpen, setPriorityOpen] = useState(true);
  const [collapsedCats, setCollapsedCats] = useState(new Set(["spam", "newsletter", "system", "trash", "read_nl"]));
  const [selectedId, setSelectedId] = useState(null);
  const [draggedId, setDraggedId] = useState(null);
  const [simIndex, setSimIndex] = useState(0);
  const [activeGroup, setActiveGroup] = useState("all");
  const [activePriority, setActivePriority] = useState("all");

  const tasks = useMemo(() => Object.values(board).flat(), [board]);
  const selectedTask = selectedId ? tasks.find((t) => t.id === selectedId) : null;
  const stats = useMemo(() => ({
    total: tasks.length,
    s0: tasks.filter((t) => t.stage === 0).length,
    s1: tasks.filter((t) => t.stage === 1).length,
    s2: tasks.filter((t) => t.stage === 2).length,
    p1: tasks.filter((t) => t.priority === 1 && CATS[t.cat].group !== "done"),
    p2: tasks.filter((t) => t.priority === 2 && CATS[t.cat].group !== "done"),
    p0: tasks.filter((t) => t.priority === 0 && CATS[t.cat].group !== "done"),
    p3: tasks.filter((t) => t.priority === 3 && CATS[t.cat].group !== "done"),
    urgent: tasks.filter((t) => t.urgent && CATS[t.cat].group !== "done"),
    in: tasks.filter((t) => CATS[t.cat].group === "in").length,
    proc: tasks.filter((t) => CATS[t.cat].group === "proc").length,
    done: tasks.filter((t) => CATS[t.cat].group === "done").length,
  }), [tasks]);

  const updateTask = (id, patch) => {
    setBoard((prev) => {
      const next = structuredClone(prev);
      Object.keys(next).forEach((cat) => next[cat] = next[cat].map((t) => t.id === id ? { ...t, ...patch } : t));
      return next;
    });
  };

  const moveTask = (id, nextCat) => {
    setBoard((prev) => {
      const next = structuredClone(prev);
      let moving = null;
      Object.keys(next).forEach((cat) => {
        const idx = next[cat].findIndex((t) => t.id === id);
        if (idx >= 0) moving = next[cat].splice(idx, 1)[0];
      });
      if (moving) {
        moving.cat = nextCat;
        moving.history = [...moving.history, { text: `→ ${CATS[nextCat].label}`, time: "gerade eben" }];
        next[nextCat].unshift(moving);
      }
      return next;
    });
    setSelectedId(null);
  };

  const simulateMessage = () => {
    if (simIndex >= SIM_MESSAGES.length) return;
    const msg = SIM_MESSAGES[simIndex];
    const account = accounts.find((a) => a.id === msg.account);
    if (!account) return;
    setAccounts((prev) => prev.map((a) => a.id === msg.account ? { ...a, messages: [...a.messages, msg] } : a));
    const newTask = buildTask(account, msg, { [msg.id]: msg.ai });
    setBoard((prev) => ({ ...prev, [newTask.cat]: [newTask, ...prev[newTask.cat]] }));
    setSimIndex((i) => i + 1);
  };

  const toggleCat = (id) => setCollapsedCats((prev) => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  const onDragStart = (e, id) => { setDraggedId(id); e.dataTransfer.effectAllowed = "move"; };
  const onDrop = (cat) => { if (!draggedId) return; moveTask(draggedId, cat); setDraggedId(null); };
  const groupTasks = (groupId) => Object.entries(CATS).filter(([, c]) => c.group === groupId);
  const filterForCurrentView = (items) => {
    if (activePriority === "all") return items;
    if (activePriority === "urgent") return items.filter((t) => t.urgent && CATS[t.cat].group !== "done");
    return items.filter((t) => t.priority === activePriority && CATS[t.cat].group !== "done");
  };
  const selectGroup = (groupId) => {
    setActiveGroup(groupId);
    setActivePriority("all");
  };
  const selectPriority = (priority) => {
    setActivePriority(priority);
    setActiveGroup("all");
  };

  return (
    <div className="app-shell">
      <style>{CSS}</style>
      <aside className={`sidebar ${sidebarOpen ? "" : "closed"}`}>
        <div className="sidebar-head"><MokaLogo size={42} /><button className="icon-btn" onClick={() => setSidebarOpen(false)}>×</button></div>
        <div className="inbox-toolbar"><button className="primary-small" onClick={simulateMessage} disabled={simIndex >= SIM_MESSAGES.length}><span className="pulse" /> + Nachricht {simIndex < SIM_MESSAGES.length ? `(${SIM_MESSAGES.length - simIndex})` : ""}</button></div>
        <div className="side-section-title">Kanäle & Accounts</div>
        <div className="accounts">{accounts.map((account) => { const ch = CHANNELS[account.channel]; return <div className="account" key={account.id}><button className="account-head" onClick={() => setOpenAccounts((p) => ({ ...p, [account.id]: !p[account.id] }))}><span className="dot" style={{ background: account.color }} /><span className="channel-badge" style={{ background: ch.color }}>{ch.short}</span><span className="account-name">{account.name}</span><span className="account-count">{account.messages.length}</span><span>{openAccounts[account.id] ? "▾" : "▸"}</span></button>{openAccounts[account.id] && <div className="message-list">{account.messages.map((m) => <button className="message-row" key={m.id} onClick={() => setSelectedId(m.id)}><b>{m.from}</b><span>{m.subject}</span><em>✓ analysiert</em></button>)}</div>}</div>; })}</div>
      </aside>
      <main className="main">
        <header className="hero pro-hero">
          <div className="hero-left">
            {!sidebarOpen && <button className="ghost-light" onClick={() => setSidebarOpen(true)}>☰ Inbox</button>}
            <div>
              <div className="hero-eyebrow">MOKA AI · Workspace</div>
              <h1>Ein Cockpit für alle Eingänge.</h1>
              <p>Alle Nachrichten werden automatisch bewertet, priorisiert und in klare Arbeitsabläufe übersetzt – damit nichts liegen bleibt.</p>
            </div>
          </div>
          <div className="hero-dashboard">
            <button className={activeGroup === "all" && activePriority === "all" ? "dash-card total active" : "dash-card total"} onClick={() => selectGroup("all")}><span>Gesamt</span><b>{stats.total}</b><em>alle Vorgänge</em></button>
            <button className={activeGroup === "in" ? "dash-card inbox active" : "dash-card inbox"} onClick={() => selectGroup("in")}><span>Eingang</span><b>{stats.in}</b><em>neue Eingänge</em></button>
            <button className={activeGroup === "proc" ? "dash-card progress active" : "dash-card progress"} onClick={() => selectGroup("proc")}><span>Bearbeitung</span><b>{stats.proc}</b><em>laufende Tasks</em></button>
            <button className={activeGroup === "done" ? "dash-card done active" : "dash-card done"} onClick={() => selectGroup("done")}><span>Erledigt</span><b>{stats.done}</b><em>abgeschlossen</em></button>
            <button className={activePriority === "urgent" ? "dash-card critical active" : "dash-card critical"} onClick={() => selectPriority("urgent")}><span>Kritisch</span><b>{stats.urgent.length}</b><em>Frist / Eskalation</em></button>
            <button className={activePriority === 0 ? "dash-card no-need active" : "dash-card no-need"} onClick={() => selectPriority(0)}><span>Ohne Bedarf</span><b>{stats.p0.length}</b><em>automatisch ablegen</em></button>
            <button className={activePriority === 1 ? "dash-card high active" : "dash-card high"} onClick={() => selectPriority(1)}><span>Hoch</span><b>{stats.p1.length}</b><em>sofort handeln</em></button>
            <button className={activePriority === 2 ? "dash-card medium active" : "dash-card medium"} onClick={() => selectPriority(2)}><span>Mittel</span><b>{stats.p2.length}</b><em>einplanen</em></button>
            <button className={activePriority === 3 ? "dash-card low active" : "dash-card low"} onClick={() => selectPriority(3)}><span>Niedrig</span><b>{stats.p3.length}</b><em>später prüfen</em></button>
          </div>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </header>
        <section className="priority-section priority-pro">
          <div className="priority-header">
            <button className="section-head" onClick={() => setPriorityOpen(!priorityOpen)}>
              <span>{priorityOpen ? "▾" : "▸"}</span><b>Prioritäten & Handlungsbedarf</b><em>Klick auf eine Karte filtert das Board</em>
            </button>
          </div>
          {priorityOpen && <div className="priority-grid priority-grid-pro">
            <PriorityBucket title="Kritisch" subtitle="⚡ Frist / Eskalation" dark tasks={stats.urgent} onOpen={setSelectedId} active={activePriority === "urgent"} onSelect={() => selectPriority("urgent")} />
            <PriorityBucket title="Hoch" subtitle="P1 · sofort handeln" color="#dc2626" tasks={stats.p1} onOpen={setSelectedId} active={activePriority === 1} onSelect={() => selectPriority(1)} />
            <PriorityBucket title="Mittel" subtitle="P2 · einplanen" color="#b45309" tasks={stats.p2} onOpen={setSelectedId} active={activePriority === 2} onSelect={() => selectPriority(2)} />
            <PriorityBucket title="Niedrig" subtitle="P3 · später prüfen" color="#2563eb" tasks={stats.p3} onOpen={setSelectedId} active={activePriority === 3} onSelect={() => selectPriority(3)} />
            <PriorityBucket title="Ohne Bedarf" subtitle="P0 · automatisch ablegen" color="#64748b" tasks={stats.p0} onOpen={setSelectedId} active={activePriority === 0} onSelect={() => selectPriority(0)} />
          </div>}
        </section>
        <section className={`board ${activeGroup !== "all" || activePriority !== "all" ? "single-board" : ""}`}>{GROUPS.filter((g) => activeGroup === "all" || g.id === activeGroup).map((group) => { const cats = groupTasks(group.id); const count = cats.reduce((sum, [id]) => sum + filterForCurrentView(board[id]).length, 0); return <div className="group" key={group.id}><div className="group-head"><div><h2>{group.label}</h2><p>{group.subtitle}</p></div><span>{count}</span></div><div className="group-body">{cats.map(([id]) => <CategoryBox key={id} id={id} tasks={filterForCurrentView(board[id])} collapsed={collapsedCats.has(id)} onToggle={toggleCat} onOpen={setSelectedId} onDrop={onDrop} onDragStart={onDragStart} draggedId={draggedId} />)}</div></div>; })}</section>
      </main>
      {selectedTask && <DetailModal task={selectedTask} onClose={() => setSelectedId(null)} onSave={() => setSelectedId(null)} onUpdate={updateTask} onMove={moveTask} />}
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  if (!user) return <LoginScreen onLogin={setUser} />;
  return <Dashboard user={user} onLogout={() => setUser(null)} />;
}

function PriorityBucket({ title, subtitle, color = "#111827", tasks, onOpen, onSelect, active = false, dark = false }) {
  return <button className={`priority-bucket ${dark ? "dark" : ""} ${active ? "active" : ""}`} style={!dark ? { borderColor: `${color}33`, background: `${color}0d` } : {}} onClick={onSelect}><div className="bucket-head" style={{ color: dark ? "#fff" : color }}><div><b>{title}</b>{subtitle && <small>{subtitle}</small>}</div><span>{tasks.length}</span></div><div className="bucket-items">{tasks.length === 0 ? <div className="empty">leer</div> : tasks.slice(0, 4).map((t) => <button key={t.id} className="mini-task" onClick={(e) => { e.stopPropagation(); onOpen(t.id); }}><b>{t.title || t.subject}</b><span>{t.from}</span></button>)}</div></button>;
}

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
html,body,#root{min-height:100%;width:100%}
body{font-family:"Inter",ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#f5efe6;color:#0f172a;font-size:15px;font-feature-settings:"cv02","cv03","cv04","cv11"}
button,input,select{font-family:inherit}button{border:0;cursor:pointer}.app-shell{min-height:100vh;display:flex;background:radial-gradient(circle at top left,#fff7e8 0,#f6efe5 34%,#edf2ff 100%)}
.login-page{min-height:100vh;display:grid;place-items:center;background:radial-gradient(circle at top,#163b7c 0,#071a38 48%,#050b16 100%);position:relative;overflow:hidden;padding:24px}.login-glow{position:absolute;width:420px;height:420px;border-radius:999px;background:rgba(200,138,45,.24);filter:blur(40px);top:-120px;right:-80px}.login-card{width:380px;max-width:100%;background:rgba(255,255,255,.92);backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,.5);border-radius:28px;padding:28px;box-shadow:0 30px 90px rgba(0,0,0,.28)}.login-copy{margin:24px 0 18px}.login-copy h1{font-size:30px;letter-spacing:-.05em;color:#082b63}.login-copy p{margin-top:8px;color:#64748b;line-height:1.5}.login-field{display:block;margin-top:12px}.login-field span{display:block;font-size:12px;font-weight:900;color:#475569;margin-bottom:7px}.login-field input{width:100%;padding:13px 14px;border:1px solid #e2e8f0;border-radius:15px;background:#fff;font-size:14px}.login-btn{width:100%;margin-top:18px;padding:14px;border-radius:16px;background:#082b63;color:#fff;font-weight:950;box-shadow:0 16px 30px rgba(8,43,99,.22)}.login-note{text-align:center;margin-top:12px;font-size:11px;color:#94a3b8;font-weight:800}
.sidebar{width:300px;min-width:300px;background:rgba(255,255,255,.86);backdrop-filter:blur(20px);border-right:1px solid rgba(226,232,240,.85);display:flex;flex-direction:column;transition:.22s ease;box-shadow:16px 0 44px rgba(15,23,42,.05);z-index:4}.sidebar.closed{width:0;min-width:0;overflow:hidden;border-right:0}.sidebar-head{padding:16px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #eef2f7}.moka-brand{display:flex;align-items:center;gap:12px}.moka-mark{border:1px solid;border-radius:16px;display:grid;place-items:center;box-shadow:0 10px 26px rgba(200,138,45,.18)}.moka-mark svg{width:72%;height:72%;filter:drop-shadow(0 2px 8px rgba(200,138,45,.25))}.moka-word div{font-size:19px;font-weight:950;letter-spacing:-.04em;line-height:1}.moka-word span{display:block;font-size:12px;color:${BRAND.gold};font-weight:900;margin-top:4px}.icon-btn{width:36px;height:36px;border-radius:12px;background:#f8fafc;color:#64748b;font-size:18px}.inbox-toolbar{padding:14px 16px;border-bottom:1px solid #eef2f7}.primary-small{width:100%;padding:12px 14px;border-radius:15px;background:${BRAND.navy};color:white;font-weight:900;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 12px 22px rgba(8,43,99,.16);font-size:13px}.primary-small:disabled{opacity:.55}.pulse{width:8px;height:8px;border-radius:50%;background:#93c5fd;animation:pulse 1s infinite}@keyframes pulse{50%{opacity:.25;transform:scale(.8)}}
.side-section-title{padding:16px 16px 8px;font-size:11px;font-weight:950;letter-spacing:.1em;color:#94a3b8;text-transform:uppercase}.accounts{overflow:auto;padding-bottom:18px}.account{border-bottom:1px solid #eef2f7}.account-head{width:100%;display:flex;align-items:center;gap:8px;padding:12px 16px;background:transparent;text-align:left}.account-head:hover{background:#f8fafc}.dot{width:8px;height:8px;border-radius:50%}.channel-badge{font-size:9px;font-weight:950;color:#fff;padding:4px 6px;border-radius:7px}.account-name{flex:1;font-size:12px;font-weight:850;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.account-count{font-size:11px;color:#64748b;background:#f1f5f9;border-radius:999px;padding:4px 8px}.message-list{max-height:180px;overflow:auto;padding:0 9px 9px}.message-row{width:100%;display:block;text-align:left;padding:10px 10px 10px 20px;border-radius:12px;background:transparent}.message-row:hover{background:#fff}.message-row b{display:block;font-size:12px}.message-row span{display:block;font-size:12px;color:#64748b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px}.message-row em{font-style:normal;font-size:10px;color:#16a34a;font-weight:850;margin-top:2px;display:block}
.main{flex:1;min-width:0;display:flex;flex-direction:column;padding:18px;gap:16px;overflow:auto}.hero{border-radius:28px;background:linear-gradient(135deg,#061a3a 0%,#082b63 48%,#101827 100%);color:#fff;padding:26px 30px;display:flex;align-items:center;justify-content:space-between;gap:24px;box-shadow:0 24px 60px rgba(8,43,99,.20);position:relative;overflow:hidden}.hero:before{content:"";position:absolute;inset:-40% auto auto -10%;width:420px;height:420px;background:radial-gradient(circle,rgba(200,138,45,.25),transparent 62%);pointer-events:none}.hero-left{display:flex;align-items:center;gap:18px;position:relative;z-index:1}.hero h1{font-size:38px;color:#fff;letter-spacing:-.045em;line-height:1.05;margin:0}.hero p{margin-top:12px;color:rgba(255,255,255,.80);max-width:680px;line-height:1.6;font-size:16px}.stage-help{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}.stage-help span{font-size:12px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.14);padding:7px 10px;border-radius:999px;color:rgba(255,255,255,.86)}.ghost-light,.logout-btn{padding:11px 14px;border-radius:14px;background:rgba(255,255,255,.12);color:#fff;border:1px solid rgba(255,255,255,.18);font-weight:900}.logout-btn{position:relative;z-index:1}.hero-stats{display:grid;grid-template-columns:repeat(4,108px);gap:12px;position:relative;z-index:1}.hero-stats div{background:rgba(255,255,255,.11);border:1px solid rgba(255,255,255,.16);border-radius:22px;padding:15px 14px;box-shadow:inset 0 1px 0 rgba(255,255,255,.12)}.hero-stats span{display:block;color:rgba(255,255,255,.70);font-size:11px;font-weight:850}.hero-stats b{font-size:30px;margin-top:7px;display:block;color:#fff;letter-spacing:-.03em}
.priority-section{border-radius:22px;background:rgba(255,255,255,.78);backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,.75);box-shadow:0 10px 24px rgba(15,23,42,.05);overflow:hidden}.section-head{width:100%;padding:14px 16px;display:flex;align-items:center;gap:10px;background:transparent;text-align:left}.section-head b{font-size:13px;text-transform:uppercase;letter-spacing:.08em}.section-head em{margin-left:auto;font-style:normal;color:#64748b;font-size:12px;font-weight:850}.priority-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;padding:0 14px 14px}.priority-bucket{border:1px solid;border-radius:22px;padding:15px;min-height:140px;text-align:left;transition:.18s ease;box-shadow:0 10px 24px rgba(15,23,42,.055)}.priority-bucket:hover,.priority-bucket.active{transform:translateY(-2px);box-shadow:0 18px 36px rgba(15,23,42,.12);outline:2px solid rgba(8,43,99,.18);outline-offset:2px}.priority-bucket.dark{background:#171717;border-color:#334155;color:#fff}.bucket-head{display:flex;justify-content:space-between;align-items:flex-start;font-size:12px;text-transform:uppercase;letter-spacing:.07em}.bucket-head span{border-radius:999px;padding:5px 10px;background:rgba(255,255,255,.65);font-size:13px;line-height:1;font-weight:950}.priority-bucket.dark .bucket-head span{background:#334155}.bucket-items{display:grid;gap:7px;margin-top:10px;max-height:110px;overflow:auto}.mini-task{padding:11px;border-radius:14px;background:#fff;text-align:left;border:1px solid rgba(15,23,42,.06);box-shadow:0 6px 14px rgba(15,23,42,.04)}.priority-bucket.dark .mini-task{background:#262626;color:#fff;border-color:#404040}.mini-task b{display:block;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mini-task span{font-size:11px;color:#64748b;margin-top:3px;display:block}.priority-bucket.dark .mini-task span{color:#cbd5e1}.empty{padding:14px;border:1px dashed rgba(15,23,42,.15);border-radius:14px;text-align:center;color:#94a3b8;font-size:12px;font-style:italic}.empty.wide{text-align:left}
.board{display:grid;grid-template-columns:repeat(3,minmax(320px,1fr));gap:18px;align-items:start}.group{min-width:0;background:rgba(255,255,255,.82);border:1px solid rgba(255,255,255,.76);backdrop-filter:blur(18px);border-radius:28px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 16px 40px rgba(15,23,42,.07);max-height:none}.group-head{padding:16px 18px;border-bottom:1px solid #eef2f7;display:flex;align-items:center;justify-content:space-between}.group-head h2{font-size:16px;text-transform:uppercase;letter-spacing:.1em;font-weight:950}.group-head p{font-size:12px;color:#64748b;margin-top:4px}.group-head span{font-weight:950;color:#64748b;background:#f1f5f9;padding:5px 10px;border-radius:999px}.group-body{padding:12px;overflow:visible}.category{border:1px solid;border-radius:18px;padding:11px;margin-bottom:11px}.cat-head{width:100%;display:flex;align-items:center;gap:8px;background:transparent;text-align:left;font-size:12px;font-weight:950;text-transform:uppercase;letter-spacing:.04em}.cat-count{margin-left:auto;padding:3px 8px;border-radius:999px}.cat-body{display:grid;gap:9px;margin-top:10px}.task-card{width:100%;background:#fff;border:1px solid rgba(15,23,42,.08);border-radius:16px;padding:13px;text-align:left;box-shadow:0 7px 18px rgba(15,23,42,.045);transition:.15s ease;cursor:grab}.task-card:hover{transform:translateY(-1px);box-shadow:0 12px 26px rgba(15,23,42,.08)}.task-card.dragging{opacity:.35}.task-title{font-size:14px;font-weight:950;white-space:normal;line-height:1.25;color:#0f172a}.task-meta{display:flex;align-items:center;gap:7px;margin-top:8px;font-size:12px;color:#475569}.channel{font-size:9px;font-weight:950;color:#fff;padding:4px 6px;border-radius:7px}.ai-title{margin-top:8px;color:#047857;font-size:13px;font-weight:950;line-height:1.35}.task-foot{display:flex;align-items:center;gap:5px;margin-top:10px}.pill{display:inline-flex;align-items:center;border:1px solid;border-radius:999px;padding:4px 8px;font-size:10px;font-weight:950;white-space:nowrap}.deadline{font-size:11px;color:#64748b;font-weight:850}.spacer{flex:1}.avatar-mini{width:24px;height:24px;border-radius:999px;display:grid;place-items:center;color:#fff;font-size:9px;font-weight:950}
.modal-bg{position:fixed;inset:0;background:rgba(15,23,42,.45);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:24px;z-index:20}.modal{width:920px;max-width:96vw;max-height:88vh;overflow:auto;border-radius:26px;background:#fff;box-shadow:0 30px 80px rgba(15,23,42,.25)}.modal-head{position:sticky;top:0;z-index:3;background:rgba(255,255,255,.88);backdrop-filter:blur(18px);border-bottom:1px solid #eef2f7;padding:18px 20px;display:flex;justify-content:space-between;gap:20px}.modal-kicker{font-size:10px;font-weight:900;color:#94a3b8;letter-spacing:.1em;text-transform:uppercase}.modal-title{font-size:22px;font-weight:950;letter-spacing:-.03em;margin-top:4px}.modal-actions{display:flex;gap:8px;align-items:center}.btn{padding:10px 13px;border-radius:13px;font-weight:900}.btn.ok{background:#ecfdf5;color:#047857;border:1px solid #a7f3d0}.btn.ghost{background:#f8fafc;color:#475569;border:1px solid #e2e8f0}.modal-body{padding:20px}.tag-row{display:flex;gap:7px;flex-wrap:wrap}.summary{margin:13px 0 16px;color:#475569;line-height:1.6;font-weight:600}.modal-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.panel{background:#f8fafc;border:1px solid #e2e8f0;border-radius:18px;padding:14px}.panel.full{margin-top:12px}.panel-title{font-size:10px;font-weight:950;color:#94a3b8;text-transform:uppercase;letter-spacing:.09em;margin-bottom:10px}.small-muted{color:#64748b;font-size:12px;margin-bottom:9px}.message-box{background:#fff;border-left:4px solid ${BRAND.gold};border-radius:15px;padding:12px;color:#334155;line-height:1.55}.attachments{display:flex;gap:7px;flex-wrap:wrap;margin-top:10px}.attachments span{background:#fff;border:1px solid #e2e8f0;border-radius:999px;padding:6px 9px;font-size:11px;font-weight:800;color:#475569}.field{display:flex;align-items:center;gap:9px;margin-bottom:10px}.field span{width:86px;color:#64748b;font-size:12px;font-weight:800}.field select{flex:1;border:1px solid #e2e8f0;border-radius:12px;padding:9px;background:#fff}.check{display:flex;align-items:center;gap:8px;color:#334155;font-size:12px;font-weight:800}.data-row{display:flex;justify-content:space-between;border-bottom:1px solid #e2e8f0;padding:8px 0;font-size:12px}.data-row:last-child{border-bottom:0}.data-row span{color:#64748b}.process{display:flex;gap:7px;flex-wrap:wrap}.process-item{display:flex;align-items:center;gap:7px}.process-item span{border:1px solid #f3dfba;background:#fff8ec;color:#8a5b17;border-radius:13px;padding:8px 10px;font-size:11px;font-weight:900}.process-item b{color:#cbd5e1}.comment{border-bottom:1px solid #e2e8f0;padding:9px 0;font-size:12px;color:#334155}.comment span{color:#94a3b8}.comment-input{display:flex;gap:8px;margin-top:10px}.comment-input input{flex:1;border:1px solid #e2e8f0;border-radius:13px;padding:11px}.comment-input button{border-radius:13px;background:${BRAND.navy};color:#fff;font-weight:900;padding:0 15px}.move-box{margin-top:12px;border-top:1px solid #e2e8f0;padding-top:14px}.move-groups{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}.move-groups button,.move-cats button{padding:11px;border-radius:14px;border:1px solid #e2e8f0;background:#fff;font-weight:900;color:#334155}.move-cats{display:flex;gap:8px;flex-wrap:wrap}.move-cats .back{color:#64748b}.move-cats button:disabled{opacity:.4;cursor:not-allowed}
.pro-hero{display:grid;grid-template-columns:minmax(330px,.62fr) minmax(900px,1.9fr) auto;align-items:center;padding:32px;border-radius:34px}.hero-eyebrow{font-size:12px;font-weight:950;letter-spacing:.14em;text-transform:uppercase;color:#f8c471;margin-bottom:10px}.pro-hero .hero-left{align-items:flex-start}.pro-hero h1{font-size:44px;font-weight:950;letter-spacing:-.07em;line-height:1}.pro-hero p{font-size:16px;line-height:1.65;color:rgba(255,255,255,.82);max-width:560px}.hero-dashboard{display:grid;grid-template-columns:repeat(9,minmax(94px,1fr));gap:10px;position:relative;z-index:1}.hero-dashboard:before{content:"";position:absolute;inset:-16px;border-radius:34px;background:linear-gradient(135deg,rgba(200,138,45,.2),rgba(255,255,255,.08));filter:blur(2px);z-index:-1}.dash-card{min-height:118px;text-align:left;border-radius:22px;padding:14px;background:linear-gradient(180deg,rgba(255,255,255,.18),rgba(255,255,255,.08));border:1px solid rgba(255,255,255,.2);color:#fff;box-shadow:inset 0 1px 0 rgba(255,255,255,.14),0 18px 36px rgba(0,0,0,.14);transition:.18s ease;position:relative;overflow:hidden}.dash-card:before{content:"";position:absolute;left:0;right:0;top:0;height:4px;background:rgba(255,255,255,.35)}.dash-card.total:before{background:#c88a2d}.dash-card.inbox:before{background:#60a5fa}.dash-card.progress:before{background:#f59e0b}.dash-card.done:before{background:#22c55e}.dash-card.critical:before{background:#111827}.dash-card.no-need:before{background:#94a3b8}.dash-card.high:before{background:#ef4444}.dash-card.medium:before{background:#f59e0b}.dash-card.low:before{background:#3b82f6}.dash-card.critical{background:linear-gradient(180deg,rgba(17,24,39,.92),rgba(17,24,39,.55))}.dash-card.no-need{background:linear-gradient(180deg,rgba(100,116,139,.34),rgba(255,255,255,.08))}.dash-card.high{background:linear-gradient(180deg,rgba(239,68,68,.30),rgba(255,255,255,.08))}.dash-card.medium{background:linear-gradient(180deg,rgba(245,158,11,.28),rgba(255,255,255,.08))}.dash-card.low{background:linear-gradient(180deg,rgba(59,130,246,.28),rgba(255,255,255,.08))}.dash-card:hover,.dash-card.active{transform:translateY(-3px);background:linear-gradient(180deg,rgba(255,255,255,.25),rgba(255,255,255,.10));border-color:rgba(255,216,156,.55);box-shadow:0 24px 50px rgba(0,0,0,.22),inset 0 1px 0 rgba(255,255,255,.18)}.dash-card span{display:block;font-size:11px;font-weight:950;color:rgba(255,255,255,.78);text-transform:uppercase;letter-spacing:.08em}.dash-card b{display:block;font-size:32px;line-height:.95;margin-top:12px;letter-spacing:-.06em;font-weight:950}.dash-card em{display:block;font-style:normal;font-size:9px;line-height:1.25;color:rgba(255,255,255,.72);font-weight:850;margin-top:9px}.priority-pro{overflow:visible;border-radius:26px}.priority-header{background:linear-gradient(90deg,rgba(255,255,255,.86),rgba(255,248,236,.94));border-bottom:1px solid #eef2f7}.priority-grid-pro{grid-template-columns:repeat(5,minmax(0,1fr));gap:14px;padding:16px}.bucket-head div{display:flex;flex-direction:column;gap:4px}.bucket-head small{font-size:10px;text-transform:none;letter-spacing:0;color:#64748b;font-weight:850}.priority-bucket.dark .bucket-head small{color:#cbd5e1}.single-board{grid-template-columns:minmax(420px,960px);justify-content:center}.single-board .group{max-width:960px;width:100%}.avatar-stack{display:flex;align-items:center}.avatar-stack .avatar-mini{margin-left:-7px;border:2px solid #fff}.avatar-stack .avatar-mini:first-child{margin-left:0}.avatar-more{width:24px;height:24px;border-radius:999px;background:#f1f5f9;color:#475569;display:grid;place-items:center;font-size:9px;font-weight:950;margin-left:-7px;border:2px solid #fff}.field.multi{align-items:flex-start}.assignee-grid{flex:1;display:flex;gap:7px;flex-wrap:wrap}.assignee-chip{display:flex;align-items:center;gap:7px;padding:7px 9px;border-radius:13px;border:1px solid #e2e8f0;background:#fff;color:#475569;font-size:12px;font-weight:850}.assignee-chip.active{border-color:#082b63;background:#eff6ff;color:#082b63}.assignee-chip i{font-style:normal;width:22px;height:22px;border-radius:999px;color:#fff;font-size:9px;font-weight:950;display:grid;place-items:center}
@media(max-width:1700px){.pro-hero{grid-template-columns:1fr}.hero-dashboard{grid-template-columns:repeat(3,1fr);width:100%}}
@media(max-width:1500px){.pro-hero{grid-template-columns:1fr}.hero-dashboard{grid-template-columns:repeat(3,1fr);width:100%}}
@media(max-width:1300px){.pro-hero{grid-template-columns:1fr}.hero-dashboard{grid-template-columns:repeat(2,1fr);width:100%}.priority-grid-pro{grid-template-columns:repeat(2,1fr)}.hero{align-items:flex-start;flex-direction:column}.hero-stats{grid-template-columns:repeat(4,1fr);width:100%}.priority-grid{grid-template-columns:repeat(2,1fr)}.board{grid-template-columns:1fr}.modal-grid{grid-template-columns:1fr}.sidebar{position:fixed;inset:0 auto 0 0;height:100vh}.sidebar.closed{transform:translateX(-100%);width:300px;min-width:300px}.main{padding:12px}.hero h1{font-size:28px}.group{max-height:none}.group-body{overflow:visible}}
@media(max-width:720px){.hero-stats{grid-template-columns:repeat(2,1fr)}.priority-grid{grid-template-columns:1fr}.modal-bg{padding:10px}.login-card{padding:22px}.hero{padding:20px}.hero p{font-size:14px}.board{grid-template-columns:1fr}.main{overflow:visible}.app-shell{overflow:visible}}
`;
