// Data and evaluator for the Sentence Builder.
// Everything here is plain JavaScript so it can also run in Node tests.

export var complements = [
  { id: 'none', text: '', verbs: ['study', 'work', 'wait', 'read', 'travel', 'write', 'swim', 'finish', 'call'] },
  { id: 'english', text: 'English', verbs: ['study', 'teach', 'learn'] },
  { id: 'french', text: 'French', verbs: ['study', 'teach', 'learn'] },
  { id: 'spanish', text: 'Spanish', verbs: ['study', 'teach', 'learn'] },
  { id: 'german', text: 'German', verbs: ['study', 'teach', 'learn'] },
  { id: 'italian', text: 'Italian', verbs: ['study', 'teach', 'learn'] },
  { id: 'math', text: 'math', verbs: ['study', 'read', 'teach', 'learn'] },
  { id: 'science', text: 'science', verbs: ['study', 'teach', 'learn'] },
  { id: 'history', text: 'history', verbs: ['study', 'teach', 'learn'] },
  { id: 'the_book', text: 'the book', verbs: ['read', 'write', 'study'] },
  { id: 'the_report', text: 'the report', verbs: ['write', 'read', 'finish'] },
  { id: 'the_car', text: 'the car', verbs: ['work', 'fix'] },
  { id: 'the_email', text: 'the email', verbs: ['write', 'read', 'send'] },
  { id: 'the_lesson', text: 'the lesson', verbs: ['study', 'teach', 'learn', 'prepare'] },
]

export var subjects = [
  { id: 'i', text: 'I', person: 1, plural: false, bePresent: 'am', bePast: 'was', have: 'have' },
  { id: 'you', text: 'You', person: 2, plural: true, bePresent: 'are', bePast: 'were', have: 'have' },
  { id: 'we', text: 'We', person: 1, plural: true, bePresent: 'are', bePast: 'were', have: 'have' },
  { id: 'they', text: 'They', person: 3, plural: true, bePresent: 'are', bePast: 'were', have: 'have' },
  { id: 'he', text: 'He', person: 3, plural: false, bePresent: 'is', bePast: 'was', have: 'has' },
  { id: 'she', text: 'She', person: 3, plural: false, bePresent: 'is', bePast: 'was', have: 'has' }
]

export var verbs = [
  { id: 'study', base: 'study', third: 'studies', ing: 'studying', past: 'studied', participle: 'studied' },
  { id: 'work', base: 'work', third: 'works', ing: 'working', past: 'worked', participle: 'worked' },
  { id: 'wait', base: 'wait', third: 'waits', ing: 'waiting', past: 'waited', participle: 'waited' },
  { id: 'read', base: 'read', third: 'reads', ing: 'reading', past: 'read', participle: 'read' },
  { id: 'travel', base: 'travel', third: 'travels', ing: 'travelling', past: 'travelled', participle: 'travelled' },
  { id: 'write', base: 'write', third: 'writes', ing: 'writing', past: 'wrote', participle: 'written' },
  { id: 'swim', base: 'swim', third: 'swims', ing: 'swimming', past: 'swam', participle: 'swum' },
  { id: 'finish', base: 'finish', third: 'finishes', ing: 'finishing', past: 'finished', participle: 'finished' },
  { id: 'call', base: 'call', third: 'calls', ing: 'calling', past: 'called', participle: 'called' },
  { id: 'leave', base: 'leave', third: 'leaves', ing: 'leaving', past: 'left', participle: 'left' },
  { id: 'depart', base: 'depart', third: 'departs', ing: 'departing', past: 'departed', participle: 'departed' },
  { id: 'start', base: 'start', third: 'starts', ing: 'starting', past: 'started', participle: 'started' },
  { id: 'open', base: 'open', third: 'opens', ing: 'opening', past: 'opened', participle: 'opened' },
  { id: 'arrive', base: 'arrive', third: 'arrives', ing: 'arriving', past: 'arrived', participle: 'arrived' },
]

