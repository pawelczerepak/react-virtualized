'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var _Grid = require('../Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
          newObj[key] = obj[key];
      }
    }
    newObj.default = obj;
    return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  }
  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' +
        typeof superClass,
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

/**
 * It is inefficient to create and manage a large list of DOM elements within a scrolling container
 * if only a few of those elements are visible. The primary purpose of this component is to improve
 * performance by only rendering the DOM nodes that a user is able to see based on their current
 * scroll position.
 *
 * This component renders a virtualized list of elements with either fixed or dynamic heights.
 */

var List = (function(_React$PureComponent) {
  _inherits(List, _React$PureComponent);

  function List() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, List);

    for (
      var _len = arguments.length, args = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }

    return (
      (_ret = ((_temp = ((_this = _possibleConstructorReturn(
        this,
        (_ref = List.__proto__ || Object.getPrototypeOf(List)).call.apply(
          _ref,
          [this].concat(args),
        ),
      )),
      _this)),
      (_this._cellRenderer = function(_ref2) {
        var parent = _ref2.parent,
          rowIndex = _ref2.rowIndex,
          style = _ref2.style,
          isScrolling = _ref2.isScrolling,
          isVisible = _ref2.isVisible,
          key = _ref2.key;
        var rowRenderer = _this.props.rowRenderer;

        // TRICKY The style object is sometimes cached by Grid.
        // This prevents new style objects from bypassing shallowCompare().
        // However as of React 16, style props are auto-frozen (at least in dev mode)
        // Check to make sure we can still modify the style before proceeding.
        // https://github.com/facebook/react/commit/977357765b44af8ff0cfea327866861073095c12#commitcomment-20648713

        var _Object$getOwnPropert = Object.getOwnPropertyDescriptor(
            style,
            'width',
          ),
          writable = _Object$getOwnPropert.writable;

        if (writable) {
          // By default, List cells should be 100% width.
          // This prevents them from flowing under a scrollbar (if present).
          style.width = '100%';
        }

        return rowRenderer({
          index: rowIndex,
          style: style,
          isScrolling: isScrolling,
          isVisible: isVisible,
          key: key,
          parent: parent,
        });
      }),
      (_this._setRef = function(ref) {
        _this.Grid = ref;
      }),
      (_this._onScroll = function(_ref3) {
        var clientHeight = _ref3.clientHeight,
          scrollHeight = _ref3.scrollHeight,
          scrollTop = _ref3.scrollTop;
        var onScroll = _this.props.onScroll;

        onScroll({
          clientHeight: clientHeight,
          scrollHeight: scrollHeight,
          scrollTop: scrollTop,
        });
      }),
      (_this._onSectionRendered = function(_ref4) {
        var rowOverscanStartIndex = _ref4.rowOverscanStartIndex,
          rowOverscanStopIndex = _ref4.rowOverscanStopIndex,
          rowStartIndex = _ref4.rowStartIndex,
          rowStopIndex = _ref4.rowStopIndex;
        var onRowsRendered = _this.props.onRowsRendered;

        onRowsRendered({
          overscanStartIndex: rowOverscanStartIndex,
          overscanStopIndex: rowOverscanStopIndex,
          startIndex: rowStartIndex,
          stopIndex: rowStopIndex,
        });
      }),
      _temp)),
      _possibleConstructorReturn(_this, _ret)
    );
  }

  _createClass(List, [
    {
      key: 'forceUpdateGrid',
      value: function forceUpdateGrid() {
        if (this.Grid) {
          this.Grid.forceUpdate();
        }
      },

      /** See Grid#getOffsetForCell */
    },
    {
      key: 'getOffsetForRow',
      value: function getOffsetForRow(_ref5) {
        var alignment = _ref5.alignment,
          index = _ref5.index;

        if (this.Grid) {
          var _Grid$getOffsetForCel = this.Grid.getOffsetForCell({
              alignment: alignment,
              rowIndex: index,
              columnIndex: 0,
            }),
            _scrollTop = _Grid$getOffsetForCel.scrollTop;

          return _scrollTop;
        }
        return 0;
      },

      /** CellMeasurer compatibility */
    },
    {
      key: 'invalidateCellSizeAfterRender',
      value: function invalidateCellSizeAfterRender(_ref6) {
        var columnIndex = _ref6.columnIndex,
          rowIndex = _ref6.rowIndex;

        if (this.Grid) {
          this.Grid.invalidateCellSizeAfterRender({
            rowIndex: rowIndex,
            columnIndex: columnIndex,
          });
        }
      },

      /** See Grid#measureAllCells */
    },
    {
      key: 'measureAllRows',
      value: function measureAllRows() {
        if (this.Grid) {
          this.Grid.measureAllCells();
        }
      },

      /** CellMeasurer compatibility */
    },
    {
      key: 'recomputeGridSize',
      value: function recomputeGridSize() {
        var _ref7 =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : {},
          _ref7$columnIndex = _ref7.columnIndex,
          columnIndex = _ref7$columnIndex === undefined ? 0 : _ref7$columnIndex,
          _ref7$rowIndex = _ref7.rowIndex,
          rowIndex = _ref7$rowIndex === undefined ? 0 : _ref7$rowIndex;

        if (this.Grid) {
          this.Grid.recomputeGridSize({
            rowIndex: rowIndex,
            columnIndex: columnIndex,
          });
        }
      },

      /** See Grid#recomputeGridSize */
    },
    {
      key: 'recomputeRowHeights',
      value: function recomputeRowHeights() {
        var index =
          arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        if (this.Grid) {
          this.Grid.recomputeGridSize({
            rowIndex: index,
            columnIndex: 0,
          });
        }
      },

      /** See Grid#scrollToPosition */
    },
    {
      key: 'scrollToPosition',
      value: function scrollToPosition() {
        var scrollTop =
          arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        if (this.Grid) {
          this.Grid.scrollToPosition({scrollTop: scrollTop});
        }
      },

      /** See Grid#scrollToCell */
    },
    {
      key: 'scrollToRow',
      value: function scrollToRow() {
        var index =
          arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        if (this.Grid) {
          this.Grid.scrollToCell({
            columnIndex: 0,
            rowIndex: index,
          });
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var _props = this.props,
          className = _props.className,
          noRowsRenderer = _props.noRowsRenderer,
          scrollToIndex = _props.scrollToIndex,
          width = _props.width;

        var classNames = (0, _classnames2.default)(
          'ReactVirtualized__List',
          className,
        );

        return React.createElement(
          _Grid2.default,
          _extends({}, this.props, {
            autoContainerWidth: true,
            cellRenderer: this._cellRenderer,
            className: classNames,
            columnWidth: width,
            columnCount: 1,
            noContentRenderer: noRowsRenderer,
            onScroll: this._onScroll,
            onSectionRendered: this._onSectionRendered,
            ref: this._setRef,
            scrollToRow: scrollToIndex,
          }),
        );
      },
    },
  ]);

  return List;
})(React.PureComponent);

List.defaultProps = {
  autoHeight: false,
  estimatedRowSize: 30,
  onScroll: function onScroll() {},
  noRowsRenderer: function noRowsRenderer() {
    return null;
  },
  onRowsRendered: function onRowsRendered() {},
  overscanIndicesGetter: _Grid.accessibilityOverscanIndicesGetter,
  overscanRowCount: 10,
  scrollToAlignment: 'auto',
  scrollToIndex: -1,
  style: {},
};
exports.default = List;
