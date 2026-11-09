function unit(n, title, learned, mastered, vocabulary, due = 0, reviewed = mastered) {
  const words = vocabulary.split('|').map(pair => {
    const [en, cn] = pair.split(':');
    return { en, cn };
  });
  const dueWords = new Set(words.slice(0, due));
  return { n, title, learned, mastered, words, dueWords, reviewedWords: new Set(words.slice(0, reviewed)),
    get due() { return dueWords.size; } };
}

const books = [
  { name: '五年级上册', grade: '五', term: '上', units: [
    unit(1, "What's he like?", 12, 8, 'old:年老的|young:年轻的|funny:滑稽的|kind:和蔼的|strict:严格的|polite:有礼貌的|shy:害羞的|helpful:有帮助的|clever:聪明的|hard-working:勤奋的|quiet:安静的|friendly:友好的', 4, 10),
    unit(2, 'My week', 14, 6, 'Monday:星期一|Tuesday:星期二|Wednesday:星期三|Thursday:星期四|Friday:星期五|Saturday:星期六|Sunday:星期日|weekend:周末|wash:洗|watch:观看|play:玩|read:阅读|homework:家庭作业|often:经常|sometimes:有时|usually:通常|every:每个|after:在……之后|class:课', 5, 9),
    unit(3, 'What would you like?', 12, 4, 'sandwich:三明治|salad:沙拉|hamburger:汉堡包|ice cream:冰激凌|tea:茶|fresh:新鲜的|healthy:健康的|delicious:美味的|hot:辣的|sweet:甜的|food:食物|drink:饮料|water:水|milk:牛奶|juice:果汁|rice:米饭|bread:面包|chicken:鸡肉|fish:鱼|fruit:水果|favourite:最喜欢的', 3, 7),
    unit(4, 'What can you do?', 8, 0, 'sing:唱歌|song:歌曲|dance:跳舞|draw:画|cartoon:漫画|swim:游泳|cook:烹饪|basketball:篮球|football:足球|pipa:琵琶|kung fu:功夫|speak:说|English:英语|Chinese:中文|learn:学习|practice:练习|run:跑|jump:跳', 0, 4),
    unit(5, 'There is a big bed', 4, 0, 'clock:时钟|plant:植物|bottle:瓶子|bike:自行车|photo:照片|front:前面|behind:在……后面|beside:在……旁边|between:在……之间|above:在……上面|room:房间|bed:床|desk:书桌|chair:椅子|window:窗户|door:门|wall:墙|floor:地板|computer:电脑|lamp:台灯|box:盒子|under:在……下面|near:在……附近|clean:干净的', 0, 2),
    unit(6, 'In a nature park', 0, 0, 'forest:森林|river:河流|lake:湖泊|mountain:山|hill:小山|tree:树|bridge:桥|building:建筑物|village:村庄|house:房屋|park:公园|nature:自然|flower:花|grass:草|bird:鸟|cloud:云|boat:小船|path:小路|duck:鸭子|rabbit:兔子|sky:天空|quiet:安静的|beautiful:美丽的|beside:在……旁边')
  ] },
  { name: '五年级下册', grade: '五', term: '下', units: [
    unit(1, 'My day', 0, 0, 'breakfast:早餐|morning:早晨|exercise:锻炼|dinner:晚餐'),
    unit(2, 'My favourite season', 0, 0, 'spring:春天|summer:夏天|autumn:秋天|winter:冬天'),
    unit(3, 'My school calendar', 0, 0, 'March:三月|April:四月|May:五月|June:六月'),
    unit(4, 'When is the art show?', 0, 0, 'first:第一|second:第二|third:第三|fourth:第四'),
    unit(5, 'Whose dog is it?', 0, 0, 'mine:我的|yours:你的|hers:她的|theirs:他们的'),
    unit(6, 'Work quietly!', 0, 0, 'quietly:安静地|read:阅读|write:写|talk:说话')
  ] }
];

const demoBooks = [
  ['三', '上', 'School things', 'pen:钢笔|pencil:铅笔|book:书|ruler:尺子'],
  ['三', '下', 'My family', 'family:家庭|father:爸爸|mother:妈妈|sister:姐姐；妹妹'],
  ['四', '上', 'My classroom', 'desk:书桌|chair:椅子|window:窗户|door:门'],
  ['四', '下', 'My school', 'school:学校|library:图书馆|classroom:教室|playground:操场'],
  ['六', '上', 'Getting around', 'bus:公交车|train:火车|walk:走路|bike:自行车'],
  ['六', '下', 'My weekend', 'clean:打扫|visit:拜访|watch:观看|wash:洗']
];
for (const [grade, term, title, words] of demoBooks) {
  books.push({ grade, term, name: grade + '年级' + term + '册', units: [unit(1, title, 0, 0, words)] });
}
const grades = ['三', '四', '五', '六'];

