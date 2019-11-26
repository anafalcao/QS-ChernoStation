const {
  is
} = require('bpmnlint-utils');


/**
 * A rule that verifies that there are no end events with 
 * outgoing sequence flows
 */
module.exports = function() {

  function check(node, reporter) {

    if (!is(node, 'bpmn:EndEvent')) {
      return;
    }

    const outgoing = node.outgoing || [];

    if (outgoing.length) {
      reporter.report(node.id, 'End event has a outgoing sequence flow');
    }
  }

  return {
    check
  };

};
