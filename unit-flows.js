function unit(n, title, learned, mastered, vocabulary, lines, due = 0, reviewed = mastered) {
  const words = vocabulary.split('|').map(pair => {
    const [en, cn] = pair.split(':');
    return { en, cn };
  });
  return { n, title, learned, mastered, reviewed, due, words, lines: lines.split('|').map(line => line.split(':')) };
}

const books = [
  { name: '五年级上册', units: [
    unit(1, "What's he like?", 12, 8, 'old:年老的|young:年轻的|funny:滑稽的|kind:和蔼的|strict:严格的|polite:有礼貌的|shy:害羞的|helpful:有帮助的|clever:聪明的|hard-working:勤奋的|quiet:安静的|friendly:友好的', "Who is your art teacher?:谁是你的美术老师？|Mr Lee is my art teacher.:李老师是我的美术老师。|He is kind and funny.:他很和蔼，也很有趣。", 4, 10),
    unit(2, 'My week', 14, 6, 'Monday:星期一|Tuesday:星期二|Wednesday:星期三|Thursday:星期四|Friday:星期五|Saturday:星期六|Sunday:星期日|weekend:周末|wash:洗|watch:观看|play:玩|read:阅读|homework:家庭作业|often:经常|sometimes:有时|usually:通常|every:每个|after:在……之后|class:课', 'What do you do on Saturdays?:你星期六做什么？|I often read books in the morning.:我经常在上午看书。|Sometimes I play football with my friends.:我有时和朋友们踢足球。', 5, 9),
    unit(3, 'What would you like?', 12, 4, 'sandwich:三明治|salad:沙拉|hamburger:汉堡包|ice cream:冰激凌|tea:茶|fresh:新鲜的|healthy:健康的|delicious:美味的|hot:辣的|sweet:甜的|food:食物|drink:饮料|water:水|milk:牛奶|juice:果汁|rice:米饭|bread:面包|chicken:鸡肉|fish:鱼|fruit:水果|favourite:最喜欢的', 'What would you like for lunch?:午饭你想吃什么？|I would like a sandwich and some salad.:我想吃一个三明治和一些沙拉。|The salad is fresh.:沙拉很新鲜。', 3, 7),
    unit(4, 'What can you do?', 8, 0, 'sing:唱歌|song:歌曲|dance:跳舞|draw:画|cartoon:漫画|swim:游泳|cook:烹饪|basketball:篮球|football:足球|pipa:琵琶|kung fu:功夫|speak:说|English:英语|Chinese:中文|learn:学习|practice:练习|run:跑|jump:跳', 'What can you do at the party?:你能在聚会上表演什么？|I can dance and sing.:我会跳舞，也会唱歌。|My friend can play the pipa.:我的朋友会弹琵琶。', 0, 4),
    unit(5, 'There is a big bed', 4, 0, 'clock:时钟|plant:植物|bottle:瓶子|bike:自行车|photo:照片|front:前面|behind:在……后面|beside:在……旁边|between:在……之间|above:在……上面|room:房间|bed:床|desk:书桌|chair:椅子|window:窗户|door:门|wall:墙|floor:地板|computer:电脑|lamp:台灯|box:盒子|under:在……下面|near:在……附近|clean:干净的', 'There is a big bed in my room.:我的房间里有一张大床。|A photo is above the bed.:床的上方有一张照片。|The plant is beside the desk.:植物在书桌旁边。', 0, 2),
    unit(6, 'In a nature park', 0, 0, 'forest:森林|river:河流|lake:湖泊|mountain:山|hill:小山|tree:树|bridge:桥|building:建筑物|village:村庄|house:房屋|park:公园|nature:自然|flower:花|grass:草|bird:鸟|cloud:云|boat:小船|path:小路|duck:鸭子|rabbit:兔子|sky:天空|quiet:安静的|beautiful:美丽的|beside:在……旁边', 'Is there a lake in the park?:公园里有湖吗？|Yes, there is a lake near the forest.:有，森林附近有一个湖。|Look! There are ducks on the lake.:看！湖上有鸭子。')
  ] },
  { name: '五年级下册', units: [
    unit(1, 'My day', 0, 0, 'breakfast:早餐|morning:早晨|exercise:锻炼|dinner:晚餐', 'I get up at seven.:我七点起床。|I eat breakfast at home.:我在家吃早餐。'),
    unit(2, 'My favourite season', 0, 0, 'spring:春天|summer:夏天|autumn:秋天|winter:冬天', 'Which season do you like best?:你最喜欢哪个季节？|I like spring best.:我最喜欢春天。'),
    unit(3, 'My school calendar', 0, 0, 'March:三月|April:四月|May:五月|June:六月', 'When is the school trip?:学校旅行是什么时候？|It is in May.:是在五月。'),
    unit(4, 'When is the art show?', 0, 0, 'first:第一|second:第二|third:第三|fourth:第四', 'The art show is on May first.:美术展在五月一日。|We can see many pictures there.:我们可以在那里看到许多图画。'),
    unit(5, 'Whose dog is it?', 0, 0, 'mine:我的|yours:你的|hers:她的|theirs:他们的', 'Whose dog is it?:这是谁的狗？|The small dog is mine.:这只小狗是我的。'),
    unit(6, 'Work quietly!', 0, 0, 'quietly:安静地|read:阅读|write:写|talk:说话', 'Please talk quietly in the library.:请在图书馆里轻声说话。|We are reading books here.:我们在这里看书。')
  ] }
];

