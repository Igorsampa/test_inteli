export default class DialogModalPlugin {
  constructor(scene) {
    // the scene that owns the plugin
    this.scene = scene;
    this.systems = scene.sys;
    if (!scene.sys.settings.isBooted) {
      scene.sys.events.once('boot', this.boot, this);
    }
  }
  // Register this plugin with the PluginManager
  static register(PluginManager) {
    PluginManager.register('DialogModalPlugin', DialogModalPlugin, 'dialogModal');
  }
  // called when the plugin is loaded by the PluginManager
  boot() {
    var eventEmitter = this.systems.events;
    eventEmitter.on('shutdown', this.shutdown, this);
    eventEmitter.on('destroy', this.destroy, this);
  }
  //  Called when a Scene shuts down, it may then come back again later
  // (which will invoke the 'start' event) but should be considered dormant.
  shutdown() {
    if (this.timedEvent) this.timedEvent.remove();
    if (this.text) this.text.destroy();
  }
  // called when a Scene is destroyed by the Scene Manager
  destroy() {
    this.shutdown();
    if (this.graphics) this.graphics.destroy();
    this.scene = undefined;
  }
  // Initialize the dialog modal
  init(opts) {
    // Check to see if any optional parameters were passed
    if (!opts) opts = {};
    // set properties from opts object or use defaults
    this.borderThickness = opts.borderThickness || 5;
    this.borderColor = opts.borderColor || 0x2036c7;
    this.borderAlpha = opts.borderAlpha || 1;
    this.windowAlpha = opts.windowAlpha || 0.8;
    this.windowColor = opts.windowColor || 0x303030;
    this.windowHeight = opts.windowHeight || 150;
    this.padding = opts.padding || 50;
    this.dialogSpeed = opts.dialogSpeed || 4;
    this.depth = opts.depth;
    // used for animating the text
    this.eventCounter = 0;
    // if the dialog window is shown
    this.visible = true;
    // the current text in the window
    this.text;
    // the text that will be displayed in the window
    this.dialog;
    this.graphics;
    // Create the dialog window
    this._createWindow();
    // Set depth for graphics and text objects
    this.graphics.setDepth(this.depth || 3);  // You can customize the depth value
  }
  // Gets the width of the game (based on the scene)
  _getGameWidth() {
    return this.scene.sys.game.config.width;
  }
  // Gets the height of the game (based on the scene)
  _getGameHeight() {
    return this.scene.sys.game.config.height;
  }
  // Calculates where to place the dialog window based on the game size
  _calculateWindowDimensions(width, height) {
    var x = this.padding;
    var y = height - this.windowHeight - this.padding;
    var rectWidth = width - (this.padding * 2);
    var rectHeight = this.windowHeight;
    return {
      x,
      y,
      rectWidth,
      rectHeight
    };
  }
  // Creates the inner dialog window (where the text is displayed)
  _createInnerWindow(x, y, rectWidth, rectHeight) {
    // Style the rectangle
    this.graphics.fillStyle(this.windowColor, this.windowAlpha);
    // Create rectangle
    this.graphics.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1);
  }
  // Creates the border rectangle of the dialog window
  _createOuterWindow(x, y, rectWidth, rectHeight) {
    this.graphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha);
    this.graphics.strokeRect(x, y, rectWidth, rectHeight);
  }
  // Creates the close dialog window button
  toggleWindow() {
    this.visible = !this.visible;
    if (this.text) this.text.visible = this.visible;
    if (this.graphics) this.graphics.visible = this.visible;
  }
  // Sets the text for the dialog window
  setText(text, animate) {
    // Reset the dialog
    this.eventCounter = 0;
    this.dialog = text.split('');
    if (this.timedEvent) this.timedEvent.remove();
    var tempText = animate ? '' : text;
    this._setText(tempText, this.depth);
    if (animate) {
      this.timedEvent = this.scene.time.addEvent({
        delay: 25,
        callback: this._animateText,
        callbackScope: this,
        loop: true
      });
    }
  }
  // Slowly displays the text in the window to make it appear annimated
  _animateText() {
    this.eventCounter++;
    this.text.setText(this.text.text + this.dialog[this.eventCounter - 1]);
    if (this.eventCounter === this.dialog.length) {
      this.timedEvent.remove();
    }
  }
  // Calcuate the position of the text in the dialog window
  _setText(text, depth) {
    // Reset the dialog
    if (this.text) this.text.destroy();
    var x = this.padding + 10;
    var y = this._getGameHeight() - this.windowHeight - this.padding + 10;
    this.text = this.scene.make.text({
      x,
      y,
      text,
      style: {
        font: 'bold 25px Arial',
        wordWrap: { width: this._getGameWidth() - (this.padding * 2) - 25 }
      }
    });
    // Text Depth
    this.text.setDepth((depth || 3) + 1);
  }
  // Creates the dialog window
  _createWindow() {
    var gameHeight = this._getGameHeight();
    var gameWidth = this._getGameWidth();
    var dimensions = this._calculateWindowDimensions(gameWidth, gameHeight);
    this.graphics = this.scene.add.graphics();
    this._createOuterWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);
    this._createInnerWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);
  }
}
