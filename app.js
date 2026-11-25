const STORAGE_KEY = "unfleur-state";
const NOTE_TOAST_DURATION = 850;
const MILESTONE_MODAL_DELAY = 1100;
const BLOOMY_ART = {
  bg: "assets/journal-main-image.png",
  pot: "assets/journal-pot-image.png",
};

const BLOOMY_STAGES = [
  { pot: BLOOMY_ART.pot, className: "" },
  { pot: "assets/bloomy/Flower Pot Image.png", className: "is-stage-two" },
  { pot: "assets/bloomy/Flower Pot Image-1.png", className: "is-stage-three" },
  { pot: "assets/bloomy/Flower Pot Image-2.png", className: "is-stage-four" },
  { pot: "assets/bloomy/Flower Pot Image-3.png", className: "is-stage-five" },
  { pot: "assets/bloomy/Flower Pot Image-4.png", className: "is-stage-six" },
  { pot: "assets/bloomy/Flower Pot Image-4.png", className: "is-stage-seven" },
];

const ONBOARDING_SLIDES = [
  {
    image: "assets/onboarding-describe-day.png",
    titleKey: "onboardingTitle1",
    bodyKey: "onboardingBody1",
  },
  {
    image: "assets/onboarding-moodlets.png",
    titleKey: "onboardingTitle2",
    bodyKey: "onboardingBody2",
  },
  {
    image: "assets/onboarding-seed.png",
    titleKey: "onboardingTitle3",
    bodyKey: "onboardingBody3",
  },
  {
    image: "assets/onboarding-thrive.png",
    titleKey: "onboardingTitle4",
    bodyKey: "onboardingBody4",
  },
];

const defaults = {
  onboarded: true,
  registered: false,
  guest: false,
  drafts: {},
  profile: {
    name: "",
    purpose: "",
    email: "",
    notificationsEnabled: true,
  },
  pot: "blue",
  entries: [],
  adminVisitDay: 1,
  skippedJournalDays: 0,
  mockDataEnabled: false,
  demoPreferenceSet: false,
  language: "en",
};

let state = loadState();

const screens = document.querySelectorAll("[data-screen]");
const appScreen = document.querySelector(".screen-app");
const homeView = document.querySelector(".view-home");
const views = document.querySelectorAll("[data-view]");
const tabs = document.querySelectorAll("[data-tab]");
const title = document.querySelector("#view-title");
const subtitle = document.querySelector("#view-subtitle");
const journalView = document.querySelector(".view-journal");
const weeklyProgress = document.querySelector("#weekly-progress");
const homeEntryList = document.querySelector("#home-entry-list");
const potSheet = document.querySelector("#pot-sheet");
const plant = document.querySelector("#plant");
const profilePlant = document.querySelector("#profile-plant");
const profileSummary = document.querySelector("#profile-summary");
const profileName = document.querySelector("#profile-name");
const profileEmail = document.querySelector("#profile-email");
const profilePurpose = document.querySelector("#profile-purpose");
const profileNotifications = document.querySelector("#profile-notifications");
const profileToggle = document.querySelector(".profile-toggle");
const profileNameModal = document.querySelector("#profile-name-modal");
const profileEmailModal = document.querySelector("#profile-email-modal");
const profilePurposeModal = document.querySelector("#profile-purpose-modal");
const profileNameInput = document.querySelector("#profile-name-input");
const profileEmailInput = document.querySelector("#profile-email-input");
const profilePurposeOptions = document.querySelector("#profile-purpose-options");
const profileNameSave = document.querySelector("#profile-name-save");
const profileEmailSave = document.querySelector("#profile-email-save");
const welcomeNoteFlow = document.querySelector(".figma-note-flow");
const welcomeNoteCard = document.querySelector("#welcome-note-card");
const welcomeNote = document.querySelector("#welcome-note");
const welcomeCounter = document.querySelector("#welcome-counter");
const welcomeContinue = document.querySelector("#welcome-continue");
const welcomeScreen = document.querySelector(".screen-intro");
const micButton = document.querySelector(".figma-mic");
const moodletModal = document.querySelector("#moodlet-modal");
const moodletGrid = document.querySelector("#moodlet-grid");
const moodletContinue = document.querySelector("#moodlet-continue");
const selectedMoodletsBar = document.querySelector("#selected-moodlets-bar");
const selectedMoodletsNode = document.querySelector("#selected-moodlets");
const editMoodlets = document.querySelector("#edit-moodlets");
const congratsModal = document.querySelector("#congrats-modal");
const closeCongrats = document.querySelector("#close-congrats");
const onboardingModal = document.querySelector("#onboarding-modal");
const onboardingSheet = document.querySelector(".onboarding-sheet");
const onboardingTrack = document.querySelector("#onboarding-track");
const onboardingDots = document.querySelector("#onboarding-dots");
const onboardingNext = document.querySelector("#onboarding-next");
const stageTwoModal = document.querySelector("#stage-two-modal");
const closeStageTwo = document.querySelector("#close-stage-two");
const stageThreeModal = document.querySelector("#stage-three-modal");
const closeStageThree = document.querySelector("#close-stage-three");
const stageFourModal = document.querySelector("#stage-four-modal");
const closeStageFour = document.querySelector("#close-stage-four");
const stageFiveModal = document.querySelector("#stage-five-modal");
const closeStageFive = document.querySelector("#close-stage-five");
const stageSixModal = document.querySelector("#stage-six-modal");
const closeStageSix = document.querySelector("#close-stage-six");
const stageSevenModal = document.querySelector("#stage-seven-modal");
const closeStageSeven = document.querySelector("#close-stage-seven");
const missedModal = document.querySelector("#missed-modal");
const missedModalFrame = document.querySelector("#missed-modal-frame");
const missedModalBg = document.querySelector("#missed-modal-bg");
const missedModalPot = document.querySelector("#missed-modal-pot");
const missedTitle = document.querySelector("#missed-title");
const missedBody = document.querySelector("#missed-body");
const closeMissed = document.querySelector("#close-missed");
const homeNoteCard = document.querySelector("#home-note-card");
const homeNoteShell = document.querySelector("#home-note-shell");
const homeNote = document.querySelector("#home-note");
const homeCounter = document.querySelector("#home-counter");
const homeContinue = document.querySelector("#home-continue");
const homeMicButton = document.querySelector(".home-mic");
const homeSelectedMoodletsBar = document.querySelector("#home-selected-moodlets-bar");
const homeSelectedMoodletsNode = document.querySelector("#home-selected-moodlets");
const homeEditMoodlets = document.querySelector("#home-edit-moodlets");
const appNoteModal = document.querySelector("#app-note-modal");
const appNoteCard = document.querySelector("#app-note-card");
const appNote = document.querySelector("#app-note");
const appCounter = document.querySelector("#app-counter");
const appNotePrimary = document.querySelector("#app-note-primary");
const appNoteCancel = document.querySelector("#app-note-cancel");
const appMicButton = document.querySelector(".app-mic");
const appSelectedMoodletsBar = document.querySelector("#app-selected-moodlets-bar");
const appSelectedMoodletsNode = document.querySelector("#app-selected-moodlets");
const appEditMoodlets = document.querySelector("#app-edit-moodlets");
const noteToast = document.querySelector("#note-toast");
const noteToastText = noteToast?.querySelector("span:last-child");
const deleteConfirmModal = document.querySelector("#delete-confirm-modal");
const deleteConfirmYes = document.querySelector("#delete-confirm-yes");
const deleteConfirmNo = document.querySelector("#delete-confirm-no");
const adminModal = document.querySelector("#admin-modal");
const adminDayGrid = document.querySelector("#admin-day-grid");
const adminSkipOptions = document.querySelector("#admin-skip-options");
const adminSummary = document.querySelector("#admin-summary");
const adminSave = document.querySelector("#admin-save");
const adminControls = document.querySelector("#admin-controls");
const adminMockToggle = document.querySelector("#admin-mock-toggle");
const registerScreen = document.querySelector(".screen-register");
const registerSteps = document.querySelectorAll("[data-register-step]");
const registerName = document.querySelector("#register-name");
const registerEmail = document.querySelector("#register-email");
const registerPassword = document.querySelector("#register-password");
const loginEmail = document.querySelector("#login-email");
const loginPassword = document.querySelector("#login-password");
const registerPurposeOptions = document.querySelector("#register-purpose-options");
const languageButtons = document.querySelectorAll("[data-language]");

const moodlets = [
  ["Happy", "sun.png"],
  ["Sad", "rain-cloud.png"],
  ["Calm", "moon-and-stars.png"],
  ["Free", "butterfly.png"],
  ["Playful", "balloon.png"],
  ["Peaceful", "candle.png"],
  ["Tender", "flower.png"],
  ["Reflective", "winding-river.png"],
  ["Dreamy", "soft-cloud.png"],
  ["Hopeful", "paper-boat.png"],
  ["Cozy", "cup-of-tea.png"],
  ["Inspired", "shooting-star.png"],
  ["Optimistic", "rainbow.png"],
  ["Grateful", "pearl-shell.png"],
  ["Growing", "sprout.png"],
  ["Adventurous", "paper-plane.png"],
  ["Light", "dandelion.png"],
  ["Excited", "kite.png"],
  ["Fresh", "dew-drop-on-leaf.png"],
  ["Comforted", "lantern.png"],
  ["Gentle", "feather.png"],
  ["Sweet", "cherries.png"],
  ["Curious", "mushroom.png"],
  ["Restless", "ocean-wave.png"],
].map(([name, fileName]) => ({
  name,
  image: `assets/moodlets/${fileName}`,
}));

const moodletAliases = {
  Lonely: "Reflective",
  Romantic: "Tender",
  Searching: "Curious",
  Relaxed: "Peaceful",
  Social: "Adventurous",
  Vulnerable: "Tender",
  Flirty: "Sweet",
  Toxic: "Restless",
  Emotional: "Reflective",
  Soft: "Gentle",
  Radiant: "Optimistic",
};

const mockJournalNotes = [
  {
    text: "I watered Bloomy and wrote down the softest part of the morning. It felt small, but it still counted.",
    moodlets: ["Calm", "Growing", "Grateful"],
  },
  {
    text: "A strange, bright day. I noticed how much easier it is to breathe after naming what I actually feel.",
    moodlets: ["Curious", "Gentle", "Hopeful"],
  },
  {
    text: "I almost skipped this note, then gave myself two quiet minutes. Bloomy gets a little taller when I show up.",
    moodlets: ["Tender", "Inspired", "Growing"],
  },
  {
    text: "Today had a tiny win: I chose rest before everything became too loud. Keeping that one.",
    moodlets: ["Peaceful", "Cozy", "Free"],
  },
  {
    text: "There was a gentle moment in the middle of the mess. I want to remember that it was real.",
    moodlets: ["Reflective", "Grateful", "Optimistic"],
  },
  {
    text: "I made space for myself today, even if it was only a few sentences. That still feels like progress.",
    moodlets: ["Hopeful", "Calm", "Adventurous"],
  },
  {
    text: "Bloomy is starting to look less like a promise and more like proof that I came back.",
    moodlets: ["Dreamy", "Growing", "Happy"],
  },
];