const flows = {
  book: ['切换教材', '从顶部「切换教材」进入。', [
    '先选上册或下册，再点「使用这本教材」。',
    '确认后回到单元列表，教材、单元、到期词和学习记录一起切换。原型中的下册使用样例词。'
  ]],
  settings: ['学习设置', '从顶部齿轮进入。', [
    '设置单词点读的重复次数，可选 1 次或 2 次。',
    '关闭「显示课文译文」后，学课文页默认只显示英文。设置在本次浏览中生效。'
  ]],
  due: ['到期复习', '从绿色提醒卡「去复习」进入。', [
    '先看到今天到期的单元和词数，再决定按单元复习或一次复习全部。',
    '到期入口只抽取到期词。没有到期词时显示空状态。'
  ]],
  records: ['学习记录', '从单元标题右侧「学习记录」进入。', [
    '可组合选择学习状态与教材单元。匹配词数统一显示在词表上方。',
    '点击或长按单词可听发音。没有匹配的词时，保留筛选条件并显示空状态。'
  ]],
  learn: ['学词', '从对应单元的「学词」进入。', [
    '只练本单元未学的词。先看英文，可揭晓释义、听发音，然后进入下一词。',
    '最后一词完成后显示本轮小结。整单元已学完时，首页显示置灰的「已学完」。'
  ]],
  review: ['复习词', '从单元「复习词」或到期列表进入。', [
    '单元入口练已学词，到期入口只练本轮到期词。',
    '先回想词义，再看释义并选「记得」或「再练」。末尾显示本轮结果。没有已学词的单元无法开始。'
  ]],
  text: ['学课文', '从对应单元的「学课文」进入。', [
    '点任意句听读，也可以从第一句连续播放。',
    '译文可在本页展开或收起。手机图使用为原型编写的主题例句。'
  ]],
  test: ['检测', '从底部「检测」进入。', [
    '这里演示选择单元、答一道词义题、查看对错和正确答案。'
  ]],
  profile: ['我的', '从底部「我的」进入。', [
    '这里演示当前教材、已学与掌握词数，并提供学习记录和学习设置入口。'
  ]]
};

const settings = { repeats: 1, translations: true };
const defaults = { learn: 2, review: 1, text: 2 };
const stage = document.querySelector('#unit-home');
const gallery = document.querySelector('#flow-gallery');
const statusbar = stage.querySelector('.statusbar').outerHTML;
const cover = stage.querySelector('.cover img');
const originalCover = cover.src;
let activeBook = 0;
let pendingBook = 0;
let recordUnit = 0;
let recordStatus = '全部';
let textUnit = 2;
let selectedLine = -1;
let testUnit = 2;
let testAnswer = -1;
const practice = {};

