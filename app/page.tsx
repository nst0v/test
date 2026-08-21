"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const CROCKFORD = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

const memories = [
  {
    className: "memory-new-year memory-wide",
    label: "тот самый первый Новый год",
    title: "Кино, снег и салюты",
    text: "Проектор освещал комнату, за окном была новогодняя ночь, а мы смотрели фильмы вдвоём. Потом шли к бабушке под снегом, и небо взрывалось салютами. Я помню не их гром — я помню, что рядом была ты.",
    stickers: ["🎞️", "❄️", "✦"],
  },
  {
    className: "memory-farm",
    label: "поездка вдвоём",
    title: "Вечера на ферме",
    text: "Та поездка была очень простой и очень нашей: ферма, спокойные вечера и время, которое никуда не торопилось. Рядом с тобой даже обычный день становился местом, куда хочется вернуться.",
    stickers: ["🚜", "🌾", "☀️"],
  },
  {
    className: "memory-stardew",
    label: "наши тихие вечера",
    title: "Ферма мечты в Stardew Valley",
    text: "Пиксель за пикселем мы строили маленькую общую жизнь: выбирали, что посадить, куда поставить дом и как всё успеть до ночи. Кажется, счастье иногда и правда помещается на одном экране.",
    stickers: ["🌱", "🎮", "🐔"],
  },
  {
    className: "memory-snowman",
    label: "зимний шедевр",
    title: "Снеговик с HQD",
    text: "Мы лепили снеговика и зачем-то прикрепили ему HQD. Абсолютно нелепая, идеальная деталь — такая, над которой смеются только свои. Хочу снова слышать твой смех рядом.",
    stickers: ["⛄", "🥤", "🧤"],
  },
  {
    className: "memory-night",
    label: "когда город засыпал",
    title: "Наши зимние ночи",
    text: "Мы гуляли, пока улицы становились тише, снег светился под фонарями, а время будто останавливалось. Холод был вокруг — но рядом с тобой мне всегда было тепло.",
    stickers: ["🌙", "🧣", "✨"],
  },
  {
    className: "memory-bench memory-wide",
    label: "строго между нами",
    title: "Та самая лавочка",
    text: "У неё точно осталась история, которую не рассказывают вслух. Скажем только: использовали мы её очень творчески и совсем не по инструкции. Да, я улыбаюсь каждый раз, когда вспоминаю.",
    stickers: ["🪑", "🙈", "🤍"],
  },
];

const nasaMoments = [
  {
    date: "12 декабря 1999",
    title: "NGC 4314: A Nuclear Starburst Ring",
    image: "/nasa/1999-12-12-ngc4314.jpg",
    alt: "Кольцо молодых звёзд в центре спиральной галактики NGC 4314",
    fact: "В центре древней спиральной галактики сияет кольцо ярких молодых звёзд — целый новый мир внутри старого света.",
    romantic:
      "Даже у древней галактики может появиться новое светлое кольцо. Я очень надеюсь, что и у нас возможна новая глава — бережная и честная.",
    credit: "U. Texas et al. · WFPC2 · HST · NASA",
    href: "https://apod.nasa.gov/apod/ap991212.html",
  },
  {
    date: "22 октября 2001",
    title: "The First Rocket Launch from Cape Canaveral",
    image: "/nasa/2001-10-22-bumper2.jpg",
    alt: "Первый запуск ракеты Bumper 2 с мыса Канаверал",
    fact: "Bumper 2 открыл историю запусков с мыса Канаверал. Большой путь начался с одного первого старта.",
    romantic:
      "Большие пути тоже начинаются с одного честного шага. Мой шаг — признать ошибку и меняться делами, а не красивыми словами.",
    credit: "NASA",
    href: "https://apod.nasa.gov/apod/ap011022.html",
  },
  {
    date: "5 июля 2025",
    title: "Ou4: The Giant Squid Nebula",
    image: "/nasa/2025-07-05-ou4.jpg",
    alt: "Голубая туманность Гигантский кальмар Ou4 на фоне красной области Sh2-129",
    fact: "Голубое свечение Ou4 протянулось на фоне красной туманности Sh2-129. Космос умеет соединять самые разные оттенки в одно целое.",
    romantic:
      "Вселенная бывает огромной и тихой. Так же просто я хочу сказать: Настя, ты мне очень дорога, и я готов подтверждать перемены поступками.",
    credit: "© Massimo Di Fusco",
    href: "https://apod.nasa.gov/apod/ap250705.html",
  },
];