const copy = {
  en: {
    appName: "UNFLEUR",
    welcomeTitle: "Welcome to Unfleur",
    homeTitle: "Take a moment for yourself",
    introBody: "A little space to reflect<br />and watch Bloomy grow.",
    introBodyCompact: "A little space to reflect and watch Bloomy grow.",
    homeBody: "Write about your day and watch Bloomy grow as you come back.",
    welcomeBody: "A journal for your thoughts, with a little plant to grow along the way.",
    reviewTitle: "Make it yours",
    reviewBody: "Add anything you’d like to remember, then save your entry.",
    startJournaling: "Create account",
    logIn: "Log in",
    loginBody: "Use sample credentials to try the demo.",
    continue: "Continue",
    save: "Save",
    saveNote: "Save entry",
    addMoodlets: "Add moodlets",
    localJournal: "Your entries are saved in this browser.",
    accountOptions: "Account demo",
    useLocalJournal: "Back to local journal",
    discard: "Discard",
    cancel: "Cancel",
    notePrompt: "How’s your day going?",
    notePlaceholder: "Write a few words about your day…",
    symbols: "characters",
    voiceNote: "Dictate entry",
    editMoodlets: "Edit moodlets",
    step1: "Step 1 of 4",
    step2: "Step 2 of 4",
    step3: "Step 3 of 4",
    step4: "Step 4 of 4",
    questionName: "What is your name?",
    questionPurpose: "What brings you to journaling?",
    questionEmail: "Enter your email",
    questionPassword: "Create your password",
    nameTagline: "Type your name below.",
    purposeTagline: "Choose what feels most true today.",
    emailTagline: "Use a sample email for this demo.",
    passwordTagline: "Use a sample password for this demo.",
    back: "Back",
    name: "Name",
    email: "Email",
    password: "Password",
    namePlaceholder: "Enter your name",
    emailPlaceholder: "you@example.com",
    passwordPlaceholder: "Create a password",
    enterUnfleur: "Enter Unfleur",
    loginPasswordPlaceholder: "Password",
    purposeReflect: "Reflect on my days",
    purposeEmotions: "Understand my emotions",
    purposeHabit: "Build a daily habit",
    purposeCalmer: "Feel calmer",
    myJournal: "My Journal",
    myProfile: "My Profile",
    hello: "Hello",
    addEntry: "Add entry",
    openAdmin: "Open admin controls",
    bloomingPlant: "Your blooming plant",
    profileSettings: "Profile settings",
    editPlan: "Edit plan",
    editEmail: "Edit email",
    editPurpose: "Edit purpose",
    purpose: "Purpose",
    notifications: "Notifications",
    allowed: "Allowed",
    off: "Off",
    notificationsAllowed: "Notifications allowed",
    notificationsOff: "Notifications off",
    logOut: "Log out",
    deleteAccount: "Delete my account",
    mainNavigation: "Main navigation",
    home: "Home",
    journal: "Journal",
    profile: "Profile",
    congratsTitle: "You planted a seed!",
    congratsBody: "Your first entry planted Bloomy’s seed. Come back whenever you’d like to write again.",
    congratsButton: "Back to journal",
    onboardingKicker: "How it works",
    onboardingTitle1: "Describe your day",
    onboardingBody1: "Write what happened, what felt heavy, or what made you smile. A few honest lines are enough.",
    onboardingTitle2: "Add moodlets",
    onboardingBody2: "Pick up to three moodlets to capture how you felt. You can also save an entry without them.",
    onboardingTitle3: "Plant the first seed",
    onboardingBody3: "Your first entry plants Bloomy’s seed.",
    onboardingTitle4: "Watch Bloomy thrive",
    onboardingBody4: "Come back to write and see how Bloomy grows.",
    startJournalingButton: "Start Journaling",
    stage2Title: "Bloomy has sprouted",
    stage2Body: "You made time to reflect two days in a row.",
    stage3Title: "Bloomy is growing",
    stage3Body: "That’s three days of journaling in a row.",
    stage4Title: "Four days of reflection",
    stage4Body: "Bloomy is growing right alongside your journaling habit.",
    stage5Title: "Bloomy has a bud",
    stage5Body: "You’ve made time to write five days in a row.",
    stage6Title: "Bloomy is almost ready to bloom",
    stage6Body: "Six days in a row. Come back tomorrow to see what opens up.",
    stage7Title: "Bloomy is in full bloom",
    stage7Body: "You’ve journaled for seven days in a row.",
    okThanks: "Got it",
    missed1Title: "Welcome back",
    missed1Body: "Pick up whenever you’re ready. A few words about today are enough.",
    missed2Title: "Good to see you again",
    missed2Body: "Take a moment to write about today whenever you feel ready.",
    startOver: "Continue",
    adminTitle: "Bloomy admin",
    adminBody: "Set Bloomy’s current streak and recent skipped days.",
    mockData: "Show sample garden",
    dayInRow: "Days in a streak before the current one",
    skippedBeforeToday: "Skipped days before today",
    none: "None",
    oneDay: "1 day",
    twoDays: "2 days",
    apply: "Apply",
    mockActive: "Sample garden is on. Previous streak: {day} days. Skipped days: {skipped}.",
    mockCleared: "Sample garden is off. You’re viewing your own journal.",
    skippedTitle: "No entry that day",
    skippedBody: "Your journal is here whenever you want to write again.",
    noEntriesTitle: "No entries yet",
    noEntriesBody: "Your entries for today will appear here.",
    pastNoEntriesTitle: "No entry that day",
    pastNoEntriesBody: "There’s nothing saved for this date.",
    editEntry: "Edit entry",
    deleteEntry: "Delete entry",
    showMore: "Show more",
    showLess: "Show less",
    profileSummary: "Bloomy is at growth stage {stage} of 7.",
    noteSaved: "Entry saved",
    noteDeleted: "Entry deleted",
    deleteConfirmTitle: "Delete this entry?",
    deleteConfirmBody: "This action can’t be undone.",
    yesDelete: "Delete entry",
    noCancel: "Cancel",
    moodletTitle: "Choose up to 3 moodlets",
    moodletBody: "Pick what matches how you felt today.",
    choosePot: "Choose your pot",
    potBody: "Pick a pot for Bloomy.",
    done: "Done",
    today: "Today",
    voiceUnavailable: "Voice input is not available in this browser",
    placeholderName: "[Name]",
    placeholderEmail: "[email]",
    placeholderPurpose: "[purpose]",
  },
  ua: {
    appName: "UNFLEUR",
    welcomeTitle: "Вітаємо в Unfleur",
    homeTitle: "Знайди хвилинку для себе",
    introBody: "Трохи часу для себе.<br />Подивись, як росте Блумі.",
    introBodyCompact: "Трохи часу для себе. Подивись, як росте Блумі.",
    homeBody: "Пиши про свій день і спостерігай, як росте Блумі.",
    welcomeBody: "Щоденник для твоїх думок і маленька рослина, що ростиме разом із тобою.",
    reviewTitle: "Збережи те, що важливо",
    reviewBody: "Додай усе, що хочеш запам’ятати, і збережи запис.",
    startJournaling: "Створити акаунт",
    logIn: "Увійти",
    loginBody: "Для входу в демо використай тестові дані.",
    continue: "Продовжити",
    save: "Зберегти",
    saveNote: "Зберегти запис",
    addMoodlets: "Додати мудлети",
    localJournal: "Твої записи зберігаються в цьому браузері.",
    accountOptions: "Демо облікового запису",
    useLocalJournal: "Назад до локального щоденника",
    discard: "Скасувати зміни",
    cancel: "Скасувати",
    notePrompt: "Як минає твій день?",
    notePlaceholder: "Напиши кілька слів про свій день…",
    symbols: "символів",
    voiceNote: "Продиктувати запис",
    editMoodlets: "Змінити мудлети",
    step1: "Крок 1 з 4",
    step2: "Крок 2 з 4",
    step3: "Крок 3 з 4",
    step4: "Крок 4 з 4",
    questionName: "Як тебе звати?",
    questionPurpose: "Чому ти хочеш вести щоденник?",
    questionEmail: "Введи email",
    questionPassword: "Створи пароль",
    nameTagline: "Введи своє ім’я нижче.",
    purposeTagline: "Обери те, що зараз відгукується найбільше.",
    emailTagline: "Для демо підійде тестова адреса.",
    passwordTagline: "Для демо підійде тестовий пароль.",
    back: "Назад",
    name: "Ім’я",
    email: "Email",
    password: "Пароль",
    namePlaceholder: "Введи своє ім’я",
    emailPlaceholder: "you@example.com",
    passwordPlaceholder: "Створи пароль",
    enterUnfleur: "Увійти в Unfleur",
    loginPasswordPlaceholder: "Пароль",
    purposeReflect: "Осмислювати свої дні",
    purposeEmotions: "Краще розуміти емоції",
    purposeHabit: "Сформувати щоденну звичку",
    purposeCalmer: "Почуватися спокійніше",
    myJournal: "Мій щоденник",
    myProfile: "Мій профіль",
    hello: "Привіт",
    addEntry: "Додати запис",
    openAdmin: "Відкрити адмін-панель",
    bloomingPlant: "Твоя квітуча рослина",
    profileSettings: "Налаштування профілю",
    editPlan: "Редагувати план",
    editEmail: "Редагувати email",
    editPurpose: "Редагувати мету",
    purpose: "Мета",
    notifications: "Сповіщення",
    allowed: "Дозволено",
    off: "Вимкнено",
    notificationsAllowed: "Сповіщення дозволено",
    notificationsOff: "Сповіщення вимкнено",
    logOut: "Вийти",
    deleteAccount: "Видалити акаунт",
    mainNavigation: "Головна навігація",
    home: "Головна",
    journal: "Щоденник",
    profile: "Профіль",
    congratsTitle: "Насінину посаджено!",
    congratsBody: "З першого запису починає рости Блумі. Повертайся, коли захочеш знову написати.",
    congratsButton: "До щоденника",
    onboardingKicker: "Як це працює",
    onboardingTitle1: "Опиши свій день",
    onboardingBody1: "Запиши, що сталося, що було важким або що змусило усміхнутися. Кількох чесних рядків достатньо.",
    onboardingTitle2: "Додай мудлети",
    onboardingBody2: "Обери до трьох мудлетів, які передають твій настрій. Запис можна зберегти й без них.",
    onboardingTitle3: "Посади перше зернятко",
    onboardingBody3: "Твій перший запис садить насінину Блумі.",
    onboardingTitle4: "Дивись, як Блумі росте",
    onboardingBody4: "Повертайся до щоденника й дивись, як росте Блумі.",
    startJournalingButton: "Почати писати",
    stage2Title: "Блумі проростає",
    stage2Body: "Ти знаходиш час для записів уже два дні поспіль.",
    stage3Title: "Блумі росте",
    stage3Body: "Уже три дні зі щоденником поспіль.",
    stage4Title: "Чотири дні зі щоденником",
    stage4Body: "Блумі росте разом із твоєю звичкою писати.",
    stage5Title: "У Блумі з’явився бутон",
    stage5Body: "Ти знаходиш час для записів уже п’ять днів поспіль.",
    stage6Title: "Блумі ось-ось розквітне",
    stage6Body: "Шість днів поспіль. Завітай завтра, щоб побачити, що розквітне.",
    stage7Title: "Блумі розквітнув",
    stage7Body: "Уже сім днів зі щоденником поспіль.",
    okThanks: "Зрозуміло",
    missed1Title: "З поверненням",
    missed1Body: "Пиши, коли захочеш. Кількох слів про сьогодні достатньо.",
    missed2Title: "Раді знову бачити тебе",
    missed2Body: "Можеш написати кілька слів про сьогодні, коли захочеш.",
    startOver: "Продовжити",
    adminTitle: "Адмінка Блумі",
    adminBody: "Налаштуй поточну серію Блумі та нещодавні пропущені дні.",
    mockData: "Показати демо-сад",
    dayInRow: "Дні в серії перед поточним днем",
    skippedBeforeToday: "Пропущені дні перед сьогодні",
    none: "Немає",
    oneDay: "1 день",
    twoDays: "2 дні",
    apply: "Застосувати",
    mockActive: "Демо-сад увімкнено. Попередня серія: {day} дн. Пропущено: {skipped} дн.",
    mockCleared: "Демо-сад вимкнено. Ти переглядаєш свій щоденник.",
    skippedTitle: "Цього дня немає записів",
    skippedBody: "Повертайся до щоденника, коли захочеш написати.",
    noEntriesTitle: "Записів ще немає",
    noEntriesBody: "Тут з’являться твої записи за сьогодні.",
    pastNoEntriesTitle: "Цього дня немає записів",
    pastNoEntriesBody: "За цією датою нічого не збережено.",
    editEntry: "Редагувати запис",
    deleteEntry: "Видалити запис",
    showMore: "Показати більше",
    showLess: "Показати менше",
    profileSummary: "Етап росту Блумі: {stage} із 7.",
    noteSaved: "Запис збережено",
    noteDeleted: "Запис видалено",
    deleteConfirmTitle: "Видалити цей запис?",
    deleteConfirmBody: "Цю дію не можна скасувати.",
    yesDelete: "Видалити запис",
    noCancel: "Скасувати",
    moodletTitle: "Обери до трьох мудлетів",
    moodletBody: "Обери ті, які передають твій сьогоднішній настрій.",
    choosePot: "Обери горщик",
    potBody: "Обери горщик для Блумі.",
    done: "Готово",
    today: "Сьогодні",
    voiceUnavailable: "Голосове введення недоступне в цьому браузері",
    placeholderName: "[Ім’я]",
    placeholderEmail: "[email]",
    placeholderPurpose: "[мета]",
  },
};