const book = () => books[activeBook];
const getUnit = n => book().units[n - 1];
const dueUnits = () => book().units.filter(u => u.due);
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
  cover.src = originalCover.replace(encodeURIComponent(books[0].name), encodeURIComponent(name));
  stage.querySelector('.book h3').textContent = name;
  stage.querySelector('.book .meta b').textContent = words;
  stage.querySelector('.book .bar i').style.width = Math.round(learned / words * 100) + '%';
  stage.querySelector('.book .pct').textContent = `已学 ${learned} / ${words} · 已掌握 ${mastered}`;
  stage.querySelector('.due .t b').textContent = due.length ? `今天 ${due.length} 个单元有 ${count(due, 'due')} 词到期` : '今天没有到期词';
  stage.querySelector('.due .t span').textContent = due.length ? '先复习再学新词，记得更牢' : '可以选一个单元开始学词';
  stage.querySelector('.due .go').textContent = due.length ? '去复习' : '查看';
  stage.querySelector('#units').innerHTML = units.map(u => {
    const left = u.words.length - u.learned;
    const pct = Math.round(u.learned / u.words.length * 100);
    const color = left === 0 ? '#1FBFA4' : pct === 0 ? '#E9DED4' : '#FF7A45';
    return `<div class="unit">
      <div class="ring ${left === 0 ? 'full' : ''}" style="--p:${pct};--c:${color}"><span>${pct}%</span></div>
      <div class="u-left">
        <div class="u-top"><div class="u-name"><b>Unit ${u.n}</b><span>${u.title}</span></div></div>
        <div class="u-data"><span>已学 <b>${u.learned}/${u.words.length}</b></span><span class="m">掌握 <b>${u.mastered}</b></span><span class="o">未学 <b>${left}</b></span></div>
      </div>
      <div class="u-acts">
        <button type="button" class="b-learn ${left ? '' : 'off'}" data-open="learn" data-unit="${u.n}" ${left ? '' : 'disabled'}>${left ? '学词' : '已学完'}</button>
        <button type="button" class="b-review ${u.learned ? (left ? '' : 'main') : 'off'}" data-open="review" data-unit="${u.n}" ${u.learned ? '' : 'disabled'}>复习词</button>
        <button type="button" class="b-text" data-open="text" data-unit="${u.n}">学课文</button>
      </div>
    </div>`;
  }).join('');
}

function startPractice(key, n, due = false) {
  const selectedUnits = n ? [getUnit(n)] : dueUnits();
  const words = selectedUnits.flatMap(u => key === 'learn'
    ? u.words.slice(u.learned)
    : u.words.slice(0, due ? u.due : u.learned));
  practice[key] = { n, due, words, index: 0, revealed: false, remembered: 0 };
}

function renderPractice(key) {
  const session = practice[key];
  const { n, due, words, index, revealed, remembered } = session;
  const label = n ? `Unit ${n} · ${getUnit(n).title}` : '全部到期词';
  const word = words[index];
  const summary = key === 'learn' ? `本轮浏览了 ${words.length} 个新词。` : `记得 ${remembered} 词 · 再练 ${words.length - remembered} 词`;
  const back = due ? 'due' : 'home';
  if (!word) {
    return `<div class="flow-panel"><div class="flow-eyebrow">${label}</div><h4>${words.length ? '本轮完成' : '本轮没有单词'}</h4><p>${words.length ? summary : '可以返回单元列表选择其他入口。'}</p></div>
      <div class="flow-actions">${words.length ? action('restart', '再演示一次') : ''}${open(back, due ? '返回到期列表' : '返回单元列表', '', 'primary')}</div>`;
  }
  return `<div class="flow-progress"><span>${label}</span><span>${index + 1} / ${words.length}</span></div>
    ${bar(index + 1, words.length)}
    <div class="flow-panel flow-word-card">
      <div class="flow-eyebrow">${key === 'learn' ? '新词卡片' : due ? '到期词 · 先回想词义' : '已学词 · 先回想词义'}</div>
      <div class="flow-word">${word.en}</div>
      <div class="flow-meaning">${revealed ? word.cn : '释义已隐藏'}</div>
      <div class="flow-actions">${action('say-card', '听发音')}${key === 'learn' ? action('reveal', revealed ? '收起释义' : '看释义') : ''}</div>
    </div>
    <div class="flow-actions">${key === 'learn' ? action('next', index + 1 === words.length ? '完成本轮' : '下一词', 'primary')
      : revealed ? action('remember', '记得', 'mint') + action('again', '再练') : action('reveal', '看释义', 'primary')}</div>
    <div class="flow-feedback" aria-live="polite"></div>`;
}