const flows = {
  book: ['切换教材', '教材卡右上角沿用「今日」的黄色角标。', [
    '第一步选择年级。点击年级后进入学期选择。',
    '第二步选择上学期（上册）或下学期（下册）。返回可以重选年级。',
    '点击底部的确认按钮后才切换。单元列表、进度、到期词和学习记录跟随教材，本次浏览内保留原教材记录。',
    '三、四、六年级各册用单单元示例，五年级上下册用六单元示例。'
  ]],
  due: ['到期复习', '从绿色提醒卡「去复习」进入。', [
    '先看到今天到期的单元和词数，再决定按单元复习或一次复习全部。',
    '复习完成后扣减待复习词数，全部做完后首页隐藏任务条。'
  ]],
  records: ['学习记录', '从单元标题右侧「学习记录」进入。', [
    '教材名与单元范围在同一行。首次打开显示全书与全部，点击「全书」可展开单元列表。',
    '下一行只显示状态标签。选定单元与状态后，匹配数量只出现在词表标题，按教材顺序展示。',
    '没有匹配的词时显示 0 词和空状态，并保留当前筛选。点击或长按单词可听发音。'
  ]],
  learn: ['学词', '从对应单元的「学词」进入。', [
    '本轮只取所选单元未学词。顶部同时显示当前词序和五步进度。',
    '学：看单词、释义，听标准音。示例词附音标和例句。',
    '读：听标准音后跟读，可录音和回听。练：选中文词义并确认。',
    '拼：听音、点字母拼词。写：根据中文输入英文，写错留在本词重试。',
    '写对后点「下一个词」，下一词从「学」开始。最后一词进入本轮小结，整单元学完后首页显示「已学完」。'
  ]],
  review: ['复习词', '从单元「复习词」或到期列表进入。', [
    '单元按钮只取该单元的待复习词，顶部任务条可复习多个单元的待复习词。每轮固定自己的词表和进度。',
    '复用「学 → 读 → 练 → 拼 → 写」。答错留在本词，写对后点「下一个词」，下一词从「学」开始。',
    '最后一词写对后点「完成复习」，先看本轮小结，再返回发起页。没有待复习词的单元，复习按钮置灰。',
    '单元内的学习与复习会更新教材词记录。今日按计划单独取词和结算任务进度。'
  ]],
  text: ['学课文', '从对应单元的「学课文」进入。', [
    '用标题下的一行选择器切换 A、B、C 或阅读栏目。正文逐句排开，点任意句听读。',
    '显示译文和自动播放直接展开。自动播放开启时会顺序读句子，手点可以立即跳到所选句。',
    '课文原声收在正文下方。五年级上下册可播放人教社配套音频。',
    '五上 Unit 2 的 A、B 对话已收录原文选段。完整原文可贴入下方，按当前单元和栏目逐句点读。'
  ]],
  test: ['检测', '从底部「检测」进入。', [
    '这里演示选择单元、答一道词义题、查看对错和正确答案。'
  ]],
  profile: ['我的', '从底部「我的」进入。', [
    '这里演示当前教材、已学与掌握词数，并提供学习记录入口。'
  ]]
};

const settings = { translations: true, autoPlay: false };
const defaults = { learn: 2, review: 1, text: 2 };
const stage = document.querySelector('#unit-home');
const gallery = document.querySelector('#flow-gallery');
const statusbar = stage.querySelector('.statusbar').outerHTML;
const cover = stage.querySelector('.cover img');
const originalCover = cover.src;
let activeBook = books[0];
let pendingGrade = null;
let pendingTerm = null;
let recordUnit = 0;
let recordStatus = '全部';
let textUnit = 2;
let selectedLine = -1;
let selectedLesson = 'a';
let autoStartedAudio = null;
let autoReadingSentences = false;
let noReviewPreview = new URLSearchParams(location.search).get('review') === 'none';
const importedLessons = new Map();
let testUnit = 2;
let testAnswer = -1;
const practice = {};

const book = () => activeBook;
const getUnit = n => book().units[n - 1];
const dueUnits = () => noReviewPreview ? [] : book().units.filter(u => u.due);
const count = (units, field) => units.reduce((sum, u) => sum + u[field], 0);
const total = units => units.reduce((sum, u) => sum + u.words.length, 0);
const anchor = key => key === 'home' ? 'unit-home' : 'entry-' + key;
const area = key => document.querySelector('#' + anchor(key) + ' .flow-content');
const action = (name, label, classes = '') => `<button type="button" class="flow-button ${classes}" data-action="${name}">${label}</button>`;
const open = (key, label, options = '', classes = '') => `<button type="button" class="flow-button ${classes}" data-open="${key}" ${options}>${label}</button>`;
const bar = (value, max) => `<div class="bar"><i style="width:${value / max * 100}%"></i></div>`;
const unitSelect = (actionName, chosen, all = false) => `<select class="flow-select" data-action="${actionName}" aria-label="选择单元">${all ? '<option value="0">全书</option>' : ''}${book().units.map(u => `<option value="${u.n}" ${chosen === u.n ? 'selected' : ''}>Unit ${u.n} · ${u.title}</option>`).join('')}</select>`;

