const allRules = [
  'conditional-flows',
  'default-condition-exclusive-gateway',
  'end-event-required',
  'event-sub-process-typed-start-event',
  'event-timer',
  'exclusive-gateway-interrogative-name',
  'fake-join',
  'label-required',
  'no-complex-gateway',
  'no-disconnected',
  'no-duplicate-activity-names',
  'no-duplicate-sequence-flows',
  'no-gateway-join-fork',
  'no-implicit-split',
  'no-inclusive-gateway',
  'no-outgoing-from-end-event',
  'no-parallel-gateway-name',
  'no-script-task',
  'no-single-outgoing-conditional-gateway',
  'single-blank-start-event',
  'single-event-definition',
  'start-event-required',
  'sub-process-blank-start-event',
  'single-outgoing-boundary-event',
  'no-script-task'
];


module.exports = {
  rules: allRules.reduce(function(rules, ruleName) {
    rules[ruleName] = 'error';

    return rules;
  }, {})
};
