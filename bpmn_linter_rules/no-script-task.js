const {
  is
} = require('bpmnlint-utils');


/**
 * Rule that reports manual tasks being used.
 */
module.exports = function() {

  function check(node, reporter) {
    if (is(node, 'bpmn:ScriptTask')) {
      reporter.report(node.id, 'Element has disallowed type bpmn:ScriptTask');
    }
  }

  return {
    check: check
  };
};
