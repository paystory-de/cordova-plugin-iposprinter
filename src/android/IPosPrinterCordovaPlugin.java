package de.paystory.iposprinter;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.graphics.BitmapFactory;
import android.os.IBinder;

import com.iposprinter.iposprinterservice.IPosPrinterCallback;
import com.iposprinter.iposprinterservice.IPosPrinterService;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;

public class IPosPrinterCordovaPlugin extends CordovaPlugin {
    private IPosPrinterService iPosPrinterService;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        this.initializeService();
    }

    @Override
    public boolean execute(String action, JSONArray args,
                           final CallbackContext callbackContext) {
        if (iPosPrinterService == null) {
            callbackContext.error("com.iposprinter.iposprinterservice is not available!");
            return false;
        }

        cordova.getThreadPool().execute(() -> {
            try {
                IPosPrinterCallback.Stub callback = new IPosPrinterCallback.Stub() {
                    @Override
                    public void onRunResult(final boolean isSuccess) {
                        if (!callbackContext.isFinished()) {
                            if (isSuccess) {
                                callbackContext.success();
                            } else {
                                callbackContext.error("");
                            }
                        }
                    }

                    @Override
                    public void onReturnString(final String value) {
                        callbackContext.success(value);
                    }
                };

                switch (action.toLowerCase()) {
                    case "getprinterstatus":
                        callbackContext.success(this.iPosPrinterService.getPrinterStatus());
                        break;
                    case "printerinit":
                        this.iPosPrinterService.printerInit(callback);
                        break;
                    case "setprinterprintdepth":
                        this.iPosPrinterService.setPrinterPrintDepth(args.getInt(0), callback);
                        break;
                    case "setprinterprintfonttype":
                        this.iPosPrinterService.setPrinterPrintFontType(args.getString(0), callback);
                        break;
                    case "setprinterprintfontsize":
                        this.iPosPrinterService.setPrinterPrintFontSize(args.getInt(0), callback);
                        break;
                    case "setprinterprintalignment":
                        this.iPosPrinterService.setPrinterPrintAlignment(args.getInt(0), callback);
                        break;
                    case "printerfeedlines":
                        this.iPosPrinterService.printerFeedLines(args.getInt(0), callback);
                        break;
                    case "printblanklines":
                        this.iPosPrinterService.printBlankLines(args.getInt(0), args.optInt(1, 1), callback);
                        break;
                    case "printtext":
                        this.iPosPrinterService.printText(args.getString(0), callback);
                        break;
                    case "printspecifiedtypetext":
                        this.iPosPrinterService.printSpecifiedTypeText(args.getString(0), args.optString(1, "ST"), args.optInt(2, 24), callback);
                        break;
                    case "printspecformattext":
                        this.iPosPrinterService.PrintSpecFormatText(args.getString(0), args.optString(1, "ST"), args.optInt(2, 24), args.optInt(3, 0), callback);
                        break;
                    case "printcolumnstext":
                        this.iPosPrinterService.printColumnsText(jsonArrayToStringArray((JSONArray) args.get(0)), jsonArrayToIntArray((JSONArray) args.get(1)), jsonArrayToIntArray((JSONArray) args.get(2)), args.getInt(3), callback);
                        break;
                    case "printbitmap":
                        byte[] bytes = jsonArrayToByteArray((JSONArray) args.get(2));
                        this.iPosPrinterService.printBitmap(args.optInt(0, 1), args.optInt(1, 10), BitmapFactory.decodeByteArray(bytes, 0, bytes.length), callback);
                        break;
                    case "printbarcode":
                        this.iPosPrinterService.printBarCode(args.getString(0), args.getInt(1), args.optInt(2, 6), args.optInt(3, 12), args.optInt(4, 0), callback);
                        break;
                    case "printqrcode":
                        this.iPosPrinterService.printQRCode(args.getString(0), args.optInt(1, 10), args.optInt(2, 2), callback);
                        break;
                    case "printrawdata":
                        this.iPosPrinterService.printRawData(jsonArrayToByteArray((JSONArray) args.get(0)), callback);
                        break;
                    case "sendusercmddata":
                        this.iPosPrinterService.sendUserCMDData(jsonArrayToByteArray((JSONArray) args.get(0)), callback);
                        break;
                    case "printerperformprint":
                        this.iPosPrinterService.printerPerformPrint(args.optInt(0, 150), callback);
                        break;
                    default:
                        callbackContext.error("Action \"" + action + "\" not available!");
                }
            } catch (Exception exception) {
                callbackContext.error(exception.getMessage());
            }
        });

        return true;
    }

    private void initializeService() {
        ServiceConnection serviceConnection = new ServiceConnection() {
            @Override
            public void onServiceDisconnected(ComponentName name) {
                iPosPrinterService = null;
            }

            @Override
            public void onServiceConnected(ComponentName name, IBinder service) {
                iPosPrinterService = IPosPrinterService.Stub.asInterface(service);
            }
        };

        Intent intent = new Intent();
        intent.setPackage("com.iposprinter.iposprinterservice");
        intent.setAction("com.iposprinter.iposprinterservice.IPosPrintService");
        cordova.getContext().bindService(intent, serviceConnection, Context.BIND_AUTO_CREATE);
    }

    private byte[] jsonArrayToByteArray(JSONArray data) throws JSONException {
        byte[] bytes = new byte[data.length()];
        for (int i = 0; i < data.length(); i++) {
            bytes[i] = (byte) (((int) data.get(i)) & 0xFF);
        }
        return bytes;
    }

    private String[] jsonArrayToStringArray(JSONArray data) throws JSONException {
        String[] strings = new String[data.length()];
        for(int i = 0; i < data.length(); i++) {
            strings[i] = data.getString(i);
        }
        return strings;
    }

    private int[] jsonArrayToIntArray(JSONArray data) throws JSONException {
        int[] numbers = new int[data.length()];
        for(int i = 0; i < data.length(); i++) {
            numbers[i] = data.getInt(i);
        }
        return numbers;
    }
}
