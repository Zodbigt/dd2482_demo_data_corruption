export function isEmptyEvaluator(item) {
    if (item === "" || item === null || typeof item === "undefined" || isNaN(item)) { //OBS isNaN kollar inte typen NaN, utan fall det är nummer.
        return true;
    }
    else {
        return false;
    }
}

export function isEmptyCookie(item) {
    if (item === "" || item === null || typeof item === "undefined") {
        return true;
    }
    else {
        return false;
    }
}

export function isEmptyEvaluatorErrorCode(item) {
    let obj = { status: false, errorCode: "", }
    if (item === "") {
        obj.status = true;
        obj.errorCode = "Empty String";
        return obj;
    }
    else if (item === null) {
        obj.status = true;
        obj.errorCode = "Value Null";
        return obj;
    }
    else if (typeof item === "undefined") {
        obj.status = true;
        obj.errorCode = "Value undefined";
        return obj;
    }
    else {
        return obj;
    }
}

export function formatDate(unformattedDate) {
    let date = new Date(unformattedDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes();
    if (("" + month).length < 2) {
        month = "0" + month;
    }
    if (("" + day).length < 2) {
        day = "0" + day;
    }
    if (("" + hour).length < 2) {
        hour = "0" + hour;
    }
    if (("" + min).length < 2) {
        min = "0" + min;
    }
    let formatDateTime = "" + year + "-" + month + "-" + day + " " + hour + ":" + min;
    return formatDateTime;
}

export function formatPrice(unformattedPrice, exact, lang) {
    unformattedPrice = unformattedPrice.replace(/\s+/g, '');
    let priceArray = unformattedPrice.split('.');
    let format = "$1,";
    let decimalSeparator = ".";
    if (lang === "sv") {
        format = "$1 ";
        decimalSeparator = ",";
    }
    else if (lang === "en") {
        format = "$1,";
        decimalSeparator = ".";
    }
    if (priceArray[0].length >= 5) {
        priceArray[0] = priceArray[0].replace(/(\d)(?=(\d{3})+$)/g, format);
    }
    if (priceArray[1] > 0) {
        let deciArray = priceArray[1].split("");
        for (let i = deciArray.length - 1; i >= 0; i--) {
            if (deciArray[i] === "0") {
                deciArray.pop();
            }
            else {
                break;
            }
        }
        priceArray[1] = deciArray.join("");
        return priceArray.join(decimalSeparator);
    }
    else if (exact) {
        return priceArray[0] + decimalSeparator + "00";
    }
    else {
        return priceArray[0];
    }
}

export function extractData(data) {
    let dataArray = [];
    let keyValue = 0;
    data.forEach(function (childSnap) {
        dataArray.push({
            keyValue: keyValue,
            eventId: childSnap.key,
            eventName: corruptedFakeDataTranslator(childSnap.child("eventName").val()),
            eventImgUrl: corruptedFakeDataTranslator(childSnap.child("eventImgUrl").val()),
            eventDate: corruptedFakeDataTranslator(childSnap.child("eventDate").val()),
            eventPrice: corruptedFakeDataTranslator(childSnap.child("eventPrice").val()),
            eventDescription: corruptedFakeDataTranslator(childSnap.child("eventDescription").val()),
            eventTags: corruptedFakeDataTranslator(childSnap.child("eventTags").val()),
            eventTickets: corruptedFakeDataTranslator(childSnap.child("eventTickets").val()),
            quarantineStatus: corruptedFakeDataTranslator(childSnap.child("quarantineStatus").val()),
            quarantineMessage: corruptedFakeDataTranslator(childSnap.child("quarantineMessage").val()),
        });
        keyValue++;
    });
    return dataArray.reverse();
}

function corruptedFakeDataTranslator(data) {
    if (data === "null") {
        return null;
    }
    else if (data === "undefined") {
        return undefined;
    }
    else {
        return data;
    }
}

export function extractTitleHeaderData(data) {
    let dataText = JSON.stringify(data);
    let dataJson = JSON.parse(dataText);
    let dataObject = {
        header: dataJson.header,
        text: dataJson.text,
    }
    return dataObject;
}

export function extractQuarantinedData(data) {
    let dataArray = [];
    let keyValue = 0;
    data.forEach(function (childSnap) {
        if (childSnap.child("quarantineStatus").val()) {
            dataArray.push({
                keyValue: keyValue,
                eventId: childSnap.key,
                eventName: childSnap.child("eventName").val(),
                eventImgUrl: childSnap.child("eventImgUrl").val(),
                eventDate: childSnap.child("eventDate").val(),
                eventPrice: childSnap.child("eventPrice").val(),
                eventDescription: childSnap.child("eventDescription").val(),
                eventTags: childSnap.child("eventTags").val(),
                eventTickets: childSnap.child("eventTickets").val(),
                quarantineStatus: childSnap.child("quarantineStatus").val(),
                quarantineMessage: childSnap.child("quarantineMessage").val(),
            });
            keyValue++;
        }
    });
    return dataArray.reverse();
}