const localeByLanguage = {
  en: "en",
  ua: "uk-UA",
};

let selectedMoodlets = [];
let homeSelectedMoodlets = [];
let appSelectedMoodlets = [];
let activeMoodletTarget = "welcome";
let recognition;
let isListening = false;
let voiceTarget = null;
let toastTimer;
let editingEntryId = null;
let selectedDayKey = dayKey(new Date());
let adminDraftVisitDay = state.adminVisitDay;
let adminDraftSkippedDays = state.skippedJournalDays;
let registerStepIndex = 0;
let registerPurpose = state.profile?.purpose || "";
let onboardingStepIndex = 0;
let onboardingTransitionTimer = null;
let isOnboardingTransitioning = false;
let onboardingGesture = null;
let profilePurposeDraft = state.profile?.purpose || "";
let pendingDeleteEntryId = "";
let homeEntranceTimer = null;
let welcomeEntranceTimer = null;
let homeEntrancePlayed = false;
let welcomeEntrancePlayed = false;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return {
      ...defaults,
      ...saved,
      drafts: saved?.drafts || {},
      mockDataEnabled: saved?.demoPreferenceSet === true && saved.mockDataEnabled === true,
    };
  } catch {
    return { ...defaults, drafts: {} };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function language() {
  return copy[state.language] ? state.language : "en";
}

function locale() {
  return localeByLanguage[language()];
}

function t(key, values = {}) {
  const phrase = copy[language()]?.[key] ?? copy.en[key] ?? key;
  return Object.entries(values).reduce((result, [name, value]) => result.replaceAll(`{${name}}`, value), phrase);
}

function setText(selector, key, values = {}) {
  document.querySelectorAll(selector).forEach((node) => {
    node.textContent = t(key, values);
  });
}

function setHTML(selector, key, values = {}) {
  document.querySelectorAll(selector).forEach((node) => {
    node.innerHTML = t(key, values);
  });
}

function setAttr(selector, attr, key) {
  document.querySelectorAll(selector).forEach((node) => {
    node.setAttribute(attr, t(key));
  });
}

function purposeLabel(value) {
  const purposeKeys = {
    "Reflect on my days": "purposeReflect",
    "Understand my emotions": "purposeEmotions",
    "Build a daily habit": "purposeHabit",
    "Feel calmer": "purposeCalmer",
  };
  return purposeKeys[value] ? t(purposeKeys[value]) : value;
}

function ensureProfileState() {
  state.profile = {
    name: state.profile?.name || "",
    purpose: state.profile?.purpose || "",
    email: state.profile?.email || "",
    notificationsEnabled: state.profile?.notificationsEnabled !== false,
  };
}

function formatMonth(date = new Date()) {
  return date.toLocaleDateString(locale(), { month: "long", year: "numeric" });
}

function formatEntryDate(value) {
  const date = new Date(value);
  const today = new Date();
  const sameDay = date.toDateString() === today.toDateString();
  return `${sameDay ? t("today") : date.toLocaleDateString(locale(), { month: "short", day: "numeric" })}, ${date.toLocaleTimeString(locale(), { hour: "numeric", minute: "2-digit" })}`;
}

function startOfToday() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

function addDays(value, offset) {
  const date = new Date(value);
  date.setDate(date.getDate() + offset);
  return date;
}

function dayKey(value) {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function hasTodayEntry() {
  const today = dayKey(startOfToday());
  return state.entries.some((entry) => dayKey(entry.date) === today);
}

function realGrowthDay() {
  return Math.min(new Set(state.entries.map((entry) => dayKey(entry.date))).size, 7);
}

function skippedJournalDaysBeforeToday() {
  normalizeBloomyState();
  if (state.mockDataEnabled) return state.skippedJournalDays;
  if (!state.entries.length || hasTodayEntry()) return 0;

  const latestEntryDate = state.entries
    .map((entry) => new Date(entry.date))
    .sort((a, b) => b - a)[0];
  latestEntryDate.setHours(0, 0, 0, 0);
  const diffInDays = Math.round((startOfToday() - latestEntryDate) / 86400000);
  return Math.min(Math.max(diffInDays - 1, 0), 2);
}

function streakCount(endDate = startOfToday()) {
  const days = new Set(state.entries.map((entry) => dayKey(entry.date)));
  let cursor = new Date(endDate);
  let streak = 0;

  while (days.has(dayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return Math.min(streak, 7);
}

function bloomyDisplayStage() {
  normalizeBloomyState();
  if (state.mockDataEnabled) {
    return Math.max(1, Math.min(state.adminVisitDay, 7));
  }

  const today = startOfToday();
  const streakEnd = hasTodayEntry() ? today : addDays(today, -1);
  return Math.max(1, realGrowthDay() || streakCount(streakEnd));
}

function bloomyImageForStage(stage) {
  return { bg: BLOOMY_ART.bg, ...BLOOMY_STAGES[stage - 1] };
}

function mockJournalModel() {
  normalizeBloomyState();
  if (!state.mockDataEnabled) {
    return realJournalModel();
  }

  const today = startOfToday();
  const completed = new Set();
  const missed = new Set();
  const entriesByDay = new Map();

  for (let index = 1; index <= state.skippedJournalDays; index += 1) {
    missed.add(dayKey(addDays(today, -index)));
  }

  let completedCount = 0;
  let dayOffset = 1;
  const previousCompletedDays = Math.max(0, Math.min(state.adminVisitDay, 7));
  while (completedCount < previousCompletedDays) {
    const date = addDays(today, -dayOffset);
    const key = dayKey(date);
    dayOffset += 1;
    if (missed.has(key)) continue;

    const note = mockJournalNotes[completedCount % mockJournalNotes.length];
    completed.add(key);
    entriesByDay.set(key, [
      {
        id: `mock-${key}-primary`,
        date: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 19, 20 - (completedCount % 4) * 7).toISOString(),
        text: note.text,
        moodlets: note.moodlets,
        isMock: true,
      },
      {
        id: `mock-${key}-reflection`,
        date: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9, 12 + (completedCount % 5) * 6).toISOString(),
        text: mockJournalNotes[(completedCount + 3) % mockJournalNotes.length].text,
        moodlets: mockJournalNotes[(completedCount + 3) % mockJournalNotes.length].moodlets.slice(0, 2),
        isMock: true,
      },
    ]);
    completedCount += 1;
  }

  return { completed, missed, entriesByDay };
}

function realJournalModel() {
  const today = startOfToday();
  const completed = new Set(state.entries.map((entry) => dayKey(entry.date)));
  const missed = new Set();
  const entriesByDay = new Map();

  if (!completed.size) {
    return { completed, missed, entriesByDay };
  }

  const firstEntryDate = state.entries
    .map((entry) => {
      const date = new Date(entry.date);
      date.setHours(0, 0, 0, 0);
      return date;
    })
    .sort((a, b) => a - b)[0];

  for (let date = addDays(firstEntryDate, 1); date < today; date = addDays(date, 1)) {
    const key = dayKey(date);
    if (!completed.has(key)) missed.add(key);
  }

  return { completed, missed, entriesByDay };
}

function setScreen(name) {
  screens.forEach((screen) => {
    screen.classList.toggle("is-active", screen.dataset.screen === name);
  });
  if (name === "intro" && !welcomeEntrancePlayed) {
    welcomeEntranceTimer = playEntrance(welcomeScreen, "is-welcome-entering", "welcome");
    welcomeEntrancePlayed = true;
  }
}

function playEntrance(element, className, timerName) {
  if (!element) return null;
  if (timerName === "home") window.clearTimeout(homeEntranceTimer);
  if (timerName === "welcome") window.clearTimeout(welcomeEntranceTimer);
  element.classList.remove(className);
  void element.offsetWidth;
  element.classList.add(className);
  return window.setTimeout(() => {
    element.classList.remove(className);
  }, 1200);
}

function setRegisterStep(index) {
  registerStepIndex = Math.min(Math.max(index, 0), registerSteps.length - 1);
  registerScreen?.classList.toggle("is-welcome-step", registerStepIndex === 0);
  registerScreen?.classList.toggle("is-login-step", registerStepIndex === 5);
  registerSteps.forEach((step) => {
    step.classList.toggle("is-active", Number(step.dataset.registerStep) === registerStepIndex);
  });
  if (registerStepIndex === 0 && !welcomeEntrancePlayed) {
    welcomeEntranceTimer = playEntrance(registerScreen, "is-welcome-entering", "welcome");
    welcomeEntrancePlayed = true;
  }
  if (registerStepIndex === 1) window.setTimeout(() => registerName?.focus(), 120);
  if (registerStepIndex === 3) window.setTimeout(() => registerEmail?.focus(), 120);
  if (registerStepIndex === 4) window.setTimeout(() => registerPassword?.focus(), 120);
  if (registerStepIndex === 5) window.setTimeout(() => loginEmail?.focus(), 120);
}

function renderRegisterPurpose() {
  registerPurposeOptions?.querySelectorAll("[data-purpose]").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.purpose === registerPurpose);
  });
}

function renderOnboarding() {
  if (onboardingTrack) {
    onboardingTrack.innerHTML = ONBOARDING_SLIDES.map((slide, index) => `
      <article class="onboarding-slide" aria-hidden="${index === onboardingStepIndex ? "false" : "true"}">
        <div class="onboarding-image-frame">
          <img src="${slide.image}" alt="" />
        </div>
        <div class="onboarding-copy">
          <p>${t("onboardingKicker")}</p>
          <h2${index === onboardingStepIndex ? ' id="onboarding-title"' : ""}>${t(slide.titleKey)}</h2>
          <p>${t(slide.bodyKey)}</p>
        </div>
      </article>
    `).join("");
    updateOnboardingTrack();
  }
  if (onboardingNext) {
    onboardingNext.textContent =
      onboardingStepIndex === ONBOARDING_SLIDES.length - 1 ? t("startJournalingButton") : t("continue");
  }
  if (onboardingDots) {
    onboardingDots.innerHTML = ONBOARDING_SLIDES.map((_, index) => {
      const activeClass = index === onboardingStepIndex ? " class=\"is-active\"" : "";
      const label = `${index + 1} / ${ONBOARDING_SLIDES.length}`;
      return `<button type="button"${activeClass} data-onboarding-step="${index}" aria-label="${label}"></button>`;
    }).join("");
  }
}

function updateOnboardingTrack() {
  const offset = `calc(${onboardingStepIndex} * -100% + var(--onboarding-drag-x))`;
  onboardingTrack?.style.setProperty("--onboarding-offset", offset);
  onboardingTrack?.querySelectorAll(".onboarding-slide").forEach((slide, index) => {
    slide.setAttribute("aria-hidden", String(index !== onboardingStepIndex));
  });
}

function setOnboardingStep(index, animate = true) {
  const nextIndex = Math.min(Math.max(index, 0), ONBOARDING_SLIDES.length - 1);
  if (nextIndex === onboardingStepIndex && animate) return;
  window.clearTimeout(onboardingTransitionTimer);
  onboardingSheet?.style.setProperty("--onboarding-drag-x", "0px");
  onboardingSheet?.classList.remove("is-dragging");
  if (!animate) onboardingSheet?.classList.remove("is-carousel-animated");
  onboardingSheet?.classList.toggle("is-carousel-animated", animate && nextIndex !== onboardingStepIndex);
  onboardingStepIndex = nextIndex;
  renderOnboarding();
  onboardingTransitionTimer = window.setTimeout(() => {
    onboardingSheet?.classList.remove("is-carousel-animated");
  }, 430);
}

function openOnboardingModal() {
  setOnboardingStep(0, false);
  onboardingModal?.classList.add("is-open");
  onboardingModal?.setAttribute("aria-hidden", "false");
}

function closeOnboardingModal() {
  onboardingModal?.classList.remove("is-open");
  onboardingModal?.setAttribute("aria-hidden", "true");
  state.onboarded = true;
  saveState();
  window.setTimeout(() => homeNote?.focus(), 180);
}

function advanceOnboarding() {
  if (onboardingStepIndex < ONBOARDING_SLIDES.length - 1) {
    setOnboardingStep(onboardingStepIndex + 1);
    return;
  }
  closeOnboardingModal();
}

function startOnboardingGesture(event) {
  if (!onboardingModal?.classList.contains("is-open")) return;
  if (isOnboardingTransitioning) return;
  if (event.target.closest("button, input, textarea, a")) return;
  onboardingGesture = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    deltaX: 0,
    isHorizontal: false,
  };
  onboardingSheet?.setPointerCapture?.(event.pointerId);
}

