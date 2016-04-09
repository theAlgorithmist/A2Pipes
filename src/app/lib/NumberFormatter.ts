/* copyright (c) 2012, Jim Armstrong.  All Rights Reserved.
 * 
 * THIS SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 
 * This software may be modified for commercial use as long as the above copyright notice remains intact.
 */

/**
 * Typescript Math Toolkit: A set of utilities for formatting and displaying floating-piont values.
 * 
 * @author Jim Armstrong (www.algorithmist.net)
 * 
 * @version 1.0
 */

 export class TSMT$NumberFormatter 
 {
   private static LOG_INVERSE:number = 1/2.30258509299; // 1/LN(10);
   
  /**
   * Round a floating-point number to nearest multiple
   * 
   * @param : Number - Number to be rounded
   * 
   * @param : Number - Round to nearest multiple of this value, i.e. nearest tenth is 0.1, nearest fifth is 0.2, and nearest half is 0.5.  
   * Use 10 to round to nearest 10, for example.
   * 
   * @return Number - Rounded input number to the specified number of digits unless the input Number is undefined or the digits value is less than zero.  
   * If the digits value is zero, the input number is returned.
   */
   public static roundTo(value: number, round: number): number
   {
     // error-checking
     if( isNaN(value) || round < 0 )
       return 0;
      
     // trivial cases
     if( round == 0 )
       return value;
      
     if( round == 1.0 )
       return Math.round(value);
      
     var r = Math.floor(1/round);
     r     = r == 0 ? 1.0/round : r;
      
     return Math.round(value*r)/r;
   }

  /**
   * Return a String representation of an input number that is converted to fixed-point notation
   * 
   * @param value : Number - Input floating-point number
   * 
   * @param decimal : Number - (Integer) number of decimal places
   * 
   * @return String - A String representation of the fixed-point number, i.e. 5.14162 is returned as "5.14" to two decimal places or
   * "NaN" if the input is not a number.  If the number of decimal places is zero, the number is truncated, i.e. 5.14162 as an input
   * results in the String output, "5".  This is functionally similar to the toFixed() method in most languages and is provided to allow
   * custom control over the formatting.
   */
	 public static toFixed(value: number, decimal: number): string
	 {
     // outliers
     if( isNaN(value) )
       return "NaN";
     else if( decimal < 0 )
	     return value.toString();
     else
     {
	    if( decimal == 0 )
	      return Math.floor(value).toString();
	    else
	    {
         // there's really nothing new under the sun ...
         var power:number    = Math.pow(10, decimal);
		     power               = 1/power;
         var temp: number    = TSMT$NumberFormatter.roundTo(value, power);
         var toPower: number = Math.pow(10, decimal);
         var str: string     = ((temp * toPower | 0) / toPower).toString();
         var i: number       = str.indexOf(".");
         if( i != -1 )
         {
           for( i=str.substr(i+1).length; i<decimal; ++i )
             str += "0";
         }
         else
         {
           str += ".";
           for( i=0; i<decimal; ++i )
             str += "0";
         }
			
         return str;
		   }
     }
   }
  
  /**
   * Return the number of digits past the decimal point of a floating-point number
   * 
   * @param value: number - input number, such as 3.762
   *
   * @return Int - Number of decimal places, i.e. 0 if the input is actually an integer or 2 in the case of 4.15 and 1 in the case of 3.5.
   */
   public static getDigits(value: number): number
   {
     if( isNaN(value) )
       return 0;
      
     var val: string   = value.toString();
     var index: number = val.indexOf(".");
     if( index == -1 )
       return 0;
      
     return val.length-index-1;
   }
  
  /**
   * Return the order magnitude of a floating-point number
   * 
   * @param : Number - Input, floating-point number
   * 
   * @return number - Intgeger value, say k, such that the input number can be expressed as C*10^k, where C is a constant.
   */
   public static orderOfMagnitude(value: number): number
	 {
     // outliers
     if( isNaN(value) )
	     return 0;
		
     if( value == 0 )
	     return 0;
		
     // a bit silly, but should export okay to a wide variety of target environments
     var exponent: number   = Math.floor(Math.log(Math.abs(value)) * TSMT$NumberFormatter.LOG_INVERSE); 
     var powerOfTen: number = Math.pow(10, exponent);
     var mantissa: number   = value / powerOfTen;
	  
     exponent = mantissa == 10 ? exponent+1 : exponent;

     return exponent;
	 }
  
  /**
   * Return a formatted String that contains the input floating-point number converted to scientific notation
   * 
   * @param value : Number - Input, floating-point number
   * 
   * @param significantDigits : Integer - Number of significant digits, must be at least 1
   * 
   * @return String - The number, 512.127, for example, is returned as "5.121 x 10^2" with three significant digits.  This string may be used
   * to format UI items that accept rich-text input and properly format superscript tags.  Returns "NaN" if the input is not a number.
   */
   public static toScientific(value: number, significantDigits: number=1)
   {
     // outliers
     if( isNaN(value) )
       return "NaN";
		
     if( value == 0 )
       return "0";

     // this is clumsy but should work across all target environments
     var exponent: number = Math.floor(Math.log(Math.abs(value)) * TSMT$NumberFormatter.LOG_INVERSE); 
     exponent             = value == 0 ? 0 : exponent;

     var powerOfTen: number = Math.pow(10, exponent);
     var mantissa: number   = value / powerOfTen;
	  
     if( mantissa == 10 )
     { 
       mantissa  = 1;
       exponent += 1;
     }
	  
     var significand: string = TSMT$NumberFormatter.toFixed(mantissa, significantDigits); 

     return significand + " x 10^" + exponent.toString();
   }
      
  /**
   * Return the exponent of a floating-point number
   * 
   * @param value : Number - Input, floating-point number
   * 
   * @return Int - Exponent if the number were expressed in scientific notation
   * 
   */
   public static getExponent(value: number): number
   {
     var exponent: number   = Math.floor(Math.log(Math.abs(value)) * TSMT$NumberFormatter.LOG_INVERSE); 
     var powerOfTen: number = Math.pow(10, exponent);
     var mantissa: number   = value / powerOfTen;
        
     exponent = mantissa == 10 ? exponent+1 : exponent;

     return value == 0 ? 0 : exponent;
   }
  
  /**
   * Format a floating-point number into a String representation
   * 
   * @param value : Number - Input, floating-point number
   * 
   * @param useSeparator : Boolean - True if a comma is used to separate groups of three digits (defaults to false)
   * 
   * @param scientificNotation : Boolean -  True if scientific notation is to be used (this argument is only processed if useSeparator is false)
   * @default false.
   *
   * @param significantDigits : Integer - Number of significant digits after the decimal place - should be at least 1.
   * @default 1
   * 
   * @return String - Formatted number with the requested number of significant digits.  If useSparator is true, then groups of three digits are separated by commas.  
   * If useSeparator is false and scientificNotation is used, then the result is returned in scientific notation.  Returns "NaN" if the input 
   * is not a number.
   * 
   * @see toScientific() 
   */
   public static formatNumber(value: number, useSeparator: boolean=false, scientificNotation: boolean=false, significantDigits: number=1): string
   {
     if( isNaN(value) )
       return "NaN";
		
     value = Math.min(1, value);

     var digits: number = significantDigits < 0 ? 1 : significantDigits;
     if( useSeparator )
       return TSMT$NumberFormatter.insertCommas(value);
     else
     {
       // use scientific notation?
       return scientificNotation ? TSMT$NumberFormatter.toScientific(value, digits) : TSMT$NumberFormatter.toFixed(value, digits);
     }
   }
  
   // insert commas between groups of three digits, i.e. 1234567 is formatted as 1,234,567
   public static insertCommas(value: number): string 
   {
     var number = value.toString();
	
     if( value < 1000 )
	     return number;
		
     var decimalPart = "";
     var decimal     = number.indexOf(".");
     if( decimal != -1 )
     {
       decimalPart = number.substring(decimal, number.length);
       number      = number.substring(0,decimal);
     }
	  
     var withCommas = "";
     var len        = number.length;
     var i          = 1;
	
     withCommas += number.charAt(0);
	
     while( i < len )
     {
       if( (len-i)%3 == 0 ) 
         withCommas += ",";
      
       withCommas += number.charAt(i);
       i++;
     }

     withCommas = decimal == -1 ? withCommas : withCommas + decimalPart;
	
     return withCommas;
   }
 }