export var timeExpressions = [
  {
    id: 'right_now',
    text: 'right now',
    preferred: ['presente_continuo', 'past_continuous', 'present_perfect_continuous'],
    avoid: ['present_simple', 'simple_future', 'future_continuous', 'present_perfect', 'past_perfect', 'future_perfect', 'future_perfect_continuous'],
    note: '“Right now” points to this moment, so a continuous tense is the natural choice.',
  },
  {
    id: 'every_day',
    text: 'every day',
    preferred: ['present_simple', 'presente_continuo', 'simple_past', 'past_continuous'],
    avoid: ['future_continuous', 'present_perfect', 'present_perfect_continuous', 'future_perfect', 'future_perfect_continuous'],
    note: 'Habits and routines normally use simple present; continuous forms work for ongoing repeated actions.',
  },
  {
    id: 'yesterday',
    text: 'yesterday',
    preferred: ['simple_past', 'past_continuous', 'past_perfect', 'past_perfect_continuous'],
    avoid: ['present_perfect', 'simple_future', 'future_continuous', 'future_perfect', 'future_perfect_continuous', 'present_simple', 'presente_continuo'],
    note: 'A finished past time such as “yesterday” needs a past tense.',
  },
  {
    id: 'next_week',
    text: 'next week',
    preferred: ['simple_future', 'future_continuous', 'present_simple'],
    avoid: ['future_perfect', 'past_perfect', 'past_continuous', 'simple_past', 'past_perfect_continuous', 'present_perfect', 'present_perfect_continuous'],
    appliesTo: 'Present simple is for scheduled events with fixed times (trains, flights, meetings, openings). Future tenses are for personal plans and predictions.',
    preferredVerbs: ['leave', 'depart', 'start', 'open', 'arrive'],
    note: 'Future perfect normally needs “by next week” to show a deadline.',
  },
  {
    id: 'tomorrow_at_eight',
    text: 'tomorrow at eight',
    preferred: ['future_continuous', 'simple_future'],
    avoid: ['simple_past', 'past_continuous', 'present_simple', 'presente_continuo', 'present_perfect', 'present_perfect_continuous', 'past_perfect', 'past_perfect_continuous', 'future_perfect', 'future_perfect_continuous'],
    note: 'A specific future moment works well with future continuous.',
  },
  {
    id: 'by_friday',
    text: 'by Friday',
    preferred: ['future_perfect', 'past_perfect', 'present_perfect'],
    avoid: ['simple_future', 'future_continuous', 'present_simple', 'presente_continuo', 'simple_past', 'past_continuous', 'present_perfect_continuous', 'past_perfect_continuous', 'future_perfect_continuous'],
    note: '“By” signals completion before a deadline.',
  },
  {
    id: 'for_two_hours',
    text: 'for two hours',
    preferred: ['present_perfect_continuous', 'past_perfect_continuous', 'future_perfect_continuous', 'present_perfect', 'past_perfect', 'future_perfect', 'presente_continuo', 'past_continuous', 'future_continuous'],
    avoid: ['present_simple', 'simple_past', 'simple_future'],
    note: '“For + a period of time” often describes duration.',
  },
  {
    id: 'already',
    text: 'already',
    preferred: ['present_perfect', 'future_perfect', 'past_perfect'],
    avoid: ['simple_past', 'future_continuous', 'present_simple', 'presente_continuo', 'past_continuous', 'present_perfect_continuous', 'past_perfect_continuous', 'future_perfect_continuous', 'simple_future'],
    note: '“Already” is typical with perfect tenses.',
  },
  {
    id: 'since_2020',
    text: 'since 2020',
    preferred: ['present_perfect', 'present_perfect_continuous', 'past_perfect', 'past_perfect_continuous'],
    avoid: ['simple_past', 'simple_future', 'future_continuous', 'future_perfect', 'future_perfect_continuous', 'present_simple', 'presente_continuo', 'past_continuous'],
    note: '“Since” marks a starting point and connects it to now or to a past reference.',
  },
  {
    id: 'this_time_next_week',
    text: 'this time next week',
    preferred: ['future_continuous'],
    avoid: ['simple_future', 'simple_past', 'present_simple', 'presente_continuo', 'present_perfect', 'present_perfect_continuous', 'past_perfect', 'past_perfect_continuous', 'future_perfect', 'future_perfect_continuous', 'past_continuous'],
    note: 'This phrase points to an action in progress at a future moment.',
  },
  {
    id: 'in_two_hours',
    text: 'in two hours',
    preferred: ['simple_future', 'future_perfect', 'future_continuous'],
    avoid: ['present_simple', 'presente_continuo', 'simple_past', 'past_continuous', 'present_perfect', 'present_perfect_continuous', 'past_perfect', 'past_perfect_continuous', 'future_perfect_continuous'],
    note: '“In two hours” says when something happens or when it will be done.',
  },
  {
    id: 'every_morning',
    text: 'every morning',
    preferred: ['present_simple'],
    avoid: ['simple_past', 'simple_future', 'future_continuous', 'present_perfect', 'present_perfect_continuous', 'past_perfect', 'past_perfect_continuous', 'future_perfect', 'future_perfect_continuous'],
    note: 'Frequency expressions usually go with simple present for habits.',
  },
  {
    id: 'every_afternoon',
    text: 'every afternoon',
    preferred: ['present_simple'],
    avoid: ['simple_past', 'simple_future', 'future_continuous', 'present_perfect', 'present_perfect_continuous', 'past_perfect', 'past_perfect_continuous', 'future_perfect', 'future_perfect_continuous'],
    note: 'Frequency expressions usually go with simple present for habits.',
  },
  {
    id: 'every_evening',
    text: 'every evening',
    preferred: ['present_simple'],
    avoid: ['simple_past', 'simple_future', 'future_continuous', 'present_perfect', 'present_perfect_continuous', 'past_perfect', 'past_perfect_continuous', 'future_perfect', 'future_perfect_continuous'],
    note: 'Frequency expressions usually go with simple present for habits.',
  },
  {
    id: 'every_night',
    text: 'every night',
    preferred: ['present_simple'],
    avoid: ['simple_past', 'simple_future', 'future_continuous', 'present_perfect', 'present_perfect_continuous', 'past_perfect', 'past_perfect_continuous', 'future_perfect', 'future_perfect_continuous'],
    note: 'Frequency expressions usually go with simple present for habits.',
  },
  {
    id: 'every_week',
    text: 'every week',
    preferred: ['present_simple'],
    avoid: ['simple_past', 'simple_future', 'future_continuous', 'present_perfect', 'present_perfect_continuous', 'past_perfect', 'past_perfect_continuous', 'future_perfect', 'future_perfect_continuous'],
    note: 'Frequency expressions usually go with simple present for habits.',
  },
  {
    id: 'every_month',
    text: 'every month',
    preferred: ['present_simple'],
    avoid: ['simple_past', 'simple_future', 'future_continuous', 'present_perfect', 'present_perfect_continuous', 'past_perfect', 'past_perfect_continuous', 'future_perfect', 'future_perfect_continuous'],
    note: 'Frequency expressions usually go with simple present for habits.',
  },
  {
    id: 'every_year',
    text: 'every year',
    preferred: ['present_simple'],
    avoid: ['simple_past', 'simple_future', 'future_continuous', 'present_perfect', 'present_perfect_continuous', 'past_perfect', 'past_perfect_continuous', 'future_perfect', 'future_perfect_continuous'],
    note: 'Frequency expressions usually go with simple present for habits.',
  },
  {
    id: 'once_a_day',
    text: 'once a day',
    preferred: ['present_simple'],
    avoid: ['simple_past', 'simple_future', 'future_continuous', 'present_perfect', 'present_perfect_continuous', 'past_perfect', 'past_perfect_continuous', 'future_perfect', 'future_perfect_continuous'],
    note: 'Frequency expressions usually go with simple present for habits.',
  },
  {
    id: 'twice_a_week',
    text: 'twice a week',
    preferred: ['present_simple'],
    avoid: ['simple_past', 'simple_future', 'future_continuous', 'present_perfect', 'present_perfect_continuous', 'past_perfect', 'past_perfect_continuous', 'future_perfect', 'future_perfect_continuous'],
    note: 'Frequency expressions usually go with simple present for habits.',
  },
  {
    id: 'three_times_a_month',
    text: 'three times a month',
    preferred: ['present_simple'],
    avoid: ['simple_past', 'simple_future', 'future_continuous', 'present_perfect', 'present_perfect_continuous', 'past_perfect', 'past_perfect_continuous', 'future_perfect', 'future_perfect_continuous'],
    note: 'Frequency expressions usually go with simple present for habits.',
  },
  {
    id: 'every_two_days',
    text: 'every two days',
    preferred: ['present_simple'],
    avoid: ['simple_past', 'simple_future', 'future_continuous', 'present_perfect', 'present_perfect_continuous', 'past_perfect', 'past_perfect_continuous', 'future_perfect', 'future_perfect_continuous'],
    note: 'Frequency expressions usually go with simple present for habits.',
  },
]

