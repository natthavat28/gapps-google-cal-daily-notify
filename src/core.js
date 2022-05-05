function pullContentFromCalendar(topicTitle, calendarId, filterCreatorEmail) {
    var eventList = listTodayEvents(calendarId, filterCreatorEmail);
    if (eventList.length > 0) {
        return generateContent(topicTitle, generateItems(eventList));
    }
    return null;
}

function postRequest(header, body, url) {
    var response = UrlFetchApp.fetch(url, {
        "method": "POST",
        "headers": header,
        "payload": body
    });
}

function generateContent(topicTitle, itemContent) {
    return topicTitle + "\n" + itemContent;
}

function generateItems(eventList) {
    var res = "";
    for (var i = 0; i < eventList.length; i++) {
        res = res + '✅ ' + eventList[i] + '\n';
    }
    return res;
}

function listTodayEvents(calendarId, filterCreatorEmail) {
    var today = new Date();
    var dateFrom = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
    var dateTo = new Date(dateFrom);
    dateTo.setDate(dateFrom.getDate() + 1);

    var events = CalendarApp.getCalendarById(calendar_id_talentconnect).getEvents(dateFrom, dateTo);
    var res = [];

    for (var i = 0; i < events.length; i++) {
        if (filterCreatorEmail.length == 0 || filterCreatorEmail.includes(events[i].getCreators())) {
            res.push(events[i].getTitle());
        }
    }

    return res;
}