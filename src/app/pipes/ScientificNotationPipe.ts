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
 * Scientific Notation Pipe
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */

 import { Component, Pipe, PipeTransform } from 'angular2/core'; 
 import { TSMT$NumberFormatter           } from '../lib/NumberFormatter';

 @Pipe({
  name: 'scientificNotation'
 })

/**
 * Implement pipe transform for this pipe
 *
 * @ param value: number Input number passed to the pipe
 * @ param args : array Only one argument is required, the number of significant digits, which should be at least one
 *
 * @return String Valid arguments produce a string formatted in scientific notation, i.e. 1.237 x 10^3
 */
 export class ScientificNotationPipe implements PipeTransform 
 {
   transform(value: number, args: any[]) 
   {
     if( value != undefined && !isNaN(value) ) 
     {
       var digits: number = args.length < 1 ? 2 : Math.max(1, args[0]);

       // format in scientific notation with commas, as requested
       var output: string = TSMT$NumberFormatter.toScientific( value, digits);

       return output;
     }

     return;
   }
 }