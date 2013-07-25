define(['./lib/compare.js', './lib/canonizer.js', './lib/revxpath.js', './lib/reporters/groupingReporter.js'],
  function(compare, canonizer, revxpath, groupingReporter){

   return {
      compare: compare,
      XMLSerializer: canonizer,
      revXPath: revxpath,
      GroupingReporter: groupingReporter
   };

});