const practiceSteps = ['学', '读', '练', '拼', '写'];
const wordExamples = {
  class: ['/klæs/', 'I have an English class today.', '我今天有一节英语课。'],
  sometimes: ['/ˈsʌmtaɪmz/', 'Sometimes I play football.', '我有时踢足球。'],
  old: ['/oʊld/', 'My grandfather is old.', '我的爷爷年纪大了。'],
  young: ['/jʌŋ/', 'Our new teacher is young.', '我们的新老师很年轻。'],
  often: ['/ˈɔːfən/', 'I often read books.', '我经常看书。'],
  weekend: ['/ˈwiːkend/', 'I read books on the weekend.', '我在周末看书。']
};

function clearPracticeAudio(session) {
  if (!session) return;
  session.audioRequest = null;
  const { recording, audioUrl } = session;
  if (recording?.state === 'recording') recording.stop();
  session.recording = null;
  if (audioUrl) URL.revokeObjectURL(audioUrl);
  session.audioUrl = '';
}

function resetPracticeStep(session, step = 0) {
  clearPracticeAudio(session);
  Object.assign(session, {
    step, selected: null, used: [], answer: '', passed: false, feedback: '', error: false
  });
}

function practiceOptions(word, unit, index) {
  const other = [...new Set(unit.words.map(item => item.cn))].filter(cn => cn !== word.cn).slice(0, 2);
  other.splice(index % (other.length + 1), 0, word.cn);
  return other;
}

function practiceMarkup(key, session) {
  const { entries, index, step, selected, used, passed, feedback, error, fromDue, unitNumber } = session;
  const item = entries[index];
  const mode = key === 'learn' ? '学词' : '复习词';
  const range = unitNumber ? 'Unit ' + unitNumber : '全部到期词';
  const back = fromDue ? 'due' : 'home';
  if (!item) {
    const body = entries.length ? '<strong>' + index + ' / ' + entries.length + '</strong><p>词已' + (key === 'learn' ? '学完' : '复习') + '</p>' : '<p>可以返回单元列表选择其他入口。</p>';
    return `<div class="flow-panel practice-summary"><div class="flow-eyebrow">${range} · ${mode}</div><h4>${entries.length ? '本轮完成' : '本轮没有单词'}</h4>${body}</div>
      <div class="flow-footer">${open(back, fromDue ? '返回到期列表' : '返回单元学', '', 'primary')}</div>`;
  }

  const { word, unit } = item;
  const example = wordExamples[word.en];
  const letters = [...word.en.replace(/[^a-z]/gi, '').toLowerCase()].reverse();
  const next = action('advance-step', '下一步 · ' + practiceSteps[step + 1], 'primary');
  let panel, footer;
  if (step === 0) {
    panel = `<div class="flow-panel practice-card">
      <div class="flow-word">${word.en}</div>${example ? '<p>' + example[0] + '</p>' : ''}
      <div class="flow-actions">${action('say-card', '听发音')}</div><h4>${word.cn}</h4>
      ${example ? `<div class="practice-example"><b>${example[1]}</b><p>${example[2]}</p></div>` : ''}
    </div>`;
    footer = next;
  } else if (step === 1) {
    panel = `<div class="flow-panel practice-card"><div class="flow-word">${word.en}</div>${example ? '<p>' + example[0] + '</p>' : ''}
      <p>听标准发音，再跟读一遍。</p><div class="flow-actions">${action('say-card', '标准发音')}${action('record-voice', session.recording ? '停止录音' : session.audioRequest ? '取消录音' : '录音跟读')}${session.audioUrl ? action('play-voice', '播放我的发音') : ''}</div></div>`;
    footer = next;
  } else if (step === 2) {
    const options = practiceOptions(word, unit, index);
    panel = `<h4 class="practice-title">${word.en} 是什么意思？</h4><div class="flow-choice">
      ${options.map((meaning, i) => `<button type="button" class="flow-option ${i === selected ? 'selected' : ''}" data-action="choose-meaning" data-index="${i}" aria-pressed="${i === selected}" ${passed ? 'disabled' : ''}>${meaning}</button>`).join('')}</div>`;
    footer = passed ? next : `<button type="button" class="flow-button primary" data-action="check-step" ${selected === null ? 'disabled' : ''}>确认答案</button>`;
  } else if (step === 3) {
    panel = `<h4 class="practice-title">听音拼词</h4><div class="flow-actions">${action('say-card', '播放单词')}</div>
      <div class="practice-letters" aria-label="拼词区">${letters.map((_, i) => used[i] === undefined
        ? '<span class="slot">·</span>'
        : `<button type="button" class="slot" data-action="remove-letter" data-index="${i}" aria-label="撤回 ${letters[used[i]]}" ${passed ? 'disabled' : ''}>${letters[used[i]]}</button>`).join('')}</div>
      <div class="practice-letters" aria-label="字母选项">${letters.map((letter, i) => `<button type="button" data-action="add-letter" data-index="${i}" ${used.includes(i) || passed ? 'disabled' : ''}>${letter}</button>`).join('')}</div>
      <p class="flow-caption">点字母按顺序拼词，点上方字母可撤回。</p>`;
    footer = passed ? next : `<button type="button" class="flow-button primary" data-action="check-step" ${used.length < letters.length ? 'disabled' : ''}>检查拼写</button>`;
  } else {
    panel = `<h4 class="practice-title">根据中文写单词</h4><form id="write-${key}" class="flow-panel" data-write="${key}">
      <label><b>${word.cn}</b><input class="practice-input" name="answer" placeholder="输入英文" autocomplete="off" autocapitalize="off" spellcheck="false" ${passed ? 'readonly' : ''} required></label></form>`;
    const endLabel = key === 'review' ? '完成复习' : '完成本轮';
    footer = passed ? action('complete-word', index + 1 < entries.length ? '下一个词 →' : endLabel, 'primary')
      : `<button type="submit" form="write-${key}" class="flow-button primary">提交</button>`;
  }

  return `<div class="practice-progress"><span>${range} · ${mode}</span><span>第 ${index + 1} / ${entries.length} 词</span></div>
    <div class="practice-steps" aria-label="五步进度">${practiceSteps.map((name, i) => `<span class="${i === step ? 'current' : i < step ? 'done' : ''}" ${i === step ? 'aria-current="step" tabindex="-1"' : ''}>${name}</span>`).join('')}</div>
    ${panel}<div class="practice-feedback ${error ? 'bad' : ''}" aria-live="polite">${feedback}</div>
    <div class="flow-feedback" aria-live="polite"></div><div class="flow-footer">${footer}</div>`;
}

