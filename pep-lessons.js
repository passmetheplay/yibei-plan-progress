// Publisher's companion audio for the editions whose unit titles match this prototype.
const pepAudioDirectory = {
  上: 'https://www.pep.com.cn/zslth/yyptypzj/xypep/5s/',
  下: 'https://www.pep.com.cn/zslth/yyptypzj/xypep/5x/'
};
const pepLessonAudio = {
  上: {
    1: {"a": "https://www.pep.com.cn/yyptypzj/5s103Let'stalk.mp3", "b": "https://www.pep.com.cn/yyptypzj/5s109Let'stalk.mp3", "read": "https://www.pep.com.cn/yyptypzj/5s111Readandwrite.mp3", "c": "https://www.pep.com.cn/yyptypzj/5s114Storytime.mp3"},
    2: {"a": "https://www.pep.com.cn/yyptypzj/5s203Let'stalk.mp3", "b": "https://www.pep.com.cn/yyptypzj/5s209Let'stalk.mp3", "read": "https://www.pep.com.cn/yyptypzj/5s211Readandwrite.mp3", "c": "https://www.pep.com.cn/yyptypzj/5s213CStorytime.mp3"},
    3: {"a": "https://www.pep.com.cn/yyptypzj/5s303Let'stalk.mp3", "b": "https://www.pep.com.cn/yyptypzj/5s309Let'stalk.mp3", "read": "https://www.pep.com.cn/yyptypzj/5s311Readandwrite.mp3", "c": "https://www.pep.com.cn/yyptypzj/5s313CStorytime.mp3"},
    4: {"a": "https://www.pep.com.cn/yyptypzj/5s503Let'stalk.mp3", "b": "https://www.pep.com.cn/yyptypzj/5s509Let'stalk.mp3", "read": "https://www.pep.com.cn/yyptypzj/5s511Readandwrite.mp3", "c": "https://www.pep.com.cn/yyptypzj/5s513CStorytime.mp3"},
    5: {"a": "https://www.pep.com.cn/yyptypzj/5s603Let'stalk.mp3", "b": "https://www.pep.com.cn/yyptypzj/5s609Let'stalk.mp3", "read": "https://www.pep.com.cn/yyptypzj/5s611Readandwrite.mp3", "c": "https://www.pep.com.cn/yyptypzj/5s614CStorytime.mp3"},
    6: {"a": "https://www.pep.com.cn/yyptypzj/5s703Let'stalk.mp3", "b": "https://www.pep.com.cn/yyptypzj/5s709Let'stalk.mp3", "read": "https://www.pep.com.cn/yyptypzj/5s711Readandwrite.mp3", "c": "https://www.pep.com.cn/yyptypzj/5s714CStorytime.mp3"},
  },
  下: {
    1: {"a": "https://www.pep.com.cn/yyptypzj/pep-5x-03-Unit-1-A-Lets-talk.mp3", "b": "https://www.pep.com.cn/yyptypzj/pep-5x-08-Unit-1-B-Lets-talk.mp3", "read": "https://www.pep.com.cn/yyptypzj/pep-5x-10-Unit-1-B-Read-and-write.mp3", "c": "https://www.pep.com.cn/yyptypzj/pep-5x-12-Unit-1-C-Story-time.mp3"},
    2: {"a": "https://www.pep.com.cn/yyptypzj/pep-5x-03-Unit-2-A-Lets-talk.mp3", "b": "https://www.pep.com.cn/yyptypzj/pep-5x-08-Unit-2-B-Lets-talk.mp3", "read": "https://www.pep.com.cn/yyptypzj/pep-5x-10-Unit-2-B-Read-and-write.mp3", "c": "https://www.pep.com.cn/yyptypzj/pep-5x-12-Unit-2-C-Story-time.mp3"},
    3: {"a": "https://www.pep.com.cn/yyptypzj/pep-5x-03-Unit-3-A-Lets-talk.mp3", "b": "https://www.pep.com.cn/yyptypzj/pep-5x-08-Unit-3-B-Lets-talk.mp3", "read": "https://www.pep.com.cn/yyptypzj/pep-5x-10-Unit-3-B-Read-and-write.mp3", "c": "https://www.pep.com.cn/yyptypzj/pep-5x-13-Unit-3-C-Story-time.mp3"},
    4: {"a": "https://www.pep.com.cn/yyptypzj/pep-5x-03-Unit-4-A-Lets-talk.mp3", "b": "https://www.pep.com.cn/yyptypzj/pep-5x-08-Unit-4-B-Lets-talk.mp3", "read": "https://www.pep.com.cn/yyptypzj/pep-5x-10-Unit-4-B-Read-and-write.mp3", "c": "https://www.pep.com.cn/yyptypzj/pep-5x-13-Unit-4-C-Story-time.mp3"},
    5: {"a": "https://www.pep.com.cn/yyptypzj/pep-5x-03-Unit-5-A-Lets-talk.mp3", "b": "https://www.pep.com.cn/yyptypzj/pep-5x-09-Unit-5-B-Lets-talk.mp3", "read": "https://www.pep.com.cn/yyptypzj/pep-5x-11-Unit-5-B-Read-and-write.mp3", "c": "https://www.pep.com.cn/yyptypzj/pep-5x-14-Unit-5-C-Story-time.mp3"},
    6: {"a": "https://www.pep.com.cn/yyptypzj/pep-5x-03-Unit-6-A-Lets-talk.mp3", "b": "https://www.pep.com.cn/yyptypzj/pep-5x-08-Unit-6-B-Lets-talk.mp3", "read": "https://www.pep.com.cn/yyptypzj/pep-5x-10-Unit-6-B-Read-and-write.mp3", "c": "https://www.pep.com.cn/yyptypzj/pep-5x-13-Unit-6-C-Story-time.mp3"},
  },
};

// Short textbook excerpts for the sentence-level interaction, with our translations.
const pepLessonExcerpts = {
  a: [
    ['What do you have on Thursdays?', '你星期四有什么课？'],
    ['I have maths, English and music.', '我有数学课、英语课和音乐课。']
  ],
  b: [
    ['Do you often read books in this park?', '你经常在这个公园里看书吗？'],
    ["No, I don't.", '不，我不常在这里看书。']
  ]
};
const pepLessonParts = [
  { key: 'a', part: 'Part A', title: 'Let’s talk' },
  { key: 'b', part: 'Part B', title: 'Let’s talk' },
  { key: 'read', part: 'Part B', title: 'Read and write' },
  { key: 'c', part: 'Part C', title: 'Story time', optional: true }
];
