import { DenoLog } from './mod.ts';

var logger = new DenoLog();

await logger.info("Info");
await logger.error("Error");
await logger.success("Success");
await logger.warning("Warning");