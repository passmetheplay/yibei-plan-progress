const wordRecordStatuses = ['全部', '已学', '已复习', '已掌握', '未学'];

function wordRecordView({ title, subtitle, scope, units, words, unit, filter, playable = false }) {
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const visible = words.filter(word => (!unit || word.unit === unit) &&
    (filter === 0 || filter === 4 && word.status === 0 || filter < 4 && word.status >= filter));
  return `<div class="word-record">
    <div class="record-head"><div><h4>${escape(title)}</h4><p>${escape(subtitle)}</p></div>
      <select data-action="record-unit" aria-label="选择单元"><option value="0">${escape(scope)}</option>${units.map(n =>
        `<option value="${n}" ${unit === n ? 'selected' : ''}>Unit ${n}</option>`).join('')}</select></div>
    <div class="record-filters" role="group" aria-label="学习状态">${wordRecordStatuses.map((status, i) =>
      `<button type="button" data-action="record-status" data-status="${i}" aria-pressed="${filter === i}">${status}</button>`).join('')}</div>
    <div class="record-results"><h4 aria-live="polite">${unit ? 'Unit ' + unit : escape(scope)} · ${wordRecordStatuses[filter]} · ${visible.length} 词</h4>
      ${playable && visible.length ? '<p class="record-hint">点单词听发音</p>' : ''}
      ${visible.length ? `<ul class="record-words">${visible.map(word => {
        const row = `<b lang="en">${escape(word.en)}</b><span>${escape(word.cn)}</span><em data-status="${word.status}">${wordRecordStatuses[word.status || 4]}</em>`;
        return `<li>${playable ? `<button type="button" class="flow-sound" data-action="say-word">${row}</button>` : `<div class="record-row">${row}</div>`}</li>`;
      }).join('')}</ul>` : '<p class="record-empty">暂无匹配单词，可以换个单元或状态。</p>'}
    </div>
    ${playable ? '<p class="record-feedback" aria-live="polite"></p>' : ''}
  </div>`;
}

function speakRecordWord(word, feedback) {
  if (!('speechSynthesis' in window)) {
    feedback.textContent = '当前浏览器不支持语音播放。';
    return;
  }
  window.speechSynthesis.cancel();
  feedback.textContent = '';
  const audio = new SpeechSynthesisUtterance(word);
  audio.lang = 'en-US';
  audio.rate = .85;
  audio.onerror = event => {
    if (!['canceled', 'interrupted'].includes(event.error)) feedback.textContent = '当前设备无法播放英文语音。';
  };
  window.speechSynthesis.speak(audio);
}
