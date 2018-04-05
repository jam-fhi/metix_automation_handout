import Dispatcher from "./dispatcher";

export function getReportsIndex() {
	Dispatcher.dispatch({
    	type: "GetReportsIndex"
  	})
}

export function replyReportsIndex(success, data) {
	Dispatcher.dispatch({
    	type: "ReplyReportsIndex",
    	success: success,
    	data: data
  	})
}

export function getReportFile(filename) {
	Dispatcher.dispatch({
    	type: "GetReportFile",
    	filename: filename
  	})
}

export function replyReportFile(success, data, filename) {
	Dispatcher.dispatch({
    	type: "ReplyReportFile",
    	success: success,
    	filename: filename,
    	data: data
  	})
}