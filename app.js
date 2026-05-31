const STORAGE_KEY = "unfleur-state";
const NOTE_TOAST_DURATION = 850;
const MILESTONE_MODAL_DELAY = 1100;
const CHECKED_DAY_MARKER = "https://www.figma.com/api/mcp/asset/11dfd974-923e-4656-826b-aafd34554552";
const MISSED_DAY_MARKER = "https://www.figma.com/api/mcp/asset/9bb56a09-d123-4371-b554-9208b045871c";
const BLOOMY_IMAGES = {
  healthy: {
    bg: "assets/journal-main-image.png",
    pot: "assets/journal-pot-image.png",
    className: "",
  },
  stage2: {
    bg: "https://www.figma.com/api/mcp/asset/85f5d200-b3fa-4686-813c-8789bb140ae3",
    pot: "https://www.figma.com/api/mcp/asset/5806b550-934c-4b52-a183-5bc6f608a0ff",
    className: "is-stage-two",
  },
  stage3: {
    bg: "https://www.figma.com/api/mcp/asset/5b916960-8803-4564-9d37-caff80f61246",
    pot: "https://www.figma.com/api/mcp/asset/3605d52c-0042-44a5-b4b8-64d9424ce2e0",
    className: "is-stage-three",
  },
  stage4: {
    bg: "https://www.figma.com/api/mcp/asset/0dd1c82c-8bac-4fdf-acfa-474bac12e468",
    pot: "https://www.figma.com/api/mcp/asset/3daa1b28-35c5-414e-aeb3-23133cd6a2ee",
    className: "is-stage-four",
  },
  stage5: {
    bg: "https://www.figma.com/api/mcp/asset/d593b05c-e1ad-4044-b0cf-1596b1b44c5e",
    pot: "https://www.figma.com/api/mcp/asset/1e502d37-edb6-4f67-a3c9-d01086a59652",
    className: "is-stage-five",
  },
  stage6: {
    bg: "https://www.figma.com/api/mcp/asset/530b8841-b27e-4172-8958-e7c87d1bd172",
    pot: "https://www.figma.com/api/mcp/asset/c0ecef2c-f304-4f2c-b2c5-4cf3e1684bd2",
    className: "is-stage-six",
  },
  stage7: {
    bg: "https://www.figma.com/api/mcp/asset/094561e5-456d-4f38-8060-9203f8fcf501",
    pot: "https://www.figma.com/api/mcp/asset/daa2d209-f736-47b3-bfb3-a7a5278462ab",
    className: "is-stage-seven",
  },
  missed1: {
    bg: "https://www.figma.com/api/mcp/asset/39b4356f-1248-4f92-a81a-c6ddbfac8787",
    pot: "https://www.figma.com/api/mcp/asset/b5443258-1038-4740-94da-c492e30ee9ea",
    className: "is-missed-one",
  },
  missed2: {
    bg: "https://www.figma.com/api/mcp/asset/884bf21c-7576-44ae-8e2b-139bc480a8f7",
    pot: "https://www.figma.com/api/mcp/asset/894ce4b5-bc55-4a7b-ae7c-d58e2059851e",
    className: "is-missed-two",
  },
};

const defaults = {
  onboarded: true,
  registered: false,
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
  mockDataEnabled: true,
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
const adminClear = document.querySelector("#admin-clear");
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
  ["Happy", "Rectangle 5-1.png"],
  ["Sad", "Rectangle 5-2.png"],
  ["Dreamy", "Rectangle 5-3.png"],
  ["Inspired", "Rectangle 5-4.png"],
  ["Lonely", "Rectangle 5-5.png"],
  ["Calm", "Rectangle 5-6.png"],
  ["Romantic", "Rectangle 5-7.png"],
  ["Searching", "Rectangle 5-8.png"],
  ["Relaxed", "Rectangle 5-9.png"],
  ["Curious", "Rectangle 5-10.png"],
  ["Cozy", "Rectangle 5-11.png"],
  ["Excited", "Rectangle 5-12.png"],
  ["Hopeful", "Rectangle 5-13.png"],
  ["Grateful", "Rectangle 5-14.png"],
  ["Growing", "Rectangle 5-15.png"],
  ["Social", "Rectangle 5-16.png"],
  ["Playful", "Rectangle 5-17.png"],
  ["Vulnerable", "Rectangle 5-18.png"],
  ["Flirty", "Rectangle 5-19.png"],
  ["Toxic", "Rectangle 5-20.png"],
  ["Emotional", "Rectangle 5-21.png"],
  ["Soft", "Rectangle 5-22.png"],
  ["Free", "Rectangle 5-23.png"],
  ["Radiant", "Rectangle 5.png"],
].map(([name, fileName]) => ({
  name,
  image: `assets/moodlets/${fileName}`,
}));