function moveOnboardingGesture(event) {
  if (!onboardingGesture || event.pointerId !== onboardingGesture.pointerId) return;
  const deltaX = event.clientX - onboardingGesture.startX;
  const deltaY = event.clientY - onboardingGesture.startY;
  if (!onboardingGesture.isHorizontal && Math.abs(deltaX) > 12 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
    onboardingGesture.isHorizontal = true;
    onboardingSheet?.classList.add("is-dragging");
  }
  if (!onboardingGesture.isHorizontal) return;
  event.preventDefault();
  const isFirst = onboardingStepIndex === 0;
  const isLast = onboardingStepIndex === ONBOARDING_SLIDES.length - 1;
  const resistance = (isFirst && deltaX > 0) || (isLast && deltaX < 0) ? 0.28 : 0.72;
  const dragX = Math.max(-92, Math.min(92, deltaX * resistance));
  onboardingGesture.deltaX = deltaX;
  onboardingSheet?.style.setProperty("--onboarding-drag-x", `${dragX}px`);
  updateOnboardingTrack();
}

function endOnboardingGesture(event) {
  if (!onboardingGesture || event.pointerId !== onboardingGesture.pointerId) return;
  const { deltaX, isHorizontal } = onboardingGesture;
  onboardingGesture = null;
  onboardingSheet?.releasePointerCapture?.(event.pointerId);
  onboardingSheet?.classList.remove("is-dragging");
  onboardingSheet?.style.setProperty("--onboarding-drag-x", "0px");
  updateOnboardingTrack();
  if (!isHorizontal || Math.abs(deltaX) < 58) return;
  if (deltaX < 0 && onboardingStepIndex < ONBOARDING_SLIDES.length - 1) {
    setOnboardingStep(onboardingStepIndex + 1);
  } else if (deltaX > 0 && onboardingStepIndex > 0) {
    setOnboardingStep(onboardingStepIndex - 1);
  }
}

function applyLanguage() {
  state.language = language();
  document.documentElement.lang = language() === "ua" ? "uk" : "en";
  languageButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.language === language());
    button.setAttribute("aria-pressed", String(button.dataset.language === language()));
  });

  setText(".register-logo, .home-logo, .figma-logo", "appName");
  setText(".register-welcome-copy h1", "welcomeTitle");
  setText(".register-welcome-copy p", "welcomeBody");
  setText(".home-welcome-copy h1", "homeTitle");
  setText(".home-welcome-copy p", "homeBody");
  setHTML(".figma-welcome-copy h1", "welcomeTitle");
  setHTML(".figma-welcome-copy p", "introBody");
  setText(".register-welcome [data-register-next]", "startJournaling");
  setText("[data-register-login]", "logIn");
  setText("[data-add-moodlets]", "addMoodlets");
  setText("#local-journal-note", "localJournal");
  setText("#account-demo", "accountOptions");
  setText("#back-to-local-journal", "useLocalJournal");
  setText('[data-register-step="1"] .register-copy h1', "questionName");
  setText('[data-register-step="2"] .register-copy h1', "questionPurpose");
  setText('[data-register-step="3"] .register-copy h1', "questionEmail");
  setText('[data-register-step="4"] .register-copy h1', "questionPassword");
  setText('[data-register-step="5"] .register-copy h1', "logIn");
  setText('[data-register-step="1"] .register-copy p', "nameTagline");
  setText('[data-register-step="2"] .register-copy p', "purposeTagline");
  setText('[data-register-step="3"] .register-copy p', "emailTagline");
  setText('[data-register-step="4"] .register-copy p', "passwordTagline");
  setText('[data-register-step="5"] .register-copy p', "loginBody");
  setAttr("[data-register-back]", "aria-label", "back");
  const nameLabel = registerName?.closest(".register-field")?.querySelector("span");
  const emailLabel = registerEmail?.closest(".register-field")?.querySelector("span");
  const passwordLabel = registerPassword?.closest(".register-field")?.querySelector("span");
  if (nameLabel) nameLabel.textContent = t("name");
  if (emailLabel) emailLabel.textContent = t("email");
  if (passwordLabel) passwordLabel.textContent = t("password");
  setAttr("#register-name", "placeholder", "namePlaceholder");
  setAttr("#register-email", "placeholder", "emailPlaceholder");
  setAttr("#register-password", "placeholder", "passwordPlaceholder");
  setAttr("#login-email", "placeholder", "emailPlaceholder");
  setAttr("#login-password", "placeholder", "loginPasswordPlaceholder");
  setText('[data-register-step="1"] [data-register-next], [data-register-step="2"] [data-register-next], [data-register-step="3"] [data-register-next]', "continue");
  setText("[data-register-finish], [data-login-finish]", "enterUnfleur");
  setText('[data-purpose="Reflect on my days"]', "purposeReflect");
  setText('[data-purpose="Understand my emotions"]', "purposeEmotions");
  setText('[data-purpose="Build a daily habit"]', "purposeHabit");
  setText('[data-purpose="Feel calmer"]', "purposeCalmer");
  renderOnboarding();

  setText("#welcome-note-card > span, #home-note-card > span, #app-note-title", "notePrompt");
  setAttr("#welcome-note, #home-note, #app-note", "aria-label", "notePrompt");
  setAttr("#welcome-note, #home-note, #app-note", "placeholder", "notePlaceholder");
  setAttr(".figma-mic, .home-mic, .app-mic", "aria-label", "voiceNote");
  setAttr("#edit-moodlets, #home-edit-moodlets, #app-edit-moodlets", "aria-label", "editMoodlets");
  setAttr('[data-action="open-admin-modal"]', "aria-label", "openAdmin");
  setAttr('[data-action="open-note-modal"]', "aria-label", "addEntry");
  setAttr(".plant-portrait", "aria-label", "bloomingPlant");
  setAttr(".profile-settings", "aria-label", "profileSettings");
  setAttr('.profile-edit-button[data-profile-edit="name"]', "aria-label", "editName");
  setAttr('.profile-edit-button[data-profile-edit="email"]', "aria-label", "editEmail");
  setAttr('.profile-edit-button[data-profile-edit="purpose"]', "aria-label", "editPurpose");
  setAttr(".profile-setting-item:nth-child(2) .profile-edit-button", "aria-label", "editEmail");
  setAttr(".profile-setting-item:nth-child(3) .profile-edit-button", "aria-label", "editPurpose");
  setAttr(".tab-bar", "aria-label", "mainNavigation");

  setText(".profile-setting-item:nth-child(1) .profile-setting-copy span", "name");
  setText(".profile-setting-item:nth-child(2) .profile-setting-copy span", "email");
  setText(".profile-setting-item:nth-child(3) .profile-setting-copy span", "purpose");
  setText(".profile-setting-item:nth-child(4) .profile-setting-copy span", "notifications");
  setText("#profile-name-title", "editName");
  setText("#profile-email-title", "editEmail");
  setText("#profile-purpose-title", "editPurpose");
  const profileNameLabel = profileNameInput?.closest(".profile-edit-field")?.querySelector("span");
  const profileEmailLabel = profileEmailInput?.closest(".profile-edit-field")?.querySelector("span");
  if (profileNameLabel) profileNameLabel.textContent = t("name");
  if (profileEmailLabel) profileEmailLabel.textContent = t("email");
  setText("#profile-name-save, #profile-email-save", "save");
  setText(".profile-edit-actions [data-profile-edit-close]", "cancel");
  setAttr("#profile-name-input", "placeholder", "namePlaceholder");
  setAttr("#profile-email-input", "placeholder", "emailPlaceholder");
  setText('[data-profile-purpose="Reflect on my days"]', "purposeReflect");
  setText('[data-profile-purpose="Understand my emotions"]', "purposeEmotions");
  setText('[data-profile-purpose="Build a daily habit"]', "purposeHabit");
  setText('[data-profile-purpose="Feel calmer"]', "purposeCalmer");
  setText('[data-action="logout"]', "logOut");
  setText('[data-action="delete-account"]', "deleteAccount");
  setText('[data-tab="home"] strong', "home");
  setText('[data-tab="journal"] strong', "journal");
  setText('[data-tab="profile"] strong', "profile");

  setText(".congrats-sheet h2", "congratsTitle");
  setText(".congrats-sheet p", "congratsBody");
  setText("#close-congrats", "congratsButton");
  setText("#stage-two-title", "stage2Title");
  setText(".stage-two-copy p", "stage2Body");
  setText("#stage-three-title", "stage3Title");
  setText(".stage-three-copy p", "stage3Body");
  setText("#stage-four-title", "stage4Title");
  setText(".stage-four-copy p", "stage4Body");
  setText("#stage-five-title", "stage5Title");
  setText(".stage-five-copy p", "stage5Body");
  setText("#stage-six-title", "stage6Title");
  setText(".stage-six-copy p", "stage6Body");
  setText("#stage-seven-title", "stage7Title");
  setText(".stage-seven-copy p", "stage7Body");
  setText("#close-stage-two, #close-stage-three, #close-stage-four, #close-stage-five, #close-stage-six, #close-stage-seven", "okThanks");

  setText("#app-note-primary", "save");
  setText("#app-note-cancel", "cancel");
  setText("#admin-title", "adminTitle");
  setText(".admin-header p", "adminBody");
  setText(".admin-data-toggle span", "mockData");
  setText("#admin-controls .admin-field:nth-of-type(1) > span", "dayInRow");
  setText("#admin-controls .admin-field:nth-of-type(2) > span", "skippedBeforeToday");
  setText('[data-skip-days="0"]', "none");
  setText('[data-skip-days="1"]', "oneDay");
  setText('[data-skip-days="2"]', "twoDays");
  setText("#admin-save", "apply");
  setText("#delete-confirm-title", "deleteConfirmTitle");
  setText(".delete-confirm-copy p", "deleteConfirmBody");
  setText("#delete-confirm-yes", "yesDelete");
  setText("#delete-confirm-no", "noCancel");
  if (noteToastText && !noteToast.classList.contains("is-visible")) noteToastText.textContent = t("noteSaved");
  setText("#moodlet-title", "moodletTitle");
  setText(".moodlet-header p", "moodletBody");
  setText("#moodlet-continue", "done");
  setText(".pot-sheet h2", "choosePot");
  setText(".pot-sheet p", "potBody");
  setText(".pot-sheet .primary-button", "done");

  updateWelcomeNote();
  updateHomeNote();
  updateAppNote();
}

function advanceRegistration() {
  if (registerStepIndex === 1 && !registerName.value.trim()) {
    registerName.focus();
    return;
  }
  if (registerStepIndex === 2 && !registerPurpose) return;
  if (registerStepIndex === 3 && !registerEmail.value.trim()) {
    registerEmail.focus();
    return;
  }
  setRegisterStep(registerStepIndex + 1);
}

function finishRegistration() {
  if (!registerPassword.value.trim()) {
    registerPassword.focus();
    return;
  }
  ensureProfileState();
  state.profile.name = registerName.value.trim();
  state.profile.purpose = registerPurpose;
  state.profile.email = registerEmail.value.trim();
  state.registered = true;
  state.guest = false;
  state.onboarded = false;
  saveState();
  homeEntrancePlayed = false;
  setScreen("app");
  setView("home");
  render();
}

function finishLogin() {
  state.registered = true;
  state.guest = false;
  state.onboarded = true;
  ensureProfileState();
  if (loginEmail?.value.trim()) state.profile.email = loginEmail.value.trim();
  saveState();
  homeEntrancePlayed = false;
  setScreen("app");
  setView("home");
  render();
}

function setView(name) {
  appScreen?.classList.toggle("is-home-view", name === "home");
  appScreen?.classList.toggle("is-profile-view", name === "profile");
  views.forEach((view) => {
    view.classList.toggle("is-active", view.dataset.view === name);
  });
  tabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.tab === name);
  });
  updateTabIndicator();

  const labels = {
    home: [t("myJournal"), formatMonth()],
    journal: [t("myJournal"), formatMonth()],
    profile: [t("myProfile"), `${t("hello")}, ${state.profile?.name || t("placeholderName")}!`],
  };

  title.textContent = labels[name][0];
  subtitle.textContent = labels[name][1];
  if (name === "journal") {
    focusJournalOnToday();
    updateJournalScrollState();
    showMissedJournalModal();
  }
  if (name === "home") {
    if (!homeEntrancePlayed) {
      homeEntranceTimer = playEntrance(homeView, "is-home-entering", "home");
      homeEntrancePlayed = true;
    }
  }
}

