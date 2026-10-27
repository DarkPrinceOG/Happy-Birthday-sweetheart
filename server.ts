import express from 'express';
import crypto from 'crypto';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// In-memory rate limiting for password attempts
interface RateLimitRecord {
  attempts: number;
  lastAttempt: number;
  lockedUntil?: number;
}
const rateLimits = new Map<string, RateLimitRecord>();

// In-memory sessions
interface Session {
  createdAt: number;
  expiresAt: number;
}
const sessions = new Map<string, Session>();
const SESSION_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours

// Clean up expired sessions periodically
setInterval(() => {
  const now = Date.now();
  for (const [token, session] of sessions.entries()) {
    if (now > session.expiresAt) {
      sessions.delete(token);
    }
  }
  for (const [ip, record] of rateLimits.entries()) {
    if (now - record.lastAttempt > 15 * 60 * 1000) {
      rateLimits.delete(ip);
    }
  }
}, 60 * 1000);

// Helper for constant-time comparison
function secureCompare(a: string, b: string): boolean {
  const hashA = crypto.createHash('sha256').update(a.trim().toLowerCase()).digest();
  const hashB = crypto.createHash('sha256').update(b.trim().toLowerCase()).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

// Client IP resolver
function getClientIp(req: express.Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress || 'unknown-ip';
}

// Rate limiting middleware for /api/unlock
function rateLimitUnlock(req: express.Request, res: express.Response, next: express.NextFunction) {
  const ip = getClientIp(req);
  const now = Date.now();
  const record = rateLimits.get(ip) || { attempts: 0, lastAttempt: now };

  if (record.lockedUntil && now < record.lockedUntil) {
    const remainingSeconds = Math.ceil((record.lockedUntil - now) / 1000);
    res.status(429).json({
      success: false,
      error: `Too many attempts. The postman needs a rest. Please wait ${remainingSeconds}s.`,
      retryAfter: remainingSeconds,
    });
    return;
  }

  // Reset window if it has been more than 60s since last attempt
  if (now - record.lastAttempt > 60 * 1000) {
    record.attempts = 0;
  }

  rateLimits.set(ip, record);
  next();
}

// Full authentic letter content protected securely on the server
const LETTER_PAYLOAD = {
  recipient: "Ananya",
  greeting: "Hey, birthday girl. ❤️",
  paragraphs: [
    "First of all, happy birthday!",
    "I honestly don't know how to begin this letter, but I guess that's okay. I just wanted to make something a little different for you, something you could keep and look back at someday.",
    "I hope this new year of your life brings you a lot of happiness, beautiful memories, new experiences, and countless reasons to smile.",
    "You know, sometimes it's the little things about a person that make them special. The little conversations, the random moments, the silly things we laugh about, and the memories that stay with us long after the moment has passed.",
    "And I think those little things deserve to be appreciated more often.",
    "I hope you always have people around you who make you feel appreciated, understood, and comfortable being yourself. People who listen when you want to talk, keep you company when you need it, and remind you that even on difficult days, there's still something good waiting ahead.",
    "And most importantly, I hope you never forget to be kind to yourself.",
    "You deserve to enjoy your life, chase the things you dream about, make mistakes, learn, grow, and become whoever you want to be.",
    "I don't know what the future holds, and I don't think every special moment needs a big explanation. Sometimes, it's enough to be grateful for the people we meet and the memories we get to share with them.",
    "So here's a little birthday gift from my side. Nothing extravagant, just something I made with care, time, and a little thought.",
    "And there's something else I wanted to tell you.",
    "I think I've spent almost this entire October thinking about you, about the little things, the memories, and this very gift. Somewhere along the way, I decided that I wanted to make something special for your birthday, something that would make you smile.",
    "I had a little plan in my head, and I really hope everything turned out the way I'd imagined it. I put my time and effort into this because I genuinely wanted to.",
    "And if anything I've said or done has ever made you uncomfortable or hurt you in any way, I'm genuinely sorry. That was never what I wanted.",
    "I just want you to know that I like you for who you are. I like the way you are, and I hope you never feel that you have to change yourself just to be appreciated by someone.",
    "And honestly, there's something I still don't quite understand about myself.",
    "Sometimes, I'm genuinely exhausted. I feel like I've run out of energy, and I don't even plan on going anywhere. But then, somehow, when it comes to meeting you, I find a little strength somewhere inside me. I don't know where it comes from or why it happens. I just somehow manage to show up, even on days when I'm too tired to do much else.",
    "Like that day, I hadn't even planned on coming. I was really tired, but somehow, I still found myself there.",
    "I don't really have an explanation for it. I guess some moments just matter enough that, even when you're tired, a part of you still wants to be there.",
    "After this month, things might get a little different. I'll be busy with my exams and the projects I've been dreaming of working on, so I might not always be able to give you the same amount of time as before. But that doesn't mean the time we've shared wasn't meaningful to me.",
    "For now, enjoy your birthday, make beautiful memories, laugh a little louder, and take care of yourself. And please, keep focusing on your studies and the things that matter to you.",
    "One little piece of advice from my side: always remember the love and effort your mom puts into your life. She's a great mother, and I hope you always cherish that bond with her, even when you don't agree on everything.",
    "And now, before I end this letter, there's just one little thing left.",
    "A gift from me to you. 🌹"
  ],
  giftButtonLabel: "OPEN YOUR DIGITAL GIFT 💌",
  roseExperience: {
    messages: [
      "And, of course, a rose for the birthday girl. 🌹",
      "A fresh rose for a beautiful girl, from my side.",
      "I hope it makes you smile, even if just for a moment."
    ],
    finalWishes: [
      "Happy birthday, Ananya. ❤️",
      "I hope life gives you beautiful reasons to smile, the courage to chase your dreams, and people who appreciate you for exactly who you are.",
      "Stay happy, keep smiling, and take good care of yourself.",
      "With all my heart,"
    ],
    signature: "~ Aryan / Unknown"
  }
};

// POST /api/unlock - verify password server-side
app.post('/api/unlock', rateLimitUnlock, (req, res) => {
  const { password } = req.body || {};
  const ip = getClientIp(req);
  const now = Date.now();
  const record = rateLimits.get(ip) || { attempts: 0, lastAttempt: now };

  if (typeof password !== 'string' || !password.trim()) {
    res.status(400).json({ success: false, error: "Please enter the secret key." });
    return;
  }

  // Configured password or safe default
  const configuredPassword = process.env.LETTER_PASSWORD || process.env.BIRTHDAY_KEY || 'ananya';
  
  // Also support common reasonable variants for the user (case-insensitive)
  const isMatch = secureCompare(password, configuredPassword) || 
                  secureCompare(password, 'ananya') ||
                  secureCompare(password, '1027');

  if (!isMatch) {
    record.attempts += 1;
    record.lastAttempt = now;
    if (record.attempts >= 5) {
      record.lockedUntil = now + 60 * 1000; // Lock for 60s
      rateLimits.set(ip, record);
      res.status(429).json({
        success: false,
        error: "Too many incorrect attempts. The postman needs a 60s pause.",
        retryAfter: 60,
      });
      return;
    }
    rateLimits.set(ip, record);
    const attemptsLeft = 5 - record.attempts;
    res.status(401).json({
      success: false,
      error: "The postman shakes his head — key incorrect.",
      attemptsLeft,
    });
    return;
  }

  // Success: reset rate limit attempts
  record.attempts = 0;
  record.lockedUntil = undefined;
  rateLimits.set(ip, record);

  // Generate cryptographic session token
  const token = crypto.randomBytes(32).toString('hex');
  sessions.set(token, {
    createdAt: now,
    expiresAt: now + SESSION_TTL_MS,
  });

  res.json({
    success: true,
    token,
  });
});

// Middleware to protect letter and gift content
function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: "Postman requires the key before handing over the letter." });
    return;
  }

  const token = authHeader.slice(7).trim();
  const session = sessions.get(token);

  if (!session || Date.now() > session.expiresAt) {
    if (session) sessions.delete(token);
    res.status(401).json({ error: "Session expired or invalid. Please re-enter the secret key." });
    return;
  }

  next();
}

// GET /api/letter-content - authenticated retrieval
app.get('/api/letter-content', requireAuth, (_req, res) => {
  res.json({
    success: true,
    letter: LETTER_PAYLOAD,
  });
});

// System health endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', secured: true });
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  // Explicitly serve static public assets (including audio)
  app.use('/assets', express.static(path.resolve(__dirname, 'public/assets')));

  if (!isProd) {
    // Dynamic import vite dev server middlewares
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production serve dist build
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[A Letter for Ananya] Server listening on http://0.0.0.0:${PORT} (${isProd ? 'production' : 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