const mockJournalNotes = [
  {
    text: "I watered Bloomy and wrote down the softest part of the morning. It felt small, but it still counted.",
    moodlets: ["Calm", "Growing", "Grateful"],
  },
  {
    text: "A strange, bright day. I noticed how much easier it is to breathe after naming what I actually feel.",
    moodlets: ["Curious", "Soft", "Hopeful"],
  },
  {
    text: "I almost skipped this note, then gave myself two quiet minutes. Bloomy gets a little taller when I show up.",
    moodlets: ["Vulnerable", "Inspired", "Growing"],
  },
  {
    text: "Today had a tiny win: I chose rest before everything became too loud. Keeping that one.",
    moodlets: ["Relaxed", "Cozy", "Free"],
  },
  {
    text: "There was a gentle moment in the middle of the mess. I want to remember that it was real.",
    moodlets: ["Emotional", "Grateful", "Radiant"],
  },
  {
    text: "I made space for myself today, even if it was only a few sentences. That still feels like progress.",
    moodlets: ["Hopeful", "Calm", "Social"],
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
    homeTitle: "Capture your life journey",
    introBody: "Your safe place to share<br />your thoughts that actually grow<br />something.",
    introBodyCompact: "Your safe place to share<br />your thoughts that actually grow something.",
    homeBody: "Unfleur is your safe place to plant your thoughts that actually grow something.",
    welcomeBody: "Your safe place to plant your thoughts and actually grow something.",
    reviewTitle: "Glad you’re having<br />a good day so far",
    reviewBody: "Take a moment to review your note, then save it or make any necessary changes.",
    startJournaling: "Create account",
    logIn: "Log in",
    loginBody: "Enter any credentials to continue for now.",
    continue: "Continue",
    save: "Save",
    saveNote: "Save Note",
    discard: "Discard",
    cancel: "Cancel",
    notePrompt: "How was your day so far?",
    notePlaceholder: "Type or say something about your day...",
    symbols: "symbols",
    voiceNote: "Voice note",
    editMoodlets: "Edit moodlets",
    step1: "Step 1 of 4",
    step2: "Step 2 of 4",
    step3: "Step 3 of 4",
    step4: "Step 4 of 4",
    questionName: "What is your name?",
    questionPurpose: "What is your current purpose of journaling?",
    questionEmail: "Enter your email",
    questionPassword: "Create your password",
    nameTagline: "Type your name below.",
    purposeTagline: "Choose what feels most true today.",
    emailTagline: "We’ll use it to keep your account safe.",
    passwordTagline: "Make it something only you know.",
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
    openCalendar: "Open calendar",
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
    congratsTitle: "Congratulations!",
    congratsBody: "You’ve just planted your first flower—excited to see what blooms? Keep up with your journaling for a full week to help your plant thrive!",
    congratsButton: "Ok, Let’s GO!",
    stage2Title: "Well, hello Bloomy!",
    stage2Body: "You did a great job journaling your day yesterday, keep going to see the next stages of Bloomy’s growth!",
    stage3Title: "Do you see what we see?",
    stage3Body: "Awesome work journaling three days straight! Bloomy is safe and sound, keep going.",
    stage4Title: "What a caring parent you are!",
    stage4Body: "Bloomy is in his teenage stage and is on the brink of adulthood. You did a fantastic job!",
    stage5Title: "You must be proud of yourself now",
    stage5Body: "Bloomy is in his teenage stage and is on the brink of adulthood. You did a fantastic job!",
    stage6Title: "Look! He’s about to bloom",
    stage6Body: "Thanks to your journaling, Bloomy has been thriving for nearly a week! Come back tomorrow to see Bloomy in all its glory!",
    stage7Title: "Unbelievable! You finished a 7-day streak",
    stage7Body: "Bloomy’s at his prime, but don’t stop journaling to keep Bloomy watered and cleaned.",
    okThanks: "Ok, thanks!",
    missed1Title: "Oh no!",
    missed1Body: "Looks like you missed journaling yesterday! No worries, just jot down a note about your day today, and we’ll take care of watering and cleaning Bloomy for you.",
    missed2Title: "Sorry to break it to you...",
    missed2Body: "You missed two days in a row, and poor Bloomy was left all alone! The good news is that you can start journaling today to kick off a fresh adventure with Bloomy in his next life.",
    startOver: "Start over",
    adminTitle: "Bloomy admin",
    adminBody: "Set Bloomy’s current streak and recent skipped days.",
    dayInRow: "Day in a row",
    skippedBeforeToday: "Skipped before today",
    none: "None",
    oneDay: "1 day",
    twoDays: "2 days",
    apply: "Apply",
    clearMockData: "Clear mock data",
    mockActive: "Bloomy will appear on visit day {day} of 7 with {skipped} skipped day(s). Today’s note grows Bloomy to stage {growthDay}.",
    mockCleared: "Mock data is cleared. Journal is using real notes saved locally.",
    skippedTitle: "Journaling skipped",
    skippedBody: "Bloomy missed a note on this day.",
    noEntriesTitle: "No entries yet",
    noEntriesBody: "No notes for this day yet.",
    pastNoEntriesTitle: "Nothing’s here",
    pastNoEntriesBody: "You didn’t journal anything that day.",
    editEntry: "Edit entry",
    deleteEntry: "Delete entry",
    showMore: "Show more",
    showLess: "Show less",
    profileSummary: "{stage} of 7 bloom stages grown. Keep the daily notes coming.",
    noteSaved: "The note is saved",
    noteDeleted: "The note is deleted",
    deleteConfirmTitle: "Are you sure you want to delete this note?",
    deleteConfirmBody: "This action can’t be undone.",
    yesDelete: "Yes, Delete",
    noCancel: "No, Cancel",
    moodletTitle: "Choose up to 3 Moodlets",
    moodletBody: "The Moodlets should reflect how you felt throughout the day.",
    choosePot: "Choose your pot",
    potBody: "The flower will keep growing with every daily note.",
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
    homeTitle: "Закарбовуй свій життєвий шлях",
    introBody: "Твій безпечний простір, щоб ділитися<br />думками, з яких справді<br />щось виростає.",
    introBodyCompact: "Твій безпечний простір, щоб ділитися<br />думками, з яких справді щось виростає.",
    homeBody: "Unfleur — твій безпечний простір, щоб садити думки, з яких справді виростає щось живе.",
    welcomeBody: "Твій безпечний простір, щоб садити думки й справді вирощувати щось живе.",
    reviewTitle: "Раді, що твій день<br />поки складається добре",
    reviewBody: "Переглянь нотатку й збережи її або внеси потрібні зміни.",
    startJournaling: "Створити акаунт",
    logIn: "Увійти",
    loginBody: "Введи будь-які дані, щоб продовжити.",
    continue: "Продовжити",
    save: "Зберегти",
    saveNote: "Зберегти нотатку",
    discard: "Скасувати зміни",
    cancel: "Скасувати",
    notePrompt: "Як пройшов твій день?",
    notePlaceholder: "Напиши або скажи щось про свій день...",
    symbols: "символів",
    voiceNote: "Голосова нотатка",
    editMoodlets: "Редагувати Moodlets",
    step1: "Крок 1 з 4",
    step2: "Крок 2 з 4",
    step3: "Крок 3 з 4",
    step4: "Крок 4 з 4",
    questionName: "Як тебе звати?",
    questionPurpose: "Яка твоя поточна мета ведення щоденника?",
    questionEmail: "Введи email",
    questionPassword: "Створи пароль",
    nameTagline: "Введи своє ім’я нижче.",
    purposeTagline: "Обери те, що зараз відгукується найбільше.",
    emailTagline: "Ми використаємо його, щоб захистити акаунт.",
    passwordTagline: "Нехай це буде щось, що знаєш лише ти.",
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
    openCalendar: "Відкрити календар",
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
    congratsTitle: "Вітаємо!",
    congratsBody: "Ти щойно посадив свою першу квітку. Цікаво, що розквітне? Веди щоденник цілий тиждень, щоб допомогти рослині рости!",
    congratsButton: "Гаразд, почнімо!",
    stage2Title: "Привіт, Блумі!",
    stage2Body: "Ти чудово впорався з учорашнім записом. Продовжуй, щоб побачити наступні етапи росту Блумі!",
    stage3Title: "Бачиш те, що бачимо ми?",
    stage3Body: "Класна робота: три дні щоденника поспіль! Блумі в безпеці, продовжуй.",
    stage4Title: "Який турботливий догляд!",
    stage4Body: "Блумі вже підліток і майже дорослий. Ти чудово впорався!",
    stage5Title: "Ти точно можеш пишатися собою",
    stage5Body: "Блумі вже підліток і майже дорослий. Ти чудово впорався!",
    stage6Title: "Дивись! Він от-от розквітне",
    stage6Body: "Завдяки твоєму щоденнику Блумі росте майже цілий тиждень! Повернися завтра, щоб побачити його у всій красі!",
    stage7Title: "Неймовірно! Ти завершив 7-денну серію",
    stage7Body: "Блумі у найкращій формі, але не зупиняйся: продовжуй писати, щоб поливати й доглядати його.",
    okThanks: "Гаразд, дякую!",
    missed1Title: "О ні!",
    missed1Body: "Схоже, ти пропустив щоденник учора. Нічого страшного: просто напиши нотатку про сьогоднішній день, а ми подбаємо про полив і догляд за Блумі.",
    missed2Title: "Маємо неприємну новину...",
    missed2Body: "Ти пропустив два дні поспіль, і бідний Блумі залишився сам. Але є добра новина: можеш почати писати сьогодні й розпочати нову пригоду з Блумі в його наступному житті.",
    startOver: "Почати знову",
    adminTitle: "Адмінка Блумі",
    adminBody: "Налаштуй поточну серію Блумі та нещодавні пропущені дні.",
    dayInRow: "День поспіль",
    skippedBeforeToday: "Пропущено перед сьогодні",
    none: "Немає",
    oneDay: "1 день",
    twoDays: "2 дні",
    apply: "Застосувати",
    clearMockData: "Очистити мок-дані",
    mockActive: "Блумі буде на {day}-му дні з 7 і з {skipped} пропущеними днями. Сьогоднішня нотатка виростить Блумі до етапу {growthDay}.",
    mockCleared: "Мок-дані очищено. Щоденник використовує реальні локально збережені нотатки.",
    skippedTitle: "Щоденник пропущено",
    skippedBody: "Цього дня Блумі не отримав нотатку.",
    noEntriesTitle: "Записів ще немає",
    noEntriesBody: "Для цього дня ще немає нотаток.",
    pastNoEntriesTitle: "Тут нічого немає",
    pastNoEntriesBody: "Того дня ти нічого не записала.",
    editEntry: "Редагувати запис",
    deleteEntry: "Видалити запис",
    showMore: "Показати більше",
    showLess: "Показати менше",
    profileSummary: "{stage} із 7 етапів росту пройдено. Продовжуй щоденні нотатки.",
    noteSaved: "Нотатку збережено",
    noteDeleted: "Нотатку видалено",
    deleteConfirmTitle: "Ти впевнена, що хочеш видалити цю нотатку?",
    deleteConfirmBody: "Цю дію не можна скасувати.",
    yesDelete: "Так, видалити",
    noCancel: "Ні, скасувати",
    moodletTitle: "Обери до 3 Moodlets",
    moodletBody: "Moodlets мають відображати, як ти почувався протягом дня.",
    choosePot: "Обери горщик",
    potBody: "Квітка ростиме з кожною щоденною нотаткою.",
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
let profilePurposeDraft = state.profile?.purpose || "";
let pendingDeleteEntryId = "";
let homeEntranceTimer = null;
let welcomeEntranceTimer = null;
let homeEntrancePlayed = false;

function loadState() {
  try {
    return { ...defaults, ...JSON.parse(localStorage.getItem(STORAGE_KEY)) };
  } catch {
    return defaults;
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
    const growthDay = mockGrowthDayAfterToday();
    return hasTodayEntry() ? growthDay : Math.max(1, growthDay - 1);
  }

  const today = startOfToday();
  const streakEnd = hasTodayEntry() ? today : addDays(today, -1);
  return Math.max(1, realGrowthDay() || streakCount(streakEnd));
}

function mockGrowthDayAfterToday() {
  normalizeBloomyState();
  return Math.min(Math.max(state.adminVisitDay - state.skippedJournalDays, 1), 7);
}

function bloomyImageForStage(stage) {
  if (stage >= 7) return BLOOMY_IMAGES.stage7;
  if (stage === 6) return BLOOMY_IMAGES.stage6;
  if (stage === 5) return BLOOMY_IMAGES.stage5;
  if (stage === 4) return BLOOMY_IMAGES.stage4;
  if (stage >= 3) return BLOOMY_IMAGES.stage3;
  if (stage === 2) return BLOOMY_IMAGES.stage2;
  return BLOOMY_IMAGES.healthy;
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
  const previousCompletedDays = Math.max(0, mockGrowthDayAfterToday() - 1);
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
  if (registerStepIndex === 0) {
    welcomeEntranceTimer = playEntrance(registerScreen, "is-welcome-entering", "welcome");
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

  setText("#welcome-note-card > span, #home-note-card > span, #app-note-title", "notePrompt");
  setAttr("#welcome-note, #home-note, #app-note", "aria-label", "notePrompt");
  setAttr("#welcome-note, #home-note, #app-note", "placeholder", "notePlaceholder");
  setAttr(".figma-mic, .home-mic, .app-mic", "aria-label", "voiceNote");
  setAttr("#edit-moodlets, #home-edit-moodlets, #app-edit-moodlets", "aria-label", "editMoodlets");
  setAttr('[data-action="open-admin-modal"]', "aria-label", "openAdmin");
  setAttr('[data-action="open-note-modal"]', "aria-label", "addEntry");
  setAttr(".app-header .round-button[data-icon='calendar']", "aria-label", "openCalendar");
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
  setText("#profile-name-save, #profile-email-save", "saveChanges");
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
  setText(".admin-field:nth-of-type(1) > span", "dayInRow");
  setText(".admin-field:nth-of-type(2) > span", "skippedBeforeToday");
  setText('[data-skip-days="0"]', "none");
  setText('[data-skip-days="1"]', "oneDay");
  setText('[data-skip-days="2"]', "twoDays");
  setText("#admin-save", "apply");
  setText("#admin-clear", "clearMockData");
  setText("#delete-confirm-title", "deleteConfirmTitle");
  setText(".delete-confirm-copy p", "deleteConfirmBody");
  setText("#delete-confirm-yes", "yesDelete");
  setText("#delete-confirm-no", "noCancel");
  if (noteToastText && !noteToast.classList.contains("is-visible")) noteToastText.textContent = t("noteSaved");
  setText("#moodlet-title", "moodletTitle");
  setText(".moodlet-header p", "moodletBody");
  setText("#moodlet-continue", "continue");
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
  state.onboarded = true;
  saveState();
  setScreen("app");
  setView("home");
  render();
}

function finishLogin() {
  state.registered = true;
  state.onboarded = true;
  ensureProfileState();
  if (loginEmail?.value.trim()) state.profile.email = loginEmail.value.trim();
  saveState();
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
  const start = new Date(today);
  start.setDate(today.getDate() - 4);
  const journal = mockJournalModel();

  weeklyProgress.innerHTML = "";

  for (let index = 0; index < 7; index += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const key = dayKey(date);
    const isMissed = journal.missed.has(key);
    const isComplete = (journal.completed.has(key) || (key === dayKey(today) && hasTodayEntry())) && !isMissed;
    const item = document.createElement("div");
    item.className = `day-progress ${isComplete ? "is-complete" : ""} ${isMissed ? "is-missed" : ""} ${key === selectedDayKey ? "is-selected" : ""}`;
    item.dataset.day = key;
    item.role = "button";
    item.tabIndex = 0;
    item.ariaPressed = String(key === selectedDayKey);
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
  const entries = [...state.entries, ...mockEntries]
    .filter((entry) => dayKey(entry.date) === selectedDayKey)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  homeEntryList.innerHTML = "";

  if (journal.missed.has(selectedDayKey)) {
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

function saveEntry(text, moodlets = []) {
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
        : state.mockDataEnabled
          ? mockGrowthDayAfterToday()
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
  const moodlet = moodlets.find((item) => item.name === name) || moodlets[0];
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
  const isFirstStreakDay = state.mockDataEnabled ? state.adminVisitDay <= 1 : state.entries.length === 0;
  journalView?.classList.toggle("no-real-entries", state.entries.length === 0 && isFirstStreakDay);
}

function bloomyImageState() {
  normalizeBloomyState();
  const stage = bloomyDisplayStage();
  const skippedDays = skippedJournalDaysBeforeToday();
  if (hasTodayEntry()) return bloomyImageForStage(stage);
  if (skippedDays >= 2) return BLOOMY_IMAGES.missed2;
  if (skippedDays === 1) return BLOOMY_IMAGES.missed1;
  return bloomyImageForStage(stage);
}

function normalizeBloomyState() {
  state.adminVisitDay = Math.min(Math.max(Number(state.adminVisitDay) || 1, 1), 7);
  state.skippedJournalDays = [0, 1, 2].includes(Number(state.skippedJournalDays)) ? Number(state.skippedJournalDays) : 0;
  state.mockDataEnabled = state.mockDataEnabled !== false;
}

function renderPotOptions() {
  document.querySelectorAll(".pot-options [data-pot]").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.pot === state.pot);
  });
}

function render() {
  ensureProfileState();
  state.language = language();
  if (state.registered) {
    setScreen("app");
    setView("home");
  } else {
    setScreen("register");
    setRegisterStep(registerStepIndex);
  }
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
  const hasText = length > 0;
  const hasMoodlets = selectedMoodlets.length > 0;
  welcomeNoteFlow.classList.toggle("has-text", hasText);
  welcomeContinue?.classList.toggle("is-visible", hasText);
  welcomeScreen?.classList.toggle("review-state", hasMoodlets);
  if (welcomeContinue) welcomeContinue.textContent = hasMoodlets ? t("saveNote") : t("continue");
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
  const hasText = length > 0;
  const hasMoodlets = homeSelectedMoodlets.length > 0;
  homeCounter.textContent = `${length}/500 ${t("symbols")}`;
  homeNoteShell.classList.toggle("has-text", hasText);
  homeNoteCard.classList.toggle("has-text", hasText);
  homeNoteCard.classList.toggle("has-moodlets", hasMoodlets);
  if (homeContinue) homeContinue.textContent = hasMoodlets ? t("saveNote") : t("continue");

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

function resetAppNoteModal() {
  editingEntryId = null;
  appSelectedMoodlets = [];
  if (appNote) appNote.value = "";
  renderAppSelectedMoodlets();
  updateAppNote();
}

function openAppNoteModal(entry = null) {
  resetAppNoteModal();
  if (entry) {
    editingEntryId = entry.id;
    appSelectedMoodlets = [...(entry.moodlets || [])];
    if (appNote) appNote.value = entry.text || "";
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
  const hasText = length > 0;
  const hasMoodlets = appSelectedMoodlets.length > 0;
  appCounter.textContent = `${length}/500 ${t("symbols")}`;
  appNoteCard.classList.toggle("has-text", hasText);
  appNoteCard.classList.toggle("has-moodlets", hasMoodlets);
  appNotePrimary.disabled = !hasText;
  appNotePrimary.textContent = editingEntryId || hasMoodlets ? t("saveNote") : hasText ? t("continue") : t("save");
  if (appNoteCancel) appNoteCancel.textContent = hasText ? t("discard") : t("cancel");

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
  if (hasTodayEntry()) return;
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
  state.mockDataEnabled = true;
  saveState();
  renderWeeklyProgress();
  renderEntries();
  renderPlant();
  renderAdminModal();
}

function renderAdminModal() {
  if (!adminDayGrid || !adminSkipOptions || !adminSummary) return;
  adminDayGrid.innerHTML = "";
  for (let day = 1; day <= 7; day += 1) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.visitDay = String(day);
    button.className = day === adminDraftVisitDay ? "is-selected" : "";
    button.textContent = String(day);
    adminDayGrid.append(button);
  }

  adminSkipOptions.querySelectorAll("[data-skip-days]").forEach((button) => {
    button.classList.toggle("is-selected", Number(button.dataset.skipDays) === adminDraftSkippedDays);
  });
  const growthDay = Math.min(Math.max(adminDraftVisitDay - adminDraftSkippedDays, 1), 7);
  adminSummary.textContent = state.mockDataEnabled
    ? t("mockActive", { day: adminDraftVisitDay, skipped: adminDraftSkippedDays, growthDay })
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

function clearMockData() {
  state.adminVisitDay = 1;
  state.skippedJournalDays = 0;
  state.mockDataEnabled = false;
  adminDraftVisitDay = state.adminVisitDay;
  adminDraftSkippedDays = state.skippedJournalDays;
  saveState();
  closeAdminModal();
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
  saveState();
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
  setScreen("register");
  setRegisterStep(0);
}

function deleteAccount() {
  localStorage.removeItem(STORAGE_KEY);
  state = {
    ...defaults,
    entries: [],
    profile: { ...defaults.profile },
  };
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
    button.innerHTML = `<span class="moodlet-swatch" style="${moodletStyle(moodlet.name)}"></span><span>${moodlet.name}</span>`;
    moodletGrid.append(button);
  });
  if (moodletContinue) moodletContinue.disabled = targetMoodlets.length === 0;
}

function renderSelectedMoodlets() {
  if (!selectedMoodletsNode || !selectedMoodletsBar) return;
  selectedMoodletsBar.hidden = selectedMoodlets.length === 0;
  selectedMoodletsNode.innerHTML = selectedMoodlets
    .map((name) => `<span class="moodlet-swatch" style="${moodletStyle(name)}" title="${name}"></span>`)
    .join("");
}

function renderAppSelectedMoodlets() {
  if (!appSelectedMoodletsNode || !appSelectedMoodletsBar) return;
  appSelectedMoodletsBar.hidden = appSelectedMoodlets.length === 0;
  appSelectedMoodletsNode.innerHTML = appSelectedMoodlets
    .map((name) => `<span class="moodlet-swatch" style="${moodletStyle(name)}" title="${name}"></span>`)
    .join("");
}

function renderHomeSelectedMoodlets() {
  if (!homeSelectedMoodletsNode || !homeSelectedMoodletsBar) return;
  homeSelectedMoodletsBar.hidden = homeSelectedMoodlets.length === 0;
  homeSelectedMoodletsNode.innerHTML = homeSelectedMoodlets
    .map((name) => `<span class="moodlet-swatch" style="${moodletStyle(name)}" title="${name}"></span>`)
    .join("");
}

function openMoodletModal(target = "welcome") {
  activeMoodletTarget = target;
  renderMoodletGrid();
  moodletModal?.classList.add("is-open");
  moodletModal?.setAttribute("aria-hidden", "false");
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

welcomeNote?.addEventListener("input", updateWelcomeNote);
homeNote?.addEventListener("input", updateHomeNote);
appNote?.addEventListener("input", updateAppNote);
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

welcomeContinue?.addEventListener("click", () => {
  const text = welcomeNote.value.trim();
  if (!text) {
    welcomeNote.focus();
    return;
  }

  if (!selectedMoodlets.length) {
    openMoodletModal("welcome");
    return;
  }

  const savedEntry = saveEntry(text, selectedMoodlets);
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
  renderMoodletGrid();
});

moodletContinue?.addEventListener("click", () => {
  if (activeMoodletTarget === "app" && !appSelectedMoodlets.length) return;
  if (activeMoodletTarget === "home" && !homeSelectedMoodlets.length) return;
  if (activeMoodletTarget === "welcome" && !selectedMoodlets.length) return;
  closeMoodletModal();
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

moodletModal?.addEventListener("click", (event) => {
  if (event.target === moodletModal) closeMoodletModal();
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

  if (!appSelectedMoodlets.length) {
    openMoodletModal("app");
    return;
  }

  const savedEntry = saveEntry(text, appSelectedMoodlets);
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

  if (!homeSelectedMoodlets.length) {
    openMoodletModal("home");
    return;
  }

  const savedEntry = saveEntry(text, homeSelectedMoodlets);
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
  const button = event.target.closest("[data-visit-day]");
  if (!button) return;
  adminDraftVisitDay = Number(button.dataset.visitDay);
  renderAdminModal();
});

adminSkipOptions?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-skip-days]");
  if (!button) return;
  adminDraftSkippedDays = Number(button.dataset.skipDays);
  renderAdminModal();
});

adminSave?.addEventListener("click", () => {
  state.adminVisitDay = adminDraftVisitDay;
  state.skippedJournalDays = adminDraftSkippedDays;
  state.mockDataEnabled = true;
  const shouldShowMissedModal = journalView?.classList.contains("is-active") && skippedJournalDaysBeforeToday() > 0 && !hasTodayEntry();
  saveState();
  renderWeeklyProgress();
  renderEntries();
  renderPlant();
  closeAdminModal();
  if (shouldShowMissedModal) showMissedJournalModal();
});

adminClear?.addEventListener("click", clearMockData);

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

render();
renderMoodletGrid();
renderSelectedMoodlets();
renderHomeSelectedMoodlets();
renderAppSelectedMoodlets();
renderAdminModal();
updateWelcomeNote();
updateHomeNote();
updateAppNote();
