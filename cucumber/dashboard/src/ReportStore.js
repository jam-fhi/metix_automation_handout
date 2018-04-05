import { EventEmitter } from "events";
import Dispatcher from "./dispatcher";
import { replyReportsIndex, loadReportFile, getReportFile, replyReportFile } from './ReportActions';

class ReportStore extends EventEmitter {

    constructor() {
        super();
        this.reportIndex = [];
        this.loaded = false;
        this.error = "";
    }

    makeRequest (method, url, done) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            done(null, xhr.response, false);
        };
        xhr.onerror = function () {
            done(xhr.response, null, true);
        };
        return xhr.send();
    }

    getTestReportIndex() {
        this.makeRequest('GET', '/logs/reportIndex.json', function(response, data, error) {
            if(error === false) {
                replyReportsIndex(true, data);
            } else {
                replyReportsIndex(false, response);
            }
        });
    }

    getTestReportFile(filename) {
        this.makeRequest('GET', '/logs/' + filename, function(response, data, error) {
            if(error === false) {
                replyReportFile(true, data, filename);
            } else {
                replyReportFile(false, response, filename);
            }
        });
    }

    handleActions(action) {
        switch(action.type) {
            default: {
                break;
                }
            case "GetReportsIndex": {
                this.getTestReportIndex();
                break;
                }
            case "ReplyReportsIndex":
                {
                if(action.success === true) {
                    try {
                        const reportsIndex = JSON.parse(action.data);
                        this.reportIndex = reportsIndex.reportIndex;
                        this.emit('REPORT_INDEX', {success: true, data: this.reportIndex});
                        //this.loadNextReportFile();
                    } catch (e) {
                        this.emit('REPORT_INDEX', {success: false, data: 'JSON Parse error: ' + action.data});
                    }
                } else {
                    this.emit('REPORT_INDEX', {success: false, data: 'Connection Error code ' + action.data});
                }
                break;
                }
            case "GetReportFile": {
                this.getTestReportFile(action.filename);
                break;
                }
            case "ReplyReportFile":
                {
                if(action.success === true) {
                    try {
                        const reportFile = JSON.parse(action.data);
                        this.emit('REPORT_FILE' + action.filename, {success: true, data: reportFile, filename: action.filename});
                    } catch (e) {
                        this.emit('REPORT_FILE' + action.filename, {success: false, data: 'JSON Parse error: ' + action.data, filename: action.filename});
                    }
                } else {
                    this.emit('REPORT_FILE' + action.filename, {success: false, data: 'Connection Error code ' + action.data, filename: action.filename});
                }
                break;
                }
            }           
        }
    }

const ReportStorer = new ReportStore();
Dispatcher.register(ReportStorer.handleActions.bind(ReportStorer));
window.dispatcher = Dispatcher;

export default ReportStorer;
