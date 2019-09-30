const CLASSES = Object.freeze( {
  CONTAINER: 'js-todo-notification',
  MESSAGE: 'js-alert-content'
} );

const VISIBLE_CLASS = 'm-notification__visible';
const SHOW_DEFAULT_MESSAGE = 'Item added to your to-do list.';
const HIDE_DEFAULT_MESSAGE = 'Item removed from your to-do list.';

/**
 * TodoNotification
 * @class
 *
 * @classdesc Handles behaviors around showing and hiding the
 * 'added to to-do list' notification HTML.
 *
 */
function TodoNotification() {
  const self = this;

  let cancel;
  let clone;
  let initialized = false;
  let registeredNode;
  let speed;

  /**
   * Remove notifications and clear timer
   */
  function _clearAll() {
    clearTimeout( cancel );
    _clearAlert();
  }

  /**
   * Removes the notification node from the DOM
   */
  function _clearAlert() {
    if ( clone ) {
      registeredNode.removeChild( clone );
      clone = null;
      cancel = null;
    }
  }

  function handleTransitionEnd() {
    registeredNode.appendChild(clone);

    window.requestAnimationFrame(() => {
      clone.classList.add('fade-in')
      registeredNode.removeEventListener('transitionend', handleTransitionEnd);
      clone.classList.remove('fade-in-begin')
    });
  }

  /**
   * Helper function to clone + append notification node
   * @param {String} message The message the notification should display
   */
  function _cloneNotification( message ) {
    const containerHeight = registeredNode.scrollHeight;
    registeredNode.style.height = `${containerHeight}px`;
    registeredNode.addEventListener('transitionend', handleTransitionEnd);
    clone = self.element.cloneNode( true );

    clone.style = 'position: absolute; top: -999999px; left: -999999px';

    clone.classList.add(VISIBLE_CLASS);
    registeredNode.appendChild(clone);

    const alertHeight = clone.scrollHeight;

    registeredNode.removeChild(clone);

    clone.classList.remove(VISIBLE_CLASS);
    clone.style = '';
    clone.querySelector( `.${ CLASSES.MESSAGE }` ).textContent = message;
    clone.classList.add( VISIBLE_CLASS, 'fade-in-begin' );
    registeredNode.style.height = `${containerHeight + alertHeight}px`;
  }

  /**
   * Show a notification.
   * @param {String} message The optional message supplied to the notification
   */
  function _show( message = SHOW_DEFAULT_MESSAGE ) {
    if ( initialized ) {
      clearTimeout( cancel );
      _clearAlert();
      _cloneNotification( message );
    }
  }

  /**
   * Display a removal notification, then remove it from the DOM.
   * @param {String} message The optional message supplied to the notification
   */
  function _hide( message = HIDE_DEFAULT_MESSAGE ) {
    if ( initialized ) {
      clearTimeout( cancel );
      _clearAlert();
      _cloneNotification( message );
      cancel = setTimeout( _clearAlert, speed );
    }
  }

  /**
   * Remove the notification and clear the timer
   */
  function _remove() {
    if ( initialized && clone ) {
      _clearAll();
    }
  }

  /**
   * Perform set up operations on the instance
   *
   * @param {HTMLElement} node The container element the notification should be appended to
   * @param {Number} duration The length of time until the notification is removed from the DOM.
   * This only applies when toggling the notification off.
   *
   * @returns {TodoNotification} Itself.
   */
  function _init( node, duration = 2000 ) {
    if ( !node || !( node instanceof HTMLElement ) ) {
      throw new TypeError( 'This component must be initialized with a valid DOM node.' );
    }

    if ( !initialized ) {
      speed = duration;
      registeredNode = node;
      initialized = true;

      if ( !self.element ) {
        self.element = document.querySelector( `.${ CLASSES.CONTAINER }` );
      }
    }

    return self;
  }

  this.element = null;
  this.show = _show;
  this.hide = _hide;
  this.remove = _remove;
  this.init = _init;
}

TodoNotification.CLASSES = CLASSES;

export default TodoNotification;