const promises = [
  {
    number: "01",
    title: "Не прятаться",
    text: "от сложных разговоров и своей ответственности.",
  },
  {
    number: "02",
    title: "Слышать тебя",
    text: "не только отвечать, а действительно понимать.",
  },
  {
    number: "03",
    title: "Доказывать делами",
    text: "спокойно, последовательно и с уважением к твоим границам.",
  },
];

const dateOptions = [
  {
    image: "/assets/date-icons/birch.webp",
    title: "Свидание в Birch",
    short: "Birch",
  },
  {
    image: "/assets/date-icons/best-restaurant.webp",
    title: "Свидание в лучшем ресторане Москвы",
    short: "Лучший ресторан",
  },
  {
    image: "/assets/date-icons/any-restaurant.webp",
    title: "Свидание в любом выбранном ресторане",
    short: "Любой ресторан",
  },
  {
    image: "/assets/date-icons/moscow-city-rooftop.webp",
    title: "Свидание на крыше Москва-Сити",
    short: "Крыша Сити",
  },
  {
    image: "/assets/date-icons/ostankino.webp",
    title: "Свидание в Останкинской башне",
    short: "Останкино",
  },
  {
    image: "/assets/date-icons/your-choice.webp",
    title: "Свидание на твой выбор",
    short: "Твой выбор",
  },
  {
    image: "/assets/date-icons/surprise.webp",
    title: "Свидание-сюрприз",
    short: "Сюрприз",
  },
] as const;

function createPromoCode() {
  const randomBytes = new Uint8Array(8);
  window.crypto.getRandomValues(randomBytes);

  return Array.from(
    randomBytes,
    (byte) => CROCKFORD[byte & 31],
  ).join("");
}