function renderRecords() {
  const units = recordUnit ? [getUnit(recordUnit)] : book().units;
  const words = units.flatMap(u => u.words.map((word, index) => ({
    ...word, status: index < u.mastered ? '已掌握' : index < u.reviewed ? '已复习' : index < u.learned ? '已学' : '未学'
  }))).filter(word => recordStatus === '全部' || word.status === recordStatus || (recordStatus === '已学' && word.status !== '未学') || (recordStatus === '已复习' && word.status === '已掌握'));
  const filters = ['全部', '已学', '已复习', '已掌握', '未学'].map(status => `<button type="button" class="flow-button" data-action="record-status" data-status="${status}" aria-pressed="${recordStatus === status}">${status}</button>`).join('');
  return `<div class="flow-panel"><h4>${book().name}</h4><p>选择学习状态和单元</p></div>
    <div class="flow-actions">${filters}</div>${unitSelect('record-unit', recordUnit, true)}
    <div class="flow-panel"><h4 aria-live="polite">${recordUnit ? 'Unit ' + recordUnit : '全书'} · ${recordStatus} · ${words.length} 词</h4>
    ${words.length ? `<div class="flow-list"><ul class="flow-words">${words.map(word => `<li><button type="button" class="flow-sound" data-action="say-word"><b>${word.en}</b><span>${word.cn}</span><em>${word.status}</em></button></li>`).join('')}</ul></div>` : '<p>这个范围暂无符合条件的单词。</p>'}</div>
    <div class="flow-feedback" aria-live="polite"></div>`;
}

