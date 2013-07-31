package com.setting.adAlert;

import android.os.Bundle;
import android.content.res.Configuration;
import org.apache.cordova.*;

public class adAlert extends DroidGap {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
		super.loadUrl("file:///android_asset/www/index.html");
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
    }
    
    @Override
    public void onStart() {
        super.onStart();
    }

    @Override
    public void onStop() {
        super.onStop();
    }
}
