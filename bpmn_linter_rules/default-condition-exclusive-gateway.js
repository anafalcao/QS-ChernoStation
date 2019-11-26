const {
  is
} = require('bpmnlint-utils');

/**
 * A rule that checks whether a gateway has a default flow or not
 */
module.exports = function() {

  function check(node, reporter) {

    if (!is(node, 'bpmn:Gateway')) {
      return;
    }

    const outgoing = node.outgoing || [];
    var hasDefaultFlow = false;
    outgoing.forEach((flow) => {

        if (isDefaultFlow(node, flow)) {
          hasDefaultFlow = true
        }
    });

    if (!hasDefaultFlow) {
      reporter.report(node.id, 'Gateway does not have default flow');
    }
  
  }

  return {
    check
  };

};

function isDefaultFlow(node, flow) {
  return node['default'] === flow;
}