/* 
 * ASS: Locação de Imóvel
 * DOC: 5231041
 * MOD: xmlParser.js
 * 
 * Moddle para XML SAV parser
 * 
 * versão 2017.06.02.1
 */

/*try{*/
  (function () { 
    console.log('xmlParser.js - rev 02');
    
    var evBus = window.j2.mod.eventBus.EventBus;
    var wm = window.j2.mod._;

    wm._19 = function (){
      function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      };

      function lower(string) {
        return string.charAt(0).toLowerCase() + string.slice(1);
      };

      function hasLowerCaseAlias(pkg) {
        return pkg.xml && pkg.xml.tagAlias === 'lowerCase';
      };


      var aliasToName = function (alias, pkg) {
        if (hasLowerCaseAlias(pkg)) {
          return capitalize(alias);
        } else {
          return alias;
        }
      };

      var nameToAlias = function (name, pkg) {
        if (hasLowerCaseAlias(pkg)) {
          return lower(name);
        } else {
          return name;
        }
      };

      var DEFAULT_NS_MAP = {
        'xsi': 'http://www.w3.org/2001/XMLSchema-instance'
      };
      
      var XSI_TYPE = 'xsi:type';

      function serializeFormat(element) {
        return element.xml && element.xml.serialize;
      };

      var serializeAsType = function (element) {
        return serializeFormat(element) === XSI_TYPE;
      };

      var serializeAsProperty = function (element) {
        return serializeFormat(element) === 'property';
      };
      
      return  {
        'DEFAULT_NS_MAP' :DEFAULT_NS_MAP,
        'nameToAlias' : nameToAlias,
        'aliasToName' : aliasToName, 
        'XSI_TYPE' : XSI_TYPE,
        'serializeAsType' : serializeAsType,
        'serializeAsProperty' : serializeAsProperty
      };
    };
    
    wm._20 = function (){
      var reduce = new window.j2.mod._._96,
          forEach = new window.j2.mod._._92,
          find = new window.j2.mod._._91,
          assign = new window.j2.mod._._206,
          defer = new window.j2.mod._._101;

      var Stack = new window.j2.mod._._23,
          SaxParser = (new window.j2.mod._._22).parser,
          Moddle = new window.j2.mod._._24,
          parseNameNs = new window.j2.mod._._29;
          Types = new window.j2.mod._._32,
          coerceType = Types.coerceType,
          isSimpleType = Types.isSimple,
          common = new window.j2.mod._._19,
          XSI_TYPE = common.XSI_TYPE,
          XSI_URI = common.DEFAULT_NS_MAP.xsi,
          serializeAsType = common.serializeAsType,
          aliasToName = common.aliasToName;


      function parseNodeAttributes(node) {
        var nodeAttrs = node.attributes;

        return reduce(nodeAttrs, function (result, v, k) {
          var name, ns;

          if (!v.local) {
            name = v.prefix;
          } else {
            ns = parseNameNs(v.name, v.prefix);
            name = ns.name;
          }

          result[name] = v.value;
          return result;
        }, {});
      };

      function normalizeType(node, attr, model) {
        var nameNs = parseNameNs(attr.value);

        var uri = node.ns[nameNs.prefix || ''],
            localName = nameNs.localName,
            pkg = uri && model.getPackage(uri),
            typePrefix;

        if (pkg) {
          typePrefix = pkg.xml && pkg.xml.typePrefix;

          if (typePrefix && localName.indexOf(typePrefix) === 0) {
            localName = localName.slice(typePrefix.length);
          }

          attr.value = pkg.prefix + ':' + localName;
        }
      };

      function isBpvaType(node, bpvaNamespace) {
        if (bpvaNamespace == null)
          return false;

        if (node.prefix != '')
          return false;

        var rs = false;
        forEach(bpvaNamespace.types, function (type) {
          if (type.name == node.name)
            rs = true;
        });
        return rs;
      };

      function normalizeNamespaces(node, model, defaultNsUri) {
        var uri, prefix;

        uri = node.uri || defaultNsUri;

        if (uri) {
          var pkg = model.getPackage(uri);

          if (node.prefix === 'j2' || isBpvaType(node, model.registry.packageMap.j2 || null)) {
            prefix = model.registry.packageMap.j2.prefix;
            uri = model.registry.packageMap.j2.uri;
          }
          else if (pkg)
            prefix = pkg.prefix;
          else
            prefix = node.prefix;


          node.prefix = prefix;
          node.uri = uri;
        }

        forEach(node.attributes, function (attr) {

          if (attr.uri === XSI_URI && attr.local === 'type') {
            normalizeType(node, attr, model);
          }

          normalizeNamespaces(attr, model, null);
        });
      };


      function error(message) {
        return new Error(message);
      };

      function getModdleDescriptor(element) {
        return element.$descriptor;
      };

      function Context(options) {

        assign(this, options);

        this.elementsById = {};
        this.references = [];
        this.warnings = [];

        this.addReference = function (reference) {
          this.references.push(reference);
        };

        this.addElement = function (element) {

          if (!element) {
            throw error('expected element');
          }

          var elementsById = this.elementsById;

          var descriptor = getModdleDescriptor(element);

          var idProperty = descriptor.idProperty,
              id;

          if (idProperty) {
            id = element.get(idProperty.name);

            if (id) {

              if (elementsById[id]) {
                throw error('duplicate ID <' + id + '>');
              }

              elementsById[id] = element;
            }
          }
        };

        this.addWarning = function (warning) {
          this.warnings.push(warning);
        };
      };

      function BaseHandler() { };

      BaseHandler.prototype.handleEnd = function () { };
      BaseHandler.prototype.handleText = function () { };
      BaseHandler.prototype.handleNode = function () { };

      function NoopHandler() { };

      NoopHandler.prototype = new BaseHandler();

      NoopHandler.prototype.handleNode = function () {
        return this;
      };

      function BodyHandler() { };

      BodyHandler.prototype = new BaseHandler();

      BodyHandler.prototype.handleText = function (text) {
        this.body = (this.body || '') + text;
      };

      function ReferenceHandler(property, context) {
        this.property = property;
        this.context = context;
      };

      ReferenceHandler.prototype = new BodyHandler();

      ReferenceHandler.prototype.handleNode = function (node) {

        if (this.element) {
          throw error('expected no sub nodes');
        } else {
          this.element = this.createReference(node);
        }

        return this;
      };

      ReferenceHandler.prototype.handleEnd = function () {
        this.element.id = this.body;
      };

      ReferenceHandler.prototype.createReference = function (node) {
        return {
          property: this.property.ns.name,
          id: ''
        };
      };

      function ValueHandler(propertyDesc, element) {
        this.element = element;
        this.propertyDesc = propertyDesc;
      };

      ValueHandler.prototype = new BodyHandler();

      ValueHandler.prototype.handleEnd = function () {

        var value = this.body,
            element = this.element,
            propertyDesc = this.propertyDesc;

        value = coerceType(propertyDesc.type, value);

        if (propertyDesc.isMany) {
          element.get(propertyDesc.name).push(value);
        } else {
          element.set(propertyDesc.name, value);
        }
      };


      function BaseElementHandler() { };

      BaseElementHandler.prototype = Object.create(BodyHandler.prototype);

      BaseElementHandler.prototype.handleNode = function (node) {
        var parser = this,
            element = this.element;

        if (!element) {
          element = this.element = this.createElement(node);

          this.context.addElement(element);
        } else {
          parser = this.handleChild(node);
        }

        return parser;
      };

      function ElementHandler(model, type, context) {
        this.model = model;
        this.type = model.getType(type);
        this.context = context;
      };

      ElementHandler.prototype = new BaseElementHandler();

      ElementHandler.prototype.addReference = function (reference) {
        this.context.addReference(reference);
      };

      ElementHandler.prototype.handleEnd = function () {

        var value = this.body,
            element = this.element,
            descriptor = getModdleDescriptor(element),
            bodyProperty = descriptor.bodyProperty;

        if (bodyProperty && value !== undefined) {
          value = coerceType(bodyProperty.type, value);
          element.set(bodyProperty.name, value);
        }
      };

      ElementHandler.prototype.createElement = function (node) {
        var attributes = parseNodeAttributes(node),
            Type = this.type,
            descriptor = getModdleDescriptor(Type),
            context = this.context,
            instance = new Type({});

        forEach(attributes, function (value, name) {

          var prop = descriptor.propertiesByName[name],
              values;

          if (prop && prop.isReference) {

            if (!prop.isMany) {
              context.addReference({
                element: instance,
                property: prop.ns.name,
                id: value
              });
            } else {
              
              values = value.split(' ');

              forEach(values, function (v) {
                context.addReference({
                  element: instance,
                  property: prop.ns.name,
                  id: v
                });
              });
            }

          } else {
            if (prop) {
              value = coerceType(prop.type, value);
            }

            instance.set(name, value);
          }
        });

        return instance;
      };

      ElementHandler.prototype.getPropertyForNode = function (node) {

        var nameNs = parseNameNs(node.local, node.prefix);

        var type = this.type,
            model = this.model,
            descriptor = getModdleDescriptor(type);

        var propertyName = nameNs.name,
            property = descriptor.propertiesByName[propertyName],
            elementTypeName,
            elementType,
            typeAnnotation;

        

        if (property) {

          if (serializeAsType(property)) {
            typeAnnotation = node.attributes[XSI_TYPE];

            if (typeAnnotation) {

              elementTypeName = typeAnnotation.value;

              elementType = model.getType(elementTypeName);

              return assign({}, property, { effectiveType: getModdleDescriptor(elementType).name });
            }
          }

          return property;
        }


        var pkg = model.getPackage(nameNs.prefix);

        if (pkg) {
          elementTypeName = nameNs.prefix + ':' + aliasToName(nameNs.localName, descriptor.$pkg);
          elementType = model.getType(elementTypeName);

          property = find(descriptor.properties, function (p) {
            return !p.isVirtual && !p.isReference && !p.isAttribute && elementType.hasType(p.type);
          });

          if (property) {
            return assign({}, property, { effectiveType: getModdleDescriptor(elementType).name });
          }
        } else {

          property = find(descriptor.properties, function (p) {
            return !p.isReference && !p.isAttribute && p.type === 'Element';
          });

          if (property) {
            return property;
          }
        }

        throw error('unrecognized element <' + nameNs.name + '>');
      };

      ElementHandler.prototype.toString = function () {
        return 'ElementDescriptor[' + getModdleDescriptor(this.type).name + ']';
      };

      ElementHandler.prototype.valueHandler = function (propertyDesc, element) {
        return new ValueHandler(propertyDesc, element);
      };

      ElementHandler.prototype.referenceHandler = function (propertyDesc) {
        return new ReferenceHandler(propertyDesc, this.context);
      };

      ElementHandler.prototype.handler = function (type) {
        if (type === 'Element') {
          return new GenericElementHandler(this.model, type, this.context);
        } else {
          return new ElementHandler(this.model, type, this.context);
        }
      };

      ElementHandler.prototype.handleChild = function (node) {
        var propertyDesc, type, element, childHandler;

        propertyDesc = this.getPropertyForNode(node);
        element = this.element;

        type = propertyDesc.effectiveType || propertyDesc.type;

        if (isSimpleType(type)) {
          return this.valueHandler(propertyDesc, element);
        }

        if (propertyDesc.isReference) {
          childHandler = this.referenceHandler(propertyDesc).handleNode(node);
        } else {
          childHandler = this.handler(type).handleNode(node);
        }

        var newElement = childHandler.element;

        if (newElement !== undefined) {

          if (propertyDesc.isMany) {
            element.get(propertyDesc.name).push(newElement);
          } else {
            element.set(propertyDesc.name, newElement);
          }

          if (propertyDesc.isReference) {
            assign(newElement, {
              element: element
            });

            this.context.addReference(newElement);
          } else {
            
            newElement.$parent = element;
          }
        }

        return childHandler;
      };


      function GenericElementHandler(model, type, context) {
        this.model = model;
        this.context = context;
      };

      GenericElementHandler.prototype = Object.create(BaseElementHandler.prototype);

      GenericElementHandler.prototype.createElement = function (node) {

        var name = node.name,
            prefix = node.prefix,
            uri = node.ns[prefix],
            attributes = node.attributes;

        return this.model.createAny(name, uri, attributes);
      };

      GenericElementHandler.prototype.handleChild = function (node) {

        var handler = new GenericElementHandler(this.model, 'Element', this.context).handleNode(node),
            element = this.element;

        var newElement = handler.element,
            children;

        if (newElement !== undefined) {
          children = element.$children = element.$children || [];
          children.push(newElement);

          newElement.$parent = element;
        }

        return handler;
      };

      GenericElementHandler.prototype.handleText = function (text) {
        this.body = this.body || '' + text;
      };

      GenericElementHandler.prototype.handleEnd = function () {
        if (this.body) {
          this.element.$body = this.body;
        }
      };

      function XMLReader(options) {

        if (options instanceof Moddle) {
          options = {
            model: options
          };
        }

        assign(this, { lax: false }, options);
      };


      XMLReader.prototype.fromXML = function (xml, options, done) {

        var rootHandler = options.rootHandler;

        if (options instanceof ElementHandler) {
          
          rootHandler = options;
          options = {};
        } else {
          if (typeof options === 'string') {
            
            rootHandler = this.handler(options);
            options = {};
          } else if (typeof rootHandler === 'string') {
            
            rootHandler = this.handler(rootHandler);
          }
        }

        var model = this.model,
            lax = this.lax;

        var context = new Context(assign({}, options, { rootHandler: rootHandler })),
            parser = new SaxParser(true, { xmlns: true, trim: true }),
            stack = new Stack();

        rootHandler.context = context;

        stack.push(rootHandler);


        function resolveReferences() {

          var elementsById = context.elementsById;
          var references = context.references;

          var i, r;

          for (i = 0; !!(r = references[i]) ; i++) {
            var element = r.element;
            var reference = elementsById[r.id];
            var property = getModdleDescriptor(element).propertiesByName[r.property];

            if (!reference) {
              context.addWarning({
                message: 'unresolved reference <' + r.id + '>',
                element: r.element,
                property: r.property,
                value: r.id
              });
            }

            if (property.isMany) {
              var collection = element.get(property.name),
                  idx = collection.indexOf(r);

              if (idx === -1) {
                idx = collection.length;
              }

              if (!reference) {
                collection.splice(idx, 1);
              } else {
                collection[idx] = reference;
              }
            } else {
              element.set(property.name, reference);
            }
          }
        };

        function handleClose(tagName) {
          stack.pop().handleEnd();
        };

        function handleOpen(node) {
          var handler = stack.peek();

          normalizeNamespaces(node, model);

          try {
            stack.push(handler.handleNode(node));
          } catch (e) {

            var line = this.line,
                column = this.column;

            var message =
              'unparsable content <' + node.name + '> detected\n\t' +
                'line: ' + line + '\n\t' +
                'column: ' + column + '\n\t' +
                'nested error: ' + e.message;

            if (lax) {
              context.addWarning({
                message: message,
                error: e
              });

              console.warn('could not parse node');
              console.warn(e);

              stack.push(new NoopHandler());
            } else {
              console.error('could not parse document');
              console.error(e);

              throw error(message);
            }
          }
        };

        function handleText(text) {
          stack.peek().handleText(text);
        };

        parser.onopentag = handleOpen;
        parser.oncdata = parser.ontext = handleText;
        parser.onclosetag = handleClose;
        parser.onend = resolveReferences;

        defer(function () {
          var error;

          try {
            parser.write(xml).close();
          } catch (e) {
            error = e;
          }

          done(error, error ? undefined : rootHandler.element, context);
        });
      };

      XMLReader.prototype.handler = function (name) {
        return new ElementHandler(this.model, name);
      };

      var __ = ElementHandler;
      
      return {
        'XMLReader' : XMLReader,
        'ElementHandler' : __
      };
    };
    
    wm._22 = function (){
      var sax = {};

          sax.parser = function (strict, opt) { return new SAXParser(strict, opt); };
          sax.SAXParser = SAXParser;
          sax.SAXStream = SAXStream;
          sax.createStream = createStream;

          sax.MAX_BUFFER_LENGTH = 64 * 1024;

          var buffers = [
            "comment", "sgmlDecl", "textNode", "tagName", "doctype",
            "procInstName", "procInstBody", "entity", "attribName",
            "attribValue", "cdata", "script"
          ];

          sax.EVENTS = 
            ["text"
            , "processinginstruction"
            , "sgmldeclaration"
            , "doctype"
            , "comment"
            , "attribute"
            , "opentag"
            , "closetag"
            , "opencdata"
            , "cdata"
            , "closecdata"
            , "error"
            , "end"
            , "ready"
            , "script"
            , "opennamespace"
            , "closenamespace"
            ];

          function SAXParser(strict, opt) {
            if (!(this instanceof SAXParser)) return new SAXParser(strict, opt);

            var parser = this;
            clearBuffers(parser);
            parser.q = parser.c = "";
            parser.bufferCheckPosition = sax.MAX_BUFFER_LENGTH;
            parser.opt = opt || {};
            parser.opt.lowercase = parser.opt.lowercase || parser.opt.lowercasetags;
            parser.looseCase = parser.opt.lowercase ? "toLowerCase" : "toUpperCase";
            parser.tags = [];
            parser.closed = parser.closedRoot = parser.sawRoot = false;
            parser.tag = parser.error = null;
            parser.strict = !!strict;
            parser.noscript = !!(strict || parser.opt.noscript);
            parser.state = S.BEGIN;
            parser.ENTITIES = Object.create(sax.ENTITIES);
            parser.attribList = [];

            if (parser.opt.xmlns) parser.ns = Object.create(rootNS);

            parser.trackPosition = parser.opt.position !== false;
            if (parser.trackPosition) {
              parser.position = parser.line = parser.column = 0;
            }
            emit(parser, "onready");
          };

          if (!Object.create) Object.create = function (o) {
            function f() { this.__proto__ = o; };
            f.prototype = o;
            return new f;
          };

          if (!Object.getPrototypeOf) Object.getPrototypeOf = function (o) {
            return o.__proto__;
          };

          if (!Object.keys) Object.keys = function (o) {
            var a = [];
            for (var i in o) if (o.hasOwnProperty(i)) a.push(i);
            return a;
          };

          function checkBufferLength(parser) {
            var maxAllowed = Math.max(sax.MAX_BUFFER_LENGTH, 10)
              , maxActual = 0;
            for (var i = 0, l = buffers.length; i < l; i++) {
              var len = parser[buffers[i]].length;
              if (len > maxAllowed) {
                switch (buffers[i]) {
                  case "textNode":
                    closeText(parser);
                    break;

                  case "cdata":
                    emitNode(parser, "oncdata", parser.cdata);
                    parser.cdata = "";
                    break;

                  case "script":
                    emitNode(parser, "onscript", parser.script);
                    parser.script = "";
                    break;

                  default:
                    error(parser, "Max buffer length exceeded: " + buffers[i]);
                }
              }
              maxActual = Math.max(maxActual, len);
            }
            
            parser.bufferCheckPosition = (sax.MAX_BUFFER_LENGTH - maxActual)
                                       + parser.position;
          };

          function clearBuffers(parser) {
            for (var i = 0, l = buffers.length; i < l; i++) {
              parser[buffers[i]] = "";
            }
          };

          function flushBuffers(parser) {
            closeText(parser);
            if (parser.cdata !== "") {
              emitNode(parser, "oncdata", parser.cdata);
              parser.cdata = "";
            }
            if (parser.script !== "") {
              emitNode(parser, "onscript", parser.script);
              parser.script = "";
            }
          };

          SAXParser.prototype =
            {
              end: function () { end(this); }
            , write: write
            , resume: function () { this.error = null; return this; }
            , close: function () { return this.write(null); }
            , flush: function () { flushBuffers(this); }
            };

          try {
            var Stream = wm._stream.Stream;
          } catch (ex) {
            var Stream = function () { };
          }


          var streamWraps = sax.EVENTS.filter(function (ev) {
            return ev !== "error" && ev !== "end";
          });

          function createStream(strict, opt) {
            return new SAXStream(strict, opt);
          };

          function SAXStream(strict, opt) {
            if (!(this instanceof SAXStream)) return new SAXStream(strict, opt);

            Stream.apply(this);

            this._parser = new SAXParser(strict, opt);
            this.writable = true;
            this.readable = true;


            var me = this;

            this._parser.onend = function () {
              me.emit("end");
            };

            this._parser.onerror = function (er) {
              me.emit("error", er);

              me._parser.error = null;
            };

            this._decoder = null;

            streamWraps.forEach(function (ev) {
              Object.defineProperty(me, "on" + ev, {
                get: function () { return me._parser["on" + ev]; },
                set: function (h) {
                  if (!h) {
                    me.removeAllListeners(ev);
                    return me._parser["on" + ev] = h;
                  }
                  me.on(ev, h);
                },
                enumerable: true,
                configurable: false
              });
            });
          };

          SAXStream.prototype = Object.create(Stream.prototype,
            { constructor: { value: SAXStream } });

          SAXStream.prototype.write = function (data) {
            if (typeof Buffer === 'function' &&
                typeof Buffer.isBuffer === 'function' &&
                Buffer.isBuffer(data)) {
              if (!this._decoder) {
                var SD = wm._string_decoder.StringDecoder;
                this._decoder = new SD('utf8');
              }
              data = this._decoder.write(data);
            }

            this._parser.write(data.toString());
            this.emit("data", data);
            return true;
          };

          SAXStream.prototype.end = function (chunk) {
            if (chunk && chunk.length) this.write(chunk);
            this._parser.end();
            return true;
          };

          SAXStream.prototype.on = function (ev, handler) {
            var me = this;
            if (!me._parser["on" + ev] && streamWraps.indexOf(ev) !== -1) {
              me._parser["on" + ev] = function () {
                var args = arguments.length === 1 ? [arguments[0]]
                         : Array.apply(null, arguments);
                args.splice(0, 0, ev);
                me.emit.apply(me, args);
              };
            }

            return Stream.prototype.on.call(me, ev, handler);
          };



          var whitespace = "\r\n\t "
            , number = "0124356789"
            , letter = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
            , quote = "'\""
            , entity = number + letter + "#"
            , attribEnd = whitespace + ">"
            , CDATA = "[CDATA["
            , DOCTYPE = "DOCTYPE"
            , XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace"
            , XMLNS_NAMESPACE = "http://www.w3.org/2000/xmlns/"
            , rootNS = { xml: XML_NAMESPACE, xmlns: XMLNS_NAMESPACE };

          
          whitespace = charClass(whitespace);
          number = charClass(number);
          letter = charClass(letter);

          var nameStart = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;

          var nameBody = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040\.\d-]/;

          quote = charClass(quote);
          entity = charClass(entity);
          attribEnd = charClass(attribEnd);

          function charClass(str) {
            return str.split("").reduce(function (s, c) {
              s[c] = true;
              return s;
            }, {});
          };

          function isRegExp(c) {
            return Object.prototype.toString.call(c) === '[object RegExp]';
          };

          function is(charclass, c) {
            return isRegExp(charclass) ? !!c.match(charclass) : charclass[c];
          };

          function not(charclass, c) {
            return !is(charclass, c);
          };

          var S = 0;
          sax.STATE =
          {
            BEGIN: S++
          , TEXT: S++ 
          , TEXT_ENTITY: S++ 
          , OPEN_WAKA: S++ 
          , SGML_DECL: S++ 
          , SGML_DECL_QUOTED: S++ 
          , DOCTYPE: S++ 
          , DOCTYPE_QUOTED: S++ 
          , DOCTYPE_DTD: S++ 
          , DOCTYPE_DTD_QUOTED: S++ 
          , COMMENT_STARTING: S++ 
          , COMMENT: S++
          , COMMENT_ENDING: S++ 
          , COMMENT_ENDED: S++ 
          , CDATA: S++ 
          , CDATA_ENDING: S++ 
          , CDATA_ENDING_2: S++ 
          , PROC_INST: S++ 
          , PROC_INST_BODY: S++ 
          , PROC_INST_ENDING: S++ 
          , OPEN_TAG: S++ 
          , OPEN_TAG_SLASH: S++ 
          , ATTRIB: S++ 
          , ATTRIB_NAME: S++ 
          , ATTRIB_NAME_SAW_WHITE: S++ 
          , ATTRIB_VALUE: S++ 
          , ATTRIB_VALUE_QUOTED: S++ 
          , ATTRIB_VALUE_CLOSED: S++ 
          , ATTRIB_VALUE_UNQUOTED: S++ 
          , ATTRIB_VALUE_ENTITY_Q: S++ 
          , ATTRIB_VALUE_ENTITY_U: S++ 
          , CLOSE_TAG: S++ 
          , CLOSE_TAG_SAW_WHITE: S++ 
          , SCRIPT: S++ 
          , SCRIPT_ENDING: S++ 
          };

          sax.ENTITIES =
          {
            "amp": "&"
          , "gt": ">"
          , "lt": "<"
          , "quot": "\""
          , "apos": "'"
          , "AElig": 198
          , "Aacute": 193
          , "Acirc": 194
          , "Agrave": 192
          , "Aring": 197
          , "Atilde": 195
          , "Auml": 196
          , "Ccedil": 199
          , "ETH": 208
          , "Eacute": 201
          , "Ecirc": 202
          , "Egrave": 200
          , "Euml": 203
          , "Iacute": 205
          , "Icirc": 206
          , "Igrave": 204
          , "Iuml": 207
          , "Ntilde": 209
          , "Oacute": 211
          , "Ocirc": 212
          , "Ograve": 210
          , "Oslash": 216
          , "Otilde": 213
          , "Ouml": 214
          , "THORN": 222
          , "Uacute": 218
          , "Ucirc": 219
          , "Ugrave": 217
          , "Uuml": 220
          , "Yacute": 221
          , "aacute": 225
          , "acirc": 226
          , "aelig": 230
          , "agrave": 224
          , "aring": 229
          , "atilde": 227
          , "auml": 228
          , "ccedil": 231
          , "eacute": 233
          , "ecirc": 234
          , "egrave": 232
          , "eth": 240
          , "euml": 235
          , "iacute": 237
          , "icirc": 238
          , "igrave": 236
          , "iuml": 239
          , "ntilde": 241
          , "oacute": 243
          , "ocirc": 244
          , "ograve": 242
          , "oslash": 248
          , "otilde": 245
          , "ouml": 246
          , "szlig": 223
          , "thorn": 254
          , "uacute": 250
          , "ucirc": 251
          , "ugrave": 249
          , "uuml": 252
          , "yacute": 253
          , "yuml": 255
          , "copy": 169
          , "reg": 174
          , "nbsp": 160
          , "iexcl": 161
          , "cent": 162
          , "pound": 163
          , "curren": 164
          , "yen": 165
          , "brvbar": 166
          , "sect": 167
          , "uml": 168
          , "ordf": 170
          , "laquo": 171
          , "not": 172
          , "shy": 173
          , "macr": 175
          , "deg": 176
          , "plusmn": 177
          , "sup1": 185
          , "sup2": 178
          , "sup3": 179
          , "acute": 180
          , "micro": 181
          , "para": 182
          , "middot": 183
          , "cedil": 184
          , "ordm": 186
          , "raquo": 187
          , "frac14": 188
          , "frac12": 189
          , "frac34": 190
          , "iquest": 191
          , "times": 215
          , "divide": 247
          , "OElig": 338
          , "oelig": 339
          , "Scaron": 352
          , "scaron": 353
          , "Yuml": 376
          , "fnof": 402
          , "circ": 710
          , "tilde": 732
          , "Alpha": 913
          , "Beta": 914
          , "Gamma": 915
          , "Delta": 916
          , "Epsilon": 917
          , "Zeta": 918
          , "Eta": 919
          , "Theta": 920
          , "Iota": 921
          , "Kappa": 922
          , "Lambda": 923
          , "Mu": 924
          , "Nu": 925
          , "Xi": 926
          , "Omicron": 927
          , "Pi": 928
          , "Rho": 929
          , "Sigma": 931
          , "Tau": 932
          , "Upsilon": 933
          , "Phi": 934
          , "Chi": 935
          , "Psi": 936
          , "Omega": 937
          , "alpha": 945
          , "beta": 946
          , "gamma": 947
          , "delta": 948
          , "epsilon": 949
          , "zeta": 950
          , "eta": 951
          , "theta": 952
          , "iota": 953
          , "kappa": 954
          , "lambda": 955
          , "mu": 956
          , "nu": 957
          , "xi": 958
          , "omicron": 959
          , "pi": 960
          , "rho": 961
          , "sigmaf": 962
          , "sigma": 963
          , "tau": 964
          , "upsilon": 965
          , "phi": 966
          , "chi": 967
          , "psi": 968
          , "omega": 969
          , "thetasym": 977
          , "upsih": 978
          , "piv": 982
          , "ensp": 8194
          , "emsp": 8195
          , "thinsp": 8201
          , "zwnj": 8204
          , "zwj": 8205
          , "lrm": 8206
          , "rlm": 8207
          , "ndash": 8211
          , "mdash": 8212
          , "lsquo": 8216
          , "rsquo": 8217
          , "sbquo": 8218
          , "ldquo": 8220
          , "rdquo": 8221
          , "bdquo": 8222
          , "dagger": 8224
          , "Dagger": 8225
          , "bull": 8226
          , "hellip": 8230
          , "permil": 8240
          , "prime": 8242
          , "Prime": 8243
          , "lsaquo": 8249
          , "rsaquo": 8250
          , "oline": 8254
          , "frasl": 8260
          , "euro": 8364
          , "image": 8465
          , "weierp": 8472
          , "real": 8476
          , "trade": 8482
          , "alefsym": 8501
          , "larr": 8592
          , "uarr": 8593
          , "rarr": 8594
          , "darr": 8595
          , "harr": 8596
          , "crarr": 8629
          , "lArr": 8656
          , "uArr": 8657
          , "rArr": 8658
          , "dArr": 8659
          , "hArr": 8660
          , "forall": 8704
          , "part": 8706
          , "exist": 8707
          , "empty": 8709
          , "nabla": 8711
          , "isin": 8712
          , "notin": 8713
          , "ni": 8715
          , "prod": 8719
          , "sum": 8721
          , "minus": 8722
          , "lowast": 8727
          , "radic": 8730
          , "prop": 8733
          , "infin": 8734
          , "ang": 8736
          , "and": 8743
          , "or": 8744
          , "cap": 8745
          , "cup": 8746
          , "int": 8747
          , "there4": 8756
          , "sim": 8764
          , "cong": 8773
          , "asymp": 8776
          , "ne": 8800
          , "equiv": 8801
          , "le": 8804
          , "ge": 8805
          , "sub": 8834
          , "sup": 8835
          , "nsub": 8836
          , "sube": 8838
          , "supe": 8839
          , "oplus": 8853
          , "otimes": 8855
          , "perp": 8869
          , "sdot": 8901
          , "lceil": 8968
          , "rceil": 8969
          , "lfloor": 8970
          , "rfloor": 8971
          , "lang": 9001
          , "rang": 9002
          , "loz": 9674
          , "spades": 9824
          , "clubs": 9827
          , "hearts": 9829
          , "diams": 9830
          };

          Object.keys(sax.ENTITIES).forEach(function (key) {
            var e = sax.ENTITIES[key];
            var s = typeof e === 'number' ? String.fromCharCode(e) : e;
            sax.ENTITIES[key] = s;
          });

          for (var S in sax.STATE) sax.STATE[sax.STATE[S]] = S;

          S = sax.STATE;

          function emit(parser, event, data) {
            parser[event] && parser[event](data);
          };

          function emitNode(parser, nodeType, data) {
            if (parser.textNode) closeText(parser);
            emit(parser, nodeType, data);
          };

          function closeText(parser) {
            parser.textNode = textopts(parser.opt, parser.textNode);
            if (parser.textNode) emit(parser, "ontext", parser.textNode);
            parser.textNode = "";
          };

          function textopts(opt, text) {
            if (opt.trim) text = text.trim();
            if (opt.normalize) text = text.replace(/\s+/g, " ");
            return text;
          };

          function error(parser, er) {
            closeText(parser);
            if (parser.trackPosition) {
              er += "\nLine: " + parser.line +
                    "\nColumn: " + parser.column +
                    "\nChar: " + parser.c;
            }
            er = new Error(er);
            parser.error = er;
            emit(parser, "onerror", er);
            return parser;
          };

          function end(parser) {
            if (!parser.closedRoot) strictFail(parser, "Unclosed root tag");
            if ((parser.state !== S.BEGIN) && (parser.state !== S.TEXT)) error(parser, "Unexpected end");
            closeText(parser);
            parser.c = "";
            parser.closed = true;
            emit(parser, "onend");
            SAXParser.call(parser, parser.strict, parser.opt);
            return parser;
          };

          function strictFail(parser, message) {
            if (typeof parser !== 'object' || !(parser instanceof SAXParser))
              throw new Error('bad call to strictFail');
            if (parser.strict) error(parser, message);
          };

          function newTag(parser) {
            if (!parser.strict) parser.tagName = parser.tagName[parser.looseCase]();
            var parent = parser.tags[parser.tags.length - 1] || parser
              , tag = parser.tag = { name: parser.tagName, attributes: {} };

            if (parser.opt.xmlns) tag.ns = parent.ns;
            parser.attribList.length = 0;
          };

          function qname(name, attribute) {
            var i = name.indexOf(":")
              , qualName = i < 0 ? ["", name] : name.split(":")
              , prefix = qualName[0]
              , local = qualName[1];

            if (attribute && name === "xmlns") {
              prefix = "xmlns";
              local = "";
            }

            return { prefix: prefix, local: local };
          };

          function attrib(parser) {
            if (!parser.strict) parser.attribName = parser.attribName[parser.looseCase]();

            if (parser.attribList.indexOf(parser.attribName) !== -1 ||
                parser.tag.attributes.hasOwnProperty(parser.attribName)) {
              return parser.attribName = parser.attribValue = "";
            }

            if (parser.opt.xmlns) {
              var qn = qname(parser.attribName, true)
                , prefix = qn.prefix
                , local = qn.local;

              if (prefix === "xmlns") {
                if (local === "xml" && parser.attribValue !== XML_NAMESPACE) {
                  strictFail(parser
                            , "xml: prefix must be bound to " + XML_NAMESPACE + "\n"
                            + "Actual: " + parser.attribValue);
                } else if (local === "xmlns" && parser.attribValue !== XMLNS_NAMESPACE) {
                  strictFail(parser
                            , "xmlns: prefix must be bound to " + XMLNS_NAMESPACE + "\n"
                            + "Actual: " + parser.attribValue);
                } else {
                  var tag = parser.tag
                    , parent = parser.tags[parser.tags.length - 1] || parser;
                  if (tag.ns === parent.ns) {
                    tag.ns = Object.create(parent.ns);
                  }
                  tag.ns[local] = parser.attribValue;
                }
              }

              parser.attribList.push([parser.attribName, parser.attribValue]);
            } else {
              parser.tag.attributes[parser.attribName] = parser.attribValue;
              emitNode(parser
                      , "onattribute"
                      , {
                        name: parser.attribName
                        , value: parser.attribValue
                      });
            }

            parser.attribName = parser.attribValue = "";
          };

          function openTag(parser, selfClosing) {
            if (parser.opt.xmlns) {
              var tag = parser.tag;

              var qn = qname(parser.tagName);
              tag.prefix = qn.prefix;
              tag.local = qn.local;
              tag.uri = tag.ns[qn.prefix] || "";

              if (tag.prefix && !tag.uri) {
                strictFail(parser, "Unbound namespace prefix: "
                                 + JSON.stringify(parser.tagName));
                tag.uri = qn.prefix;
              }

              var parent = parser.tags[parser.tags.length - 1] || parser;
              if (tag.ns && parent.ns !== tag.ns) {
                Object.keys(tag.ns).forEach(function (p) {
                  emitNode(parser
                          , "onopennamespace"
                          , { prefix: p, uri: tag.ns[p] });
                });
              }

              for (var i = 0, l = parser.attribList.length; i < l; i++) {
                var nv = parser.attribList[i];
                var name = nv[0]
                  , value = nv[1]
                  , qualName = qname(name, true)
                  , prefix = qualName.prefix
                  , local = qualName.local
                  , uri = prefix == "" ? "" : (tag.ns[prefix] || "")
                  , a = {
                    name: name
                        , value: value
                        , prefix: prefix
                        , local: local
                        , uri: uri
                  };

                if (prefix && prefix != "xmlns" && !uri) {
                  strictFail(parser, "Unbound namespace prefix: "
                                   + JSON.stringify(prefix));
                  a.uri = prefix;
                }
                parser.tag.attributes[name] = a;
                emitNode(parser, "onattribute", a);
              }
              parser.attribList.length = 0;
            }

            parser.tag.isSelfClosing = !!selfClosing;
            parser.sawRoot = true;
            parser.tags.push(parser.tag);
            emitNode(parser, "onopentag", parser.tag);
            if (!selfClosing) {
              if (!parser.noscript && parser.tagName.toLowerCase() === "script") {
                parser.state = S.SCRIPT;
              } else {
                parser.state = S.TEXT;
              }
              parser.tag = null;
              parser.tagName = "";
            }
            parser.attribName = parser.attribValue = "";
            parser.attribList.length = 0;
          };

          function closeTag(parser) {
            if (!parser.tagName) {
              strictFail(parser, "Weird empty close tag.");
              parser.textNode += "</>";
              parser.state = S.TEXT;
              return;
            }

            if (parser.script) {
              if (parser.tagName !== "script") {
                parser.script += "</" + parser.tagName + ">";
                parser.tagName = "";
                parser.state = S.SCRIPT;
                return;
              }
              emitNode(parser, "onscript", parser.script);
              parser.script = "";
            }

            var t = parser.tags.length;
            var tagName = parser.tagName;
            if (!parser.strict) tagName = tagName[parser.looseCase]();
            var closeTo = tagName;
            while (t--) {
              var close = parser.tags[t];
              if (close.name !== closeTo) {
                strictFail(parser, "Unexpected close tag");
              } else break;
            }

            if (t < 0) {
              strictFail(parser, "Unmatched closing tag: " + parser.tagName);
              parser.textNode += "</" + parser.tagName + ">";
              parser.state = S.TEXT;
              return;
            }
            parser.tagName = tagName;
            var s = parser.tags.length;
            while (s-- > t) {
              var tag = parser.tag = parser.tags.pop();
              parser.tagName = parser.tag.name;
              emitNode(parser, "onclosetag", parser.tagName);

              var x = {};
              for (var i in tag.ns) x[i] = tag.ns[i];

              var parent = parser.tags[parser.tags.length - 1] || parser;
              if (parser.opt.xmlns && tag.ns !== parent.ns) {
                Object.keys(tag.ns).forEach(function (p) {
                  var n = tag.ns[p];
                  emitNode(parser, "onclosenamespace", { prefix: p, uri: n });
                });
              }
            }
            if (t === 0) parser.closedRoot = true;
            parser.tagName = parser.attribValue = parser.attribName = "";
            parser.attribList.length = 0;
            parser.state = S.TEXT;
          };

          function parseEntity(parser) {
            var entity = parser.entity
              , entityLC = entity.toLowerCase()
              , num
              , numStr = "";
            if (parser.ENTITIES[entity])
              return parser.ENTITIES[entity];
            if (parser.ENTITIES[entityLC])
              return parser.ENTITIES[entityLC];
            entity = entityLC;
            if (entity.charAt(0) === "#") {
              if (entity.charAt(1) === "x") {
                entity = entity.slice(2);
                num = parseInt(entity, 16);
                numStr = num.toString(16);
              } else {
                entity = entity.slice(1);
                num = parseInt(entity, 10);
                numStr = num.toString(10);
              }
            }
            entity = entity.replace(/^0+/, "");
            if (numStr.toLowerCase() !== entity) {
              strictFail(parser, "Invalid character entity");
              return "&" + parser.entity + ";";
            }

            return String.fromCodePoint(num);
          };

          function write(chunk) {
            var parser = this;
            if (this.error) throw this.error;
            if (parser.closed) return error(parser,
              "Cannot write after close. Assign an onready handler.");
            if (chunk === null) return end(parser);
            var i = 0, c = "";
            while (parser.c = c = chunk.charAt(i++)) {
              if (parser.trackPosition) {
                parser.position++;
                if (c === "\n") {
                  parser.line++;
                  parser.column = 0;
                } else parser.column++;
              }
              switch (parser.state) {

                case S.BEGIN:
                  if (c === "<") {
                    parser.state = S.OPEN_WAKA;
                    parser.startTagPosition = parser.position;
                  } else if (not(whitespace, c)) {
                    strictFail(parser, "Non-whitespace before first tag.");
                    parser.textNode = c;
                    parser.state = S.TEXT;
                  }
                  continue;

                case S.TEXT:
                  if (parser.sawRoot && !parser.closedRoot) {
                    var starti = i - 1;
                    while (c && c !== "<" && c !== "&") {
                      c = chunk.charAt(i++);
                      if (c && parser.trackPosition) {
                        parser.position++;
                        if (c === "\n") {
                          parser.line++;
                          parser.column = 0;
                        } else parser.column++;
                      }
                    }
                    parser.textNode += chunk.substring(starti, i - 1);
                  }
                  if (c === "<") {
                    parser.state = S.OPEN_WAKA;
                    parser.startTagPosition = parser.position;
                  } else {
                    if (not(whitespace, c) && (!parser.sawRoot || parser.closedRoot))
                      strictFail(parser, "Text data outside of root node.");
                    if (c === "&") parser.state = S.TEXT_ENTITY;
                    else parser.textNode += c;
                  }
                  continue;

                case S.SCRIPT:
                  if (c === "<") {
                    parser.state = S.SCRIPT_ENDING;
                  } else parser.script += c;
                  continue;

                case S.SCRIPT_ENDING:
                  if (c === "/") {
                    parser.state = S.CLOSE_TAG;
                  } else {
                    parser.script += "<" + c;
                    parser.state = S.SCRIPT;
                  }
                  continue;

                case S.OPEN_WAKA:
                  if (c === "!") {
                    parser.state = S.SGML_DECL;
                    parser.sgmlDecl = "";
                  } else if (is(whitespace, c)) {
                  } else if (is(nameStart, c)) {
                    parser.state = S.OPEN_TAG;
                    parser.tagName = c;
                  } else if (c === "/") {
                    parser.state = S.CLOSE_TAG;
                    parser.tagName = "";
                  } else if (c === "?") {
                    parser.state = S.PROC_INST;
                    parser.procInstName = parser.procInstBody = "";
                  } else {
                    strictFail(parser, "Unencoded <");
                    if (parser.startTagPosition + 1 < parser.position) {
                      var pad = parser.position - parser.startTagPosition;
                      c = new Array(pad).join(" ") + c;
                    }
                    parser.textNode += "<" + c;
                    parser.state = S.TEXT;
                  }
                  continue;

                case S.SGML_DECL:
                  if ((parser.sgmlDecl + c).toUpperCase() === CDATA) {
                    emitNode(parser, "onopencdata");
                    parser.state = S.CDATA;
                    parser.sgmlDecl = "";
                    parser.cdata = "";
                  } else if (parser.sgmlDecl + c === "--") {
                    parser.state = S.COMMENT;
                    parser.comment = "";
                    parser.sgmlDecl = "";
                  } else if ((parser.sgmlDecl + c).toUpperCase() === DOCTYPE) {
                    parser.state = S.DOCTYPE;
                    if (parser.doctype || parser.sawRoot) strictFail(parser,
                      "Inappropriately located doctype declaration");
                    parser.doctype = "";
                    parser.sgmlDecl = "";
                  } else if (c === ">") {
                    emitNode(parser, "onsgmldeclaration", parser.sgmlDecl);
                    parser.sgmlDecl = "";
                    parser.state = S.TEXT;
                  } else if (is(quote, c)) {
                    parser.state = S.SGML_DECL_QUOTED;
                    parser.sgmlDecl += c;
                  } else parser.sgmlDecl += c;
                  continue;

                case S.SGML_DECL_QUOTED:
                  if (c === parser.q) {
                    parser.state = S.SGML_DECL;
                    parser.q = "";
                  }
                  parser.sgmlDecl += c;
                  continue;

                case S.DOCTYPE:
                  if (c === ">") {
                    parser.state = S.TEXT;
                    emitNode(parser, "ondoctype", parser.doctype);
                    parser.doctype = true; 
                  } else {
                    parser.doctype += c;
                    if (c === "[") parser.state = S.DOCTYPE_DTD;
                    else if (is(quote, c)) {
                      parser.state = S.DOCTYPE_QUOTED;
                      parser.q = c;
                    }
                  }
                  continue;

                case S.DOCTYPE_QUOTED:
                  parser.doctype += c;
                  if (c === parser.q) {
                    parser.q = "";
                    parser.state = S.DOCTYPE;
                  }
                  continue;

                case S.DOCTYPE_DTD:
                  parser.doctype += c;
                  if (c === "]") parser.state = S.DOCTYPE;
                  else if (is(quote, c)) {
                    parser.state = S.DOCTYPE_DTD_QUOTED;
                    parser.q = c;
                  }
                  continue;

                case S.DOCTYPE_DTD_QUOTED:
                  parser.doctype += c;
                  if (c === parser.q) {
                    parser.state = S.DOCTYPE_DTD;
                    parser.q = "";
                  }
                  continue;

                case S.COMMENT:
                  if (c === "-") parser.state = S.COMMENT_ENDING;
                  else parser.comment += c;
                  continue;

                case S.COMMENT_ENDING:
                  if (c === "-") {
                    parser.state = S.COMMENT_ENDED;
                    parser.comment = textopts(parser.opt, parser.comment);
                    if (parser.comment) emitNode(parser, "oncomment", parser.comment);
                    parser.comment = "";
                  } else {
                    parser.comment += "-" + c;
                    parser.state = S.COMMENT;
                  }
                  continue;

                case S.COMMENT_ENDED:
                  if (c !== ">") {
                    strictFail(parser, "Malformed comment");
                    parser.comment += "--" + c;
                    parser.state = S.COMMENT;
                  } else parser.state = S.TEXT;
                  continue;

                case S.CDATA:
                  if (c === "]") parser.state = S.CDATA_ENDING;
                  else parser.cdata += c;
                  continue;

                case S.CDATA_ENDING:
                  if (c === "]") parser.state = S.CDATA_ENDING_2;
                  else {
                    parser.cdata += "]" + c;
                    parser.state = S.CDATA;
                  }
                  continue;

                case S.CDATA_ENDING_2:
                  if (c === ">") {
                    if (parser.cdata) emitNode(parser, "oncdata", parser.cdata);
                    emitNode(parser, "onclosecdata");
                    parser.cdata = "";
                    parser.state = S.TEXT;
                  } else if (c === "]") {
                    parser.cdata += "]";
                  } else {
                    parser.cdata += "]]" + c;
                    parser.state = S.CDATA;
                  }
                  continue;

                case S.PROC_INST:
                  if (c === "?") parser.state = S.PROC_INST_ENDING;
                  else if (is(whitespace, c)) parser.state = S.PROC_INST_BODY;
                  else parser.procInstName += c;
                  continue;

                case S.PROC_INST_BODY:
                  if (!parser.procInstBody && is(whitespace, c)) continue;
                  else if (c === "?") parser.state = S.PROC_INST_ENDING;
                  else parser.procInstBody += c;
                  continue;

                case S.PROC_INST_ENDING:
                  if (c === ">") {
                    emitNode(parser, "onprocessinginstruction", {
                      name: parser.procInstName,
                      body: parser.procInstBody
                    });
                    parser.procInstName = parser.procInstBody = "";
                    parser.state = S.TEXT;
                  } else {
                    parser.procInstBody += "?" + c;
                    parser.state = S.PROC_INST_BODY;
                  }
                  continue;

                case S.OPEN_TAG:
                  if (is(nameBody, c)) parser.tagName += c;
                  else {
                    newTag(parser);
                    if (c === ">") openTag(parser);
                    else if (c === "/") parser.state = S.OPEN_TAG_SLASH;
                    else {
                      if (not(whitespace, c)) strictFail(
                        parser, "Invalid character in tag name");
                      parser.state = S.ATTRIB;
                    }
                  }
                  continue;

                case S.OPEN_TAG_SLASH:
                  if (c === ">") {
                    openTag(parser, true);
                    closeTag(parser);
                  } else {
                    strictFail(parser, "Forward-slash in opening tag not followed by >");
                    parser.state = S.ATTRIB;
                  }
                  continue;

                case S.ATTRIB:
                  if (is(whitespace, c)) continue;
                  else if (c === ">") openTag(parser);
                  else if (c === "/") parser.state = S.OPEN_TAG_SLASH;
                  else if (is(nameStart, c)) {
                    parser.attribName = c;
                    parser.attribValue = "";
                    parser.state = S.ATTRIB_NAME;
                  } else strictFail(parser, "Invalid attribute name");
                  continue;

                case S.ATTRIB_NAME:
                  if (c === "=") parser.state = S.ATTRIB_VALUE;
                  else if (c === ">") {
                    strictFail(parser, "Attribute without value");
                    parser.attribValue = parser.attribName;
                    attrib(parser);
                    openTag(parser);
                  }
                  else if (is(whitespace, c)) parser.state = S.ATTRIB_NAME_SAW_WHITE;
                  else if (is(nameBody, c)) parser.attribName += c;
                  else strictFail(parser, "Invalid attribute name");
                  continue;

                case S.ATTRIB_NAME_SAW_WHITE:
                  if (c === "=") parser.state = S.ATTRIB_VALUE;
                  else if (is(whitespace, c)) continue;
                  else {
                    strictFail(parser, "Attribute without value");
                    parser.tag.attributes[parser.attribName] = "";
                    parser.attribValue = "";
                    emitNode(parser, "onattribute",
                             { name: parser.attribName, value: "" });
                    parser.attribName = "";
                    if (c === ">") openTag(parser);
                    else if (is(nameStart, c)) {
                      parser.attribName = c;
                      parser.state = S.ATTRIB_NAME;
                    } else {
                      strictFail(parser, "Invalid attribute name");
                      parser.state = S.ATTRIB;
                    }
                  }
                  continue;

                case S.ATTRIB_VALUE:
                  if (is(whitespace, c)) continue;
                  else if (is(quote, c)) {
                    parser.q = c;
                    parser.state = S.ATTRIB_VALUE_QUOTED;
                  } else {
                    strictFail(parser, "Unquoted attribute value");
                    parser.state = S.ATTRIB_VALUE_UNQUOTED;
                    parser.attribValue = c;
                  }
                  continue;

                case S.ATTRIB_VALUE_QUOTED:
                  if (c !== parser.q) {
                    if (c === "&") parser.state = S.ATTRIB_VALUE_ENTITY_Q;
                    else parser.attribValue += c;
                    continue;
                  }
                  attrib(parser);
                  parser.q = "";
                  parser.state = S.ATTRIB_VALUE_CLOSED;
                  continue;

                case S.ATTRIB_VALUE_CLOSED:
                  if (is(whitespace, c)) {
                    parser.state = S.ATTRIB;
                  } else if (c === ">") openTag(parser);
                  else if (c === "/") parser.state = S.OPEN_TAG_SLASH;
                  else if (is(nameStart, c)) {
                    strictFail(parser, "No whitespace between attributes");
                    parser.attribName = c;
                    parser.attribValue = "";
                    parser.state = S.ATTRIB_NAME;
                  } else strictFail(parser, "Invalid attribute name");
                  continue;

                case S.ATTRIB_VALUE_UNQUOTED:
                  if (not(attribEnd, c)) {
                    if (c === "&") parser.state = S.ATTRIB_VALUE_ENTITY_U;
                    else parser.attribValue += c;
                    continue;
                  }
                  attrib(parser);
                  if (c === ">") openTag(parser);
                  else parser.state = S.ATTRIB;
                  continue;

                case S.CLOSE_TAG:
                  if (!parser.tagName) {
                    if (is(whitespace, c)) continue;
                    else if (not(nameStart, c)) {
                      if (parser.script) {
                        parser.script += "</" + c;
                        parser.state = S.SCRIPT;
                      } else {
                        strictFail(parser, "Invalid tagname in closing tag.");
                      }
                    } else parser.tagName = c;
                  }
                  else if (c === ">") closeTag(parser);
                  else if (is(nameBody, c)) parser.tagName += c;
                  else if (parser.script) {
                    parser.script += "</" + parser.tagName;
                    parser.tagName = "";
                    parser.state = S.SCRIPT;
                  } else {
                    if (not(whitespace, c)) strictFail(parser,
                      "Invalid tagname in closing tag");
                    parser.state = S.CLOSE_TAG_SAW_WHITE;
                  }
                  continue;

                case S.CLOSE_TAG_SAW_WHITE:
                  if (is(whitespace, c)) continue;
                  if (c === ">") closeTag(parser);
                  else strictFail(parser, "Invalid characters in closing tag");
                  continue;

                case S.TEXT_ENTITY:
                case S.ATTRIB_VALUE_ENTITY_Q:
                case S.ATTRIB_VALUE_ENTITY_U:
                  switch (parser.state) {
                    case S.TEXT_ENTITY:
                      var returnState = S.TEXT, buffer = "textNode";
                      break;

                    case S.ATTRIB_VALUE_ENTITY_Q:
                      var returnState = S.ATTRIB_VALUE_QUOTED, buffer = "attribValue";
                      break;

                    case S.ATTRIB_VALUE_ENTITY_U:
                      var returnState = S.ATTRIB_VALUE_UNQUOTED, buffer = "attribValue";
                      break;
                  }
                  if (c === ";") {
                    parser[buffer] += parseEntity(parser);
                    parser.entity = "";
                    parser.state = returnState;
                  }
                  else if (is(entity, c)) parser.entity += c;
                  else {
                    strictFail(parser, "Invalid character entity");
                    parser[buffer] += "&" + parser.entity + c;
                    parser.entity = "";
                    parser.state = returnState;
                  }
                  continue;

                default:
                  throw new Error(parser, "Unknown state: " + parser.state);
              }
            } 
            if (parser.position >= parser.bufferCheckPosition) checkBufferLength(parser);
            return parser;
          };

          if (!String.fromCodePoint) {
            (function () {
              var stringFromCharCode = String.fromCharCode;
              var floor = Math.floor;
              var fromCodePoint = function () {
                var MAX_SIZE = 0x4000;
                var codeUnits = [];
                var highSurrogate;
                var lowSurrogate;
                var index = -1;
                var length = arguments.length;
                if (!length) {
                  return '';
                }
                var result = '';
                while (++index < length) {
                  var codePoint = Number(arguments[index]);
                  if (
                          !isFinite(codePoint) || 
                          codePoint < 0 || 
                          codePoint > 0x10FFFF || 
                          floor(codePoint) != codePoint 
                  ) {
                    throw RangeError('Invalid code point: ' + codePoint);
                  }
                  if (codePoint <= 0xFFFF) { 
                    codeUnits.push(codePoint);
                  } else { 
                    codePoint -= 0x10000;
                    highSurrogate = (codePoint >> 10) + 0xD800;
                    lowSurrogate = (codePoint % 0x400) + 0xDC00;
                    codeUnits.push(highSurrogate, lowSurrogate);
                  }
                  if (index + 1 == length || codeUnits.length > MAX_SIZE) {
                    result += stringFromCharCode.apply(null, codeUnits);
                    codeUnits.length = 0;
                  }
                }
                return result;
              };
              if (Object.defineProperty) {
                Object.defineProperty(String, 'fromCodePoint', {
                  'value': fromCodePoint,
                  'configurable': true,
                  'writable': true
                });
              } else {
                String.fromCodePoint = fromCodePoint;
              }
            }());
          }

      
      return sax;
    };
    
    wm._23 = function (){

        "use strict";

        function TinyStack() {
          this.data = [null];
          this.top = 0;
        };

        TinyStack.prototype.clear = function clear() {
          this.data = [null];
          this.top = 0;

          return this;
        };

        TinyStack.prototype.length = function length() {
          return this.top;
        };

        TinyStack.prototype.peek = function peek() {
          return this.data[this.top];
        };

        TinyStack.prototype.pop = function pop() {
          if (this.top > 0) {
            this.top--;

            return this.data.pop();
          }
          else {
            return undefined;
          }
        };

        TinyStack.prototype.push = function push(arg) {
          this.data[++this.top] = arg;

          return this;
        };

        function factory() {
          return new TinyStack();
        };

      return factory;
    };
    
    wm._24 = function (){
      return new wm._28;
    };

    wm._25 = function (){
      'use strict';

      function Base() { };

      Base.prototype.get = function (name) {
        return this.$model.properties.get(this, name);
      };

      Base.prototype.set = function (name, value) {
        this.$model.properties.set(this, name, value);
      };


      return Base;
    };

    wm._26 = function (){
      'use strict';

      var pick = new wm._212,
          assign = new wm._206,
          forEach = new wm._92;

      var parseNameNs = wm._29;


      function DescriptorBuilder(nameNs) {
        this.ns = nameNs;
        this.name = nameNs.name;
        this.allTypes = [];
        this.properties = [];
        this.propertiesByName = {};
      };

      
      DescriptorBuilder.prototype.build = function () {
        return pick(this, [
          'ns',
          'name',
          'allTypes',
          'properties',
          'propertiesByName',
          'bodyProperty',
          'idProperty'
        ]);
      };

      DescriptorBuilder.prototype.addProperty = function (p, idx, validate) {

        if (typeof idx === 'boolean') {
          validate = idx;
          idx = undefined;
        }

        this.addNamedProperty(p, validate !== false);

        var properties = this.properties;

        if (idx !== undefined) {
          properties.splice(idx, 0, p);
        } else {
          properties.push(p);
        }
      };


      DescriptorBuilder.prototype.replaceProperty = function (oldProperty, newProperty, replace) {
        var oldNameNs = oldProperty.ns;

        var props = this.properties,
            propertiesByName = this.propertiesByName,
            rename = oldProperty.name !== newProperty.name;

        if (oldProperty.isId) {
          if (!newProperty.isId) {
            throw new Error(
              'property <' + newProperty.ns.name + '> must be id property ' +
              'to refine <' + oldProperty.ns.name + '>');
          }

          this.setIdProperty(newProperty, false);
        }

        if (oldProperty.isBody) {

          if (!newProperty.isBody) {
            throw new Error(
              'property <' + newProperty.ns.name + '> must be body property ' +
              'to refine <' + oldProperty.ns.name + '>');
          }
          this.setBodyProperty(newProperty, false);
        }

        var idx = props.indexOf(oldProperty);
        if (idx === -1) {
          throw new Error('property <' + oldNameNs.name + '> not found in property list');
        }

        props.splice(idx, 1);

        this.addProperty(newProperty, replace ? undefined : idx, rename);

        propertiesByName[oldNameNs.name] = propertiesByName[oldNameNs.localName] = newProperty;
      };


      DescriptorBuilder.prototype.redefineProperty = function (p, targetPropertyName, replace) {

        var nsPrefix = p.ns.prefix;
        var parts = targetPropertyName.split('#');

        var name = parseNameNs(parts[0], nsPrefix);
        var attrName = parseNameNs(parts[1], name.prefix).name;

        var redefinedProperty = this.propertiesByName[attrName];
        if (!redefinedProperty) {
          throw new Error('refined property <' + attrName + '> not found');
        } else {
          this.replaceProperty(redefinedProperty, p, replace);
        }

        delete p.redefines;
      };

      DescriptorBuilder.prototype.addNamedProperty = function (p, validate) {
        var ns = p.ns,
            propsByName = this.propertiesByName;

        if (validate) {
          this.assertNotDefined(p, ns.name);
          this.assertNotDefined(p, ns.localName);
        }

        propsByName[ns.name] = propsByName[ns.localName] = p;
      };

      DescriptorBuilder.prototype.removeNamedProperty = function (p) {
        var ns = p.ns,
            propsByName = this.propertiesByName;

        delete propsByName[ns.name];
        delete propsByName[ns.localName];
      };

      DescriptorBuilder.prototype.setBodyProperty = function (p, validate) {

        if (validate && this.bodyProperty) {
          throw new Error(
            'body property defined multiple times ' +
            '(<' + this.bodyProperty.ns.name + '>, <' + p.ns.name + '>)');
        }

        this.bodyProperty = p;
      };

      DescriptorBuilder.prototype.setIdProperty = function (p, validate) {

        if (validate && this.idProperty) {
          throw new Error(
            'id property defined multiple times ' +
            '(<' + this.idProperty.ns.name + '>, <' + p.ns.name + '>)');
        }

        this.idProperty = p;
      };

      DescriptorBuilder.prototype.assertNotDefined = function (p, name) {
        var propertyName = p.name,
            definedProperty = this.propertiesByName[propertyName];

        if (definedProperty) {
          throw new Error(
            'property <' + propertyName + '> already defined; ' +
            'override of <' + definedProperty.definedBy.ns.name + '#' + definedProperty.ns.name + '> by ' +
            '<' + p.definedBy.ns.name + '#' + p.ns.name + '> not allowed without redefines');
        }
      };

      DescriptorBuilder.prototype.hasProperty = function (name) {
        return this.propertiesByName[name];
      };

      DescriptorBuilder.prototype.addTrait = function (t, inherited) {

        var allTypes = this.allTypes;

        if (allTypes.indexOf(t) !== -1) {
          return;
        }

        forEach(t.properties, function (p) {
          p = assign({}, p, {
            name: p.ns.localName,
            inherited: inherited
          });

          Object.defineProperty(p, 'definedBy', {
            value: t
          });

          var replaces = p.replaces,
              redefines = p.redefines;

          if (replaces || redefines) {
            this.redefineProperty(p, replaces || redefines, replaces);
          } else {
            if (p.isBody) {
              this.setBodyProperty(p);
            }
            if (p.isId) {
              this.setIdProperty(p);
            }
            this.addProperty(p);
          }
        }, this);

        allTypes.push(t);
      };
    
      return DescriptorBuilder;
    };
    
    wm._27 = function (){
      var forEach = new wm._92;
      var Base = new wm._25;

      function Factory(model, properties) {
        this.model = model;
        this.properties = properties;
      };

      Factory.prototype.createType = function (descriptor) {

        var model = this.model;

        var props = this.properties,
            prototype = Object.create(Base.prototype);

        forEach(descriptor.properties, function (p) {
          if (!p.isMany && p.default !== undefined) {
            prototype[p.name] = p.default;
          }
        });

        props.defineModel(prototype, model);
        props.defineDescriptor(prototype, descriptor);

        var name = descriptor.ns.name;
        
        function ModdleElement(attrs) {
          props.define(this, '$type', { value: name, enumerable: true });
          props.define(this, '$attrs', { value: {} });
          props.define(this, '$parent', { writable: true });

          forEach(attrs, function (val, key) {
            this.set(key, val);
          }, this);
        };

        ModdleElement.prototype = prototype;

        ModdleElement.hasType = prototype.$instanceOf = this.model.hasType;

        props.defineModel(ModdleElement, model);
        props.defineDescriptor(ModdleElement, descriptor);
        
        /* changes for Spread Correlation Project */
        ModdleElement.prototype.hasStereotypes = function () {
          try {
            var modRefs = this.getExtensionElements().modelProperties.modelRefsProperty;

            var rs = false;
            forEach(modRefs, function (mr) {
              if (mr.name == 'Stereotypes')
                rs = true;
            });
            return rs;
          } catch (e) {
            return false;
          }
        };

        ModdleElement.prototype.getStereotypes = function () {
          try {
            var modRefs = this.getExtensionElements().modelProperties.modelRefsProperty;

            var rs;
            forEach(modRefs, function (mr) {
              if (mr.name = 'Stereotypes')
                rs = mr.values.modelRef;
            });
            return rs;
          } catch (e) {
            return null;
          }
        };

        ModdleElement.prototype.getExtensionElements = function () {
          if (this.hasOwnProperty('clonedFrom'))
            return this.clonedFrom.getExtensionElements();

          if (this.hasOwnProperty('dataObjectRef'))
            return this.dataObjectRef.extensionElements.extensions.modelExtension;

          return this.extensionElements.extensions.modelExtension;
        };

        ModdleElement.prototype.getExtensionName = function () {
          try {
            if (this.getExtensionElements()) {
              if (this.getExtensionElements().modelProperties.stringProperty) {
                var _val;
                forEach(this.getExtensionElements().modelProperties.stringProperty, function (nd) {
                  if (nd.Name == 'name')
                    _val = nd;
                });
                if (_val)
                  return _val.Value;
                else
                  return '';
              }
            }
            else
              return '';
          } catch (e) {
            return '';
          }
        };

        ModdleElement.prototype.getBPVADiagramElementExtension = function () {
          try {
            var extensions = this.getBPVADiagramExtensions();

            if (extensions.diagramElementExtension) {
              var sde;
              var semt = this;
              forEach(extensions.diagramElementExtension, function (de) {
                if (de.Idref.id == semt.di.id)
                  sde = de;
              });
              if (sde)
                return sde;
            }
          } catch (e) {

          }
        };

        ModdleElement.prototype.getBPMNDefinitions = function () {
          try {
            var _s = this;
            do {
              _s = _s.$parent;
            } while (_s.$type != 'bpmn:Definitions');
            return _s;
          } catch (e) {

          }
        };

        ModdleElement.prototype.getBPVADiagramExtensions = function () {
          try {
            var defs = this.getBPMNDefinitions();
            var roots = defs.rootElements;
            var i;
            for (i = 0; i < roots.length; i++) {
              if (roots[i].$type == 'bpmn:Process')
                return roots[i].extensionElements.extensions;
            }
          } catch (e) {

          }
        };

        return ModdleElement;
      };
      
      return Factory;
    };
        
    wm._28 = function (){
      var isString = new wm._203,
          isObject = new wm._201,
          forEach = new wm._92,
          find = new wm._91;


      var Factory = new wm._27,
          Registry = new wm._31,
          Properties = new wm._30;

      var parseNameNs = wm._29.parseName;

      function Moddle(packages) {

        this.properties = new Properties(this);

        this.factory = new Factory(this, this.properties);
        this.registry = new Registry(packages, this.properties);

        this.typeCache = {};
      };


      Moddle.prototype.create = function (descriptor, attrs) {
        var Type = this.getType(descriptor);

        if (!Type) {
          throw new Error('unknown type <' + descriptor + '>');
        }

        return new Type(attrs);
      };

      Moddle.prototype.getType = function (descriptor) {

        var cache = this.typeCache;

        var name = isString(descriptor) ? descriptor : descriptor.ns.name;

        var type = cache[name];

        if (!type) {
          descriptor = this.registry.getEffectiveDescriptor(name);
          type = cache[name] = this.factory.createType(descriptor);
        }

        return type;
      };

      Moddle.prototype.createAny = function (name, nsUri, properties) {

        var nameNs = parseNameNs(name);

        var element = {
          $type: name
        };

        var descriptor = {
          name: name,
          isGeneric: true,
          ns: {
            prefix: nameNs.prefix,
            localName: nameNs.localName,
            uri: nsUri
          }
        };

        this.properties.defineDescriptor(element, descriptor);
        this.properties.defineModel(element, this);
        this.properties.define(element, '$parent', { enumerable: false, writable: true });

        forEach(properties, function (a, key) {
          if (isObject(a) && a.value !== undefined) {
            element[a.name] = a.value;
          } else {
            element[key] = a;
          }
        });

        return element;
      };

      Moddle.prototype.getPackage = function (uriOrPrefix) {
        return this.registry.getPackage(uriOrPrefix);
      };

      Moddle.prototype.getPackages = function () {
        return this.registry.getPackages();
      };

      Moddle.prototype.getElementDescriptor = function (element) {
        return element.$descriptor;
      };

      Moddle.prototype.hasType = function (element, type) {
        if (type === undefined) {
          type = element;
          element = this;
        }
        var descriptor;
        if (!element['clonedFrom'])
          descriptor = element.$model.getElementDescriptor(element);
        else
          descriptor = element.clonedFrom.$model.getElementDescriptor(element.clonedFrom);

        return !!find(descriptor.allTypes, function (t) {
          return t.name === type;
        });
      };

      Moddle.prototype.getPropertyDescriptor = function (element, property) {
        return this.getElementDescriptor(element).propertiesByName[property];
      };
      
      return Moddle;
    };    
    
    wm._29 = function (){
      var parseName = function (name, defaultPrefix) {
        var parts = name.split(/:/),
            localName, prefix;

        if (parts.length === 1) {
          localName = name;
          prefix = defaultPrefix;
        } else
          if (parts.length === 2) {
            localName = parts[1];
            prefix = parts[0];
          } else {
            throw new Error('expected <prefix:localName> or <localName>, got ' + name);
          }

        name = (prefix ? prefix + ':' : '') + localName;

        return {
          name: name,
          prefix: prefix,
          localName: localName
        };
      };
      
      return parseName;
    };   
    
    wm._30 = function (){
      function Properties(model) {
        this.model = model;
      };

      Properties.prototype.set = function (target, name, value) {

        var property = this.model.getPropertyDescriptor(target, name);

        var propertyName = property && property.name;

        if (isUndefined(value)) {
          if (property) {
            delete target[propertyName];
          } else {
            delete target.$attrs[name];
          }
        } else {
          if (property) {
            if (propertyName in target) {
              target[propertyName] = value;
            } else {
              defineProperty(target, property, value);
            }
          } else {
            target.$attrs[name] = value;
          }
        }
      };

      Properties.prototype.get = function (target, name) {

        var property = this.model.getPropertyDescriptor(target, name);

        if (!property) {
          return target.$attrs[name];
        }

        var propertyName = property.name;

        if (!target[propertyName] && property.isMany) {
          defineProperty(target, property, []);
        }

        return target[propertyName];
      };


      Properties.prototype.define = function (target, name, options) {
        Object.defineProperty(target, name, options);
      };


      Properties.prototype.defineDescriptor = function (target, descriptor) {
        this.define(target, '$descriptor', { value: descriptor });
      };

      Properties.prototype.defineModel = function (target, model) {
        this.define(target, '$model', { value: model });
      };


      function isUndefined(val) {
        return typeof val === 'undefined';
      };

      function defineProperty(target, property, value) {
        Object.defineProperty(target, property.name, {
          enumerable: !property.isReference,
          writable: true,
          value: value,
          configurable: true
        });
      };
      
      return Properties;
    };   

    wm._31 = function (){
      var assign = new window.j2.mod._._206,
          forEach = new window.j2.mod._._92;

      var Types = new window.j2.mod._._32,
          DescriptorBuilder = new window.j2.mod._._26;

      var parseNameNs = new window.j2.mod._._29,
          isBuiltInType = Types.isBuiltIn;


      function Registry(packages, properties) {
        this.packageMap = {};
        this.typeMap = {};

        this.packages = [];

        this.properties = properties;

        forEach(packages, this.registerPackage, this);
      };

      
      Registry.prototype.getPackage = function (uriOrPrefix) {
        return this.packageMap[uriOrPrefix];
      };

      Registry.prototype.getPackages = function () {
        return this.packages;
      };


      Registry.prototype.registerPackage = function (pkg) {

        pkg = assign({}, pkg);

        forEach(pkg.types, function (descriptor) {
          this.registerType(descriptor, pkg);
        }, this);

        this.packageMap[pkg.uri] = this.packageMap[pkg.prefix] = pkg;
        this.packages.push(pkg);
      };

      Registry.prototype.registerType = function (type, pkg) {

        type = assign({}, type, {
          superClass: (type.superClass || []).slice(),
          extends: (type.extends || []).slice(),
          properties: (type.properties || []).slice()
        });

        var ns = parseNameNs(type.name, pkg.prefix),
            name = ns.name,
            propertiesByName = {};

        forEach(type.properties, function (p) {
          var propertyNs = parseNameNs(p.name, ns.prefix),
              propertyName = propertyNs.name;

          if (!isBuiltInType(p.type)) {
            p.type = parseNameNs(p.type, propertyNs.prefix).name;
          }

          assign(p, {
            ns: propertyNs,
            name: propertyName
          });

          propertiesByName[propertyName] = p;
        });

        assign(type, {
          ns: ns,
          name: name,
          propertiesByName: propertiesByName
        });

        forEach(type.extends, function (extendsName) {
          var extended = this.typeMap[extendsName];

          extended.traits = extended.traits || [];
          extended.traits.push(name);
        }, this);

        this.definePackage(type, pkg);

        this.typeMap[name] = type;
      };

      Registry.prototype.mapTypes = function (nsName, iterator, trait) {

        var type = isBuiltInType(nsName.name) ? { name: nsName.name } : this.typeMap[nsName.name];

        var self = this;

        function traverseTrait(cls) {
          return traverseSuper(cls, true);
        };

        function traverseSuper(cls, trait) {
          var parentNs = parseNameNs(cls, isBuiltInType(cls) ? '' : nsName.prefix);
          self.mapTypes(parentNs, iterator, trait);
        };

        if (!type) {
          throw new Error('unknown type <' + nsName.name + '>');
        }

        forEach(type.superClass, trait ? traverseTrait : traverseSuper);

        iterator(type, !trait);

        forEach(type.traits, traverseTrait);
      };

      Registry.prototype.getEffectiveDescriptor = function (name) {

        var nsName = parseNameNs(name);

        var builder = new DescriptorBuilder(nsName);

        this.mapTypes(nsName, function (type, inherited) {
          builder.addTrait(type, inherited);
        });

        var descriptor = builder.build();

        this.definePackage(descriptor, descriptor.allTypes[descriptor.allTypes.length - 1].$pkg);

        return descriptor;
      };


      Registry.prototype.definePackage = function (target, pkg) {
        this.properties.define(target, '$pkg', { value: pkg });
      };
      
      return Registry;
    };       
    
    wm._32 = function (){
      var BUILTINS = {
        String: true,
        Boolean: true,
        Integer: true,
        Real: true,
        Element: true
      };

      var TYPE_CONVERTERS = {
        String: function (s) { return s; },
        Boolean: function (s) { return s === 'true'; },
        Integer: function (s) { return parseInt(s, 10); },
        Real: function (s) { return parseFloat(s, 10); }
      };

      var coerceType = function (type, value) {

        var converter = TYPE_CONVERTERS[type];

        if (converter) {
          return converter(value);
        } else {
          return value;
        }
      };

      var isBuiltIn = function (type) {
        return !!BUILTINS[type];
      };

      var isSimple = function (type) {
        return !!TYPE_CONVERTERS[type];
      };
      
      return {
        'isSimple' : isSimple,
        'isBuiltIn' : isBuiltIn,
        'coerceType' : coerceType
      };
    };
    
    wm._35 = function (){
        return {
        'name': 'DC',
        'uri': 'http://www.omg.org/spec/DD/20100524/DC',
        'types': [
          {
            'name': 'Boolean'
          },
          {
            'name': 'Integer'
          },
          {
            'name': 'Real'
          },
          {
            'name': 'String'
          },
          {
            'name': 'Font',
            'properties': [
              {
                'name': 'name',
                'type': 'String',
                'isAttr': true
              },
              {
                'name': 'size',
                'type': 'Real',
                'isAttr': true
              },
              {
                'name': 'isBold',
                'type': 'Boolean',
                'isAttr': true
              },
              {
                'name': 'isItalic',
                'type': 'Boolean',
                'isAttr': true
              },
              {
                'name': 'isUnderline',
                'type': 'Boolean',
                'isAttr': true
              },
              {
                'name': 'isStrikeThrough',
                'type': 'Boolean',
                'isAttr': true
              }
            ]
          },
          {
            'name': 'Point',
            'properties': [
              {
                'name': 'x',
                'type': 'Real',
                'default': '0',
                'isAttr': true
              },
              {
                'name': 'y',
                'type': 'Real',
                'default': '0',
                'isAttr': true
              }
            ]
          },
          {
            'name': 'Bounds',
            'properties': [
              {
                'name': 'x',
                'type': 'Real',
                'default': '0',
                'isAttr': true
              },
              {
                'name': 'y',
                'type': 'Real',
                'default': '0',
                'isAttr': true
              },
              {
                'name': 'width',
                'type': 'Real',
                'isAttr': true
              },
              {
                'name': 'height',
                'type': 'Real',
                'isAttr': true
              }
            ]
          }
        ],
        'prefix': 'dc',
        'associations': []
      };
    };
    
    wm._j2SchemaXML = function () { 
      return {
      'name': 'j2',
      'uri': 'http://j2',
      'types': [
        {
          'name': 'advertencia', 
          'properties': [
            {
              'name': 'id',
              'isAttr' : true,
              'type': 'String'
            }            
          ]
        },       
        {
          'name': 'advertencias', 
          'properties': [
            {
              'name': 'advertencia',
              'isMany' : true,
              'type': 'advertencia'
            }            
          ]
        },        
        {
          'name': 'arElement',
          'properties': [
            {
               'name': 'keyEl',
               'isAttr': true,
               'type': 'String'
            }, 
            {
               'name': 'data',
               'isMany': false,
               'type': 'data'
            }, 
            {
              'name': 'simpleElementsDefs',
              'isFalse' : true,
              'type': 'simpleElementsDefs'
            }
          ]
        },  
        {
          'name': 'bodyInject',
          'properties': [    
            {
               'name': 'name',
               'isAttr': true,
               'type': 'String'
            },
            {
               'name': 'artifact',
               'isAttr': true,
               'type': 'String'
            },
            {
              'name': 'scope',
              'isAttr': true,
              'type': 'ENUM_SCOPE'
            }   
          ]
        }, 
        {
          'name': 'Chancela',
          'properties': [
            {
              'name': 'idSource',
               'isAttr': true,
               'type': 'String'
            },
            {
              'name': 'adjustStyle',
               'isAttr': true,
               'type': 'String'
            },            
            {
              'name': 'adjustStyleImg',
               'isAttr': true,
               'type': 'String'
            }            
          ]
        },              
        {
          'name': 'chancelaDataURI',
          'properties': [
            {
               'name': 'text',
               'isBody': true,
               'type': 'String'
            }
          ]
        },                      
        {
          'name': 'classe',
          'superClass': [
            'orderedElement'
          ],          
          'properties': [
          /*  {
               'name': 'classes',
               'isMany': true,
               'type': 'orderedElement'
            },*/          
              
            {
               'name': 'bodyInject',
               'isMany': true,
               'type': 'bodyInject'
            },                        
            {
               'name': 'constructs',
               'isMany': true,
               'type': 'constructs'
            },            
            {
               'name': 'importLib',
               'isMany': true,
               'type': 'importLib'
            },                        
            {
               'name': 'id',
               'isAttr': true,
               'type': 'String'
            },         
            {
               'name': 'versao',
               'isAttr': true,
               'type': 'String'
            },
            {
              'name': 'rendered',
              'type': 'String',
              'isAttr': true
            }            
          ]
        },
        {
          'name': 'classeDef',
          'superClass': [
            'modelo'
          ],          
          'properties': [
            /*{
               'name': 'id',
               'isAttr': true,
               'type': 'String'
            },         
            {
               'name': 'versao',
               'isMany': true,
               'type': 'versao'
            }*/
          ]
        },        
        {
          'name': 'classeImp',
          'superClass': [
            'classe'
          ],          
          'properties': [
            {
               'name': 'scope',
               'isAttr': true,
               'type': 'ENUM_SCOPE'
            }         
          ]
        },        
        {
          'name': 'classStyles',
          'properties': [
            {
               'name': 'style',
               'isMany': true,
               'type': 'style'
            }         
          ]
        },          
        {
          'name': 'competencia', 
          'properties': [
            {
              'name': 'id',
              'isAttr' : true,
              'type': 'String'
            }            
          ]
        },       
        {
          'name': 'competencias', 
          'properties': [
            {
              'name': 'competencia',
              'isMany' : true,
              'type': 'competencia'
            }            
          ]
        },
        {
          'name' : 'config',
          'properties': [
            {
              'name': 'dadosUsuariosLocal',
              'isMany': false,
              'type': 'dadosUsuariosLocal'
            },            
            {
              'name': 'globalStyle',
              'isMany': false,
              'type': 'globalStyle'
            },            
            {
              'name': 'servidorLocal',
              'isMany': false,
              'type': 'servidorLocal'
            },
            {
              'name': 'OJs',
              'isMany': false,
              'type': 'OJs'
            },            
            {
              'name': 'listaPostagem',
              'isMany': false,
              'type': 'listaPostagem'
            },     
            {
              'name': 'enderecoManual',
              'isMany': false,
              'type': 'enderecoManual'
            },           
            {
              'name': 'secretarios',
              'isMany': false,
              'type': 'secretarios'
            },    
            {
              'name': 'magistrados',
              'isMany': false,
              'type': 'magistrados'
            },
            {
              'name': 'expedientes',
              'isMany': false,
              'type': 'expedientes'
            },
           {
             'name': 'correicao',
             'isMany': false,
             'type': 'correicao'
           }                  
          ]
        },
        {
          'name': 'constructs',
          'properties': [    
            {
               'name': 'param',
               'isAttr': true,
               'type': 'String'
            },
            {
               'name': 'type',
               'isAttr': true,
               'type': 'String'
            },                        
            {
               'name': 'value',
               'isAttr': true,
               'type': 'String'
            },
            {
              'name': 'valueAr',
              'isMany': true,
              'type': 'valueAr'
            }
          ]
        },                                       
        {
          'name': 'correicao',
          'properties': [    
            {
               'name': 'inicio',
               'isAttr': true,
               'type': 'Date'
            },
            {
               'name': 'fim',
               'isAttr': true,
               'type': 'Date'
            }                        
          ]
        },  
        {
          'name': 'correiosParam',
          'properties': [    
            {
               'name': 'contrato',
               'isAttr': true,
               'type': 'String'
            },
            {
               'name': 'codAdmin',
               'isAttr': true,
               'type': 'String'
            },                        
            {
               'name': 'cartaoPostagem',
               'isAttr': true,
               'type': 'String'
            },                        
            {
               'name': 'codigoUnidade',
               'isAttr': true,
               'type': 'String'
            },                        
            {
               'name': 'unidPost',
               'isAttr': true,
               'type': 'String'
            },                        
            {
               'name': 'cliente',
               'isAttr': true,
               'type': 'String'
            }
          ]
        },    
        {
          'name': 'customSign',
          'properties': [
            {
               'name': 'simpleElementsDefs',
               'isMany': false,
               'type': 'simpleElementsDefs'
            }         
          ]
        },  
        {
         'name': 'dadosUsuariosLocal',
         'properties': [
           {
              'name': 'avaliable',
              'isAttr': true,
              'type': 'Boolean'
           },           
           {
             'name': 'j2Xml',
             'isMany': false,
             'type': 'j2Xml'
           }
         ]
       },            
        {
         'name': 'data',
         'properties': [
           {
              'name': 'text',
              'isBody': true,
              'type': 'String'
           }
         ]
       },              
        {
          'name': 'Definitions',
          'properties': [
            {
              'name': 'classeDefs',
              'isMany': true,
              'type': 'classeDef'
            },          
            {
              'name': 'id',
              'isAttr': true,
              'type': 'String'
            },
            {
              'name': 'modelos',
              'isMany': true,
              'type': 'modelo'
            },                  
            {
              'name': 'unidades',
              'isMany': true,
              'type': 'Unidade'
            },                  
            {
              'name': 'usuarios',
              'isMany': true,
              'type': 'Usuarios'
            },             
            {
              'name': 'classStyles',
              'isMany': false,
              'type': 'classStyles'
            },             
            {
              'name': 'chancelaDataURI',
              'isMany': false,
              'type': 'chancelaDataURI'
            },             
            {
              'name': 'selectorDef',
              'isMany': false,
              'type': 'selectorDef'
            },             
            {
              'name': 'simpleElementsDefs',
              'isMany': false,
              'type': 'simpleElementsDefs'
            },             
            {
              'name': 'update',
              'isMany': false,
              'type': 'update'
            }                           
          ]
        },
        {
          'name': 'elemento',
          'superClass': [
            'orderedElement'
          ],
          'properties': [
            {
              'name': 'autoIncrementId',
              'isAttr': true,
              'type': 'String'
            },            
            {
              'name': 'class',
              'isAttr': true,
              'type': 'String'
            },            
            {
              'name': 'classBS',
              'isAttr': true,
              'type': 'String'
            },                        
            {
              'name': 'id',
              'isAttr': true,
              'type': 'String'
            },
            {
              'name': 'HTMLAttribute',
              'isMany': true,
              'type': 'HTMLAttribute'
            },/*
            {
              'name': 'modelos',
              'isMany': true,
              'type': 'modelo'
            }      */           
            {
              'name': 'scope',
              'isAttr': true,
              'type': 'ENUM_SCOPE'
            },           
            {
              'name': 'tag',
              'isAttr': true,
              'type': 'String'
            },          
            {
              'name': 'value',
              'isAttr': true,
              'type': 'String'
            },
            {
              'name': 'text',
              'isBody': true,
              'type': 'String'
            },   
            {
              'name': 'onclick',
              'isAttr': true,
              'type': 'String'
            },
            {
              'name': 'rendered',
              'type': 'String',
              'isAttr': true
            }
          ]
        },        
        {
          'name': 'enderecoManual',
          'properties': [
            {
              'name': 'edificacaoENominada',
              'isAttr': true,
              'type': 'Boolean'
            },            
            {
              'name': 'nomeEdificacao',
              'isAttr': true,
              'type': 'String'
            },
            {
              'name': 'enderecoFormal',
              'isAttr': true,
              'type': 'String'
            },       
            {
              'name': 'contatosFormal',
              'isAttr': true,
              'type': 'String'
            },                   
            {
              'name': 'rua',
              'isAttr': true,
              'type': 'String'
            },
            {
              'name': 'numero',
              'isAttr': true,
              'type': 'String'
            },
            {
              'name': 'bairro',
              'isAttr': true,
              'type': 'String'
            },
            {
              'name': 'complemento',
              'isAttr': true,
              'type': 'String'
            },
            {
              'name': 'cidade',
              'isAttr': true,
              'type': 'String'
            },
            {
              'name': 'uf',
              'isAttr': true,
              'type': 'String'
            },
            {
              'name': 'cep',
              'isAttr': true,
              'type': 'String'
            },
            {
              'name': 'telefone',
              'isAttr': true,
              'type': 'String'
            },
            {
              'name': 'eMail',
              'isAttr': true,
              'type': 'String'
            }  
          ]
        },          
        {
          'name': 'eventFire',
          'properties': [
            {
              'name': 'event',
              'isAttr' : true,
              'type': 'String'
            }            
          ]
        }, 
        {
          'name': 'expedientes',
          'properties': [
            {
              'name': 'porProvimento',
              'isAttr' : true,
              'type': 'Boolean'
            }            
          ]
        },    
        {
          'name': 'extnds',
          'properties': [
            {
              'name': 'id',
              'isReference': true,
              'isAttr' : true,
              'type': 'String'
            }            
          ]
        },    
        {
          'name': 'gItem',
          'properties': [
            {
              'name': 'id',
              'isAttr' : true,
              'type': 'String'
            }            
          ]
        },             
        {
         'name': 'globalStyle',
         'superClass': [
            'classStyles'
          ],
         'properties': [
           /*{
              'name': 'dobBinId',
              'isAttr': true,
              'type': 'Integer'
           },           
           {
              'name': 'assuntoId',
              'isAttr': true,
              'type': 'String'
           },          
           {
              'name': 'libId',
              'isAttr': true,
              'type': 'String'
           }     */                
         ]
       },  
        {
          'name': 'group',
          'properties': [
            {
              'name': 'label',
              'isAttr' : true,
              'type': 'String'
            },                       
            {
              'name': 'gItem',
              'isMany' : true,
              'type': 'gItem'
            },
            {
              'name': 'competencias',
              'isMany': false,
              'type': 'competencias'
            }
          ]
        },          
        {
          'name': 'groupsDefs',
          'properties': [
            {
              'name': 'group',
              'isMany' : true,
              'type': 'group'
            }            
          ]
        },         
        {
         'name': 'HTMLAttribute',
         'properties': [
           {
              'name': 'name',
              'isAttr': true,
              'type': 'String'
           },             
           {
              'name': 'value',
              'isAttr': true,
              'type': 'String'
           },
           {
              'name': 'type',
              'isAttr': true,
              'type': 'String'
           }                      
         ]
       },    
        {
          'name': 'importLib',
          'properties': [    
            {
               'name': 'name',
               'isAttr': true,
               'type': 'String'
            },
            {
               'name': 'artifact',
               'isAttr': true,
               'type': 'String'
            },
             {
              'name': 'scope',
              'isAttr': true,
              'type': 'ENUM_SCOPE'
            }
          ]
        },        
        {
         'name': 'innerContent',
         'superClass': [
           'orderedElement'
         ],
         'properties': [
            {
              'name': 'scope',
              'isAttr': true,
              'type': 'ENUM_SCOPE'
            }
         ]
       },  
        {
          'name': 'item',
          'properties': [
            {
              'name': 'id',
              'isAtre' : true,
              'type': 'String'
            },            
            {
              'name': 'label',
              'isAtre' : true,
              'type': 'String'
            },
            {
              'name': 'dataPlus',
              'isAtre' : true,
              'type': 'String'
            },
            {
              'name': 'eventFire',
              'isMany' : true,
              'type': 'eventFire'
            },
            {
              'name': 'itemContent',
              'isAtre' : true,
              'type': 'itemContent'
            },           
            {
              'name': 'competencias',
              'isMany': false,
              'type': 'competencias'
            },
            {
              'name': 'advertencias',
              'isMany': false,
              'type': 'advertencias'
            }            
          ]
        },             
        {
          'name': 'itemContent',
          'properties': [
            {
              'name': 'type',
              'isAtre' : true,
              'type': 'ENUM_CONTENT_TYPE'
            },            
            {
              'name': 'addtClassStyles',
              'isAttr' : true,
              'type': 'String'
            },
            {
              'name': 'selectorArray',
              'isMany' : false,
              'type': 'selectorArray'
            },
            {
              'name': 'data',
              'isMany' : false,
              'type': 'data'
            },
            {
              'name': 'simpleElementsDefs',
              'isFalse' : true,
              'type': 'simpleElementsDefs'
            }/*,
            {
              'name': 'itemContent',
              'isAtre' : true,
              'type': 'itemContent'
            }*/
          ]
        },          
        {
          'name': 'itemFormats',
          'properties': [
            {
              'name': 'elemento',
              'isMany' : true,
              'type': 'elemento'
            }            
          ]
        },        
        {
          'name': 'items', 
          'properties': [
            {
              'name': 'item',
              'isMany' : true,
              'type': 'item'
            },
            {
              'name': 'initialSelected',
              'isAttr' : true,
              'type': 'String'
            }            
          ]
        },               
        {
         'name': 'j2Xml',
         'properties': [
           {
              'name': 'dobBinId',
              'isAttr': true,
              'type': 'Integer'
           },           
           {
              'name': 'assuntoId',
              'isAttr': true,
              'type': 'String'
           },          
           {
              'name': 'libId',
              'isAttr': true,
              'type': 'String'
           }                     
         ]
       },   
        {
          'name': 'listaPostagem', 
          'properties': [
            {
              'name': 'enabled',
              'isAttr' : true,
              'type': 'Boolean'
            }            
          ]
        },           
       {
         'name': 'magistrados',
         'properties': [
           {
             'name': 'emExercicio',
             'isAttr': true,
             'type': 'String'
           },
           {
             'name': 'titular',
             'isAttr': true,
             'type': 'String'
           },
           {
             'name': 'respondente',
             'isAttr': true,
             'type': 'String'
           },           
           {
             'name': 'respondente1',
             'isAttr': true,
             'type': 'String'
           },           
           {
             'name': 'respondente2',
             'isAttr': true,
             'type': 'String'
           },           
           {
             'name': 'respondente3',
             'isAttr': true,
             'type': 'String'
           },           
           {
             'name': 'respondente4',
             'isAttr': true,
             'type': 'String'
           },                      
           {
             'name': 'substituto',
             'isAttr': true,
             'type': 'String'
           },
           {
             'name': 'presidente',
             'isAttr': true,
             'type': 'String'
           },           
           {
             'name': 'presidente1',
             'isAttr': true,
             'type': 'String'
           },           
           {
             'name': 'presidente2',
             'isAttr': true,
             'type': 'String'
           },           
           {
             'name': 'presidente3',
             'isAttr': true,
             'type': 'String'
           },           
           {
             'name': 'presidente4',
             'isAttr': true,
             'type': 'String'
           },       
           {
             'name': 'presidente5',
             'isAttr': true,
             'type': 'String'
           },           
           {
             'name': 'presidente6',
             'isAttr': true,
             'type': 'String'
           },           
           {
             'name': 'presidente7',
             'isAttr': true,
             'type': 'String'
           }
         ]
       },        
        {
          'name': 'modelo',
          'properties': [
            {
               'name': 'versao',
               'isMany': true,
               'type': 'versao'
            },
            {
               'name': 'id',
               'isAttr': true,
               'type': 'String'
            },
            {
               'name': 'classStyles',
               'isMany': false,
               'type': 'classStyles'
            }                
          ]
        },       
       {
         'name': 'modeloAut',
         'properties': [
           {
              'name': 'id',
              'isAttr': true,
              'type': 'String'
           },
           {
              'name': 'versao',
              'isAttr': true,
              'type': 'String'
           }           
         ]
       },
        {
         'name': 'modelosAut',
         'properties': [
           {
              'name': 'modeloAut',
              'isMany': true,
              'type': 'modeloAut'
           }
         ]
       },
        {
         'name': 'OJs',
         'properties': [
           {
              'name': 'centralMandados',
              'isAttr': true,
              'type': 'Boolean'
           },           
           {
             'name': 'usuarioRef',
             'isMany': true,
             'type': 'usuarioRef'
           }
         ]
       },            
        {
         'name': 'orderedElement',
         'properties': [
           {
             'name' : 'configPart',
             'isMany': true,
             'type' : 'orderedElement'
           }
         ]
       },       
       {
         'name': 'OutrasFuncoes',
         /*'superClass': [
            'orderedElement'
          ],       */
         'properties': [
           {
              'name': 'funcao',
              'isAttr': true,
              'type': 'String'
           }
         ]
       },       
        {
         'name': 'prop',
         'properties': [
           {
             'name' : 'name',
             'isAttr': true,
             'type' : 'String'
           },
           {
             'name' : 'value',
             'isAttr': true,
             'type' : 'String'
           }           
         ]
       },             
       {
         'name': 'valueAr',
         'properties': [
           /*{
             'name' : 'name',
             'isAttr': true,
             'type' : 'String'
           },*/
           {
             'name' : 'value',
             'isAttr': true,
             'type' : 'String'
           }           
         ]
       },       
       {
         'name': 'preside',
         'properties': [
           {
             'name' : 'processo',
             'isAttr': true,
             'type' : 'String'
           },
{
             'name' : 'portariaOrgao',
             'isAttr': true,
             'type' : 'String'
           },
{
             'name' : 'portariaNumero',
             'isAttr': true,
             'type' : 'String'
           }                   
         ]
       },              
        {
         'name': 'presidente',
         'properties': [
           {
             'name' : 'preside',
             'isMany': true,
             'type' : 'preside'
           }           
         ]
       },                     
        {
         'name': 'Unidade',
         'properties': [
           {
              'name': 'config',
              'isMany': false,
              'type': 'config'
           },           
           {
              'name': 'competencias',
              'isMany': false,
              'type': 'competencias'
           },               
           {
             'name': 'id',
             'isAttr': true,
             'type': 'String'
           },           
           {
             'name': 'genr',
             'isAttr': true,
             'type': 'String'
           },
           {
             'name': 'comarca',
             'isAttr': true,
             'type': 'String'
           },           
           {
             'name': 'comarcaGenr',
             'isAttr': true,
             'type': 'String'
           },           
           {
             'name': 'nomeFormal',
             'isAttr': true,
             'type': 'String'
           },        
           {
             'name': 'modelosAut',
             'isMany': false,
             'type': 'modelosAut'
           },
           {
             'name': 'correiosParam',
             'isMany': false,
             'type': 'correiosParam'
           }
         ]
       },
       {
         'name': 'secretarios',
         'properties': [
           {
             'name': 'emExercicio',
             'isAttr': true,
             'type': 'String'
           },
           {
             'name': 'titular',
             'isAttr': true,
             'type': 'String'
           },
           {
             'name': 'substituto',
             'isAttr': true,
             'type': 'String'
           }
         ]
       },       
        {
          'name': 'selectorDef',
          'properties': [
            {
               'name': 'id',
               'isAttr': true,
               'type': 'String'
            },
            {
               'name': 'grouped',
               'isAttr': true,
               'type': 'Boolean'
            },
            {
               'name': 'eventFire',
               'isMany': true,
               'type': 'eventFire'
            },
            {
               'name': 'itemFormats',
               'isMany': false,
               'type': 'itemFormats'
            },
            {
               'name': 'groupsDefs',
               'isMany': false,
               'type': 'groupsDefs'
            },
            {
               'name': 'items',
               'isMany': false,
               'type': 'items'
            }                  
          ]
        },      
        {
          'name': 'selectorArray',
          'properties': [
            {
               'name': 'arElement',
               'isMany': true,
               'type': 'arElement'
            }                  
          ]
        },              
        {
         'name': 'servidorLocal',
         'properties': [
           {
              'name': 'avaliable',
              'isAttr': true,
              'type': 'Boolean'
           },           
           {
             'name': 'domain',
             'isAttr': true,
             'type': 'String'
           }
         ]
       },       
       {
         'name': 'simpleElementsDefs',
         /*'superClass': [
            'orderedElement'
          ],       */
         'properties': [
           {
              'name': 'elemento',
              'isMany': true,
              'type': 'elemento'
           }
         ]
       },                     
        {
         'name': 'style',
         'properties': [
           {
              'name': 'id',
              'isAttr': true,
              'type': 'String'
           },           
           {
             'name': 'prop',
             'isMany': true,
             'type': 'prop'
           },           
           {
             'name': 'extnds',
             'isMany': false,
             'type': 'extnds'
           }
         ]
       },              
        {
         'name': 'textHTML',
         'superClass': [
           'orderedElement'
         ],
         'properties': [
           {
              'name': 'data',
              'isMany': false,
              'type': 'data'
           },           
           {
              'name': 'scope',
              'isAttr': true,
              'type': 'ENUM_SCOPE'
           }           
         ]         
       },   
        {
         'name': 'titularidade',
         'properties': [
           {
              'name': 'unidade',
              'isAttr': true,
              'type': 'String'
           },           
           {
             'name': 'unidadeGenr',
             'isAttr': true,
             'type': 'String'
           },           
           {
             'name': 'nominacao',
             'isAttr': true,
             'type': 'String'
           }
         ]
       },          
       {
         'name': 'Usuario',
         'properties': [
           {
             'name': 'id',
             'isAttr': true,
             'type': 'String'
           },
           {
             'name': 'ini',
             'isAttr': true,
             'type': 'String'
           },
           {
             'name': 'nome',
             'isAttr': true,
             'type': 'String'
           },
           {
             'name': 'cargo',
             'isAttr': true,
             'type': 'String'
           },
           {
             'name': 'matricula',
             'isAttr': true,
             'type': 'matricula'
           },
           {
             'name': 'genr',
             'isAttr': true,
             'type': 'String'
           },           
           {
             'name': 'chancela',
             'isMany': false,
             'type': 'Chancela'
           },
           {
             'name': 'titularidade',
             'isMany': false,
             'type': 'titularidade'
           },
           {
             'name': 'customSign',
             'isMany': false,
             'type': 'customSign'
           },           
           {
             'name': 'presidente',
             'isMany': false,
             'type': 'presidente'
           },           
           {
             'name': 'outrasFuncoes',
             'isMany': true,
             'type': 'OutrasFuncoes'
           }
         ]
       },        
       {
         'name': 'usuarioRef',
         'properties': [
           {
             'name': 'id',
             'isAttr': true,
             'type': 'String'
           }
         ]
       },           
       {
         'name': 'Usuarios',
         'properties': [
           {
             'name': 'versao',
             'isAttr': true,
             'type': 'String'
           },
           {
              'name': 'usuario',
              'isMany': true,
              'type': 'Usuario'
           }           
         ]
       },           
       {
         'name': 'update',
         'properties': [
           {
             'name': 'forceUpdateNextLoad',
             'isAttr': true,
             'type': 'Boolean'
           },
           {
              'name': 'currentRevision',
              'isMany': true,
              'type': 'Integer'
           }           
         ]
       },              
        {
         'name': 'versao',
          'superClass': [
            'orderedElement'
          ],         
         'properties': [
           /*{
             'name': 'configPart',
             'isMany': true,
             'type': 'orderedElement'
           },/*
           {
             'name': 'elemento',
             'isMany': true,
             'type': 'elemento'
           },    */       
           {
              'name': 'id',
              'isAttr': true,
              'type': 'String'
           }
         ]
       }       
      ],
      'emumerations': [
          {
            'name': 'ENUM_SCOPE',
            'literalValues': [
              {
                'name': 'EXP'
              },
              {
                'name': 'EDT'
              },
              {
                'name': 'EDT_CORE'
              },
              {
                'name': 'EDT_BOTTOM'
              }
            ]
          },
{
            'name': 'ENUM_CONTENT_TYPE',
            'literalValues': [
              {
                'name': 'HTML'
              },
              {
                'name': 'selectorArray'
              },
              {
                'name': 'plainText'
              },
              {
                'name': 'simpleElementsDefs'
              }
            ]
          }          
      ],
      'associations': [],
      'prefix': 'j2'
    };
    };
    
    wm._j2ModdleConstructor = function () { 
      var assign = new wm._206;
      var j2Moddle = new wm._j2Moddle;

      var packages = {
        dc: new wm._35,
        j2: new wm._j2SchemaXML 
      };

      return function (additionalPackages, options) {
        return new j2Moddle(assign({}, packages, additionalPackages), options);
      };
    };
    
    wm._j2Moddle = function () { 
      var isString = new wm._203,
          isFunction = new wm._198,
          assign = new wm._206;

      var Moddle = new window.j2.mod._._24,
          XmlReader = new window.j2.mod._._20;

      function j2Moddle(packages, options) {
        Moddle.call(this, packages, options);
      };

      j2Moddle.prototype = Object.create(Moddle.prototype);

      
      j2Moddle.prototype.fromXML = function (xmlStr, typeName, options, done) {

        if (!isString(typeName)) {
          done = options;
          options = typeName;
          typeName = 'LayBid:Definitions';
        }

        if (isFunction(options)) {
          done = options;
          options = {};
        }
        var reader = new XmlReader.XMLReader(assign({ model: this, lax: true }, options));
        
        var rootHandler = reader.handler(typeName); 
         
        reader.fromXML(xmlStr, rootHandler, done);
      };
 
      return j2Moddle;
    };
    

    
    window.j2.mod.j2Moddle = new(new window.j2.mod._._j2ModdleConstructor())({});
    
  })();
/*} catch (err) {
  var t = 'ERROR: ' + err.message + ' | ' + window.j2.res.MAIN.xmlParser.lib;
  alert(t);
  console.error(t);
}*/