export var tenses = [
  {
    id: 'present_simple',
    title: 'Simple present',
    form: {
      affirmative: 'subject + base verb (+ -s / -es for he / she / it)',
      negative: 'subject + do/does not + base verb',
      question: 'Do/Does + subject + base verb?',
      question_negative: 'Don\'t/Doesn\'t + subject + base verb?',
    },
    use: 'Habits, facts, states and schedules.',
    example: 'She studies every day.',
    hint: 'With he / she / it, add -s or -es to the verb.',
    notes: ['Do not use -s after I / you / we / they.', 'Questions and negatives use do / does.'],
  },
  {
    id: 'presente_continuo',
    title: 'Present continuous',
    form: {
      affirmative: 'subject + am / is / are + verb-ing',
      negative: 'subject + am / is / are + not + verb-ing',
      question: 'Am/Is/Are + subject + verb-ing?',
      question_negative: 'Aren\'t/Isn\'t + subject + verb-ing?',
    },
    use: 'Actions happening right now.',
    example: 'We are studying right now.',
    hint: 'Choose am, is or are to match the subject, then use verb-ing.',
    notes: ['make → making, run → running, lie → lying.', 'Stative verbs such as know and believe are rarely continuous.'],
  },
  {
    id: 'simple_past',
    title: 'Simple past',
    form: {
      affirmative: 'subject + past verb',
      negative: 'subject + did not + base verb',
      question: 'Did + subject + base verb?',
      question_negative: 'Didn\'t + subject + base verb?',
    },
    use: 'Finished actions at a specific past time.',
    example: 'We studied yesterday.',
    hint: 'Use the past form of the verb. Negative: did not + base verb.',
    notes: ['Regular verbs add -ed.', 'Irregular verbs must be memorised: write → wrote, swim → swam.'],
  },
  {
    id: 'past_continuous',
    title: 'Past continuous',
    form: {
      affirmative: 'subject + was / were + verb-ing',
      negative: 'subject + was / were + not + verb-ing',
      question: 'Was/Were + subject + verb-ing?',
      question_negative: 'Wasn\'t/Weren\'t + subject + verb-ing?',
    },
    use: 'Actions in progress in the past.',
    example: 'They were studying when I called.',
    hint: 'Use was with I / he / she / it; were with you / we / they.',
    notes: ['Often combined with simple past for an interruption.', 'Avoid stative verbs in continuous forms.'],
  },
  {
    id: 'present_perfect',
    title: 'Present perfect',
    form: {
      affirmative: 'subject + have / has + past participle',
      negative: 'subject + have / has + not + past participle',
      question: 'Have/Has + subject + past participle?',
      question_negative: 'Haven\'t/Hasn\'t + subject + past participle?',
    },
    use: 'Experiences and past actions connected to now.',
    example: 'We have already studied.',
    hint: 'Use have or has, then the past participle.',
    notes: ['Use for / since with continuing situations.', 'Do not combine with a finished past time such as yesterday.'],
  },
  {
    id: 'present_perfect_continuous',
    title: 'Present perfect continuous',
    form: {
      affirmative: 'subject + have / has been + verb-ing',
      negative: 'subject + have / has + not + been + verb-ing',
      question: 'Have/Has + subject + been + verb-ing?',
      question_negative: 'Haven\'t/Hasn\'t + subject + been + verb-ing?',
    },
    use: 'Actions that started before and still continue.',
    example: 'We have been studying for two hours.',
    hint: 'Use have / has been, then verb-ing.',
    notes: ['It emphasises duration.', 'Stative verbs are normally avoided.'],
  },
  {
    id: 'past_perfect',
    title: 'Past perfect',
    form: {
      affirmative: 'subject + had + past participle',
      negative: 'subject + had + not + past participle',
      question: 'Had + subject + past participle?',
      question_negative: 'Hadn\'t + subject + past participle?',
    },
    use: 'An action completed before another past action.',
    example: 'We had studied before the test.',
    hint: 'Use had for every subject, then the past participle.',
    notes: ['Had never changes.', 'Often used with before / after / when.'],
  },
  {
    id: 'past_perfect_continuous',
    title: 'Past perfect continuous',
    form: {
      affirmative: 'subject + had been + verb-ing',
      negative: 'subject + had + not + been + verb-ing',
      question: 'Had + subject + been + verb-ing?',
      question_negative: 'Hadn\'t + subject + been + verb-ing?',
    },
    use: 'Duration before another past event.',
    example: 'We had been studying for two hours.',
    hint: 'Use had been, then verb-ing.',
    notes: ['It answers: how long had it been happening?', 'Stative verbs are normally avoided.'],
  },
  {
    id: 'simple_future',
    title: 'Simple future',
    form: {
      affirmative: 'subject + will + base verb',
      negative: 'subject + will not + base verb',
      question: 'Will + subject + base verb?',
      question_negative: 'Won\'t + subject + base verb?',
    },
    use: 'Spontaneous decisions, promises and predictions.',
    example: 'We will study next week.',
    hint: 'Use will, then the base verb with no -s.',
    notes: ['Will does not change with the subject.', 'For decided plans, use going to.'],
  },
  {
    id: 'future_continuous',
    title: 'Future Continuous',
    form: {
      affirmative: 'subject + will be + verb-ing',
      negative: 'subject + will not be + verb-ing',
      question: 'Will + subject + be + verb-ing?',
      question_negative: 'Won\'t + subject + be + verb-ing?',
    },
    use: 'Actions in progress at a specific time in the future.',
    example: 'We will be studying next week.',
    hint: 'After “will” you need “be”, then the -ing verb.',
    notes: [
      'Do not confuse with simple future: future continuous emphasises the action in progress.',
      'Avoid stative verbs such as know, love and believe in continuous forms.',
    ],
  },
  {
    id: 'future_perfect',
    title: 'Future perfect',
    form: {
      affirmative: 'subject + will have + past participle',
      negative: 'subject + will not have + past participle',
      question: 'Will + subject + have + past participle?',
      question_negative: 'Won\'t + subject + have + past participle?',
    },
    use: 'An action completed before a future deadline.',
    example: 'We will have studied by Friday.',
    hint: 'Use will have, then the past participle.',
    notes: ['It usually goes with by / by then / before.', 'It emphasises completion, not duration.'],
  },
  {
    id: 'future_perfect_continuous',
    title: 'Future perfect continuous',
    form: {
      affirmative: 'subject + will have been + verb-ing',
      negative: 'subject + will not have been + verb-ing',
      question: 'Will + subject + have been + verb-ing?',
      question_negative: 'Won\'t + subject + have been + verb-ing?',
    },
    use: 'Duration up to a future time.',
    example: 'We will have been studying for two hours.',
    hint: 'Use will have been, then verb-ing.',
    notes: ['It emphasises how long something will have lasted.', 'Stative verbs are normally avoided.'],
  },
]

