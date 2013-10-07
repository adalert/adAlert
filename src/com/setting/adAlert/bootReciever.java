package com.setting.adAlert;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

/**
* llamamos este broadcastreceiver al inicio en el manifest para que lance
* nuestra aplicación
* @author gabriel
*
*/
public class bootReciever extends BroadcastReceiver{

    @Override
    public void onReceive(Context context, Intent arg1) {
        // Esto deberia lanzar la clase que va a iniciar nuestra aplicación
        Intent myIntent = new Intent(context, adAlert.class);
        myIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(myIntent);
    }
}
