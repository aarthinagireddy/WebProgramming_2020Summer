package com.csee5590.helloworldapp;

import android.content.Intent;
import android.graphics.Color;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {
    String usernames[] = new String[2];
    String passwords[] = new String[2];
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        usernames[0]="aarthi";
        passwords[0]="reddy";
        usernames[1]="admin";
        passwords[1]="admin";

    }

    public void validate(View view){
        EditText usernameCtrl = (EditText) findViewById(R.id.editTextTextPersonName);
        EditText passwordCtrl = (EditText) findViewById(R.id.editTextTextPassword);

        String username = usernameCtrl.getText().toString().toLowerCase();
        String password = passwordCtrl.getText().toString();
        int i;
        for(i=0;i<usernames.length;i++)
        {
            if ( username.equals(usernames[i]) && password.equals(passwords[i])) {
                Intent redirect = new Intent(MainActivity.this, HomeActivity.class);
                redirect.putExtra("EXTRA_MESSAGE", usernames[i].toUpperCase());
                MainActivity.this.startActivity(redirect);
                break;
            }
        }

        // textView
        if(i==usernames.length) {
            TextView textviewCtrl = (TextView) findViewById(R.id.login);
            textviewCtrl.setTextColor(Color.RED);
            textviewCtrl.setText("Invalid Credentials");
        }


    }

}

