const {
  is
} = require('bpmnlint-utils');


/**
 * Rule that reports use a Timer Intermediate Event with an Event Gateway

 */
module.exports = function() {

  function check(node, reporter) {
  	 if (is(node, 'bpmn:eventGateway')) {
      return;
    }


    if (!is(node, 'bpmn:intermediateCatchEvent')) {
      reporter.report(node.id, 'Where\'s the timer after the eventGateway??!');
    }
  }

  return {
    check: check
  };
};