function updateTabIndicator() {
  const tabBar = document.querySelector(".tab-bar");
  const activeTab = tabBar?.querySelector("button.is-active");
  if (!tabBar || !activeTab) return;
  const tabBarRect = tabBar.getBoundingClientRect();
  const activeRect = activeTab.getBoundingClientRect();
  tabBar.style.setProperty("--tab-indicator-x", `${activeRect.left - tabBarRect.left - 12}px`);
  tabBar.style.setProperty("--tab-indicator-width", `${activeRect.width}px`);
}

function focusJournalOnToday() {
  selectedDayKey = dayKey(startOfToday());
  renderWeeklyProgress();
  renderEntries();
}

function updateJournalScrollState() {
  if (!journalView) return;
  journalView.classList.toggle("is-scrolled", journalView.scrollTop > 8);
}

function renderWeeklyProgress() {
  const today = startOfToday();
  const todayKey = dayKey(today);
  const start = new Date(today);
  start.setDate(today.getDate() - 4);
  const journal = mockJournalModel();

  weeklyProgress.innerHTML = "";

  for (let index = 0; index < 7; index += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const key = dayKey(date);
    const isToday = key === todayKey;
    const isMissed = journal.missed.has(key);
    const isComplete = journal.completed.has(key) && !isMissed;
    const item = document.createElement("div");
    item.className = `day-progress ${isComplete ? "is-complete" : ""} ${isMissed ? "is-missed" : ""} ${key === selectedDayKey ? "is-selected" : ""}${isToday ? " is-today" : ""}`;
    item.dataset.day = key;
    item.role = "button";
    item.tabIndex = 0;
    item.ariaPressed = String(key === selectedDayKey);
    if (isToday) item.setAttribute("aria-current", "date");
    item.ariaLabel = date.toLocaleDateString(locale(), { weekday: "long", month: "long", day: "numeric" });
    item.innerHTML = `
      <strong>${date.toLocaleDateString(locale(), { weekday: "short" }).toUpperCase()}</strong>
      <div class="day-dot"></div>
      <span>${date.getDate()}</span>
    `;
    weeklyProgress.append(item);
  }
}

function renderProfile() {
  ensureProfileState();
  if (profileName) profileName.textContent = state.profile.name || t("placeholderName");
  if (profileEmail) profileEmail.textContent = state.profile.email || t("placeholderEmail");
  if (profilePurpose) profilePurpose.textContent = state.profile.purpose ? purposeLabel(state.profile.purpose) : t("placeholderPurpose");
  if (profileNotifications) profileNotifications.textContent = state.profile.notificationsEnabled ? t("allowed") : t("off");
  if (profileToggle) {
    profileToggle.classList.toggle("is-on", state.profile.notificationsEnabled);
    profileToggle.setAttribute("aria-pressed", String(state.profile.notificationsEnabled));
    profileToggle.setAttribute("aria-label", state.profile.notificationsEnabled ? t("notificationsAllowed") : t("notificationsOff"));
  }
}

function renderProfilePurposeOptions() {
  profilePurposeOptions?.querySelectorAll("[data-profile-purpose]").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.profilePurpose === profilePurposeDraft);
  });
}

function closeProfileEditModals() {
  [profileNameModal, profileEmailModal, profilePurposeModal].forEach((modal) => {
    modal?.classList.remove("is-open");
    modal?.setAttribute("aria-hidden", "true");
  });
}

function openProfileEditModal(type) {
  ensureProfileState();
  closeProfileEditModals();
  if (type === "name") {
    if (profileNameInput) profileNameInput.value = state.profile.name || "";
    profileNameModal?.classList.add("is-open");
    profileNameModal?.setAttribute("aria-hidden", "false");
    window.setTimeout(() => profileNameInput?.focus(), 220);
  }
  if (type === "email") {
    if (profileEmailInput) profileEmailInput.value = state.profile.email || "";
    profileEmailModal?.classList.add("is-open");
    profileEmailModal?.setAttribute("aria-hidden", "false");
    window.setTimeout(() => profileEmailInput?.focus(), 220);
  }
  if (type === "purpose") {
    profilePurposeDraft = state.profile.purpose || "Reflect on my days";
    renderProfilePurposeOptions();
    profilePurposeModal?.classList.add("is-open");
    profilePurposeModal?.setAttribute("aria-hidden", "false");
  }
}

function saveProfileField(type) {
  ensureProfileState();
  if (type === "name") {
    state.profile.name = profileNameInput?.value.trim() || "";
  }
  if (type === "email") {
    state.profile.email = profileEmailInput?.value.trim() || "";
  }
  if (type === "purpose") {
    state.profile.purpose = profilePurposeDraft;
    registerPurpose = profilePurposeDraft;
  }
  saveState();
  renderProfile();
  renderRegisterPurpose();
  closeProfileEditModals();
  if (document.querySelector(".view-profile.is-active")) {
    subtitle.textContent = `${t("hello")}, ${state.profile?.name || t("placeholderName")}!`;
  }
}

function renderEntries() {
  const journal = mockJournalModel();
  const mockEntries = journal.entriesByDay.get(selectedDayKey) || [];
  const sourceEntries = state.mockDataEnabled ? [...state.entries, ...mockEntries] : state.entries;
  const entries = sourceEntries
    .filter((entry) => dayKey(entry.date) === selectedDayKey)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  homeEntryList.innerHTML = "";

  if (!entries.length && journal.missed.has(selectedDayKey)) {
    homeEntryList.innerHTML = `
      <div class="empty-state missed-state">
        <strong>${t("skippedTitle")}</strong>
        <p>${t("skippedBody")}</p>
      </div>
    `;
    return;
  }

  if (!entries.length) {
    const isPastDay = selectedDayKey < dayKey(startOfToday());
    homeEntryList.innerHTML = `
      <div class="empty-state ${isPastDay ? "past-empty-state" : ""}">
        <strong>${t(isPastDay ? "pastNoEntriesTitle" : "noEntriesTitle")}</strong>
        <p>${t(isPastDay ? "pastNoEntriesBody" : "noEntriesBody")}</p>
      </div>
    `;
    return;
  }

  entries.slice(0, 6).forEach((entry) => {
    const card = document.createElement("article");
    card.className = "entry-card";
    card.innerHTML = `
      <header>
        <span class="tag" data-icon="calendar">${formatEntryDate(entry.date)}</span>
        <span class="entry-actions">
          ${entry.isMock ? "" : `
            <button class="round-button" type="button" aria-label="${t("editEntry")}" data-edit="${entry.id}" data-icon="edit"></button>
            <button class="round-button" type="button" aria-label="${t("deleteEntry")}" data-delete="${entry.id}" data-icon="delete"></button>
          `}
        </span>
      </header>
      <div class="moodlets">
        ${(entry.moodlets || []).map((moodlet) => `<span class="moodlet-swatch tiny-moodlet" style="${moodletStyle(moodlet)}"></span>`).join("")}
      </div>
      <p class="entry-text">${escapeHTML(entry.text)}</p>
      <button class="read-more" type="button" hidden>${t("showMore")}</button>
    `;
    homeEntryList.append(card);
  });
  updateEntryExpanders();
}

function saveEntry(text, moodlets, target) {
  // Writing an entry returns to the personal journal from the sample garden.
  state.mockDataEnabled = false;
  if (!state.registered) state.guest = true;
  delete state.drafts[target];
  const hadTodayEntry = hasTodayEntry();
  const skippedBeforeToday = skippedJournalDaysBeforeToday();
  state.entries.unshift({
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    text,
    moodlets,
  });
  state.onboarded = true;
  saveState();
  renderWeeklyProgress();
  renderEntries();
  renderPlant();
  return {
    milestoneDay: hadTodayEntry
      ? 0
      : skippedBeforeToday >= 2
        ? 1
        : streakCount(startOfToday()),
  };
}

function updateEntry(id, text, moodlets = []) {
  state.entries = state.entries.map((entry) => (
    entry.id === id
      ? { ...entry, text, moodlets }
      : entry
  ));
  saveState();
  renderWeeklyProgress();
  renderEntries();
  renderPlant();
}

function updateEntryExpanders() {
  requestAnimationFrame(() => {
    homeEntryList.querySelectorAll(".entry-card").forEach((card) => {
      const text = card.querySelector(".entry-text");
      const button = card.querySelector(".read-more");
      if (!text || !button) return;
      const wasExpanded = card.classList.contains("is-expanded");
      card.classList.remove("is-expanded");
      const isTruncated = text.scrollHeight > text.clientHeight + 1;
      button.hidden = !isTruncated && !wasExpanded;
      if (wasExpanded) card.classList.add("is-expanded");
    });
  });
}

function moodletStyle(name) {
  const normalizedName = moodletAliases[name] || name;
  const moodlet = moodlets.find((item) => item.name === normalizedName) || moodlets[0];
  return `--moodlet-image:url('${encodeURI(moodlet.image)}')`;
}

function renderPlant() {
  normalizeBloomyState();
  const stage = bloomyDisplayStage();
  const bloomyImage = bloomyImageState();
  [plant, profilePlant].forEach((item) => {
    if (!item) return;
    item.className = item.className
      .replace(/plant-stage-\d/g, "")
      .replace(/is-missed-(one|two)/g, "")
      .replace(/\bis-stage-two\b/g, "")
      .replace(/\bis-stage-three\b/g, "")
      .replace(/\bis-stage-four\b/g, "")
      .replace(/\bis-stage-five\b/g, "")
      .replace(/\bis-stage-six\b/g, "")
      .replace(/\bis-stage-seven\b/g, "")
      .replace(/\bis-selected\b/g, "")
      .trim()
      .concat(` plant-stage-${stage}${bloomyImage.className ? ` ${bloomyImage.className}` : ""}`);
    item.dataset.pot = state.pot;
    const bg = item.querySelector(".figma-pot-bg");
    const potImage = item.querySelector(".figma-pot-image");
    if (bg) bg.src = bloomyImage.bg;
    if (potImage) potImage.src = bloomyImage.pot;
  });

  if (profileSummary) profileSummary.textContent = t("profileSummary", { stage });
}

function bloomyImageState() {
  normalizeBloomyState();
  const stage = bloomyDisplayStage();
  const skippedDays = skippedJournalDaysBeforeToday();
  if (!state.mockDataEnabled && hasTodayEntry()) return bloomyImageForStage(stage);
  if (skippedDays >= 2) return { ...BLOOMY_ART, className: "is-missed-two" };
  if (skippedDays === 1) return { ...BLOOMY_ART, className: "is-missed-one" };
  return bloomyImageForStage(stage);
}

function normalizeBloomyState() {
  state.adminVisitDay = Math.min(Math.max(Number(state.adminVisitDay) || 1, 1), 7);
  state.skippedJournalDays = [0, 1, 2].includes(Number(state.skippedJournalDays)) ? Number(state.skippedJournalDays) : 0;
  state.mockDataEnabled = state.mockDataEnabled === true;
}

function renderPotOptions() {
  document.querySelectorAll(".pot-options [data-pot]").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.pot === state.pot);
  });
}

function render() {
  ensureProfileState();
  state.language = language();
  if (state.registered || state.guest) {
    setScreen("app");
    setView(state.guest && !state.registered && !state.drafts.home ? "journal" : "home");
  } else {
    setScreen("intro");
  }
  document.querySelector('[data-action="logout"]').hidden = !state.registered;
  normalizeBloomyState();
  renderWeeklyProgress();
  renderEntries();
  renderPlant();
  renderPotOptions();
  renderAdminModal();
  renderRegisterPurpose();
  renderProfilePurposeOptions();
  renderProfile();
  applyLanguage();
  if (state.registered && !state.onboarded && !onboardingModal?.classList.contains("is-open")) {
    window.requestAnimationFrame(openOnboardingModal);
  }
}

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, (char) => {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[char];
  });
}

