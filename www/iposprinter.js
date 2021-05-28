/* global cordova, module */

module.exports = {
    /**
     * Printer status query
     * <ul>
     * <li>0: PRINTER_NORMAL                      You can start a new print at this time
     * <li>1: PRINTER_PAPERLESS                   Stop printing at this time, if the current printing is not completed, you need to reprint after adding paper
     * <li>2: PRINTER_THP_HIGH_TEMPERATURE        Pause printing at this time, if the current printing is not completed, it will continue to print after cooling down, no need to reprint
     * <li>3: PRINTER_MOTOR_HIGH_TEMPERATURE      Printing is not executed at this time. After cooling down, the printer needs to be initialized and the printing task is re-initiated
     * <li>4: PRINTER_IS_BUSY                     The printer is printing at this time
     * <li>5: PRINTER_ERROR_UNKNOWN               Printer abnormal
     * </ul>
     */
    getPrinterStatus() {
        return new Promise(function (resolve, reject) {
            cordova.exec(resolve, reject, 'IPosPrinter', 'getPrinterStatus', []);
        });
    },

    /**
     * Printer initialization
     * Power on the printer and initialize the default settings
     * Please check the printer status when using, please wait when PRINTER_IS_BUSY
     */
    printerInit() {
        return new Promise(function (resolve, reject) {
            cordova.exec(resolve, reject, 'IPosPrinter', 'printerInit', []);
        });
    },

    /**
     * Set the print density of the printer, which will affect subsequent printing, unless initialized
     * @param {number} depth Concentration level, range 1-10, this function will not be executed if the range is exceeded Default level 6
     */
    setPrinterPrintDepth(depth) {
        return new Promise(function (resolve, reject) {
            cordova.exec(resolve, reject, 'IPosPrinter', 'setPrinterPrintDepth', [depth]);
        });
    },

    /**
     * Set the print font type, which will affect subsequent printing, unless initialized
     * (Currently only one font ST is supported, more font support will be provided in the future)
     * @param {string} typeface Font name ST
     */
    setPrinterPrintFontType(typeface) {
        return new Promise(function (resolve, reject) {
            cordova.exec(resolve, reject, 'IPosPrinter', 'setPrinterPrintFontType', [typeface]);
        });
    },

    /**
     * Set the font size, which will affect subsequent printing, unless initialized
     * Note: The font size is a printing method that exceeds the standard international directives.
     * Adjusting the font size will affect the character width, and the number of characters per line will also change accordingly.
     * Therefore, the typesetting formed in monospaced fonts may be messy and needs to be adjusted by yourself
     * @param {number} fontsize Font size, currently supported sizes are 16, 24, 32, 48, input illegal size executes the default value 24
     */
    setPrinterPrintFontSize(fontsize) {
        return new Promise(function (resolve, reject) {
            cordova.exec(resolve, reject, 'IPosPrinter', 'setPrinterPrintFontSize', [fontsize]);
        });
    },

    /**
     * Set the alignment, which will affect subsequent printing, unless initialized
     * @param {number} alignment Alignment 0: Left, 1: Center, 2: Right, Center by default
     */
    setPrinterPrintAlignment(alignment) {
        return new Promise(function (resolve, reject) {
            cordova.exec(resolve, reject, 'IPosPrinter', 'setPrinterPrintAlignment', [alignment]);
        });
    },

    /**
     * Printer paper feed (forced line feed, paper feed lines after finishing the previous printing content, at this time the motor runs idling to feed paper, no data is sent to the printer)
     * @param {number} lines The number of printer paper lines (each line is a pixel)
     */
    printerFeedLines(lines) {
        return new Promise(function (resolve, reject) {
            cordova.exec(resolve, reject, 'IPosPrinter', 'printerFeedLines', [lines]);
        });
    },

    /**
     * Print blank lines (Forced to wrap, print blank lines after finishing the previous print content, the data sent to the printer at this time are all 0x00)
     * @param {number} lines Print the number of blank lines, limit up to 100 lines
     * @param {number} height The height of the blank line (unit: pixel)
     */
    printBlankLines(lines, height = 1) {
        return new Promise(function (resolve, reject) {
            cordova.exec(resolve, reject, 'IPosPrinter', 'printBlankLines', [lines, height]);
        });
    },

    /**
     * Print text
     * The text width is full of one line and automatically wrap and typesetting
     * @param {string} text Text string to be printed
     */
    printText(text) {
        return new Promise(function (resolve, reject) {
            cordova.exec(resolve, reject, 'IPosPrinter', 'printText', [text]);
        });
    },

    /**
     * Print the specified font type and size text, the font setting is only valid for this time
     * The text width is full of one line and automatically wrap
     * @param {string} text Text string to be printed
     * @param {string} typeface Font name ST (currently only supports one type)
     * @param {number} fontsize Font size, currently supported sizes are 16, 24, 32, 48, input illegal size executes the default value 24
     */
    printSpecifiedTypeText(text, typeface = 'ST', fontsize = 24) {
        return new Promise(function (resolve, reject) {
            cordova.exec(resolve, reject, 'IPosPrinter', 'printSpecifiedTypeText', [text, typeface, fontsize]);
        });
    },

    /**
     * Print the specified font type and size text, the font setting is only valid for this time
     * The text width is full of one line and automatically wrap and typesetting
     * @param {string} text Text string to be printed
     * @param {string} typeface Font name ST (currently only supports one type)
     * @param {number} fontsize Font size, currently supported sizes are 16, 24, 32, 48, input illegal size executes the default value 24
     * @param {number} alignment Alignment (0 to the left, 1 to the center, 2 to the right)
     */
    printSpecFormatText(text, typeface = 'ST', fontsize = 24, alignment = 0) {
        return new Promise(function (resolve, reject) {
            cordova.exec(resolve, reject, 'IPosPrinter', 'printSpecFormatText', [text, typeface, fontsize, alignment]);
        });
    },

    /**
     * Print a row of the table, you can specify the column width and alignment
     * @param {string[]} colsTextArr Array of text strings for each column
     * @param {number[]} colsWidthArr The total width of each column width array cannot be greater than ((384 / fontsize) << 1)-(number of columns + 1)
     *                      (Calculated in English characters, each Chinese character occupies two English characters, and each width is greater than 0),
     * @param {number[]} colsAlign Alignment of each column (0 to the left, 1 to the center, 2 to the right)
     * @param {number[]} isContinuousPrint Whether to continue printing the form 1: Continue printing 0: Do not continue printing
     * Remarks: The length of the array of the three parameters should be the same, if the width of colsTextArr[i] is greater than colsWidthArr[i], the text will wrap
     */
    printColumnsText(colsTextArr, colsWidthArr, colsAlign, isContinuousPrint) {
        return new Promise(function (resolve, reject) {
            cordova.exec(resolve, reject, 'IPosPrinter', 'printColumnsText', [colsTextArr, colsWidthArr, colsAlign, isContinuousPrint]);
        });
    },

    /**
     * Print picture
     * @param {number} alignment Alignment 0: Left, 1: Center, 2: Right, Center by default
     * @param {number} bitmapSize Bitmap size, the input size range is 1~16, 10 is selected by default when the range is exceeded Unit: 24bit
     * @param {number[]|string[]} mBitmap Picture bitmap object (maximum width 384 pixels, unable to print and call back abnormal callback function)
     */
    printBitmap(alignment = 1, bitmapSize = 10, mBitmap) {
        return new Promise(function (resolve, reject) {
            cordova.exec(resolve, reject, 'IPosPrinter', 'printBitmap', [alignment, bitmapSize, mBitmap]);
        });
    },

    /**
     * Print one-dimensional barcode
     * @param {string} data: Barcode data
     * @param {number} symbology Barcode type
     *    0 -- UPC-A，
     *    1 -- UPC-E，
     *    2 -- JAN13(EAN13)，
     *    3 -- JAN8(EAN8)，
     *    4 -- CODE39，
     *    5 -- ITF，
     *    6 -- CODABAR，
     *    7 -- CODE93，
     *    8 -- CODE128
     * @param {number} height        Bar code height, the value ranges from 1 to 16, the default value is 6 if it exceeds the range, each unit represents the height of 24 pixels
     * @param {number} width         Barcode width, the value ranges from 1 to 16, the default value is 12 if it exceeds the range, each unit represents the length of 24 pixels
     * @param {number} textposition  Text position 0: Do not print the text, 1: The text is above the bar code, 2: The text is below the bar code, 3: Both the top and bottom of the bar code are printed
     */
    printBarCode(data, symbology, height = 6, width = 12, textposition = 0) {
        return new Promise(function (resolve, reject) {
            cordova.exec(resolve, reject, 'IPosPrinter', 'printBarCode', [data, symbology, height, width, textposition]);
        });
    },

    /**
     * Print 2D barcode
     * @param {string} data QR code data
     * @param {number} modulesize Two-dimensional code block size (unit: point, value 1 to 16), beyond the setting range, the default value is 10
     * @param {number} mErrorCorrectionLevel: Two-dimensional error correction level (0:L 1:M 2:Q 3:H)
     */
    printQRCode(data, modulesize = 10, mErrorCorrectionLevel = 2) {
        return new Promise(function (resolve, reject) {
            cordova.exec(resolve, reject, 'IPosPrinter', 'printQRCode', [data, modulesize, mErrorCorrectionLevel]);
        });
    },

    /**
     * Print raw byte data
     * @param {string[]|number[]} rawPrintData Byte Data block
     */
    printRawData(rawPrintData) {
        return new Promise(function (resolve, reject) {
            cordova.exec(resolve, reject, 'IPosPrinter', 'printRawData', [rawPrintData]);
        });
    },

    /**
     * Use ESC/POS command to print
     * @param {string[]|number[]} data Instructions
     */
    sendUserCMDData(data) {
        return new Promise(function (resolve, reject) {
            cordova.exec(resolve, reject, 'IPosPrinter', 'sendUserCMDData', [data]);
        });
    },

    /**
     * Perform printing
     * After executing each printing function method, you need to execute this method before the printer can execute printing;
     * Before executing this method, it is necessary to determine the status of the printer. This method is valid when the printer is in PRINTER_NORMAL, otherwise it will not be executed.
     * @param {number} feedlines Print and feed paper feed
     */
    printerPerformPrint(feedlines = 150) {
        return new Promise(function (resolve, reject) {
            cordova.exec(resolve, reject, 'IPosPrinter', 'printerPerformPrint', [feedlines]);
        });
    }
};
