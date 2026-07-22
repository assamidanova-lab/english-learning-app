import { useState, useEffect } from "react";

const ALL_WORDS = [
  {en:"achieve",ru:"достигать"},{en:"suggest",ru:"предлагать"},{en:"consider",ru:"рассматривать"},
  {en:"involve",ru:"включать"},{en:"require",ru:"требовать"},{en:"opportunity",ru:"возможность"},
  {en:"behavior",ru:"поведение"},{en:"influence",ru:"влиять"},{en:"significant",ru:"значительный"},
  {en:"available",ru:"доступный"},{en:"approach",ru:"подход"},{en:"establish",ru:"устанавливать"},
  {en:"particular",ru:"особый"},{en:"response",ru:"ответ"},{en:"continue",ru:"продолжать"},
  {en:"evidence",ru:"доказательство"},{en:"decision",ru:"решение"},{en:"encourage",ru:"поощрять"},
  {en:"experience",ru:"опыт"},{en:"improve",ru:"улучшать"},{en:"challenge",ru:"вызов"},
  {en:"community",ru:"сообщество"},{en:"environment",ru:"окружающая среда"},{en:"purpose",ru:"цель"},
  {en:"relationship",ru:"отношения"},{en:"recognize",ru:"признавать"},{en:"circumstances",ru:"обстоятельства"},
  {en:"perspective",ru:"перспектива"},{en:"consequence",ru:"последствие"},{en:"responsibility",ru:"ответственность"},
  {en:"awareness",ru:"осознанность"},{en:"essential",ru:"существенный"},{en:"negotiate",ru:"договариваться"},
  {en:"assumption",ru:"предположение"},{en:"commitment",ru:"обязательство"},{en:"cooperation",ru:"сотрудничество"},
  {en:"demonstrate",ru:"демонстрировать"},{en:"efficient",ru:"эффективный"},{en:"emphasize",ru:"подчёркивать"},
  {en:"enormous",ru:"огромный"},{en:"evaluate",ru:"оценивать"},{en:"expectation",ru:"ожидание"},
  {en:"foundation",ru:"основа"},{en:"generate",ru:"создавать"},{en:"gradually",ru:"постепенно"},
  {en:"implement",ru:"реализовывать"},{en:"indicate",ru:"указывать"},{en:"initiative",ru:"инициатива"},
  {en:"innovative",ru:"инновационный"},{en:"insight",ru:"понимание"},{en:"inspiration",ru:"вдохновение"},
  {en:"intention",ru:"намерение"},{en:"interpret",ru:"интерпретировать"},{en:"investigate",ru:"расследовать"},
  {en:"justify",ru:"оправдывать"},{en:"maintain",ru:"поддерживать"},{en:"manipulate",ru:"манипулировать"},
  {en:"meanwhile",ru:"тем временем"},{en:"moderate",ru:"умеренный"},{en:"monitor",ru:"отслеживать"},
  {en:"motivate",ru:"мотивировать"},{en:"navigate",ru:"ориентироваться"},{en:"necessary",ru:"необходимый"},
  {en:"objective",ru:"цель"},{en:"obstacle",ru:"препятствие"},{en:"obtain",ru:"получать"},
  {en:"outcome",ru:"результат"},{en:"overcome",ru:"преодолевать"},{en:"participate",ru:"участвовать"},
  {en:"patience",ru:"терпение"},{en:"perceive",ru:"воспринимать"},{en:"perform",ru:"выполнять"},
  {en:"potential",ru:"потенциал"},{en:"predict",ru:"предсказывать"},{en:"presence",ru:"присутствие"},
  {en:"priority",ru:"приоритет"},{en:"procedure",ru:"процедура"},{en:"productive",ru:"продуктивный"},
  {en:"progress",ru:"прогресс"},{en:"promote",ru:"продвигать"},{en:"propose",ru:"предлагать"},
  {en:"provide",ru:"предоставлять"},{en:"realistic",ru:"реалистичный"},{en:"refer",ru:"ссылаться"},
  {en:"reflect",ru:"размышлять"},{en:"relevant",ru:"актуальный"},{en:"remarkable",ru:"замечательный"},
  {en:"resolve",ru:"решать проблему"},{en:"resource",ru:"ресурс"},{en:"restrict",ru:"ограничивать"},
  {en:"reveal",ru:"раскрывать"},{en:"strategy",ru:"стратегия"},{en:"strengthen",ru:"укреплять"},
  {en:"struggle",ru:"бороться"},{en:"succeed",ru:"добиться успеха"},{en:"tendency",ru:"тенденция"},
  {en:"tension",ru:"напряжение"},{en:"typical",ru:"типичный"},{en:"ultimately",ru:"в конечном счёте"},
  {en:"unique",ru:"уникальный"},{en:"utilize",ru:"использовать"},{en:"valuable",ru:"ценный"},
  {en:"variety",ru:"разнообразие"},{en:"virtually",ru:"практически"},{en:"widespread",ru:"широко распространённый"},
  {en:"willing",ru:"готовый"},{en:"accomplish",ru:"достигать"},{en:"accurate",ru:"точный"},
  {en:"acknowledge",ru:"признавать"},{en:"adapt",ru:"адаптироваться"},{en:"adequate",ru:"достаточный"},
  {en:"admire",ru:"восхищаться"},{en:"advantage",ru:"преимущество"},{en:"affect",ru:"влиять"},
  {en:"afford",ru:"позволять себе"},{en:"aggressive",ru:"агрессивный"},{en:"ambitious",ru:"амбициозный"},
  {en:"analyze",ru:"анализировать"},{en:"anticipate",ru:"предвидеть"},{en:"anxiety",ru:"тревога"},
  {en:"apparent",ru:"очевидный"},{en:"appreciate",ru:"ценить"},{en:"appropriate",ru:"подходящий"},
  {en:"argue",ru:"спорить"},{en:"arrange",ru:"организовывать"},{en:"aspect",ru:"аспект"},
  {en:"assess",ru:"оценивать"},{en:"assist",ru:"помогать"},{en:"attitude",ru:"позиция"},
  {en:"attract",ru:"привлекать"},{en:"authority",ru:"авторитет"},{en:"avoid",ru:"избегать"},
  {en:"balance",ru:"баланс"},{en:"barely",ru:"едва"},{en:"benefit",ru:"польза"},
  {en:"blame",ru:"винить"},{en:"boundary",ru:"граница"},{en:"capable",ru:"способный"},
  {en:"capture",ru:"захватывать"},{en:"certain",ru:"уверенный"},{en:"clarify",ru:"уточнять"},
  {en:"colleague",ru:"коллега"},{en:"comfort",ru:"комфорт"},{en:"compare",ru:"сравнивать"},
  {en:"compete",ru:"конкурировать"},{en:"complaint",ru:"жалоба"},{en:"complex",ru:"сложный"},
  {en:"concentrate",ru:"сосредотачиваться"},{en:"concept",ru:"концепция"},{en:"concern",ru:"беспокойство"},
  {en:"conclude",ru:"заключать"},{en:"confident",ru:"уверенный в себе"},{en:"conflict",ru:"конфликт"},
  {en:"confuse",ru:"путать"},{en:"conscious",ru:"сознательный"},{en:"consistent",ru:"последовательный"},
  {en:"contribute",ru:"вносить вклад"},{en:"convince",ru:"убеждать"},{en:"cope",ru:"справляться"},
  {en:"creative",ru:"творческий"},{en:"critical",ru:"критический"},{en:"curiosity",ru:"любопытство"},
  {en:"debate",ru:"дебаты"},{en:"decline",ru:"снижаться"},{en:"define",ru:"определять"},
  {en:"delay",ru:"задержка"},{en:"deliver",ru:"доставлять"},{en:"demand",ru:"спрос"},
  {en:"depend",ru:"зависеть"},{en:"describe",ru:"описывать"},{en:"deserve",ru:"заслуживать"},
  {en:"desire",ru:"желание"},{en:"despite",ru:"несмотря на"},{en:"detect",ru:"обнаруживать"},
  {en:"determine",ru:"определять"},{en:"develop",ru:"развивать"},{en:"discipline",ru:"дисциплина"},
  {en:"discover",ru:"открывать"},{en:"discuss",ru:"обсуждать"},{en:"diverse",ru:"разнообразный"},
  {en:"dominate",ru:"доминировать"},{en:"doubt",ru:"сомнение"},{en:"dynamic",ru:"динамичный"},
  {en:"effective",ru:"эффективный"},{en:"eliminate",ru:"устранять"},{en:"emerge",ru:"появляться"},
  {en:"emotion",ru:"эмоция"},{en:"enable",ru:"позволять"},{en:"engage",ru:"вовлекать"},
  {en:"enhance",ru:"улучшать"},{en:"ensure",ru:"обеспечивать"},{en:"entire",ru:"весь"},
  {en:"equally",ru:"одинаково"},{en:"especially",ru:"особенно"},{en:"estimate",ru:"оценка"},
  {en:"examine",ru:"изучать"},{en:"exceed",ru:"превышать"},{en:"exist",ru:"существовать"},
  {en:"expand",ru:"расширять"},{en:"explain",ru:"объяснять"},{en:"explore",ru:"исследовать"},
  {en:"express",ru:"выражать"},{en:"extend",ru:"продлевать"},{en:"facilitate",ru:"облегчать"},
  {en:"factor",ru:"фактор"},{en:"failure",ru:"неудача"},{en:"familiar",ru:"знакомый"},
  {en:"feature",ru:"особенность"},{en:"flexible",ru:"гибкий"},{en:"focus",ru:"фокусироваться"},
  {en:"forecast",ru:"прогнозировать"},{en:"frequent",ru:"частый"},{en:"frustrate",ru:"расстраивать"},
  {en:"fundamental",ru:"фундаментальный"},{en:"gather",ru:"собирать"},{en:"genuine",ru:"искренний"},
  {en:"global",ru:"глобальный"},{en:"growth",ru:"рост"},{en:"handle",ru:"справляться"},
  {en:"harmful",ru:"вредный"},{en:"highlight",ru:"выделять"},{en:"identify",ru:"выявлять"},
  {en:"ignore",ru:"игнорировать"},{en:"illustrate",ru:"иллюстрировать"},{en:"imagine",ru:"представлять"},
  {en:"immediate",ru:"немедленный"},{en:"impact",ru:"воздействие"},{en:"imply",ru:"подразумевать"},
  {en:"increase",ru:"увеличивать"},{en:"independent",ru:"независимый"},{en:"inevitable",ru:"неизбежный"},
  {en:"inform",ru:"информировать"},{en:"intense",ru:"интенсивный"},{en:"interact",ru:"взаимодействовать"},
  {en:"internal",ru:"внутренний"},{en:"introduce",ru:"представлять"},{en:"invest",ru:"инвестировать"},
  {en:"issue",ru:"проблема"},{en:"judge",ru:"судить"},{en:"knowledge",ru:"знания"},
  {en:"lack",ru:"нехватка"},{en:"launch",ru:"запускать"},{en:"leadership",ru:"лидерство"},
  {en:"limit",ru:"ограничивать"},{en:"logical",ru:"логичный"},{en:"manage",ru:"управлять"},
  {en:"meaningful",ru:"осмысленный"},{en:"measure",ru:"измерять"},{en:"mention",ru:"упоминать"},
  {en:"method",ru:"метод"},{en:"minimize",ru:"минимизировать"},{en:"mistake",ru:"ошибка"},
  {en:"modify",ru:"изменять"},{en:"mutual",ru:"взаимный"},{en:"negative",ru:"отрицательный"},
  {en:"notice",ru:"замечать"},{en:"obvious",ru:"очевидный"},{en:"opinion",ru:"мнение"},
  {en:"organize",ru:"организовывать"},{en:"original",ru:"оригинальный"},{en:"overall",ru:"в целом"},
  {en:"pattern",ru:"закономерность"},{en:"permanent",ru:"постоянный"},{en:"physical",ru:"физический"},
  {en:"positive",ru:"положительный"},{en:"powerful",ru:"мощный"},{en:"practical",ru:"практичный"},
  {en:"precise",ru:"точный"},{en:"prepare",ru:"готовить"},{en:"prevent",ru:"предотвращать"},
  {en:"previous",ru:"предыдущий"},{en:"primary",ru:"главный"},{en:"principle",ru:"принцип"},
  {en:"process",ru:"процесс"},{en:"professional",ru:"профессиональный"},{en:"protect",ru:"защищать"},
  {en:"prove",ru:"доказывать"},{en:"quality",ru:"качество"},{en:"rapid",ru:"быстрый"},
  {en:"react",ru:"реагировать"},{en:"reasonable",ru:"разумный"},{en:"receive",ru:"получать"},
  {en:"reduce",ru:"уменьшать"},{en:"refuse",ru:"отказываться"},{en:"replace",ru:"заменять"},
  {en:"represent",ru:"представлять"},{en:"research",ru:"исследование"},{en:"resist",ru:"сопротивляться"},
  {en:"result",ru:"результат"},{en:"retain",ru:"удерживать"},{en:"risk",ru:"риск"},
  {en:"role",ru:"роль"},{en:"satisfy",ru:"удовлетворять"},{en:"select",ru:"выбирать"},
  {en:"sensitive",ru:"чувствительный"},{en:"separate",ru:"разделять"},{en:"serious",ru:"серьёзный"},
  {en:"share",ru:"делиться"},{en:"shift",ru:"сдвиг"},{en:"similar",ru:"похожий"},
  {en:"simplify",ru:"упрощать"},{en:"skill",ru:"навык"},{en:"specific",ru:"конкретный"},
  {en:"stable",ru:"стабильный"},{en:"standard",ru:"стандарт"},{en:"statement",ru:"заявление"},
  {en:"status",ru:"статус"},{en:"structure",ru:"структура"},{en:"suitable",ru:"подходящий"},
  {en:"surprise",ru:"удивлять"},{en:"sustainable",ru:"устойчивый"},{en:"task",ru:"задача"},
  {en:"technique",ru:"техника"},{en:"temporary",ru:"временный"},{en:"theory",ru:"теория"},
  {en:"therefore",ru:"поэтому"},{en:"threat",ru:"угроза"},{en:"transfer",ru:"передавать"},
  {en:"transform",ru:"преобразовывать"},{en:"trend",ru:"тенденция"},{en:"trust",ru:"доверие"},
  {en:"uncertain",ru:"неопределённый"},{en:"unfortunately",ru:"к сожалению"},{en:"update",ru:"обновлять"},
  {en:"upset",ru:"расстраивать"},{en:"urgent",ru:"срочный"},{en:"useful",ru:"полезный"},
  {en:"version",ru:"версия"},{en:"vision",ru:"видение"},{en:"volunteer",ru:"волонтёр"},
  {en:"waste",ru:"тратить впустую"},{en:"weakness",ru:"слабость"},{en:"whereas",ru:"тогда как"},
  {en:"worthy",ru:"достойный"},{en:"acquire",ru:"приобретать"},{en:"active",ru:"активный"},
  {en:"adjust",ru:"регулировать"},{en:"advanced",ru:"продвинутый"},{en:"alternative",ru:"альтернатива"},
  {en:"annual",ru:"ежегодный"},{en:"apply",ru:"применять"},{en:"approve",ru:"одобрять"},
  {en:"associate",ru:"ассоциировать"},{en:"assume",ru:"предполагать"},{en:"attempt",ru:"попытка"},
  {en:"attend",ru:"посещать"},{en:"broad",ru:"широкий"},{en:"budget",ru:"бюджет"},
  {en:"category",ru:"категория"},{en:"characteristic",ru:"характеристика"},{en:"choose",ru:"выбирать"},
  {en:"claim",ru:"утверждать"},{en:"combine",ru:"совмещать"},{en:"communicate",ru:"общаться"},
  {en:"competition",ru:"конкуренция"},{en:"complete",ru:"завершать"},{en:"comprehensive",ru:"всесторонний"},
  {en:"condition",ru:"условие"},{en:"contain",ru:"содержать"},{en:"context",ru:"контекст"},
  {en:"contrast",ru:"контраст"},{en:"control",ru:"контролировать"},{en:"convert",ru:"преобразовывать"},
  {en:"crucial",ru:"решающий"},{en:"cultural",ru:"культурный"},{en:"currently",ru:"в настоящее время"},
  {en:"external",ru:"внешний"},{en:"extreme",ru:"крайний"},{en:"formal",ru:"формальный"},
  {en:"goal",ru:"цель"},{en:"hypothesis",ru:"гипотеза"},{en:"individual",ru:"индивидуальный"},
  {en:"layer",ru:"слой"},{en:"normal",ru:"нормальный"},{en:"publish",ru:"публиковать"},
  {en:"symbol",ru:"символ"},{en:"actually",ru:"на самом деле"},{en:"admit",ru:"признавать"},
  {en:"agreement",ru:"соглашение"},{en:"allow",ru:"позволять"},{en:"amount",ru:"количество"},
  {en:"appear",ru:"появляться"},{en:"article",ru:"статья"},{en:"belong",ru:"принадлежать"},
  {en:"bond",ru:"связь"},{en:"bother",ru:"беспокоить"},{en:"burden",ru:"бремя"},
  {en:"cautious",ru:"осторожный"},{en:"chance",ru:"шанс"},{en:"character",ru:"характер"},
  {en:"clearly",ru:"ясно"},{en:"collect",ru:"собирать"},{en:"component",ru:"компонент"},
  {en:"confirm",ru:"подтверждать"},{en:"contact",ru:"контакт"},{en:"cover",ru:"охватывать"},
  {en:"daily",ru:"ежедневный"},{en:"deal",ru:"иметь дело"},{en:"decade",ru:"десятилетие"},
  {en:"deep",ru:"глубокий"},{en:"design",ru:"дизайн"},{en:"detail",ru:"деталь"},
  {en:"direction",ru:"направление"},{en:"draw",ru:"рисовать"},{en:"drop",ru:"падать"},
  {en:"earn",ru:"зарабатывать"},{en:"ease",ru:"лёгкость"},{en:"energy",ru:"энергия"},
  {en:"enter",ru:"входить"},{en:"event",ru:"событие"},{en:"eventually",ru:"в конце концов"},
  {en:"exactly",ru:"именно"},{en:"example",ru:"пример"},{en:"expect",ru:"ожидать"},
  {en:"face",ru:"сталкиваться"},{en:"fact",ru:"факт"},{en:"fall",ru:"падать"},
  {en:"fast",ru:"быстрый"},{en:"feel",ru:"чувствовать"},{en:"figure",ru:"фигура"},
  {en:"finally",ru:"наконец"},{en:"fit",ru:"подходить"},{en:"follow",ru:"следовать"},
  {en:"force",ru:"сила"},{en:"form",ru:"форма"},{en:"forward",ru:"вперёд"},
  {en:"free",ru:"свободный"},{en:"full",ru:"полный"},{en:"further",ru:"дальнейший"},
  {en:"gain",ru:"получать"},{en:"happen",ru:"случаться"},{en:"hard",ru:"трудный"},
  {en:"hold",ru:"держать"},{en:"however",ru:"однако"},{en:"huge",ru:"огромный"},
  {en:"human",ru:"человеческий"},{en:"idea",ru:"идея"},{en:"important",ru:"важный"},
  {en:"include",ru:"включать"},{en:"indeed",ru:"действительно"},{en:"instead",ru:"вместо"},
];

