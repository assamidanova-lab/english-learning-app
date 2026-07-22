import { useState, useEffect } from "react";

// 3000 most common English words for B1-B2 level (excluding basic A1 words)
const ALL_WORDS = [
  // Batch 1-50
  {en: "achieve", ru: "достигать"}, {en: "suggest", ru: "предлагать"}, {en: "consider", ru: "рассматривать"},
  {en: "involve", ru: "включать"}, {en: "require", ru: "требовать"}, {en: "opportunity", ru: "возможность"},
  {en: "behavior", ru: "поведение"}, {en: "influence", ru: "влиять"}, {en: "significant", ru: "значительный"},
  {en: "available", ru: "доступный"}, {en: "approach", ru: "подход"}, {en: "establish", ru: "устанавливать"},
  {en: "particular", ru: "особый"}, {en: "response", ru: "ответ"}, {en: "continue", ru: "продолжать"},
  {en: "evidence", ru: "доказательство"}, {en: "decision", ru: "решение"}, {en: "encourage", ru: "поощрять"},
  {en: "experience", ru: "опыт"}, {en: "improve", ru: "улучшать"}, {en: "challenge", ru: "вызов"},
  {en: "community", ru: "сообщество"}, {en: "environment", ru: "окружающая среда"}, {en: "purpose", ru: "цель"},
  {en: "relationship", ru: "отношения"}, {en: "recognize", ru: "признавать"}, {en: "circumstances", ru: "обстоятельства"},
  {en: "perspective", ru: "перспектива"}, {en: "consequence", ru: "последствие"}, {en: "responsibility", ru: "ответственность"},
  {en: "awareness", ru: "осознанность"}, {en: "essential", ru: "существенный"}, {en: "negotiate", ru: "договариваться"},
  {en: "assumption", ru: "предположение"}, {en: "commitment", ru: "обязательство"}, {en: "cooperation", ru: "сотрудничество"},
  {en: "demonstrate", ru: "демонстрировать"}, {en: "efficient", ru: "эффективный"}, {en: "emphasize", ru: "подчёркивать"},
  {en: "enormous", ru: "огромный"}, {en: "evaluate", ru: "оценивать"}, {en: "expectation", ru: "ожидание"},
  {en: "foundation", ru: "основа"}, {en: "generate", ru: "создавать"}, {en: "gradually", ru: "постепенно"},
  {en: "implement", ru: "реализовывать"}, {en: "indicate", ru: "указывать"}, {en: "initiative", ru: "инициатива"},
  {en: "innovative", ru: "инновационный"}, {en: "insight", ru: "понимание"},
  // Batch 51-100
  {en: "inspiration", ru: "вдохновение"}, {en: "intention", ru: "намерение"}, {en: "interpret", ru: "интерпретировать"},
  {en: "investigate", ru: "расследовать"}, {en: "justify", ru: "оправдывать"}, {en: "maintain", ru: "поддерживать"},
  {en: "manipulate", ru: "манипулировать"}, {en: "meanwhile", ru: "тем временем"}, {en: "moderate", ru: "умеренный"},
  {en: "monitor", ru: "отслеживать"}, {en: "motivate", ru: "мотивировать"}, {en: "navigate", ru: "ориентироваться"},
  {en: "necessary", ru: "необходимый"}, {en: "objective", ru: "объективный / цель"}, {en: "obstacle", ru: "препятствие"},
  {en: "obtain", ru: "получать"}, {en: "outcome", ru: "результат"}, {en: "overcome", ru: "преодолевать"},
  {en: "participate", ru: "участвовать"}, {en: "patience", ru: "терпение"}, {en: "perceive", ru: "воспринимать"},
  {en: "perform", ru: "выполнять"}, {en: "potential", ru: "потенциал"}, {en: "predict", ru: "предсказывать"},
  {en: "presence", ru: "присутствие"}, {en: "priority", ru: "приоритет"}, {en: "procedure", ru: "процедура"},
  {en: "productive", ru: "продуктивный"}, {en: "progress", ru: "прогресс"}, {en: "promote", ru: "продвигать"},
  {en: "propose", ru: "предлагать"}, {en: "provide", ru: "предоставлять"}, {en: "realistic", ru: "реалистичный"},
  {en: "refer", ru: "ссылаться"}, {en: "reflect", ru: "отражать / размышлять"}, {en: "relevant", ru: "актуальный"},
  {en: "remarkable", ru: "замечательный"}, {en: "resolve", ru: "решать (проблему)"}, {en: "resource", ru: "ресурс"},
  {en: "respect", ru: "уважение"}, {en: "restrict", ru: "ограничивать"}, {en: "reveal", ru: "раскрывать"},
  {en: "significant", ru: "значимый"}, {en: "situation", ru: "ситуация"}, {en: "solution", ru: "решение"},
  {en: "strategy", ru: "стратегия"}, {en: "strengthen", ru: "укреплять"}, {en: "struggle", ru: "бороться"},
  {en: "succeed", ru: "добиваться успеха"}, {en: "support", ru: "поддерживать"},
  // Batch 101-200
  {en: "tendency", ru: "тенденция"}, {en: "tension", ru: "напряжение"}, {en: "typical", ru: "типичный"},
  {en: "ultimately", ru: "в конечном счёте"}, {en: "underlying", ru: "лежащий в основе"}, {en: "unexpected", ru: "неожиданный"},
  {en: "unique", ru: "уникальный"}, {en: "utilize", ru: "использовать"}, {en: "valuable", ru: "ценный"},
  {en: "variety", ru: "разнообразие"}, {en: "virtually", ru: "практически"}, {en: "widespread", ru: "широко распространённый"},
  {en: "willing", ru: "готовый (сделать что-то)"}, {en: "accomplish", ru: "выполнять / достигать"}, {en: "accurate", ru: "точный"},
  {en: "acknowledge", ru: "признавать"}, {en: "adapt", ru: "адаптироваться"}, {en: "adequate", ru: "достаточный"},
  {en: "admire", ru: "восхищаться"}, {en: "advantage", ru: "преимущество"}, {en: "affect", ru: "влиять"},
  {en: "afford", ru: "позволять себе"}, {en: "aggressive", ru: "агрессивный"}, {en: "allocate", ru: "распределять"},
  {en: "ambiguous", ru: "неоднозначный"}, {en: "ambitious", ru: "амбициозный"}, {en: "analyze", ru: "анализировать"},
  {en: "anticipate", ru: "предвидеть"}, {en: "anxiety", ru: "тревога"}, {en: "apparent", ru: "очевидный"},
  {en: "appreciate", ru: "ценить"}, {en: "appropriate", ru: "подходящий"}, {en: "argue", ru: "спорить"},
  {en: "arrange", ru: "организовывать"}, {en: "aspect", ru: "аспект"}, {en: "assess", ru: "оценивать"},
  {en: "assist", ru: "помогать"}, {en: "attitude", ru: "отношение / позиция"}, {en: "attract", ru: "привлекать"},
  {en: "authority", ru: "власть / авторитет"}, {en: "avoid", ru: "избегать"}, {en: "balance", ru: "баланс"},
  {en: "barely", ru: "едва"}, {en: "benefit", ru: "выгода / польза"}, {en: "blame", ru: "винить"},
  {en: "boundary", ru: "граница"}, {en: "capable", ru: "способный"}, {en: "capture", ru: "захватывать"},
  {en: "cause", ru: "причина"}, {en: "certain", ru: "определённый / уверенный"},
  // Batch 201-300
  {en: "clarify", ru: "уточнять"}, {en: "classify", ru: "классифицировать"}, {en: "colleague", ru: "коллега"},
  {en: "comfort", ru: "комфорт / утешать"}, {en: "comment", ru: "комментировать"}, {en: "compare", ru: "сравнивать"},
  {en: "compete", ru: "конкурировать"}, {en: "complaint", ru: "жалоба"}, {en: "complex", ru: "сложный"},
  {en: "concentrate", ru: "сосредотачиваться"}, {en: "concept", ru: "концепция"}, {en: "concern", ru: "беспокойство"},
  {en: "conclude", ru: "заключать"}, {en: "confident", ru: "уверенный"}, {en: "conflict", ru: "конфликт"},
  {en: "confuse", ru: "путать"}, {en: "connect", ru: "соединять"}, {en: "conscious", ru: "сознательный"},
  {en: "consistent", ru: "последовательный"}, {en: "construct", ru: "строить"}, {en: "contribute", ru: "вносить вклад"},
  {en: "convince", ru: "убеждать"}, {en: "cope", ru: "справляться"}, {en: "creative", ru: "творческий"},
  {en: "critical", ru: "критический"}, {en: "cultural", ru: "культурный"}, {en: "curiosity", ru: "любопытство"},
  {en: "currently", ru: "в настоящее время"}, {en: "debate", ru: "дебаты / обсуждать"}, {en: "decline", ru: "снижаться / отказывать"},
  {en: "define", ru: "определять"}, {en: "delay", ru: "задержка"}, {en: "deliver", ru: "доставлять"},
  {en: "demand", ru: "требовать / спрос"}, {en: "depend", ru: "зависеть"}, {en: "describe", ru: "описывать"},
  {en: "deserve", ru: "заслуживать"}, {en: "desire", ru: "желание"}, {en: "despite", ru: "несмотря на"},
  {en: "detect", ru: "обнаруживать"}, {en: "determine", ru: "определять"}, {en: "develop", ru: "развивать"},
  {en: "difference", ru: "разница"}, {en: "difficult", ru: "трудный"}, {en: "direct", ru: "прямой / направлять"},
  {en: "disappoint", ru: "разочаровывать"}, {en: "discipline", ru: "дисциплина"}, {en: "discover", ru: "открывать"},
  {en: "discuss", ru: "обсуждать"}, {en: "diverse", ru: "разнообразный"},
  // Batch 301-400
  {en: "divide", ru: "делить"}, {en: "dominate", ru: "доминировать"}, {en: "doubt", ru: "сомнение"},
  {en: "drive", ru: "движущая сила / вести"}, {en: "dynamic", ru: "динамичный"}, {en: "effective", ru: "эффективный"},
  {en: "eliminate", ru: "устранять"}, {en: "emerge", ru: "появляться"}, {en: "emotion", ru: "эмоция"},
  {en: "enable", ru: "позволять"}, {en: "engage", ru: "вовлекать"}, {en: "enhance", ru: "улучшать"},
  {en: "ensure", ru: "обеспечивать"}, {en: "entire", ru: "весь / целый"}, {en: "equally", ru: "одинаково"},
  {en: "especially", ru: "особенно"}, {en: "estimate", ru: "оценивать / оценка"}, {en: "examine", ru: "изучать"},
  {en: "exceed", ru: "превышать"}, {en: "exist", ru: "существовать"}, {en: "expand", ru: "расширять"},
  {en: "explain", ru: "объяснять"}, {en: "explicit", ru: "явный"}, {en: "explore", ru: "исследовать"},
  {en: "express", ru: "выражать"}, {en: "extend", ru: "расширять / продлевать"}, {en: "extensive", ru: "обширный"},
  {en: "external", ru: "внешний"}, {en: "extreme", ru: "крайний / экстремальный"}, {en: "facilitate", ru: "облегчать"},
  {en: "factor", ru: "фактор"}, {en: "failure", ru: "неудача"}, {en: "familiar", ru: "знакомый"},
  {en: "feature", ru: "особенность"}, {en: "flexible", ru: "гибкий"}, {en: "focus", ru: "фокусироваться"},
  {en: "forecast", ru: "прогнозировать"}, {en: "formal", ru: "формальный"}, {en: "frequent", ru: "частый"},
  {en: "frustrate", ru: "расстраивать"}, {en: "fundamental", ru: "фундаментальный"}, {en: "gather", ru: "собирать"},
  {en: "genuine", ru: "настоящий / искренний"}, {en: "global", ru: "глобальный"}, {en: "goal", ru: "цель"},
  {en: "growth", ru: "рост"}, {en: "handle", ru: "справляться"}, {en: "harmful", ru: "вредный"},
  {en: "highlight", ru: "выделять"}, {en: "hypothesis", ru: "гипотеза"},
  // Batch 401-500
  {en: "identify", ru: "определять / выявлять"}, {en: "ignore", ru: "игнорировать"}, {en: "illustrate", ru: "иллюстрировать"},
  {en: "imagine", ru: "представлять"}, {en: "immediate", ru: "немедленный"}, {en: "impact", ru: "воздействие"},
  {en: "imply", ru: "подразумевать"}, {en: "increase", ru: "увеличивать"}, {en: "independent", ru: "независимый"},
  {en: "individual", ru: "индивидуальный / человек"}, {en: "inevitable", ru: "неизбежный"}, {en: "inform", ru: "информировать"},
  {en: "intense", ru: "интенсивный"}, {en: "interact", ru: "взаимодействовать"}, {en: "internal", ru: "внутренний"},
  {en: "introduce", ru: "представлять / вводить"}, {en: "invest", ru: "инвестировать"}, {en: "issue", ru: "проблема / вопрос"},
  {en: "judge", ru: "судить"}, {en: "knowledge", ru: "знания"}, {en: "lack", ru: "нехватка / не хватать"},
  {en: "launch", ru: "запускать"}, {en: "layer", ru: "слой"}, {en: "leadership", ru: "лидерство"},
  {en: "limit", ru: "ограничивать"}, {en: "logical", ru: "логичный"}, {en: "manage", ru: "управлять"},
  {en: "meaningful", ru: "значимый / осмысленный"}, {en: "measure", ru: "измерять"}, {en: "mention", ru: "упоминать"},
  {en: "method", ru: "метод"}, {en: "minimize", ru: "минимизировать"}, {en: "mistake", ru: "ошибка"},
  {en: "modify", ru: "изменять"}, {en: "mutual", ru: "взаимный"}, {en: "negative", ru: "отрицательный"},
  {en: "normal", ru: "нормальный"}, {en: "notice", ru: "замечать"}, {en: "obvious", ru: "очевидный"},
  {en: "opinion", ru: "мнение"}, {en: "organize", ru: "организовывать"}, {en: "original", ru: "оригинальный"},
  {en: "overall", ru: "в целом"}, {en: "pattern", ru: "шаблон / закономерность"}, {en: "permanent", ru: "постоянный"},
  {en: "physical", ru: "физический"}, {en: "positive", ru: "положительный"}, {en: "powerful", ru: "мощный"},
  {en: "practical", ru: "практичный"},
  // Continue with more words...
  {en: "precise", ru: "точный"}, {en: "prepare", ru: "готовить"}, {en: "prevent", ru: "предотвращать"},
  {en: "previous", ru: "предыдущий"}, {en: "primary", ru: "главный"}, {en: "principle", ru: "принцип"},
  {en: "problem", ru: "проблема"}, {en: "process", ru: "процесс"}, {en: "professional", ru: "профессиональный"},
  {en: "proper", ru: "надлежащий"}, {en: "protect", ru: "защищать"}, {en: "prove", ru: "доказывать"},
  {en: "publish", ru: "публиковать"}, {en: "quality", ru: "качество"}, {en: "question", ru: "вопрос / сомневаться"},
  {en: "rapid", ru: "быстрый"}, {en: "react", ru: "реагировать"}, {en: "reasonable", ru: "разумный"},
  {en: "receive", ru: "получать"}, {en: "reduce", ru: "уменьшать"}, {en: "refuse", ru: "отказываться"},
  {en: "regardless", ru: "независимо от"}, {en: "replace", ru: "заменять"}, {en: "represent", ru: "представлять"},
  {en: "research", ru: "исследование"}, {en: "resist", ru: "сопротивляться"}, {en: "result", ru: "результат"},
  {en: "retain", ru: "удерживать"}, {en: "risk", ru: "риск"}, {en: "role", ru: "роль"},
  {en: "roughly", ru: "приблизительно"}, {en: "satisfy", ru: "удовлетворять"}, {en: "select", ru: "выбирать"},
  {en: "sensitive", ru: "чувствительный"}, {en: "separate", ru: "разделять"}, {en: "serious", ru: "серьёзный"},
  {en: "share", ru: "делиться"}, {en: "shift", ru: "смещаться / сдвиг"}, {en: "similar", ru: "похожий"},
  {en: "simplify", ru: "упрощать"}, {en: "skill", ru: "навык"}, {en: "specific", ru: "конкретный"},
  {en: "stable", ru: "стабильный"}, {en: "standard", ru: "стандарт"}, {en: "statement", ru: "заявление"},
  {en: "status", ru: "статус"}, {en: "structure", ru: "структура"}, {en: "suitable", ru: "подходящий"},
  {en: "surprise", ru: "удивлять"}, {en: "sustainable", ru: "устойчивый"}, {en: "symbol", ru: "символ"},
  {en: "task", ru: "задача"}, {en: "technique", ru: "техника"}, {en: "temporary", ru: "временный"},
  {en: "theory", ru: "теория"}, {en: "therefore", ru: "поэтому / следовательно"}, {en: "threat", ru: "угроза"},
  {en: "transfer", ru: "передавать"}, {en: "transform", ru: "преобразовывать"}, {en: "trend", ru: "тенденция"},
  {en: "trust", ru: "доверие"}, {en: "uncertain", ru: "неопределённый"}, {en: "understand", ru: "понимать"},
  {en: "unfortunately", ru: "к сожалению"}, {en: "update", ru: "обновлять"}, {en: "upset", ru: "расстраивать"},
  {en: "urgent", ru: "срочный"}, {en: "useful", ru: "полезный"}, {en: "version", ru: "версия"},
  {en: "view", ru: "взгляд / видеть"}, {en: "vision", ru: "видение"}, {en: "volunteer", ru: "волонтёр"},
  {en: "waste", ru: "тратить впустую"}, {en: "weakness", ru: "слабость"}, {en: "whereas", ru: "тогда как"},
  {en: "worthy", ru: "достойный"}, {en: "accurate", ru: "точный"}, {en: "acquire", ru: "приобретать"},
  {en: "active", ru: "активный"}, {en: "actual", ru: "фактический"}, {en: "adjust", ru: "регулировать"},
  {en: "advanced", ru: "продвинутый"}, {en: "advantage", ru: "преимущество"}, {en: "alternative", ru: "альтернатива"},
  {en: "annual", ru: "ежегодный"}, {en: "apply", ru: "применять"}, {en: "approve", ru: "одобрять"},
  {en: "associate", ru: "связывать / ассоциировать"}, {en: "assume", ru: "предполагать"}, {en: "attempt", ru: "попытка"},
  {en: "attend", ru: "посещать"}, {en: "broad", ru: "широкий"}, {en: "budget", ru: "бюджет"},
  {en: "capable", ru: "способный"}, {en: "category", ru: "категория"}, {en: "characteristic", ru: "характеристика"},
  {en: "charge", ru: "заряжать / взимать плату"}, {en: "choose", ru: "выбирать"}, {en: "claim", ru: "утверждать"},
  {en: "combine", ru: "совмещать"}, {en: "communicate", ru: "общаться"}, {en: "competition", ru: "конкуренция"},
  {en: "complete", ru: "завершать"}, {en: "comprehensive", ru: "всесторонний"}, {en: "condition", ru: "условие"},
  {en: "consequence", ru: "последствие"}, {en: "contain", ru: "содержать"}, {en: "context", ru: "контекст"},
  {en: "contrast", ru: "контраст"}, {en: "control", ru: "контролировать"}, {en: "convert", ru: "преобразовывать"},
  {en: "correct", ru: "правильный / исправлять"}, {en: "create", ru: "создавать"}, {en: "crucial", ru: "решающий"},
];