export function getTense(id) {
  return findById(tenses, id)
}

export function getSubject(id) {
  return findById(subjects, id)
}

export function getVerb(id) {
  return findById(verbs, id)
}

export function getTime(id) {
  return findById(timeExpressions, id)
}

export function getComplement(id) {
  return findById(complements, id)
}

function findById(list, id) {
  for (var i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      return list[i]
    }
  }
  return null
}

function isThirdSingular(subject) {
  return subject.person === 3 && !subject.plural
}

export function verbPhrase(tenseId, subject, verb) {
  switch (tenseId) {
    case 'present_simple':
      return isThirdSingular(subject) ? verb.third : verb.base
    case 'presente_continuo':
      return subject.bePresent + ' ' + verb.ing
    case 'simple_past':
      return verb.past
    case 'past_continuous':
      return (subject.plural || subject.person === 2 ? 'were' : 'was') + ' ' + verb.ing
    case 'present_perfect':
      return subject.have + ' ' + verb.participle
    case 'present_perfect_continuous':
      return subject.have + ' been ' + verb.ing
    case 'past_perfect':
      return 'had ' + verb.participle
    case 'past_perfect_continuous':
      return 'had been ' + verb.ing
    case 'simple_future':
      return 'will ' + verb.base
    case 'future_continuous':
      return 'will be ' + verb.ing
    case 'future_perfect':
      return 'will have ' + verb.participle
    case 'future_perfect_continuous':
      return 'will have been ' + verb.ing
    default:
      return 'will ' + verb.base
  }
}

