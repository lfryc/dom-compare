define(['./node_types'],
  function(c){

   var spaces = '  ';


   function _sortAttributes(a, b) {
      return a.nodeName < b.nodeName ? -1 : 1;
   }

   function _canonizeNode(node, indent) {

     var children = node.children || node.childNodes;

      var i = new Array(indent + 1).join(spaces), hasChildren = children.length > 0, ret;
      ret = i + "<" + node.nodeName.toLowerCase() +
                     _canonizeAttributes(node.attributes, indent + 1);

      if(hasChildren) {
         ret += ">" + _canonizeNodeList(children, indent + 2) +
            "\n" + i + "</" + node.nodeName.toLowerCase() + ">";
      } else {
         ret += " />";
      }
      return ret;
   }

   function _canonizeAttributes(attrs, indent) {

      var aList = [], ret = "";
      if (attrs && attrs.length) {

         Object.keys(attrs).map(function (i) {
            return parseInt(i, 10);
         }).filter(function (i) {
            return typeof(i) == 'number' && i >= 0;
         }).sort(function (a, b) {
            return a < b ? -1 : 1;
         }).forEach(function (k) {
            aList.push(attrs[k]);
         });
         aList.sort(_sortAttributes);
         aList.forEach(function(a){
            ret += " " + a.nodeName + "=\"" + (a.nodeValue + "").replace(/"/g, '&quot;') + "\"";
         });
      }
      return ret;
   }

   function _canonizeNodeList(array, indent) {
      var ret = '',
          i, l;
      if(array){
         l = array.length;
         for(i=0; i < l; i++) {
            ret += "\n" + canonize(array[i], indent);
         }
      }
      return ret;
   }

   function _canonizeText(nodeType, text, indent) {
      var ret = [], i = new Array(indent + 1).join(spaces);
      switch (nodeType) {
         case c.CDATA_SECTION_NODE:
            ret[0] = "<![CDATA[";
            ret[2] = "]]>";
            break;
         case c.COMMENT_NODE:
            ret[0] = "<!--";
            ret[2] = "-->";
            break;
         case c.TEXT_NODE:
            break;
      }
      if(nodeType !== c.CDATA_SECTION_NODE)
         text = text.trim();
      ret[1] = text;
      return i + ret.join('');
   }

   function canonize(node, indent) {
      indent = indent || 0;
      switch (node.nodeType) {
         case c.DOCUMENT_NODE:
            return canonize(node.documentElement, indent);
         case c.ELEMENT_NODE:
            return _canonizeNode(node, indent);
         case c.CDATA_SECTION_NODE:
            // fallthrough
         case c.COMMENT_NODE:
            // fallthrough
         case c.TEXT_NODE:
            return _canonizeText(node.nodeType, node.nodeValue, indent);
         default:
            throw Error("Node type " + node.nodeType + " serialization is not implemented");
      }

   }

   function XMLSerializer() {}

   XMLSerializer.prototype.serializeToString = function(doc) {
      return canonize(doc);
   };

    return XMLSerializer;

});