function renderHome() {
  const { name, units } = book();
  const learned = count(units, 'learned');
  const mastered = count(units, 'mastered');
  const words = total(units);
  const due = dueUnits();
  const lessonGuide = due.length ? null : units.reduce((best, unit) => {
    if (!unit.learned) return best;
    if (!best || unit.learned / unit.words.length > best.learned / best.words.length) return unit;
    return best;
  }, null);
  stage.dataset.guidance = due.length ? 'review' : lessonGuide ? 'lesson' : '';
  cover.src = originalCover.replace(encodeURIComponent(books[0].name), encodeURIComponent(name));
  stage.querySelector('.book h3').textContent = name;
  stage.querySelector('.book .meta').innerHTML = `人教PEP版 · ${units.length} 单元 · 共 <b>${words}</b> 词`;
  stage.querySelector('.sec h3 span').textContent = units.length + ' 个';
  stage.querySelector('.book .bar i').style.width = Math.round(learned / words * 100) + '%';
  stage.querySelector('.book .pct').textContent = `已学 ${learned} / ${words} · 已掌握 ${mastered}`;
  for (const button of stage.querySelectorAll('[data-review-preview]')) {
    const previewsEmpty = button.dataset.reviewPreview === 'none';
    button.setAttribute('aria-pressed', String(previewsEmpty === noReviewPreview));
    if (!previewsEmpty) button.textContent = units.some(unit => unit.due) ? '有到期词' : '当前教材';
  }
  const dueBar = stage.querySelector('.due');
  dueBar.hidden = due.length === 0;
  if (due.length) dueBar.querySelector('.t b').textContent = `今天 ${due.length} 个单元有 ${count(due, 'due')} 词到期`;
  stage.querySelector('#units').innerHTML = units.map(u => {
    const left = u.words.length - u.learned;
    const canReview = !noReviewPreview && u.due > 0;
    const guideLesson = u === lessonGuide;
    const guideArrow = '<span class="guide-arrow" aria-hidden="true">›</span>';
    const pct = Math.round(u.learned / u.words.length * 100);
    const color = left === 0 ? '#1FBFA4' : pct === 0 ? '#E9DED4' : '#FF7A45';
    return `<div class="unit">
      <div class="ring ${left === 0 ? 'full' : ''}" style="--p:${pct};--c:${color}"><span>${pct}%</span></div>
      <div class="u-left">
        <div class="u-top"><div class="u-name"><b>Unit ${u.n}</b><span>${u.title}</span></div></div>
        <div class="u-data"><span>已学 <b>${u.learned}/${u.words.length}</b></span><span class="m">掌握 <b>${u.mastered}</b></span><span class="o">未学 <b>${left}</b></span></div>
      </div>
      <div class="u-acts">
        <button type="button" class="b-learn" data-open="learn" data-unit="${u.n}" ${left ? '' : 'disabled'}>${left ? '学词' : '已学完'}</button>
        <button type="button" class="b-review${canReview ? ' task-guide guide-review' : ''}" data-open="review" data-unit="${u.n}" ${canReview ? '' : 'disabled'}><span>复习词</span>${canReview ? guideArrow : ''}</button>
        <button type="button" class="b-text${guideLesson ? ' task-guide guide-lesson' : ''}" data-open="text" data-unit="${u.n}"><span>学课文</span>${guideLesson ? guideArrow : ''}</button>
      </div>
    </div>`;
  }).join('');
}

function startPractice(key, n, fromDue = false) {
  clearPracticeAudio(practice[key]);
  const unitNumber = n ? (getUnit(n)?.n ?? book().units[0].n) : 0;
  const selectedUnits = unitNumber ? [getUnit(unitNumber)] : dueUnits();
  const entries = selectedUnits.flatMap(unit => {
    const eligible = unit.words.map((word, offset) => ({ unit, word, offset }));
    if (key === 'learn') return eligible.slice(unit.learned);
    return noReviewPreview ? [] : eligible.filter(({ word }) => unit.dueWords.has(word));
  });
  practice[key] = { unitNumber, fromDue, entries, index: 0 };
  resetPracticeStep(practice[key]);
}

function completePracticeWord(key, session) {
  const { unit, word, offset } = session.entries[session.index];
  if (key === 'learn') unit.learned = Math.max(unit.learned, offset + 1);
  if (key === 'review') {
    unit.reviewedWords.add(word);
    unit.dueWords.delete(word);
  }
  session.index++;
  resetPracticeStep(session);
  renderHome();
  for (const view of ['records', 'due', 'profile']) render(view);
}

