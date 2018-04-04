import Dispatcher from "./dispatcher";

export function getReportsIndex() {
	Dispatcher.dispatch({
    	type: "GetReportIndex"
  	})
}

export function replyReportsIndex(success, data) {
	Dispatcher.dispatch({
    	type: "ReplyReportIndex",
    	success: success,
    	data: data
  	})
}