function checkPractice(session) {
  const { word, unit } = session.entries[session.index];
  let correct;
  if (session.step === 2) correct = practiceOptions(word, unit, session.index)[session.selected] === word.cn;
  if (session.step === 3) {
    const target = word.en.replace(/[^a-z]/gi, '').toLowerCase();
    const letters = [...target].reverse();
    correct = session.used.map(i => letters[i]).join('') === target;
  }
  if (session.step === 4) correct = session.answer.trim().toLowerCase().replace(/\s+/g, ' ') === word.en.toLowerCase();
  session.passed = correct;
  session.error = !correct;
  session.feedback = correct ? (session.step === 4 ? '✓ 写对了' : '✓ 答对了') : '再试一次，完成这一步后继续。';
}

async function togglePracticeRecording(session, onChange) {
  if (session.recording?.state === 'recording') {
    session.recording.stop();
    return;
  }
  if (session.audioRequest) {
    session.audioRequest = null;
    onChange();
    return;
  }
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
    session.feedback = '当前浏览器无法录音，可以听标准发音后继续。';
    onChange();
    return;
  }

  const request = {};
  session.audioRequest = request;
  onChange();
  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    if (session.audioRequest !== request) {
      stream.getTracks().forEach(track => track.stop());
      return;
    }
    const recorder = new MediaRecorder(stream);
    session.recording = recorder;
    session.audioRequest = null;
    const chunks = [];
    recorder.addEventListener('dataavailable', event => chunks.push(event.data));
    recorder.addEventListener('stop', () => {
      stream.getTracks().forEach(track => track.stop());
      if (session.recording !== recorder) return;
      session.recording = null;
      if (session.audioUrl) URL.revokeObjectURL(session.audioUrl);
      session.audioUrl = URL.createObjectURL(new Blob(chunks, { type: recorder.mimeType }));
      session.feedback = '录音完成，可以回听。';
      onChange();
    });
    recorder.start();
    session.feedback = '正在录音…';
    onChange();
  } catch {
    stream?.getTracks().forEach(track => track.stop());
    if (session.audioRequest !== request && !session.recording) return;
    session.audioRequest = null;
    session.recording = null;
    session.feedback = '未能开启麦克风，可以听标准发音后继续。';
    onChange();
  }
}