function renderBookPicker() {
  const grade = pendingGrade;
  const heading = grade ? grade + '年级 · 选择学期' : '选择年级';
  const intro = `<div class="flow-page-heading"><div class="flow-eyebrow">第 ${grade ? '2' : '1'} 步 / 共 2 步</div>
    <h4>${heading}</h4><p class="flow-caption">人教 PEP 版 · ${grade ? '选中后确认切换' : '选中后进入学期选择'}</p></div>`;
  if (!grade) {
    return intro + `<div class="flow-choice">${grades.map(value => `<button type="button" class="flow-option flow-grade-choice ${value === book().grade ? 'selected' : ''}" data-action="choose-grade" data-grade="${value}">
      <span>${value}年级</span><small>${value === book().grade ? '当前年级　' : ''}›</small></button>`).join('')}</div>`;
  }
  return intro + `<fieldset class="flow-choice" aria-label="选择学期">
    ${['上', '下'].map(term => `<label class="flow-option flow-term-choice ${pendingTerm === term ? 'selected' : ''}">
      <span>${term}学期 · ${term}册${book().grade === grade && book().term === term ? ' <small>当前教材</small>' : ''}</span>
      <input type="radio" name="book-term" data-action="choose-term" value="${term}" ${pendingTerm === term ? 'checked' : ''}>
    </label>`).join('')}</fieldset>
    <div class="flow-footer"><p class="flow-caption">原教材的学习记录会保留</p>
      <button type="button" class="flow-button primary" data-action="apply-book" ${pendingTerm ? '' : 'disabled'}>${pendingTerm ? '切换到' + grade + '年级' + pendingTerm + '册' : '请选择学期'}</button></div>`;
}

function renderRecords() {
  const units = recordUnit ? [getUnit(recordUnit)] : book().units;
  const words = units.flatMap(u => u.words.map((word, index) => ({
    ...word, status: index < u.mastered ? '已掌握' : u.reviewedWords.has(word) ? '已复习' : index < u.learned ? '已学' : '未学'
  }))).filter(word => recordStatus === '全部' || word.status === recordStatus || (recordStatus === '已学' && word.status !== '未学') || (recordStatus === '已复习' && word.status === '已掌握'));
  const filters = ['全部', '已学', '已复习', '已掌握', '未学'].map(status => `<button type="button" data-action="record-status" data-status="${status}" aria-pressed="${recordStatus === status}">${status}</button>`).join('');
  const range = `<select class="flow-select" data-action="record-unit" aria-label="选择单元"><option value="0">全书</option>${book().units.map(unit =>
    `<option value="${unit.n}" ${recordUnit === unit.n ? 'selected' : ''}>Unit ${unit.n}</option>`).join('')}</select>`;
  return `<div class="record-head"><div><h4>${book().name}</h4><p>人教 PEP 版</p></div>${range}</div>
    <div class="record-filters" aria-label="学习状态">${filters}</div>
    <div class="flow-panel record-results"><h4 aria-live="polite"><span>${recordUnit ? 'Unit ' + recordUnit : '全书'} · ${recordStatus} · ${words.length} 词</span><small>按单元顺序</small></h4>
    ${words.length ? `<div class="flow-list"><ul class="flow-words">${words.map(word => `<li><button type="button" class="flow-sound" data-action="say-word"><b>${word.en}</b><span>${word.cn}</span><em class="${word.status === '未学' ? 'unlearned' : ''}">${word.status}</em></button></li>`).join('')}</ul></div>` : '<div class="record-empty"><b>暂无匹配单词</b>可以换个状态或单元再看</div>'}</div>
    <div class="flow-feedback" aria-live="polite"></div>`;
}

const lessonId = () => `${book().name}/${textUnit}/${selectedLesson}`;
const textHtml = value => value.replace(/[&<>]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[char]);

function currentLessonLines() {
  const imported = importedLessons.get(lessonId());
  if (imported) return imported;
  const { grade, term } = book();
  return grade === '五' && term === '上' && textUnit === 2 ? pepLessonExcerpts[selectedLesson] ?? [] : [];
}