export function buildSentence(tenseId, subject, verb, time, polarity, complement) {
  polarity = polarity || "affirmative";
  complement = complement && complement.id !== 'none' ? complement.text : '';
  var middle = verbPhrase(tenseId, subject, verb);
  var text = "";
  var parts = [];

  function withComplement(base) {
    return complement ? base + " " + complement : base;
  }

  if (polarity === "negative") {
    if (tenseId === "present_simple") {
      middle = (isThirdSingular(subject) ? "doesn't" : "don't") + " " + verb.base;
    } else if (tenseId === "presente_continuo") {
      middle = subject.bePresent + " not " + verb.ing;
    } else if (tenseId === "simple_past") {
      middle = "didn't " + verb.base;
    } else if (tenseId === "past_continuous") {
      middle = (subject.plural || subject.person === 2 ? "were" : "was") + " not " + verb.ing;
    } else if (tenseId === "present_perfect") {
      middle = (isThirdSingular(subject) ? "hasn't" : "haven't") + " " + verb.participle;
    } else if (tenseId === "present_perfect_continuous") {
      middle = (isThirdSingular(subject) ? "hasn't" : "haven't") + " been " + verb.ing;
    } else if (tenseId === "past_perfect") {
      middle = "hadn't " + verb.participle;
    } else if (tenseId === "past_perfect_continuous") {
      middle = "hadn't been " + verb.ing;
    } else {
      middle = middle.replace("will", "won't");
    }
    text = subject.text + " " + withComplement(middle) + " " + time.text + ".";
    parts = [subject.text, middle];
    if (complement) parts.push(complement);
    parts.push(time.text);
  } else if (polarity === "question") {
    if (tenseId === "present_simple") {
      let subjectValue = subject.text != 'I' ? subject.text.toLowerCase() : 'I';
      text = (isThirdSingular(subject) ? "Does" : "Do") + " " + subjectValue + " " + verb.base + (complement ? " " + complement : "") + " " + time.text + "?";
      parts = [isThirdSingular(subject) ? "Does" : "Do", subjectValue, verb.base];
      if (complement) parts.push(complement);
      parts.push(time.text);
    } else if (tenseId === "presente_continuo") {
      var aux = subject.bePresent.charAt(0).toUpperCase() + subject.bePresent.slice(1);
      text = aux + " " + subject.text.toLowerCase() + " " + verb.ing + (complement ? " " + complement : "") + " " + time.text + "?";
      parts = [aux, subject.text, verb.ing];
      if (complement) parts.push(complement);
      parts.push(time.text);
    } else if (tenseId === "simple_past") {
      let subjectValue = subject.text != 'I' ? subject.text.toLowerCase() : 'I';
      text = "Did " + subjectValue + " " + verb.base + (complement ? " " + complement : "") + " " + time.text + "?";
      parts = ["Did", subjectValue, verb.base];
      if (complement) parts.push(complement);
      parts.push(time.text);
    } else {
      text = "Will " + subject.text.toLowerCase() + " " + verb.base + (complement ? " " + complement : "") + " " + time.text + "?";
      parts = ["Will", subject.text, verb.base];
      if (complement) parts.push(complement);
      parts.push(time.text);
    }
    middle = parts.join(" ");
  } else if (polarity === "question_negative") {
    if (tenseId === "present_simple") {
      let subjectValue = subject.text != 'I' ? subject.text.toLowerCase() : 'I';
      text = (isThirdSingular(subject) ? "Doesn't" : "Don't") + " " + subjectValue + " " + verb.base + (complement ? " " + complement : "") + " " + time.text + "?";
      parts = [isThirdSingular(subject) ? "Doesn't" : "Don't", subjectValue, verb.base];
      if (complement) parts.push(complement);
      parts.push(time.text);
    } else if (tenseId === "presente_continuo") {
      var aux = (subject.bePresent === 'is' ? "Isn't" : (subject.bePresent === 'are' ? "Aren't" : "Aren't"));
      text = aux + " " + subject.text.toLowerCase() + " " + verb.ing + (complement ? " " + complement : "") + " " + time.text + "?";
      parts = [aux, subject.text, verb.ing];
      if (complement) parts.push(complement);
      parts.push(time.text);
    } else if (tenseId === "simple_past") {
      let subjectValue = subject.text != 'I' ? subject.text.toLowerCase() : 'I';
      text = "Didn't " + subjectValue + " " + verb.base + (complement ? " " + complement : "") + " " + time.text + "?";
      parts = ["Didn't", subjectValue, verb.base];
      if (complement) parts.push(complement);
      parts.push(time.text);
    } else {
      text = "Won't " + subject.text.toLowerCase() + " " + verb.base + (complement ? " " + complement : "") + " " + time.text + "?";
      parts = ["Won't", subject.text, verb.base];
      if (complement) parts.push(complement);
      parts.push(time.text);
    }
    middle = parts.join(" ");
  } else {
    text = subject.text + " " + withComplement(middle) + " " + time.text + ".";
    parts = [subject.text, middle];
    if (complement) parts.push(complement);
    parts.push(time.text);
  }

  return {
    middle: middle,
    complement: complement,
    parts: parts.length ? parts : [subject.text, middle, time.text],
    text: text || (subject.text + " " + middle + " " + time.text + "."),
  };
}