const WEEK_SIZE = 20;
const USERS = [
  { id: "zhuldyz", name: "Жулдыз", emoji: "👩" },
  { id: "ardak", name: "Ардак", emoji: "👨" },
];

function getStorageKey(userId) { return `english_app_v3_${userId}`; }

function loadUserState(userId) {
  try {
    const saved = localStorage.getItem(getStorageKey(userId));
    if (saved) return JSON.parse(saved);
  } catch {}
  return null;
}

function saveUserState(userId, state) {
  try {
    localStorage.setItem(getStorageKey(userId), JSON.stringify(state));
  } catch {}
}

function getInitialState() {
  return {
    currentWeek: 0,
    weekStartedAt: Date.now(),
    learnedWordIndices: [],
    failedWords: [],
    reviewQueue: [],
    practiceHistory: {},
    totalPractices: 0,
    totalCorrect: 0,
  };
}

function getWeekWords(state) {
  const baseStart = state.currentWeek * WEEK_SIZE;
  const newWords = ALL_WORDS.slice(baseStart, baseStart + WEEK_SIZE);
  const failedWordObjects = state.failedWords || [];
  const combined = [...failedWordObjects];
  for (const w of newWords) {
    if (!combined.find(fw => fw.en === w.en)) combined.push(w);
  }
  return combined.slice(0, WEEK_SIZE + failedWordObjects.length);
}

