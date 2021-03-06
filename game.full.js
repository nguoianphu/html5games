function onLoad() {
    new game.Main
}
////////////////////////////////////////////////////////
var __extends = this.__extends || function(a, b) {
        function c() {
            this.constructor = a
        }
        for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
        c.prototype = b.prototype, a.prototype = new c
    }, utils;
///////////////////////////////////////////////////////////////
! function(a) {
    var b = function(a) {
        function b(b, c, d) {
            "undefined" == typeof c && (c = 0), 
            "undefined" == typeof d && (d = 0), 
            a.call(this, b, b.stage, "FPS Meter"), 
            this.x = c, this.y = d, this.initBackground(), this.initText(), this.game.time.advancedTiming = !0
        }
        return __extends(b, a), 
        b.prototype.initBackground = function() {
            var a = 80,
                b = new Phaser.Graphics(this.game, 0, 0);
            b.beginFill(0, 1), 
            b.drawRect(0, 0, a, 22), 
            b.endFill(), 
            this.bg = new Phaser.Image(this.game, -12, -9, "test"), 
            this.bg.setTexture(b.generateTexture()), 
            this.add(this.bg), 
            b.destroy(), 
            b = null
        }, 
        b.prototype.initText = function() {
            var a = {
                font: "18px Consolas",
                fill: "#FFFFFF",
                align: "center"
            };
            this.statsText = this.game.add.text(5, 0, "0 fps", a, this)
        }, b.prototype.update = function() {
            var a = "FPS: " + this.game.time.fps;
            this.statsText.setText(a)
        }, b.prototype.destroy = function() {
            this.game.time.advancedTiming = !1, a.prototype.destroy.call(this)
        }, b
    }(Phaser.SpriteBatch);
    a.FPSMeter = b
}(utils || (utils = {}));
///////////////////////////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function() {
        function a() {}
        return a.GAME_WIDTH = 960, a.GAME_HEIGHT = 640, a.HALF_GAME_WIDTH = .5 * a.GAME_WIDTH, a.HALF_GAME_HEIGHT = .5 * a.GAME_HEIGHT, a
    }();
    a.Config = b
}(game || (game = {}));
///////////////////////////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(b) {
        function c() {
            b.apply(this, arguments)
        }
        return __extends(c, b), c.prototype.init = function() {
            this.game.device.android && !this.game.device.chrome && (this.game.canvas.parentElement.style.overflow = "visible");
            var a = {
                font: "45px GrilledCheeseBTNToasted",
                fill: "#FFFFFF",
                align: "center"
            }, b = this.add.text(0, 0, "0", a);
            b.setText("Loading..."), b.destroy()
        }, 
        c.prototype.preload = function() {
            this.load.image("rotate", "assets/graphics/rotate-phone.png"), 
            this.load.image("preloader_back", "assets/graphics/Preloader_Outer.png"), 
            this.load.image("preloader_front", "assets/graphics/Preloader_Inner.png")
        }, 
        c.prototype.create = function() {
            this.setupStage(), 
            this.detectWeakDevice(), 
            this.addFPSMeter(), 
            this.input.maxPointers = 1, 
            this.game.state.start("Preloader", !0, !1)
        }, 
        c.prototype.setupStage = function() {
            var b = this.game.scale;
            b.scaleMode = Phaser.ScaleManager.SHOW_ALL, 
            b.minWidth = .25 * a.Config.GAME_WIDTH, 
            b.minHeight = .25 * a.Config.GAME_HEIGHT, 
            b.aspectRatio = a.Config.GAME_WIDTH / a.Config.GAME_HEIGHT, 
            b.pageAlignHorizontally = !0, 
            b.pageAlignVertically = !0, 
            this.game.device.desktop || b.forceOrientation(!0, !1), 
                b.enterIncorrectOrientation.add(this.onEnterIncorrectOrientation, this), 
                b.leaveIncorrectOrientation.add(this.onLeaveIncorrectOrientation, this), 
            b.setScreenSize(!0), 
            this.stage.disableVisibilityChange = !0,
             this.stage.backgroundColor = 9755102
        }, 
        c.prototype.detectWeakDevice = function() {
            var b = !1;
            if (this.game.device.desktop === !1) {
                var c = detect.parse(window.navigator.userAgent);
                this.game.device.iOS && (c.os.major < 7 && (b = !0), 
                    c.browser.family.indexOf("Chrome") > -1 && (b = !0), 
                    this.game.device.webApp && (b = !0)), 
                this.game.device.android && (c.browser.family.indexOf("Android") > -1 && (b = !0),
                 c.browser.family.indexOf("Chrome Mobile") > -1 && c.browser.major <= 18 && (b = !0)), 
                this.game.device.windowsPhone && c.browser.family.indexOf("IE") > -1 && (b = c.browser.major < 10)
            }
            a.Main.weakDevice = b
        }, 
        c.prototype.addFPSMeter = function() {
            if (a.Main.development) {
                var b = new utils.FPSMeter(this.game, 0, a.Config.GAME_HEIGHT - 22);
                b.position.set(0, a.Config.GAME_HEIGHT - 22)
            }
        }, 
        c.prototype.onEnterIncorrectOrientation = function() {
            document.getElementById("orientation").style.display = "block", document.body.style.marginBottom = "0px"
        }, 
        c.prototype.onLeaveIncorrectOrientation = function() {
            document.getElementById("orientation").style.display = "none", document.body.style.marginBottom = "100px", 
            this.game.device.android && !this.game.device.chrome && this.game.scale.setScreenSize(!0)
        }, 
        c.prototype.render = function() {}, c
    }(Phaser.State);
    a.Boot = b
}(game || (game = {}));
/////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(b) {
        function c(c, d) {
            b.call(this, c, d), this.overlayDuration = 300, this.active = !0;
            var e = c.add.bitmapData(a.Config.GAME_WIDTH, a.Config.GAME_HEIGHT, "overlay", !0);
            e.context.fillStyle = "rgba(0, 0, 0, 1)", 
            e.context.fillRect(0, 0, a.Config.GAME_WIDTH, a.Config.GAME_HEIGHT), 
            this.overlay = new Phaser.Image(c, 0, 0, e), 
            this.overlay.visible = !1, this.game.stage.addChild(this.overlay)
        }
        return __extends(c, b), c.prototype.changeState = function(a, b) {
            this.showOverlay(a, b)
        }, 
        c.prototype.showOverlay = function(a, b) {
            var c = this;
            this.game.input.disabled = !0, 
            this.overlayTween && this.overlayTween.isRunning && this.overlayTween.stop(), 
            this.overlay.visible = !0, this.overlay.alpha = 0,
             this.overlayTween = this.game.add.tween(this.overlay).to({
                alpha: 1
            }, this.overlayDuration, Phaser.Easing.Cubic.Out, !0), 

             this.overlayTween.onComplete.addOnce(function() {
                c.doChangeState(a, b)
            }, this)
        }, 
        c.prototype.doChangeState = function(a, b) {
            var c = this;
            this.game.state.start(a, !0, !1, b), setTimeout(function() {
                c.hideOverlay()
            }, 100), setTimeout(function() {
                c.overlay.visible && (c.overlay.visible = !1)
            }, 100 + this.overlayDuration)
        }, 
        c.prototype.hideOverlay = function() {
            this.game.input.disabled = !1, 
            this.overlayTween && this.overlayTween.isRunning && this.overlayTween.stop(), 
            this.overlayTween = this.game.add.tween(this.overlay).to({
                alpha: 0
            }, this.overlayDuration, Phaser.Easing.Cubic.Out, !0)
        }, c
    }(Phaser.Plugin);
    a.StateTransition = b
}(game || (game = {}));
//////////////////////////////////////////////////////////

var game;
! function(a) {
    var b = function(b) {
        function c() {
            b.apply(this, arguments), 
            this.soundsToDecode = ["coin", "tap"], 
            this.soundsReady = !1, 
            this.assetsReady = !1, 
            this.updateEnabled = !0
        }
        return __extends(c, b), c.prototype.preload = function() {
            this.initPreloadBar(), 
            this.addLoadingText(), 
            this.loadAssets(), 
            this.game.device.webAudio ? (this.soundsReady = !1, this.game.sound.onSoundDecode.add(this.onSoundDecoded, this)) : this.soundsReady = !0
        }, 
        c.prototype.initPreloadBar = function() {
            if (a.Main.development === !1) {
                var b = this.add.image(0, 0, "preloader_back");
                b.anchor.set(.5, .5), b.x = a.Config.HALF_GAME_WIDTH, b.y = a.Config.HALF_GAME_HEIGHT - 60;
                var c = this.game.add.sprite(0, 0, "preloader_front");
                c.x = a.Config.HALF_GAME_WIDTH - .5 * c.width - 2, 
                c.y = a.Config.HALF_GAME_HEIGHT - .5 * c.height - 60, 
                this.load.setPreloadSprite(c)
            }
        }, 
        c.prototype.addLoadingText = function() {
            var b = {
                font: "45px GrilledCheeseBTNToasted",
                fill: "#FFFFFF",
                align: "center"
            };
            this.loadingText = this.game.add.text(0, 0, "Loading...", b), 
            this.loadingText.anchor.set(.5, .5), 
            this.loadingText.position.set(a.Config.HALF_GAME_WIDTH, a.Config.HALF_GAME_HEIGHT + 180), 
            this.loadingText.setShadow(2, 2, "#249BC8", 1), this.loadingText.setText("Loading...")
        }, 
        c.prototype.loadAssets = function() {
            this.load.bitmapFont("digits", "assets/fonts/grilled_cheese.png", "assets/fonts/grilled_cheese.fnt", null, 3), 
            this.load.json("texts", "assets/texts.json"),
            this.load.json("itemBlocks", "assets/blocks/Blocks.json"), 
            this.game.device.webAudio && (this.load.audio("coin", ["assets/audio/coin_collected.mp3"], !0), 
            this.load.audio("tap", ["assets/audio/tap.wav"], !0), 
            this.load.audio("bonus", ["assets/audio/bonus_collected.mp3"], !0),
            this.load.audio("explosion", ["assets/audio/explosion.wav"], !0), 
            this.load.audio("buy", ["assets/audio/buy.wav"], !0), 
            this.load.audio("no_coins", ["assets/audio/not_enough_money.mp3"], !0), 
            this.load.audio("rocket_alert", ["assets/audio/rocket_alert.wav"], !0), 
            this.load.audio("rocket", ["assets/audio/rocket.wav"], !0)), 
            this.load.audio("main_loop", ["assets/audio/main_loop.ogg", "assets/audio/main_loop.m4a"], !0), 
            this.load.image("upgrade_button", "assets/graphics/button_upgrade.png"), 

            this.load.atlasJSONHash("screws", "assets/graphics/screws.png", "assets/graphics/screws.json"), 
            this.load.atlasJSONHash("coin", "assets/graphics/coin.png", "assets/graphics/coin.json"), 
            this.load.atlasJSONHash("coin_sparkles", "assets/graphics/coin_sparkles.png", "assets/graphics/coin_sparkles.json"), 
            this.load.atlasJSONHash("turbo_effect", "assets/graphics/turbo_effect.png", "assets/graphics/turbo_effect.json"), 
            this.load.atlasJSONHash("crash_smoke_1", "assets/graphics/crash_smoke_1.png", "assets/graphics/crash_smoke_1.json"), 
            this.load.atlasJSONHash("rocket_trail", "assets/graphics/rocket_trail.png", "assets/graphics/rocket_trail.json"),
            this.load.atlasJSONHash("main_menu", "assets/graphics/main_menu.png", "assets/graphics/main_menu.json"),
            this.load.atlasJSONHash("level_graphics", "assets/graphics/level_graphics.png", "assets/graphics/level_graphics.json"), 
            this.load.atlasJSONHash("upgrades", "assets/graphics/upgrades.png", "assets/graphics/upgrades.json"), 
            this.load.atlasJSONHash("round_complete", "assets/graphics/round_complete.png", "assets/graphics/round_complete.json")
        }, 
        c.prototype.onSoundDecoded = function(a) {
            var b = this.soundsToDecode.indexOf(a);
            b > -1 && this.soundsToDecode.splice(b, 1), 0 === this.soundsToDecode.length && (this.soundsReady = !0)
        }, 
        c.prototype.create = function() {
            this.initLanguage(), 
            this.initUpgrades(), 
            this.game.plugins.add(new a.StateTransition(this.game, this)), 
            this.game.cache.removeImage("preloader_outer"), 
            this.game.cache.removeImage("preloader_inner"), 
            this.assetsReady = !0
        }, 
        c.prototype.initLanguage = function() {
            var b = this.game.cache.getJSON("texts");
            a.Main.language = "en", a.Main.texts = b[a.Main.language]
        }, 
        c.prototype.initUpgrades = function() {
            a.Main.upgrades = new a.UpgradesController
        }, 
        c.prototype.update = function() {
            this.assetsReady && this.soundsReady && this.updateEnabled && (this.updateEnabled = !1, this.game.state.start("MainMenu", !0, !1, !0))
        }, c
    }(Phaser.State);
    a.Preloader = b
}(game || (game = {}));
///////////////////////////////////////////
var game;
! function(a) {
    var b = function(a) {
        function b() {
            a.apply(this, arguments)
        }
        return __extends(b, a), b.prototype.create = function() {}, b.prototype.gotoMainMenu = function() {
            this.game.changeState("MainMenu", !0)
        }, b
    }(Phaser.State);
    a.SplashScreen = b
}(game || (game = {}));

/////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(a) {
        function b(b, c, d, e, f) {
            var g = this;
            a.call(this, b, c, d, e, f), 
            this.callbackDelay = 20, 
            this.callbackTimer = 0, this.clicked = !1, 
            this._callback = new Phaser.Signal, this.anchor.set(.5, .5), 
            this.inputEnabled = !0, this.game.device.desktop && (this.input.useHandCursor = !0), 

            this.inputEnabled && this.events.onInputDown.add(function() {
                g.game.device.webAudio && g.game.sound.play("tap"), 
                g.game.add.tween(g.scale).to({
                    x: 1.2,
                    y: .8
                }, 200, Phaser.Easing.Back.Out, !0) (function() {
                    g.clicked = !0, g.callbackTimer = 0, g.game.add.tween(g.scale).to({
                        x: 1,
                        y: 1
                    }, 200, Phaser.Easing.Back.Out, !0)
                }, g)
            })
        }
        return __extends(b, a), 
        b.prototype.setCallbackDelay = function(a) {
            this.callbackDelay = a
        }, 
        b.prototype.update = function() {
            this.clicked && 
            (this.callbackTimer += this.game.time.elapsed, 
                this.callbackTimer >= this.callbackDelay && (this._callback.dispatch(), this.clicked = !1, this.callbackTimer = 0))
        }, 
        b.prototype.destroy = function() {
            a.prototype.destroy.call(this), this._callback.dispose(), this._callback = null
        }, 
        Object.defineProperty(b.prototype, "callback", {
            get: function() {
                return this._callback
            },
            enumerable: !0,
            configurable: !0
        }), b
    }(Phaser.Image);
    a.SimpleButton = b
}(game || (game = {}));
////////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(a) {
        function b(b, c, d, e, f, g) {
            a.call(this, b, c, d, e, f), 
            this.spriteSheet = e, 
            this.textureKey1 = f, this.textureKey2 = g, this.activeTextureKey = this.textureKey1, this._state = 1, 
            this.events.onInputUp.add(this.switchTextures, this, 2)
        }
        return __extends(b, a), 
        b.prototype.switchTextures = function() {
            this.activeTextureKey = this.activeTextureKey === this.textureKey1 ? this.textureKey2 : this.textureKey1, 
            this.loadTexture(this.spriteSheet, this.activeTextureKey), this._state = this.activeTextureKey === this.textureKey1 ? 1 : 2
        }, 
        Object.defineProperty(b.prototype, "state", {
            get: function() {
                return this._state
            },
            enumerable: !0,
            configurable: !0
        }), b
    }(game.SimpleButton);
    a.ToggleButton = b
}(game || (game = {}));