function ScratchCard({
  code,
  onReveal,
}: {
  code: string;
  onReveal: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isScratching = useRef(false);
  const isRevealed = useRef(false);
  const moveCounter = useRef(0);
  const [progress, setProgress] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const finishReveal = () => {
    if (isRevealed.current) return;
    isRevealed.current = true;
    setProgress(100);
    setRevealed(true);
    onReveal();
  };

  const clearCard = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (canvas && context) context.clearRect(0, 0, canvas.width, canvas.height);
    finishReveal();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    isRevealed.current = false;
    setRevealed(false);
    setProgress(0);

    const paintCover = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(rect.width));
      canvas.height = Math.max(1, Math.round(rect.height));
      const context = canvas.getContext("2d");
      if (!context) return;

      const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#d9aaa5");
      gradient.addColorStop(0.52, "#ebc9c5");
      gradient.addColorStop(1, "#f2c4a7");
      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = "rgba(255, 251, 246, 0.72)";
      context.font = "700 12px system-ui, sans-serif";
      context.textAlign = "center";
      context.fillText("ЗАЖМИ И СОТРИ СЛОЙ", canvas.width / 2, canvas.height / 2 - 4);
      context.font = "18px Georgia, serif";
      context.fillText("✦   здесь спрятан код   ✦", canvas.width / 2, canvas.height / 2 + 27);

      context.fillStyle = "rgba(255, 255, 255, 0.42)";
      [
        [0.08, 0.23],
        [0.16, 0.74],
        [0.82, 0.2],
        [0.9, 0.68],
        [0.71, 0.82],
      ].forEach(([x, y], index) => {
        context.beginPath();
        context.arc(
          canvas.width * x,
          canvas.height * y,
          index % 2 === 0 ? 4 : 2.5,
          0,
          Math.PI * 2,
        );
        context.fill();
      });
    };

    paintCover();
    const observer = new ResizeObserver(paintCover);
    observer.observe(canvas);

    return () => observer.disconnect();
  }, [code]);

  const measureProgress = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || isRevealed.current) return;

    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparent = 0;
    let samples = 0;

    for (let index = 3; index < pixels.length; index += 64) {
      samples += 1;
      if (pixels[index] < 40) transparent += 1;
    }

    const nextProgress = Math.min(100, Math.round((transparent / samples) * 100));
    setProgress(nextProgress);
    if (nextProgress >= 52) clearCard();
  };

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || isRevealed.current) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;
    const radius = Math.max(19, canvas.width * 0.045);

    context.save();
    context.globalCompositeOperation = "destination-out";
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
    context.restore();

    moveCounter.current += 1;
    if (moveCounter.current % 7 === 0) measureProgress();
  };

  return (
    <div className="scratch-wrap">
      <div
        className={`scratch-card ${revealed ? "is-revealed" : ""}`}
        aria-label={
          revealed ? `Открытый промокод: ${code}` : "Скретч-карта со скрытым промокодом"
        }
      >
        <div className="scratch-code" aria-hidden={!revealed}>
          <span>твой промокод</span>
          <code>{code}</code>
        </div>
        <canvas
          ref={canvasRef}
          className="scratch-canvas"
          aria-label="Зажми кнопку мыши или коснись пальцем и стирай защитный слой"
          onPointerDown={(event) => {
            isScratching.current = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            scratchAt(event.clientX, event.clientY);
          }}
          onPointerMove={(event) => {
            if (isScratching.current) scratchAt(event.clientX, event.clientY);
          }}
          onPointerUp={(event) => {
            isScratching.current = false;
            event.currentTarget.releasePointerCapture(event.pointerId);
            measureProgress();
          }}
          onPointerCancel={() => {
            isScratching.current = false;
          }}
        />
      </div>
      <div className="scratch-meta">
        <span>{revealed ? "Код открыт ✓" : `стёрто ${progress}%`}</span>
        {!revealed && (
          <button type="button" onClick={clearCard}>
            не получается? открыть код
          </button>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [dateCode, setDateCode] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [rouletteReady, setRouletteReady] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinSeconds, setSpinSeconds] = useState(15);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [dateResult, setDateResult] = useState<(typeof dateOptions)[number] | null>(
    null,
  );
  const [scratchRevealed, setScratchRevealed] = useState(false);
  const [needsTime, setNeedsTime] = useState(false);
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });
  const [escapeCount, setEscapeCount] = useState(0);
  const lastPointerType = useRef("keyboard");
  const wheelTimer = useRef<number | null>(null);
  const countdownTimer = useRef<number | null>(null);
  const promoInput = useRef<HTMLInputElement | null>(null);
  const rouletteStage = useRef<HTMLDivElement | null>(null);

  const clearWheelTimers = () => {
    if (wheelTimer.current !== null) {
      window.clearTimeout(wheelTimer.current);
      wheelTimer.current = null;
    }

    if (countdownTimer.current !== null) {
      window.clearInterval(countdownTimer.current);
      countdownTimer.current = null;
    }
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    document.body.classList.add("motion-ready");
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
      document.body.classList.remove("motion-ready");
    };
  }, []);

  useEffect(() => {
    return () => clearWheelTimers();
  }, []);

  useEffect(() => {
    if (!modalOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => promoInput.current?.focus(), 80);

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModalOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [modalOpen]);

  const moveNoButton = () => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 48 + Math.random() * 34;

    setNoOffset({
      x: Math.round(Math.cos(angle) * distance),
      y: Math.round(Math.sin(angle) * Math.min(distance, 54)),
    });
    setEscapeCount((count) => count + 1);
  };

  const acceptDate = () => {
    const code = createPromoCode();
    clearWheelTimers();
    setNeedsTime(false);
    setDateCode(code);
    setPromoCode("");
    setPromoError("");
    setScratchRevealed(false);
    setRouletteReady(false);
    setIsSpinning(false);
    setSpinSeconds(15);
    setWheelRotation(0);
    setDateResult(null);
    setModalOpen(true);
  };

  const spinWheel = () => {
    clearWheelTimers();

    const randomValues = new Uint32Array(2);
    window.crypto.getRandomValues(randomValues);
    const winnerIndex = Math.floor(
      (randomValues[0] / 4_294_967_296) * dateOptions.length,
    );
    const slice = 360 / dateOptions.length;
    const targetAngle = (360 - (winnerIndex * slice + slice / 2)) % 360;
    const extraTurns = 6 + (randomValues[1] % 3);

    setWheelRotation((current) => {
      const currentAngle = ((current % 360) + 360) % 360;
      const alignment = (targetAngle - currentAngle + 360) % 360;
      return current + extraTurns * 360 + alignment;
    });
    setDateResult(null);
    setSpinSeconds(15);
    setIsSpinning(true);

    window.requestAnimationFrame(() => {
      rouletteStage.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    });

    const startedAt = Date.now();
    countdownTimer.current = window.setInterval(() => {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000);
      setSpinSeconds(Math.max(0, 15 - elapsed));
    }, 250);

    wheelTimer.current = window.setTimeout(() => {
      if (countdownTimer.current !== null) {
        window.clearInterval(countdownTimer.current);
        countdownTimer.current = null;
      }
      setSpinSeconds(0);
      setIsSpinning(false);
      setDateResult(dateOptions[winnerIndex]);
      wheelTimer.current = null;
    }, 15_000);
  };

  const unlockRoulette = () => {
    const normalizedCode = promoCode.trim().toUpperCase();

    if (!/^[0-9A-HJKMNP-TV-Z]{8}$/.test(normalizedCode)) {
      setPromoError("Проверь промокод: в нём должно быть 8 символов.");
      return;
    }

    if (normalizedCode !== dateCode) {
      setPromoError(
        "Этот код не совпал. Внимательно перепечатай его со скретч-карты.",
      );
      return;
    }

    setPromoCode(normalizedCode);
    setPromoError("");
    setRouletteReady(true);
    window.setTimeout(spinWheel, 120);
  };

  const telegramText = encodeURIComponent(
    dateResult
      ? `Никита, я согласна на свидание 🤍\nМой код: ${dateCode}\nМне выпало: ${dateResult.title}`
      : `Никита, я согласна на свидание 🤍\nМой код: ${dateCode}`,
  );
  const noHints = [
    "Котик придержал кнопку…",
    "Он просто очень волнуется",
    "Ловко. Но решение всё равно твоё",
  ];
  const noHint = noHints[Math.min(escapeCount - 1, noHints.length - 1)];

  return (
    <main>
      <div className="ambient" aria-hidden="true">
        <span className="ambient-dot dot-one" />
        <span className="ambient-dot dot-two" />
        <span className="ambient-dot dot-three" />
      </div>

      <header className="topbar">
        <a className="brand" href="#top" aria-label="В начало страницы">
          <span className="brand-mark">Н</span>
          <span>
            <strong>для Насти</strong>
            <small>лично от Никиты</small>
          </span>
        </a>
        <nav aria-label="Навигация по письму">
          <a href="#letter">Письмо</a>
          <a href="#memories">Моменты</a>
          <a href="#sky">Наше небо</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy" data-reveal>
          <p className="eyebrow">
            <span>✦</span> самое важное письмо
          </p>
          <h1>
            Настя,
            <span>мне важно сказать это честно.</span>
          </h1>
          <p className="hero-lead">
            Я сильно тебя ранил. У моего поступка нет оправданий, и я понимаю:
            одного «прости» недостаточно.
          </p>
          <p className="hero-note">
            Ты очень дорога мне. Поэтому я хочу не обещать — я хочу показывать
            свои изменения поступками.
          </p>
          <a className="primary-link" href="#letter">
            Прочитать до конца <span aria-hidden="true">↓</span>
          </a>
          <p className="hero-signature">— Никита</p>
        </div>

        <div className="hero-visual" data-reveal>
          <div className="cat-card">
            <div className="cat-halo" aria-hidden="true" />
            <img
              className="hero-cat"
              src={`${BASE_PATH}/assets/kotik-nastya.webp`}
              alt="Милый чёрно-белый 3D-котик держит конверт"
              fetchPriority="high"
            />
            <span className="cat-star star-one" aria-hidden="true">
              ✦
            </span>
            <span className="cat-star star-two" aria-hidden="true">
              ✦
            </span>
            <span className="cat-star star-three" aria-hidden="true">
              ·
            </span>
            <span className="cat-message">у него тоже есть что сказать</span>
          </div>
          <span className="tape tape-top" aria-hidden="true" />
          <span className="tape tape-bottom" aria-hidden="true" />
        </div>
      </section>

      <section className="section film-note-section" aria-labelledby="film-note-title">
        <div className="film-note-card" data-reveal>
          <span className="film-note-sticker" aria-hidden="true">
            🎞️
          </span>
          <p className="section-kicker">сначала — один важный момент</p>
          <h2 id="film-note-title">Посмотри, пожалуйста.</h2>
          <p>
            Первое, что я хотел бы сказать, уже красиво сказано за меня в одном
            из фильмов. Я хочу, чтобы ты прожила вместе со мной эмоции этого
            персонажа — и не подумала, что слышишь очередную ложь или лесть.
          </p>
          <div className="film-search">
            <small>Открой интернет и напиши в поиске</small>
            <strong>Зеленая книга 1:09:27</strong>
          </div>
          <p className="film-note-last">
            Я хочу, чтобы ты поняла эти слова и приняла как данность: так
            останется навсегда.
          </p>
        </div>
      </section>

      <section className="section letter-section" id="letter">
        <div className="section-heading" data-reveal>
          <p className="section-kicker">без оправданий</p>
          <h2>Я хочу всё исправить.</h2>
        </div>

        <div className="letter-card" data-reveal>
          <div className="letter-body">
            <p className="letter-opening">Настя,</p>
            <p>
              Я понимаю, что доверие не возвращается за один разговор. Для него
              нужны время, честность и реальные действия. Я не прошу тебя
              забыть то, что случилось, и не хочу торопить.
            </p>
            <p>
              Я начал меняться с главного: перестал искать оправдания и честно
              увидел, сколько боли причинил. Мне хочется стать человеком, рядом
              с которым тебе спокойно — человеком, который слышит, бережёт и
              отвечает за свои поступки.
            </p>
            <p>
              Я люблю тебя. И если ты позволишь, буду шаг за шагом доказывать,
              что способен быть лучше и беречь то, что между нами есть.
            </p>
            <p className="handwritten">Никита</p>
          </div>
          <aside className="letter-aside">
            <span className="aside-sticker" aria-hidden="true">
              ✉️
            </span>
            <p>Не «я уже всё исправил».</p>
            <strong>А «я начал и не остановлюсь».</strong>
            <span className="aside-footnote">делами · каждый день</span>
          </aside>
        </div>

        <div className="promise-grid">
          {promises.map((promise) => (
            <article className="promise-card" data-reveal key={promise.number}>
              <span className="promise-number">{promise.number}</span>
              <h3>{promise.title}</h3>
              <p>{promise.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="memories-wrap" id="memories">
        <div className="section memories-section">
          <div className="section-heading memories-heading" data-reveal>
            <p className="section-kicker">наша маленькая вселенная</p>
            <h2>У нас было столько настоящего.</h2>
            <p>
              Я собрал здесь моменты, которые до сих пор живут во мне. Не чтобы
              спрятаться в прошлом — а чтобы помнить, почему за наше будущее
              стоит бороться.
            </p>
          </div>

          <div className="memory-grid">
            {memories.map((memory) => (
              <article
                className={`memory-card ${memory.className}`}
                data-reveal
                key={memory.title}
              >
                <div className="memory-stickers" aria-hidden="true">
                  {memory.stickers.map((sticker, index) => (
                    <span className={`memory-sticker sticker-${index + 1}`} key={sticker}>
                      {sticker}
                    </span>
                  ))}
                </div>
                <p className="memory-label">{memory.label}</p>
                <h3>{memory.title}</h3>
                <p>{memory.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section sky-section" id="sky">
        <div className="sky-panel">
          <div className="sky-stars" aria-hidden="true">
            <span>✦</span>
            <span>·</span>
            <span>✦</span>
            <span>·</span>
            <span>✦</span>
          </div>
          <div className="section-heading sky-heading" data-reveal>
            <p className="section-kicker">NASA · Astronomy Picture of the Day</p>
            <h2>Три дня под одним небом.</h2>
            <p>
              NASA каждый день сохраняет новый кадр Вселенной. Вот три даты —
              и три напоминания, что даже после самой долгой темноты свет снова
              находит дорогу.
            </p>
          </div>

          <div className="nasa-grid">
            {nasaMoments.map((moment, index) => (
              <article className="nasa-card" data-reveal key={moment.date}>
                <a
                  className="nasa-image-wrap"
                  href={moment.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Открыть снимок ${moment.title} на сайте NASA`}
                >
                  <img
                    src={`${BASE_PATH}${moment.image}`}
                    alt={moment.alt}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="nasa-index">0{index + 1}</span>
                  <span className="nasa-open">NASA ↗</span>
                </a>
                <div className="nasa-content">
                  <p className="nasa-date">{moment.date}</p>
                  <h3>{moment.title}</h3>
                  <p className="nasa-fact">{moment.fact}</p>
                  <p className="nasa-romantic">«{moment.romantic}»</p>
                  <p className="nasa-credit">Фото: {moment.credit}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section invitation-section" id="invitation">
        <div className="invitation-card" data-reveal>
          <div className="invitation-copy">
            <p className="section-kicker">одно маленькое «а что, если?»</p>
            <h2>Настя, можно пригласить тебя на свидание?</h2>
            <p>
              Без ожиданий и тяжёлого разговора «по расписанию». Просто провести
              время вместе так, как будет комфортно тебе. А дальше я буду
              слушать.
            </p>
            <div className="choice-row">
              <button className="yes-button" type="button" onClick={acceptDate}>
                Да, давай увидимся
                <span aria-hidden="true">🤍</span>
              </button>

              <div className="no-zone">
                <button
                  className="no-button"
                  type="button"
                  style={{
                    transform: `translate3d(${noOffset.x}px, ${noOffset.y}px, 0)`,
                  }}
                  onPointerEnter={(event) => {
                    lastPointerType.current = event.pointerType;
                    if (event.pointerType === "mouse") moveNoButton();
                  }}
                  onPointerDown={(event) => {
                    lastPointerType.current = event.pointerType;
                    if (event.pointerType === "mouse") {
                      event.preventDefault();
                      moveNoButton();
                    }
                  }}
                  onKeyDown={() => {
                    lastPointerType.current = "keyboard";
                  }}
                  onClick={(event) => {
                    if (lastPointerType.current === "mouse") {
                      event.preventDefault();
                      moveNoButton();
                      return;
                    }
                    setNeedsTime(true);
                  }}
                >
                  Нет
                </button>
              </div>
            </div>
            <p className="no-hint" aria-live="polite">
              {escapeCount > 0
                ? noHint
                : "Кнопка «Нет» немного стесняется курсора"}
            </p>
            {needsTime && (
              <p className="respect-note" role="status">
                Я понимаю. Спасибо, что дочитала. Я не буду тебя торопить.
              </p>
            )}
            <p className="choice-footnote">
              Какой бы ни был ответ — твои чувства и границы важны.
            </p>
          </div>

          <div className="invite-cat" aria-hidden="true">
            <img
              src={`${BASE_PATH}/assets/kotik-nastya.webp`}
              alt=""
              loading="lazy"
            />
            <span className="paw-sticker">🐾</span>
          </div>
        </div>
      </section>

      {modalOpen && dateCode && (
        <div
          className="date-modal-backdrop"
          role="presentation"
          onPointerDown={(event) => {
            if (event.currentTarget === event.target) setModalOpen(false);
          }}
        >
          <section
            className="date-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="date-modal-title"
          >
            <button
              className="modal-close"
              type="button"
              aria-label="Закрыть окно"
              onClick={() => setModalOpen(false)}
            >
              ×
            </button>

            <header className="modal-header">
              <p className="section-kicker">секретное приглашение · 01</p>
              <h2 id="date-modal-title">Узнать, что за свидание?</h2>
              <p>
                Сначала сотри защитный слой, найди свой код и сама введи его в
                поле. Совпадение откроет рулетку.
              </p>
            </header>

            <ScratchCard
              key={dateCode}
              code={dateCode}
              onReveal={() => {
                setScratchRevealed(true);
                window.setTimeout(() => promoInput.current?.focus(), 100);
              }}
            />

            <form
              className="promo-form"
              onSubmit={(event) => {
                event.preventDefault();
                unlockRoulette();
              }}
            >
              <label htmlFor="date-promo">Введи промокод на свидание</label>
              <div className="promo-row">
                <input
                  ref={promoInput}
                  id="date-promo"
                  value={promoCode}
                  type="text"
                  inputMode="text"
                  autoComplete="off"
                  autoCapitalize="characters"
                  spellCheck={false}
                  maxLength={8}
                  placeholder={
                    scratchRevealed ? "8 символов со скретч-карты" : "Сначала открой код"
                  }
                  disabled={!scratchRevealed || isSpinning || Boolean(dateResult)}
                  aria-invalid={Boolean(promoError)}
                  aria-describedby={promoError ? "promo-error" : "promo-help"}
                  onChange={(event) => {
                    setPromoCode(event.target.value.toUpperCase());
                    setPromoError("");
                  }}
                />
                <button
                  type="submit"
                  disabled={!scratchRevealed || isSpinning || Boolean(dateResult)}
                >
                  {isSpinning
                    ? "Рулетка крутится…"
                    : dateResult
                      ? "Код использован ✓"
                      : "Проверить и крутить"}
                </button>
              </div>
              {promoError ? (
                <p className="promo-error" id="promo-error" role="alert">
                  {promoError}
                </p>
              ) : (
                <p className="promo-help" id="promo-help">
                  {scratchRevealed
                    ? "Перепечатай код внимательно — буквы I, L, O и U не используются."
                    : "Зажми мышку или палец и стирай слой понемногу."}
                </p>
              )}
            </form>

            <section className="options-preview" aria-labelledby="options-title">
              <div className="options-heading">
                <div>
                  <p className="section-kicker">до запуска рулетки</p>
                  <h3 id="options-title">Посмотри, что может выпасть</h3>
                </div>
                <span>7 вариантов</span>
              </div>
              <div className="options-grid">
                {dateOptions.map((option) => (
                  <article key={option.title}>
                    <img
                      src={`${BASE_PATH}${option.image}`}
                      alt=""
                      loading="lazy"
                    />
                    <p>{option.title}</p>
                  </article>
                ))}
              </div>
              <p className="extra-promos">
                <span aria-hidden="true">✦</span> Дополнительные промокоды на
                свидание можно получить по договорённости 😏
              </p>
            </section>

            {rouletteReady && (
              <div
                ref={rouletteStage}
                className="roulette-stage"
                aria-live="polite"
              >
                <div className="wheel-area">
                  <div className="wheel-pointer" aria-hidden="true">
                    <span>▼</span>
                  </div>
                  <div className="wheel-shell">
                    <div
                      className={`roulette-wheel ${isSpinning ? "is-spinning" : ""}`}
                      style={
                        {
                          "--wheel-rotation": `${wheelRotation}deg`,
                        } as CSSProperties
                      }
                    >
                      {dateOptions.map((option, index) => (
                        <span
                          className="wheel-option"
                          style={
                            {
                              "--option-angle": `${
                                index * (360 / dateOptions.length) +
                                180 / dateOptions.length
                              }deg`,
                            } as CSSProperties
                          }
                          title={option.title}
                          key={option.title}
                        >
                          <span>
                            <img src={`${BASE_PATH}${option.image}`} alt="" />
                          </span>
                        </span>
                      ))}
                    </div>
                    <div className="wheel-center" aria-hidden="true">
                      Н<span>+</span>Н
                    </div>
                  </div>
                </div>

                <div className="roulette-status">
                  <strong>
                    {dateResult
                      ? "Выбрано!"
                      : isSpinning
                        ? `Вселенная решает · ${spinSeconds} сек`
                        : "Готовим рулетку…"}
                  </strong>
                  <span className="roulette-progress" aria-hidden="true">
                    <i className={isSpinning ? "is-spinning" : ""} />
                  </span>
                </div>

                <div className="roulette-legend" aria-label="Варианты свидания">
                  {dateOptions.map((option) => (
                    <span
                      className={dateResult?.title === option.title ? "is-winner" : ""}
                      key={option.title}
                    >
                      <b aria-hidden="true">
                        <img src={`${BASE_PATH}${option.image}`} alt="" />
                      </b>
                      {option.short}
                    </span>
                  ))}
                </div>

                {dateResult && (
                  <div className="roulette-result">
                    <span className="result-icon" aria-hidden="true">
                      <img src={`${BASE_PATH}${dateResult.image}`} alt="" />
                    </span>
                    <p>Настя, тебе выпало</p>
                    <h3>{dateResult.title}</h3>
                    <div className="expense-note">
                      <span aria-hidden="true">*</span>
                      <p>
                        Бронь, билеты, платье и все прочие расходы я беру на
                        себя. — Никита
                      </p>
                    </div>
                    <a
                      className="telegram-link"
                      href={`https://t.me/kikisolda?text=${telegramText}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Отправить Никите в @kikisolda <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      )}

      <section className="section final-words-section" aria-label="Самые важные слова">
        <div className="final-words" data-reveal>
          <span className="final-heart" aria-hidden="true">♡</span>
          <p>Можем ли мы начать всё сначала?</p>
          <p>Забудем прошлое...</p>
          <p>Давай исправим то, что я разрушил.</p>
          <p>Давай попробуем снова, но с другим сердцем.</p>
          <p>Потому что ты — мой человек...</p>
          <strong>И я всё равно выбираю тебя.</strong>
          <span className="final-signature">Никита</span>
        </div>
      </section>

      <footer>
        <p>С любовью, честностью и ответственностью.</p>
        <strong>Никита → Насте</strong>
        <span>сделано под тем же небом · 2026</span>
      </footer>
    </main>
  );
}
