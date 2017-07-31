"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var AboutComponent = (function () {
    function AboutComponent(_route, _router) {
        this._route = _route;
        this._router = _router;
        this.topics = ['data', 'structure', 'scene', 'annotation', 'parameter', 'trigger'];
    }
    AboutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routeSub = this._route.params.subscribe(function (params) {
            // this will change menuSelection, which updates display styles
            var topic = params['topic'];
            if (topic && _this.topics.indexOf(topic) !== -1) {
                _this.menuSelection = topic;
            }
            else {
                _this.selectTopic(_this.topics[0]);
            }
        });
    };
    AboutComponent.prototype.ngOnDestroy = function () {
        this.routeSub.unsubscribe();
    };
    AboutComponent.prototype.selectTopic = function (topic) {
        this._router.navigate(["/about/" + topic]);
    };
    return AboutComponent;
}());
AboutComponent = __decorate([
    core_1.Component({
        selector: 'about',
        templateUrl: './about.component.html',
        styleUrls: ['./about.component.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router])
], AboutComponent);
exports.AboutComponent = AboutComponent;
//# sourceMappingURL=about.component.js.map