document.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]");
  const tab = event.target.closest("[data-tab]");
  const deleteButton = event.target.closest("[data-delete]");
  const editButton = event.target.closest("[data-edit]");
  const potButton = event.target.closest("[data-pot]");
  const languageButton = event.target.closest("[data-language]");
  const profileEditButton = event.target.closest("[data-profile-edit]");
  const profileEditClose = event.target.closest("[data-profile-edit-close]");

  if (languageButton) {
    state.language = languageButton.dataset.language;
    saveState();
    applyLanguage();
    const activeView = document.querySelector(".view.is-active")?.dataset.view;
    if (activeView) setView(activeView);
    renderWeeklyProgress();
    renderEntries();
    renderPlant();
    renderAdminModal();
    renderProfile();
    return;
  }

  if (action?.dataset.action === "start") {
    state.onboarded = true;
    saveState();
    setScreen("app");
  }

  if (action?.dataset.action === "open-note-modal") {
    openAppNoteModal();
  }

  if (action?.dataset.action === "open-admin-modal") {
    openAdminModal();
  }

  if (action?.dataset.action === "logout") {
    logOut();
  }

  if (action?.dataset.action === "delete-account") {
    deleteAccount();
  }

  if (action?.dataset.action === "choose-pot") {
    potSheet.showModal();
  }

  if (tab) {
    setView(tab.dataset.tab);
  }

  if (deleteButton) {
    openDeleteConfirmModal(deleteButton.dataset.delete);
  }

  if (editButton) {
    const entry = state.entries.find((item) => item.id === editButton.dataset.edit);
    if (entry) openAppNoteModal(entry);
  }

  if (potButton) {
    state.pot = potButton.dataset.pot;
    saveState();
    renderPlant();
    renderPotOptions();
  }

  if (profileEditButton) {
    openProfileEditModal(profileEditButton.dataset.profileEdit);
  }

  if (profileEditClose) {
    closeProfileEditModals();
  }

  if (event.target.closest(".profile-toggle")) {
    ensureProfileState();
    state.profile.notificationsEnabled = !state.profile.notificationsEnabled;
    saveState();
    renderProfile();
  }
});

function updateWelcomeNote() {
  if (!welcomeNote || !welcomeNoteFlow || !welcomeCounter) return;

  const length = welcomeNote.value.length;
  const hasText = Boolean(welcomeNote.value.trim());
  const hasMoodlets = hasText && selectedMoodlets.length > 0;
  welcomeNoteCard.querySelector("[data-add-moodlets]").hidden = !hasText;
  selectedMoodletsBar.hidden = !hasMoodlets;
  welcomeNoteFlow.classList.toggle("has-text", hasText);
  welcomeContinue?.classList.toggle("is-visible", hasText);
  welcomeScreen?.classList.toggle("review-state", hasMoodlets);
  if (welcomeContinue) welcomeContinue.textContent = t("saveNote");
  const introTitle = welcomeScreen?.querySelector(".figma-welcome-copy h1");
  const introBody = welcomeScreen?.querySelector(".figma-welcome-copy p");
  if (introTitle && introBody) {
    if (hasMoodlets) {
      introTitle.innerHTML = t("reviewTitle");
      introBody.textContent = t("reviewBody");
    } else if (hasText) {
      introTitle.textContent = t("welcomeTitle");
      introBody.innerHTML = t("introBodyCompact");
    } else {
      introTitle.textContent = t("welcomeTitle");
      introBody.innerHTML = t("introBody");
    }
  }
  welcomeCounter.textContent = `${length}/500 ${t("symbols")}`;

  welcomeNote.style.height = "44px";
  welcomeNote.style.overflowY = "hidden";
  const textHeight = hasText ? Math.min(Math.max(welcomeNote.scrollHeight, 44), 203) : 44;
  const cardHeight = hasText ? Math.min(Math.max(87 + textHeight, 162), 290) : 162;

  welcomeNote.style.height = `${textHeight}px`;
  welcomeNote.style.overflowY = welcomeNote.scrollHeight > textHeight ? "auto" : "hidden";
  welcomeNoteCard.style.setProperty("--text-height", `${textHeight}px`);
  welcomeNoteCard.style.setProperty("--note-height", `${cardHeight}px`);
}

function updateHomeNote() {
  if (!homeNote || !homeNoteCard || !homeNoteShell || !homeCounter) return;

  const length = homeNote.value.length;
  const hasText = Boolean(homeNote.value.trim());
  const hasMoodlets = hasText && homeSelectedMoodlets.length > 0;
  homeNoteCard.querySelector("[data-add-moodlets]").hidden = !hasText;
  homeSelectedMoodletsBar.hidden = !hasMoodlets;
  homeCounter.textContent = `${length}/500 ${t("symbols")}`;
  homeNoteShell.classList.toggle("has-text", hasText);
  homeNoteCard.classList.toggle("has-text", hasText);
  homeNoteCard.classList.toggle("has-moodlets", hasMoodlets);
  if (homeContinue) homeContinue.textContent = t("saveNote");

  homeNote.style.height = "44px";
  homeNote.style.overflowY = "hidden";
  const textHeight = hasText ? Math.min(Math.max(homeNote.scrollHeight, 44), 203) : 44;
  const baseHeight = hasMoodlets ? 166 : 87;
  const minHeight = hasMoodlets ? 248 : 162;
  const cardHeight = hasText ? Math.min(Math.max(baseHeight + textHeight, minHeight), 290) : 162;

  homeNote.style.height = `${textHeight}px`;
  homeNote.style.overflowY = homeNote.scrollHeight > textHeight ? "auto" : "hidden";
  homeNoteCard.style.setProperty("--text-height", `${textHeight}px`);
  homeNoteCard.style.setProperty("--note-height", `${cardHeight}px`);
}

function rememberDraft(target) {
  if (target === "app" && editingEntryId) return;
  const textarea = { welcome: welcomeNote, home: homeNote, app: appNote }[target];
  const moodlets = { welcome: selectedMoodlets, home: homeSelectedMoodlets, app: appSelectedMoodlets }[target];
  if (textarea.value || moodlets.length) {
    state.drafts[target] = { text: textarea.value, moodlets };
  } else {
    delete state.drafts[target];
  }
  saveState();
}

function resetAppNoteModal() {
  editingEntryId = null;
  appSelectedMoodlets = [];
  if (appNote) appNote.value = "";
  renderAppSelectedMoodlets();
  updateAppNote();
}

function openAppNoteModal(entry = null) {
  resetAppNoteModal();
  const note = entry || state.drafts.app;
  if (note) {
    editingEntryId = entry?.id || null;
    appSelectedMoodlets = [...(note.moodlets || [])];
    if (appNote) appNote.value = note.text || "";
    renderAppSelectedMoodlets();
    updateAppNote();
  }
  appNoteModal?.classList.add("is-open");
  appNoteModal?.setAttribute("aria-hidden", "false");
  window.setTimeout(() => appNote?.focus(), 260);
}

function closeAppNoteModal() {
  appNoteModal?.classList.remove("is-open");
  appNoteModal?.setAttribute("aria-hidden", "true");
  editingEntryId = null;
  if (isListening && voiceTarget === "app") recognition?.stop();
}

function updateAppNote() {
  if (!appNote || !appNoteCard || !appCounter || !appNotePrimary) return;

  const length = appNote.value.length;
  const hasText = Boolean(appNote.value.trim());
  const hasMoodlets = hasText && appSelectedMoodlets.length > 0;
  appNoteCard.querySelector("[data-add-moodlets]").hidden = !hasText;
  appSelectedMoodletsBar.hidden = !hasMoodlets;
  appCounter.textContent = `${length}/500 ${t("symbols")}`;
  appNoteCard.classList.toggle("has-text", hasText);
  appNoteCard.classList.toggle("has-moodlets", hasMoodlets);
  appNotePrimary.disabled = !hasText;
  appNotePrimary.textContent = t("saveNote");
  if (appNoteCancel) appNoteCancel.textContent = t("cancel");

  appNote.style.height = "44px";
  appNote.style.overflowY = "hidden";
  const maxTextHeight = 250;
  const textHeight = hasText ? Math.min(Math.max(appNote.scrollHeight, 44), maxTextHeight) : 44;
  const baseHeight = hasMoodlets ? 194 : 118;
  const minHeight = hasMoodlets ? 310 : 238;
  const maxCardHeight = hasMoodlets ? 444 : 368;
  const cardHeight = hasText ? Math.min(Math.max(baseHeight + textHeight, minHeight), maxCardHeight) : minHeight;

  appNote.style.height = `${textHeight}px`;
  appNote.style.overflowY = appNote.scrollHeight > textHeight ? "auto" : "hidden";
  appNoteCard.style.setProperty("--text-height", `${textHeight}px`);
  appNoteCard.style.setProperty("--note-height", `${cardHeight}px`);
  appNoteCard.style.setProperty("--review-height", `${cardHeight}px`);
}

function showNoteToast(messageKey = "noteSaved") {
  if (!noteToast) return;
  window.clearTimeout(toastTimer);
  if (noteToastText) noteToastText.textContent = t(messageKey);
  noteToast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => {
    noteToast.classList.remove("is-visible");
  }, NOTE_TOAST_DURATION);
}

function openDeleteConfirmModal(entryId) {
  pendingDeleteEntryId = entryId;
  deleteConfirmModal?.classList.add("is-open");
  deleteConfirmModal?.setAttribute("aria-hidden", "false");
}

function closeDeleteConfirmModal() {
  pendingDeleteEntryId = "";
  deleteConfirmModal?.classList.remove("is-open");
  deleteConfirmModal?.setAttribute("aria-hidden", "true");
}

function confirmDeleteEntry() {
  if (!pendingDeleteEntryId) return;
  state.entries = state.entries.filter((entry) => entry.id !== pendingDeleteEntryId);
  saveState();
  closeDeleteConfirmModal();
  renderWeeklyProgress();
  renderEntries();
  renderPlant();
  showNoteToast("noteDeleted");
}

function showCongratsAfterDelay(delay = 1000) {
  window.setTimeout(() => {
    congratsModal?.classList.add("is-open");
    congratsModal?.setAttribute("aria-hidden", "false");
  }, delay);
}

function showStageTwoAfterDelay(delay = 1000) {
  window.setTimeout(() => {
    stageTwoModal?.classList.add("is-open");
    stageTwoModal?.setAttribute("aria-hidden", "false");
  }, delay);
}

function showStageThreeAfterDelay(delay = 1000) {
  window.setTimeout(() => {
    stageThreeModal?.classList.add("is-open");
    stageThreeModal?.setAttribute("aria-hidden", "false");
  }, delay);
}

function showStageFourAfterDelay(delay = 1000) {
  window.setTimeout(() => {
    stageFourModal?.classList.add("is-open");
    stageFourModal?.setAttribute("aria-hidden", "false");
  }, delay);
}

function showStageFiveAfterDelay(delay = 1000) {
  window.setTimeout(() => {
    stageFiveModal?.classList.add("is-open");
    stageFiveModal?.setAttribute("aria-hidden", "false");
  }, delay);
}

function showStageSixAfterDelay(delay = 1000) {
  window.setTimeout(() => {
    stageSixModal?.classList.add("is-open");
    stageSixModal?.setAttribute("aria-hidden", "false");
  }, delay);
}

function showStageSevenAfterDelay(delay = 1000) {
  window.setTimeout(() => {
    stageSevenModal?.classList.add("is-open");
    stageSevenModal?.setAttribute("aria-hidden", "false");
    launchConfetti();
  }, delay);
}

function launchConfetti() {
  const host = appScreen || document.querySelector(".phone-shell");
  if (!host) return;

  const burst = document.createElement("div");
  burst.className = "confetti-burst";
  const colors = ["#575df6", "#ff6fae", "#ffd45e", "#55c7f7", "#74d66d", "#ff8f4e"];
  for (let index = 0; index < 42; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.setProperty("--x", `${Math.random() * 100}%`);
    piece.style.setProperty("--dx", `${Math.random() * 120 - 60}px`);
    piece.style.setProperty("--delay", `${Math.random() * 180}ms`);
    piece.style.setProperty("--spin", `${Math.random() * 540 - 270}deg`);
    piece.style.background = colors[index % colors.length];
    burst.append(piece);
  }

  host.append(burst);
  window.setTimeout(() => burst.remove(), 2200);
}

function showGrowthMilestone(milestoneDay) {
  if (milestoneDay === 1) showCongratsAfterDelay(MILESTONE_MODAL_DELAY);
  if (milestoneDay === 2) showStageTwoAfterDelay(MILESTONE_MODAL_DELAY);
  if (milestoneDay === 3) showStageThreeAfterDelay(MILESTONE_MODAL_DELAY);
  if (milestoneDay === 4) showStageFourAfterDelay(MILESTONE_MODAL_DELAY);
  if (milestoneDay === 5) showStageFiveAfterDelay(MILESTONE_MODAL_DELAY);
  if (milestoneDay === 6) showStageSixAfterDelay(MILESTONE_MODAL_DELAY);
  if (milestoneDay === 7) showStageSevenAfterDelay(MILESTONE_MODAL_DELAY);
}

