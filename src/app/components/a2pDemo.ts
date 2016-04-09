/** 
 * Copyright 2016 Jim Armstrong (www.algorithmist.net)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Custom Angular 2 Pipes Demo (w/Typescript Math Toolkit NumberFormatter)
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */
 import { Component              } from 'angular2/core';
 import { TSMT$NumberFormatter   } from '../lib/NumberFormatter';
 import { ScientificNotationPipe } from '../pipes/ScientificNotationPipe';
 import { NumberValidator        } from '../validators/NumberValidator';

 @Component(
 {
   selector: 'a2p-demo',

   templateUrl: '/app/templates/main.html',

   pipes: [ScientificNotationPipe]
 })

 // This is the host component for the A2 pipes demo
 export class A2PDemoComponent 
 {
   // bindings to input form values
   private num: string;                      // input number
   private rounding: string;                 // value for round-to, i.e. 0.5 for round to nearest half

   private _number: string;                  // formatted version of input number
   private _order: number;                   // order of magnitude of the input number
   private _digits: number;                  // number of digits after decimal place
   private _useRounding: boolean = false;    // true if rounding is applied to dynamic formatting of input number
   private _useCommas: boolean   = false;    // false if commas are applied to dynamic formatting of input number  

  /**
   * Create a demo component
   *
   * @param validator: NumberValidator to be injected to validate keystrokes
   *
   * @return nothing This is the root component of the A2 Custom Pipes demo. 
   */
   constructor( validator:NumberValidator )
   {
     this._number = "0.0";
     this._order  = 0;
   }

   // update number formatting and output not dependent on custom pipes
   private __update():void
   {
     var theNumber: number = parseFloat(this.num);

     // new order of magnitude, i.e. the number is of the form C*10^k where C is in (0,10)
     this._order = TSMT$NumberFormatter.orderOfMagnitude(theNumber);

     // number of digits after decimal place
     this._digits = TSMT$NumberFormatter.getDigits(theNumber);

     // rounding?
     if( this._useRounding ) 
     {
       this.rounding = this.rounding == undefined ? "1" : this.rounding;
       theNumber     = TSMT$NumberFormatter.roundTo(theNumber, parseFloat(this.rounding));
     }

     // final, formatted number
     this._number = this._useCommas ? TSMT$NumberFormatter.insertCommas(theNumber) : theNumber.toString();
   }

   // key-down event on text input 
   private __onKeyDown(evt: any): boolean 
   {
     var code: number = evt.keyCode;

     return NumberValidator.validateKey(code);
   }
 }