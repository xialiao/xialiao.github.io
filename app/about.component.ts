import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit, OnDestroy {
    topics = ['data', 'structure', 'scene', 'annotation', 'parameter', 'trigger'];
    menuSelection: string;
    
    routeSub: Subscription;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router) {
    }
    ngOnInit() {
        this.routeSub = this._route.params.subscribe((params : Params) => {
            // this will change menuSelection, which updates display styles
            let topic = params['topic'];
            if (topic && this.topics.indexOf(topic) !== -1) {
                this.menuSelection = topic;
            } else {
                this.selectTopic(this.topics[0]);
            }
        });
    }
    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
    selectTopic(topic: string) {
        this._router.navigate(["/about/" + topic])
    }
}