# Deno-Log
>Lightweight logger with an extensible configuration 🦕

## Usage
>This module need --allow-read --allow-write --allow-run

    import  {  DenoLog  }  from  './mod.ts';
    
    var logger  =  new  DenoLog(options);
    
    await  logger.info("Info");
    await  logger.error("Error");
    await  logger.success("Success");
    await  logger.warning("Warning");
>In console

    $: deno run --allow-all test.ts
    [04/24/2020 22:29:17] - Info
    [04/24/2020 22:29:17] - Error  
    [04/24/2020 22:29:17] - Success
    [04/24/2020 22:29:17] - Warning

>The log file denolog.log

    [04/24/2020  22:29:17] - [INFO] - Info
    [04/24/2020  22:29:17] - [ERROR] - Error
    [04/24/2020  22:29:17] - [SUCCESS] - Success
    [04/24/2020  22:29:17] - [WARN] - Warning

## Options
| Option|Description|Type|Default |
|--|--|--|--|
| prefix| Log file prefix| string| "" |
|showDate|Show date in log|boolean|true|
|showTime|Show time in log|boolean|true|
|path|Path to save log|string|workdir|