function clean(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[.!?]+$/, '')
    .replace(/[’‘]/g, "'")
    .replace(/\s+/g, ' ')
}

function expandContractions(text) {
  var replacements = [
    ["i'm", 'i am'],
    ["we're", 'we are'],
    ["you're", 'you are'],
    ["they're", 'they are'],
    ["i'll", 'i will'],
    ["we'll", 'we will'],
    ["you'll", 'you will'],
    ["they'll", 'they will'],
    ["he'll", 'he will'],
    ["she'll", 'she will'],
    ["it'll", 'it will'],
    ["we've", 'we have'],
    ["you've", 'you have'],
    ["they've", 'they have'],
    ["i've", 'i have'],
    ["won't", 'will not'],
    ["can't", 'can not'],
    ["couldn't", 'could not'],
    ["shouldn't", 'should not'],
    ["mustn't", 'must not'],
    ["doesn't", 'does not'],
    ["didn't", 'did not'],
    ["isn't", 'is not'],
    ["aren't", 'are not'],
    ["wasn't", 'was not'],
    ["weren't", 'were not'],
    ["haven't", 'have not'],
    ["hasn't", 'has not'],
  ]

  var result = text
  for (var i = 0; i < replacements.length; i++) {
    result = result.split(replacements[i][0]).join(replacements[i][1])
  }
  return result
}