function renderText() {
  const u = getUnit(textUnit);
  const { grade, term } = book();
  const tracks = grade === '五' ? pepLessonAudio[term][u.n] : null;
  const lines = currentLessonLines();
  const settingsRow = (label, command, checked) => `<label class="reading-setting"><span>${label}</span><span class="reading-switch">
    <input type="checkbox" role="switch" data-action="${command}" ${checked ? 'checked' : ''}><span aria-hidden="true"></span></span></label>`;
  const options = pepLessonParts.filter(({ key }) => tracks?.[key]).map(({ key, part, title, optional }) =>
    `<option value="${key}" ${key === selectedLesson ? 'selected' : ''}>${part} · ${title}${optional ? '（选学）' : ''}</option>`).join('');
  const rows = lines.map(([en, cn], i) =>
    `<button type="button" class="flow-line" data-action="say-line" data-line="${i}" aria-pressed="${i === selectedLine}">
      <span class="line-count" aria-hidden="true">${i + 1}</span><div><b>${textHtml(en)}</b>
      ${cn ? `<span class="line-translation" ${settings.translations ? '' : 'hidden'}>${textHtml(cn)}</span>` : ''}</div>
      <span class="line-play" aria-hidden="true">▶</span></button>`).join('');
  return `<div class="lesson-heading"><div class="flow-eyebrow">${book().name} · Unit ${u.n}</div><h4>${u.title}</h4>
    ${options ? `<select class="flow-select lesson-picker" data-action="choose-lesson" aria-label="课文栏目">${options}</select>` : ''}</div>
    <div class="flow-panel reading-settings">
      ${settingsRow('显示译文', 'translations', settings.translations)}
      ${settingsRow('自动播放', 'autoplay', settings.autoPlay)}
    </div>
    <div class="flow-panel lesson-transcript">
      ${lines.length ? `<p class="flow-caption">${importedLessons.has(lessonId()) ? '课文原文' : '原文选段'} · 点句子听读</p>${rows}`
        : '<div class="lesson-empty"><p>等待接入课文原文。</p>' + action('open-lesson-import', '添加课文原文') + '</div>'}
    </div>
    <div class="flow-feedback" aria-live="polite"></div>
    ${tracks ? `<details class="lesson-audio"><summary>整段课文原声</summary>
      <audio controls controlslist="nodownload noplaybackrate noremoteplayback" preload="none" src="${tracks[selectedLesson]}"></audio>
      <a class="lesson-source" href="${pepAudioDirectory[term]}" target="_blank" rel="noopener">人教社配套音频 ↗</a></details>` : ''}`;
}

function selectLessonLine(index) {
  selectedLine = index;
  for (const line of area('text').querySelectorAll('[data-line]')) {
    line.setAttribute('aria-pressed', String(Number(line.dataset.line) === index));
  }
}

function stopLessonPlayback() {
  area('text').querySelector('audio')?.pause();
  if (autoReadingSentences && 'speechSynthesis' in window) window.speechSynthesis.cancel();
  autoStartedAudio = null;
  autoReadingSentences = false;
}

function playLessonSentence(index) {
  const lines = currentLessonLines();
  stopLessonPlayback();
  const playlist = settings.autoPlay ? lines.slice(index) : [lines[index]];
  autoReadingSentences = settings.autoPlay;
  selectLessonLine(index);
  speak(playlist.map(([en]) => en), 'text', offset => selectLessonLine(index + offset));
}

function autoplayLesson() {
  if (!settings.autoPlay) return;
  if (currentLessonLines().length) {
    playLessonSentence(0);
    return;
  }
  const audio = area('text').querySelector('audio');
  if (!audio) return;
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  const feedback = area('text').querySelector('.flow-feedback');
  feedback.textContent = '';
  audio.closest('details').open = true;
  autoStartedAudio = audio;
  audio.play().catch(error => {
    if (autoStartedAudio !== audio || error.name === 'AbortError') return;
    autoStartedAudio = null;
    feedback.textContent = '自动播放未启动，请点播放器播放。';
  });
}

const renderers = {
  book: renderBookPicker,
  due: () => {
    const units = dueUnits();
    if (!units.length) return '<div class="flow-panel"><h4>今天没有到期词</h4><p>可以返回单元列表，选一个单元学新词。</p></div>';
    return `<div class="flow-panel"><div class="flow-eyebrow">${book().name}</div><h4>今天有 ${count(units, 'due')} 词到期</h4><p>来自 ${units.length} 个单元</p></div>
      ${units.map(u => `<div class="flow-panel flow-row"><div><b>Unit ${u.n}</b> <small>${u.title} · ${u.due} 词</small></div>${open('review', '开始', `data-unit="${u.n}" data-due`)}</div>`).join('')}
      <div class="flow-actions">${open('review', '复习全部到期词', 'data-unit="0" data-due', 'mint')}</div>`;
  },
  records: renderRecords,
  learn: () => practiceMarkup('learn', practice.learn),
  review: () => practiceMarkup('review', practice.review),
  text: renderText,
  test: () => {
    const u = getUnit(testUnit);
    const options = [u.words[1], u.words[0], u.words[2]];
    return `${unitSelect('test-unit', testUnit)}<div class="flow-panel"><div class="flow-eyebrow">词义检测 · 第 1 题</div><h4>${u.words[0].en}</h4><p>选择正确的中文词义</p></div>
      ${options.map((word, i) => `<button type="button" class="flow-option ${i === testAnswer ? 'selected' : ''}" data-action="answer" data-index="${i}">${word.cn}</button>`).join('')}
      <div class="flow-feedback" aria-live="polite">${testAnswer < 0 ? '' : testAnswer === 1 ? '答对了！' : '正确答案是「' + u.words[0].cn + '」。'}</div>`;
  },
  profile: () => `<div class="flow-panel"><div class="flow-eyebrow">我的教材</div><h4>${book().name} · 人教 PEP</h4><p>已学 ${count(book().units, 'learned')} 词 · 已掌握 ${count(book().units, 'mastered')} 词</p></div>
    <div class="flow-actions">${open('records', '查看学习记录', '', 'primary')}</div>`
};

