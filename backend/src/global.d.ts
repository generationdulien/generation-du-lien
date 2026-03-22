// Node.js global type definitions
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
    }
    interface Global {
      [key: string]: any;
    }
  }
  var process: NodeJS.Process;
  var global: NodeJS.Global;
  function fetch(url: string, init?: any): Promise<any>;
  class URLSearchParams {
    constructor(init?: any);
    [key: string]: any;
  }
  var console: Console;
}

export {};