function canonicalVariants(value) {
  var base = expandContractions(clean(value))
  var variants = [base]
  var shortForms = ["he's", "she's", "it's", "that's"]

  for (var i = 0; i < shortForms.length; i++) {
    if (base.indexOf(shortForms[i]) !== -1) {
      var withIs = base.split(shortForms[i]).join(shortForms[i].slice(0, -2) + ' is')
      var withHas = base.split(shortForms[i]).join(shortForms[i].slice(0, -2) + ' has')
      variants.push(expandContractions(withIs))
      variants.push(expandContractions(withHas))
    }
  }

  return variants
}

function firstDifference(expected, typed) {
  var left = clean(expected).split(' ')
  var right = clean(typed).split(' ')

  for (var i = 0; i < left.length; i++) {
    if (left[i] !== right[i]) {
      return {
        position: i + 1,
        expected: left[i],
        typed: right[i] || '(missing)',
      }
    }
  }

  if (right.length > left.length) {
    return { position: left.length + 1, expected: '(end)', typed: right[left.length] }
  }

  return null
}

export function evaluateSentence(tenseId, subject, verb, time, userSentence, polarity, complement) {
  polarity = polarity || "affirmative"
  var tense = getTense(tenseId) || tenses[0]
  var built = buildSentence(tenseId, subject, verb, time, polarity, complement)
  var expected = built.text
  var expectedCanonical = clean(expected)
  var typedCanonical = canonicalVariants(userSentence)
  var grammatical = typedCanonical.indexOf(expectedCanonical) !== -1

  var natural = true
  var naturalMessage = 'This combination sounds natural in English.'
  var isPreferred = time.preferred.indexOf(tenseId) !== -1
  var isAvoided = time.avoid.indexOf(tenseId) !== -1

  if (isAvoided) {
    natural = false
    naturalMessage = time.note
  } else if (!isPreferred) {
    natural = false
    naturalMessage = 'This is understandable, but not the most natural pairing. ' + time.note
  }

  var formForPolarity = (tense.form && tense.form[polarity]) ? tense.form[polarity] : (tense.form && tense.form.affirmative ? tense.form.affirmative : tense.form)
  var grammarMessage = grammatical
    ? 'The structure matches ' + tense.title + '.'
    : 'Check the structure. Pattern: ' + formForPolarity + '.'

  var difference = grammatical ? null : firstDifference(expected, userSentence)
  if (difference) {
    grammarMessage += ' Word ' + difference.position + ': expected “' + difference.expected +
      '”, found “' + difference.typed + '”.'
  }

  if (!grammatical) {
    naturalMessage = 'Fix the grammar first, then judge naturalness. Intended combination: ' + naturalMessage
  }

  return {
    grammatical: grammatical,
    natural: grammatical && natural,
    combinationNatural: natural,
    expected: expected,
    parts: built.parts,
    tense: tense,
    grammarMessage: grammarMessage,
    naturalMessage: naturalMessage,
    notes: tense.notes,
    aiPrompt: buildAiPrompt(tense, built, userSentence, grammatical, natural, naturalMessage, polarity),
  }
}

