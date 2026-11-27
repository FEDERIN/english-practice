
export const timeExpressionCategories = [
  {
    id: "daily_frequency",
    label: "Daily Frequency",
    expressions: [
      "every day",
      "every morning",
      "every afternoon",
      "every evening",
      "every night",
    ],
    preferred: ["present_simple"],
    context: "habitual_action",
    note: "Used to describe habits and daily routines.",
    excludedVerbs: {
      present_simple: ["meet"]
    },
  },
  {
    id: "periodic_frequency",
    label: "Periodic Frequency",
    expressions: [
      "every week",
      "every month",
      "every year",
      "every two days",
      "every monday",
      "every weekend"
    ],
    preferred: ["present_simple"],
    context: "recurring_action",
    note: "Used to describe actions that repeat at regular intervals.",
    excludedVerbs: {
      present_simple: ["meet"]
    },
  },
  {
    id: "repeated_frequency",
    label: "Repeated Frequency",
    expressions: [
      "once a day",
      "twice a week",
      "three times a month",
    ],
    preferred: ["present_simple"],
    context: "repeated_action",
    note: "Used to specify how often an action is repeated.",
    excludedVerbs: {
      present_simple: ["meet"]
    },
  },
  {
    id: "specific_past",
    label: "Specific Past Time",
    expressions: [
      "yesterday",
      "last night",
      "last Monday",
      "last weekend",
      "last week",
      "last month",
      "last year",
      "in 2010",
      "in the 90s",
      "in the 20th century",
    ],
    preferred: ["simple_past"],
    context: "completed_past_event",
    note: "Used to refer to a specific time or completed period in the past.",
  },
  {
    id: "past_reference",
    label: "Past Reference",
    expressions: ["in the past"],
    preferred: ["simple_past", "present_perfect"],
    context: "past_experience",
    note: "Used to refer generally to past events or experiences.",
  },
  {
    id: "specific_future",
    label: "Specific Future Time",
    expressions: [
      "tomorrow",
      "next week",
      "next month",
      "next year",
      "next Monday",
      "next weekend"
    ],
    preferred: [
      "simple_future",
      "presente_continuo",
      "present_simple",
    ],
    verbExamples: {
      present_simple: [
        "leave",
        "depart",
        "start",
        "open",
        "arrive",
        "begin",
        "close",
        "finish",
      ],
    },
    context: "planned_future_event",
    note: "Used for future events, predictions, arrangements and fixed schedules.",
  },
  {
    id: "duration",
    label: "Duration",
    expressions: [
      "for two hours",
      "for three days",
      "for a week",
      "for several months",
      "for a long time",
    ],
    preferred: [
      "present_simple",
      "simple_past",
      "present_perfect",
      "present_perfect_continuous",
    ],
    context: "time_duration",
    note: "Used to express how long an action or situation lasts. The tense depends on whether the period is habitual, completed or ongoing.",
  },
  {
    id: "starting_point",
    label: "Starting Point",
    expressions: [
      "since 2020",
      "since Monday",
      "since last year",
      "since the beginning of the month",
    ],
    preferred: [
      "present_perfect",
      "present_perfect_continuous",
    ],
    context: "continuing_from_past",
    note: "Used to indicate when an action or situation began and continues up to a reference point.",
  },
  {
    id: "deadline",
    label: "Deadline",
    expressions: [
      "by Friday",
      "by next week",
      "by the end of the month",
      "by the end of the year",
    ],
    preferred: [
      "simple_future",
      "future_perfect",
    ],
    context: "completion_deadline",
    note: "Used to indicate the latest time by which something must happen or be completed.",
  },
  {
    id: "present_moment",
    label: "Present Moment",
    expressions: [
      "right now",
      "at the moment",
      "currently",
      "at present",
    ],
    preferred: [
      "presente_continuo",
      "present_simple",
    ],
    context: "current_situation",
    verbExamples: {
      present_simple: [
        "need",
        "want",
        "know",
        "understand",
        "prefer",
        "believe",
        "like",
        "love",
        "hate",
        "remember",
        "mean",
        "own",
        "belong",
        "have"
      ]
    },
    excludedVerbs: {
      presente_continuo: [
        "know",
        "want",
        "need",
        "understand",
        "prefer",
        "believe",
        "like",
        "love",
        "hate",
        "remember",
        "mean",
        "own",
        "belong",
        "have"
      ]
    },
    note: "Used to describe actions happening now and states or situations that are true at the present moment."
  },
  {
    id: "current_reference",
    label: "Current Reference",
    expressions: [
      "as of now",
      "as of today",
      "as of this moment"
    ],
    preferred: [
      "present_simple",
      "present_perfect",
      "present_perfect_continuous"
    ],
    context: "current_status",
    verbExamples: {
      present_simple: [
        "know",
        "have",
        "own",
        "believe",
        "need",
        "want"
      ],
      present_perfect: [
        "complete",
        "finish",
        "change",
        "update",
        "receive",
        "achieve"
      ],
      present_perfect_continuous: [
        "work",
        "study",
        "develop",
        "learn",
        "wait",
        "prepare"
      ]
    },
    note: "Used to describe current status, changes and situations up to the present reference point."
  },
  {
    id: "future_reference",
    label: "Future Reference",
    expressions: [
      "tomorrow at eight",
      "this time next week",
      "in two hours",
      "in three days",
      "in a week",
      "in a month",
      "in a year",
    ],
    preferred: [
      "simple_future",
      "future_continuous",
      "presente_continuo",
    ],
    context: "future_time_reference",
    note: "Used to locate an event or action at a particular point in the future.",
  },
];