function showMissedJournalModal() {
  normalizeBloomyState();
  const skippedDays = skippedJournalDaysBeforeToday();
  if (!state.mockDataEnabled && hasTodayEntry()) return;
  if (!missedModal || skippedDays === 0) return;
  const image = bloomyImageState();
  const isTwoDays = skippedDays >= 2;

  missedModalFrame?.classList.toggle("is-missed-one", !isTwoDays);
  missedModalFrame?.classList.toggle("is-missed-two", isTwoDays);
  if (missedModalBg) missedModalBg.src = image.bg;
  if (missedModalPot) missedModalPot.src = image.pot;
  if (missedTitle) missedTitle.textContent = isTwoDays ? t("missed2Title") : t("missed1Title");
  if (missedBody) {
    missedBody.textContent = isTwoDays ? t("missed2Body") : t("missed1Body");
  }
  if (closeMissed) closeMissed.textContent = isTwoDays ? t("startOver") : t("okThanks");
  missedModal.classList.add("is-open");
  missedModal.setAttribute("aria-hidden", "false");
}

function closeMissedJournalModal() {
  missedModal?.classList.remove("is-open");
  missedModal?.setAttribute("aria-hidden", "true");
}

function handleMissedPrimaryAction() {
  const shouldStartOver = skippedJournalDaysBeforeToday() >= 2;
  closeMissedJournalModal();

  if (!shouldStartOver) return;

  state.adminVisitDay = 1;
  state.skippedJournalDays = 0;
  saveState();
  renderWeeklyProgress();
  renderEntries();
  renderPlant();
  renderAdminModal();
}

function renderAdminModal() {
  if (!adminDayGrid || !adminSkipOptions || !adminSummary) return;
  const mockEnabled = state.mockDataEnabled !== false;
  if (adminMockToggle) adminMockToggle.checked = mockEnabled;
  adminControls?.classList.toggle("is-disabled", !mockEnabled);
  adminControls?.setAttribute("aria-disabled", String(!mockEnabled));
  if (adminSave) adminSave.disabled = !mockEnabled;
  adminDayGrid.innerHTML = "";
  for (let day = 1; day <= 7; day += 1) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.visitDay = String(day);
    button.disabled = !mockEnabled;
    button.className = day === adminDraftVisitDay ? "is-selected" : "";
    button.textContent = String(day);
    adminDayGrid.append(button);
  }

  adminSkipOptions.querySelectorAll("[data-skip-days]").forEach((button) => {
    button.disabled = !mockEnabled;
    button.classList.toggle("is-selected", Number(button.dataset.skipDays) === adminDraftSkippedDays);
  });
  adminSummary.textContent = mockEnabled
    ? t("mockActive", { day: adminDraftVisitDay, skipped: adminDraftSkippedDays })
    : t("mockCleared");
}

function openAdminModal() {
  adminDraftVisitDay = state.adminVisitDay;
  adminDraftSkippedDays = state.skippedJournalDays;
  renderAdminModal();
  adminModal?.classList.add("is-open");
  adminModal?.setAttribute("aria-hidden", "false");
}

function closeAdminModal() {
  adminModal?.classList.remove("is-open");
  adminModal?.setAttribute("aria-hidden", "true");
}

function setMockDataEnabled(enabled) {
  state.mockDataEnabled = enabled;
  state.demoPreferenceSet = true;
  if (enabled) {
    state.adminVisitDay = adminDraftVisitDay;
    state.skippedJournalDays = adminDraftSkippedDays;
  }
  adminDraftVisitDay = state.adminVisitDay;
  adminDraftSkippedDays = state.skippedJournalDays;
  saveState();
  closeMissedJournalModal();
  stageTwoModal?.classList.remove("is-open");
  stageTwoModal?.setAttribute("aria-hidden", "true");
  stageThreeModal?.classList.remove("is-open");
  stageThreeModal?.setAttribute("aria-hidden", "true");
  stageFourModal?.classList.remove("is-open");
  stageFourModal?.setAttribute("aria-hidden", "true");
  stageFiveModal?.classList.remove("is-open");
  stageFiveModal?.setAttribute("aria-hidden", "true");
  stageSixModal?.classList.remove("is-open");
  stageSixModal?.setAttribute("aria-hidden", "true");
  stageSevenModal?.classList.remove("is-open");
  stageSevenModal?.setAttribute("aria-hidden", "true");
  renderWeeklyProgress();
  renderEntries();
  renderPlant();
  renderAdminModal();
}

function logOut() {
  state.registered = false;
  state.guest = false;
  saveState();
  closeAdminModal();
  closeProfileEditModals();
  closeDeleteConfirmModal();
  closeMissedJournalModal();
  onboardingModal?.classList.remove("is-open");
  onboardingModal?.setAttribute("aria-hidden", "true");
  congratsModal?.classList.remove("is-open");
  congratsModal?.setAttribute("aria-hidden", "true");
  stageTwoModal?.classList.remove("is-open");
  stageTwoModal?.setAttribute("aria-hidden", "true");
  stageThreeModal?.classList.remove("is-open");
  stageThreeModal?.setAttribute("aria-hidden", "true");
  stageFourModal?.classList.remove("is-open");
  stageFourModal?.setAttribute("aria-hidden", "true");
  stageFiveModal?.classList.remove("is-open");
  stageFiveModal?.setAttribute("aria-hidden", "true");
  stageSixModal?.classList.remove("is-open");
  stageSixModal?.setAttribute("aria-hidden", "true");
  stageSevenModal?.classList.remove("is-open");
  stageSevenModal?.setAttribute("aria-hidden", "true");
  setScreen("register");
  setRegisterStep(0);
}

function deleteAccount() {
  localStorage.removeItem(STORAGE_KEY);
  state = {
    ...defaults,
    entries: [],
    drafts: {},
    profile: { ...defaults.profile },
  };
  welcomeNote.value = "";
  homeNote.value = "";
  appNote.value = "";
  selectedMoodlets = [];
  homeSelectedMoodlets = [];
  appSelectedMoodlets = [];
  registerStepIndex = 0;
  registerPurpose = "";
  if (registerName) registerName.value = "";
  if (registerEmail) registerEmail.value = "";
  if (registerPassword) registerPassword.value = "";
  closeAdminModal();
  closeProfileEditModals();
  closeDeleteConfirmModal();
  closeMissedJournalModal();
  congratsModal?.classList.remove("is-open");
  congratsModal?.setAttribute("aria-hidden", "true");
  stageTwoModal?.classList.remove("is-open");
  stageTwoModal?.setAttribute("aria-hidden", "true");
  stageThreeModal?.classList.remove("is-open");
  stageThreeModal?.setAttribute("aria-hidden", "true");
  stageFourModal?.classList.remove("is-open");
  stageFourModal?.setAttribute("aria-hidden", "true");
  stageFiveModal?.classList.remove("is-open");
  stageFiveModal?.setAttribute("aria-hidden", "true");
  stageSixModal?.classList.remove("is-open");
  stageSixModal?.setAttribute("aria-hidden", "true");
  stageSevenModal?.classList.remove("is-open");
  stageSevenModal?.setAttribute("aria-hidden", "true");
  renderSelectedMoodlets();
  renderHomeSelectedMoodlets();
  renderAppSelectedMoodlets();
  render();
}

function renderMoodletGrid() {
  if (!moodletGrid) return;
  const targetMoodlets = activeMoodletTarget === "app"
    ? appSelectedMoodlets
    : activeMoodletTarget === "home"
      ? homeSelectedMoodlets
      : selectedMoodlets;
  moodletGrid.innerHTML = "";
  moodlets.forEach((moodlet) => {
    const selected = targetMoodlets.includes(moodlet.name);
    const disabled = !selected && targetMoodlets.length >= 3;
    const button = document.createElement("button");
    button.className = `moodlet-option ${selected ? "is-selected" : ""} ${disabled ? "is-disabled" : ""}`;
    button.type = "button";
    button.dataset.moodlet = moodlet.name;
    button.setAttribute("aria-pressed", String(selected));
    button.setAttribute("aria-disabled", String(disabled));
    button.innerHTML = `<span class="moodlet-swatch" style="${moodletStyle(moodlet.name)}"></span><span>${moodlet.name}</span>`;
    moodletGrid.append(button);
  });

}

function renderSelectedMoodlets() {
  if (!selectedMoodletsNode || !selectedMoodletsBar) return;
  selectedMoodletsNode.innerHTML = selectedMoodlets
    .map((name) => `<span class="moodlet-swatch" style="${moodletStyle(name)}" title="${name}"></span>`)
    .join("");
}

function renderAppSelectedMoodlets() {
  if (!appSelectedMoodletsNode || !appSelectedMoodletsBar) return;
  appSelectedMoodletsNode.innerHTML = appSelectedMoodlets
    .map((name) => `<span class="moodlet-swatch" style="${moodletStyle(name)}" title="${name}"></span>`)
    .join("");
}

function renderHomeSelectedMoodlets() {
  if (!homeSelectedMoodletsNode || !homeSelectedMoodletsBar) return;
  homeSelectedMoodletsNode.innerHTML = homeSelectedMoodlets
    .map((name) => `<span class="moodlet-swatch" style="${moodletStyle(name)}" title="${name}"></span>`)
    .join("");
}

function openMoodletModal(target = "welcome") {
  const entry = { welcome: welcomeNote, home: homeNote, app: appNote }[target];
  if (!entry?.value.trim()) return;

  activeMoodletTarget = target;
  renderMoodletGrid();
  moodletModal?.classList.add("is-open");
  moodletModal?.setAttribute("aria-hidden", "false");
  moodletGrid.querySelector("button")?.focus();
}

function closeMoodletModal() {
  moodletModal?.classList.remove("is-open");
  moodletModal?.setAttribute("aria-hidden", "true");
}

function startVoiceInput(target = "welcome") {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const button = target === "app" ? appMicButton : target === "home" ? homeMicButton : micButton;
  if (!SpeechRecognition) {
    button?.setAttribute("title", t("voiceUnavailable"));
    return;
  }

  if (!recognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = navigator.language || "en-US";
    let committed = "";

    recognition.onstart = () => {
      isListening = true;
      const activeButton = voiceTarget === "app" ? appMicButton : voiceTarget === "home" ? homeMicButton : micButton;
      const activeTextArea = voiceTarget === "app" ? appNote : voiceTarget === "home" ? homeNote : welcomeNote;
      activeButton?.classList.add("is-listening");
      committed = activeTextArea.value ? `${activeTextArea.value} ` : "";
    };
    recognition.onend = () => {
      isListening = false;
      micButton?.classList.remove("is-listening");
      appMicButton?.classList.remove("is-listening");
      homeMicButton?.classList.remove("is-listening");
    };
    recognition.onresult = (event) => {
      const activeTextArea = voiceTarget === "app" ? appNote : voiceTarget === "home" ? homeNote : welcomeNote;
      const activeUpdate = voiceTarget === "app" ? updateAppNote : voiceTarget === "home" ? updateHomeNote : updateWelcomeNote;
      let transcript = "";
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        transcript += event.results[index][0].transcript;
      }
      activeTextArea.value = `${committed}${transcript}`.trimStart().slice(0, 500);
      activeUpdate();
      rememberDraft(voiceTarget);
    };
  }

  if (isListening && voiceTarget === target) {
    recognition.stop();
  } else {
    if (isListening) recognition.stop();
    voiceTarget = target;
    recognition.start();
  }
}

[[welcomeNote, "welcome", updateWelcomeNote], [homeNote, "home", updateHomeNote], [appNote, "app", updateAppNote]]
  .forEach(([textarea, target, update]) => {
    textarea?.addEventListener("input", () => {
      update();
      rememberDraft(target);
    });
  });

document.querySelectorAll("[data-add-moodlets]").forEach((button) => {
  button.addEventListener("click", () => openMoodletModal(button.dataset.addMoodlets));
});
document.querySelector("#account-demo")?.addEventListener("click", () => {
  setScreen("register");
  setRegisterStep(0);
});
document.querySelector("#back-to-local-journal")?.addEventListener("click", () => {
  render();
});
window.addEventListener("load", updateWelcomeNote);
window.addEventListener("load", updateHomeNote);
window.addEventListener("load", updateAppNote);
document.fonts?.ready.then(() => {
  updateWelcomeNote();
  updateHomeNote();
  updateAppNote();
});

