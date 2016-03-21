module.exports = function (name, data) {
    if (data) {
        data.curPage = location.href;
        data.sourceID = sourceID;
        data.referrer = document.referrer;
        data.userID = curUserID;
    } else {
        data = {
            curPage: location.href,
            sourceID: sourceID,
            referrer: document.referrer,
            userID: curUserID
        };
    }
    sendCustomEvent(name, data);
}