function render(key) {
  const content = area(key);
  content.innerHTML = renderers[key]();
  const session = practice[key];
  const input = content.querySelector('.practice-input');
  if (input) input.value = session.answer;
  const nav = content.closest('.flow-inner').querySelector('.flow-nav');
  if (key === 'book') {
    nav.querySelector('a').hidden = Boolean(pendingGrade);
    nav.querySelector('[data-action="back-to-grade"]').hidden = !pendingGrade;
  }
  if (key === 'review') {
    const back = nav.querySelector('a');
    back.dataset.open = session.fromDue ? 'due' : 'home';
    back.href = '#' + anchor(back.dataset.open);
    back.querySelector('span').textContent = session.fromDue ? '返回到期复习' : '返回单元学';
  }
}

function show(key) {
  const target = document.getElementById(anchor(key));
  if (!target) return;
  if (location.hash !== '#' + target.id) history.pushState(null, '', '#' + target.id);
  target.scrollIntoView({ block: 'start' });
  const heading = target.querySelector('h2, h3');
  heading?.setAttribute('tabindex', '-1');
  heading?.focus({ preventScroll: true });
}

function renderGallery() {
  gallery.innerHTML = `<header class="gallery-heading"><h2>点击后的页面</h2><p>每组左侧是可操作的手机图，右侧是入口和状态说明。也可以从上方手机直接点进来。词数和练习内容为演示数据。</p></header>`
    + Object.entries(flows).map(([key, [title, caption, notes]], index) => {
      const back = `<a href="#unit-home" data-open="home"><span>返回单元学</span></a>`;
      const previous = key === 'book' ? '<button type="button" data-action="back-to-grade" aria-label="返回年级选择" hidden>‹</button>' : '';
      const phone = `<div class="phone"><div class="screen">${statusbar}<div class="flow-inner"><header class="flow-nav">${back}${previous}<h3>${title}</h3></header><div class="flow-stack flow-content"></div></div></div></div>`;
      const importer = key === 'text' ? `<details class="lesson-import"><summary>导入课文原文</summary>
        <form data-lesson-import><label for="lesson-text">每行一句。可用「｜」隔开英文与译文。</label>
          <textarea id="lesson-text" name="lesson" maxlength="50000" required></textarea>
          <button type="submit" class="flow-button">用于当前课文</button>
          <p class="lesson-import-feedback" aria-live="polite"></p>
        </form></details>` : '';
      return `<section id="${anchor(key)}" class="stage flow-stage" aria-labelledby="flow-title-${key}">${phone}
        <aside class="note"><span class="tag">${String(index + 1).padStart(2, '0')} · 入口演示</span><h2 id="flow-title-${key}">${title}</h2>
          <p class="sub">${caption}</p><h3>操作与状态</h3><ol>${notes.map(note => '<li>' + note + '</li>').join('')}</ol>${importer}
          <a href="#unit-home" class="flow-home" data-open="home">↑ 返回单元学首页</a></aside></section>`;
    }).join('');
  document.querySelector('#flow-index').innerHTML = Object.entries(flows).map(([key, [title]]) =>
    `<a href="#${anchor(key)}" data-open="${key}">${title}</a>`).join('');
}

function resetBookViews() {
  stopLessonPlayback();
  recordUnit = 0;
  recordStatus = '全部';
  textUnit = getUnit(defaults.text)?.n ?? book().units[0].n;
  selectedLine = -1;
  selectedLesson = 'a';
  testUnit = textUnit;
  testAnswer = -1;
  startPractice('learn', defaults.learn);
  startPractice('review', defaults.review);
  renderHome();
  for (const key of Object.keys(renderers)) render(key);
}

function openFlow(button) {
  const key = button.dataset.open;
  stopLessonPlayback();
  for (const mode of ['learn', 'review']) {
    const session = practice[mode];
    if (session.recording || session.audioRequest || session.audioUrl) {
      clearPracticeAudio(session);
      render(mode);
    }
  }
  if (key === 'book') {
    pendingGrade = null;
    pendingTerm = null;
    render(key);
  }
  if (key === 'learn' || key === 'review') {
    startPractice(key, Number(button.dataset.unit ?? defaults[key]), button.hasAttribute('data-due'));
    render(key);
  }
  if (key === 'text') {
    textUnit = getUnit(Number(button.dataset.unit ?? defaults.text))?.n ?? book().units[0].n;
    selectedLine = -1;
    selectedLesson = 'a';
    render(key);
  }
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  show(key);
  if (key === 'text') autoplayLesson();
}

