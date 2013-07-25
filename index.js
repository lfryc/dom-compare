define(['./lib/compare', './lib/canonizer', './lib/revxpath', './lib/reporters/groupingReporter'],
  function(compare, canonizer, revxpath, groupingReporter){

   return {
      compare: compare,
      XMLSerializer: canonizer,
      revXPath: revxpath,
      GroupingReporter: groupingReporter
   };

});