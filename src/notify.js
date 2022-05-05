function pushContent(content) {
    Logger.log(content);
    if (content != null && content.length > 0) {
        pushContentToWorkchat(content);
        pushContentToGooglechat(content);
        pushContentToDiscord(content);
    } else {
        Logger.log("No content for notify.");
    }
}

function pushContentToWorkchat(content) {
    var url = 'https://graph.facebook.com/v2.6/me/messages?access_token=' + workchat_token;
    var body = {
        'recipient': {
            'thread_key': workchat_channel_id
        },
        'message': {
            'text': content
        }
    };
    var headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
    };
    var payload = JSON.stringify(body);

    postRequest(headers, payload, url);
}

function pushContentToGooglechat(content) {
    var url = 'https://chat.googleapis.com/v1/spaces/' + googlechat_room_id + '/messages?key=' + googlechat_key + '&token=' + googlechat_token;
    var body = {
        'text': content
    };
    var headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
    };
    var payload = JSON.stringify(body);

    postRequest(headers, payload, url);
}

function pushContentToDiscord(content) {
    var url = 'https://discord.com/api/webhooks/' + discord_hook + '/' + discord_token;
    var body = {
        'content': content
    };
    var headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
    };
    var payload = JSON.stringify(body);

    postRequest(headers, payload, url);
}