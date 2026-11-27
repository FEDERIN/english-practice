export var verbs = [
  // Existing verbs
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

  // Education and languages
  { id: 'teach', base: 'teach', third: 'teaches', ing: 'teaching', past: 'taught', participle: 'taught' },
  { id: 'learn', base: 'learn', third: 'learns', ing: 'learning', past: 'learned', participle: 'learned' },
  { id: 'speak', base: 'speak', third: 'speaks', ing: 'speaking', past: 'spoke', participle: 'spoken' },
  { id: 'understand', base: 'understand', third: 'understands', ing: 'understanding', past: 'understood', participle: 'understood', stative: true},
  { id: 'practice', base: 'practice', third: 'practices', ing: 'practicing', past: 'practiced', participle: 'practiced' },
  { id: 'prepare', base: 'prepare', third: 'prepares', ing: 'preparing', past: 'prepared', participle: 'prepared' },
  { id: 'review', base: 'review', third: 'reviews', ing: 'reviewing', past: 'reviewed', participle: 'reviewed' },

  // Reading and writing
  { id: 'buy', base: 'buy', third: 'buys', ing: 'buying', past: 'bought', participle: 'bought' },
  { id: 'publish', base: 'publish', third: 'publishes', ing: 'publishing', past: 'published', participle: 'published' },
  { id: 'tell', base: 'tell', third: 'tells', ing: 'telling', past: 'told', participle: 'told' },

  // Travel
  { id: 'fly', base: 'fly', third: 'flies', ing: 'flying', past: 'flew', participle: 'flown' },
  { id: 'move', base: 'move', third: 'moves', ing: 'moving', past: 'moved', participle: 'moved' },
  { id: 'return', base: 'return', third: 'returns', ing: 'returning', past: 'returned', participle: 'returned' },

  // Work and communication
  { id: 'send', base: 'send', third: 'sends', ing: 'sending', past: 'sent', participle: 'sent' },
  { id: 'receive', base: 'receive', third: 'receives', ing: 'receiving', past: 'received', participle: 'received' },
  { id: 'check', base: 'check', third: 'checks', ing: 'checking', past: 'checked', participle: 'checked' },
  { id: 'delete', base: 'delete', third: 'deletes', ing: 'deleting', past: 'deleted', participle: 'deleted' },
  { id: 'create', base: 'create', third: 'creates', ing: 'creating', past: 'created', participle: 'created' },
  { id: 'edit', base: 'edit', third: 'edits', ing: 'editing', past: 'edited', participle: 'edited' },
  { id: 'save', base: 'save', third: 'saves', ing: 'saving', past: 'saved', participle: 'saved' },
  { id: 'complete', base: 'complete', third: 'completes', ing: 'completing', past: 'completed', participle: 'completed' },
  { id: 'manage', base: 'manage', third: 'manages', ing: 'managing', past: 'managed', participle: 'managed' },
  { id: 'develop', base: 'develop', third: 'develops', ing: 'developing', past: 'developed', participle: 'developed' },
  { id: 'submit', base: 'submit', third: 'submits', ing: 'submitting', past: 'submitted', participle: 'submitted' },
  { id: 'do', base: 'do', third: 'does', ing: 'doing', past: 'did', participle: 'done' },
  { id: 'attend', base: 'attend', third: 'attends', ing: 'attending', past: 'attended', participle: 'attended' },
  { id: 'organize', base: 'organize', third: 'organizes', ing: 'organizing', past: 'organized', participle: 'organized' },
  { id: 'schedule', base: 'schedule', third: 'schedules', ing: 'scheduling', past: 'scheduled', participle: 'scheduled' },
  { id: 'cancel', base: 'cancel', third: 'cancels', ing: 'canceling', past: 'canceled', participle: 'canceled' },

  // Questions and answers
  { id: 'ask', base: 'ask', third: 'asks', ing: 'asking', past: 'asked', participle: 'asked' },
  { id: 'answer', base: 'answer', third: 'answers', ing: 'answering', past: 'answered', participle: 'answered' },
  { id: 'give', base: 'give', third: 'gives', ing: 'giving', past: 'gave', participle: 'given' },

  // Household and objects
  { id: 'fix', base: 'fix', third: 'fixes', ing: 'fixing', past: 'fixed', participle: 'fixed' },
  { id: 'wash', base: 'wash', third: 'washes', ing: 'washing', past: 'washed', participle: 'washed' },
  { id: 'clean', base: 'clean', third: 'cleans', ing: 'cleaning', past: 'cleaned', participle: 'cleaned' },
  { id: 'drive', base: 'drive', third: 'drives', ing: 'driving', past: 'drove', participle: 'driven' },
  { id: 'sell', base: 'sell', third: 'sells', ing: 'selling', past: 'sold', participle: 'sold' },
  { id: 'paint', base: 'paint', third: 'paints', ing: 'painting', past: 'painted', participle: 'painted' },
  { id: 'decorate', base: 'decorate', third: 'decorates', ing: 'decorating', past: 'decorated', participle: 'decorated' },
  { id: 'close', base: 'close', third: 'closes', ing: 'closing', past: 'closed', participle: 'closed' },
  { id: 'lock', base: 'lock', third: 'locks', ing: 'locking', past: 'locked', participle: 'locked' },
  { id: 'unlock', base: 'unlock', third: 'unlocks', ing: 'unlocking', past: 'unlocked', participle: 'unlocked' },
  { id: 'break', base: 'break', third: 'breaks', ing: 'breaking', past: 'broke', participle: 'broken' },

  // Food
  { id: 'eat', base: 'eat', third: 'eats', ing: 'eating', past: 'ate', participle: 'eaten' },
  { id: 'make', base: 'make', third: 'makes', ing: 'making', past: 'made', participle: 'made' },
  { id: 'cook', base: 'cook', third: 'cooks', ing: 'cooking', past: 'cooked', participle: 'cooked' },
  { id: 'have', base: 'have', third: 'has', ing: 'having', past: 'had', participle: 'had', stative: true},
  { id: 'order', base: 'order', third: 'orders', ing: 'ordering', past: 'ordered', participle: 'ordered' },

  // Entertainment
  { id: 'watch', base: 'watch', third: 'watches', ing: 'watching', past: 'watched', participle: 'watched' },
  { id: 'enjoy', base: 'enjoy', third: 'enjoys', ing: 'enjoying', past: 'enjoyed', participle: 'enjoyed' },
  { id: 'rent', base: 'rent', third: 'rents', ing: 'renting', past: 'rented', participle: 'rented' },
  { id: 'listen', base: 'listen', third: 'listens', ing: 'listening', past: 'listened', participle: 'listened' },
  { id: 'play', base: 'play', third: 'plays', ing: 'playing', past: 'played', participle: 'played' },
  { id: 'compose', base: 'compose', third: 'composes', ing: 'composing', past: 'composed', participle: 'composed' },
  { id: 'sing', base: 'sing', third: 'sings', ing: 'singing', past: 'sang', participle: 'sung' },
  { id: 'record', base: 'record', third: 'records', ing: 'recording', past: 'recorded', participle: 'recorded' },

  // People
  { id: 'visit', base: 'visit', third: 'visits', ing: 'visiting', past: 'visited', participle: 'visited' },
  { id: 'help', base: 'help', third: 'helps', ing: 'helping', past: 'helped', participle: 'helped' },
  { id: 'meet', base: 'meet', third: 'meets', ing: 'meeting', past: 'met', participle: 'met' },
  { id: 'invite', base: 'invite', third: 'invites', ing: 'inviting', past: 'invited', participle: 'invited' },

  // Infinitive-taking verbs (want, need, hope, plan, decide, expect, promise, agree, refuse, would like)
  { id: 'hope', base: 'hope', third: 'hopes', ing: 'hoping', past: 'hoped', participle: 'hoped', takesInfinitive: true },
  { id: 'plan', base: 'plan', third: 'plans', ing: 'planning', past: 'planned', participle: 'planned', takesInfinitive: true },
  { id: 'decide', base: 'decide', third: 'decides', ing: 'deciding', past: 'decided', participle: 'decided', takesInfinitive: true },
  { id: 'expect', base: 'expect', third: 'expects', ing: 'expecting', past: 'expected', participle: 'expected', takesInfinitive: true },
  { id: 'promise', base: 'promise', third: 'promises', ing: 'promising', past: 'promised', participle: 'promised', takesInfinitive: true },
  { id: 'agree', base: 'agree', third: 'agrees', ing: 'agreeing', past: 'agreed', participle: 'agreed', takesInfinitive: true },
  { id: 'refuse', base: 'refuse', third: 'refuses', ing: 'refusing', past: 'refused', participle: 'refused', takesInfinitive: true },
  { id: 'would_like', base: 'would like', third: 'would like', ing: 'would be liking', past: 'would have liked', participle: 'would have liked', takesInfinitive: true, modal: true },

  // Additional daily activities
  { id: 'sleep', base: 'sleep', third: 'sleeps', ing: 'sleeping', past: 'slept', participle: 'slept' },
  { id: 'run', base: 'run', third: 'runs', ing: 'running', past: 'ran', participle: 'run' },
  { id: 'walk', base: 'walk', third: 'walks', ing: 'walking', past: 'walked', participle: 'walked' },
  { id: 'exercise', base: 'exercise', third: 'exercises', ing: 'exercising', past: 'exercised', participle: 'exercised' },

  // State verbs and changes (referenced by the time expression filters)
  { id: 'need', base: 'need', third: 'needs', ing: 'needing', past: 'needed', participle: 'needed', takesInfinitive: true, stative: true},
  { id: 'want', base: 'want', third: 'wants', ing: 'wanting', past: 'wanted', participle: 'wanted', takesInfinitive: true, stative: true},
  { id: 'know', base: 'know', third: 'knows', ing: 'knowing', past: 'knew', participle: 'known', stative: true},
  { id: 'prefer', base: 'prefer', third: 'prefers', ing: 'preferring', past: 'preferred', participle: 'preferred', stative: true},
  { id: 'believe', base: 'believe', third: 'believes', ing: 'believing', past: 'believed', participle: 'believed', stative: true},
  { id: 'like', base: 'like', third: 'likes', ing: 'liking', past: 'liked', participle: 'liked', stative: true},
  { id: 'love', base: 'love', third: 'loves', ing: 'loving', past: 'loved', participle: 'loved', stative: true},
  { id: 'hate', base: 'hate', third: 'hates', ing: 'hating', past: 'hated', participle: 'hated', stative: true},
  { id: 'remember', base: 'remember', third: 'remembers', ing: 'remembering', past: 'remembered', participle: 'remembered', stative: true},
  { id: 'mean', base: 'mean', third: 'means', ing: 'meaning', past: 'meant', participle: 'meant', stative: true},
  { id: 'own', base: 'own', third: 'owns', ing: 'owning', past: 'owned', participle: 'owned', stative: true},
  { id: 'belong', base: 'belong', third: 'belongs', ing: 'belonging', past: 'belonged', participle: 'belonged', stative: true},
  { id: 'begin', base: 'begin', third: 'begins', ing: 'beginning', past: 'began', participle: 'begun' },
  { id: 'change', base: 'change', third: 'changes', ing: 'changing', past: 'changed', participle: 'changed' },
  { id: 'update', base: 'update', third: 'updates', ing: 'updating', past: 'updated', participle: 'updated' },
  { id: 'achieve', base: 'achieve', third: 'achieves', ing: 'achieving', past: 'achieved', participle: 'achieved' }
];
