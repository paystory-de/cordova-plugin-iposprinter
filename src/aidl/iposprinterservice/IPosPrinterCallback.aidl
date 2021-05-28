/**
* iPos Print Service Callback
* IPosPrinterCallback.aidl
* AIDL Version: 1.0.0
*/

package com.iposprinter.iposprinterservice;

/**
 * Callback of the execution result of the print service
 */
interface IPosPrinterCallback {
	/**
	* Return execution result
	* @param isSuccess: true executes successfully, false executes failed
	*/
	oneway void onRunResult(boolean isSuccess);

	/**
	* Return result (string data)
	* @param result: As a result, the printing length (in mm) since the printer was powered on
	*/
	oneway void onReturnString(String result);
}