const renderers = {
  book: () => `<div class="flow-panel"><h4>人教 PEP 版</h4><p>五年级英语</p></div>
    <fieldset class="flow-choice"><legend>选择学期</legend>${books.map((item, i) => `<label class="flow-option ${pendingBook === i ? 'selected' : ''}"><span>${item.name} <small>${i === activeBook ? '当前教材' : '示例教材'}</small></span><input type="radio" name="book" data-action="choose-book" value="${i}" ${pendingBook === i ? 'checked' : ''}></label>`).join('')}</fieldset>
    <div class="flow-actions">${action('apply-book', '使用这本教材', 'primary')}</div>`,
  settings: () => `<div class="flow-panel"><h4>单词发音</h4><label class="flow-row"><span>每次点读</span><select class="flow-select" data-action="repeats"><option value="1" ${settings.repeats === 1 ? 'selected' : ''}>播放 1 次</option><option value="2" ${settings.repeats === 2 ? 'selected' : ''}>播放 2 次</option></select></label></div>
    <div class="flow-panel"><h4>学课文</h4><label class="flow-row"><span>显示课文译文</span><input type="checkbox" data-action="translations" ${settings.translations ? 'checked' : ''}></label></div>
    <p class="flow-caption">修改后立即生效。</p>`,
  due: () => {
    const units = dueUnits();
    if (!units.length) return '<div class="flow-panel"><h4>今天没有到期词</h4><p>可以返回单元列表，选一个单元学新词。</p></div>';
    return `<div class="flow-panel"><div class="flow-eyebrow">${book().name}</div><h4>今天有 ${count(units, 'due')} 词到期</h4><p>来自 ${units.length} 个单元</p></div>
      ${units.map(u => `<div class="flow-panel flow-row"><div><b>Unit ${u.n}</b> <small>${u.title} · ${u.due} 词</small></div>${open('review', '开始', `data-unit="${u.n}" data-due`)}</div>`).join('')}
      <div class="flow-actions">${open('review', '复习全部到期词', 'data-unit="0" data-due', 'mint')}</div>`;
  },
  records: renderRecords,
  learn: () => renderPractice('learn'),
  review: () => renderPractice('review'),
  text: () => {
    const u = getUnit(textUnit);
    return `<div class="flow-panel"><div class="flow-eyebrow">Unit ${u.n} · 听读示例</div><h4>${u.title}</h4><p>点句子听英文</p></div>
      ${u.lines.map(([en, cn], i) => `<button type="button" class="flow-line" data-action="say-line" data-line="${i}" aria-pressed="${i === selectedLine}">${i + 1}. <b>${en}</b>${settings.translations ? `<span>${cn}</span>` : ''}</button>`).join('')}
      <div class="flow-actions">${action('say-all', '从头播放', 'mint')}${action('toggle-translation', settings.translations ? '收起译文' : '显示译文')}</div>
      <div class="flow-feedback" aria-live="polite"></div>`;
  },
  test: () => {
    const u = getUnit(testUnit);
    const options = [u.words[1], u.words[0], u.words[2]];
    return `${unitSelect('test-unit', testUnit)}<div class="flow-panel"><div class="flow-eyebrow">词义检测 · 第 1 题</div><h4>${u.words[0].en}</h4><p>选择正确的中文词义</p></div>
      ${options.map((word, i) => `<button type="button" class="flow-option ${i === testAnswer ? 'selected' : ''}" data-action="answer" data-index="${i}">${word.cn}</button>`).join('')}
      <div class="flow-feedback" aria-live="polite">${testAnswer < 0 ? '' : testAnswer === 1 ? '答对了！' : '正确答案是「' + u.words[0].cn + '」。'}</div>`;
  },
  profile: () => `<div class="flow-panel"><div class="flow-eyebrow">我的教材</div><h4>${book().name} · 人教 PEP</h4><p>已学 ${count(book().units, 'learned')} 词 · 已掌握 ${count(book().units, 'mastered')} 词</p></div>
    <div class="flow-actions">${open('records', '查看学习记录', '', 'primary')}${open('settings', '学习设置')}</div>`
};

function render(key) {
  area(key).innerHTML = renderers[key]();
  if (key === 'review') {
    const back = document.querySelector('#entry-review .flow-nav a');
    back.dataset.open = practice.review.due ? 'due' : 'home';
    back.href = '#' + anchor(back.dataset.open);
    back.textContent = practice.review.due ? '‹ 到期复习' : '‹ 单元学';
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
      const back = `<a href="#unit-home" data-open="home">‹ 单元学</a>`;
      const phone = `<div class="phone"><div class="screen">${statusbar}<div class="flow-inner"><header class="flow-nav">${back}<h3>${title}</h3></header><div class="flow-stack flow-content"></div></div></div></div>`;
      return `<section id="${anchor(key)}" class="stage flow-stage" aria-labelledby="flow-title-${key}">${phone}
        <aside class="note"><span class="tag">${String(index + 1).padStart(2, '0')} · 入口演示</span><h2 id="flow-title-${key}">${title}</h2>
          <p class="sub">${caption}</p><h3>操作与状态</h3><ul>${notes.map(note => '<li>' + note + '</li>').join('')}</ul>
          <a href="#unit-home" class="flow-home" data-open="home">↑ 返回单元学首页</a></aside></section>`;
    }).join('');
  document.querySelector('#flow-index').innerHTML = Object.entries(flows).map(([key, [title]]) =>
    `<a href="#${anchor(key)}" data-open="${key}">${title}</a>`).join('');
}

function resetBookViews() {
  recordUnit = 0;
  recordStatus = '全部';
  textUnit = defaults.text;
  selectedLine = -1;
  testUnit = 2;
  testAnswer = -1;
  startPractice('learn', defaults.learn);
  startPractice('review', defaults.review);
  renderHome();
  for (const key of Object.keys(renderers)) render(key);
}

