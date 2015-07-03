/**
 * 事件管理
 * @class event
 * @static
 */
define(function(require, exports, module) {
	var env = require('env');
	var mp = require('mp');

	//事件处理方法
	var _handlers = {};

	//默认判断是否有事件的函数
	var _defalutJudgeFn = function(elem, type){
		return !!elem.getAttribute('data-'+type+'-event');
	};

	//默认获取事件key的函数
	var _defaultGetEventkeyFn = function(elem, type){
		return elem.getAttribute('data-'+type+'-event');
	};

	//添加事件监听
	var addEvent = function (elem, event, fn) {
		if(elem.length){
			elem = elem[0];
		}
		elem.addEventListener(event, fn, true);
	};

	//移除事件监听
	var removeEvent = function(elem, event, fn){
		if(elem.length){
			elem = elem[0];
		}
		elem.removeEventListener(event, fn);
	};
	
	//获取元素中包含事件的第一个子元素
	var getWantTarget = function(evt, topElem, type, judgeFn){
		
		judgeFn = judgeFn || this.judgeFn || _defalutJudgeFn;
		
		var _targetE = evt.srcElement || evt.target;
		
		while( _targetE  ){
			
			if(judgeFn(_targetE, type)){
				return _targetE;
			}
			
			if( topElem == _targetE ){
				break;
			}
			
			if(_targetE != document.body){
				_targetE = _targetE.parentNode;
			}
			else{
				return null;
			}
		}
		return null;
	};

	var Event = mp.Class.extend({
		ctor:function(){
        },
        /**
		 * 通用的绑定事件处理
		 * @method bindEvent
		 * @param {Object} inst 对象
		 * @param {Element} topElem 要绑定事件的元素
		 * @param {String} type 绑定的事件类型
		 * @param {Object} handlerMap 事件处理的函数映射
		 * @param {Function} getEventkeyFn 取得事件对应的key的函数
		 */
		bindEvent:function (inst, topElem, type) {
			var handlerMap = _handlers[inst.$id][type],
				orginType = type,
				returnVal = null;
				
			if (type === 'click' && env.isMobile) {
				 type = 'tap';
			}
			
			var judgeFn = function (elem, type) {
				return !!_defalutJudgeFn(elem, type);
			};

			var hdl = function(e){
				/**
				 * 支持直接绑定方法
				 */
				var _target = getWantTarget(e, topElem, orginType, judgeFn), _hit = false;
				
				if (_target) {
					var _event = _defaultGetEventkeyFn(_target, orginType);
					var _returnValue;

					if(handlerMap && handlerMap[_event]){
						_returnValue = handlerMap[_event].call(inst, _target, e, _event);
						_hit = true;
					}
					if(_hit){
						if(!_returnValue){
							if(e.preventDefault){
				                e.preventDefault();
							}
				            else
				                e.returnValue = false;
						}
					}
				}
			};

			if (type === 'tap') {
				var x1=0,y1=0,x2=0,y2=0,flag = false;
				var tstart = function(e){
					var touch = e.touches[0];
					x1 = touch.pageX;
					y1 = touch.pageY;

					flag = false;
				};
				var tmove = function(e){
					
					var touch = e.touches[0];
					x2 = touch.pageX;
					y2 = touch.pageY;
					
					flag = true;
				};
				var tend = function(e){
					if(flag){
						var offset = Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
						if(offset < 5){
							hdl(e);
						}
					}
					else{
						hdl(e);
					}
				};
				addEvent(topElem,'touchstart',tstart);
				addEvent(topElem,'touchmove',tmove);
				addEvent(topElem,'touchend',tend);

				returnVal = {
					'touchstart':tstart,
					'touchmove':tmove,
					'touchend':tend
				};
			} else {
				addEvent(topElem, type, hdl);
				returnVal = hdl
			}
			//返回hdl用来解绑
			return returnVal;
		},

		/**
		 * 为topElem解绑元素
		 * @method unbindEvent
		 * @param {type} 事件类型
		 * @param {dealFn} 事件处理的函数
		 */
		unbindEvent:function(topElem, type, handler){
			if(hander){
				if(type === 'click' && util.isMobile()){
					//解绑touch事件
					for(p in handler){
						removeEvent(topElem, p, handler[p])
					}
				}
				else{
					removeEvent(topElem, type, handler);
				}
			}
		},

		/**
		 * 为body添加事件代理
		 * @method bindBodyEvent
		 * @param {string} eventName 事件类型
		 * @param {function} handler 事件处理的函数
		 */
		on:function(inst, eventName, handlerName, handler){
			_handlers[inst.$id] = _handlers[inst.$id] || {};
			_handlers[inst.$id].inst = inst;
			_handlers[inst.$id][eventName] = _handlers[inst.$id][eventName] || {};
			_handlers[inst.$id][eventName][handlerName] = handler;
		},

		off:function(inst, eventName, handlerName){
			if(!handler){
				if(!eventName){
					_handlers[inst.$id] = {};
				}
				else if(_handlers[inst.$id][eventName]){
					_handlers[inst.$id][eventName] = {};
				}
			}
			else{
				if(_handlers[inst.$id][eventName][handlerName]){
					handlers[inst.$id][eventName][handlerName] = null;
				}
			}
		},

		emit:function(elem, eventName, handlerName, data){
		}
	});

	Event.create = function(mpNode){
		return new Event(mpNode);
	}

	module.exports = Event;
});