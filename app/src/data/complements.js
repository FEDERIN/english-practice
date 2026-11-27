
export var complements = [
  // No direct complement
  {
    id: 'none',
    text: '',
    verbs: [
      'study', 'work', 'wait', 'read', 'travel',
      'write', 'swim', 'finish', 'call', 'sleep',
      'run', 'walk', 'exercise', 'arrive', 'leave'
    ]
  },

  // Languages
  { id: 'english', text: 'English', verbs: ['study', 'teach', 'learn', 'speak', 'understand', 'practice'] },
  { id: 'french', text: 'French', verbs: ['study', 'teach', 'learn', 'speak', 'understand', 'practice'] },
  { id: 'spanish', text: 'Spanish', verbs: ['study', 'teach', 'learn', 'speak', 'understand', 'practice'] },
  { id: 'german', text: 'German', verbs: ['study', 'teach', 'learn', 'speak', 'understand', 'practice'] },
  { id: 'italian', text: 'Italian', verbs: ['study', 'teach', 'learn', 'speak', 'understand', 'practice'] },

  // Subjects
  { id: 'math', text: 'math', verbs: ['study', 'teach', 'learn'] },
  { id: 'science', text: 'science', verbs: ['study', 'teach', 'learn'] },
  { id: 'history', text: 'history', verbs: ['study', 'teach', 'learn'] },

  // Books and reading
  { id: 'the_book', text: 'the book', verbs: ['read', 'write', 'buy', 'open', 'finish'] },
  { id: 'the_newspaper', text: 'the newspaper', verbs: ['read', 'buy'] },
  { id: 'the_article', text: 'the article', verbs: ['read', 'write', 'publish'] },
  { id: 'the_story', text: 'the story', verbs: ['read', 'write', 'tell'] },

  // Travel
  { id: 'to_mexico', text: 'to Mexico', verbs: ['travel', 'fly', 'move', 'return'] },
  { id: 'to_the_usa', text: 'to the USA', verbs: ['travel', 'fly', 'move', 'return'] },
  { id: 'to_canada', text: 'to Canada', verbs: ['travel', 'fly', 'move', 'return'] },
  { id: 'to_europe', text: 'to Europe', verbs: ['travel', 'fly', 'move', 'return'] },
  { id: 'to_asia', text: 'to Asia', verbs: ['travel', 'fly', 'move', 'return'] },
  { id: 'to_another_country', text: 'to another country', verbs: ['travel', 'fly', 'move', 'return'] },

  // Work and communication
  { id: 'the_report', text: 'the report', verbs: ['write', 'read', 'finish', 'prepare', 'review', 'send'] },
  { id: 'the_email', text: 'the email', verbs: ['write', 'read', 'send', 'receive', 'check', 'delete'] },
  { id: 'the_message', text: 'the message', verbs: ['write', 'read', 'send', 'receive', 'check', 'delete'] },
  { id: 'the_document', text: 'the document', verbs: ['write', 'read', 'create', 'edit', 'review', 'save'] },
  { id: 'the_project', text: 'the project', verbs: ['finish', 'complete', 'start', 'manage', 'develop'] },
  { id: 'the_assignment', text: 'the assignment', verbs: ['do', 'finish', 'complete', 'submit', 'check'] },
  { id: 'the_task', text: 'the task', verbs: ['do', 'finish', 'complete', 'start'] },
  { id: 'the_meeting', text: 'the meeting', verbs: ['attend', 'organize', 'schedule', 'cancel'] },

  // Education
  { id: 'the_lesson', text: 'the lesson', verbs: ['study', 'teach', 'learn', 'prepare', 'review'] },
  { id: 'the_homework', text: 'the homework', verbs: ['do', 'finish', 'complete', 'check'] },
  { id: 'the_exercise', text: 'the exercise', verbs: ['do', 'finish', 'complete', 'repeat'] },
  { id: 'the_question', text: 'the question', verbs: ['ask', 'answer', 'understand'] },
  { id: 'the_answer', text: 'the answer', verbs: ['write', 'read', 'check', 'give'] },

  // Household and objects
  { id: 'the_car', text: 'the car', verbs: ['fix', 'wash', 'clean', 'drive', 'buy'] },
  { id: 'on_the_car', text: 'on the car', verbs: ['work'] },
  { id: 'the_house', text: 'the house', verbs: ['clean', 'paint', 'buy', 'sell'] },
  { id: 'the_room', text: 'the room', verbs: ['clean', 'paint', 'decorate'] },
  { id: 'the_window', text: 'the window', verbs: ['open', 'close', 'clean', 'break'] },
  { id: 'the_door', text: 'the door', verbs: ['open', 'close', 'lock', 'unlock'] },
  { id: 'the_dishes', text: 'the dishes', verbs: ['wash', 'clean', 'do'] },

  // Food
  { id: 'breakfast', text: 'breakfast', verbs: ['eat', 'make', 'prepare', 'cook', 'have'] },
  { id: 'lunch', text: 'lunch', verbs: ['eat', 'make', 'prepare', 'cook', 'have'] },
  { id: 'dinner', text: 'dinner', verbs: ['eat', 'make', 'prepare', 'cook', 'have'] },
  { id: 'the_food', text: 'the food', verbs: ['eat', 'cook', 'prepare', 'buy', 'order'] },

  // Entertainment
  { id: 'a_movie', text: 'a movie', verbs: ['watch', 'enjoy', 'rent'] },
  { id: 'a_tv_show', text: 'a TV show', verbs: ['watch', 'enjoy'] },
  { id: 'music', text: 'music', verbs: ['listen to', 'play', 'enjoy', 'compose'] },
  { id: 'the_guitar', text: 'the guitar', verbs: ['play', 'learn', 'practice'] },
  { id: 'a_song', text: 'a song', verbs: ['sing', 'write', 'compose', 'record'] },

  // People
  { id: 'my_friend', text: 'my friend', verbs: ['call', 'visit', 'help', 'invite'] },
  { id: 'my_family', text: 'my family', verbs: ['call', 'visit', 'help'] },
  { id: 'a_friend', text: 'a friend', verbs: ['call', 'visit', 'help', 'invite'] },

  // States and roles (used with "be")
  { id: 'happy', text: 'happy', verbs: ['be'] },
  { id: 'ready', text: 'ready', verbs: ['be'] },
  { id: 'free', text: 'free', verbs: ['be'] },
  { id: 'sure', text: 'sure', verbs: ['be'] },
  { id: 'a_doctor', text: 'a doctor', verbs: ['be'] },
  { id: 'a_teacher', text: 'a teacher', verbs: ['be'] },,

  // Meeting new people
  { id: 'new_customers', text: 'new customers', verbs: ['meet'] },
  { id: 'new_providers', text: 'new providers', verbs: ['meet'] },
];