//////////////////////////////////////////////////////////////
var utils;
! function(a) {
    var b = function() {
        function a() {}
        return a.generateTwitterURL = function(a, b) {
            var c = "https://twitter.com/intent/tweet?",
                d = "text=" + a,
                e = b ? "&url=" + b : "";
            return c + d + e
        }, a.generateHashTags = function(a) {
            var b = "&hashtags=" + a.join(",");
            return b
        }, a.shareOnTwitter = function(b, c, d) {
            var e = a.generateTwitterURL(b, c),
                f = d ? a.generateHashTags(d) : "",
                g = e + f;
            window.open(g, "_blank")
        }, a
    }();
    a.Social = b
}(utils || (utils = {}));
/////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(b) {
        function c() {
            b.apply(this, arguments), 
            this.fromPreloader = !1, 
            this.initialY = 345, this.currentAngle = 0, 
            this.deltaAngle = .02, this.magnitude = 15
        }
        return __extends(c, b), c.prototype.init = function(a) {
            this.fromPreloader = a
        }, 
        c.prototype.create = function() {
            this.addBackground(), 
            a.Main.weakDevice === !1 && this.addBubbles(), this.addOtherImages(), 
            this.addButtons(), this.initCredits(), this.initAnimation(), 
            this.fromPreloader && (this.soundButton.input.enabled = !1, this.soundButton.switchTextures(), 
                this.game.input.onTap.addOnce(this.onFirstTap, this), this.stage.disableVisibilityChange = !1, 
                this.game.onBlur.add(this.onFocusLost, this), this.game.onFocus.add(this.onFocus, this))
        }, 
        c.prototype.onFocusLost = function() {
            a.Main.wasMuted = this.game.sound.mute, this.game.sound.mute = !0
        }, 
        c.prototype.onFocus = function() {
            a.Main.wasMuted === !1 && (this.game.sound.mute = !1)
        }, 
        c.prototype.addBackground = function() {
            new a.Background(this.game, this.world)
        }, 
        c.prototype.addBubbles = function() {
            for (var b = 40, c = 0; b > c; c++) {
                var d = this.game.rnd.realInRange(10, a.Config.GAME_WIDTH - 10),
                    e = this.game.rnd.realInRange(10, a.Config.GAME_HEIGHT - 80),
                    f = this.game.rnd.realInRange(.3, 1),
                    g = this.game.add.image(d, e, "level_graphics", "Small_Bubble0000");
                g.scale.set(f, f)
            }
        }, 
        c.prototype.addOtherImages = function() {
            this.title = this.game.add.image(a.Config.HALF_GAME_WIDTH, 100, "main_menu", "Title0000"), 
            this.title.anchor.set(.5, .5), 
            this.submarine = this.game.add.image(330, a.Config.HALF_GAME_HEIGHT + 25, "main_menu", "Submarine0000"), 
            this.submarine.anchor.set(.5, .5)
        }, 
        c.prototype.addButtons = function() {
            var b = this;
            this.playButton = new a.SimpleButton(this.game, 700, 330, "main_menu", "Play_Button0000"), 
            this.playButton.setCallbackDelay(250), this.playButton.callback.addOnce(this.hideAndStartGame, this), 
            this.moreGamesButton = new a.SimpleButton(this.game, this.playButton.x + 60, this.playButton.y + 94, "main_menu", "MoreGames_Button0000"), 
            this.soundButton = new a.ToggleButton(this.game, this.playButton.x - 60, 
            this.playButton.y + 94, "main_menu", "Music_On_Button0000", "Music_Off_Button0000"),

             this.soundButton.callback.add(function() {
                b.game.sound.mute = !b.game.sound.mute
            }), 
             this.game.sound.mute && this.soundButton.switchTextures(), 
             this.buttons = [this.playButton, this.soundButton, this.moreGamesButton], 
             this.buttons.forEach(function(a) {
                b.world.add(a)
            })
        }, 
        c.prototype.initCredits = function() {
            this.credits = this.game.add.image(0, 0, "main_menu", "CreditsBoard0000"), 
            this.credits.position.set(Math.round(.5 * (a.Config.GAME_WIDTH - this.credits.width)), 
                Math.round(.5 * (a.Config.GAME_HEIGHT - this.credits.height))), 
            this.credits.visible = !1
        }, 
        c.prototype.toggleCredits = function() {
            this.credits.visible ? this.hideCredits() : this.showCredits()
        }, 
        c.prototype.hideCredits = function() {
            var a = this;
            this.game.add.tween(this.credits).to({
                y: this.credits.y + 200,
                alpha: 0
            }, 500, Phaser.Easing.Back.In, !0).onComplete.addOnce(function() {
                a.playButton.input.enabled = !0, a.moreGamesButton.input.enabled = !0, a.credits.visible = !1
            }, this)
        }, 
        c.prototype.showCredits = function() {
            var b = this;
            this.credits.visible = !0, this.credits.alpha = 0, 
            this.credits.y = Math.round(.5 * (a.Config.GAME_HEIGHT - this.credits.height)) + 200, this.game.add.tween(this.credits).to({
                y: this.credits.y - 200,
                alpha: 1
            }, 500, Phaser.Easing.Back.Out, !0), 
            this.playButton.input.enabled = !1, 
            this.moreGamesButton.input.enabled = !1, 

            this.game.input.onTap.addOnce(function() {
                b.hideCredits()
            }, this)
        }, 
        c.prototype.onFirstTap = function() {
            this.tryFullscreen(), this.startMusic()
        }, 
        c.prototype.tryFullscreen = function() {
            this.game.device.desktop === !1 && this.game.device.fullScreen && this.game.scale.startFullScreen(!0)
        }, 
        c.prototype.startMusic = function() {
            this.game.sound.play("main_loop", .33, !0), this.soundButton.switchTextures(), this.soundButton.input.enabled = !0
        },
        c.prototype.initAnimation = function() {
            var a = this;
            this.title.y -= 150, this.game.add.tween(this.title).to({
                y: this.title.y + 150
            }, 600, Phaser.Easing.Back.Out, !0, 300), 

            this.submarine.x = 0, 
            this.submarine.scale.set(0, 0), 

            this.game.add.tween(this.submarine).to({
                x: 330
            }, 700, Phaser.Easing.Back.Out, !0, 900), 

            this.game.add.tween(this.submarine.scale).to({
                x: 1,
                y: 1
            }, 700, Phaser.Easing.Back.Out, !0, 900);

            var b = 1300;

            this.buttons.forEach(function(c) {
                c.scale.set(0, 0), a.game.add.tween(c.scale).to({
                    x: 1,
                    y: 1
                }, 300, Phaser.Easing.Back.Out, !0, b), 
                b += 200
            })
        }, 
        c.prototype.update = function() {
            var a = utils.MathUtil.lowPrecisionSin(this.currentAngle * Math.PI) * this.magnitude;
            this.currentAngle += this.deltaAngle, 
            this.currentAngle >= 2 && (this.currentAngle -= 2), 
            this.submarine.y = this.initialY + a
        }, 
        c.prototype.hideAndStartGame = function() {
            var b = this,
                c = 0;
            this.buttons.forEach(function(a) {
                a.inputEnabled = !1, 
                b.game.add.tween(a.scale).to({
                    x: 0,
                    y: 0
                }, 400, Phaser.Easing.Back.In, !0, c), 
                c += 100
            }), 

            this.game.add.tween(this.submarine).to({
                x: a.Config.GAME_WIDTH + 300
            }, 1200, Phaser.Easing.Back.In, !0, 500).onComplete.add(function() {
                b.game.changeState("Level")
            }, this)
        }, 

        c.prototype.destroy = function() {
            this.buttons = null
        }, c
    }(Phaser.State);
    a.MainMenu = b
}(game || (game = {}));
/////////////////////////////////////////////////////////////////////////////
var utils;
! function(a) {
    var b = function() {
        function a() {}
        return a.distanceSquared = function(a, b, c, d) {
            var e = c - a,
                f = d - b;
            return e * e + f * f
        }, 
        a.distance = function(b, c, d, e) {
            var f = a.distanceSquared(b, c, d, e);
            return Math.sqrt(f)
        }, 
        a.realInRange = function(a, b) {
            return Math.random() * (b - a) + a
        }, 
        a.integerInRange = function(b, c) {
            return Math.round(a.realInRange(b, c))
        }, 
        a.lowPrecisionSin = function(a) {
            var b;
            return -3.14159265 > a ? a += 6.28318531 : a > 3.14159265 && (a -= 6.28318531), 
            b = 0 > a ? 1.27323954 * a + .405284735 * a * a : 1.27323954 * a - .405284735 * a * a
        }, 
        a.lowPrecisionCos = function(a) {
            var b;
            return -3.14159265 > a ? a += 6.28318531 : a > 3.14159265 && (a -= 6.28318531), 
            a += 1.57079632, a > 3.14159265 && (a -= 6.28318531), b = 0 > a ? 1.27323954 * a + .405284735 * a * a : 1.27323954 * a - .405284735 * a * a
        }, a.DEG_TO_RAD = .017453292519943295, a.RAD_TO_DEG = 57.29577951308232, a
    }();
    a.MathUtil = b
}(utils || (utils = {}));
///////////////////////////////////////////////////////////////////////////////////////////
var utils;
! function(a) {
    var b = function() {
        function a(a) {
            "undefined" == typeof a && (a = null), this.itemsNum = 0, this.pointer = 0, a && a.length > 0 && this.setItems(a)
        }
        return a.prototype.setItems = function(a) {
            this.items = a, this.itemsNum = this.items.length
        },
         a.prototype.getItem = function() {
            for (var a = 0; a < this.itemsNum; a++) {
                var b = this.items[a];
                if (b.alive === !1) return b.onRemoveFromPool(), b
            }
            return null
        }, 
        a.prototype.returnItem = function(a) {
            a.alive = !1, a.onAddToPool()
        },
         a.prototype.doReset = function() {
            for (var a = 0; a < this.itemsNum; a++) {
                var b = this.items[a];
                b.alive && b.onAddToPool()
            }
        }, 
        a.prototype.destroy = function() {
            this.items.length = 0, this.items = null
        }, a
    }();
    a.ObjectPool = b
}(utils || (utils = {}));

