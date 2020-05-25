import {
    TermColorizer,
    AnsiColors
} from "https://deno.land/x/termcolorizer@master/termcolorizer.ts";

const tc = new TermColorizer();

export var log = {
    error: error,
    success: success,
    info: info,
    warning: warning
}

async function warning(showDate: any, showTime: any, msg: string){
    let logPrefix = await getStringDate(showDate, showTime);
    let messageToLog = tc.colorize(logPrefix, AnsiColors.White) + tc.colorize(msg, AnsiColors.Yellow);
    let messageToTxtLog = logPrefix + "[WARN] - " + msg;
    console.log(messageToLog);
    return messageToTxtLog;
}

async function info(showDate: any, showTime: any, msg: string){
    let logPrefix = await getStringDate(showDate, showTime);
    let messageToLog = tc.colorize(logPrefix, AnsiColors.White) + tc.colorize(msg, AnsiColors.White);
    let messageToTxtLog = logPrefix + "[INFO] - " + msg;
    console.log(messageToLog);
    return messageToTxtLog;
}

async function success(showDate: any, showTime: any, msg: string){
    let logPrefix = await getStringDate(showDate, showTime);
    let messageToLog = tc.colorize(logPrefix, AnsiColors.White) + tc.colorize(msg, AnsiColors.Green);
    let messageToTxtLog = logPrefix + "[SUCCESS] - " + msg;
    console.log(messageToLog);
    return messageToTxtLog;
}

async function error(showDate: any, showTime: any, msg: string){
    let logPrefix = await getStringDate(showDate, showTime);
    let messageToLog = tc.colorize(logPrefix, AnsiColors.White) + tc.colorize(msg, AnsiColors.Red);
    let messageToTxtLog = logPrefix + "[ERROR] - " + msg;
    console.log(messageToLog);
    return messageToTxtLog;
}

async function getStringDate(showDate: boolean, showTime: boolean){
    let d = new Date();
    let timeText = d.toTimeString();
    timeText = timeText.split(' ')[0];
    let splitDate = {
        day: d.getDate() < 10 ? "0" + d.getDate().toString() : d.getDate().toString(),
        month: d.getMonth() < 10 ? "0" + d.getMonth().toString() : d.getMonth().toString(),
        year: d.getFullYear().toString(),
        time: timeText
    }
    var dateString: string = `${splitDate.month}/${splitDate.day}/${splitDate.year}`;
    var timeString: string = splitDate.time;
    
    var _s = "[" + (showDate == true ? dateString : "") +  ( showDate == true && showTime == true ? " " : "") + (showTime == true ? timeString : "") + "] - ";
    return _s;
}