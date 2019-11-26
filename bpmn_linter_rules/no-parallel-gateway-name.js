const {
  is
} = require('bpmnlint-utils');


/**
 * A rule that verifies that there are no conditional gateways with a single outgoing sequence flow.
 * If a condition only has 1 possible result, it is not a condition.
 */
module.exports = function() {
  function check(node, reporter) {
    if (is(node, 'bpmn:ParallelGateway') && node.name) {
      reporter.report(node.id, 'Parallel gateways should not be named');
    }
  }

  return {
    check
  };

};
