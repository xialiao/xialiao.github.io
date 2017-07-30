"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var occupations_component_1 = require("./occupations.component");
var fastdecline_component_1 = require("./fastdecline.component");
var mostdecline_component_1 = require("./mostdecline.component");
var fastgrow_component_1 = require("./fastgrow.component");
var mostgrow_component_1 = require("./mostgrow.component");
var home_component_1 = require("./home.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            app_routing_module_1.AppRoutingModule,
            ngx_bootstrap_1.CarouselModule.forRoot()
        ],
        declarations: [
            app_component_1.AppComponent,
            home_component_1.HomeComponent,
            occupations_component_1.OccupationsComponent,
            fastgrow_component_1.FastGrowComponent,
            fastdecline_component_1.FastDeclineComponent,
            mostdecline_component_1.MostDeclineComponent,
            mostgrow_component_1.MostGrowComponent
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map