import * as fs from 'fs';
import {
  Request,
  Response
} from 'express';

import {
  Provider,
  NgModuleFactory,
  InjectionToken,
  Type,
  CompilerFactory,
  Compiler
} from '@angular/core';
import {
  INITIAL_CONFIG,
  renderModuleFactory,
  platformDynamicServer
} from '@angular/platform-server';
// tslint:disable-next-line:quotemark
import { ResourceLoader } from "@angular/compiler";

import { FileLoader } from './file-loader';

export const REQUEST = new InjectionToken<Request>('REQUEST');
export const RESPONSE = new InjectionToken<Response>('RESPONSE');

/**
 * These are the allowed options for the engine
 */
export interface NgSetupOptions {
  bootstrap: Type<{}> | NgModuleFactory<{}>;
  providers?: Provider[];
}

/**
 * These are the allowed options for the render
 */
export interface RenderOptions extends NgSetupOptions {
  req: Request;
  res?: Response;
}

interface Send {
    (status: number | null, body?: any): Response;
    (body?: any): Response;
}

/**
 * This holds a cached version of each index used.
 */
const templateCache: { [key: string]: string } = {};

/**
 * This is a map of compiled NgModuleFactories
 */
const factoryCacheMap = new Map<Type<{}>, NgModuleFactory<{}>>();

/**
 * This is an express engine for handling Angular Applications
 */
export function ngExpressEngine(setupOptions: NgSetupOptions) {
  const compilerFactory: CompilerFactory = platformDynamicServer().injector.get(CompilerFactory);
  const compiler: Compiler = compilerFactory.createCompiler([
    {
      providers: [
        { provide: ResourceLoader, useClass: FileLoader }
      ]
    }
  ]);

  setupOptions.providers = setupOptions.providers || [];

  return function (filePath: string, options: RenderOptions, callback: Send) {

    options.providers = options.providers || [];
    setupOptions.providers = setupOptions.providers || [];

    try {
      const moduleOrFactory = options.bootstrap || setupOptions.bootstrap;

      if (!moduleOrFactory) {
        throw new Error('You must pass in a NgModule or NgModuleFactory to be bootstrapped');
      }

      const extraProviders = setupOptions.providers.concat(
        options.providers,
        getReqResProviders(options.req, options.res),
        [
          {
            provide: INITIAL_CONFIG,
            useValue: {
              document: getDocument(filePath),
              url: options.req.originalUrl
            }
          }
        ]);

      getFactory(moduleOrFactory, compiler)
        .then(factory => {
          return renderModuleFactory(factory, {
            extraProviders: extraProviders
          });
        })
        .then((html: string) => {
          callback(null, html);
        }, (err) => {
          callback(err);
          throw err;
        });
    } catch (err) {
      callback(err);
    }
  };
}

/**
 * Get a factory from a bootstrapped module/ module factory
 */
function getFactory(
  moduleOrFactory: Type<{}> | NgModuleFactory<{}>, compiler: Compiler
): Promise<NgModuleFactory<{}>> {
  return new Promise<NgModuleFactory<{}>>((resolve, reject) => {
    // If module has been compiled AoT
    if (moduleOrFactory instanceof NgModuleFactory) {
      resolve(moduleOrFactory);
      return;
    } else {
      const moduleFactory = factoryCacheMap.get(moduleOrFactory);

      // If module factory is cached
      if (moduleFactory) {
        resolve(moduleFactory);
        return;
      }

      // Compile the module and cache it
      compiler.compileModuleAsync(moduleOrFactory)
        .then((factory) => {
          factoryCacheMap.set(moduleOrFactory, factory);
          resolve(factory);
        }, (err => {
          reject(err);
        }));
    }
  });
}

/**
 * Get providers of the request and response
 */
function getReqResProviders(req: Request, res: Response | undefined): Provider[] {
  const providers: Provider[] = [
    {
      provide: REQUEST,
      useValue: req
    }
  ];
  if (res) {
    providers.push({
      provide: RESPONSE,
      useValue: res
    });
  }
  return providers;
}

/**
 * Get the document at the file path
 */
function getDocument(filePath: string): string {
  return templateCache[filePath] = templateCache[filePath] || fs.readFileSync(filePath).toString();
}