function speak(word) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(word);
    u.lang = 'en-US'; u.rate = 0.85;
    window.speechSynthesis.speak(u);
  }
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [state, setState] = useState(null);
  const [activeTab, setActiveTab] = useState("learn");
  const [sentences, setSentences] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showWords, setShowWords] = useState(true);
  const [reviewAnswers, setReviewAnswers] = useState({});
  const [reviewResults, setReviewResults] = useState(null);

  function selectUser(user) {
    setCurrentUser(user);
    sessionStorage.setItem('english_current_user', user.id);
    const saved = loadUserState(user.id) || getInitialState();
    setState(saved);
  }

  function logout() {
    sessionStorage.removeItem('english_current_user');
    setCurrentUser(null);
    setState(null);
    setSentences({});
    setFeedback(null);
    setActiveTab("learn");
  }

  useEffect(() => {
    if (currentUser && state) saveUserState(currentUser.id, state);
  }, [state, currentUser]);

  // Auto-restore session on page refresh
  useEffect(() => {
    const savedUserId = sessionStorage.getItem('english_current_user');
    if (savedUserId && !currentUser) {
      const user = USERS.find(u => u.id === savedUserId);
      if (user) {
        setCurrentUser(user);
        const saved = loadUserState(user.id) || getInitialState();
        setState(saved);
      }
    }
  }, []);

  if (!currentUser) {
    return (
      <div style={{ minHeight: "100vh", background: "#FAFAFA", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif" }}>
        <div style={{ background: "#fff", border: "1px solid #E5E5E5", borderRadius: 16, padding: "40px 32px", width: "100%", maxWidth: 360, textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🇬🇧</div>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>English B1–B2</div>
          <div style={{ fontSize: 13, color: "#888", marginBottom: 32 }}>20 слов в неделю · Выбери аккаунт</div>
          {USERS.map(user => (
            <button key={user.id} onClick={() => selectUser(user)}
              style={{ width: "100%", padding: "16px", background: "#fff", border: "1px solid #E5E5E5", borderRadius: 10, cursor: "pointer", marginBottom: 10, display: "flex", alignItems: "center", gap: 14, fontSize: 16, fontWeight: 600, transition: "border-color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#111"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#E5E5E5"}>
              <span style={{ fontSize: 28 }}>{user.emoji}</span>
              <span>{user.name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (!state) return null;

  const weekWords = getWeekWords(state);
  const failedCount = (state.failedWords || []).length;
  const wordsLearned = state.learnedWordIndices.length * WEEK_SIZE;
  const accuracy = state.totalPractices > 0 ? Math.round((state.totalCorrect / state.totalPractices) * 100) : 0;
  const reviewDue = (state.reviewQueue || []).filter(item => Date.now() - item.addedAt >= 7 * 24 * 60 * 60 * 1000);
  const weekKey = `week_${state.currentWeek}`;
  const practicesToday = (state.practiceHistory[weekKey] || []).length;
  const daysLeft = Math.max(0, Math.ceil((state.weekStartedAt + 7*24*60*60*1000 - Date.now()) / (24*60*60*1000)));

  async function checkSentences() {
    const filled = weekWords.filter(w => (sentences[w.en] || "").trim());
    if (filled.length === 0) { alert("Напиши хотя бы одно предложение!"); return; }
    setLoading(true); setFeedback(null);
    const wordList = filled.map(w => `"${w.en}" (${w.ru}): "${sentences[w.en]}"`).join("\n");
    const prompt = `You are a friendly English teacher for a B1-B2 Russian speaker.
Student wrote sentences for ${filled.length} words:
${wordList}
Return JSON array with ${filled.length} objects:
[{"word": "english word", "correct": true/false, "feedback": "comment in Russian", "corrected": "fixed sentence or null"}]
Be encouraging. Mark mostly-correct sentences as correct. Return ONLY the JSON.`;
    try {
      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      const text = (data.text || "").trim().replace(/```json|```/g, "");
      const results = JSON.parse(text);
      setFeedback(results);
      const correct = results.filter(r => r.correct).length;
      const newHistory = { ...state.practiceHistory };
      if (!newHistory[weekKey]) newHistory[weekKey] = [];
      newHistory[weekKey].push({ date: Date.now(), correct, total: weekWords.length });
      setState(prev => ({ ...prev, totalPractices: prev.totalPractices + weekWords.length, totalCorrect: prev.totalCorrect + correct, practiceHistory: newHistory }));
    } catch { alert("Ошибка. Попробуй ещё раз."); }
    setLoading(false);
  }

  function nextWeek() {
    const newQueue = [...(state.reviewQueue || [])];
    weekWords.forEach(w => newQueue.push({ word: w.en, ru: w.ru, addedAt: Date.now() }));
    setState(prev => ({
      ...prev,
      currentWeek: prev.currentWeek + 1,
      weekStartedAt: Date.now(),
      learnedWordIndices: [...prev.learnedWordIndices, prev.currentWeek],
      failedWords: [],
      reviewQueue: newQueue,
    }));
    setSentences({}); setFeedback(null);
  }

  function checkReview() {
    const results = {};
    const stillFailing = [];
    reviewDue.forEach(item => {
      const answer = (reviewAnswers[item.word] || "").trim().toLowerCase();
      const expected = item.ru.toLowerCase();
      const correct = expected.split(" ").some(w => w.length > 3 && answer.includes(w.slice(0,4))) || answer === expected;
      results[item.word] = { correct, expected: item.ru };
      if (!correct) stillFailing.push(item);
    });
    setReviewResults(results);
    // Add failed review words to next week's batch
    const newFailed = [...(state.failedWords || []), ...stillFailing.map(item => ({ en: item.word, ru: item.ru }))];
    const uniqueFailed = newFailed.filter((w, i, arr) => arr.findIndex(x => x.en === w.en) === i);
    setState(prev => ({
      ...prev,
      failedWords: uniqueFailed,
      reviewQueue: (prev.reviewQueue || []).filter(item => !reviewDue.find(w => w.word === item.word)),
    }));
  }

  const c = { fontFamily: "'Inter', -apple-system, sans-serif", minHeight: "100vh", background: "#FAFAFA", color: "#111" };

  return (
    <div style={c}>
      {/* Header */}
      <div style={{ background: "#111", color: "#fff", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 20 }}>{currentUser.emoji}</span>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{currentUser.name}</div>
            <div style={{ fontSize: 11, color: "#888" }}>English B1–B2</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 700, fontSize: 17 }}>{wordsLearned}</div>
            <div style={{ color: "#888", fontSize: 10, textTransform: "uppercase" }}>слов</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 700, fontSize: 17 }}>{accuracy}%</div>
            <div style={{ color: "#888", fontSize: 10, textTransform: "uppercase" }}>точность</div>
          </div>
          <button onClick={logout} style={{ background: "none", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", padding: "6px 12px", borderRadius: 6, cursor: "pointer", fontSize: 12 }}>
            Выйти
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, background: "#E5E5E5" }}>
        <div style={{ height: "100%", background: "#111", width: `${(state.learnedWordIndices.length * WEEK_SIZE / ALL_WORDS.length) * 100}%`, transition: "width 0.5s" }} />
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", background: "#fff", borderBottom: "1px solid #E5E5E5" }}>
        {[
          { key: "learn", label: `Неделя ${state.currentWeek + 1}` },
          { key: "review", label: `Повторение${reviewDue.length > 0 ? ` (${reviewDue.length})` : ""}` },
          { key: "stats", label: "Прогресс" },
        ].map(tab => (
          <button key={tab.key} onClick={() => { setActiveTab(tab.key); setReviewResults(null); setReviewAnswers({}); }}
            style={{ padding: "12px 18px", border: "none", background: "none", cursor: "pointer", fontSize: 13,
              fontWeight: activeTab === tab.key ? 600 : 400,
              color: activeTab === tab.key ? "#111" : "#888",
              borderBottom: activeTab === tab.key ? "2px solid #111" : "2px solid transparent", marginBottom: -1 }}>
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "18px 16px" }}>

        {/* LEARN TAB */}
        {activeTab === "learn" && (
          <div>
            {/* Info bar */}
            <div style={{ background: "#fff", border: "1px solid #E5E5E5", borderRadius: 8, padding: "12px 16px", marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Неделя {state.currentWeek + 1} · {weekWords.length} слов</div>
                <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>
                  {practicesToday > 0 ? `Попыток: ${practicesToday}` : "Первая попытка"}
                  {failedCount > 0 && <span style={{ color: "#DC2626", marginLeft: 8 }}>+ {failedCount} невыученных</span>}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{daysLeft}</div>
                <div style={{ fontSize: 11, color: "#888" }}>дней</div>
              </div>
            </div>

            {/* Words toggle */}
            <button onClick={() => setShowWords(!showWords)}
              style={{ width: "100%", padding: "10px 16px", background: "#fff", border: "1px solid #E5E5E5", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 500, marginBottom: 12, display: "flex", justifyContent: "space-between" }}>
              <span>📚 Слова этой недели ({weekWords.length})</span>
              <span style={{ color: "#888" }}>{showWords ? "▲" : "▼"}</span>
            </button>

            {showWords && (
              <div style={{ background: "#fff", border: "1px solid #E5E5E5", borderRadius: 8, marginBottom: 14, overflow: "hidden" }}>
                {weekWords.map((word, i) => (
                  <div key={word.en} style={{ display: "flex", alignItems: "center", padding: "9px 14px", borderBottom: i < weekWords.length - 1 ? "1px solid #F5F5F5" : "none",
                    background: (state.failedWords||[]).find(f=>f.en===word.en) ? "#FFF5F5" : "transparent" }}>
                    <span style={{ fontSize: 11, color: "#bbb", width: 22, flexShrink: 0 }}>{i+1}</span>
                    <span style={{ fontWeight: 600, fontSize: 14, flex: 1 }}>{word.en}</span>
                    <span style={{ fontSize: 13, color: "#888", flex: 1 }}>{word.ru}</span>
                    {(state.failedWords||[]).find(f=>f.en===word.en) && <span style={{ fontSize: 10, color: "#DC2626", marginRight: 6 }}>повтор</span>}
                    <button onClick={() => speak(word.en)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 17 }}>🔊</button>
                  </div>
                ))}
              </div>
            )}

            {/* Sentences */}
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 10, color: "#555", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {feedback ? "Результаты" : `Напиши ${weekWords.length} предложений`}
            </div>

            {weekWords.map((word, i) => (
              <div key={word.en} style={{ marginBottom: 10, background: "#fff", border: "1px solid #E5E5E5", borderRadius: 8, overflow: "hidden" }}>
                <div style={{ padding: "9px 14px", borderBottom: "1px solid #F5F5F5", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>{word.en}</span>
                  <span style={{ fontSize: 12, color: "#888" }}>{word.ru}</span>
                  <button onClick={() => speak(word.en)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 15, marginLeft: "auto" }}>🔊</button>
                </div>
                <div style={{ padding: "9px 14px" }}>
                  <input type="text" value={sentences[word.en] || ""} disabled={!!feedback}
                    onChange={e => setSentences(prev => ({ ...prev, [word.en]: e.target.value }))}
                    placeholder={`Предложение со словом "${word.en}"...`}
                    style={{ width: "100%", border: "none", outline: "none", fontSize: 14, background: "transparent" }} />
                  {feedback && feedback.find(f => f.word === word.en) && (
                    <div style={{ marginTop: 8, padding: "9px 11px", borderRadius: 6,
                      background: feedback.find(f=>f.word===word.en)?.correct ? "#F0FFF4" : "#FFF5F5",
                      border: `1px solid ${feedback.find(f=>f.word===word.en)?.correct ? "#BBF7D0" : "#FECACA"}` }}>
                      <div style={{ fontWeight: 600, color: feedback.find(f=>f.word===word.en)?.correct ? "#16A34A" : "#DC2626", fontSize: 12, marginBottom: 3 }}>
                        {feedback.find(f=>f.word===word.en)?.correct ? "✅ Отлично!" : "❌ Есть ошибка"}
                      </div>
                      <div style={{ fontSize: 13, color: "#555" }}>{feedback.find(f=>f.word===word.en)?.feedback}</div>
                      {feedback.find(f=>f.word===word.en)?.corrected && <div style={{ fontSize: 13, marginTop: 5, fontStyle: "italic" }}>✏️ {feedback.find(f=>f.word===word.en)?.corrected}</div>}
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
              {!feedback ? (
                <button onClick={checkSentences} disabled={loading}
                  style={{ flex: 1, padding: 13, background: "#111", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1 }}>
                  {loading ? "Проверяю..." : "Проверить предложения"}
                </button>
              ) : (
                <>
                  <button onClick={() => { setSentences({}); setFeedback(null); }}
                    style={{ flex: 1, padding: 13, background: "#fff", color: "#111", border: "1px solid #111", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                    Ещё раз
                  </button>
                  <button onClick={nextWeek}
                    style={{ flex: 1, padding: 13, background: "#111", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                    Следующая неделя →
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* REVIEW TAB */}
        {activeTab === "review" && (
          <div>
            {reviewDue.length === 0 ? (
              <div style={{ textAlign: "center", padding: "56px 20px" }}>
                <div style={{ fontSize: 44, marginBottom: 14 }}>🎉</div>
                <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>Нет слов для повторения</div>
                <div style={{ fontSize: 13, color: "#888" }}>Слова появятся через 7 дней после изучения</div>
                {(state.reviewQueue||[]).length > 0 && (
                  <div style={{ marginTop: 12, fontSize: 13, color: "#888" }}>{state.reviewQueue.length} слов ждут своей очереди</div>
                )}
              </div>
            ) : (
              <div>
                <div style={{ fontSize: 13, color: "#555", marginBottom: 14 }}>
                  Напиши перевод на русском. Невыученные слова войдут в следующую неделю:
                </div>
                {reviewDue.map(item => (
                  <div key={item.word} style={{ marginBottom: 10, background: "#fff", border: "1px solid #E5E5E5", borderRadius: 8, padding: "13px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 9 }}>
                      <span style={{ fontSize: 15, fontWeight: 700 }}>{item.word}</span>
                      <button onClick={() => speak(item.word)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 15 }}>🔊</button>
                    </div>
                    <input type="text" value={reviewAnswers[item.word] || ""}
                      onChange={e => setReviewAnswers(prev => ({ ...prev, [item.word]: e.target.value }))}
                      placeholder="Перевод на русском..." disabled={!!reviewResults}
                      style={{ width: "100%", border: "1px solid #E5E5E5", borderRadius: 6, padding: "8px 11px", fontSize: 14, outline: "none" }} />
                    {reviewResults && reviewResults[item.word] && (
                      <div style={{ marginTop: 7, fontSize: 13, color: reviewResults[item.word].correct ? "#16A34A" : "#DC2626" }}>
                        {reviewResults[item.word].correct ? "✅ Верно!" : `❌ Правильно: ${reviewResults[item.word].expected} — добавлено в следующую неделю`}
                      </div>
                    )}
                  </div>
                ))}
                {!reviewResults ? (
                  <button onClick={checkReview}
                    style={{ width: "100%", padding: 13, background: "#111", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 6 }}>
                    Проверить перевод
                  </button>
                ) : (
                  <div style={{ marginTop: 14, padding: 14, background: "#F0FFF4", borderRadius: 8, border: "1px solid #BBF7D0" }}>
                    <div style={{ fontWeight: 600, color: "#16A34A" }}>
                      Результат: {Object.values(reviewResults).filter(r => r.correct).length} / {reviewDue.length}
                    </div>
                    {Object.values(reviewResults).filter(r => !r.correct).length > 0 && (
                      <div style={{ fontSize: 13, color: "#555", marginTop: 4 }}>
                        Невыученные слова добавлены в следующую неделю
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* STATS TAB */}
        {activeTab === "stats" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
              {[
                { label: "Недель пройдено", value: state.currentWeek },
                { label: "Слов изучено", value: wordsLearned },
                { label: "Точность", value: `${accuracy}%` },
                { label: "На повторении", value: (state.reviewQueue||[]).length },
                { label: "Невыученных", value: (state.failedWords||[]).length },
                { label: "Всего попыток", value: state.totalPractices },
              ].map(stat => (
                <div key={stat.label} style={{ background: "#fff", border: "1px solid #E5E5E5", borderRadius: 8, padding: "16px" }}>
                  <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: "-0.02em" }}>{stat.value}</div>
                  <div style={{ fontSize: 11, color: "#888", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "#fff", border: "1px solid #E5E5E5", borderRadius: 8, padding: 14, marginBottom: 12 }}>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>Прогресс по словам</div>
              <div style={{ height: 8, background: "#F0F0F0", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", background: "#111", width: `${(wordsLearned / ALL_WORDS.length) * 100}%`, borderRadius: 4 }} />
              </div>
              <div style={{ fontSize: 12, color: "#888", marginTop: 6 }}>{wordsLearned} из {ALL_WORDS.length} слов</div>
            </div>

            <button onClick={() => { if (confirm("Сбросить прогресс?")) { saveUserState(currentUser.id, getInitialState()); setState(getInitialState()); setSentences({}); setFeedback(null); }}}
              style={{ padding: "9px 18px", background: "none", border: "1px solid #E5E5E5", borderRadius: 8, fontSize: 13, color: "#888", cursor: "pointer" }}>
              Сбросить прогресс
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