registerScreen?.addEventListener("click", (event) => {
  const purpose = event.target.closest("[data-purpose]");
  if (purpose) {
    registerPurpose = purpose.dataset.purpose;
    renderRegisterPurpose();
    return;
  }

  if (event.target.closest("[data-register-next]")) {
    advanceRegistration();
  }

  if (event.target.closest("[data-register-back]")) {
    setRegisterStep(registerStepIndex === 5 ? 0 : registerStepIndex - 1);
  }

  if (event.target.closest("[data-register-login]")) {
    setRegisterStep(5);
  }

  if (event.target.closest("[data-register-finish]")) {
    finishRegistration();
  }

  if (event.target.closest("[data-login-finish]")) {
    finishLogin();
  }
});

[registerName, registerEmail, registerPassword, loginEmail, loginPassword].forEach((input) => {
  input?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    if (input === loginEmail || input === loginPassword) {
      finishLogin();
      return;
    }
    if (input === registerPassword) {
      finishRegistration();
    } else {
      advanceRegistration();
    }
  });
});

onboardingNext?.addEventListener("click", advanceOnboarding);
onboardingDots?.addEventListener("click", (event) => {
  const dot = event.target.closest("[data-onboarding-step]");
  if (!dot) return;
  setOnboardingStep(Number(dot.dataset.onboardingStep));
});
onboardingSheet?.addEventListener("pointerdown", startOnboardingGesture);
onboardingSheet?.addEventListener("pointermove", moveOnboardingGesture);
onboardingSheet?.addEventListener("pointerup", endOnboardingGesture);
onboardingSheet?.addEventListener("pointercancel", endOnboardingGesture);

welcomeContinue?.addEventListener("click", () => {
  const text = welcomeNote.value.trim();
  if (!text) {
    welcomeNote.focus();
    return;
  }

  const savedEntry = saveEntry(text, selectedMoodlets, "welcome");
  welcomeNote.value = "";
  selectedMoodlets = [];
  renderSelectedMoodlets();
  updateWelcomeNote();
  setScreen("app");
  setView("journal");
  showNoteToast();
  showGrowthMilestone(savedEntry.milestoneDay);
});

micButton?.addEventListener("click", () => startVoiceInput("welcome"));
homeMicButton?.addEventListener("click", () => startVoiceInput("home"));
appMicButton?.addEventListener("click", () => startVoiceInput("app"));

moodletGrid?.addEventListener("click", (event) => {
  const option = event.target.closest("[data-moodlet]");
  if (!option) return;
  const name = option.dataset.moodlet;
  const currentMoodlets = activeMoodletTarget === "app"
    ? appSelectedMoodlets
    : activeMoodletTarget === "home"
      ? homeSelectedMoodlets
      : selectedMoodlets;
  let nextMoodlets = currentMoodlets;
  if (currentMoodlets.includes(name)) {
    nextMoodlets = currentMoodlets.filter((item) => item !== name);
  } else if (currentMoodlets.length < 3) {
    nextMoodlets = [...currentMoodlets, name];
  }
  if (activeMoodletTarget === "app") {
    appSelectedMoodlets = nextMoodlets;
  } else if (activeMoodletTarget === "home") {
    homeSelectedMoodlets = nextMoodlets;
  } else {
    selectedMoodlets = nextMoodlets;
  }
  rememberDraft(activeMoodletTarget);
  renderMoodletGrid();
  moodletGrid.querySelector(`[data-moodlet="${CSS.escape(name)}"]`)?.focus();
});

moodletContinue?.addEventListener("click", () => {
  closeMoodletModal();
  document.querySelector(`[data-add-moodlets="${activeMoodletTarget}"]`)?.focus();
  if (activeMoodletTarget === "app") {
    renderAppSelectedMoodlets();
    updateAppNote();
  } else if (activeMoodletTarget === "home") {
    renderHomeSelectedMoodlets();
    updateHomeNote();
  } else {
    renderSelectedMoodlets();
    updateWelcomeNote();
  }
});

editMoodlets?.addEventListener("click", (event) => {
  event.preventDefault();
  openMoodletModal("welcome");
});

appEditMoodlets?.addEventListener("click", (event) => {
  event.preventDefault();
  openMoodletModal("app");
});

homeEditMoodlets?.addEventListener("click", (event) => {
  event.preventDefault();
  openMoodletModal("home");
});

profilePurposeOptions?.addEventListener("click", (event) => {
  const option = event.target.closest("[data-profile-purpose]");
  if (!option) return;
  profilePurposeDraft = option.dataset.profilePurpose;
  renderProfilePurposeOptions();
  saveProfileField("purpose");
});

profileNameSave?.addEventListener("click", () => saveProfileField("name"));
profileEmailSave?.addEventListener("click", () => saveProfileField("email"));

[profileNameInput, profileEmailInput].forEach((input) => {
  input?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    saveProfileField(input === profileNameInput ? "name" : "email");
  });
});

[profileNameModal, profileEmailModal, profilePurposeModal].forEach((modal) => {
  modal?.addEventListener("click", (event) => {
    if (event.target === modal) closeProfileEditModals();
  });
});

deleteConfirmYes?.addEventListener("click", confirmDeleteEntry);
deleteConfirmNo?.addEventListener("click", closeDeleteConfirmModal);
deleteConfirmModal?.addEventListener("click", (event) => {
  if (event.target === deleteConfirmModal) closeDeleteConfirmModal();
});

moodletModal?.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    moodletContinue.click();
  }
});

moodletModal?.addEventListener("click", (event) => {
  if (event.target === moodletModal) moodletContinue.click();
});

closeCongrats?.addEventListener("click", () => {
  congratsModal?.classList.remove("is-open");
  congratsModal?.setAttribute("aria-hidden", "true");
});

closeStageTwo?.addEventListener("click", () => {
  stageTwoModal?.classList.remove("is-open");
  stageTwoModal?.setAttribute("aria-hidden", "true");
});

closeStageThree?.addEventListener("click", () => {
  stageThreeModal?.classList.remove("is-open");
  stageThreeModal?.setAttribute("aria-hidden", "true");
});

closeStageFour?.addEventListener("click", () => {
  stageFourModal?.classList.remove("is-open");
  stageFourModal?.setAttribute("aria-hidden", "true");
});

closeStageFive?.addEventListener("click", () => {
  stageFiveModal?.classList.remove("is-open");
  stageFiveModal?.setAttribute("aria-hidden", "true");
});

closeStageSix?.addEventListener("click", () => {
  stageSixModal?.classList.remove("is-open");
  stageSixModal?.setAttribute("aria-hidden", "true");
});

closeStageSeven?.addEventListener("click", () => {
  stageSevenModal?.classList.remove("is-open");
  stageSevenModal?.setAttribute("aria-hidden", "true");
});

closeMissed?.addEventListener("click", handleMissedPrimaryAction);

missedModal?.addEventListener("click", (event) => {
  if (event.target === missedModal) closeMissedJournalModal();
});

stageTwoModal?.addEventListener("click", (event) => {
  if (event.target === stageTwoModal) {
    stageTwoModal.classList.remove("is-open");
    stageTwoModal.setAttribute("aria-hidden", "true");
  }
});

stageThreeModal?.addEventListener("click", (event) => {
  if (event.target === stageThreeModal) {
    stageThreeModal.classList.remove("is-open");
    stageThreeModal.setAttribute("aria-hidden", "true");
  }
});

stageFourModal?.addEventListener("click", (event) => {
  if (event.target === stageFourModal) {
    stageFourModal.classList.remove("is-open");
    stageFourModal.setAttribute("aria-hidden", "true");
  }
});

stageFiveModal?.addEventListener("click", (event) => {
  if (event.target === stageFiveModal) {
    stageFiveModal.classList.remove("is-open");
    stageFiveModal.setAttribute("aria-hidden", "true");
  }
});

stageSixModal?.addEventListener("click", (event) => {
  if (event.target === stageSixModal) {
    stageSixModal.classList.remove("is-open");
    stageSixModal.setAttribute("aria-hidden", "true");
  }
});

stageSevenModal?.addEventListener("click", (event) => {
  if (event.target === stageSevenModal) {
    stageSevenModal.classList.remove("is-open");
    stageSevenModal.setAttribute("aria-hidden", "true");
  }
});

appNotePrimary?.addEventListener("click", () => {
  const text = appNote.value.trim();
  if (!text) {
    appNote.focus();
    return;
  }

  if (editingEntryId) {
    updateEntry(editingEntryId, text, appSelectedMoodlets);
    closeAppNoteModal();
    setScreen("app");
    setView("journal");
    showNoteToast();
    return;
  }

  const savedEntry = saveEntry(text, appSelectedMoodlets, "app");
  closeAppNoteModal();
  setScreen("app");
  setView("journal");
  showNoteToast();
  showGrowthMilestone(savedEntry.milestoneDay);
});

homeContinue?.addEventListener("click", () => {
  const text = homeNote.value.trim();
  if (!text) {
    homeNote.focus();
    return;
  }

  const savedEntry = saveEntry(text, homeSelectedMoodlets, "home");
  homeNote.value = "";
  homeSelectedMoodlets = [];
  renderHomeSelectedMoodlets();
  updateHomeNote();
  setScreen("app");
  setView("journal");
  showNoteToast();
  showGrowthMilestone(savedEntry.milestoneDay);
});

appNoteCancel?.addEventListener("click", closeAppNoteModal);

appNoteModal?.addEventListener("click", (event) => {
  if (event.target === appNoteModal) closeAppNoteModal();
});

adminDayGrid?.addEventListener("click", (event) => {
  if (state.mockDataEnabled === false) return;
  const button = event.target.closest("[data-visit-day]");
  if (!button) return;
  adminDraftVisitDay = Number(button.dataset.visitDay);
  renderAdminModal();
});

adminSkipOptions?.addEventListener("click", (event) => {
  if (state.mockDataEnabled === false) return;
  const button = event.target.closest("[data-skip-days]");
  if (!button) return;
  adminDraftSkippedDays = Number(button.dataset.skipDays);
  renderAdminModal();
});

adminMockToggle?.addEventListener("change", () => {
  setMockDataEnabled(adminMockToggle.checked);
});

adminSave?.addEventListener("click", () => {
  if (state.mockDataEnabled === false) return;
  state.adminVisitDay = adminDraftVisitDay;
  state.skippedJournalDays = adminDraftSkippedDays;
  state.mockDataEnabled = true;
  const shouldShowMissedModal = journalView?.classList.contains("is-active") && skippedJournalDaysBeforeToday() > 0;
  saveState();
  renderWeeklyProgress();
  renderEntries();
  renderPlant();
  closeAdminModal();
  if (shouldShowMissedModal) showMissedJournalModal();
});

adminModal?.addEventListener("click", (event) => {
  if (event.target === adminModal) closeAdminModal();
});

homeEntryList?.addEventListener("click", (event) => {
  const button = event.target.closest(".read-more");
  if (!button) return;
  const card = button.closest(".entry-card");
  const expanded = card.classList.toggle("is-expanded");
  button.textContent = expanded ? t("showLess") : t("showMore");
});

function selectWeeklyDay(day) {
  selectedDayKey = day;
  renderWeeklyProgress();
  renderEntries();
}

weeklyProgress?.addEventListener("click", (event) => {
  const day = event.target.closest("[data-day]");
  if (!day) return;
  selectWeeklyDay(day.dataset.day);
});

weeklyProgress?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const day = event.target.closest("[data-day]");
  if (!day) return;
  event.preventDefault();
  selectWeeklyDay(day.dataset.day);
});

journalView?.addEventListener("scroll", updateJournalScrollState, { passive: true });
window.addEventListener("resize", updateTabIndicator);

welcomeNote.value = state.drafts.welcome?.text || "";
selectedMoodlets = state.drafts.welcome?.moodlets || [];
homeNote.value = state.drafts.home?.text || "";
homeSelectedMoodlets = state.drafts.home?.moodlets || [];
render();
renderMoodletGrid();
renderSelectedMoodlets();
renderHomeSelectedMoodlets();
renderAppSelectedMoodlets();
renderAdminModal();
updateWelcomeNote();
updateHomeNote();
updateAppNote();
