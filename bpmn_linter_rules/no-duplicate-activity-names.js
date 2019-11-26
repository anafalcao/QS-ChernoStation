const {
  isAny
} = require('bpmnlint-utils');


/**
 * A rule that checks if there are activities with duplicate names
 */
module.exports = function() {
  activityNames = [];
  hasDuplicates = false;
  hasFired = false;
  function check(node, reporter) {

    // ignore data objects and artifacts for now
    if (isAny(node, [
      'bpmn:ServiceTask',
      'bpmn:SendTask',
      'bpmn:ReceiveTask',
      'bpmn:UserTask',
      'bpmn:ManualTask',
      'bpmn:BusinessRuleTask',
      'bpmn:ScriptTask',
    ])) {

      const name = (node.name || '').trim();

      activityNames.push(name);
 
    }

    if (checkIfDuplicateExists(activityNames) && !hasFired) {
      reporter.report(node.id, 'There are duplicate activity names');  
      hasFired = true;  
    }
  }

  return { check };
};

function checkIfDuplicateExists(w){
  return new Set(w).size !== w.length 
}