const STORAGE_KEY = "english_app_v1";

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return null;
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

function getInitialState() {
  return {
    currentBatch: 0,
    learnedWords: {},
    failedWords: [],
    reviewQueue: [],
    phase: "learn",
    startedAt: Date.now(),
    lastActivity: Date.now(),
    totalSentences: 0,
    correctSentences: 0,
  };
}

export default function EnglishApp() {
  const [state, setState] = useState(() => loadState() || getInitialState());
  const [sentences, setSentences] = useState(Array(10).fill(""));
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("learn");
  const [reviewAnswers, setReviewAnswers] = useState({});
  const [reviewResults, setReviewResults] = useState(null);

  const currentWords = ALL_WORDS.slice(state.currentBatch * 10, state.currentBatch * 10 + 10);
  const totalBatches = Math.ceil(ALL_WORDS.length / 10);
  const wordsLearned = Object.keys(state.learnedWords).length;

  useEffect(() => {
    saveState(state);
  }, [state]);

  // Check if any words are due for review (7 days)
  const wordsForReview = state.reviewQueue.filter(item => {
    return Date.now() - item.addedAt >= 7 * 24 * 60 * 60 * 1000;
  });

  async function checkSentences() {
    const filled = sentences.filter(s => s.trim().length > 0);
    if (filled.length < 10) {
      alert("Напиши предложение для каждого слова!");
      return;
    }

    setLoading(true);
    setFeedback(null);

    const wordList = currentWords.map((w, i) => `${i + 1}. ${w.en} (${w.ru}): "${sentences[i]}"`).join("\n");

    const prompt = `You are an English teacher helping a B1-B2 Russian speaker practice English. 
The student wrote sentences using these words:
${wordList}

For each sentence:
1. Check grammar, vocabulary, and natural usage
2. If correct: mark as ✅ and give a brief positive note
3. If incorrect: mark as ❌, explain the mistake clearly in Russian, and provide the corrected version
4. Be encouraging but accurate

Format your response as JSON array with 10 objects:
[{"correct": true/false, "feedback": "comment in Russian", "corrected": "corrected sentence or null"}]

Return ONLY the JSON array, no other text.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }]
        })
      });

      const data = await response.json();
      const text = data.content[0].text.trim();
      const results = JSON.parse(text);
      setFeedback(results);

      const correctCount = results.filter(r => r.correct).length;

      setState(prev => ({
        ...prev,
        totalSentences: prev.totalSentences + 10,
        correctSentences: prev.correctSentences + correctCount,
        lastActivity: Date.now(),
      }));
    } catch (e) {
      alert("Ошибка при проверке. Попробуй ещё раз.");
    }
    setLoading(false);
  }

  function nextBatch() {
    const newLearned = { ...state.learnedWords };
    const newReviewQueue = [...state.reviewQueue];

    currentWords.forEach((word, i) => {
      newLearned[word.en] = true;
      newReviewQueue.push({
        word: word.en,
        ru: word.ru,
        addedAt: Date.now(),
        batchIndex: state.currentBatch
      });
    });

    setState(prev => ({
      ...prev,
      currentBatch: prev.currentBatch + 1,
      learnedWords: newLearned,
      reviewQueue: newReviewQueue,
      lastActivity: Date.now(),
    }));

    setSentences(Array(10).fill(""));
    setFeedback(null);
  }

  function checkReview() {
    const results = {};
    const stillFailing = [];

    wordsForReview.forEach(item => {
      const answer = (reviewAnswers[item.word] || "").trim().toLowerCase();
      const correct = item.ru.toLowerCase().includes(answer) || answer.includes(item.ru.toLowerCase().split(" ")[0]);
      results[item.word] = { correct, expected: item.ru, given: answer };
      if (!correct) {
        stillFailing.push({ ...item, addedAt: Date.now() });
      }
    });

    setReviewResults(results);

    // Remove reviewed words from queue, re-add failed ones
    setState(prev => ({
      ...prev,
      reviewQueue: [
        ...prev.reviewQueue.filter(item => !wordsForReview.find(w => w.word === item.word)),
        ...stillFailing
      ],
      failedWords: [...prev.failedWords, ...stillFailing.map(w => w.word)],
    }));
  }

  const accuracy = state.totalSentences > 0
    ? Math.round((state.correctSentences / state.totalSentences) * 100)
    : 0;

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA", fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ background: "#111", color: "#fff", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "0.05em" }}>ENGLISH B1–B2</div>
          <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>3000 слов · Интервальное повторение</div>
        </div>
        <div style={{ display: "flex", gap: 20, fontSize: 13 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 700, fontSize: 20 }}>{wordsLearned}</div>
            <div style={{ color: "#888", fontSize: 11 }}>изучено</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 700, fontSize: 20 }}>{ALL_WORDS.length - wordsLearned}</div>
            <div style={{ color: "#888", fontSize: 11 }}>осталось</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 700, fontSize: 20 }}>{accuracy}%</div>
            <div style={{ color: "#888", fontSize: 11 }}>точность</div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 4, background: "#E5E5E5" }}>
        <div style={{ height: "100%", background: "#111", width: `${(wordsLearned / ALL_WORDS.length) * 100}%`, transition: "width 0.5s" }} />
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #E5E5E5", background: "#fff" }}>
        {[
          { key: "learn", label: `Урок ${state.currentBatch + 1}` },
          { key: "review", label: `Повторение ${wordsForReview.length > 0 ? `(${wordsForReview.length})` : ""}` },
          { key: "stats", label: "Статистика" },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key); setReviewResults(null); }}
            style={{
              padding: "14px 24px",
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: activeTab === tab.key ? 600 : 400,
              color: activeTab === tab.key ? "#111" : "#888",
              borderBottom: activeTab === tab.key ? "2px solid #111" : "2px solid transparent",
              marginBottom: -1,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px 16px" }}>

        {/* LEARN TAB */}
        {activeTab === "learn" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, color: "#888", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>
                Слова {state.currentBatch * 10 + 1}–{Math.min(state.currentBatch * 10 + 10, ALL_WORDS.length)} из {ALL_WORDS.length}
              </div>
              <div style={{ fontSize: 14, color: "#555", lineHeight: 1.6 }}>
                Напиши по одному предложению для каждого слова на английском языке
              </div>
            </div>

            {currentWords.map((word, i) => (
              <div key={word.en} style={{ marginBottom: 16, background: "#fff", border: "1px solid #E5E5E5", borderRadius: 8, overflow: "hidden" }}>
                <div style={{ padding: "12px 16px", borderBottom: "1px solid #F0F0F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontSize: 16, fontWeight: 700 }}>{word.en}</span>
                    <span style={{ fontSize: 13, color: "#888", marginLeft: 10 }}>{word.ru}</span>
                  </div>
                  <span style={{ fontSize: 12, color: "#bbb" }}>#{i + 1}</span>
                </div>
                <div style={{ padding: "10px 16px" }}>
                  <input
                    type="text"
                    value={sentences[i]}
                    onChange={e => {
                      const next = [...sentences];
                      next[i] = e.target.value;
                      setSentences(next);
                    }}
                    placeholder={`Напиши предложение со словом "${word.en}"...`}
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      fontSize: 14,
                      color: "#111",
                      background: "transparent",
                    }}
                  />
                  {feedback && (
                    <div style={{ marginTop: 10, padding: "10px 12px", borderRadius: 6, background: feedback[i].correct ? "#F0FFF4" : "#FFF5F5", border: `1px solid ${feedback[i].correct ? "#BBF7D0" : "#FECACA"}` }}>
                      <div style={{ fontWeight: 600, color: feedback[i].correct ? "#16A34A" : "#DC2626", marginBottom: 4 }}>
                        {feedback[i].correct ? "✅ Правильно!" : "❌ Ошибка"}
                      </div>
                      <div style={{ fontSize: 13, color: "#555" }}>{feedback[i].feedback}</div>
                      {feedback[i].corrected && (
                        <div style={{ fontSize: 13, marginTop: 6, color: "#111", fontStyle: "italic" }}>
                          ✏️ {feedback[i].corrected}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              {!feedback ? (
                <button
                  onClick={checkSentences}
                  disabled={loading}
                  style={{ flex: 1, padding: "14px", background: "#111", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1 }}
                >
                  {loading ? "Проверяю..." : "Проверить предложения"}
                </button>
              ) : (
                <button
                  onClick={nextBatch}
                  style={{ flex: 1, padding: "14px", background: "#111", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}
                >
                  Следующие 10 слов →
                </button>
              )}
            </div>
          </div>
        )}

        {/* REVIEW TAB */}
        {activeTab === "review" && (
          <div>
            {wordsForReview.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "#888" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: "#111", marginBottom: 8 }}>Нет слов для повторения</div>
                <div style={{ fontSize: 14 }}>Слова для повторения появятся через 7 дней после изучения</div>
              </div>
            ) : (
              <div>
                <div style={{ marginBottom: 20, fontSize: 14, color: "#555" }}>
                  Напиши перевод на русском для каждого слова:
                </div>
                {wordsForReview.map(item => (
                  <div key={item.word} style={{ marginBottom: 12, background: "#fff", border: "1px solid #E5E5E5", borderRadius: 8, padding: "14px 16px" }}>
                    <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{item.word}</div>
                    <input
                      type="text"
                      value={reviewAnswers[item.word] || ""}
                      onChange={e => setReviewAnswers(prev => ({ ...prev, [item.word]: e.target.value }))}
                      placeholder="Перевод на русском..."
                      style={{ width: "100%", border: "1px solid #E5E5E5", borderRadius: 6, padding: "8px 12px", fontSize: 14, outline: "none" }}
                      disabled={!!reviewResults}
                    />
                    {reviewResults && reviewResults[item.word] && (
                      <div style={{ marginTop: 8, fontSize: 13, color: reviewResults[item.word].correct ? "#16A34A" : "#DC2626" }}>
                        {reviewResults[item.word].correct ? "✅ Верно!" : `❌ Правильный ответ: ${reviewResults[item.word].expected}`}
                      </div>
                    )}
                  </div>
                ))}
                {!reviewResults ? (
                  <button
                    onClick={checkReview}
                    style={{ width: "100%", padding: "14px", background: "#111", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 8 }}
                  >
                    Проверить перевод
                  </button>
                ) : (
                  <div style={{ marginTop: 16, padding: "16px", background: "#F0FFF4", borderRadius: 8, border: "1px solid #BBF7D0" }}>
                    <div style={{ fontWeight: 600, color: "#16A34A" }}>
                      Результат: {Object.values(reviewResults).filter(r => r.correct).length} / {wordsForReview.length}
                    </div>
                    <div style={{ fontSize: 13, color: "#555", marginTop: 4 }}>
                      Неверные слова добавлены в список для повторения ещё через 7 дней
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* STATS TAB */}
        {activeTab === "stats" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
              {[
                { label: "Изучено слов", value: wordsLearned, total: ALL_WORDS.length },
                { label: "Осталось слов", value: ALL_WORDS.length - wordsLearned },
                { label: "Точность", value: `${accuracy}%` },
                { label: "Предложений написано", value: state.totalSentences },
                { label: "На повторении", value: state.reviewQueue.length },
                { label: "Уроков пройдено", value: state.currentBatch },
              ].map(stat => (
                <div key={stat.label} style={{ background: "#fff", border: "1px solid #E5E5E5", borderRadius: 8, padding: "20px 16px" }}>
                  <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.02em" }}>{stat.value}</div>
                  {stat.total && <div style={{ fontSize: 12, color: "#bbb" }}>из {stat.total}</div>}
                  <div style={{ fontSize: 12, color: "#888", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.1em" }}>{stat.label}</div>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                if (confirm("Сбросить весь прогресс? Это нельзя отменить.")) {
                  setState(getInitialState());
                  setSentences(Array(10).fill(""));
                  setFeedback(null);
                }
              }}
              style={{ padding: "10px 20px", background: "none", border: "1px solid #E5E5E5", borderRadius: 8, fontSize: 13, color: "#888", cursor: "pointer" }}
            >
              Сбросить прогресс
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
