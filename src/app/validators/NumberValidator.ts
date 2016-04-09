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
 * A keystroke number validator
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */
 export class NumberValidator
 {
   constructor(  )
   {
     // empty 
   }

  /**
   * Validate a single key stroke as being part of a number or acceptable duing the input of a number
   *
   * @param key: int - ASCII key code
   *
   * return boolean - true if the key code is valid, false otherwise
   */ 
   public static validateKey(key: number): boolean
   {
     // forward/back keystrokes are acceptable, otherwise, it's all the usual suspects ...
     return (key > 47 && key < 59) || key == 173 || key == 189 || key == 190 || key == 45 || key == 46 || key == 8 || key == 37 || key == 39 || key == 9;
   }

  /**
   * Validate the input string
   *
   * @param input: string - String value to be evaluated as being a number
   *
   * @return boolean - true if the input is valid, false otherwise
   */
   public static validateInput(input: string): boolean
   {
     return !isNaN( parseFloat(input) );
   }
 }