
const {
  is
} = require('bpmnlint-utils');

/**
 * A rule that checks the presence of an end event per scope.
 */
module.exports = function() {

  function hasEndEvent(node) {
    const flowElements = node.flowElements || [];

    return (
      flowElements.some(node => is(node, 'bpmn:EndEvent'))
    );
  }

  function check(node, reporter) {

    if (!is(node, 'bpmn:EndEvent')) {
      return;
    }

    const outgoing = node.outgoing || [];

    if (outgoing[0]) {
      reporter.report(node.id, 'End events should not have outgoing sequence flow');
    }
  }

  return { check };
};