///////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(a) {
        function b(b, c, d) {
            a.call(this, b, c), this.initImage(d), this.initText()
        }
        return __extends(b, a), 
        b.prototype.initImage = function(a) {
            this.image = this.game.add.image(0, 0, "level_graphics", a, this)
        },
         b.prototype.initText = function() {
            this.textLabel = this.game.add.bitmapText(0, 0, "digits", "0", 30, this), 
            this.textLabel.position.set(55, 6)
        }, 
        b.prototype.updateText = function(a) {
            this.textLabel.setText(a.toString())
        }, b
    }(Phaser.Group);
    a.Label = b
}(game || (game = {}));
/////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(b) {
        function c(a, c) {
            b.call(this, a, c, "buy_button"), this.initButton(), this.initLabel()
        }
        return __extends(c, b), 
        c.prototype.initButton = function() {
            this.button = new a.SimpleButton(this.game, 0, 0, "upgrades", "Buy_Button0000"), this.add(this.button)
        }, 
        c.prototype.initLabel = function() {
            var a = {
                font: "22px GrilledCheeseBTNToasted",
                fill: "#3E5A0A",
                align: "center"
            };
            this.label = this.game.add.text(0, 0, "500", a, this), 
            this.label.anchor.set(.5, .5), 
            this.game.device.firefox && (this.label.y = 10)

        }, 
        c.prototype.updateText = function(a) {
            this.label.setText(a)
        }, 
        c.prototype.disable = function() {
            this.label.setText("max"), this.button.inputEnabled = !1
        }, 
        c.prototype.destroy = function() {
            this.button = null, this.label = null
        }, 
        Object.defineProperty(c.prototype, "clicked", {
            get: function() {
                return this.button.callback
            },
            enumerable: !0,
            configurable: !0
        }), c
    }(Phaser.Group);
    a.BuyButton = b
}(game || (game = {}));
/////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(a) {
        function b(b, c) {
            a.call(this, b, c, "upgrade_progress_bar"), 
            this.back = this.game.add.image(0, 0, "upgrades", "Upgrade_ProgressBack0000", this), 
            this.back.anchor.set(.5, .5), this.initSteps()
        }
        return __extends(b, a), 
        b.prototype.initSteps = function() {
            this.steps = [];
            for (var a = .5 * -this.back.width + 25, b = 0, c = 50, d = 1; 4 > d; d++) {
                var e = "Upgrade_Progress_Step" + d.toString() + "0000",
                    f = this.game.add.image(a, b, "upgrades", e);
                f.anchor.set(.5, .5), f.visible = !1, a += c, this.steps.push(f), this.add(f)
            }
        }, 
        b.prototype.updateBar = function(a) {
            for (var b = this.steps.length, c = 0; b > c; c++) {
                var d = this.steps[c];
                a > c ? d.visible === !1 && (d.scale.set(0, 0), d.visible = !0, this.game.add.tween(d.scale).to({
                    x: 1,
                    y: 1
                }, 200, Phaser.Easing.Back.Out, !0)) : d.visible = !1
            }
        },
        b.prototype.destroy = function() {
            this.steps = null, this.back = null
        }, b
    }(Phaser.SpriteBatch);
    a.UpgradeProgressBar = b
}(game || (game = {}));
/////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function() {
        function b(a, b) {
            this.step = 0, this.setTitleAndDescription(a), this.prices = b
        }
        return b.prototype.setTitleAndDescription = function(b) {
            var c = a.Main.texts.upgrades,
                d = c[b];
            this._upgradeType = b, this._title = d.title, this._description = d.description
        }, 
        b.prototype.getCurrentPrice = function() {
            return this.prices[this.step]
        }, 
        b.prototype.advance = function() {
            this.step < 3 && this.step++
        }, 
        b.prototype.getValue = function() {
            return null
        }, 
        Object.defineProperty(b.prototype, "upgradeType", {
            get: function() {
                return this._upgradeType
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(b.prototype, "title", {
            get: function() {
                return this._title
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(b.prototype, "description", {
            get: function() {
                return this._description
            },
            enumerable: !0,
            configurable: !0
        }), 
        b.BOAT_BODY = "Body", b.SHIELD = "Shield", b.COINS_MAGNET = "Magnet", b.TURBO = "Turbo", b
    }();
    a.Upgrade = b
}(game || (game = {}));
///////////////////////////////////////////
var game;
! function(a) {
    var b = function(b) {
        function c(a, c, d) {
            b.call(this, a, c, "upgrade_view"), 
            this._upgrade = d, 
            this.initTitle(), 
            this.addBack(), this.addIcon(), 
            this.addProgressBar(), 
            this.addBuyButton(), 
            this.syncWithUpgrade(), 
            this._iconTapped = new Phaser.Signal, 
            this._buyButtonTapped = new Phaser.Signal
        }
        return __extends(c, b), c.prototype.initTitle = function() {
            var a = this._upgrade.title,
                b = {
                    font: "26px GrilledCheeseBTNToasted",
                    fill: "#FFFFFF",
                    align: "center"
                }, 
                c = new Phaser.Text(this.game, 0, 0, a, b);
            c.stroke = "#2392BC", c.strokeThickness = 6, c.anchor.set(.5, .5), this.add(c)
        }, 
        c.prototype.addBack = function() {
            this.back = this.game.add.image(0, 120, "upgrades", "Upgrade_Back0000", this), this.back.anchor.set(.5, .5)
        }, 
        c.prototype.addIcon = function() {
            var a = this,
                b = this.getIconImageKey();
            this.icon = this.game.add.image(0, 104, "upgrades", b, this), this.icon.anchor.set(.5, .5), this.icon.inputEnabled = !0, this.icon.events.onInputDown.add(function() {
                a._iconTapped.dispatch(a), a.shakeIcon()
            }, this)
        }, 
        c.prototype.getIconImageKey = function() {
            switch (this._upgrade.upgradeType) {
                case a.Upgrade.BOAT_BODY:
                    return "Body_Upgrade0000";
                case a.Upgrade.SHIELD:
                    return "Shield_Upgrade0000";
                case a.Upgrade.COINS_MAGNET:
                    return "Magnet_Upgrade0000";
                case a.Upgrade.TURBO:
                    return "Turbo_Upgrade0000";
                default:
                    return "Body_Upgrade0000"
            }
        }, 
        c.prototype.addProgressBar = function() {
            this.progressBar = new a.UpgradeProgressBar(this.game, this), this.progressBar.position.set(-3, 194), this.add(this.progressBar)
        }, 
        c.prototype.addBuyButton = function() {
            var b = this,
                c = this.back.y + .5 * this.back.height + 25;
            this.buyButton = new a.BuyButton(this.game, this), this.buyButton.position.set(0, c), this.buyButton.clicked.add(function() {
                b.buyButtonTapped.dispatch(b)
            }, this), this.add(this.buyButton)
        }, 
        c.prototype.shakeIcon = function() {
            this.game.add.tween(this.icon.scale).to({
                x: 1.1,
                y: 1.1
            }, 150, Phaser.Easing.Cubic.Out, !0, 0, 1, !0)
        }, 
        c.prototype.syncWithUpgrade = function() {
            this.progressBar.updateBar(this._upgrade.step), this.upgrade.step >= 3 ? this.buyButton.disable() : this.buyButton.updateText(this._upgrade.getCurrentPrice().toString())
        }, 
        c.prototype.destroy = function() {
            this._buyButtonTapped.dispose(), this._buyButtonTapped = null, this._iconTapped.dispose(), this._iconTapped = null
        }, 

        Object.defineProperty(c.prototype, "buyButtonTapped", {
            get: function() {
                return this._buyButtonTapped
            },
            enumerable: !0,
            configurable: !0
        }), 

        Object.defineProperty(c.prototype, "iconTapped", {
            get: function() {
                return this._iconTapped
            },
            enumerable: !0,
            configurable: !0
        }), 

        Object.defineProperty(c.prototype, "upgrade", {
            get: function() {
                return this._upgrade
            },
            enumerable: !0,
            configurable: !0
        }), c
    }(Phaser.Group);
    a.UpgradeView = b
}(game || (game = {}));
/////////////////////////////////////////
var game;
! function(a) {
    var b = function(a) {
        function b(b, c) {
            a.call(this, b, c, "coins_label"), 
            this.labelOffset = 0, 
            this.labelOffset = this.game.device.firefox ? 10 : 0, this.addBack(), this.addLabel()
        }
        return __extends(b, a), b.prototype.addBack = function() {
            this.back = this.game.add.image(0, 0, "upgrades", "Money_Label0000", this), this.back.anchor.set(.5, .5)
        }, 
        b.prototype.addLabel = function() {
            var a = {
                font: "30px GrilledCheeseBTNToasted",
                fill: "#FFE72C",
                align: "center"
            }, b = "12345";
            this.label = this.game.add.text(0, 0, b, a, this), 
            this.label.anchor.set(.5, .5), 
            this.label.stroke = "#1C7597", 
            this.label.strokeThickness = 7, 
            this.game.device.firefox && (this.label.position.y += this.labelOffset)
        }, 
        b.prototype.updateCoinsValue = function(a, b) {
            this.label.setText("$" + a.toString()), b === !1 && 
            (this.game.add.tween(this.label).to({
                angle: 5
            }, 200, Phaser.Easing.Back.Out, !0, 0, 1, !0), 
            this.game.add.tween(this.label.scale).to({
                x: 1.2,
                y: 1.2
            }, 200, Phaser.Easing.Back.Out, !0, 0, 1, !0))
        }, 
        b.prototype.shake = function() {
            var a = this;
            this.label.y -= 3, 
            this.game.add.tween(this.label).to({
                y: this.label.y + 3
            }, 100, Phaser.Easing.Linear.None, !0, 0, 3, !0).onComplete.addOnce(function() {
                a.label.y = a.labelOffset
            }, this)
        }, 

        b.prototype.destroy = function() {
            this.back = null, this.label = null
        }, b
    }(Phaser.Group);
    a.CoinsLabel = b
}(game || (game = {}));
///////////////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(b) {
        function c(a, c) {
            b.call(this, a, c, "upgrades_board"), 
            this.exists = !1, 
            this.visible = !1, 
            this.addBack(), 
            this.initUpgradeViews(), 
            this.initCoinsLabel(), 
            this.initUpgradeDescription(), 
            this.initButtons(), 
            this._hideCompleteSignal = new Phaser.Signal
        }
        return __extends(c, b), 
        c.prototype.addBack = function() {
            this.back = this.game.add.image(0, 0, "upgrades", "Upgrades_Board0000", this), 
            this.back.anchor.set(.5, .5)
        }, 
        c.prototype.initUpgradeViews = function() {
            this.upgradeViews = [];
            for (var b = .5 * -this.back.width + 150, c = .5 * -this.back.height + 65, d = 190, e = a.Main.upgrades.upgrades, f = 0; f < e.length; f++) {
                var g = e[f],
                    h = new a.UpgradeView(this.game, this, g);
                h.buyButtonTapped.add(this.tryToBuyUpgrade, this), 
                h.iconTapped.add(this.updateDescription, this), 
                h.position.set(b + .5, c), this.add(h), 
                this.upgradeViews.push(h), 
                b += d
            }
        }, c.prototype.tryToBuyUpgrade = function(b) {
            var c = b.upgrade,
                d = c.getCurrentPrice();
            a.Main.stats.coins >= d ? (a.Main.stats.updateCoins(a.Main.stats.coins - d), 
                this.coinsLabel.updateCoinsValue(a.Main.stats.coins, !1), 
                c.advance(), a.Main.upgrades.save(), 
                b.shakeIcon(), b.syncWithUpgrade(), 
                this.game.sound.play("buy")) : (this.coinsLabel.shake(), this.game.sound.play("no_coins"))

        }, 
        c.prototype.updateDescription = function(a) {
            this.description.setText(a.upgrade.description)
        }, 
        c.prototype.initCoinsLabel = function() {
            var b = a.Main.stats.coins;
            this.coinsLabel = new a.CoinsLabel(this.game, this), 
            this.coinsLabel.updateCoinsValue(b, !0), 
            this.coinsLabel.position.set(-285, 147)
        }, 
        c.prototype.initUpgradeDescription = function() {
            var a = this.upgradeViews[0].upgrade.description,
                b = {
                    font: "24px GrilledCheeseBTNToasted",
                    fill: "#FFFFFF",
                    align: "center"
                };
            this.description = this.game.add.text(0, 0, " ", b, this), 
            this.description.setShadow(2, 2, "#1B73FF", 0), 
            this.description.x = 100, 
            this.description.y = this.coinsLabel.y + 4, 
            this.description.wordWrap = !0, 
            this.description.wordWrapWidth = 540, 
            this.description.anchor.set(.5, .5), 
            this.description.lineSpacing = -5, 
            this.description.setText(a), 
            this.game.device.firefox && (this.description.y = this.coinsLabel.y + 15, this.description.lineSpacing = 0)
        }, 
        c.prototype.initButtons = function() {
            this.continueButton = new a.SimpleButton(this.game, 0, 0, "upgrades", "Next_Button0000"), 
            this.continueButton.position.y = .5 * this.back.height + 45, 
            this.continueButton.callback.add(this.hide, this),
             this.addAt(this.continueButton, 0)
        }, 
        c.prototype.show = function(b) {
            "undefined" == typeof b && (b = 0), 
            this.exists = !0, 
            this.visible = !0, 
            this.coinsLabel.updateCoinsValue(a.Main.stats.coins, !0),
             this.showContinueButton(), 
             this.playAnimation(b), 
             a.Main.development && this.enableCheats()
        }, 
        c.prototype.showContinueButton = function() {
            this.continueButton.inputEnabled = !0, 
            this.continueButton.y = .5 * this.back.height + 45
        }, 
        c.prototype.playAnimation = function(b) {
            var c = 600;
            this.y = .5 * -this.back.height - 100, 
            this.game.add.tween(this.position).to({
                y: a.Config.HALF_GAME_HEIGHT - 35
            }, c, Phaser.Easing.Back.Out, !0, b)
        }, 

        c.prototype.enableCheats = function() {
            var b = this;
            this.game.input.keyboard.addKey(Phaser.Keyboard.PAGE_UP).onDown.add(function() {
                a.Main.stats.updateCoins(a.Main.stats.coins + 1e3), 
                b.coinsLabel.updateCoinsValue(a.Main.stats.coins, !1)
            }, this), 

            this.game.input.keyboard.addKey(Phaser.Keyboard.PAGE_DOWN).onDown.add(function() {
                a.Main.stats.updateCoins(a.Main.stats.coins - 1e3),
                 b.coinsLabel.updateCoinsValue(a.Main.stats.coins, !1)
            }, this), 

            this.game.input.keyboard.addKey(Phaser.Keyboard.END).onDown.add(this.clearSavedData, this)
        }, 
        c.prototype.clearSavedData = function() {
            a.Main.stats.clearAll(), 
            this.coinsLabel.updateCoinsValue(a.Main.stats.coins, !0), 
            this.upgradeViews.forEach(function(a) {
                a.syncWithUpgrade()
            })
        }, c.prototype.hide = function() {
            this.continueButton.inputEnabled = !1, 
            this.hideButtons(), 
            this.hideBoard(300), 
            a.Main.development && this.disableCheats()
        }, 
        c.prototype.hideButtons = function() {
            this.game.add.tween(this.continueButton).to({
                y: this.continueButton.y - 150
            }, 300, Phaser.Easing.Back.In, !0)
        }, 

        c.prototype.hideBoard = function(b) {
            var c = 600,
                d = a.Config.GAME_HEIGHT + .5 * this.back.height;
            this.game.add.tween(this.position).to({
                y: d
            }, c, Phaser.Easing.Back.In, !0, b).onComplete.addOnce(this.onHideComplete, this)
        }, 
        c.prototype.disableCheats = function() {
            this.game.input.keyboard.removeKey(Phaser.Keyboard.PAGE_DOWN), 
            this.game.input.keyboard.removeKey(Phaser.Keyboard.PAGE_UP), 
            this.game.input.keyboard.removeKey(Phaser.Keyboard.END)
        }, 
        c.prototype.onHideComplete = function() {
            this.exists = !1, 
            this.visible = !1, 
            this._hideCompleteSignal.dispatch()
        }, 
        c.prototype.destroy = function() {
            b.prototype.destroy.call(this, !0, !1), 
            this._hideCompleteSignal.dispose(), 
            this._hideCompleteSignal = null
        },
         Object.defineProperty(c.prototype, "hideCompleteSignal", {
            get: function() {
                return this._hideCompleteSignal
            },
            enumerable: !0,
            configurable: !0
        }), c
    }(Phaser.Group);
    a.UpgradesBoard = b
}(game || (game = {}));
//////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(a) {
        function b(b) {
            a.call(this, b, 0, 0, "round_complete", "Button_Sign0000"), 
            this.exists = !1, 
            this.visible = !1, 
            this.anchor.set(.5, .5), 

            this.shakeTween = this.game.add.tween(this.scale).to({
                x: 1.15,
                y: .85
            }, 200, Phaser.Easing.Cubic.Out, !0, 0, 1e4, !0), 

            this.shakeTween.pause()
        }
        return __extends(b, a), 

        b.prototype.show = function(a) {
            this.exists = !0, this.visible = !0, this.alpha = 0, this.game.add.tween(this).to({
                alpha: 1
            }, 100, Phaser.Easing.Linear.None, !0, a).onComplete.addOnce(this.startShake, this)
        }, 

        b.prototype.startShake = function() {
            this.shakeTween.resume()
        }, 
        b.prototype.hide = function() {
            this.exists = !1, this.visible = !1, this.shakeTween.pause()
        },
        b.prototype.destroy = function() {
            this.shakeTween.stop(), this.shakeTween = null
        }, b
    }(Phaser.Image);
    a.UpgradesSign = b
}(game || (game = {}));
//////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function() {
        function a() {
            this.coinsCollected = 0, 
            this.newBest = !1, 
            this.distanceInPixels = 0, 
            this._distanceInMeters = 0
        }
        return a.prototype.updatePassesDistance = function(b) {
            this.distanceInPixels += b, 
            this._distanceInMeters = Math.floor(this.distanceInPixels / a.PIXELS_IN_METER)
        }, 
        a.prototype.doReset = function() {
            this.coinsCollected = 0, 
            this.distanceInPixels = 0, 
            this._distanceInMeters = 0, 
            this.newBest = !1
        }, 
        Object.defineProperty(a.prototype, "distanceInMeters", {
            get: function() {
                return this._distanceInMeters
            },
            enumerable: !0,
            configurable: !0
        }), a.PIXELS_IN_METER = 70, a
    }();
    a.RoundResult = b
}(game || (game = {}));
/////////////////////////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(b) {
        function c(a, c) {
            b.call(this, a, c, "round_complete_board"), 
            this.leftColumnX = 0, 
            this.rightColumnX = 0, 
            this.exists = !1, 
            this.visible = !1, 
            this.addBack(),
             this.addContent(), 
             this.addNewBest(), 
             this.addButtons(), 
             this.addUpgradesSign(), 
             this._hideCompleteSignal = new Phaser.Signal, 
             this._showUpgradesSignal = new Phaser.Signal
        }
        return __extends(c, b), 

        c.prototype.addBack = function() {
            this.back = this.game.add.image(0, 0, "round_complete", "Statistic_Board0000", this), 
            this.back.anchor.set(.5, .5),
             this.leftColumnX = .5 * -this.back.width + 60, 
             this.rightColumnX = this.leftColumnX + 226
        }, 

        c.prototype.addContent = function() {
            var b = -150,
                c = b + 40,
                d = c + 56,
                e = d + 40,
                f = this.addText(this.leftColumnX, b, a.Main.texts.best_distance);
            "fr" === a.Main.language ? (f.fontSize = 21, f.y += 5) : "it" === a.Main.language && (f.fontSize = 19, f.y += 6), 
            this.bestDistanceLabel = this.addText(this.rightColumnX, b, "0000"), 
            this.addText(this.leftColumnX, c, a.Main.texts.distance), 
            this.currentDistanceLabel = this.addText(this.rightColumnX, c, "0000"), 
            this.addText(this.leftColumnX, d, a.Main.texts.coins), 
            this.currentCoinsLabel = this.addText(this.rightColumnX, d, "0000"), 
            this.addText(this.leftColumnX, e, a.Main.texts.total_coins), 
            this.totalCoinsLabel = this.addText(this.rightColumnX, e, "0000")
        }, 

        c.prototype.addText = function(a, b, c) {
            var d = {
                font: "24px GrilledCheeseBTNToasted",
                fill: "#FFFFFF",
                align: "left"
            }, 
            e = new Phaser.Text(this.game, a, b, c, d);
            return e.stroke = "#2392BC", e.strokeThickness = 6, this.add(e), this.game.device.firefox && (e.position.y += 10), e
        }, 
        c.prototype.addNewBest = function() {
            this.newBest = this.game.add.image(-175, this.currentDistanceLabel.y + 50, "round_complete", "NewBest0000", this), 
            this.newBest.anchor.set(.5, .5), 
            this.newBest.exists = !1, 
            this.newBest.visible = !1
        }, 
        c.prototype.addButtons = function() {
            var b = this;
            this.continueButton = new a.SimpleButton(this.game, 0, 240, "upgrades", "Next_Button0000"), 
            this.continueButton.callback.add(function() {
                b.hide(b._hideCompleteSignal)
            }, this), 

            this.upgradeButton = new a.SimpleButton(this.game, 0, 95, "upgrade_button", "upgrade_button"), 
            this.upgradeButton.callback.add(function() {
                b.hide(b._showUpgradesSignal)
            }, this), 

            this.buttons = [this.upgradeButton, this.continueButton], 
            this.buttons.forEach(function(a) {
                b.add(a)
            }), 

            this.sendToBack(this.continueButton)
        }, 

        c.prototype.addUpgradesSign = function() {
            this.upgradesSign = new a.UpgradesSign(this.game), 
            this.upgradesSign.position.set(this.upgradeButton.x + .5 * this.upgradeButton.width - 14, this.upgradeButton.y - 30), 
            this.add(this.upgradesSign)
        }, 
        c.prototype.show = function(b) {
            this.exists = !0, 
            this.visible = !0, 
            this.roundResult = b, 
            this.bestDistanceLabel.setText(a.Main.stats.bestDistance.toString()), 
            this.currentDistanceLabel.setText(b.distanceInMeters.toString()), 
            this.currentCoinsLabel.setText(b.coinsCollected.toString()), 
            this.totalCoinsLabel.setText(a.Main.stats.coins.toString()), 
            this.playShowAnimation(), this.showButtons(600), 
            a.Main.upgrades.canSomethingBeUpgraded() && this.upgradesSign.show(1e3),
             this.showNewBest()
        }, 
        c.prototype.playShowAnimation = function() {
            var b = 600;
            this.position.y = .5 * -this.back.height - 100, 
            this.game.add.tween(this.position).to({
                y: a.Config.HALF_GAME_HEIGHT - 40
            }, b, Phaser.Easing.Back.Out, !0)
        }, 
        c.prototype.showButtons = function(a) {
            this.continueButton.position.set(0, 240), 
            this.continueButton.scale.set(0, 0),
             this.game.add.tween(this.continueButton.scale).to({
                x: 1,
                y: 1
            }, 400, Phaser.Easing.Back.Out, !0, a)
        }, 

        c.prototype.showNewBest = function() {
            this.roundResult.newBest ? 
            (this.newBest.exists = !0, this.newBest.scale.set(0, 0), 
                this.game.add.tween(this.newBest.scale).to({
                x: 1,
                y: 1
            }, 250, Phaser.Easing.Back.Out, !0, 700))
             : (this.newBest.exists = !1, this.newBest.visible = !1)
        }, 
        c.prototype.hide = function(b) {
            var c = this;
            this.game.add.tween(this.continueButton.position).to({
                y: 100
            }, 300, Phaser.Easing.Back.In, !0),

            this.game.add.tween(this.position).to({
                y: a.Config.GAME_HEIGHT + 100
            }, 500, Phaser.Easing.Back.In, !0, 400).onComplete.addOnce(function() {
                c.onHideComplete(b)
            }, this)
        }, 
        c.prototype.onHideComplete = function(a) {
            this.exists = !1, this.visible = !1, a.dispatch()
        }, 
        c.prototype.destroy = function() {
            b.prototype.destroy.call(this, !0, !1), 
            this._hideCompleteSignal.dispose(), 
            this._hideCompleteSignal = null
        }, 
        Object.defineProperty(c.prototype, "hideCompleteSignal", {
            get: function() {
                return this._hideCompleteSignal
            },
            enumerable: !0,
            configurable: !0
        }), 

        Object.defineProperty(c.prototype, "showUpgradesSignal", {
            get: function() {
                return this._showUpgradesSignal
            },
            enumerable: !0,
            configurable: !0
        }), c
    }(Phaser.Group);
    a.RoundCompleteBoard = b
}(game || (game = {}));
/////////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(b) {
        function c(a, c) {
            b.call(this, a, c, "pause_board"), 
            this.initBack(), 
            this.initText(), 
            this.exists = !1, 
            this.visible = !1
        }
        return __extends(c, b), 
        c.prototype.initBack = function() {
            var a = this.game.add.image(0, 0, "main_menu", "Pause_Board0000", this);
            a.anchor.set(.5, .5)
        }, 
        c.prototype.initText = function() {
            var b = a.Main.texts.pause,
                c = {
                    font: "50px GrilledCheeseBTNToasted",
                    fill: "#FFFFFF",
                    align: "center"
                }, d = new Phaser.Text(this.game, 0, 0, b, c);
            d.anchor.set(.5, .5), this.add(d)
        }, c
    }(Phaser.Group);
    a.PauseBoard = b
}(game || (game = {}));
///////////////////////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(b) {
        function c(a) {
            b.call(this, a, a.world, "gui"), 
            this._resetSignal = new Phaser.Signal, 
            this._pauseSignal = new Phaser.Signal, 
            this.addButtons(), 
            this.addPauseBoard(), 
            this.addCoinsLabel(), 
            this.addLivesLabel(), 
            this.addTurboLabel(), 
            this.addDistanceLabel(), 
            this.addRoundCompleteBoard(), 
            this.addUpgradesBoard(), 
            this.guiItems = [this.pauseButton, this.soundButton, this.restartButton, this.coinsLabel, this.livesLabel, this.turboLabel, this.distanceLabel]
        }
        return __extends(c, b), 

        c.prototype.addButtons = function() {
            var a = this;
            this.pauseButton = new game.ToggleButton(this.game, game.Config.GAME_WIDTH - 50, 65, "main_menu", "Pause_Button0000", "Resume_Button0000"),
            this.pauseButton.callback.add(function() {
                a._pauseSignal.dispatch(2 === a.pauseButton.state ? "pause" : "resume")
            }, this), 

            this.soundButton = new game.ToggleButton(this.game, this.pauseButton.x, this.pauseButton.y + 84, "main_menu", "Music_On_Button0000", "Music_Off_Button0000"), 
            this.soundButton.callback.add(function() {
                a.game.sound.mute = !a.game.sound.mute
            }), 
            this.soundButton.exists = !1, 
            this.soundButton.visible = !1, 
            this.restartButton = new game.SimpleButton(this.game, this.pauseButton.x, this.pauseButton.y + 168, "main_menu", "Restart_Button0000"), 
            this.restartButton.callback.add(this._resetSignal.dispatch, this), 
            this.restartButton.exists = !1, 
            this.restartButton.visible = !1, 
            this.add(this.restartButton), 
            this.add(this.soundButton), 
            this.add(this.pauseButton), 
            this.buttons = [this.restartButton, this.soundButton]
        }, 
        c.prototype.addPauseBoard = function() {
            this.pauseBoard = new game.PauseBoard(this.game, this), 
            this.pauseBoard.position.set(game.Config.HALF_GAME_WIDTH, game.Config.HALF_GAME_HEIGHT)
        }, 
        c.prototype.addCoinsLabel = function() {
            this.coinsLabel = new game.Label(this.game, this, "Coin_Icon0000"), 
            this.coinsLabel.x = 115, this.coinsLabel.y = 20
        }, 
        c.prototype.addTurboLabel = function() {
            this.turboLabel = new game.Label(this.game, this, "Zip_Icon0000"), 
            this.turboLabel.x = 20, this.turboLabel.y = 70, this.setTurboLabelVisibility()
        }, 
        c.prototype.addLivesLabel = function() {
            this.livesLabel = new game.Label(this.game, this, "Heart_Icon0000"), 
            this.livesLabel.x = 20, this.livesLabel.y = 20;
            var b = a.Main.upgrades.getUpgradeByTitle(game.Upgrade.BOAT_BODY).getValue();
            this.livesLabel.updateText(b)
        }, 
        c.prototype.addDistanceLabel = function() {
            this.distanceLabel = this.game.add.bitmapText(0, 0, "digits", "0m", 30, this), 
            this.distanceLabel.x = game.Config.HALF_GAME_WIDTH, this.distanceLabel.y = 40
        }, 
        c.prototype.addRoundCompleteBoard = function() {
            this.roundCompleteBoard = new game.RoundCompleteBoard(this.game, this), 
            this.roundCompleteBoard.position.set(game.Config.HALF_GAME_WIDTH, game.Config.HALF_GAME_HEIGHT), 
            this.roundCompleteBoard.showUpgradesSignal.add(this.showUpgradesBoard, this), 
            this.roundCompleteBoard.hideCompleteSignal.add(this.continueGame, this)
        }, 
        c.prototype.addUpgradesBoard = function() {
            this.upgradesBoard = new game.UpgradesBoard(this.game, this), 
            this.upgradesBoard.position.set(game.Config.HALF_GAME_WIDTH, game.Config.HALF_GAME_HEIGHT - 40), 
            this.upgradesBoard.hideCompleteSignal.add(this.continueGame, this)
        }, 
        c.prototype.showUpgradesBoard = function() {
            this.upgradesBoard.show()
        }, 
        c.prototype.continueGame = function() {
            this._resetSignal.dispatch()
        }, c.prototype.showRoundCompleteBoard = function(a) {
            this.hideSomeGUI(), this.roundCompleteBoard.show(a)
        }, c.prototype.hideSomeGUI = function() {
            this.guiItems.forEach(function(a) {
                a.visible = !1
            })
        }, c.prototype.showSomeGUI = function() {
            this.guiItems.forEach(function(a) {
                a.visible = !0
            })
        }, c.prototype.doReset = function() {
            var b = a.Main.upgrades.getUpgradeByTitle(game.Upgrade.BOAT_BODY).getValue();
            this.livesLabel.updateText(b), 
            this.turboLabel.updateText(0), 
            this.coinsLabel.updateText(0), 
            2 === this.pauseButton.state && this.pauseButton.switchTextures(), 
            this.hideButtons(), this.showSomeGUI(), 
            this.setTurboLabelVisibility()
        }, 
        c.prototype.setTurboLabelVisibility = function() {
            this.turboLabel.exists = a.Main.upgrades.getUpgradeByTitle(a.Upgrade.TURBO).step > 0,
             this.turboLabel.visible = this.turboLabel.exists
        }, 
        c.prototype.onPause = function() {
            this.showButtons(), this.showPauseBoard()
        }, 
        c.prototype.showButtons = function() {
            this.buttons.forEach(function(a) {
                a.exists = !0, a.visible = !0, a.inputEnabled = !0, a.scale.set(0, 0)
            });
            var a = 200;
            this.game.add.tween(this.soundButton.scale).to({
                x: 1,
                y: 1
            }, a, Phaser.Easing.Back.Out, !0), 

            this.game.add.tween(this.restartButton.scale).to({
                x: 1,
                y: 1
            }, a, Phaser.Easing.Back.Out, !0, 100)
        }, 
        c.prototype.showPauseBoard = function() {
            this.pauseBoard.exists = !0, this.pauseBoard.visible = !0
        }, 
        c.prototype.onResume = function() {
            this.hideButtons(), this.hidePauseBoard()
        }, 
        c.prototype.hideButtons = function() {
            var a = this,
                b = 0;
            this.buttons.forEach(function(c) {
                a.game.add.tween(c.scale).to({
                    x: 0,
                    y: 0
                }, 200, Phaser.Easing.Back.In, !0, b).onComplete.addOnce(function() {
                    c.exists = !1, c.visible = !1
                }, a), b += 100
            })
        }, 
        c.prototype.hidePauseBoard = function() {
            this.pauseBoard.exists = !1, 
            this.pauseBoard.visible = !1
        }, 
        c.prototype.destroy = function() {
            b.prototype.destroy.call(this, !0, !1), 
            this._resetSignal.dispose(), 
            this._resetSignal = null, 
            this._pauseSignal.dispose(), 
            this._pauseSignal = null, 
            this.guiItems = null, 
            this.buttons = null
        }, 
        Object.defineProperty(c.prototype, "resetSignal", {
            get: function() {
                return this._resetSignal
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(c.prototype, "pauseSignal", {
            get: function() {
                return this._pauseSignal
            },
            enumerable: !0,
            configurable: !0
        }), c
    }(Phaser.Group);
    a.LevelGUI = b
}(game || (game = {}));
/////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(a) {
        function b(b, c) {
            a.call(this, b, 0, 0, "level_graphics", "Shield0000"), 
            this.timer = 0, this.timeToFlick = 0, 
            this.isFlicking = !1, this.paused = !1, 
            this.submarine = c, 
            this.exists = !1, this.visible = !1, 
            this.anchor.set(.5, .5), 
            this._onDeactivated = new Phaser.Signal,
             this.initFlickTween()
        }
        return __extends(b, a), 
        b.prototype.initFlickTween = function() {
            this.flickTween = this.game.add.tween(this).to({
                alpha: .2
            }, 100, Phaser.Easing.Linear.None, !1, 0, Number.MAX_VALUE, !0)
        }, 
        b.prototype.activate = function(a) {
            this.timer = a, 
            this.timeToFlick = .33 * this.timer, 
            this.scale.set(0, 0), 
            this.game.add.tween(this.scale).to({
                x: 1,
                y: 1
            }, 200, Phaser.Easing.Back.Out, !0), 

            this.exists = !0, 
            this.visible = !0, 
            this.alpha = 1
        }, 
        b.prototype.update = function() {
            this.visible && this.paused === !1 && 
            (this.timer -= this.game.time.elapsed, 
                this.isFlicking === !1 && this.timer <= this.timeToFlick && this.startFlick(), 
                this.timer < 0 && this.deactivate(), 
                this.updatePositionAndAngle())

        }, 
        b.prototype.updatePositionAndAngle = function() {
            this.x = this.submarine.x,
             this.y = this.submarine.y,
              this.angle = this.submarine.angle
        }, 
        b.prototype.startFlick = function() {
            this.isFlicking = !0, 
            this.flickTween.isRunning ? this.flickTween.resume() : this.flickTween.start()
        },
         b.prototype.stopFlick = function() {
            this.isFlicking = !1, 
            this.flickTween.pause(),
             this.alpha = 1
        }, 
        b.prototype.deactivate = function() {
            this.stopFlick(),
             this.exists = !1, this.visible = !1, 
             this._onDeactivated.dispatch()
        }, 
        b.prototype.destroy = function() {
            this.flickTween.stop(),
             this.flickTween = null,
             this._onDeactivated.dispose(), 
             this._onDeactivated = null
        }, 
        Object.defineProperty(b.prototype, "onDeactivated", {
            get: function() {
                return this._onDeactivated
            },
            enumerable: !0,
            configurable: !0
        }), b
    }(Phaser.Image);
    a.Shield = b
}(game || (game = {}));
//////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(a) {
        function b(c) {
            a.call(this, c, 0, 0, "level_graphics", "Coins_Magnet0000"), 
            this.tweenDuration = b.TWEEN_DURATION, 
            this.startScale = 1.1, 
            this.endScale = .33, 
            this.startAlpha = 0, 
            this.endAlpha = .4, 
            this.anchor.set(.51, .5), 
            this.exists = !1, 
            this.visible = !1
        }
        return __extends(b, a), b.prototype.show = function() {
            this.exists = !0, this.visible = !0, this.startTweens()
        }, 

        b.prototype.startTweens = function() {
            this.scale.set(this.startScale, this.startScale), this.scaleTween = this.game.add.tween(this.scale).to({
                x: this.endScale,
                y: this.endScale
            }, this.tweenDuration, Phaser.Easing.Linear.None, !0, 0, 1e3), 
            this.alpha = this.startAlpha,
             this.alphaTween = this.game.add.tween(this).to({
                alpha: this.endAlpha
            }, this.tweenDuration, Phaser.Easing.Cubic.Out, !0, 0, 1e3)
        },
         b.prototype.hide = function() {
            this.exists && (this.stopTweens(), this.exists = !1, this.visible = !1)
        }, 
        b.prototype.stopTweens = function() {
            this.scaleTween.stop(), 
            this.scaleTween = null, 
            this.alphaTween.stop(), 
            this.alphaTween = null
        },
         b.prototype.destroy = function() {
            this.stopTweens()
        }, b.TWEEN_DURATION = 1500, b
    }(Phaser.Image);
    a.CoinsMagnetPart = b
}(game || (game = {}));
/////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(b) {
        function c(c, d, e) {
            b.call(this, c, d, "coins_magnet"), 
            this.activeDuration = 0, 
            this.hideDuration = 200, 
            this.isHiding = !1, 
            this._radius = 0, 
            this.paused = !1, 
            this.submarine = e, 
            this.exists = !1, 
            this.visible = !1,
             this._onDeactivated = new Phaser.Signal, 
             this._radius = a.Main.upgrades.getUpgradeByTitle(a.Upgrade.COINS_MAGNET).getValue().radius, 
             this.initParts(), 
             a.Main.development && this.initDebugShape()
        }
        return __extends(c, b), 

        c.prototype.initParts = function() {
            this.part1 = new a.CoinsMagnetPart(this.game), 
            this.add(this.part1), 
            this.part2 = new a.CoinsMagnetPart(this.game), 
            this.add(this.part2)
        }, 
        c.prototype.initDebugShape = function() {
            this.debugShape = new Phaser.Circle(this.x, this.y, 2 * this._radius)
        }, 
        c.prototype.activate = function(b) {
            this.activeDuration = b, 
            this.alpha = 1, 
            this.isHiding = !1, 
            this.exists = !0, 
            this.visible = !0, this.part1.show(), 
            this.game.time.events.add(.5 * a.CoinsMagnetPart.TWEEN_DURATION, this.part2.show, this.part2)
        }, 
        c.prototype.update = function() {
            this.visible && this.paused === !1 && (this.activeDuration -= this.game.time.elapsed, 
                this.activeDuration < this.hideDuration && this.isHiding === !1 && this.hide(), 
                this.activeDuration < 0 && this.deactivate(), this.updatePositionAndAngle())
        }, 
        c.prototype.updatePositionAndAngle = function() {
            this.position.set(this.submarine.x, this.submarine.y), 
            this.angle = this.submarine.angle
        }, 
        c.prototype.hide = function() {
            this.isHiding = !0, 
            this.game.add.tween(this).to({
                alpha: 0
            }, this.hideDuration, Phaser.Easing.Cubic.Out, !0)
        }, 
        c.prototype.deactivate = function() {
            this.exists = !1, 
            this.visible = !1, 
            this.part1.hide(),
             this.part2.hide(), 
             this._onDeactivated.dispatch()
        },
         c.prototype.doReset = function() {
            this.deactivate(), 
            this._radius = a.Main.upgrades.getUpgradeByTitle(a.Upgrade.COINS_MAGNET).getValue().radius, 
            a.Main.development && this.initDebugShape()
        }, c.prototype.debugRender = function() {
            this.visible && (this.debugShape.x = this.position.x, this.debugShape.y = this.position.y, this.game.debug.geom(this.debugShape, "yellow", !1))
        }, 
        c.prototype.destroy = function() {
            this._onDeactivated.dispose(), this._onDeactivated = null, this.part1 = null, this.part2 = null
        }, 
        Object.defineProperty(c.prototype, "onDeactivated", {
            get: function() {
                return this._onDeactivated
            },
            enumerable: !0,
            configurable: !0
        }), 

        Object.defineProperty(c.prototype, "radius", {
            get: function() {
                return this._radius
            },
            enumerable: !0,
            configurable: !0
        }), c
    }(Phaser.SpriteBatch);
    a.CoinsMagnet = b
}(game || (game = {}));
//////////////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(a) {
        function b(b, c) {
            a.call(this, b, 0, 0, "turbo_effect"), 
            this.submarine = c, 
            this.exists = !1, 
            this.anchor.set(.45, .5), 
            this.animation = this.animations.add("main", null, 60, !0)
        }
        return __extends(b, a), 
        b.prototype.show = function() {
            this.exists = !0, this.animation.restart()
        }, 
        b.prototype.hide = function() {
            this.exists = !1, this.animation.stop(!1, !1)
        }, 
        b.prototype.update = function() {
            this.visible && (this.x = this.submarine.x, this.y = this.submarine.y, this.angle = this.submarine.angle)
        }, 
        b.prototype.destroy = function() {
            this.animation.destroy(), this.animation = null, this.submarine = null
        }, b
    }(Phaser.Sprite);
    a.TurboEffect = b
}(game || (game = {}));
/////////////////////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function() {
        function b(a, b) {
            this.velocityBeforeTurbo = 0, 
            this.turboVelocity = .9375, 
            this.turboActive = !1,
            this.turboActivating = !1, 
            this.turboDeactivating = !1, 
            this.submarineDead = !1, 
            this.maxSpeedAchieved = !1, 
            this.game = a, 
            this.submarine = b, 
            this.increaseSpeedTimer = this.game.time.events.repeat(1500, Number.MAX_VALUE, this.increaseSpeed, this)
        }
        return b.prototype.increaseSpeed = function() {
            this.maxSpeedAchieved || this.turboActive || this.submarineDead || 
            (this.submarine.velocityX += .0046875, this.submarine.velocityX >= .5 && (this.maxSpeedAchieved = !0))
        }, 
        b.prototype.turnOnTurbo = function() {
            this.velocityBeforeTurbo = this.submarine.velocityX, 
            this.turboActive = !0, this.turboActivating = !0
        }, 
        b.prototype.turnOffTurbo = function() {
            this.turboActive = !1, this.turboDeactivating = !0
        }, 
        b.prototype.onSubmarineDead = function() {
            this.submarineDead = !0
        }, 
        b.prototype.update = function() {
            this.turboActivating && 
            (this.submarine.velocityX *= 1.01, 
                this.submarine.velocityX >= this.turboVelocity && 
                (this.turboActivating = !1)),
                this.turboDeactivating && 
                (this.submarine.velocityX *= .99, 
                    this.submarine.velocityX <= this.velocityBeforeTurbo && 
                    (this.turboDeactivating = !1)), 
                this.submarineDead && this.submarine.velocityX > .01 && (this.submarine.velocityX *= .995)
        }, 
        b.prototype.doReset = function() {
            this.submarine.velocityX = a.Submarine.INITIAL_VELOCITY_X, this.submarineDead = !1, this.turboActive = !1, this.turboActivating = !1, this.turboDeactivating = !1, this.maxSpeedAchieved = !1
        }, 
        b.prototype.destroy = function() {
            this.increaseSpeedTimer && (this.game.time.events.remove(this.increaseSpeedTimer), this.increaseSpeedTimer = null)
        }, 
        b
    }();
    a.VelocityHandler = b
}(game || (game = {}));
//==============================================================================
var game;
! function(a) {
    var b = function(a) {
        function b(b, c, d) {
            a.call(this, b, 0, 0, "crash_smoke_1"), 
            this.submarine = c, 
            this.submarineOffset = d, 
            this.scale.set(1.5, 1.5), 
            this.anchor.set(.5, .5), 
            this.angle = -60, 
            this.exists = !1, 
            this.visible = !1, 

            this.animation = this.animations.add("main", null, 60, !0)
        }
        return __extends(b, a), 
        b.prototype.show = function() {
            this.exists = !0, this.visible = !0, this.animation.restart()
        }, 
        b.prototype.hide = function() {
            this.exists = !1, this.visible = !1, this.animation.stop(!1, !1)
        }, 
        b.prototype.update = function() {
            this.visible && (this.x = this.submarine.x + this.submarineOffset.x, 
                this.y = this.submarine.y + this.submarineOffset.y)
        }, 
        b.prototype.destroy = function() {
            this.submarine = null, 
            this.animation.destroy(), 
            this.animation = null
        }, b
    }(Phaser.Sprite);
    a.CrashSmoke = b
}(game || (game = {}));
//////////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(a) {
        function b(b, c, d) {
            a.call(this, b, 0, 0, "screws"), 
            this.submarineBodyType = -1, 
            this.angle = -90, this.scale.set(.8, .25), 
            this.anchor.set(.5, .5), 
            this.submarine = c,
            this.setAnimation(d)
        }
        return __extends(b, a), 
        b.getFramesPrefix = function(a) {
            return "Fan_" + a.toString() + "_In"
        }, 
        b.prototype.setAnimation = function(a) {
            if (this.submarineBodyType !== a) {
                this.submarineBodyType = a;
                var c = b.getFramesPrefix(this.submarineBodyType),
                    d = Phaser.Animation.generateFrameNames(c, 0, 20, "", 4);
                this.animation = this.animations.add("main", d, 60, !0), this.animation.play()
            }
        }, 
        b.prototype.updatePosition = function() {
            var a = this.submarine.rotation,
                b = 50;
            this.angle = -90 + this.submarine.angle, 
            this.x = this.submarine.x - utils.MathUtil.lowPrecisionCos(a) * b, 
            this.y = this.submarine.y - utils.MathUtil.lowPrecisionSin(a) * b
        }, 
        b.prototype.resumeAnimation = function() {
            this.animation.restart()
        }, 
        b.prototype.stopAnimation = function() {
            this.animation.paused = !0
        }, 
        b.prototype.destroy = function() {
            this.animation.destroy(), this.animation = null
        }, b
    }(Phaser.Sprite);
    a.Screw = b
}(game || (game = {}));
/////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(a) {
        function b(b, c) {
            a.call(this, b, 0, 0, "level_graphics", "Bonus_Double0000"), 
            this.activeDuration = 0, 
            this.isHiding = !1, 
            this.paused = !1, 
            this.submarine = c, 
            this.exists = !1, 
            this.visible = !1, 
            this.anchor.set(.5, .5),
             this._onDeactivated = new Phaser.Signal
        }
        return __extends(b, a), b.prototype.activate = function(a) {
            this.activeDuration = a, this.exists = !0, 
            this.visible = !0, this.alpha = 1, 
            this.isHiding = !1, this.scale.set(0, 0), 
            this.game.add.tween(this.scale).to({
                x: .66,
                y: .66
            }, 800, Phaser.Easing.Elastic.Out, !0)
        }, 
        
        b.prototype.update = function() {
            this.visible && this.paused === !1 && 
            (this.x = this.submarine.x + 54, 
                this.y = this.submarine.y - 36, 
                this.activeDuration -= this.game.time.elapsed, 
                this.isHiding === !1 && this.activeDuration < 0 && (this.isHiding = !0, this.hide()))
        }, 

        b.prototype.hide = function() {
            this.game.add.tween(this.scale).to({
                x: 1.5,
                y: 1.5
            }, 500, Phaser.Easing.Back.In, !0), this.game.add.tween(this).to({
                alpha: 0
            }, 100, Phaser.Easing.Linear.None, !0, 400).onComplete.addOnce(this.deactivate, this)
        }, 
        b.prototype.deactivate = function() {
            this.exists = !1, this.visible = !1, this._onDeactivated.dispatch()
        }, 
        b.prototype.doReset = function() {
            this.deactivate()
        },
         b.prototype.destroy = function() {
            a.prototype.destroy.call(this, !0), this._onDeactivated.dispose(), this._onDeactivated = null
        },
         Object.defineProperty(b.prototype, "onDeactivated", {
            get: function() {
                return this._onDeactivated
            },
            enumerable: !0,
            configurable: !0
        }), b
    }(Phaser.Image);
    a.DoubleCoins = b
}(game || (game = {}));
////////////////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(b) {
        function c(d) {
            b.call(this, d, 0, 0, "level_graphics", "Boat_Body_10000"), 
            this.velocityX = .3125, 
            this.velocityY = 0, 
            this.jumpPower = .03125, 
            this.gravity = .008, 
            this.deceleration = 14.88,
             this._radius = c.RADIUS, 
             this._invulnerable = !1, 
             this.invulnerableTime = 2500, 
             this._currentLives = 3, 
             this.totalLives = 3, 
             this._magnetActive = !1, 
             this._shieldActive = !1, 
             this._turboActive = !1, 
             this._doubleCoinsActive = !1, 
             this.bodyType = -1, 
             this.alive = !0, 
             this.paused = !1, 
             this.syncWithUpgrades(),
             this._hurtSignal = new Phaser.Signal, 
             this.anchor.set(.5, .54), 
             this.events.onAddedToGroup.add(this.onAddedToGroup, this), 
             this.velocityHandler = new a.VelocityHandler(d, this), 
             a.Main.development && this.initDebugShape()
        }
        return __extends(c, b), 
        c.prototype.setBodyType = function(a) {
            this.bodyType !== a && 
            (this.bodyType = a, this.setUsualTexture(), 
                this.screw && this.screw.setAnimation(this.bodyType))
        },
         c.prototype.setUsualTexture = function() {
            var a = "Boat_Body_" + this.bodyType.toString() + "0000";
            this.loadTexture("level_graphics", a)
        },
         c.prototype.setCrashedTexture = function() {
            var a = "Boat_Body_" + this.bodyType.toString() + "_Crashed0000";
            this.loadTexture("level_graphics", a)
        }, 
        c.prototype.onAddedToGroup = function(a, b) {
            this.initCoinsMagnet(b), 
            this.addScrew(b), 
            this.initTurboEffect(b), 
            this.initCrashSmoke(b), 
            this.initShield(b), 
            this.initDoubleCoinsFX(b)
        }, 
        c.prototype.initCrashSmoke = function(b) {
            this.crashSmoke = new a.CrashSmoke(this.game, this, new Phaser.Point(-40, 0)), 
            b.add(this.crashSmoke)
        }, 
        c.prototype.initCoinsMagnet = function(b) {
            this._coinsMagnet = new a.CoinsMagnet(this.game, b, this), 
            this._coinsMagnet.onDeactivated.add(this.onCoinsMagnetDeactivated, this), 
            b.swap(this, this._coinsMagnet)
        },
         c.prototype.addScrew = function(b) {
            this.screw = new a.Screw(this.game, this, this.bodyType), 
            b.addAt(this.screw, b.getIndex(this) - 1)
        }, 
        c.prototype.onCoinsMagnetDeactivated = function() {
            this._magnetActive = !1
        }, 
        c.prototype.initShield = function(b) {
            this.shield = new a.Shield(this.game, this), 
            this.shield.onDeactivated.add(this.onShieldDeactivated, this),
             b.add(this.shield)
        }, 
        c.prototype.onShieldDeactivated = function() {
            this._invulnerable = !1, 
            this._shieldActive = !1
        }, 
        c.prototype.initDoubleCoinsFX = function(b) {
            this.doubleCoinsFX = new a.DoubleCoins(this.game, this), 
            this.doubleCoinsFX.onDeactivated.add(this.onDoubleCoinsDeactivated, this), 
            b.add(this.doubleCoinsFX)
        }, 
        c.prototype.onDoubleCoinsDeactivated = function() {
            this._doubleCoinsActive = !1
        }, 
        c.prototype.initTurboEffect = function(b) {
            this.turboEffect = new a.TurboEffect(this.game, this), 
            b.add(this.turboEffect)
        }, 
        c.prototype.initDebugShape = function() {
            this.debugCircle = new Phaser.Circle(0, 0, 2 * this._radius)
        }, 
        c.prototype.hurt = function() {
            this._invulnerable || this._shieldActive || this._turboActive || 
            (this._currentLives--, this._invulnerable = !0, 
                this._hurtSignal.dispatch(), this.currentLives <= 1 && this.setCrashedTexture(), 
                0 === this.currentLives ? (this.alive = !1, this.crashSmoke.show(), 
                    this.screw.stopAnimation(), this.velocityHandler.onSubmarineDead()) : 
                (this.game.time.events.add(this.invulnerableTime, this.makeVulnerable, this), this.flick()))
        }, 
        c.prototype.flick = function() {
            var a = 100,
                b = Math.ceil(this.invulnerableTime / (2 * a)) + 2;
            this.game.add.tween(this).to({
                alpha: .25
            }, a, Phaser.Easing.Linear.None, !0, 0, b, !0)
        }, 
        c.prototype.makeVulnerable = function() {
            this.alpha = 1, this._invulnerable = !1
        }, 
        c.prototype.update = function() {
            this.paused === !1 && 
            (this.updateMovement(),
             this.updateAngle(), this.velocityHandler.update(),
             this.screw.updatePosition())
        }, 
        c.prototype.updateMovement = function() {
            var b = this.game.time.elapsed,
                c = this.jumpPower * b,
                d = this.gravity * b,
                e = this.deceleration / b;
            
            this.velocityY += d, 
            this.game.input.activePointer.isDown && this.alive ? this.velocityY -= c : this.velocityY < 0 && (this.velocityY *= e), 
            this.velocityY = Phaser.Math.clamp(this.velocityY, -10, 5);
            var f = this.y + this.velocityY;
            f < a.Level.TOP_LEVEL_BOUND ? 
            (f = a.Level.TOP_LEVEL_BOUND, this.velocityY *= .9) : f > a.Level.BOTTOM_LEVEL_BOUND && 
            (f = a.Level.BOTTOM_LEVEL_BOUND, this.velocityY *= .9), this.y = f
        }, 
        c.prototype.updateAngle = function() {
            var a = 3.333 * this.velocityY + 8.333,
                b = a - this.angle;
            this.angle += .25 * b
        }, 
        c.prototype.debugRender = function() {
            this.debugCircle.x = this.x, 
            this.debugCircle.y = this.y, 
            this.game.debug.geom(this.debugCircle, "red", !0), 
            this._coinsMagnet.debugRender()
        }, 
        c.prototype.applyDoubleCoins = function() {
            var a = 8e3;
            this.doubleCoinsFX.activate(a), 
            this._doubleCoinsActive = !0
        }, 
        c.prototype.applyShield = function() {
            this._invulnerable = !0, this._shieldActive = !0;
            var b = a.Main.upgrades.getUpgradeByTitle(a.Upgrade.SHIELD).getValue();
            this.shield.activate(b)
        }, 
        c.prototype.applyMagnet = function() {
            this._magnetActive = !0;
            var b = a.Main.upgrades.getUpgradeByTitle(a.Upgrade.COINS_MAGNET).getValue().duration;
            this._coinsMagnet.activate(b)
        }, 
        c.prototype.increaseLife = function() {
            this._currentLives = Math.min(this._currentLives + 1, this.totalLives)
        }, 
        c.prototype.isFullHealth = function() {
            return this._currentLives === this.totalLives
        }, 
        c.prototype.turnOnTurbo = function() {
            this._invulnerable = !0, this._turboActive = !0, this.turboEffect.show(), this.velocityHandler.turnOnTurbo()
        }, 
        c.prototype.turnOffTurbo = function() {
            this._invulnerable = !1, this._turboActive = !1, this.turboEffect.hide(), this.velocityHandler.turnOffTurbo()
        }, 
        c.prototype.doReset = function() {
            this._invulnerable = !1, 
            this._shieldActive = !1, 
            this._doubleCoinsActive = !1, 
            this._magnetActive = !1, 
            this._turboActive = !1, 
            this.syncWithUpgrades(),
             this.setUsualTexture(), 
             this.crashSmoke.hide(), 
             this.screw.resumeAnimation(), 
             this._coinsMagnet.doReset(), 
             this.doubleCoinsFX.doReset(), 
             this.velocityHandler.doReset(), 
             this.velocityY = 0, 
             this.x = c.INITIAL_X, 
             this.y = a.Config.HALF_GAME_HEIGHT - 100, 
             this.alive = !0
        }, 
        c.prototype.syncWithUpgrades = function() {
            var b = a.Main.upgrades.getUpgradeByTitle(a.Upgrade.BOAT_BODY);
            this.totalLives = b.getValue(), 
            this._currentLives = this.totalLives, 
            this.setBodyType(b.step)
        }, 
        c.prototype.onPause = function() {
            this.paused = !0, 
            this.shield.paused = !0,
             this._coinsMagnet.paused = !0, 
             this.doubleCoinsFX.paused = !0, 
             this.screw.stopAnimation()
        }, 
        c.prototype.onResume = function() {
            this.paused = !1, 
            this.shield.paused = !1,
             this._coinsMagnet.paused = !1, 
            this.doubleCoinsFX.paused = !1, 
            this.screw.resumeAnimation()
        }, 
        c.prototype.destroy = function() {
            this.velocityHandler.destroy(), 
            this.velocityHandler = null, 
            this._hurtSignal.dispose(), 
            this._hurtSignal = null, 
            this.debugCircle = null, 
            this.shield = null, 
            this._coinsMagnet = null, 
            this.turboEffect = null
        }, 
        Object.defineProperty(c.prototype, "radius", {
            get: function() {
                return this._radius
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(c.prototype, "invulnerable", {
            get: function() {
                return this._invulnerable
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(c.prototype, "currentLives", {
            get: function() {
                return this._currentLives
            },
            enumerable: !0,
            configurable: !0
        }),
         Object.defineProperty(c.prototype, "hurtSignal", {
            get: function() {
                return this._hurtSignal
            },
            enumerable: !0,
            configurable: !0
        }), 
         Object.defineProperty(c.prototype, "shieldActive", {
            get: function() {
                return this._shieldActive
            },
            enumerable: !0,
            configurable: !0
        }), 
         Object.defineProperty(c.prototype, "magnetActive", {
            get: function() {
                return this._magnetActive
            },
            enumerable: !0,
            configurable: !0
        }),
         Object.defineProperty(c.prototype, "turboActive", {
            get: function() {
                return this._turboActive
            },
            enumerable: !0,
            configurable: !0
        }), 
         Object.defineProperty(c.prototype, "doubleCoinsActive", {
            get: function() {
                return this._doubleCoinsActive
            },
            enumerable: !0,
            configurable: !0
        }), 
         Object.defineProperty(c.prototype, "coinsMagnet", {
            get: function() {
                return this._coinsMagnet
            },
            enumerable: !0,
            configurable: !0
        }), c.RADIUS = 35,
         c.INITIAL_X = 150,
         c.INITIAL_VELOCITY_X = .3125, 
         c
    }(Phaser.Image);
    a.Submarine = b
}(game || (game = {}));
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    ! function(a) {
        a[a.Coin = 0] = "Coin", a[a.Rock = 1] = "Rock", a[a.Rocket = 2] = "Rocket", a[a.Bonus = 3] = "Bonus"
    }(a.ObjectType || (a.ObjectType = {}));
    a.ObjectType
}(game || (game = {}));
//////////////////
var game;
! function(a) {
    var b = function() {
        function b(b) {
            this.rightHideBound = 0, this.owner = b, this.rightHideBound = a.Config.GAME_WIDTH + .5 * b.width
        }
        return b.prototype.update = function() {
            this.owner.screenX = this.owner.parent.position.x + this.owner.x, 
            this.owner.visible = this.owner.screenX < this.rightHideBound, 
            this.owner.exists = this.owner.visible
        }, 
        b.prototype.destroy = function() {
            this.owner = null
        }, b
    }();
    a.ScrollComponent = b
}(game || (game = {}));
/////////////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(b) {
        function c(d, e, f, g) {
            b.call(this, d, e, f, "coin"), this.objectType = 0, 
            this.screenX = 0, this._attractedByMagnet = !1, 
            this.magnetForce = .1, 
            this._radius = c.SMALL_COIN_RADIUS, 
            this.animationWasStarted = !1, 
            this.animationStartBorder = a.Config.GAME_WIDTH - 200, 
            this.initialY = 0, this.magnitude = 5, this.currentAngle = 0, 
            this.deltaAngle = .025, 
            this.isFloating = !1, 
            this.submarine = g, 
            this.exists = !1, 
            this.visible = !1, 
            this.alive = !1, 
            this.anchor.set(.47, .46), 
            this.scrollComponent = new a.ScrollComponent(this), 
            a.Main.weakDevice === !1 && this.initAnimation(), 
            a.Main.development && this.initDebugShape()
        }
        return __extends(c, b), 
        c.prototype.initAnimation = function() {
            this.animation = this.animations.add("main", null, 60, !1)
        }, 
        c.prototype.initDebugShape = function() {
            this.debugShape = new Phaser.Circle(0, 0, 2 * this._radius)
        }, 
        c.prototype.update = function() {
            this.alive && (this.scrollComponent.update(), this.visible && this.isFloating === !1 && this.startFloat(), 
                this.animation && this.animationWasStarted === !1 && this.screenX < this.animationStartBorder && (this.animation.restart(), 
                    this.animationWasStarted = !0), this._attractedByMagnet ? this.moveToSubmarine() : this.isFloating && this.float())
        }, 
        c.prototype.startFloat = function() {
            this.isFloating = !0, this.initialY = this.y, this.currentAngle = 0
        }, 
        c.prototype.float = function() {
            var a = utils.MathUtil.lowPrecisionSin(this.currentAngle * Math.PI) * this.magnitude;
            this.currentAngle += this.deltaAngle, this.currentAngle >= 2 && (this.currentAngle -= 2), this.y = this.initialY + a
        }, 
        c.prototype.moveToSubmarine = function() {
            var a = this.parent.position.x + this.x - this.submarine.x,
                b = this.y - this.submarine.y;
            this.x -= a * this.magnetForce, this.y -= b * this.magnetForce, this.magnetForce += .01
        }, 
        c.prototype.onAddToPool = function() {
            this.exists = !1, this.alive = !1, 
            this.visible = !1, 
            this.animation && this.animation.stop(!1, !1), 
            this.animationWasStarted = !1
        }, 
        c.prototype.onRemoveFromPool = function() {
            this.alive = !0, this.isFloating = !1, this._attractedByMagnet = !1
        }, 
        c.prototype.debugRender = function() {
            this.debugShape.x = this.screenX, 
            this.debugShape.y = this.y,
            this.game.debug.geom(this.debugShape, "white", !1)
        }, 
        c.prototype.applyMagnet = function() {
            this._attractedByMagnet = !0, this.magnetForce = .1
        }, 
        c.prototype.destroy = function() {
            this.scrollComponent.destroy(), 
            this.scrollComponent = null, 
            this.animation.destroy(), 
            this.animation = null, 
            this.submarine = null
        }, 
        Object.defineProperty(c.prototype, "radius", {
            get: function() {
                return this._radius
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(c.prototype, "attractedByMagnet", {
            get: function() {
                return this._attractedByMagnet
            },
            enumerable: !0,
            configurable: !0
        }), c.SMALL_COIN_RADIUS = 24, c
    }(Phaser.Sprite);
    a.Coin = b
}(game || (game = {}));
/////////////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(a) {
        function b(b, c) {
            a.call(this, b, 0, 0, "coin_sparkles"), 
            this.pool = c, this.scale.set(1.7, 1.7), 
            this.anchor.set(.5, .5), 
            this.exists = !1, 
            this.alive = !1, this.initAnimation()
        }
        return __extends(b, a), 
        b.prototype.initAnimation = function() {
            this.animation = this.animations.add("main", null, 60, !1), 
            this.animation.onComplete.add(this.onAnimationComplete, this)
        }, 
        b.prototype.onAnimationComplete = function() {
            this.pool.returnItem(this)
        }, 
        b.prototype.onAddToPool = function() {
            this.exists = !1, this.alive = !1, this.animation.stop(!1, !1)
        }, 
        b.prototype.onRemoveFromPool = function() {
            this.exists = !0, this.alive = !0, this.animation.restart()
        }, 
        b.prototype.update = function() {
            if (this.alive) {
                var a = this.parent.position.x + this.x;
                0 > a && this.pool.returnItem(this)
            }
        }, 
        b.prototype.destroy = function() {
            this.animation.destroy(), this.animation = null, this.pool = null
        }, b
    }(Phaser.Sprite);
    a.CoinSparkles = b
}(game || (game = {}));
/////////////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(b) {
        function c(c, d) {
            b.call(this, c, d), this.backHillsSpeed = 0, 
            this.backHillsOffset = -2, this.frontHillsSpeed = 0, 
            this.frontHillsOffset = -2, this.sandScrollSpeed = 0, 
            this.sandsOffset = -12, this.initHills(), 
            this.initSands(), 
            a.Main.weakDevice === !1 && this.initLight()
        }
        return __extends(c, b), 
        c.prototype.initHills = function() {
            var a = 200;
            this.backHills1 = this.game.add.image(0, a, "level_graphics", "Hills_Top_Layer0000", this), 
            this.backHills2 = this.game.add.image(this.backHills1.x + this.backHills1.width + this.backHillsOffset, a, 
                "level_graphics", "Hills_Top_Layer0000", this);

            var b = 355;
            this.frontHills1 = this.game.add.image(0, b, "level_graphics", "Hills_Bottom_Layer0000", this), 
            this.frontHills2 = this.game.add.image(this.frontHills1.x + this.frontHills1.width + this.frontHillsOffset, 
                b, "level_graphics", "Hills_Bottom_Layer0000", this)
        }, 
        c.prototype.initSands = function() {
            this.sand1 = this.game.add.image(-4, 0, "level_graphics", "Sand_Layer0000", this), this.sand2 = this.game.add.image(this.sand1.x + this.sand1.width + this.sandsOffset, 0, "level_graphics", "Sand_Layer0000", this);
            var b = 45;
            this.sand1.y = a.Config.GAME_HEIGHT - this.sand1.height + b, this.sand2.y = a.Config.GAME_HEIGHT - this.sand2.height + b
        }, 
        c.prototype.initLight = function() {
            this.topLight = this.game.add.image(0, 0, "level_graphics", "Light_Layer0000", this)
        }, 
        c.prototype.scroll = function(a) {
            this.sandScrollSpeed = .8 * a, 
            this.frontHillsSpeed = .6 * a, 
            this.backHillsSpeed = .4 * a, 
            this.scrollHills(), 
            this.scrollSand()
        }, 
        c.prototype.scrollHills = function() {
            this.backHills1.x -= this.backHillsSpeed, 
            this.backHills2.x -= this.backHillsSpeed, 
            this.backHills1.x < -this.backHills1.width && (this.backHills1.x = this.backHills2.x + this.backHills2.width + this.backHillsOffset), 
            this.backHills2.x < -this.backHills2.width && (this.backHills2.x = this.backHills1.x + this.backHills1.width + this.backHillsOffset), 
            this.frontHills1.x -= this.frontHillsSpeed, 
            this.frontHills2.x -= this.frontHillsSpeed, 
            this.frontHills1.x < -this.frontHills1.width && (this.frontHills1.x = this.frontHills2.x + this.frontHills2.width + this.frontHillsOffset),
             this.frontHills2.x < -this.frontHills2.width && (this.frontHills2.x = this.frontHills1.x + this.frontHills1.width + this.frontHillsOffset)
        }, 
        c.prototype.scrollSand = function() {
            this.sand1.x -= this.sandScrollSpeed, 
            this.sand2.x -= this.sandScrollSpeed, 
            this.sand1.x < -this.sand1.width && (this.sand1.x = this.sand2.x + this.sand2.width + this.sandsOffset), 
            this.sand2.x < -this.sand2.width && (this.sand2.x = this.sand1.x + this.sand1.width + this.sandsOffset)
        }, c
    }(Phaser.SpriteBatch);
    a.Background = b
}(game || (game = {}));
/////////////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function() {
        function b(b, c) {
            this.passedDistance = 0, 
            this.newBlockMark = a.Config.HALF_GAME_WIDTH, 
            this.newBlockY = 0, 
            this.turboMode = !1, 
            this.game = b, 
            this.objectsLayer = c, 
            this.itemPosition = new Phaser.Point, 
            this.initItemBlocks()
        }
        return b.prototype.setAddItemCallback = function(a, b) {
            this.addItemCallback = a, this.addItemCallbackContext = b
        }, 
        b.prototype.initItemBlocks = function() {
            var a = this;
            this.normalModeBlocks = [], this.turboModeBlocks = [];
            var b = this.game.cache.getJSON("itemBlocks");
            b.forEach(function(b) {
                "true" === b.normalMode && a.normalModeBlocks.push(b), "true" === b.turboMode && a.turboModeBlocks.push(b)
            })
        }, 
        b.prototype.update = function(a) {
            if (this.passedDistance += a, this.passedDistance > this.newBlockMark) {
                this.passedDistance = 0;
                var c = this.addNewBlock(),
                    d = this.game.rnd.realInRange(b.MIN_BLOCKS_DISTANCE, b.MAX_BLOCKS_DISTANCE);
                this.newBlockMark = c + d
            }
        }, 
        b.prototype.addNewBlock = function() {
            var b = this.getNewBlock();
            if (b.fixed_position === !1) {
                var c = b.height;
                this.newBlockY = this.game.rnd.integerInRange(a.Level.TOP_LEVEL_BOUND, a.Level.BOTTOM_LEVEL_BOUND - c - 20)
            } else this.newBlockY = 0;
            for (var d = b.items, e = d.length, f = 0; e > f; f++) this.addItem(d[f]);
            return b.width
        }, 
        b.prototype.addItem = function(a) {
            var b = a.type;
            b.indexOf("Coin") > -1 ? this.addCoin(a) : b.indexOf("Rock") > -1 && this.addRock(a)
        }, 
        b.prototype.addCoin = function(a) {
            this.newItemPosition(a), this.dispatchAddItemCallback("coin", a, this.itemPosition)
        }, 
        b.prototype.addRock = function(a) {
            this.newItemPosition(a), this.dispatchAddItemCallback("rock", a, this.itemPosition)
        }, 
        b.prototype.newItemPosition = function(b) {
            return this.itemPosition.x = Math.abs(this.objectsLayer.position.x) + a.Config.GAME_WIDTH + 100 + b.x, 
            this.itemPosition.y = this.newBlockY + b.y, this.itemPosition
        }, 
        b.prototype.getNewBlock = function() {
            return this.turboMode ? this.getTurboBlock() : this.getAnyBlock()
        }, 
        b.prototype.getTurboBlock = function() {
            return this.game.rnd.pick(this.turboModeBlocks)
        }, 
        b.prototype.getAnyBlock = function() {
            return this.game.rnd.pick(this.normalModeBlocks)
        }, 
        b.prototype.dispatchAddItemCallback = function(a, b, c) {
            this.addItemCallback.call(this.addItemCallbackContext, a, b, c)
        }, 
        b.prototype.turnOnTurbo = function() {
            this.turboMode = !0
        }, 
        b.prototype.turnOffTurbo = function() {
            this.turboMode = !1
        }, 
        b.prototype.doReset = function() {
            this.turboMode = !1, 
            this.passedDistance = 0, 
            this.newBlockMark = a.Config.HALF_GAME_WIDTH
        }, 
        b.prototype.destroy = function() {
            this.addItemCallback = null, 
            this.addItemCallbackContext = null, 
            this.itemPosition = null, 
            this.game = null, 
            this.objectsLayer = null, 
            this.normalModeBlocks = null, 
            this.turboModeBlocks = null
        }, b.MIN_BLOCKS_DISTANCE = 400, b.MAX_BLOCKS_DISTANCE = 600, b
    }();
    a.LevelGenerator = b
}(game || (game = {}));
/////////////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function() {
        function a(a, b, c) {
            this._initialChance = 0, this.currentChance = 0, this.locked = !0, this._bonusType = a, this._initialChance = b, this.locked = c
        }
        return Object.defineProperty(a.prototype, "bonusType", {
            get: function() {
                return this._bonusType
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(a.prototype, "initialChance", {
            get: function() {
                return this._initialChance
            },
            enumerable: !0,
            configurable: !0
        }), a
    }();
    a.BonusInfo = b
}(game || (game = {}));
/////////////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    ! function(a) {
        a[a.Heart = 0] = "Heart", 
        a[a.Shield = 1] = "Shield", 
        a[a.DoubleCoins = 2] = "DoubleCoins", 
        a[a.CoinsMagnet = 3] = "CoinsMagnet",
         a[a.TurboCharge = 4] = "TurboCharge"
    }(a.BonusType || (a.BonusType = {}));
    a.BonusType
}(game || (game = {}));
/////////////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function() {
        function b(a, c, d) {
            this.passedDistance = 0, 
            this.newBonusMark = b.MAX_DISTANCE, 
            this.bonusTypes = [], 
            this.restrictedBonuses = [], 
            this.game = a, this.objectsLayer = c, 
            this.submarine = d, 
            this._addBonusSignal = new Phaser.Signal, 
            this.bonusPosition = new Phaser.Point, 
            this.initBonusesInfo(), 
            this.updateBonusesInfo(), 
            this.generateBonusTypes()
        }
        return b.prototype.initBonusesInfo = function() {
            this.bonusesInfo = [new a.BonusInfo(4, 56, !1), 
            new a.BonusInfo(1, 15, !1), 
            new a.BonusInfo(3, 15, !1), 
            new a.BonusInfo(0, 7, !1), new a.BonusInfo(2, 7, !1)]
        }, b.prototype.updateBonusesInfo = function() {
            for (var b = this.bonusesInfo.length, c = 0; b > c; c++) {
                var d = this.bonusesInfo[c];
                3 === d.bonusType ? d.locked = 0 === a.Main.upgrades.getUpgradeStep(a.Upgrade.COINS_MAGNET) : 
                1 === d.bonusType ? d.locked = 0 === a.Main.upgrades.getUpgradeStep(a.Upgrade.SHIELD) : 
                4 === d.bonusType && (d.locked = 0 === a.Main.upgrades.getUpgradeStep(a.Upgrade.TURBO))
            }
        }, 
        b.prototype.generateBonusTypes = function() {
            this.recalculateChances(), this.bonusTypes.length = 0;
            for (var a = this.bonusesInfo.length, b = 0; a > b; b++) {
                var c = this.bonusesInfo[b];
                c.locked === !1 && this.addBonusTypes(c.currentChance, c.bonusType)
            }
            if (this.bonusTypes.length > 0) this.bonusTypes.length = 100;
            else if (this.bonusTypes.length < 100)
                for (; this.bonusTypes.length < 100;) this.bonusTypes.push(2)
        }, 
        b.prototype.recalculateChances = function() {
            for (var a = 0, b = this.bonusesInfo.length, c = 0; b > c; c++) {
                var d = this.bonusesInfo[c];
                d.locked === !1 && (a += d.initialChance)
            }
            for (var e = 100 / a, c = 0; b > c; c++) {
                var d = this.bonusesInfo[c];
                d.locked === !1 && (d.currentChance = Math.round(d.initialChance * e))
            }
        }, 
        b.prototype.addBonusTypes = function(a, b) {
            for (var c = this.bonusTypes.length, d = c; c + a > d; d++) this.bonusTypes[d] = b
        }, 
        b.prototype.update = function(a) {
            this.passedDistance += a, this.passedDistance > this.newBonusMark && 
            (this.passedDistance = 0, this.newBonusMark = this.game.rnd.integerInRange(b.MIN_DISTANCE, b.MAX_DISTANCE), this.generateBonus())
        }, 
        b.prototype.generateBonus = function() {
            this.updateRestrictedBonuses();
            var a = this.game.rnd.pick(this.bonusTypes); - 1 === this.restrictedBonuses.indexOf(a) && (this.updateBonusPosition(), 
                this._addBonusSignal.dispatch(a, this.bonusPosition))
        }, b.prototype.updateRestrictedBonuses = function() {
            this.restrictedBonuses.length = 0, this.submarine.isFullHealth() && this.restrictedBonuses.push(0), 
            (this.submarine.shieldActive || this.submarine.turboActive) && this.restrictedBonuses.push(1), 
            this.submarine.turboActive && this.restrictedBonuses.push(4), 
            this.submarine.magnetActive && this.restrictedBonuses.push(3),
            this.submarine.doubleCoinsActive && this.restrictedBonuses.push(2)
        }, 
        b.prototype.updateBonusPosition = function() {
            this.bonusPosition.x = Math.abs(this.objectsLayer.position.x) + a.Config.GAME_WIDTH, 
            this.bonusPosition.y = this.game.rnd.integerInRange(b.TOP_Y, b.BOTTOM_Y)
        }, 
        b.prototype.doReset = function() {
            this.updateBonusesInfo(), 
            this.generateBonusTypes(), 
            this.passedDistance = 0, this.newBonusMark = b.MAX_DISTANCE
        }, 
        b.prototype.destroy = function() {
            this._addBonusSignal.dispose(), 
            this._addBonusSignal = null, 
            this.restrictedBonuses = null, 
            this.bonusesInfo = null, 
            this.bonusTypes = null, 
            this.bonusPosition = null, 
            this.game = null, 
            this.objectsLayer = null, 
            this.submarine = null
        }, 
        Object.defineProperty(b.prototype, "addBonusSignal", {
            get: function() {
                return this._addBonusSignal
            },
            enumerable: !0,
            configurable: !0
        }), b.TOP_Y = .33 * a.Config.GAME_HEIGHT, 
        b.BOTTOM_Y = .66 * a.Config.GAME_HEIGHT, 
        b.MIN_DISTANCE = 4 * a.Config.GAME_WIDTH, 
        b.MAX_DISTANCE = 6 * a.Config.GAME_WIDTH, b
    }();
    a.BonusGenerator = b
}(game || (game = {}));
///////////////////////////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(b) {
        function c(c, d, e, f) {
            b.call(this, c, d, e, "level_graphics", f), 
            this.alive = !1, 
            this.objectType = 1,
             this.screenX = 0, 
             this._ellipseWidth = 0,
              this._ellipseHeight = 0, 
              this.name = f, this.exists = !1, 
              this.visible = !1, 
              this.anchor.set(.5, .5), 
              this.scrollComponent = new a.ScrollComponent(this)
        }
        return __extends(c, b), 
        c.prototype.setShapeParams = function(b, c) {
            this._ellipseWidth = b, 
            this._ellipseHeight = c,
             a.Main.development && this.initDebugShape()
        }, 
        c.prototype.initDebugShape = function() {
            var a = new Phaser.Graphics(this.game, 0, 0);
            a.beginFill(16711680, .75), 
            a.drawEllipse(0, 0, .5 * this.width, .5 * this.height), 
            a.endFill(), 
            this.debugShape = this.game.add.image(0, 0, "rock_debug_shape", null, this.parent), 
            this.debugShape.setTexture(a.generateTexture()), 
            this.debugShape.anchor.set(.5, .5), 
            this.debugShape.visible = !1, a.destroy()
        }, 
        c.prototype.update = function() {
            this.alive && this.scrollComponent.update()
        },
         c.prototype.startDebugRender = function() {
            this.debugShape && (this.debugShape.visible = !0)
        }, 
        c.prototype.debugRender = function() {
            this.debugShape && (this.debugShape.x = this.x, this.debugShape.y = this.y)
        }, 
        c.prototype.stopDebugRender = function() {
            this.debugShape && (this.debugShape.visible = !1)
        }, 
        c.prototype.onAddToPool = function() {
            this.exists = !1, this.visible = !1, this.alive = !1
        }, 
        c.prototype.onRemoveFromPool = function() {
            this.alive = !0, this.exists = !0
        }, 
        c.prototype.destroy = function() {
            this.scrollComponent.destroy(), 
            this.scrollComponent = null, 
            this.debugShape = null
        }, 
        Object.defineProperty(c.prototype, "ellipseWidth", {
            get: function() {
                return this._ellipseWidth
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(c.prototype, "ellipseHeight", {
            get: function() {
                return this._ellipseHeight
            },
            enumerable: !0,
            configurable: !0
        }), c
    }(Phaser.Image);
    a.Rock = b
}(game || (game = {}));
///////////////////////////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function() {
        function b(a, b) {
            this._game = a, this.objectsLayer = b, this.initItems()
        }
        return b.prototype.initItems = function() {
            this.items = [];
            var b = {
                Rock_10000: 5,
                Rock_20000: 4,
                Rock_40000: 4,
                Rock_50000: 2
            };
            for (var c in b)
                if (b.hasOwnProperty(c))
                    for (var d = b[c], e = 0; d > e; e++) {
                        var f = new a.Rock(this._game, 0, 0, c);
                        this.objectsLayer.addAt(f, 0), this.items.push(f)
                    }
        }, 
        b.prototype.getItem = function(b) {
            var c = this.getAvailableRock(b);
            return null === c && (c = new a.Rock(this._game, 0, 0, b), 
                this.items.push(c), 
                this.objectsLayer.add(c)), c.onRemoveFromPool(), c
        }, 
        b.prototype.getAvailableRock = function(a) {
            for (var b = this.items.length, c = 0; b > c; c++) {
                var d = this.items[c];
                if (d.alive === !1 && d.name === a) return d
            }
            return null
        }, 
        b.prototype.returnItem = function(a) {
            a.onAddToPool()
        },
        b.prototype.doReset = function() {
            for (var a = this.items.length, b = 0; a > b; b++) {
                var c = this.items[b];
                c.alive && this.returnItem(c)
            }
        }, 
        b.prototype.destroy = function() {
            this._game = null, 
            this.objectsLayer = null, 
            this.items.length = 0, 
            this.items = null
        }, b
    }();
    a.RocksPool = b
}(game || (game = {}));
//////////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(b) {
        function c(c, d, e) {
            b.call(this, c, 0, 0, "level_graphics", d), this._objectType = 3, 
            this.velocityX = 1 / 16, this.screenX = 0, this.alive = !0, 
            this._radius = a.Bonus.RADIUS, 
            this.paused = !1, this.initialY = 0, 
            this.currentAngle = 0, this.deltaAngle = .1, 
            this.magnitude = 40, this._bonusType = e, 
            this.exists = !1, this.visible = !1, this.alive = !1, 
            this.anchor.set(.5, .5), 
            this.scrollComponent = new a.ScrollComponent(this), 
            this.deltaAngle = c.rnd.realInRange(.01, .02), 
            this.magnitude = 1.5 / this.deltaAngle, 
            a.Main.weakDevice === !1 && this.initTween(), 
            a.Main.development && this.initDebugShape()
        }
        return __extends(c, b), c.prototype.initTween = function() {
            this.tween = this.game.add.tween(this.scale).to({
                x: 1.15,
                y: .85
            }, 300, Phaser.Easing.Cubic.Out, !1, 0, 1e4, !0)
        }, c
        .prototype.initDebugShape = function() {
            this.debugShape = new Phaser.Circle(0, 0, 2 * this._radius)
        }, 
        c.prototype.update = function() {
            this.alive && this.paused === !1 && (this.updateMovement(), 
                this.scrollComponent.update())
        }, 
        c.prototype.updateMovement = function() {
            var a = utils.MathUtil.lowPrecisionSin(this.currentAngle * Math.PI) * this.magnitude;
            this.currentAngle += this.deltaAngle, this.currentAngle >= 2 && (this.currentAngle -= 2), 
            this.x -= this.velocityX * this.game.time.elapsed, this.y = this.initialY + a
        }, 
        c.prototype.onAddToPool = function() {
            this.exists = !1, 
            this.visible = !1, 
            this.alive = !1, 
            this.tween && this.tween.pause()
        }, 
        c.prototype.onRemoveFromPool = function() {
            this.alive = !0, this.tween && (this.tween.isRunning ? this.tween.resume() : this.tween.start())
        }, 
        c.prototype.debugRender = function() {
            this.debugShape.x = this.screenX, 
            this.debugShape.y = this.y, 
            this.game.debug.geom(this.debugShape, "yellow")
        }, 
        c.prototype.onPause = function() {
            this.paused = !0
        }, 
        c.prototype.onResume = function() {
            this.paused = !1
        }, 
        c.prototype.destroy = function() {
            b.prototype.destroy.call(this, !0), 
            this.scrollComponent.destroy(), 
            this.scrollComponent = null, 
            this.tween && (this.tween.stop(), this.tween = null), 
            this.debugShape = null
        }, 
        Object.defineProperty(c.prototype, "bonusType", {
            get: function() {
                return this._bonusType
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(c.prototype, "objectType", {
            get: function() {
                return this._objectType
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(c.prototype, "radius", {
            get: function() {
                return this._radius
            },
            enumerable: !0,
            configurable: !0
        }), c.RADIUS = 30, c
    }(Phaser.Image);
    a.Bonus = b
}(game || (game = {}));
////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function() {
        function b(a, b) {
            this.game = a, 
            this.parentLayer = b, 
            this.initBonuses()
        }
        return b.prototype.initBonuses = function() {
            var b = this;
            this.items = [
                new a.Bonus(this.game, "Bonus_Heart0000", 0), 
                new a.Bonus(this.game, "Bonus_Shield0000", 1), 
                new a.Bonus(this.game, "Bonus_Zip0000", 4), 
                new a.Bonus(this.game, "Bonus_Magnet0000", 3), 
                new a.Bonus(this.game, "Bonus_Double0000", 2)
                ], 
            this.items.forEach(function(a) {
                b.parentLayer.add(a)
            })
        }, 
        b.prototype.getItem = function(a) {
            for (var b = this.items.length, c = 0; b > c; c++) {
                var d = this.items[c];
                if (d.bonusType === a) return d.onRemoveFromPool(), d.alive = !0, d
            }
            return null
        }, 
        b.prototype.returnItem = function(a) {
            a.onAddToPool(), a.alive = !1
        }, 
        b.prototype.doReset = function() {
            for (var a = this.items.length, b = 0; a > b; b++) {
                var c = this.items[b];
                c.alive && this.returnItem(c)
            }
        }, 
        b.prototype.destroy = function() {
            this.game = null, this.parentLayer = null, this.items = null
        }, b
    }();
    a.BonusesPool = b
}(game || (game = {}));
/////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(a) {
        function b(b) {
            a.call(this, b)
        }
        return __extends(b, a), b
    }(utils.ObjectPool);
    a.RocketsPool = b
}(game || (game = {}));
/////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(a) {
        function b(b) {
            a.call(this, b, 0, 0, "level_graphics", "Rocket_Sign0000"), 
            this.visible = !1, this.anchor.set(.5, .5), 
            this.angle = -10, 
            this.rotateTween = this.game.add.tween(this).to({
                angle: 10
            }, 150, Phaser.Easing.Cubic.Out, !1, 0, 1e4, !0)
        }
        return __extends(b, a), 
        b.prototype.show = function() {
            this.exists = !0, this.visible = !0, 
            this.rotateTween.isRunning ? this.rotateTween.resume() : this.rotateTween.start()
        }, 
        b.prototype.hide = function() {
            this.exists = !1, this.visible = !1, this.rotateTween.pause()
        }, 
        b.prototype.destroy = function() {
            this.rotateTween.stop(), this.rotateTween = null
        }, b
    }(Phaser.Image);
    a.RocketSign = b
}(game || (game = {}));
/////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(a) {
        function b(b, c) {
            a.call(this, b, 0, 0, "rocket_trail"), 
            this.rocket = c, 
            this.exists = !1, 
            this.visible = !1, 
            this.anchor.set(.5, .5), 
            this.scale.set(1.3, 1.3),
             this.initAnimation()
        }
        return __extends(b, a), 
        b.prototype.initAnimation = function() {
            this.animation = this.animations.add("main", null, 60, !0)
        }, 
        b.prototype.show = function() {
            this.exists = !0, this.visible = !0, 
            this.animation.restart(), 
            this.animation.frame = this.game.rnd.integerInRange(0, this.animation.frameTotal - 1)
        }, 
        b.prototype.hide = function() {
            this.exists = !1, this.visible = !1, this.animation.stop(!1, !1)
        }, 
        b.prototype.update = function() {
            this.visible && (this.x = this.rocket.x + 90, this.y = this.rocket.y)
        }, 
        b.prototype.destroy = function() {
            this.animation.destroy(), 
            this.animation = null, 
            this.rocket = null
        }, b
    }(Phaser.Sprite);
    a.RocketSmoke = b
}(game || (game = {}));
///////////////////////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(b) {
        function c(c) {
            b.call(this, c, 0, 0, "level_graphics", "Rocket0000"), this.objectType = 2, 
            this.alive = !1, this.screenX = 0, this.velocityX = 6, 
            this._radius = a.Rocket.RADIUS, 
            this._launched = !1, 
            this.launchDelay = 0, this.paused = !1, this.initialY = 0, 
            this.currentAngle = 0, this.deltaAngle = .04,
            this.magnitude = 15, this.alive = !1, this.exists = !1,
            this.visible = !1, this.anchor.set(.24, .45), 
            this.scrollComponent = new a.ScrollComponent(this), 
            this.events.onAddedToGroup.addOnce(this.addSmoke, this), 
            this.initSign(), 
            a.Main.development && this.initDebugShape()
        }
        return __extends(c, b), 
        c.prototype.addSmoke = function(b, c) {
            a.Main.weakDevice === !1 && (this.smoke = new a.RocketSmoke(this.game, this), 
                c.add(this.smoke))
        }, 
        c.prototype.initSign = function() {
            this.sign = new a.RocketSign(this.game), 
            this.sign.x = a.Config.GAME_WIDTH - .5 * this.sign.width - 10, 
            this.game.world.add(this.sign)
        }, 
        c.prototype.initDebugShape = function() {
            this.debugShape = new Phaser.Circle(0, 0, 2 * this._radius)
        }, 
        c.prototype.update = function() {
            this.alive && this.paused === !1 && (this._launched ? (this.updateMovement(), this.scrollComponent.update()) : 
                (this.x = Math.abs(this.parent.position.x) + a.Config.GAME_WIDTH + 100, 
                    this.launchDelay -= .3125 * this.game.time.elapsed, this.launchDelay <= 0 && this.launch()))
        }, 
        c.prototype.updateMovement = function() {
            var a = utils.MathUtil.lowPrecisionSin(this.currentAngle * Math.PI) * this.magnitude;
            this.currentAngle += this.deltaAngle, this.currentAngle >= 2 && (this.currentAngle -= 2),
             this.x -= this.velocityX,
              this.y = this.initialY + a, this.angle = (this.initialY - this.y) * -.22
        }, 
        c.prototype.launch = function() {
            this.game.sound.usingWebAudio && this.game.sound.play("rocket", .5), 
            this.scrollComponent.update(), 
            this._launched = !0, 
            this.sign.hide(), 
            this.smoke && this.smoke.show()
        }, 
        c.prototype.onAddToPool = function() {
            this.exists = !1,
             this.visible = !1, 
            this.alive = !1, 
            this._launched = !1, 
            this.sign.hide(), 
            this.smoke && this.smoke.hide()
        }, 
        c.prototype.onRemoveFromPool = function() {
            this.alive = !0, this._launched = !1
        }, 
        c.prototype.debugRender = function() {
            this.debugShape.x = this.screenX, 
            this.debugShape.y = this.y, 
            this.game.debug.geom(this.debugShape, "white")
        }, 
        c.prototype.prepareToLaunch = function(a) {
            this.launchDelay = a, 
            this.initialY = this.y, 
            this.sign.show(), 
            this.sign.y = this.y
        }, 
        c.prototype.onPause = function() {
            this.paused = !0
        }, 
        c.prototype.onResume = function() {
            this.paused = !1
        }, 
        c.prototype.destroy = function() {
            this.scrollComponent.destroy(), 
            this.scrollComponent = null, 
            this.sign = null, this.smoke = null,
             this.debugShape = null
        }, 
        Object.defineProperty(c.prototype, "radius", {
            get: function() {
                return this._radius
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(c.prototype, "launched", {
            get: function() {
                return this._launched
            },
            enumerable: !0,
            configurable: !0
        }), c.RADIUS = 16, 
        c.COLLIDE_DISTANCE = a.Submarine.RADIUS + c.RADIUS, 
        c.COLLIDE_DISTANCE_SQAURED = c.COLLIDE_DISTANCE * c.COLLIDE_DISTANCE, c
    }(Phaser.Image);
    a.Rocket = b
}(game || (game = {}));
//////////////////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function() {
        function b(b, c) {
            this.generationDistance = 6 * a.Config.GAME_WIDTH, 
            this.generationOffset = 400, 
            this.passedDistance = 0, 
            this.newRocketMark = 0, 
            this.active = !0, 
            this.game = b, this.objectsLayer = c, 
            this.syncWithUpgrades(), 
            this.newRocketMark = this.getNewRocketMark(), 
            this._launchRocketSignal = new Phaser.Signal, 
            this.rocketPosition = new Phaser.Point
        }
        return b.prototype.getNewRocketMark = function() {
            var a = this.generationDistance - this.generationOffset,
                b = this.generationDistance + this.generationOffset;
            return this.game.rnd.realInRange(a, b)
        }, 
        b.prototype.update = function(a) {
            this.active !== !1 && (this.passedDistance += a, 
                this.passedDistance > this.newRocketMark && (this.passedDistance = 0, 
                    this.newRocketMark = this.getNewRocketMark(),
                    this.generateRockets()))
        }, 
        b.prototype.generateRockets = function() {
            var a = this.game.rnd.integerInRange(1, 20);
            5 > a ? this.generateThreeRockets() : 10 > a ? this.generateTwoRockets() : 
            15 > a && this.generateOneRocket(), 15 > a && this.game.sound.usingWebAudio && this.game.sound.play("rocket_alert", .33)
        }, 
        b.prototype.generateThreeRockets = function() {
            for (var a = 240, c = a / 2, d = this.game.rnd.realInRange(b.TOP_Y, b.BOTTOM_Y - a), 
                e = this.game.rnd.realInRange(500, 1e3), f = 180, g = 0; 3 > g; g++) this.generateRocket(d, e), d += c, e += f
        }, 
        b.prototype.generateTwoRockets = function() {
            for (var a = 100, c = 240, 
                d = this.game.rnd.realInRange(a, c),
                e = this.game.rnd.realInRange(b.TOP_Y, b.BOTTOM_Y - c), 
                f = this.game.rnd.realInRange(500, 1e3), g = 0; 2 > g; g++) 
                this.generateRocket(e, f),
                e += d
        },
        b.prototype.generateOneRocket = function() {
            var a = this.game.rnd.realInRange(b.TOP_Y, b.BOTTOM_Y),
                c = this.game.rnd.realInRange(500, 1e3);
            this.generateRocket(a, c)
        }, 
        b.prototype.generateRocket = function(a, b) {
            this._launchRocketSignal.dispatch(a, b)
        }, 
        b.prototype.turnOnTurbo = function() {
            this.active = !1
        }, 
        b.prototype.turnOffTurbo = function() {
            this.active = !0
        }, 
        b.prototype.doReset = function() {
            this.syncWithUpgrades(), 
            this.passedDistance = 0, 
            this.newRocketMark = this.getNewRocketMark(), 
            this.active = !0
        }, 
        b.prototype.syncWithUpgrades = function() {
            var b = 4 * a.Config.GAME_WIDTH,
                c = 6 * a.Config.GAME_WIDTH,
                d = a.Main.upgrades.getUpgradeStep(a.Upgrade.BOAT_BODY),
                e = b + (c - b) * (3 - d) * .33;
            this.generationDistance = e
        }, 
        b.prototype.destroy = function() {
            this.game = null, 
            this.objectsLayer = null, 
            this.rocketPosition = null, 
            this._launchRocketSignal.dispose(), 
            this._launchRocketSignal = null
        }, 
        Object.defineProperty(b.prototype, "launchRocketSignal", {
            get: function() {
                return this._launchRocketSignal
            },
            enumerable: !0,
            configurable: !0
        }), 
        b.TOP_Y = .2 * a.Config.GAME_HEIGHT, b.BOTTOM_Y = .8 * a.Config.GAME_HEIGHT, b
    }();
    a.RocketGenerator = b
}(game || (game = {}));
///////////////////////////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function() {
        function b(b, c) {
            this._active = !1, 
            this._duration = 0, 
            this.turboCharges = 0, 
            this.game = b, 
            this.turboLabel = c, 
            this._duration = a.Main.upgrades.getUpgradeByTitle(a.Upgrade.TURBO).getValue(), 
            this.items = []
        }
        return b.prototype.addTurboObject = function(a) {
            this.items.push(a)
        }, 
        b.prototype.addTurboCharge = function() {
            this.turboCharges++, this.turboCharges >= 3 && (this.turboCharges = 0, this.activate()), 
            this.turboLabel.updateText(this.turboCharges)
        },
        b.prototype.activate = function() {
            this._active = !0,
             this.activateTurboForItems(), 
            this.game.time.events.add(this._duration, this.deactivate, this)
        }, 
        b.prototype.activateTurboForItems = function() {
            this.items.forEach(function(a) {
                a.turnOnTurbo()
            })
        }, 
        b.prototype.deactivate = function() {
            this._active = !1, this.deactivateTurboForItems()
        }, 
        b.prototype.deactivateTurboForItems = function() {
            this.items.forEach(function(a) {
                a.turnOffTurbo()
            })
        },
        b.prototype.doReset = function() {
            this._active = !1, 
            this._duration = a.Main.upgrades.getUpgradeByTitle(a.Upgrade.TURBO).getValue(), 
            this.turboCharges = 0
        },
        b.prototype.destroy = function() {
            this.game = null, this.items = null
        },
        Object.defineProperty(b.prototype, "active", {
            get: function() {
                return this._active
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(b.prototype, "duration", {
            get: function() {
                return this._duration
            },
            enumerable: !0,
            configurable: !0
        }), b
    }();
    a.TurboMode = b
}(game || (game = {}));
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(b) {
        function c(a, c) {
            b.call(this, a, c), 
            this.exists = !1, 
            this.visible = !1, 
            this.initParticles(), 
            this.initVelocities()
        }
        return __extends(c, b), 
        c.prototype.initParticles = function() {
            this.particles = [];
            for (var a = 10, b = 0; a > b; b++) {
                var c = this.game.rnd.realInRange(1, 1.3),
                    d = this.game.add.image(0, 0, "level_graphics", "Turbo_Particle0000", this);
                d.scale.set(2 * c, .8),
                 d.alpha = this.game.rnd.realInRange(.2, .5), 
                 d.exists = !1, 
                 d.visible = !1, 
                 this.particles.push(d)
            }
        }, 
        c.prototype.initVelocities = function() {
            this.velocities = [];
            for (var a = this.particles.length, b = 0; a > b; b++) {
                var c = this.game.rnd.realInRange(33, 40);
                this.velocities.push(c)
            }
        }, 
        c.prototype.update = function() {
            this.visible && this.updateParticles()
        }, 
        c.prototype.updateParticles = function() {
            for (var a = this.particles.length, b = 0; a > b; b++) {
                var c = this.particles[b];
                c.x -= this.velocities[b], c.x < -100 && this.resetParticle(c, b)
            }
        }, 
        c.prototype.resetParticle = function(b) {
            b.x = a.Config.GAME_WIDTH
        }, 
        c.prototype.turnOnTurbo = function() {
            this.exists = !0, 
            this.visible = !0, 
            this.setRandomPositions(), 
            this.setParticlesExistsProp(!0),
             this.alpha = 0, 
             this.game.add.tween(this).to({
                alpha: 1
            }, 500, Phaser.Easing.Linear.None, !0)
        }, 
        c.prototype.setRandomPositions = function() {
            for (var b = this.particles.length, c = 0; b > c; c++) 
                this.particles[c].x = this.game.rnd.realInRange(50, a.Config.GAME_WIDTH),
                 this.particles[c].y = this.game.rnd.realInRange(0, a.Config.GAME_HEIGHT)
        }, 
        c.prototype.turnOffTurbo = function() {
            this.game.add.tween(this).to({
                alpha: 0
            }, 400, Phaser.Easing.Linear.None, !0).onComplete.addOnce(this.hide, this)
        }, 
        c.prototype.hide = function() {
            this.exists = !1, this.visible = !1, this.setParticlesExistsProp(!1)
        },
        c.prototype.setParticlesExistsProp = function(a) {
            for (var b = this.particles.length, c = 0; b > c; c++) 
                this.particles[c].exists = a, 
            this.particles[c].visible = a
        }, 
        c.prototype.destroy = function() {
            this.particles = null, 
            this.velocities = null
        }, c
    }(Phaser.SpriteBatch);
    a.TurboScreen = b
}(game || (game = {}));
/////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function() {
        function b(a) {
            this.timer = 0, 
            this.maxMagnitude = 15, 
            this.currentMagnitude = 0, 
            this.active = !1, 
            this.game = a
        }
        return b.prototype.shake = function() {
            this.active = !0, 
            this.timer = b.DURATION, 
            this.currentMagnitude = this.maxMagnitude, 
            this.game.world.setBounds(-this.maxMagnitude, -this.maxMagnitude, a.Config.GAME_WIDTH + this.maxMagnitude, a.Config.GAME_HEIGHT + this.maxMagnitude)
        }, 
        b.prototype.update = function() {
            this.active && (this.game.camera.x = this.game.rnd.realInRange(-this.currentMagnitude, this.currentMagnitude), 
                this.game.camera.y = this.game.rnd.realInRange(-this.currentMagnitude, this.currentMagnitude), 
                this.currentMagnitude *= .98, 
                this.timer -= this.game.time.elapsed, 
                this.timer <= 0 && (this.active = !1, this.game.world.setBounds(0, 0, a.Config.GAME_WIDTH, a.Config.GAME_HEIGHT)))
        }, 
        b.prototype.destroy = function() {
            this.game = null
        }, 
        b.DURATION = 666, b
    }();
    a.ShakeEffect = b
}(game || (game = {}));
/////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(b) {
        function c(c) {
            var d = a.Main.texts.tutorial_1,
                e = {
                    font: "36px GrilledCheeseBTNToasted",
                    fill: "#FFFFFF",
                    align: "center"
                };
            b.call(this, c, 0, 0, d, e), this.anchor.set(.5, .5), this.setShadow(2, 2, "#666666", 1), this.initTween()
        }
        return __extends(c, b), 
        c.prototype.initTween = function() {
            this.scale.set(0, 0), this.game.add.tween(this.scale).to({
                x: 1,
                y: 1
            }, 400, Phaser.Easing.Back.Out, !0, 500).onComplete.addOnce(this.hide, this)
        }, 
        c.prototype.hide = function() {
            var b = 5e3;
            this.game.add.tween(this).to({
                alpha: 0
            }, 100, Phaser.Easing.Linear.None, !0, b + 150), this.game.add.tween(this).to({
                y: a.Config.GAME_HEIGHT
            }, 300, Phaser.Easing.Back.In, !0, b).onComplete.addOnce(this.onHideComplete, this)
        }, 
        c.prototype.onHideComplete = function() {
            this.destroy(!0)
        }, c
    }(Phaser.Text);
    a.TutorialText = b
}(game || (game = {}));
///////////////////////////////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(b) {
        function c() {
            b.apply(this, arguments), this.logicUpdateTimer = 0, this.pauseFlag = !1, this.debugRenderFlag = !1
        }
        return __extends(c, b),
         c.prototype.create = function() {
            this.game.paused = !0, 
            this.roundResult = new a.RoundResult, 
            this.addLayers(), 
            this.addSubmarine(), 
            a.Main.weakDevice === !1 && this.initCoinSparkles(), 
            this.initLevelGenerator(), 
            this.initBonuses(),
             this.initRockets(), 
             this.shaker = new a.ShakeEffect(this.game), 
             this.addTutorial(), 
             this.addGUI(), 
             this.initTurboMode(), 
             this.initResetables(), 
             this.initPauseables(), 
             this.initKeyCallbacks(), 
             this.initCoinSound(), 
             this.game.paused = !1
        }, 
        c.prototype.initCoinSound = function() {
            this.game.device.webAudio && (this.coinSound = this.game.add.sound("coin", .33))
        }, 
        c.prototype.initTurboMode = function() {
            this.turboMode = new a.TurboMode(this.game, this.gui.turboLabel), 
            this.turboMode.addTurboObject(this.submarine), 
            this.turboMode.addTurboObject(this.generator), 
            this.turboMode.addTurboObject(this.rocketGenerator), 
            this.turboMode.addTurboObject(this.turboScreen)
        }, 
        c.prototype.initResetables = function() {
            this.resetables = [this.coinsPool, this.bonusesPool, this.rockets, this.rocks, this.submarine, 
            this.generator, this.bonusGenerator, this.rocketGenerator, this.turboMode, this.roundResult, this.gui], 
            this.coinSparkles && this.resetables.push(this.coinSparkles)
        }, 
        c.prototype.initPauseables = function() {
            var a = this;
            this.pauseables = [this.submarine, this.gui], 
            this.rockets.items.forEach(function(b) {
                a.pauseables.push(b)
            }), this.bonusesPool.items.forEach(function(b) {
                a.pauseables.push(b)
            })
        }, 
        c.prototype.addLayers = function() {
            this.bg = new a.Background(this.game, this.world), 
            this.turboScreen = new a.TurboScreen(this.game, this.world), 
            this.objectsLayer = this.game.add.spriteBatch(this.world, "objects_layer")
        }, 
        c.prototype.initCoinSparkles = function() {
            this.coinSparkles = new utils.ObjectPool;
            for (var b = 10, c = [], d = 0; b > d; d++) {
                var e = new a.CoinSparkles(this.game, this.coinSparkles);
                c.push(e), this.objectsLayer.add(e)
            }
            this.coinSparkles.setItems(c)
        }, 
        c.prototype.initRockets = function() {
            this.rockets = new a.RocketsPool(this.createRockets(3)), 
            this.rocketGenerator = new a.RocketGenerator(this.game, this.objectsLayer), 
            this.rocketGenerator.launchRocketSignal.add(this.addRocket, this)
        }, 
        c.prototype.addRocket = function(b, c) {
            var d = this.rockets.getItem();
            d.x = Math.abs(this.objectsLayer.x) + a.Config.GAME_WIDTH + 100, 
            d.y = b, d.prepareToLaunch(c)
        }, 
        c.prototype.createRockets = function(b) {
            for (var c = [], d = 0; b > d; d++) {
                var e = new a.Rocket(this.game);
                this.objectsLayer.add(e), c.push(e)
            }
            return c
        }, 
        c.prototype.initBonuses = function() {
            this.bonusesPool = new a.BonusesPool(this.game, this.objectsLayer), 
            this.bonusGenerator = new a.BonusGenerator(this.game, this.objectsLayer, this.submarine),
             this.bonusGenerator.addBonusSignal.add(this.addBonus, this)
        }, 
        c.prototype.addBonus = function(a, b) {
            this.bonus = this.bonusesPool.getItem(a), 
            this.bonus && (this.bonus.x = b.x, this.bonus.y = b.y, this.bonus.initialY = this.bonus.y)
        }, 
        c.prototype.initLevelGenerator = function() {
            this.coinsPool = new utils.ObjectPool(this.createCoins(62)), 
            this.rocks = new a.RocksPool(this.game, this.objectsLayer), 
            this.generator = new a.LevelGenerator(this.game, this.objectsLayer), 
            this.generator.setAddItemCallback(this.addItem, this)
        }, 
        c.prototype.createCoins = function(b) {
            "undefined" == typeof b && (b = 60);
            for (var c = [], d = 0; b > d; d++) {
                var e = new a.Coin(this.game, 0, 0, this.submarine);
                this.objectsLayer.add(e), c[d] = e
            }
            return c
        }, 
        c.prototype.addItem = function(a, b, c) {
            switch (a) {
                case "coin":
                    this.addCoin(b, c);
                    break;
                case "rock":
                    this.addRock(b, c)
            }
        }, 
        c.prototype.addCoin = function(a, b) {
            var c = this.coinsPool.getItem();
            c.x = b.x, c.y = b.y
        }, 
        c.prototype.addRock = function(a, b) {
            var c = a.width,
                d = a.height,
                e = a.type + "0000",
                f = this.rocks.getItem(e);
            f.setShapeParams(.5 * c, .5 * d), 
            f.x = b.x, f.y = b.y
        }, 
        c.prototype.addSubmarine = function() {
            this.submarine = new a.Submarine(this.game), 
            this.submarine.x = a.Submarine.INITIAL_X, 
            this.submarine.y = a.Config.HALF_GAME_HEIGHT - 100,
             this.submarine.hurtSignal.add(this.onSubmarineHurt, this), 
             this.world.add(this.submarine)
        }, 
        c.prototype.onSubmarineHurt = function() {
            this.sound.usingWebAudio && this.sound.play("explosion"), 
            0 === this.submarine.currentLives && this.game.time.events.add(2500, this.onRoundEnd, this), 
            this.shaker.shake(), this.gui.livesLabel.updateText(this.submarine.currentLives)
        }, 
        c.prototype.addTutorial = function() {
            var b = new a.TutorialText(this.game);
            b.position.set(a.Config.HALF_GAME_WIDTH, a.Config.GAME_HEIGHT - 100), this.world.add(b)
        }, 
        c.prototype.addGUI = function() {
            this.gui = new a.LevelGUI(this.game), 
            this.gui.resetSignal.add(this.reset, this), this.gui.pauseSignal.add(this.togglePause, this)
        }, 
        c.prototype.togglePause = function(a) {
            "pause" === a ? (this.pauseFlag = !0, this.pauseables.forEach(function(a) {
                a.onPause()
            }), 
            this.game.time.events.pause(), this.game.sound.pauseAll()) : 
            (this.pauseFlag = !1, this.pauseables.forEach(function(a) {
                a.onResume()
            }), this.game.time.events.resume(),  this.game.sound.resumeAll())
        }, 
        c.prototype.initKeyCallbacks = function() {
            var b = this;
            this.game.input.keyboard.addKey(Phaser.Keyboard.R).onDown.add(this.reset, this), 
            a.Main.development && (this.game.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(this.toggleDebugRender, this), 
                this.game.input.keyboard.addKey(Phaser.Keyboard.A).onDown.add(this.showCompleteBoard, this), 
                this.game.input.keyboard.addKey(Phaser.Keyboard.Q).onDown.add(this.shaker.shake, this.shaker), 
                this.game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(function() {
                b.applyBonus(1)
            }, this),
             this.game.input.keyboard.addKey(Phaser.Keyboard.C).onDown.add(function() {
                b.applyBonus(3)
            }, this), 
            this.game.input.keyboard.addKey(Phaser.Keyboard.T).onDown.add(this.turboMode.activate, this.turboMode), 
            
            this.game.input.keyboard.addKey(Phaser.Keyboard.W).onDown.add(this.applyDoubleCoins, this), 
            
            this.game.input.keyboard.addKey(Phaser.Keyboard.ONE).onDown.add(function() {
                b.doUpgrade(a.Upgrade.BOAT_BODY)
            }, this),
            
            this.game.input.keyboard.addKey(Phaser.Keyboard.TWO).onDown.add(function() {
                b.doUpgrade(a.Upgrade.SHIELD)
            }, this),
            
            this.game.input.keyboard.addKey(Phaser.Keyboard.THREE).onDown.add(function() {
                b.doUpgrade(a.Upgrade.COINS_MAGNET)
            }, this), 

             this.game.input.keyboard.addKey(Phaser.Keyboard.FOUR).onDown.add(function() {
                b.doUpgrade(a.Upgrade.TURBO)
            }, this))
        }, 
        c.prototype.applyDoubleCoins = function() {
            this.submarine.applyDoubleCoins()
        }, 
        c.prototype.showCompleteBoard = function() {
            var b = new a.RoundResult;
            b.coinsCollected = this.game.rnd.integerInRange(100, 1e3), 
            b.updatePassesDistance(this.game.rnd.integerInRange(15e3, 3e4)), 
            b.newBest = !0, this.gui.showRoundCompleteBoard(b)
        }, 
        c.prototype.doUpgrade = function(b) {
            var c = a.Main.upgrades.getUpgradeByTitle(b);
            c && (c.step++, 3 === c.step && (c.step = 0)), this.reset()
        }, 
        c.prototype.toggleDebugRender = function() {
            this.debugRenderFlag = !this.debugRenderFlag, 

            this.rocks.items.forEach(this.debugRenderFlag ? function(a) {
                a.startDebugRender()
            } : function(a) {
                a.stopDebugRender()
            })
        }, 
        c.prototype.onRoundEnd = function() {
            this.pauseFlag = !0, this.saveResult(), this.gui.showRoundCompleteBoard(this.roundResult)
        }, 
        c.prototype.pauseGame = function() {
            a.Main.wasPaused = !0, a.Main.wasMuted = this.game.sound.mute, this.game.sound.mute = !0
        }, 
        c.prototype.resumeGame = function() {
            a.Main.wasPaused && (a.Main.wasPaused = !1, this.game.sound.mute = a.Main.wasMuted)
        }, 
        c.prototype.saveResult = function() {
            var b = a.Main.stats.coins + this.roundResult.coinsCollected;
            a.Main.stats.updateCoins(b), 
            this.roundResult.distanceInMeters > a.Main.stats.bestDistance && 
            (this.roundResult.newBest = !0, a.Main.stats.updateBestDistance(this.roundResult.distanceInMeters))
        }, 
        c.prototype.update = function() {
            if (this.pauseFlag === !1) {
                this.logicUpdateTimer -= this.game.time.elapsed, 
                this.logicUpdateTimer < 0 && (this.logicUpdateTimer += 50, this.updateCoins(), 
                    this.updateBonus(), this.updateRocks(), this.updateRockets());
                var a = this.submarine.velocityX * this.time.elapsed;
                this.bg.scroll(a), 
                this.objectsLayer.position.x -= a, 
                this.generator.update(a), 
                this.bonusGenerator.update(a), 
                this.rocketGenerator.update(a), this.shaker.update(), 
                this.roundResult.updatePassesDistance(a), 
                this.gui.distanceLabel.setText(this.roundResult.distanceInMeters.toString() + "m")
            }
        }, 
        c.prototype.updateCoins = function() {
            for (var b = this.submarine.radius + a.Coin.SMALL_COIN_RADIUS, 
                c = b * b, d = a.Submarine.INITIAL_X + a.Submarine.RADIUS + a.Coin.SMALL_COIN_RADIUS, 
                e = this.submarine.coinsMagnet.radius, 
                f = e * e, 
                g = a.Submarine.INITIAL_X + this.submarine.coinsMagnet.radius + a.Coin.SMALL_COIN_RADIUS, 
                h = this.coinsPool.items.length, i = 0; h > i; i++) {
                var j = this.coinsPool.items[i];
                if (j.exists) {
                    if (j.screenX < -a.Coin.SMALL_COIN_RADIUS) {
                        this.coinsPool.returnItem(j);
                        continue
                    }
                    if (j.screenX < d) {
                        var k = utils.MathUtil.distanceSquared(this.submarine.x, this.submarine.y, j.screenX, j.y);
                        if (c > k) {
                            this.onCoinCollected(j);
                            continue
                        }
                    }
                    if (this.submarine.magnetActive && !j.attractedByMagnet && j.screenX < g) {
                        var k = utils.MathUtil.distanceSquared(this.submarine.x, this.submarine.y, j.screenX, j.y);
                        f > k && j.applyMagnet()
                    }
                }
            }
        }, 
        c.prototype.onCoinCollected = function(a) {
            var b = 1;
            this.submarine.doubleCoinsActive && (b *= 2), 
            this.showSparkles(a), 
            this.coinsPool.returnItem(a), 
            this.roundResult.coinsCollected += b, 
            this.gui.coinsLabel.updateText(this.roundResult.coinsCollected), 
            this.coinSound && this.coinSound.play("", 0, .33, !1, !0)
        }, 
        c.prototype.showSparkles = function(b) {
            if (!a.Main.weakDevice) {
                var c = this.coinSparkles.getItem();
                c && (c.x = b.x - 25, c.y = b.y - 50)
            }
        }, 
        c.prototype.updateBonus = function() {
            if (this.bonus && this.submarine.alive) {
                if (this.bonus.screenX < .5 * -this.bonus.width) return this.bonusesPool.returnItem(this.bonus), void(this.bonus = null);
                this.bonus.screenX < .33 * a.Config.GAME_WIDTH && this.checkBonusCollision()
            }
        }, 
        c.prototype.checkBonusCollision = function() {
            var a = this.bonus.radius + this.submarine.radius,
                b = a * a,
                c = utils.MathUtil.distanceSquared(this.submarine.position.x, this.submarine.position.y, this.bonus.screenX, this.bonus.y);
            b > c && (this.applyBonus(this.bonus.bonusType), this.bonusesPool.returnItem(this.bonus), this.bonus = null)
        }, 
        c.prototype.applyBonus = function(a) {
            this.sound.usingWebAudio && this.sound.play("bonus", .66), 0 === a ? (this.submarine.increaseLife(), 
                this.gui.livesLabel.updateText(this.submarine.currentLives)) : 
            1 === a ? this.submarine.applyShield() : 4 === a ? 
            this.turboMode.addTurboCharge() : 3 === a ? this.submarine.applyMagnet() : 2 === a && this.submarine.applyDoubleCoins()
        }, 
        c.prototype.updateRocks = function() {
            this.removeRocks(), this.checkSubmarineRocksCollision()
        },
         c.prototype.removeRocks = function() {
            for (var a = this.rocks.items.length, b = 0; a > b; b++) {
                var c = this.rocks.items[b];
                c.exists && c.screenX < -100 && this.rocks.returnItem(c)
            }
        }, 
        c.prototype.checkSubmarineRocksCollision = function() {
            if (!(this.submarine.invulnerable || this.submarine.shieldActive || this.submarine.turboActive))
                for (var b = this.rocks.items.length, c = 0; b > c; c++) {
                    var d = this.rocks.items[c];
                    if (d.exists && d.screenX < .33 * a.Config.GAME_WIDTH && this.isSubmarineRockCollide(this.submarine, d)) return void this.submarine.hurt()
                }
        }, 
        c.prototype.isSubmarineRockCollide = function(a, b) {
            var c = a.x - b.screenX,
                d = a.y - b.y,
                e = b.ellipseWidth + a.radius,
                f = b.ellipseHeight + a.radius;
            return 1 >= c * c / (e * e) + d * d / (f * f)
        }, 
        c.prototype.updateRockets = function() {
            this.removeRockets(), this.checkRocketsSubmarineCollision()
        }, 
        c.prototype.removeRockets = function() {
            for (var a = this.rockets.items.length, b = 0; a > b; b++) {
                var c = this.rockets.items[b];
                c.launched && c.screenX < -50 && this.rockets.returnItem(c)
            }
        }, 
        c.prototype.checkRocketsSubmarineCollision = function() {
            if (!this.submarine.invulnerable && !this.submarine.shieldActive)
                for (var b = this.rockets.items.length, c = 0; b > c; c++) {
                    var d = this.rockets.items[c];
                    if (d.launched && d.screenX < .33 * a.Config.GAME_WIDTH) {
                        var e = utils.MathUtil.distanceSquared(this.submarine.x, this.submarine.y, d.screenX, d.y);
                        if (e < a.Rocket.COLLIDE_DISTANCE_SQAURED) return this.submarine.hurt(), void this.rockets.returnItem(d)
                    }
                }
        }, c.prototype.reset = function() {
            this.resetables.forEach(function(a) {
                a.doReset()
            }), this.logicUpdateTimer = 0, this.pauseFlag = !1, this.togglePause("resume")
        }, 
        c.prototype.render = function() {
            this.debugRenderFlag === !0 && (this.submarine.debugRender(), this.renderObjects())
        }, 
        c.prototype.renderObjects = function() {
            this.objectsLayer.forEach(function(a) {
                a.alive && a.debugRender && a.debugRender()
            }, this)
        }, 
        c.prototype.destroy = function() {
            this.game.state.onShutDownCallback = null, 
            this.removeKeyCallbacks(), 
            this.bonusGenerator.destroy(), 
            this.bonusGenerator = null, 
            this.generator.destroy(), 
            this.generator = null, 
            this.shaker.destroy(), 
            this.shaker = null
        }, 
        c.prototype.removeKeyCallbacks = function() {
            this.game.input.keyboard.removeKey(Phaser.Keyboard.R),
            this.game.input.keyboard.removeKey(Phaser.Keyboard.P), 
            this.game.input.keyboard.removeKey(Phaser.Keyboard.ESC), 
            this.game.input.keyboard.removeKey(Phaser.Keyboard.D)
        }, 
        c.TOP_LEVEL_BOUND = 70, 
        c.BOTTOM_LEVEL_BOUND = a.Config.GAME_HEIGHT - c.TOP_LEVEL_BOUND, c
    }(Phaser.State);
    a.Level = b
}(game || (game = {}));
/////////////////////////////////////////////////////////////////////
var utils;
! function(a) {
    var b = function() {
        function a() {
            this._enabled = !0, this.init()
        }
        return a.prototype.init = function() {
            try {
                this.localStorage = window.localStorage, 
                this.localStorage.setItem("testKey", "testData"), 
                this.localStorage.removeItem("testKey")
            } catch (a) {
                this._enabled = !1
            }
        }, a.prototype.saveValue = function(a, b) {
            if (this._enabled) {
                var c = JSON.stringify(b);
                this.localStorage.setItem(a, c)
            }
        }, a.prototype.getValue = function(a) {
            return this.localStorage.getItem(a)
        }, a.prototype.remove = function(a) {
            this._enabled && this.localStorage.removeItem(a)
        }, a.prototype.clear = function() {
            this._enabled && this.localStorage.clear()
        }, Object.defineProperty(a.prototype, "enabled", {
            get: function() {
                return this._enabled
            },
            enumerable: !0,
            configurable: !0
        }), a
    }();
    a.LocalStorageWrapper = b
}(utils || (utils = {}));
////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(a) {
        function b(b, c) {
            a.call(this, b, c), this.lives = [1, 2, 3, 4]
        }
        return __extends(b, a), b.prototype.getValue = function() {
            return this.lives[this.step]
        }, b
    }(a.Upgrade);
    a.BoatBodyUpgrade = b
}(game || (game = {}));
///////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(a) {
        function b(b, c) {
            a.call(this, b, c), this.durations = [0, 8e3, 1e4, 12e3]
        }
        return __extends(b, a), b.prototype.getValue = function() {
            return this.durations[this.step]
        }, b
    }(a.Upgrade);
    a.ShieldUpgrade = b
}(game || (game = {}));
/////////////////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(a) {
        function b(b, c) {
            a.call(this, b, c), this.values = [{
                radius: 0,
                duration: 0
            }, {
                radius: 100,
                duration: 1e4
            }, {
                radius: 110,
                duration: 12e3
            }, {
                radius: 120,
                duration: 15e3
            }]
        }
        return __extends(b, a), b.prototype.getValue = function() {
            return this.values[this.step]
        }, b
    }(a.Upgrade);
    a.CoinsMagnetUpgrade = b
}(game || (game = {}));
//////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(a) {
        function b(b, c) {
            a.call(this, b, c), 
            this.durations = [0, 15e3, 18e3, 21e3]
        }
        return __extends(b, a), b.prototype.getValue = function() {
            return this.durations[this.step]
        }, b
    }(a.Upgrade);
    a.TurboUpgrade = b
}(game || (game = {}));
//////////////////////////////////////////////////
var game;
! function(a) {
    var b = function() {
        function b() {
            this.initUpgrades(), this.load()
        }
        return b.prototype.initUpgrades = function() {
            this.upgrades = [new a.BoatBodyUpgrade(a.Upgrade.BOAT_BODY, [300, 600, 1e3]), 
            new a.ShieldUpgrade(a.Upgrade.SHIELD, [200, 400, 800]), 
            new a.CoinsMagnetUpgrade(a.Upgrade.COINS_MAGNET, [200, 400, 800]), 
            new a.TurboUpgrade(a.Upgrade.TURBO, [100, 300, 600])]
        }, 
        b.prototype.load = function() {
            this.upgrades.forEach(function(b) {
                var c = parseInt(a.Main.storage.getValue(b.title));
                b.step = isNaN(c) ? 0 : c
            })
        }, 
        b.prototype.save = function() {
            this.upgrades.forEach(function(b) {
                a.Main.storage.saveValue(b.title, b.step)
            })
        }, 
        b.prototype.getUpgradeByTitle = function(a) {
            for (var b = this.upgrades.length, c = 0; b > c; c++) {
                var d = this.upgrades[c];
                if (d.upgradeType === a) return d
            }
            return null
        }, 
        b.prototype.getUpgradeStep = function(a) {
            return this.getUpgradeByTitle(a).step
        }, 
        b.prototype.canSomethingBeUpgraded = function() {
            var b = a.Main.stats.coins;
            return this.upgrades.some(function(a) {
                return a.getCurrentPrice() <= b
            })
        }, b
    }();
    a.UpgradesController = b
}(game || (game = {}));
////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function() {
        function b() {
            this._coins = 0, 
            this._bestDistance = 0, 
            this.load()
        }
        return b.prototype.load = function() {
            this._coins = this.getNumericValue("coins"), 
            this._bestDistance = this.getNumericValue("distance")
        }, 
        b.prototype.updateCoins = function(b) {
            b >= 0 && (this._coins = b, a.Main.storage.saveValue("coins", this._coins))
        }, 
        b.prototype.updateBestDistance = function(b) {
            this._bestDistance = b, a.Main.storage.saveValue("distance", this._bestDistance)
        }, 
        b.prototype.getNumericValue = function(b) {
            var c = parseInt(a.Main.storage.getValue(b));
            return isNaN(c) ? 0 : c
        }, 
        b.prototype.clearAll = function() {
            this.updateCoins(0), 
            this.updateBestDistance(0), 
            a.Main.upgrades.upgrades.forEach(function(a) {
                a.step = 0
            }), a.Main.upgrades.save()
        }, 
        Object.defineProperty(b.prototype, "coins", {
            get: function() {
                return this._coins
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(b.prototype, "bestDistance", {
            get: function() {
                return this._bestDistance
            },
            enumerable: !0,
            configurable: !0
        }), b
    }();
    a.GameStats = b
}(game || (game = {})), 
window.addEventListener("load", onLoad, !1);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(b) {
        function c() {
            var d = {
                width: a.Config.GAME_WIDTH,
                height: a.Config.GAME_HEIGHT,
                renderer: Phaser.CANVAS,
                parent: "gameContainer",
                transparent: !1,
                antialias: !0,
                enableDebug: c.development
            };
            b.call(this, d), 
            c.storage = new utils.LocalStorageWrapper, 

            c.stats = new a.GameStats, 
            this.state.add("Boot", a.Boot, !0), 
            this.state.add("Preloader", a.Preloader, !1), 
            this.state.add("SplashScreen", a.SplashScreen, !1), 
            this.state.add("MainMenu", a.MainMenu, !1), 
            this.state.add("Level", a.Level, !1)
        }

        return __extends(c, b), 
        c.prototype.changeState = function(a, b) {
            this.stateTransitionPlugin || (this.stateTransitionPlugin = this.plugins.plugins[0]), 
            this.stateTransitionPlugin.changeState(a, b)
        }, 
        c.development = !1, 
        c.wasPaused = !1, 
        c.wasMuted = !1, 
        c.weakDevice = !1, 
        c.language = "en", c
    }(Phaser.Game);

    a.Main = b

}(game || (game = {}));