function buildAiPrompt(tense, built, userSentence, grammatical, natural, naturalMessage, polarity) {
  polarity = polarity || 'affirmative'
  var formForPolarity = (tense.form && tense.form[polarity]) ? tense.form[polarity] : (tense.form && tense.form.affirmative ? tense.form.affirmative : tense.form)
  return [
    'You are a careful English tutor.',
    '',
    'Target tense: ' + tense.title + '.',
    'Rule: ' + formForPolarity + '.',
    'Use: ' + tense.use + '.',
    'Intended combination: ' + built.text + '.',
    'My sentence: "' + String(userSentence || '').trim() + '".',
    'Offline grammar check: ' + (grammatical ? 'correct' : 'needs review') + '.',
    'Offline naturalness check: ' + (natural ? 'natural' : 'possibly unnatural') + '. ' + naturalMessage,
    '',
    'Step 1: Judge only grammatical correctness against the rule.',
    'Step 2: Judge separately whether it sounds natural to a native speaker.',
    'Step 3: If it is grammatically correct but unnatural, give a more natural alternative and explain the difference briefly.',
    'Reply in English.',
  ].join('\n')
}

export function randomCombination(tenseId) {
  var tense = getTense(tenseId) || tenses[0]
  var preferredTimes = timeExpressions.filter(function (item) {
    return item.preferred.indexOf(tense.id) !== -1
  })
  var usableTimes = timeExpressions.filter(function (item) {
    return item.avoid.indexOf(tense.id) === -1
  })
  var times = preferredTimes.length ? preferredTimes : (usableTimes.length ? usableTimes : timeExpressions)
  var verbsWithoutRead = verbs.filter(function (item) {
    return item.id !== 'read'
  })

  var complementPool = complements.filter(function (item) { return item.id !== 'none' })
  return {
    subjectId: subjects[Math.floor(Math.random() * subjects.length)].id,
    verbId: verbsWithoutRead[Math.floor(Math.random() * verbsWithoutRead.length)].id,
    timeId: times[Math.floor(Math.random() * times.length)].id,
    complementId: Math.random() < 0.7 ? complementPool[Math.floor(Math.random() * complementPool.length)].id : 'none',
  }
}
