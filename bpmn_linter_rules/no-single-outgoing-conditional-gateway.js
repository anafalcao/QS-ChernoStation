const {
  is
} = require('bpmnlint-utils');


/**
 * A rule that verifies that there are no conditional gateways with a single outgoing sequence flow.
 * If a condition only has 1 possible result, it is not a condition.
 */
module.exports = function() {

  function check(node, reporter) {
    if (!is(node, 'bpmn:ExclusiveGateway')) {
      return;
    }

    const outgoing = node.outgoing || [];

    if (outgoing.length <= 1) {
      reporter.report(node.id, 'Exclusive gateway has only 1 or no outgoing sequence flows');
    }
  }

  return {
    check
  };

};