function speak(lines, key, onLineStart) {
  const feedback = area(key).querySelector('.flow-feedback');
  if (!('speechSynthesis' in window)) {
    feedback.textContent = '当前浏览器不支持语音播放。';
    return;
  }
  window.speechSynthesis.cancel();
  lines.forEach((line, index) => {
    const audio = new SpeechSynthesisUtterance(line);
    audio.lang = 'en-US';
    audio.rate = .85;
    if (onLineStart) {
      audio.onstart = () => {
        if (feedback.isConnected) onLineStart(index);
      };
    }
    if (index === lines.length - 1) audio.onend = () => { feedback.textContent = '播放完成'; };
    audio.onerror = event => {
      if (event.error !== 'canceled' && event.error !== 'interrupted') feedback.textContent = '当前设备无法播放英文语音。';
    };
    window.speechSynthesis.speak(audio);
  });
  feedback.textContent = '正在播放…';
}

stage.addEventListener('click', event => {
  const button = event.target.closest('[data-review-preview]');
  if (!button) return;
  noReviewPreview = button.dataset.reviewPreview === 'none';
  const url = new URL(location.href);
  if (noReviewPreview) url.searchParams.set('review', 'none');
  else url.searchParams.delete('review');
  history.replaceState(null, '', url);
  renderHome();
  startPractice('review', defaults.review);
  render('review');
  render('due');
});

document.addEventListener('click', event => {
  const trigger = event.target.closest('[data-open]');
  if (!trigger) return;
  if (trigger instanceof HTMLAnchorElement && (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) return;
  event.preventDefault();
  openFlow(trigger);
});

gallery.addEventListener('change', event => {
  const { action: command } = event.target.dataset;
  const value = event.target.value;
  if (command === 'choose-term') {
    pendingTerm = value;
    for (const option of area('book').querySelectorAll('input[type="radio"]')) {
      option.closest('label').classList.toggle('selected', option.checked);
    }
    const apply = area('book').querySelector('[data-action="apply-book"]');
    apply.disabled = false;
    apply.textContent = '切换到' + pendingGrade + '年级' + pendingTerm + '册';
  } else if (command === 'record-unit') {
    recordUnit = Number(value);
    render('records');
    area('records').querySelector('[data-action="record-unit"]').focus();
  } else if (command === 'test-unit') {
    testUnit = Number(value);
    testAnswer = -1;
    render('test');
    area('test').querySelector('[data-action="test-unit"]').focus();
  } else if (command === 'choose-lesson') {
    stopLessonPlayback();
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    selectedLesson = value;
    selectedLine = -1;
    render('text');
    area('text').querySelector('.lesson-picker').focus({ preventScroll: true });
    autoplayLesson();
  } else if (command === 'autoplay') {
    settings.autoPlay = event.target.checked;
    if (settings.autoPlay) autoplayLesson();
    else {
      autoStartedAudio?.pause();
      if (autoReadingSentences && 'speechSynthesis' in window) window.speechSynthesis.cancel();
      autoStartedAudio = null;
      autoReadingSentences = false;
      area('text').querySelector('.flow-feedback').textContent = '';
    }
  } else if (command === 'translations') {
    settings.translations = event.target.checked;
    for (const translation of area('text').querySelectorAll('.line-translation')) {
      translation.hidden = !settings.translations;
    }
  }
});

gallery.addEventListener('click', event => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const command = button.dataset.action;
  const key = button.closest('.flow-stage').id.slice('entry-'.length);
  const session = practice[key];
  if (command === 'choose-grade') {
    pendingGrade = button.dataset.grade;
    pendingTerm = null;
    render(key);
    area(key).querySelector('input').focus({ preventScroll: true });
  } else if (command === 'back-to-grade') {
    const previousGrade = pendingGrade;
    pendingGrade = null;
    pendingTerm = null;
    render(key);
    area(key).querySelector('[data-grade="' + previousGrade + '"]').focus({ preventScroll: true });
  } else if (command === 'apply-book') {
    const selectedBook = books.find(item => item.grade === pendingGrade && item.term === pendingTerm);
    if (!selectedBook) return;
    activeBook = selectedBook;
    pendingGrade = null;
    pendingTerm = null;
    resetBookViews();
    show('home');
  } else if (command === 'record-status') {
    recordStatus = button.dataset.status;
    render(key);
    area(key).querySelector('[aria-pressed="true"]').focus();
  } else if (command === 'say-word') {
    speak([button.querySelector('b').textContent], key);
  } else if (command === 'say-card') {
    speak([session.entries[session.index].word.en], key);
  } else if (command === 'record-voice') {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    togglePracticeRecording(session, () => render(key));
  } else if (command === 'play-voice') {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    new Audio(session.audioUrl).play().catch(() => {
      session.feedback = '无法播放本次录音，可以重新录音。';
      render(key);
    });
  } else if (command === 'advance-step') {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    resetPracticeStep(session, session.step + 1);
    render(key);
    area(key).querySelector('.practice-input, .practice-steps [aria-current]')?.focus({ preventScroll: true });
  } else if (command === 'choose-meaning') {
    session.selected = Number(button.dataset.index);
    render(key);
    area(key).querySelector('[data-action="choose-meaning"][aria-pressed="true"]').focus({ preventScroll: true });
  } else if (command === 'add-letter' || command === 'remove-letter') {
    const index = Number(button.dataset.index);
    if (command === 'add-letter') session.used.push(index);
    else session.used.splice(index, 1);
    render(key);
    const letters = area(key).querySelectorAll('[data-action="add-letter"]:not(:disabled)');
    (letters[0] ?? area(key).querySelector('[data-action="check-step"]'))?.focus({ preventScroll: true });
  } else if (command === 'check-step') {
    checkPractice(session);
    render(key);
    area(key).querySelector('.flow-footer button').focus({ preventScroll: true });
  } else if (command === 'complete-word') {
    completePracticeWord(key, session);
    render(key);
    area(key).querySelector('.flow-footer button').focus({ preventScroll: true });
  } else if (command === 'open-lesson-import') {
    const importer = document.querySelector('#entry-text .lesson-import');
    importer.open = true;
    importer.querySelector('textarea').focus();
  } else if (command === 'say-line') {
    playLessonSentence(Number(button.dataset.line));
  } else if (command === 'answer') {
    testAnswer = Number(button.dataset.index);
    render(key);
    area(key).querySelector('[data-index="' + testAnswer + '"]').focus();
  }
});

