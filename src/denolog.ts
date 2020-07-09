import {IDenoLogOption, IDenoLogOptionDefault} from './interfaces/idenolog.ts';
import { log } from './debug.ts';
import * as path from "https://deno.land/std/path/mod.ts";

export class DenoLog {
    private options : IDenoLogOption;
    constructor(_options: IDenoLogOption = {prefix: "", showDate: true, showTime: true, path: Deno.cwd() }){
        this.options = {...IDenoLogOptionDefault, ..._options};
        this.createLogFile();
    }

    public async error(msg: string){
        let msgSaveTxt = await log.error(this.options.showDate, this.options.showTime, msg);
        await this.saveToFile(msgSaveTxt);
    }

    public async success(msg: string){
        let msgSaveTxt = await log.success(this.options.showDate, this.options.showTime, msg);
        await this.saveToFile(msgSaveTxt);
    }

    public async info(msg: string){
        let msgSaveTxt = await log.info(this.options.showDate, this.options.showTime, msg);
        await this.saveToFile(msgSaveTxt);
    }

    public async warning(msg: string){
        let msgSaveTxt = await log.warning(this.options.showDate, this.options.showTime, msg);
        await this.saveToFile(msgSaveTxt);
    }

    private async createLogFile(){
        try{
            let pathToLogFile = this.options.path ? this.options.path : Deno.cwd();
            let pathToLogFileNormalized = path.normalize(pathToLogFile + path.sep);
            let pathInfos = await Deno.lstatSync(pathToLogFileNormalized);

            if(this.options.prefix && await this.checkAlphaNumeric(this.options.prefix) == false) throw Error("Please input alphanumeric characters only in prefix")

            let logPathComplete = pathToLogFileNormalized + (this.options.prefix ?  this.options.prefix + "_" : "") + "denolog.log"
            if(pathInfos.isDirectory == false) throw Error("The informed path is not a folder");

            if(await this.existsFolder(logPathComplete) == false){
                await Deno.createSync(logPathComplete);
            }

        }catch(err){
            throw err;
        }
    }

    private async saveToFile(msg: string){
        try{
            let pathToLogFile = this.options.path ? this.options.path : Deno.cwd();
            let pathToLogFileNormalized = path.normalize(pathToLogFile + path.sep);
            let pathInfos = await Deno.lstatSync(pathToLogFileNormalized);

            if(this.options.prefix && await this.checkAlphaNumeric(this.options.prefix) == false) throw Error("Please input alphanumeric characters only in prefix")

            let logPathComplete = pathToLogFileNormalized + (this.options.prefix ?  this.options.prefix + "_" : "") + "denolog.log"
            if(pathInfos.isDirectory == false) throw Error("The informed path is not a folder");

            if(await this.existsFolder(logPathComplete) == true){
                var encoder = new TextEncoder();
                var data = encoder.encode(`${msg}\n`);
                await Deno.writeFile(logPathComplete, data, {append: true});
            }else{
                await Deno.createSync(logPathComplete);
                var encoder = new TextEncoder();
                var data = encoder.encode(`${msg}\n`);
                await Deno.writeFile(logPathComplete, data, {append: true});
            }

        }catch(err){
            throw err;
        }
        
    }

    private async existsFolder(path: any){
        try {
            await Deno.lstat(path);
            return true;
          } catch (err) {
            if (err instanceof Deno.errors.NotFound) {
              return false;
            }
        
            throw err;
          }
    }

    private async checkAlphaNumeric(s: string){
        var letters = /^[0-9a-zA-Z]+$/;
        if(s.match(letters))
        {
            return true;
        }else{
            return false;
        }
    }
}