function openFlow(button) {
  const key = button.dataset.open;
  if (key === 'book') {
    pendingBook = activeBook;
    render(key);
  }
  if (key === 'learn' || key === 'review') {
    startPractice(key, Number(button.dataset.unit ?? defaults[key]), button.hasAttribute('data-due'));
    render(key);
  }
  if (key === 'text') {
    textUnit = Number(button.dataset.unit ?? defaults.text);
    selectedLine = -1;
    render(key);
  }
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  show(key);
}

function speak(lines, key, repeats = 1) {
  const feedback = area(key).querySelector('.flow-feedback');
  if (!('speechSynthesis' in window)) {
    feedback.textContent = '当前浏览器不支持语音播放。';
    return;
  }
  window.speechSynthesis.cancel();
  const queue = Array.from({ length: repeats }, () => lines).flat();
  queue.forEach((line, index) => {
    const audio = new SpeechSynthesisUtterance(line);
    audio.lang = 'en-US';
    audio.rate = .85;
    if (index === queue.length - 1) audio.onend = () => { feedback.textContent = '播放完成'; };
    audio.onerror = event => {
      if (event.error !== 'canceled' && event.error !== 'interrupted') feedback.textContent = '当前设备无法播放英文语音。';
    };
    window.speechSynthesis.speak(audio);
  });
  feedback.textContent = '正在播放…';
}

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
  if (command === 'choose-book') {
    pendingBook = Number(value);
    for (const option of area('book').querySelectorAll('input[type="radio"]')) {
      option.closest('label').classList.toggle('selected', option.checked);
    }
  } else if (command === 'record-unit') {
    recordUnit = Number(value);
    render('records');
    area('records').querySelector('[data-action="record-unit"]').focus();
  } else if (command === 'test-unit') {
    testUnit = Number(value);
    testAnswer = -1;
    render('test');
    area('test').querySelector('[data-action="test-unit"]').focus();
  } else if (command === 'repeats') {
    settings.repeats = Number(value);
  } else if (command === 'translations') {
    settings.translations = event.target.checked;
    render('text');
  }
});

gallery.addEventListener('click', event => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const command = button.dataset.action;
  const key = button.closest('.flow-stage').id.slice('entry-'.length);
  const session = practice[key];
  if (command === 'apply-book') {
    activeBook = pendingBook;
    resetBookViews();
    show('home');
  } else if (command === 'record-status') {
    recordStatus = button.dataset.status;
    render(key);
    area(key).querySelector('[aria-pressed="true"]').focus();
  } else if (command === 'say-word') {
    speak([button.querySelector('b').textContent], key, settings.repeats);
  } else if (command === 'say-card') {
    speak([session.words[session.index].en], key, settings.repeats);
  } else if (command === 'reveal') {
    session.revealed = !session.revealed;
    render(key);
    area(key).querySelector('[data-action="reveal"], [data-action="remember"]')?.focus();
  } else if (['next', 'remember', 'again'].includes(command)) {
    if (command === 'remember') session.remembered++;
    session.index++;
    session.revealed = false;
    render(key);
    area(key).querySelector('button.primary, button.mint')?.focus();
  } else if (command === 'restart') {
    startPractice(key, session.n, session.due);
    render(key);
  } else if (command === 'say-line' || command === 'say-all') {
    selectedLine = command === 'say-line' ? Number(button.dataset.line) : 0;
    for (const line of area(key).querySelectorAll('[data-line]')) {
      line.setAttribute('aria-pressed', String(Number(line.dataset.line) === selectedLine));
    }
    const lines = getUnit(textUnit).lines;
    speak(command === 'say-all' ? lines.map(([en]) => en) : [lines[selectedLine][0]], key);
  } else if (command === 'toggle-translation') {
    settings.translations = !settings.translations;
    render('text');
    render('settings');
    area('text').querySelector('[data-action="toggle-translation"]').focus();
  } else if (command === 'answer') {
    testAnswer = Number(button.dataset.index);
    render(key);
    area(key).querySelector('[data-index="' + testAnswer + '"]').focus();
  }
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
    speak([button.querySelector('b').textContent], 'records', settings.repeats);
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

renderGallery();
resetBookViews();
if (location.hash && document.getElementById(location.hash.slice(1))) {
  requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView());
}