gallery.addEventListener('submit', event => {
  if (event.target.hasAttribute('data-lesson-import')) {
    event.preventDefault();
    const lines = new FormData(event.target).get('lesson').split(/\r?\n/).flatMap(line => {
      const [en, cn = ''] = line.split(/[｜|\t]/, 2).map(value => value.trim());
      if (!en) return [];
      if (cn || !('Segmenter' in Intl)) return [[en, cn]];
      const segments = new Intl.Segmenter('en', { granularity: 'sentence' }).segment(en);
      return [...segments].map(({ segment }) => [segment.trim(), '']).filter(([text]) => text);
    });
    const feedback = event.target.querySelector('.lesson-import-feedback');
    if (!lines.length) {
      feedback.textContent = '请先填入英文课文。';
      return;
    }
    stopLessonPlayback();
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    importedLessons.set(lessonId(), lines);
    selectedLine = -1;
    render('text');
    feedback.textContent = `Unit ${textUnit} 已加载 ${lines.length} 句，本次浏览内有效。`;
    autoplayLesson();
    return;
  }
  const key = event.target.dataset.write;
  if (!key) return;
  event.preventDefault();
  const session = practice[key];
  if (session.passed) return;
  session.answer = new FormData(event.target).get('answer');
  checkPractice(session);
  render(key);
  area(key).querySelector(session.passed ? '[data-action="complete-word"]' : '.practice-input').focus({ preventScroll: true });
});

let heldWord;
let holdTimer;
gallery.addEventListener('pointerdown', event => {
  const button = event.target.closest('.flow-sound');
  if (!button || event.button !== 0) return;
  clearTimeout(holdTimer);
  heldWord = null;
  holdTimer = setTimeout(() => {
    heldWord = button;
    speak([button.querySelector('b').textContent], 'records');
  }, 520);
});
for (const name of ['pointerup', 'pointercancel', 'pointerleave']) {
  gallery.addEventListener(name, () => clearTimeout(holdTimer), true);
}
gallery.addEventListener('contextmenu', event => {
  if (event.target.closest('.flow-sound')) event.preventDefault();
});
gallery.addEventListener('click', event => {
  if (heldWord && event.target.closest('.flow-sound') === heldWord) {
    heldWord = null;
    event.stopImmediatePropagation();
  }
}, true);

gallery.addEventListener('play', event => {
  if (event.target.tagName !== 'AUDIO') return;
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  autoReadingSentences = false;
  selectLessonLine(-1);
  area('text').querySelector('.flow-feedback').textContent = '';
}, true);

window.addEventListener('popstate', () => {
  if (location.hash !== '#entry-text') {
    stopLessonPlayback();
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }
});
window.addEventListener('pagehide', stopLessonPlayback);

renderGallery();
resetBookViews();
if (location.hash && document.getElementById(location.hash.slice(1))) {
  requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView());
}
