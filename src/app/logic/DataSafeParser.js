import { isEmptyEvaluatorErrorCode } from "../logic/Utility"
import firebase from "firebase";
import { getCookie } from "../logic/Cookie"

export function dataSafeListParser(dataList) {
    for (let i = 0; i < dataList.length; i++) {
        /*if(dataList[i].quarantineStatus){
            delete dataList[i];
            continue;
        }*/   
        let removeEvent = false;
        let errorMessage = [];
        let nameError = nameErrorChecker(dataList[i].eventName);
        if (nameError.status) {
            removeEvent = true;
            errorMessage.push({ label: "Name", message: "Error due to " + nameError.message });
        }
        let priceError = priceParser(dataList[i].eventPrice);
        if (priceError.status) {
            removeEvent = true;
            errorMessage.push({ label: "Price", message: "Error due to " + priceError.message });
        }
        let urlError = imgErrorChecker(dataList[i].eventImgUrl);
        if (urlError.status) {
            removeEvent = true;
            errorMessage.push({ label: "Url", message: "Error due to " + urlError.message });
        }
        let dateError = dateParser(dataList[i].eventDate);
        if (dateError.status) {
            removeEvent = true;
            errorMessage.push({ label: "Date", message: "Error due to " + dateError.message });
        }
        let tagsError = tagsParser(dataList[i].eventTags);
        if (tagsError.status) {
            removeEvent = true;
            errorMessage.push({ label: "Tags", message: "Error due to " + tagsError.message });
        }
        let ticketError = ticketsParser(dataList[i].eventTickets);
        if (ticketError.status) {
            removeEvent = true;
            errorMessage.push({ label: "Tickets", message: "Error due to " + ticketError.message });
        }
        if (removeEvent) {
            reportToDatabase(dataList[i].eventId, errorMessage);
            dataList.splice(i, 1)
            i--;
        }
    }
    return dataList;
}

function reportToDatabase(id, message) {
    let ref = firebase.database().ref("event/" + getCookie("id") + "/" + id);
    ref.update({
        quarantineStatus: true,
        quarantineMessage: message,
    });
}

function nameErrorChecker(eventName) {
    let obj = {
        status: false,
        message: "",
    };
    let e = isEmptyEvaluatorErrorCode(eventName)
    if (e.status) {
        obj.status = true;
        obj.message = e.errorCode;
        return obj;
    }
    if (typeof eventName !== "string") {
        obj.status = true;
        obj.message = "wrong data type";
        return obj;
    }
    return obj;

}

// return true if we get some error
function priceParser(price) {
    let obj = {
        status: false,
        message: "",
    };
    let e = isEmptyEvaluatorErrorCode(price)
    if (e.status) {
        obj.status = true;
        obj.message += e.errorCode;
        return obj;
    }
    if (typeof price !== "string") {
        obj.status = true;
        obj.message = "wrong data type";
        return obj;
    }

    price = price.replace(/\s+/g, '');    // remove all the whitespace (all kind of witespace i allowed, maybe change later!)

    // countr number of dots, if more than one -> return true
    let numDot = 0;
    let i;
    for (i of price) {
        if (i === '.') {
            numDot += 1;
        }
        if (numDot > 1) {   // only accept one dot
            obj.status = true;
            obj.message = " the price cannot have several dots\nValue: (" + price + ")";
            return obj;
        }
    }

    let priceNoDot = price.replace(/\.+/g, ''); // remove all the dots from the price
    let isNum = /^\d+$/.test(priceNoDot);
    if (!isNum) {         // if price contains other things than digits, return true 
        obj.status = true;
        obj.message = " the price contains other things than digits\nValue: (" + price + ")";
        return obj;
    }

    //tveksamt om detta behövs nu
    let priceFloat = parseFloat(price)
    if (isNaN(priceFloat)) {
        obj.status = true;
        obj.message = " the price is not a number.\nValue: (" + price + ")";
        return obj;
    }

    return obj;


}

function imgErrorChecker(eventImgUrl) {
    let obj = {
        status: false,
        message: "",
    };

    let e = isEmptyEvaluatorErrorCode(eventImgUrl)
    if (e.status) {
        obj.status = true;
        obj.message = e.errorCode;
        return obj;
    }
    if (typeof eventImgUrl !== "string") {
        obj.status = true;
        obj.message = "wrong type";
        return obj;
    }

    else if (!eventImgUrl.match(/\.(jpeg|jpg|gif|png|svg)$/)) {
        obj.status = true;
        obj.message = "the image does not have a valid format.\nValue: (" + eventImgUrl + ")";
        return obj;
    }
    /*return fetch(eventImgUrl).then((response) => {
        if (response.type == "bassdsdsic") {
            return true;
        }
        else {
            return false;
        }
    }).catch((error) => {
        //console.log(eventImgUrl, error)
        return true;
    });*/
    return obj;
}

function dateParser(date) {
    let obj = {
        status: false,
        message: "",
    };

    let e = isEmptyEvaluatorErrorCode(date)
    if (e.status) {
        obj.status = true;
        obj.message = e.errorCode;
        return obj;
    }
    if (typeof date === "string" || typeof date === "number") {
        return obj;
    }
    else {
        obj.status = true;
        obj.message = "wrong data type";
        return obj;
    }
}

function tagsParser(tags) {
    let obj = {
        status: false,
        message: "",
    };
    if (tags === "") {  // ok to not have tags
        obj.status = false;
        obj.message = "";
        return obj;
    }
    let e = isEmptyEvaluatorErrorCode(tags)
    if (e.status) {
        obj.status = true;
        obj.message = e.errorCode;
        return obj;
    }
    if (typeof tags !== "string") {
        obj.status = true;
        obj.message = "wrong data type";
        return obj;
    }
    let tagList = tags.split(" ");
    for (let i = 0; i < tagList.length; i++) {
        if (tagList[i][0] !== "#") {
            obj.status = true;
            obj.message = "missed # at the beginning of tag\nValue: (" + tags + ")";
            return obj;
        }
    }
    // more than three tags looks like spam
    if (tagList.length > 3) {
        obj.status = true;
        obj.message = "too many tags\nValue: (" + tags + ")";
        return obj;
    }
    return obj;
}

function ticketsParser(tickets) {
    let obj = {
        status: false,
        message: "",
    };
    let e = isEmptyEvaluatorErrorCode(tickets)
    if (e.status) {
        obj.status = true;
        obj.message = e.errorCode;
        return obj;
    }
    if (typeof tickets !== "string") {
        obj.status = true;
        obj.message = "wrong data type";
        return obj;
    }

    tickets = tickets.replace(/\s+/g, '');    // remove all the whitespace (all kind of witespace i allowed, maybe change later!)
    let isNum = /^\d+$/.test(tickets);
    if (!isNum) {         // if price contains other things than digits, return true 
        obj.status = true;
        obj.message = "ticket can only be a natural number\nValue: (" + tickets + ")";
        return obj;
    }
    if (tickets < 1) {
        obj.status = true;
        obj.message = "tickets has to be at least 1\nValue: (" + tickets + ")";
        return obj;
    }
    return obj;

}