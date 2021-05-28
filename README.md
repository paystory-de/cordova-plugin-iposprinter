## Cordova Plugin for IPosPrinter Service
[![npm version](https://img.shields.io/npm/v/cordova-plugin-iposprinter.svg)](https://www.npmjs.com/package/cordova-plugin-iposprinter) [![npm downloads](https://img.shields.io/npm/dm/cordova-plugin-iposprinter.svg)](https://www.npmjs.com/package/cordova-plugin-iposprinter)

### Install

#### Cordova

    $ cordova plugin add cordova-plugin-iposprinter

#### Ionic

    $ ionic cordova plugin add cordova-plugin-iposprinter

#### Capacitor

    $ npm install cordova-plugin-iposprinter
    $ npx cap sync

### Functions

<dl>
<dt><a href="#getPrinterStatus">getPrinterStatus()</a></dt>
<dd><p>Printer status query</p>
<ul>
<li>0: PRINTER_NORMAL                      You can start a new print at this time
<li>1: PRINTER_PAPERLESS                   Stop printing at this time, if the current printing is not completed, you need to reprint after adding paper
<li>2: PRINTER_THP_HIGH_TEMPERATURE        Pause printing at this time, if the current printing is not completed, it will continue to print after cooling down, no need to reprint
<li>3: PRINTER_MOTOR_HIGH_TEMPERATURE      Printing is not executed at this time. After cooling down, the printer needs to be initialized and the printing task is re-initiated
<li>4: PRINTER_IS_BUSY                     The printer is printing at this time
<li>5: PRINTER_ERROR_UNKNOWN               Printer abnormal
</ul></dd>
<dt><a href="#printerInit">printerInit()</a></dt>
<dd><p>Printer initialization
Power on the printer and initialize the default settings
Please check the printer status when using, please wait when PRINTER_IS_BUSY</p>
</dd>
<dt><a href="#setPrinterPrintDepth">setPrinterPrintDepth(depth)</a></dt>
<dd><p>Set the print density of the printer, which will affect subsequent printing, unless initialized</p>
</dd>
<dt><a href="#setPrinterPrintFontType">setPrinterPrintFontType(typeface)</a></dt>
<dd><p>Set the print font type, which will affect subsequent printing, unless initialized
(Currently only one font ST is supported, more font support will be provided in the future)</p>
</dd>
<dt><a href="#setPrinterPrintFontSize">setPrinterPrintFontSize(fontsize)</a></dt>
<dd><p>Set the font size, which will affect subsequent printing, unless initialized
Note: The font size is a printing method that exceeds the standard international directives.
Adjusting the font size will affect the character width, and the number of characters per line will also change accordingly.
Therefore, the typesetting formed in monospaced fonts may be messy and needs to be adjusted by yourself</p>
</dd>
<dt><a href="#setPrinterPrintAlignment">setPrinterPrintAlignment(alignment)</a></dt>
<dd><p>Set the alignment, which will affect subsequent printing, unless initialized</p>
</dd>
<dt><a href="#printerFeedLines">printerFeedLines(lines)</a></dt>
<dd><p>Printer paper feed (forced line feed, paper feed lines after finishing the previous printing content, at this time the motor runs idling to feed paper, no data is sent to the printer)</p>
</dd>
<dt><a href="#printBlankLines">printBlankLines(lines, height)</a></dt>
<dd><p>Print blank lines (Forced to wrap, print blank lines after finishing the previous print content, the data sent to the printer at this time are all 0x00)</p>
</dd>
<dt><a href="#printText">printText(text)</a></dt>
<dd><p>Print text
The text width is full of one line and automatically wrap and typesetting</p>
</dd>
<dt><a href="#printSpecifiedTypeText">printSpecifiedTypeText(text, typeface, fontsize)</a></dt>
<dd><p>Print the specified font type and size text, the font setting is only valid for this time
The text width is full of one line and automatically wrap</p>
</dd>
<dt><a href="#printSpecFormatText">printSpecFormatText(text, typeface, fontsize, alignment)</a></dt>
<dd><p>Print the specified font type and size text, the font setting is only valid for this time
The text width is full of one line and automatically wrap and typesetting</p>
</dd>
<dt><a href="#printColumnsText">printColumnsText(colsTextArr, colsWidthArr, colsAlign, isContinuousPrint)</a></dt>
<dd><p>Print a row of the table, you can specify the column width and alignment</p>
</dd>
<dt><a href="#printBitmap">printBitmap(alignment, bitmapSize, mBitmap)</a></dt>
<dd><p>Print picture</p>
</dd>
<dt><a href="#printBarCode">printBarCode(data:, symbology, height, width, textposition)</a></dt>
<dd><p>Print one-dimensional barcode</p>
</dd>
<dt><a href="#printQRCode">printQRCode(data, modulesize, mErrorCorrectionLevel:)</a></dt>
<dd><p>Print 2D barcode</p>
</dd>
<dt><a href="#printRawData">printRawData(rawPrintData)</a></dt>
<dd><p>Print raw byte data</p>
</dd>
<dt><a href="#sendUserCMDData">sendUserCMDData(data)</a></dt>
<dd><p>Use ESC/POS command to print</p>
</dd>
<dt><a href="#printerPerformPrint">printerPerformPrint(feedlines)</a></dt>
<dd><p>Perform printing
After executing each printing function method, you need to execute this method before the printer can execute printing;
Before executing this method, it is necessary to determine the status of the printer. This method is valid when the printer is in PRINTER_NORMAL, otherwise it will not be executed.</p>
</dd>
</dl>

<a name="getPrinterStatus"></a>

#### getPrinterStatus()
Printer status query
<ul>
<li>0: PRINTER_NORMAL                      You can start a new print at this time
<li>1: PRINTER_PAPERLESS                   Stop printing at this time, if the current printing is not completed, you need to reprint after adding paper
<li>2: PRINTER_THP_HIGH_TEMPERATURE        Pause printing at this time, if the current printing is not completed, it will continue to print after cooling down, no need to reprint
<li>3: PRINTER_MOTOR_HIGH_TEMPERATURE      Printing is not executed at this time. After cooling down, the printer needs to be initialized and the printing task is re-initiated
<li>4: PRINTER_IS_BUSY                     The printer is printing at this time
<li>5: PRINTER_ERROR_UNKNOWN               Printer abnormal
</ul>  

<a name="printerInit"></a>

#### printerInit()
Printer initialization
Power on the printer and initialize the default settings
Please check the printer status when using, please wait when PRINTER_IS_BUSY

<a name="setPrinterPrintDepth"></a>

#### setPrinterPrintDepth(depth)
Set the print density of the printer, which will affect subsequent printing, unless initialized

| Param | Type | Description |
| --- | --- | --- |
| depth | <code>number</code> | Concentration level, range 1-10, this function will not be executed if the range is exceeded Default level 6 |

<a name="setPrinterPrintFontType"></a>

#### setPrinterPrintFontType(typeface)
Set the print font type, which will affect subsequent printing, unless initialized
(Currently only one font ST is supported, more font support will be provided in the future)

| Param | Type | Description |
| --- | --- | --- |
| typeface | <code>string</code> | Font name ST |

<a name="setPrinterPrintFontSize"></a>

#### setPrinterPrintFontSize(fontsize)
Set the font size, which will affect subsequent printing, unless initialized
Note: The font size is a printing method that exceeds the standard international directives.
Adjusting the font size will affect the character width, and the number of characters per line will also change accordingly.
Therefore, the typesetting formed in monospaced fonts may be messy and needs to be adjusted by yourself

| Param | Type | Description |
| --- | --- | --- |
| fontsize | <code>number</code> | Font size, currently supported sizes are 16, 24, 32, 48, input illegal size executes the default value 24 |

<a name="setPrinterPrintAlignment"></a>

#### setPrinterPrintAlignment(alignment)
Set the alignment, which will affect subsequent printing, unless initialized

| Param | Type | Description |
| --- | --- | --- |
| alignment | <code>number</code> | Alignment 0: Left, 1: Center, 2: Right, Center by default |

<a name="printerFeedLines"></a>

#### printerFeedLines(lines)
Printer paper feed (forced line feed, paper feed lines after finishing the previous printing content, at this time the motor runs idling to feed paper, no data is sent to the printer)

| Param | Type | Description |
| --- | --- | --- |
| lines | <code>number</code> | The number of printer paper lines (each line is a pixel) |

<a name="printBlankLines"></a>

#### printBlankLines(lines, height)
Print blank lines (Forced to wrap, print blank lines after finishing the previous print content, the data sent to the printer at this time are all 0x00)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| lines | <code>number</code> |  | Print the number of blank lines, limit up to 100 lines |
| height | <code>number</code> | <code>1</code> | The height of the blank line (unit: pixel) |

<a name="printText"></a>

#### printText(text)
Print text
The text width is full of one line and automatically wrap and typesetting

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | Text string to be printed |

<a name="printSpecifiedTypeText"></a>

#### printSpecifiedTypeText(text, typeface, fontsize)
Print the specified font type and size text, the font setting is only valid for this time
The text width is full of one line and automatically wrap

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| text | <code>string</code> |  | Text string to be printed |
| typeface | <code>string</code> | <code>&quot;ST&quot;</code> | Font name ST (currently only supports one type) |
| fontsize | <code>number</code> | <code>24</code> | Font size, currently supported sizes are 16, 24, 32, 48, input illegal size executes the default value 24 |

<a name="printSpecFormatText"></a>

#### printSpecFormatText(text, typeface, fontsize, alignment)
Print the specified font type and size text, the font setting is only valid for this time
The text width is full of one line and automatically wrap and typesetting

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| text | <code>string</code> |  | Text string to be printed |
| typeface | <code>string</code> | <code>&quot;ST&quot;</code> | Font name ST (currently only supports one type) |
| fontsize | <code>number</code> | <code>24</code> | Font size, currently supported sizes are 16, 24, 32, 48, input illegal size executes the default value 24 |
| alignment | <code>number</code> | <code>0</code> | Alignment (0 to the left, 1 to the center, 2 to the right) |

<a name="printColumnsText"></a>

#### printColumnsText(colsTextArr, colsWidthArr, colsAlign, isContinuousPrint)
Print a row of the table, you can specify the column width and alignment

| Param | Type | Description |
| --- | --- | --- |
| colsTextArr | <code>Array.&lt;string&gt;</code> | Array of text strings for each column |
| colsWidthArr | <code>Array.&lt;number&gt;</code> | The total width of each column width array cannot be greater than ((384 / fontsize) << 1)-(number of columns + 1)                      (Calculated in English characters, each Chinese character occupies two English characters, and each width is greater than 0), |
| colsAlign | <code>Array.&lt;number&gt;</code> | Alignment of each column (0 to the left, 1 to the center, 2 to the right) |
| isContinuousPrint | <code>Array.&lt;number&gt;</code> | Whether to continue printing the form 1: Continue printing 0: Do not continue printing Remarks: The length of the array of the three parameters should be the same, if the width of colsTextArr[i] is greater than colsWidthArr[i], the text will wrap |

<a name="printBitmap"></a>

#### printBitmap(alignment, bitmapSize, mBitmap)
Print picture

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| alignment | <code>number</code> | <code>1</code> | Alignment 0: Left, 1: Center, 2: Right, Center by default |
| bitmapSize | <code>number</code> | <code>10</code> | Bitmap size, the input size range is 1~16, 10 is selected by default when the range is exceeded Unit: 24bit |
| mBitmap | <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;string&gt;</code> |  | Picture bitmap object (maximum width 384 pixels, unable to print and call back abnormal callback function) |

<a name="printBarCode"></a>

#### printBarCode(data:, symbology, height, width, textposition)
Print one-dimensional barcode

| Param | Type | Description |
| --- | --- | --- |
| data: | <code>string</code> | Barcode data |
| symbology | <code>number</code> | Barcode type    0 -- UPC-A，    1 -- UPC-E，    2 -- JAN13(EAN13)，    3 -- JAN8(EAN8)，    4 -- CODE39，    5 -- ITF，    6 -- CODABAR，    7 -- CODE93，    8 -- CODE128 |
| height | <code>number</code> | Bar code height, the value ranges from 1 to 16, the default value is 6 if it exceeds the range, each unit represents the height of 24 pixels |
| width | <code>number</code> | Barcode width, the value ranges from 1 to 16, the default value is 12 if it exceeds the range, each unit represents the length of 24 pixels |
| textposition | <code>number</code> | Text position 0: Do not print the text, 1: The text is above the bar code, 2: The text is below the bar code, 3: Both the top and bottom of the bar code are printed |

<a name="printQRCode"></a>

#### printQRCode(data, modulesize, mErrorCorrectionLevel:)
Print 2D barcode

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>string</code> |  | QR code data |
| modulesize | <code>number</code> | <code>10</code> | Two-dimensional code block size (unit: point, value 1 to 16), beyond the setting range, the default value is 10 |
| mErrorCorrectionLevel: | <code>number</code> |  | Two-dimensional error correction level (0:L 1:M 2:Q 3:H) |

<a name="printRawData"></a>

#### printRawData(rawPrintData)
Print raw byte data

| Param | Type | Description |
| --- | --- | --- |
| rawPrintData | <code>Array.&lt;string&gt;</code> \| <code>Array.&lt;number&gt;</code> | Byte Data block |

<a name="sendUserCMDData"></a>

#### sendUserCMDData(data)
Use ESC/POS command to print

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array.&lt;string&gt;</code> \| <code>Array.&lt;number&gt;</code> | Instructions |

<a name="printerPerformPrint"></a>

#### printerPerformPrint(feedlines)
Perform printing
After executing each printing function method, you need to execute this method before the printer can execute printing;
Before executing this method, it is necessary to determine the status of the printer. This method is valid when the printer is in PRINTER_NORMAL, otherwise it will not be executed.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| feedlines | <code>number</code> | <code>150</code> | Print and feed paper feed |
