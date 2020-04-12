import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-jstree',
  templateUrl: './jstree.component.html',
  styleUrls: ['./jstree.component.css']
})
export class JstreeComponent implements OnInit {
  title = 'angular-treeview';

  ngOnInit(): void {

    var myway = function(mystring: string) {
        console.log('hello myway');
    }

    //render 
    var renderMain = function(categoryName: string) {

        //alert('Category Name:' + categoryName);

        $("#main-column").html(''); //erase all

        if (categoryName == 'All Documents' || categoryName == 'Administrative Documents' || categoryName == 'CDC' || categoryName == 'IAA Modification') 
        {

            $("#main-column").append('\
                <div class="marklogic-search-item">\
                    <div class="row">\
                        <div class="col-md-10">\
                            <h5>\
                                <a href="./ctp-app-RDoc-detail-mockup.html" data-toggle="modal" target="_blank">Teen Vaping CDC Research IAA Mod</a>\
                            </h5>\
                        </div>\
                        <div><a class="col-md-2 fa fa-file pdf-icon" data-toggle="modal" data-target="#pdf-viewer" href="#"></a></div>\
                    </div>\
                    <div class="marklogic-search-item-body">\
                        <div class="search-snippet">\
                            <div class="verboseTitle" style="margin-top:3px">Teen Vaping CDC Research IAA Mod. <b>All Documents:</b> Administrative Documents,CDC <b>Document Type:</b> IAA Modification </div>\
                            <button id="expand1" type="button" class="btn btn-primary fa fa-plus expand-collapse-button" data-toggle="collapse" data-target="#expand1-sec"></button>\
                            <div id="expand1-sec" class="collapse">\
                                <div>...explanding on the abstract and display the rest of the text for the abstract. This can go on and on and I don\'t want to type anymore.</div>\
                                <div style="margin-top:3px"><span style="font-weight: bold">Author: </span>US Department of Agriculture; Schmeltz, Irwin</div>\
                                <div style="margin-top:3px"><span style="font-weight: bold">Document Date: </span>1972</div>\
                                <div style="margin-top:3px"><span style="font-weight: bold">Type: </span>bibliography; chart, diagram; flow chart; photograph; proceedings; conference; publication; table</div>\
                                <div style="margin-top:3px"><span style="font-weight: bold">ID: </span>tfby0030 (TID: xcd21b00)</div>\
                                <div style="margin-top:3px"><span style="font-weight: bold">Collection: </span>US Tobacco Records on Smokeless Tobacco</div>\
                                <div style="margin-top:3px">\
                                    <span style="font-weight: bold">Substance Mentions: </span>\
                                    <a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">(1-methylethlyl)-{DL-menthol}</a>, <a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">(1-methylethlyl)-, (1a,2B,5a)-{menthol}</a>, <a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 3 mention</a>, <a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 4 mention</a>,<a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 5 mention</a>,<a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 6 mention</a>,<a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 7 mention</a>,<a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 8 mention</a>,<a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 9 mention</a>,<a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 10 mention</a>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            ');

        } //if (categoryName == 'All Documents' || categoryName == 'CDC' || categoryName == 'IAA Modification' )

        if (categoryName == 'All Documents' || categoryName == 'Administrative Documents' || categoryName == 'CDC' || categoryName == 'Interagency Agreement (IAA)' ) 
        {

            $("#main-column").append('\
                <div class="marklogic-search-item">\
                    <div class="row">\
                        <div class="col-md-10">\
                            <h5>\
                                <a href="./ctp-app-RDoc-detail-mockup.html" data-toggle="modal" target="_blank">Teen Vaping CDC Research Interagency Agreement</a>\
                            </h5>\
                        </div>\
                        <div><a class="col-md-2 fa fa-file pdf-icon" data-toggle="modal" data-target="#pdf-viewer" href="#"></a></div>\
                    </div>\
                    <div class="marklogic-search-item-body">\
                        <div class="search-snippet">\
                            <div class="verboseTitle" style="margin-top:3px">Teen Vaping CDC Research Interagency Agreement. <b>All Documents:</b> Administrative Documents,CDC <b>Document Type:</b> Interagency Agreement </div>\
                            <button id="expand1" type="button" class="btn btn-primary fa fa-plus expand-collapse-button" data-toggle="collapse" data-target="#expand1-sec"></button>\
                            <div id="expand1-sec" class="collapse">\
                                <div>...explanding on the abstract and display the rest of the text for the abstract. This can go on and on and I don\'t want to type anymore.</div>\
                                <div style="margin-top:3px"><span style="font-weight: bold">Author: </span>US Department of Agriculture; Schmeltz, Irwin</div>\
                                <div style="margin-top:3px"><span style="font-weight: bold">Document Date: </span>1972</div>\
                                <div style="margin-top:3px"><span style="font-weight: bold">Type: </span>bibliography; chart, diagram; flow chart; photograph; proceedings; conference; publication; table</div>\
                                <div style="margin-top:3px"><span style="font-weight: bold">ID: </span>tfby0030 (TID: xcd21b00)</div>\
                                <div style="margin-top:3px"><span style="font-weight: bold">Collection: </span>US Tobacco Records on Smokeless Tobacco</div>\
                                <div style="margin-top:3px">\
                                    <span style="font-weight: bold">Substance Mentions: </span>\
                                    <a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">(1-methylethlyl)-{DL-menthol}</a>, <a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">(1-methylethlyl)-, (1a,2B,5a)-{menthol}</a>, <a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 3 mention</a>, <a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 4 mention</a>,<a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 5 mention</a>,<a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 6 mention</a>,<a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 7 mention</a>,<a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 8 mention</a>,<a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 9 mention</a>,<a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 10 mention</a>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            ');

        } //if (categoryName == 'All Documents' || categoryName == 'CDC' || categoryName == 'Interagency Agreement (IAA)' )

        if (categoryName == 'All Documents' || categoryName == 'Administrative Documents' || categoryName == 'Contracts/Other' || categoryName == 'Contract' ) 
        {

            $("#main-column").append('\
                <div class="marklogic-search-item">\
                    <div class="row">\
                        <div class="col-md-10">\
                            <h5>\
                                <a href="./ctp-app-RDoc-detail-mockup.html" data-toggle="modal" target="_blank">Teen Vaping Research Contract</a>\
                            </h5>\
                        </div>\
                        <div><a class="col-md-2 fa fa-file pdf-icon" data-toggle="modal" data-target="#pdf-viewer" href="#"></a></div>\
                    </div>\
                    <div class="marklogic-search-item-body">\
                        <div class="search-snippet">\
                            <div class="verboseTitle" style="margin-top:3px">Teen Vaping Research Contract. <b>All Documents:</b> Administrative Documents,Contracts/Other <b>Document Type:</b> Contract </div>\
                            <button id="expand1" type="button" class="btn btn-primary fa fa-plus expand-collapse-button" data-toggle="collapse" data-target="#expand1-sec"></button>\
                            <div id="expand1-sec" class="collapse">\
                                <div>...explanding on the abstract and display the rest of the text for the abstract. This can go on and on and I don\'t want to type anymore.</div>\
                                <div style="margin-top:3px"><span style="font-weight: bold">Author: </span>US Department of Agriculture; Schmeltz, Irwin</div>\
                                <div style="margin-top:3px"><span style="font-weight: bold">Document Date: </span>1972</div>\
                                <div style="margin-top:3px"><span style="font-weight: bold">Type: </span>bibliography; chart, diagram; flow chart; photograph; proceedings; conference; publication; table</div>\
                                <div style="margin-top:3px"><span style="font-weight: bold">ID: </span>tfby0030 (TID: xcd21b00)</div>\
                                <div style="margin-top:3px"><span style="font-weight: bold">Collection: </span>US Tobacco Records on Smokeless Tobacco</div>\
                                <div style="margin-top:3px">\
                                    <span style="font-weight: bold">Substance Mentions: </span>\
                                    <a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">(1-methylethlyl)-{DL-menthol}</a>, <a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">(1-methylethlyl)-, (1a,2B,5a)-{menthol}</a>, <a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 3 mention</a>, <a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 4 mention</a>,<a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 5 mention</a>,<a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 6 mention</a>,<a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 7 mention</a>,<a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 8 mention</a>,<a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 9 mention</a>,<a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 10 mention</a>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            ');

        } //if (categoryName == 'All Documents' || categoryName == 'CDC' || categoryName == 'Coding Form' )

        if (categoryName == 'All Documents' || categoryName == 'Administrative Documents' || categoryName == 'NIH' || categoryName == 'Pre-Award' || categoryName == 'CTP Reviews' ) 
        {

            $("#main-column").append('\
                <div class="marklogic-search-item">\
                    <div class="row">\
                        <div class="col-md-10">\
                            <h5>\
                                <a href="./ctp-app-RDoc-detail-mockup.html" data-toggle="modal" target="_blank">Teen Vaping FDA Research CTP Reviews</a>\
                            </h5>\
                        </div>\
                        <div><a class="col-md-2 fa fa-file pdf-icon" data-toggle="modal" data-target="#pdf-viewer" href="#"></a></div>\
                    </div>\
                    <div class="marklogic-search-item-body">\
                        <div class="search-snippet">\
                            <div class="verboseTitle" style="margin-top:3px">Teen Vaping FDA Research CTP Reviews. <b>All Documents:</b> Administrative Documents,NIH,Pre-Award <b>Document Type:</b> CTP Reviews </div>\
                            <button id="expand1" type="button" class="btn btn-primary fa fa-plus expand-collapse-button" data-toggle="collapse" data-target="#expand1-sec"></button>\
                            <div id="expand1-sec" class="collapse">\
                                <div>...explanding on the abstract and display the rest of the text for the abstract. This can go on and on and I don\'t want to type anymore.</div>\
                                <div style="margin-top:3px"><span style="font-weight: bold">Author: </span>US Department of Agriculture; Schmeltz, Irwin</div>\
                                <div style="margin-top:3px"><span style="font-weight: bold">Document Date: </span>1972</div>\
                                <div style="margin-top:3px"><span style="font-weight: bold">Type: </span>bibliography; chart, diagram; flow chart; photograph; proceedings; conference; publication; table</div>\
                                <div style="margin-top:3px"><span style="font-weight: bold">ID: </span>tfby0030 (TID: xcd21b00)</div>\
                                <div style="margin-top:3px"><span style="font-weight: bold">Collection: </span>US Tobacco Records on Smokeless Tobacco</div>\
                                <div style="margin-top:3px">\
                                    <span style="font-weight: bold">Substance Mentions: </span>\
                                    <a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">(1-methylethlyl)-{DL-menthol}</a>, <a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">(1-methylethlyl)-, (1a,2B,5a)-{menthol}</a>, <a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 3 mention</a>, <a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 4 mention</a>,<a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 5 mention</a>,<a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 6 mention</a>,<a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 7 mention</a>,<a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 8 mention</a>,<a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 9 mention</a>,<a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 10 mention</a>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            ');

        } //if (categoryName == 'All Documents' || categoryName == 'NIH' || categoryName == 'Pre-Award' || categoryName == 'CTP Reviews' )

        if (categoryName == 'All Documents' || categoryName == 'Administrative Documents' || categoryName == 'FDA' || categoryName == 'Performance Agreement (PA)' ) 
        {

            $("#main-column").append('\
                <div class="marklogic-search-item">\
                    <div class="row">\
                        <div class="col-md-10">\
                            <h5>\
                                <a href="./ctp-app-RDoc-detail-mockup.html" data-toggle="modal" target="_blank">Teen Vaping FDA Research Performance Agreement #1</a>\
                            </h5>\
                        </div>\
                        <div><a class="col-md-2 fa fa-file pdf-icon" data-toggle="modal" data-target="#pdf-viewer" href="#"></a></div>\
                    </div>\
                    <div class="marklogic-search-item-body">\
                        <div class="search-snippet">\
                            <div class="verboseTitle" style="margin-top:3px">Teen Vaping FDA Research Performance Agreement #1. <b>All Documents:</b> Administrative Documents,FDA <b>Document Type:</b> Performance Agreement </div>\
                            <button id="expand1" type="button" class="btn btn-primary fa fa-plus expand-collapse-button" data-toggle="collapse" data-target="#expand1-sec"></button>\
                            <div id="expand1-sec" class="collapse">\
                                <div>...explanding on the abstract and display the rest of the text for the abstract. This can go on and on and I don\'t want to type anymore.</div>\
                                <div style="margin-top:3px"><span style="font-weight: bold">Author: </span>US Department of Agriculture; Schmeltz, Irwin</div>\
                                <div style="margin-top:3px"><span style="font-weight: bold">Document Date: </span>1972</div>\
                                <div style="margin-top:3px"><span style="font-weight: bold">Type: </span>bibliography; chart, diagram; flow chart; photograph; proceedings; conference; publication; table</div>\
                                <div style="margin-top:3px"><span style="font-weight: bold">ID: </span>tfby0030 (TID: xcd21b00)</div>\
                                <div style="margin-top:3px"><span style="font-weight: bold">Collection: </span>US Tobacco Records on Smokeless Tobacco</div>\
                                <div style="margin-top:3px">\
                                    <span style="font-weight: bold">Substance Mentions: </span>\
                                    <a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">(1-methylethlyl)-{DL-menthol}</a>, <a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">(1-methylethlyl)-, (1a,2B,5a)-{menthol}</a>, <a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 3 mention</a>, <a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 4 mention</a>,<a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 5 mention</a>,<a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 6 mention</a>,<a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 7 mention</a>,<a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 8 mention</a>,<a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 9 mention</a>,<a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 10 mention</a>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            ');

        } //if (categoryName == 'All Documents' || categoryName == 'FDA' || categoryName == 'Performance Agreement (PA)' )

        if (categoryName == 'All Documents' || categoryName == 'Administrative Documents' || categoryName == 'FDA' || categoryName == 'Performance Agreement (PA)' ) 
        {

            $("#main-column").append('\
                <div class="marklogic-search-item">\
                    <div class="row">\
                        <div class="col-md-10">\
                            <h5>\
                                <a href="./ctp-app-RDoc-detail-mockup.html" data-toggle="modal" target="_blank">Teen Vaping FDA Research Performance Agreement #2</a>\
                            </h5>\
                        </div>\
                        <div><a class="col-md-2 fa fa-file pdf-icon" data-toggle="modal" data-target="#pdf-viewer" href="#"></a></div>\
                    </div>\
                    <div class="marklogic-search-item-body">\
                        <div class="search-snippet">\
                            <div class="verboseTitle" style="margin-top:3px">Teen Vaping FDA Research Performance Agreement #2. <b>All Documents:</b> Administrative Documents,FDA <b>Document Type:</b> Performance Agreement </div>\
                            <button id="expand1" type="button" class="btn btn-primary fa fa-plus expand-collapse-button" data-toggle="collapse" data-target="#expand1-sec"></button>\
                            <div id="expand1-sec" class="collapse">\
                                <div>...explanding on the abstract and display the rest of the text for the abstract. This can go on and on and I don\'t want to type anymore.</div>\
                                <div style="margin-top:3px"><span style="font-weight: bold">Author: </span>US Department of Agriculture; Schmeltz, Irwin</div>\
                                <div style="margin-top:3px"><span style="font-weight: bold">Document Date: </span>1972</div>\
                                <div style="margin-top:3px"><span style="font-weight: bold">Type: </span>bibliography; chart, diagram; flow chart; photograph; proceedings; conference; publication; table</div>\
                                <div style="margin-top:3px"><span style="font-weight: bold">ID: </span>tfby0030 (TID: xcd21b00)</div>\
                                <div style="margin-top:3px"><span style="font-weight: bold">Collection: </span>US Tobacco Records on Smokeless Tobacco</div>\
                                <div style="margin-top:3px">\
                                    <span style="font-weight: bold">Substance Mentions: </span>\
                                    <a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">(1-methylethlyl)-{DL-menthol}</a>, <a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">(1-methylethlyl)-, (1a,2B,5a)-{menthol}</a>, <a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 3 mention</a>, <a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 4 mention</a>,<a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 5 mention</a>,<a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 6 mention</a>,<a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 7 mention</a>,<a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 8 mention</a>,<a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 9 mention</a>,<a href="./ctp-app-sub-detail-mockup.html" data-toggle="modal" target="_blank">substance 10 mention</a>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            ');

        } //if (categoryName == 'All Documents' || categoryName == 'FDA' || categoryName == 'Performance Agreement' )

    } //function renderMain(categoryName) {


        // render category tree view
        $('#frmt')
                .on("changed.jstree", renderMain, function (e, data) {
                    if(data.selected.length) {
                        //alert('The selected node is: ' + data.instance.get_node(data.selected[0]).text);
                        renderMain(data.instance.get_node(data.selected[0]).text);
                    }
                })
        .jstree(
            {
            "core": {
                "data": [
                {
                    "text": "All Documents",
                    "state": {
                    "selected": true,
                    "opened": true
                    },
                    "children": [
                    {
                        "text": "Administrative Documents",
                        "state": {
                        "selected": false
                        },
                        "icon": "jstree-folder",
                        "children": [
                        {
                            "text": "CDC",
                            "state": {
                            "selected": false
                            },
                            "icon": "jstree-folder",
                            "children": [
                            {
                                "text": "Coding Form",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-file"
                            },
                            {
                                "text": "7600 A/B",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-file"
                            },
                            {
                                "text": "MOU",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-file"
                            },
                            {
                                "text": "Interagency Agreement (IAA)",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-file"
                            },
                            {
                                "text": "IAA Modification",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-file"
                            },
                            {
                                "text": "Budget Information",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-file"
                            }
                            ]
                        },
                        {
                            "text": "Contracts/Other",
                            "state": {
                            "selected": false
                            },
                            "icon": "jstree-folder",
                            "children": [
                            {
                                "text": "Performance Review (PA)",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-file"
                            },
                            {
                                "text": "Budget Information",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-file"
                            },
                            {
                                "text": "Contract",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-file"
                            },
                            {
                                "text": "Coding Form",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-file"
                            },
                            {
                                "text": "Evaluations",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-file"
                            },
                            {
                                "text": "Independent Government Cost Estimate (IGCE)",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-file"
                            },
                            {
                                "text": "Invoice",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-file"
                            },
                            {
                                "text": "Justification Memo",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-file"
                            },
                            {
                                "text": "Modification",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-file"
                            },
                            {
                                "text": "Milestone Deliverables",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-file"
                            },
                            {
                                "text": "Proposals (Technical or Business)",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-file"
                            },
                            {
                                "text": "Request for Proposal",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-file"
                            },
                            {
                                "text": "Statement of Work",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-file"
                            },
                            {
                                "text": "Task Order/Option",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-file"
                            }
                            ]
                        },
                        {
                            "text": "FDA",
                            "state": {
                            "selected": false
                            },
                            "icon": "jstree-folder",
                            "children": [
                            {
                                "text": "Coding Form",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-file"
                            },
                            {
                                "text": "Prioritzation Plan",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-file"
                            },
                            {
                                "text": "Performance Agreement Amendments",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-file"
                            },
                            {
                                "text": "Budget Information",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-file"
                            },
                            {
                                "text": "Performance Agreement (PA)",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-file"
                            }
                            ]
                        },
                        {
                            "text": "NIH",
                            "state": {
                            "selected": false
                            },
                            "icon": "jstree-folder",
                            "children": [
                            {
                                "text": "Pre-Award",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-folder",
                                "children": [
                                {
                                    "text": "Peer Review Summary Statement",
                                    "state": {
                                    "selected": false
                                    },
                                    "icon": "jstree-file"
                                },
                                {
                                    "text": "Grant Applications",
                                    "state": {
                                    "selected": false
                                    },
                                    "icon": "jstree-file"
                                },
                                {
                                    "text": "PI Response to Summary Statement",
                                    "state": {
                                    "selected": false
                                    },
                                    "icon": "jstree-file"
                                },
                                {
                                    "text": "Funding Opportunity Announcement (FOA)",
                                    "state": {
                                    "selected": false
                                    },
                                    "icon": "jstree-file"
                                },
                                {
                                    "text": "CTP Reviews",
                                    "state": {
                                    "selected": false
                                    },
                                    "icon": "jstree-file"
                                },
                                {
                                    "text": "MOU",
                                    "state": {
                                    "selected": false
                                    },
                                    "icon": "jstree-file"
                                },
                                {
                                    "text": "Interagency Agreement",
                                    "state": {
                                    "selected": false
                                    },
                                    "icon": "jstree-file"
                                },
                                {
                                    "text": "IDDA",
                                    "state": {
                                    "selected": false
                                    },
                                    "icon": "jstree-file"
                                }
                                ]
                            },
                            {
                                "text": "Post-Award",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-folder",
                                "children": [
                                {
                                    "text": "Coding Form",
                                    "state": {
                                    "selected": false
                                    },
                                    "icon": "jstree-file"
                                },
                                {
                                    "text": "Prioritization Plan",
                                    "state": {
                                    "selected": false
                                    },
                                    "icon": "jstree-file"
                                },
                                {
                                    "text": "Pay Memo",
                                    "state": {
                                    "selected": false
                                    },
                                    "icon": "jstree-file"
                                },
                                {
                                    "text": "Notice of Award",
                                    "state": {
                                    "selected": false
                                    },
                                    "icon": "jstree-file"
                                }
                                ]
                            }
                            ]
                        }
                        ]
                    },
                    {
                        "text": "Dissemination/Reports",
                        "state": {
                        "selected": false
                        },
                        "icon": "jstree-folder",
                        "children": [
                        {
                            "text": "Public Distribution",
                            "state": {
                            "selected": false
                            },
                            "icon": "jstree-folder"
                        },
                        {
                            "text": "Reports",
                            "state": {
                            "selected": false
                            },
                            "icon": "jstree-folder"
                        },
                        {
                            "text": "Results",
                            "state": {
                            "selected": false
                            },
                            "icon": "jstree-folder"
                        }
                        ]
                    },
                    {
                        "text": "Required Approval",
                        "state": {
                        "selected": false
                        },
                        "icon": "jstree-folder",
                        "children": [
                        {
                            "text": "CTP Approvals",
                            "state": {
                            "selected": false
                            },
                            "icon": "jstree-folder"
                        },
                        {
                            "text": "IACUC",
                            "state": {
                            "selected": false
                            },
                            "icon": "jstree-folder",
                            "children": [
                            {
                                "text": "Continuing Renewal",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-folder",
                                "children": [
                                {
                                    "text": "Study Instruments",
                                    "state": {
                                    "selected": false
                                    },
                                    "icon": "jstree-folder"
                                }
                                ]
                            },
                            {
                                "text": "Termination Package",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-folder"
                            },
                            {
                                "text": "Draft Protocol",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-folder",
                                "children": [
                                {
                                    "text": "Study Instruments",
                                    "state": {
                                    "selected": false
                                    },
                                    "icon": "jstree-folder"
                                }
                                ]
                            },
                            {
                                "text": "Initial IACUC Approved Protocol",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-folder",
                                "children": [
                                {
                                    "text": "Study Instruments",
                                    "state": {
                                    "selected": false
                                    },
                                    "icon": "jstree-folder"
                                }
                                ]
                            },
                            {
                                "text": "IACUC Amendment Protocol",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-folder",
                                "children": [
                                {
                                    "text": "Study Instruments",
                                    "state": {
                                    "selected": false
                                    },
                                    "icon": "jstree-folder"
                                }
                                ]
                            }
                            ]
                        },
                        {
                            "text": "IRB",
                            "state": {
                            "selected": false
                            },
                            "icon": "jstree-folder",
                            "children": [
                            {
                                "text": "Continuing Renewal",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-folder"
                            },
                            {
                                "text": "Draft Protocol",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-folder",
                                "children": [
                                {
                                    "text": "Study Instruments",
                                    "state": {
                                    "selected": false
                                    },
                                    "icon": "jstree-folder"
                                }
                                ]
                            },
                            {
                                "text": "Initial IRB Approved Protocol Materials",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-folder",
                                "children": [
                                {
                                    "text": "Study Instruments",
                                    "state": {
                                    "selected": false
                                    },
                                    "icon": "jstree-folder"
                                }
                                ]
                            },
                            {
                                "text": "IRB Amendment Protocol",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-folder"
                            },
                            {
                                "text": "Termination Package",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-folder"
                            }
                            ]
                        },
                        {
                            "text": "OMB",
                            "state": {
                            "selected": false
                            },
                            "icon": "jstree-folder",
                            "children": [
                            {
                                "text": "Initial Package",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-folder"
                            },
                            {
                                "text": "OMB Generated (Initial Package)",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-folder"
                            },
                            {
                                "text": "Renewal",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-folder",
                                "children": [
                                {
                                    "text": "OMB Generated (Renewal)",
                                    "state": {
                                    "selected": false
                                    },
                                    "icon": "jstree-folder"
                                }
                                ]
                            },
                            {
                                "text": "Amendment",
                                "state": {
                                "selected": false
                                },
                                "icon": "jstree-folder",
                                "children": [
                                {
                                    "text": "OMB Generated (Amendment)",
                                    "state": {
                                    "selected": false
                                    },
                                    "icon": "jstree-folder"
                                }
                                ]
                            }
                            ]
                        },
                        {
                            "text": "Personnel Records",
                            "state": {
                            "selected": false
                            },
                            "icon": "jstree-folder"
                        },
                        {
                            "text": "Study Monitoring",
                            "state": {
                            "selected": false
                            },
                            "icon": "jstree-folder"
                        }
                        ]
                    }
                    ]
                }
                ]
            }
            }
        ); //jtree
  } //ngInit


}






